import { useMemo, useEffect } from 'react'
import { Col, Select } from "antd";
import { useSearchParams } from 'react-router-dom';

import { useGetGenerationsQuery } from '../../pages/Transport/store/transportApi';
import { useGetCarsFilterActions } from '../../pages/Transport/store/autoFilterSlice';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { getBrandId, getGenerationIds, getModelId } from '../../pages/Transport';

const AutoGenerationSelect = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const { setGenerationIds } = useGetCarsFilterActions();

  const brandId = useTypedSelector(getBrandId)
  const modelId = useTypedSelector(getModelId)
  const generationIds = useTypedSelector(getGenerationIds)

  const { data = [], isLoading } = useGetGenerationsQuery({ brandId, modelId })
  
  const selectOptions = useMemo(() => {
    return data.map((e) => ({ value: e.id, label: e.name }))
  }, [data]);

  const onChange = (value: Array<number>) => {
    setGenerationIds(value);

    setSearchParams((prev) => {
      prev.delete('generation')

      if (value.length) {
        prev.append('generation', `${value}`)
      }
      return prev
    })

  }

  useEffect(() => {
    const generationIDFromParams = searchParams.get('generation');
        
    if (generationIDFromParams) {
      setGenerationIds(generationIDFromParams.split(',').map((e) => +e));
    }
  }, []);

  return (
    <Col style={{ display: 'flex', flexDirection: 'column' }}>
      <Select
        loading={isLoading}
        value={generationIds}
        showSearch
        mode='multiple'
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
