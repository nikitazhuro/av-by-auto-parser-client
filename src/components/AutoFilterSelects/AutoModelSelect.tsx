import { useMemo, useEffect } from 'react'
import { Col, Select } from "antd";
import { useSearchParams } from 'react-router-dom';

import { useGetModelsQuery } from '../../pages/VehiclesSold/store/vehiclesSoldApi';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { useGetCarsFilterActions } from '../../pages/VehiclesSold/store/autoFilterSlice';

const AutoModelSelect = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const { brandId, modelId } = useTypedSelector((state) => state.autoFilter)

  const { data = [], isLoading } = useGetModelsQuery(brandId)

  const { setModelId, clearAllForNewModel } = useGetCarsFilterActions();

  const selectOptions = useMemo(() => {
    return data.map((e) => ({ value: e.id, label: e.name }))
  }, [data]);

  const onChange = (value: number) => {
    setModelId(value);
    setSearchParams((prev) => {
      prev.delete('model')
      prev.delete('generation');
      prev.delete('year');

      if (value) {
        prev.append('model', `${value}`)
      }

      return prev
    })
    clearAllForNewModel();
  }

  useEffect(() => {
    const modelIDFromParams = searchParams.get('model');

    if (modelIDFromParams) {
      setModelId(+modelIDFromParams);
    }
  }, []);

  return (
    <Col style={{ display: 'flex', flexDirection: 'column', margin: '0 0.5rem' }}>
      <Select
        loading={isLoading}
        showSearch
        value={(data.length && modelId) || null}
        style={{ width: 160 }}
        placeholder="Select a model"
        optionFilterProp="children"
        onChange={onChange}
        filterOption={(input, option) =>
          (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
        }
        options={selectOptions}
      />
    </Col>
  )
}

export default AutoModelSelect;
