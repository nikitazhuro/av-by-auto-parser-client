import React, { useEffect, useState } from 'react'
import { Button, Checkbox, Col, Modal, Row, Tooltip } from "antd"
import { CheckboxChangeEvent } from 'antd/es/checkbox';
import { CheckCircleOutlined, ExclamationCircleOutlined } from '@ant-design/icons';

import classes from './BrandModelsModal.module.css';

import { getModelsFromAVApi } from '../../../../../api/mileageCardApi';
import dayjs from 'dayjs';

interface IModelModal {
  brandId: number | null;
  title: string;
  setBrandId: React.Dispatch<React.SetStateAction<number | null>>
}

const BrandModelsModalContent: React.FC<IModelModal> = ({
  brandId,
  title,
  setBrandId,
}) => {
  const [models, setModels] = useState<Array<any>>([]);
  const [checkedModelList, setCheckedModelList] = useState<Array<{ id: number, checked: boolean }>>([]);  

  const onCheckHandler = (field: number) => (e: CheckboxChangeEvent) => {
    setCheckedModelList((prev) => {
      if (prev.find((e) => e.id === field) && !e.target.checked) {
        
        return [...prev.map((model) => model.id === field ? { ...model, checked: false } : model)]
      }

      return [...prev, { id: field, checked: true }]
    })
  }

  const fetchModels = async (id: number) => {
    const data = await getModelsFromAVApi(id);

    setModels(data);
  }

  const onCloseModal = () => {
    setBrandId(null)
    setCheckedModelList([])
    setModels([])
  }

  const onSelectAll = (e: CheckboxChangeEvent) => {
    if (e.target.checked) {
      const modelIds = models.map((model) => ({ id:  model.id, checked: true }));

      setCheckedModelList(modelIds);
    } else {
      setCheckedModelList([]);
    }
  }

  const lastParseDate = (brandId: number | null, modelId: number) => {
    const brand = localStorage.getItem(`${brandId}`);
    const modelList = brand ? JSON.parse(brand).models : []
    const currentModel = modelList.find((model: any) => model.id === modelId)

    const parseDate = currentModel?.lastParseDate;

    if (currentModel && parseDate) {
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

  useEffect(() => {
    if (brandId || brandId === 0) {
      fetchModels(brandId)
    }
  }, [brandId])

  useEffect(() => {
    if (models.length && (brandId || brandId === 0)) {

      const savedModelsForBrand = localStorage.getItem(`${brandId}`);

      if (savedModelsForBrand && JSON.parse(savedModelsForBrand)?.models?.length) {
        setCheckedModelList((JSON.parse(savedModelsForBrand)?.models) || []);
      }
    }
  }, [brandId, models]);

  return (
    <Modal
      open={!!brandId || brandId === 0}
      width={800}
      title={(!!brandId || brandId === 0) && (
        <Col>
          <h2>{title}</h2>
          <hr style={{ opacity: '0.5', margin: '1rem 0' }} />
        </Col>
      )}
      destroyOnClose
      onCancel={onCloseModal}
      footer={[
        <Button key="submit" type="primary" onClick={() => {
          const config = {
            models: checkedModelList,
          };

          localStorage.setItem(`${brandId}`, JSON.stringify(config));

          onCloseModal();
        }}>
          Submit
        </Button>,
      ]}
    >
      <Row>
        <Col span={24} className={classes.extraOptions}>
          <span className={classes.title}>Extra options:</span>
          <Col>
            <Checkbox onChange={onSelectAll}>
              Select all
            </Checkbox>
          </Col>
        </Col>
        <span className={classes.title}>Models:</span>
        <Col span={24} style={{ display: 'flex', flexWrap: 'wrap' }}>
          {models.map((model) => (
            <Col span={4} key={model.id}>
              <Checkbox checked={checkedModelList.find((e) => e.id === model.id)?.checked} onChange={onCheckHandler(model.id)}>
                {model.name}
              </Checkbox>
              {lastParseDate(brandId, model.id)}
            </Col>
          ))}
        </Col>
      </Row>
    </Modal>
  )
}

export default BrandModelsModalContent;
