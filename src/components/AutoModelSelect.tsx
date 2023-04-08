import { useMemo } from 'react'
import { Col, Select } from "antd";
import { useGetModelsQuery } from '../pages/Transport/store/transportApi';
import { useTypedSelector } from '../hooks/useTypedSelector';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { autoFilterSliceActions } from '../pages/Transport/store/autoFilterSlice';

const AutoModelSelect = () => {
  const dispatch = useAppDispatch();

  const { brandId, modelId } = useTypedSelector((state) => state.autoFilter)

  const { data = [], isLoading } = useGetModelsQuery(brandId)

  const { setModelId, clearGenerationId, clearYear, clearYearFrom, clearYearTo } = autoFilterSliceActions;

  const selectOptions = useMemo(() => {
    return data.map((e) => ({ value: e.id, label: e.name }))
  }, [data]);

  const onChange = (value: number) => {
    dispatch(setModelId(value));
    dispatch(clearGenerationId());
    dispatch(clearYear());
    dispatch(clearYearFrom());
    dispatch(clearYearTo());
  }

  return (
    <Col style={{ display: 'flex', flexDirection: 'column' }}>
      <span style={{ color: 'gray ', marginBottom: '0.25rem' }}>
        Model:
      </span>
      <Select
        loading={isLoading}
        showSearch
        value={modelId}
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
