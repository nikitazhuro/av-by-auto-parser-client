import { useMemo, useEffect } from 'react'
import { Col, Select } from "antd";

import { useGetGenerationsQuery } from '../pages/Transport/store/transportApi';
import { useGetCarsFilterActions } from '../pages/Transport/store/autoFilterSlice';
import { useTypedSelector } from '../hooks/useTypedSelector';
import { getBrandId, getGenerationId, getModelId } from '../pages/Transport';
import { useSearchParams } from 'react-router-dom';

const AutoGenerationSelect = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const {
    setGenerationId,
    clearYear,
    setYearFrom,
    setYearTo,
  } = useGetCarsFilterActions();

  const brandId = useTypedSelector(getBrandId)
  const modelId = useTypedSelector(getModelId)
  const generationId = useTypedSelector(getGenerationId)

  const { data = [], isLoading } = useGetGenerationsQuery({ brandId, modelId })

  const selectOptions = useMemo(() => {
    return data.map((e) => ({ value: e.id, label: e.name }))
  }, [data]);

  const onChange = (value: number) => {
    setGenerationId(value);

    setSearchParams((prev) => {
      prev.delete('generation')
      prev.delete('year');

      if (value) {
        prev.append('generation', `${value}`)
      }
      return prev
    })

    clearYear();
  }

  useEffect(() => {
    const selectedGen = data.find((gen) => gen.id === generationId);

    if (selectedGen) {
      setYearFrom(selectedGen.yearFrom);
      setYearTo(selectedGen.yearTo);
    }
  }, [data, generationId])

  useEffect(() => {
    const generationIDFromParams = searchParams.get('generation');

    if (generationIDFromParams) {
      setGenerationId(+generationIDFromParams);
    }
  }, []);

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
