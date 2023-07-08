import { useMemo, useEffect } from 'react'
import { Col, Image, Select, Space } from "antd";
import { useSearchParams } from 'react-router-dom';

import './AutoGenerationSelectAnt.css';

import { useGetGenerationsQuery } from '../../pages/VehiclesSold/store/vehiclesSoldApi';
import { useGetCarsFilterActions } from '../../pages/VehiclesSold/store/autoFilterSlice';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { getBrandId, getGenerationIds, getModelId } from '../../pages/VehiclesSold';

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
        className='generationSelect'
        popupClassName='generationSelectDropdown'
        loading={isLoading}
        value={generationIds}
        listHeight={500}
        showSearch
        mode='multiple'
        style={{ width: 160 }}
        placeholder="Select a generation"
        optionLabelProp="label"
        onChange={onChange}
      >
        {data.map((gen) => (
          <Select.Option value={gen.id} label={gen.name}>
            <Space>
              <div>
                <img width={280} height={168} src="https://img1.goodfon.com/original/800x480/a/d2/gta-spano-2013-3354.jpg" />
                <div className='genImageBG'>Selected</div>
              </div>
              <span>
                {gen.name}
                {', '}
                {gen.yearFrom}
                {' - '}
                {gen.yearTo || 'now'}
              </span>
            </Space>
          </Select.Option>
        ))}
      </Select>
    </Col>
  )
}

export default AutoGenerationSelect;
