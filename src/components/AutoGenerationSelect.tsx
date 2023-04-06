import React, { useMemo } from 'react'
import { Col, Select } from "antd";
import { useGetGenerationsQuery } from '../pages/Transport/store/transportApi';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { autoFilterSliceActions } from '../pages/Transport/store/autoFilterSlice';
import { useTypedSelector } from '../hooks/useTypedSelector';

const AutoGenerationSelect = () => {
  const { brandId, modelId, generationId } = useTypedSelector((state) => state.autoFilter)

  const { data = [], isLoading } = useGetGenerationsQuery({ brandId, modelId })

  const dispatch = useAppDispatch();

  const { setGenerationId, clearYear } = autoFilterSliceActions;

  const selectOptions = useMemo(() => {
    return data.map((e) => ({ value: e.id, label: e.name }))
  }, [data]);

  const onChange = (value: number) => {
    dispatch(setGenerationId(value));
    dispatch(clearYear());
  }

  return (
    <Col style={{ display: 'flex', flexDirection: 'column' }}>
      <span style={{ color: 'gray ', marginBottom: '0.25rem' }}>
        Generation:
      </span>
      <Select
        loading={isLoading}
        value={generationId}
        showSearch
        style={{ width: 160 }}
        placeholder="Select a generation"
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

export default AutoGenerationSelect;
