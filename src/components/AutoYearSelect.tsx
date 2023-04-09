import { useMemo, useEffect } from 'react'
import { Col, Select } from "antd";
import { useGetGenerationsQuery } from '../pages/Transport/store/transportApi';
import { useTypedSelector } from '../hooks/useTypedSelector';
import { useGetCarsFilterActions } from '../pages/Transport/store/autoFilterSlice';
import { getBrandId, getGenerationId, getModelId, getYear } from '../pages/Transport';
import { useSearchParams } from 'react-router-dom';

const AutoYearSelect = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const brandId = useTypedSelector(getBrandId)
  const modelId = useTypedSelector(getModelId)
  const generationId = useTypedSelector(getGenerationId)
  const year = useTypedSelector(getYear)

  const { data = [] } = useGetGenerationsQuery({ brandId, modelId })

  const { setYear } = useGetCarsFilterActions();

  const onChange = (value: number) => {
    setYear(value);

    setSearchParams((prev) => {
      prev.delete('year')

      if (value) {
        prev.append('year', `${value}`)
      }
      return prev
    })
  }

  const selectOptions = useMemo(() => {
    const currentGen = data.find((g) => g.id === generationId);

    const yearFrom = currentGen?.yearFrom || 0;
    const yearTo = currentGen?.yearTo || yearFrom || 0;
    const newArr = new Array(yearTo - yearFrom + 1).fill(yearFrom);

    return newArr.map((e, ind) => ({ label: `${e + ind}`, value: `${e + ind}`}))
  }, [data, generationId]);

  useEffect(() => {
    const yearFromParams = searchParams.get('year');

    if (yearFromParams) {
      setYear(+yearFromParams);
    }
  }, []);

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
