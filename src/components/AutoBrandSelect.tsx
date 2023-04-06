import React, { useMemo } from 'react'
import { Col, Select } from "antd";
import { useAppDispatch } from '../hooks/useAppDispatch';
import { autoFilterSliceActions } from '../pages/Transport/store/autoFilterSlice';
import { useTypedSelector } from '../hooks/useTypedSelector';

interface IAutoBrandSelect {
  isLoading: boolean;
  data: Array<{ id: number, name: string }>
}

const AutoBrandSelect: React.FC<IAutoBrandSelect> = ({
  isLoading,
  data,
}) => {
  const dispatch = useAppDispatch();

  const { brandId } = useTypedSelector((state) => state.autoFilter)

  const { setBrandId, clearGenerationId, clearModelId, clearYear } = autoFilterSliceActions;

  const selectOptions = useMemo(() => {
    return data.map((e) => ({ value: e.id, label: e.name }))
  }, [data]);

  const onChange = (value: number) => {
    dispatch(setBrandId(value))
    dispatch(clearGenerationId())
    dispatch(clearModelId())
    dispatch(clearYear())
  }

  return (
    <Col style={{ display: 'flex', flexDirection: 'column'}}>
    <span style={{ color: 'gray ', marginBottom: '0.25rem'}}>
      Brand:
    </span>
      <Select
        loading={isLoading}
        showSearch
        value={brandId}
        style={{ width: 160 }}
        placeholder="Select a brand"
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

export default AutoBrandSelect;
