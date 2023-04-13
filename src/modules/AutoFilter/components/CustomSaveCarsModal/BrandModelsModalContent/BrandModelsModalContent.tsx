import React, { useEffect, useState, useRef } from 'react'
import { Checkbox, Col } from "antd"

import { getModelsFromAVApi } from '../../../../../api/mileageCardApi';
import { CheckboxChangeEvent } from 'antd/es/checkbox';

interface IModelModal {
  brandId: number | null;
}

const BrandModelsModalContent: React.FC<IModelModal> = ({
  brandId,
}) => {
  const [models, setModels] = useState<Array<any>>([]);
  const [checkedModelList, setCheckedModelList] = useState<Array<number>>([]);
  
  const ref = useRef<ReturnType<typeof Array<number>> | null>(null);

  const onCheckHandler = (field: number) => (e: CheckboxChangeEvent) => {
    setCheckedModelList((prev) => {
      if (prev.includes(field) && !e.target.checked) {
        ref.current = prev.filter((el) => el !== field);

        return prev.filter((el) => el !== field)
      }

      ref.current = [...prev, field];
      return [...prev, field]
    })
  }

  const fetchModels = async (id: number) => {
    const data = await getModelsFromAVApi(id);

    setModels(data);
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
        ref.current = JSON.parse(savedModelsForBrand)
        setCheckedModelList((JSON.parse(savedModelsForBrand)) || []);
      }
    }

    return () => {
      if (ref.current) {
        localStorage.setItem(`${brandId}`, JSON.stringify(ref.current))
      }
    }
  }, [brandId, models]);

  return (
    <Col span={24} style={{ display: 'flex', flexWrap: 'wrap' }}>
      {models.map((model) => (
        <Col span={4} key={model.id}>
          <Checkbox checked={checkedModelList.includes(model.id)} onChange={onCheckHandler(model.id)}>
            {model.name}
          </Checkbox>
        </Col>
      ))}
    </Col>
  )
}

export default BrandModelsModalContent;
