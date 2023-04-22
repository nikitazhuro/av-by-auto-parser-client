import React, { useEffect, useState } from 'react'
import { Button, Checkbox, Col, Modal, Row } from "antd"
import { CheckboxChangeEvent } from 'antd/es/checkbox';

import classes from './BrandModelsModal.module.css';

import { getModelsFromAVApi } from '../../../../../api/mileageCardApi';

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
  const [checkedModelList, setCheckedModelList] = useState<Array<number>>([]);

  const onCheckHandler = (field: number) => (e: CheckboxChangeEvent) => {
    setCheckedModelList((prev) => {
      if (prev.includes(field) && !e.target.checked) {
        return prev.filter((el) => el !== field)
      }

      return [...prev, field]
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
      const modelIds = models.map((model) => model.id);

      setCheckedModelList(modelIds);
    } else {
      setCheckedModelList([]);
    }
  }

  useEffect(() => {
    if (brandId || brandId === 0) {
      fetchModels(brandId)
    }
  }, [brandId])

  useEffect(() => {
    if (models.length && (brandId || brandId === 0)) {

      const savedModelsForBrand = localStorage.getItem(`${brandId}`);

      if (savedModelsForBrand && JSON.parse(savedModelsForBrand).length) {
        setCheckedModelList((JSON.parse(savedModelsForBrand)) || []);
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
          localStorage.setItem(`${brandId}`, JSON.stringify(checkedModelList));

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
              <Checkbox checked={checkedModelList.includes(model.id)} onChange={onCheckHandler(model.id)}>
                {model.name}
              </Checkbox>
            </Col>
          ))}
        </Col>
      </Row>      </Modal>
  )
}

export default BrandModelsModalContent;
