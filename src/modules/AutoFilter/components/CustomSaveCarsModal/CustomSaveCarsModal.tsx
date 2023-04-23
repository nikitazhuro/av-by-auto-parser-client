import React, { useMemo, useState } from 'react'
import { Button, Checkbox, Col, Modal, Row, Spin, Tooltip, notification } from "antd"
import { EyeOutlined, CheckCircleOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { CheckboxChangeEvent } from 'antd/es/checkbox';
import { useDispatch } from 'react-redux';
import dayjs from 'dayjs';

import classes from './CustomSaveCarsModal.module.css';

import BrandModelsModal from './BrandModelsModal/BrandModelsModal';
import LoadingModal from '../../../../components/LoadingModal/LoadingModal';
import DividerWrapper from '../../../../components/Divider/DividerWrapper';

import { createMileageCarsToLocalhost, getGenerationsFromAVApi, getMileageCarsFromAVApi, getModelsFromAVApi } from '../../../../api/mileageCardApi';
import { transformListOfCarsForAllYearsFromGen } from '../../utils';
import { autoFilterSliceActions } from '../../../../pages/Transport/store/autoFilterSlice';

interface ICustomSaveCarsModal {
  brands: Array<{ id: number, name: string }>
}

const CustomSaveCarsModal: React.FC<ICustomSaveCarsModal> = ({
  brands = [],
}) => {
  const dispatch = useDispatch();

  const { setTriggerToRefetchCars } = autoFilterSliceActions;

  const [open, setOpen] = useState(false);
  const [opensBrandId, setOpensBrandId] = useState<number | null>(null);
  const [showAllBrands, setShowAllBrands] = useState(false);
  const [checkedBrandList, setCheckedBrandList] = useState<Array<number>>([]);
  const [spinning, setSpinning] = useState(false);
  const [isPreparingSelectAll, setIsPreparingSelectAll] = useState(false);

  const brandsFiltered = useMemo(() => {
    if (showAllBrands) {
      return brands;
    }
    return brands.slice(0, 24)
  }, [showAllBrands, brands])

  const openModalHandler = () => {
    const savedBrands = localStorage.getItem('personalSavedBrandsOptions');

    setCheckedBrandList((savedBrands && JSON.parse(savedBrands)) || []);

    setOpen(true);
  }

  const closeModalHandler = () => {
    localStorage.setItem('personalSavedBrandsOptions', JSON.stringify(checkedBrandList))

    setOpen(false);
  };

  const saveCardToDatabase = async (config: any) => {
    createMileageCarsToLocalhost(config)
  }

  const updateLastParseDate = (brandId: number, modelId: number) => {
    const brandData = localStorage.getItem(`${brandId}`);

    if (brandData) {
      const parsed = JSON.parse(brandData);

      if (parsed?.models?.length) {
        const newData = {
          ...parsed,
          models: [...parsed.models.map((model: any) => model.id === modelId ? { ...model, lastParseDate: new Date() } : model)],
          lastParseDate: new Date(),
        }

        return localStorage.setItem(`${brandId}`, JSON.stringify(newData))
      }
    }
  }

  const saveCarsRequest = async () => {
    for (let i = 0; i < checkedBrandList.length; i++) {
      const brandsFromLocalStorage = localStorage.getItem(`${checkedBrandList[i]}`);
      const models = brandsFromLocalStorage
        ? JSON.parse(brandsFromLocalStorage)?.models.filter((model: any) => model.checked)
        : [];

      for (let j = 0; j < models.length; j++) {
        const generations = await getGenerationsFromAVApi(checkedBrandList[i], models[j].id)

        for (let k = 0; k < generations.length; k++) {
          const resultDataToSave: any[] = [];

          const {
            id: generationId,
            yearFrom,
            yearTo,
          } = generations[k];

          if (yearFrom && yearTo) {
            for (let q = yearFrom; q <= yearTo; q++) {
              const resultData = {
                brandId: checkedBrandList[i],
                modelId: models[j].id,
                generationId,
                data: {},
              };

              try {
                const mileageCars = await getMileageCarsFromAVApi(checkedBrandList[i], models[j].id, generationId, q)

                resultData.data = mileageCars;

                resultDataToSave.push(resultData);
              } catch (error) {

              }
            }
          } else if (yearFrom || yearTo) {
            const resultData = {
              brandId: checkedBrandList[i],
              modelId: models[j].id,
              generationId,
              data: {},
            };            

            try {
              const mileageCars = await getMileageCarsFromAVApi(checkedBrandList[i], models[j].id, generationId, yearFrom || yearTo);

              resultData.data = mileageCars;

              resultDataToSave.push(resultData);
            } catch (error) {

            }
          }

          let listOfTheSameGenCars: any[] = resultDataToSave.filter((data) => data?.data?.lastSoldAdverts?.length)

          if (listOfTheSameGenCars.length) {
            const dataToSaveToDb = transformListOfCarsForAllYearsFromGen(listOfTheSameGenCars)

            saveCardToDatabase(dataToSaveToDb)
          }
        }

        updateLastParseDate(checkedBrandList[i], models[j].id)
      }
    }

    dispatch(setTriggerToRefetchCars(true));
  }

  const onOkHandler = async () => {
    setSpinning(true)

    await saveCarsRequest();

    setSpinning(false);

    closeModalHandler()
    notification.success({
      type: 'success',
      message: `Данные успешно сохранены в базу данных`,
    })
  }

  const onCheckHandler = (field: number) => (e: CheckboxChangeEvent) => {
    setCheckedBrandList((prev) => {
      if (prev.includes(field) && !e.target.checked) {

        return prev.filter((el) => el !== field);
      }

      return [...prev, field]
    })
  }

  const lastParseDate = (brandId: number) => {
    const brand = localStorage.getItem(`${brandId}`);
    const parseDate = brand ? JSON.parse(brand).lastParseDate : null

    if (brand && parseDate) {
      const diff = dayjs(new Date()).diff(dayjs(parseDate));

      if (diff < 1000 * 60 * 60 * 60 * 48) {

        return (
          <Tooltip title={`Last parsing was on ${dayjs(parseDate).format("YYYY-MM-DD, HH:mm")}`}>
            <CheckCircleOutlined className={classes.acceptParseDate} />
          </Tooltip>
        )
      }

      if (diff < 1000 * 60 * 60 * 60 * 168) {

        return (
          <Tooltip title={`Last parsing was on ${dayjs(parseDate).format("YYYY-MM-DD, HH:mm")}`}>
            <CheckCircleOutlined className={classes.warnParseDate} />
          </Tooltip>
        )
      }

      return (
        <Tooltip title={`Last parsing was on ${dayjs(parseDate).format("YYYY-MM-DD, HH:mm")}`}>
          <ExclamationCircleOutlined className={classes.dangerParseDate} />
        </Tooltip>
      )
    }

    return (
      <Tooltip title="No parse date">
        <ExclamationCircleOutlined className={classes.noParseDate} />
      </Tooltip>
    )
  }

  const onChangeSelectAll = async (flag: boolean) => {
    setIsPreparingSelectAll(true)

    for (let i = 0; i < brands.length; i++) {
      const models = await getModelsFromAVApi(brands[i].id);

      const brandFromLS = localStorage.getItem(`${brands[i].id}`);

      if (brandFromLS) {
        const modelsFromLS = JSON.parse(brandFromLS)?.models;
        const newModels = modelsFromLS.length ? modelsFromLS.map((model: any) => ({ ...model, checked: flag })) : [];

        models.forEach((model) => {
          if (!newModels.find((m: any) => m.id === model.id)) {
            newModels.push({ id: model.id, checked: flag })
          }
        })

        const config = {
          ...JSON.parse(brandFromLS),
          models: newModels,
        }

        localStorage.setItem(`${brands[i].id}`, JSON.stringify(config))

      } else {
        const newModels = models.map((model) => ({ id: model.id, checked: flag }));

        const config = {
          models: newModels,
        }

        localStorage.setItem(`${brands[i].id}`, JSON.stringify(config))
      }
    }
    setCheckedBrandList(flag ? brands.map((brand) => brand.id) : [])

    setIsPreparingSelectAll(false)
  }

  return (
    <>
      <LoadingModal spinning={spinning} />
      <Button
        type="primary"
        className={classes.customSaveBtn}
        onClick={openModalHandler}
      >
        Custom select and save
      </Button>
      <Modal
        centered
        open={open}
        title={(
          <Col>
            <h2>Brands</h2>
            <hr style={{ opacity: '0.5', margin: '1rem 0' }} />
          </Col>
        )}
        destroyOnClose
        width={1200}
        onCancel={closeModalHandler}
        footer={[
          <Button
            key="link"
            type="primary"
            disabled={isPreparingSelectAll || !checkedBrandList.length}
            onClick={onOkHandler}
          >
            Save selected
          </Button>,
        ]}
      >
        <Spin spinning={isPreparingSelectAll}>
          <Row>
            <Col span={24} className={classes.extraOptions}>
              <span className={classes.title}>Extra options:</span>
              <Col>
                <Button
                  type="dashed"
                  size="small"
                  className={classes.selectAllBtn}
                  onClick={() => onChangeSelectAll(true)}
                >
                  Select all
                </Button>

                <Button
                  type="dashed"
                  size="small"
                  className={classes.deselectAllbtn}
                  onClick={() => onChangeSelectAll(false)}
                >
                  Deselect all
                </Button>
              </Col>
            </Col>
            <span className={classes.title}>Brand list:</span>
            <Col span={24} style={{ display: 'flex', flexWrap: 'wrap' }}>
              {brandsFiltered.map((brand) => (
                <Col span={4} key={brand.id}>
                  <Checkbox checked={checkedBrandList.includes(brand.id)} onChange={onCheckHandler(brand.id)}>
                    {brand.name}
                  </Checkbox>
                  <EyeOutlined onClick={() => setOpensBrandId(brand.id)} className={classes.eye} />
                  {lastParseDate(brand.id)}
                </Col>
              ))}
            </Col>
            <DividerWrapper state={showAllBrands} setState={setShowAllBrands} />
          </Row>
        </Spin>
      </Modal>
      <BrandModelsModal
        title={brands.find((e) => e.id === opensBrandId)?.name || ''}
        brandId={opensBrandId}
        setBrandId={setOpensBrandId}
      />
    </>

  )
}

export default CustomSaveCarsModal;
