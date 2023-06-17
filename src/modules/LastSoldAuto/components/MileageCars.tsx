import { Col, Row, Select, Switch, Tag } from 'antd';

import classes from './MileageCars.module.css';

import { useTypedSelector } from '../../../hooks/useTypedSelector';
import { getAutoFilter, getTriggerToRefetchCars } from '../../../pages/Transport';
import { useEffect, useState } from 'react';
import MileageCarsTables from './MileageCarsTables/MileageCarsTables';
import { useAppDispatch } from '../../../hooks/useAppDispatch';
import { autoFilterSliceActions } from '../../../pages/Transport/store/autoFilterSlice';
import { getMileageCarsFromLocalhost } from '../../../api/mileageCardApi';
import MileageCarsGallery from './MileageCarsGallery/MileaageCarsGallery';
import Filter from './Filter/Filter';

const selectOptions = [
  { value: 'date', label: 'Removed date' },
  { value: 'price1', label: 'Price (expensive first)' },
  { value: 'price2', label: 'Price (cheap first)' },
]

const LastSoldAuto = () => {
  const { brandId, generationId, modelId, year, filterConfig } = useTypedSelector(getAutoFilter);

  const [selectsortOption, setSelectSortOprion] = useState('date');
  const [tablesViewEnabled, setTablesViewEnabled] = useState(true);

  const showAutoGallery = brandId && generationId && modelId;

  const onChangeSortHandler = (value: string) => {
    setSelectSortOprion(value);
  }


  const dispatch = useAppDispatch();

  const triggerToRefetchCars = useTypedSelector(getTriggerToRefetchCars)

  const { setTriggerToRefetchCars } = autoFilterSliceActions;

  const [isLoading, setIsLoading] = useState(false)
  const [data, setData] = useState<Array<Array<any>>>([]);

  const fetchData = async (config: any, triggerToRefetchCars?: boolean) => {
    setIsLoading(true)

    const carsList = await getMileageCarsFromLocalhost(config)

    const listOfSortedCarsByYear: any[] = [];

    let sortedCarsByYear: any[] = [];

    carsList.sort((a, b) => a?.year - b?.year).forEach((car) => {
      if (!sortedCarsByYear.length) {
        sortedCarsByYear.push(car);
      } else {
        const lastEl = sortedCarsByYear[sortedCarsByYear.length - 1];

        if (car.year === lastEl.year) {
          sortedCarsByYear.push(car);
        } else {
          listOfSortedCarsByYear.push(sortedCarsByYear);
          sortedCarsByYear = [car]
        }
      }
    })

    if (sortedCarsByYear.length) {
      listOfSortedCarsByYear.push(sortedCarsByYear);
    }

    setData(listOfSortedCarsByYear);
    setIsLoading(false)

    if (triggerToRefetchCars) {
      dispatch(setTriggerToRefetchCars(false));
    }
  }
  useEffect(() => {
    if (brandId && generationId && modelId) {
      const config: any = {
        brand: brandId,
        generation: generationId,
        model: modelId,
        year,
      };

      if (filterConfig) {
        config.filter = filterConfig;
      }

      fetchData(config)
    }
  }, [brandId, generationId, modelId, year, filterConfig])

  useEffect(() => {
    if (brandId && generationId && modelId && triggerToRefetchCars) {
      const config = {
        brand: brandId,
        generation: generationId,
        model: modelId,
        year,
      };

      fetchData(config, triggerToRefetchCars)
    }
  }, [triggerToRefetchCars, brandId, generationId, modelId, year])

  return (
    showAutoGallery ? (
      <Row className={classes.carsList}>
        <Col className={classes.carsListHeader}>
          <span className={classes.carsListTitle}>
            Details:
          </span>
        </Col>
        <Col span={24} className={classes.options}>
          <Col span={6} className={classes.sort}>
            <span className={classes.sort__title}>
              Sort:
            </span>
            <Select
              className={classes.sort__select}
              defaultValue={selectsortOption}
              onChange={onChangeSortHandler}
              options={selectOptions}
            />
          </Col>
          <Col span={6} className={classes.tableView}>
            <span className={classes.tableView__title}>
              Table's view
              <Tag color="blue" bordered={false} className={classes.tableView__title_tag}>beta</Tag>
              :
            </span>
            <Switch
              checked={tablesViewEnabled}
              onChange={() => setTablesViewEnabled((prev) => !prev)}
              checkedChildren="Yes"
              unCheckedChildren="No"
            />
          </Col>
          <Col className={classes.filterMain}>
            <Filter />
          </Col>
        </Col>
        {tablesViewEnabled
          ? <MileageCarsTables data={data} isLoading={isLoading} />
          : <MileageCarsGallery
            data={data}
            isLoading={isLoading}
            sortOption={selectsortOption}
          />
        }
      </Row>
    )
      : null
  )
}

export default LastSoldAuto;
