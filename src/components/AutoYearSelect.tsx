import React, { useMemo } from 'react'
import { Col, Select } from "antd";
import { useGetGenerationsQuery } from '../pages/Transport/store/transportApi';
import { useTypedSelector } from '../hooks/useTypedSelector';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { autoFilterSliceActions } from '../pages/Transport/store/autoFilterSlice';

const AutoYearSelect = () => {
  const dispatch = useAppDispatch();

  const { brandId, modelId, generationId, year } = useTypedSelector((state) => state.autoFilter)

  const { data = [] } = useGetGenerationsQuery({ brandId, modelId })

  const { setYear } = autoFilterSliceActions;

  const onChange = (value: number) => {
    dispatch(setYear(value))
  }

  const selectOptions = useMemo(() => {
    const currentGen = data.find((g) => g.id === generationId);

    const yearFrom = currentGen?.yearFrom || 0;
    const yearTo = currentGen?.yearTo || yearFrom || 0;
    const newArr = new Array(yearTo - yearFrom + 1).fill(yearFrom);

    return newArr.map((e, ind) => ({ label: `${e + ind}`, value: `${e + ind}`}))
  }, [data, generationId]);

  return (
    <Col style={{ display: 'flex', flexDirection: 'column' }}>
      <span style={{ color: 'gray ', marginBottom: '0.25rem' }}>
        Year:
      </span>
      <Select
        showSearch
        style={{ width: 160 }}
        value={year}
        allowClear
        placeholder="Select a year"
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

export default AutoYearSelect;
