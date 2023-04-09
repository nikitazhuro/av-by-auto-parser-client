import { useMemo, useEffect } from 'react'
import { Col, Select } from "antd";
import { useGetModelsQuery } from '../pages/Transport/store/transportApi';
import { useTypedSelector } from '../hooks/useTypedSelector';
import { useGetCarsFilterActions } from '../pages/Transport/store/autoFilterSlice';
import { useSearchParams } from 'react-router-dom';

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
    <Col style={{ display: 'flex', flexDirection: 'column' }}>
      <span style={{ color: 'gray ', marginBottom: '0.25rem' }}>
        Model:
      </span>
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
