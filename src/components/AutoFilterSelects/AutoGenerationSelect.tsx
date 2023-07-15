import { useEffect } from 'react'
import { Col, Select, Space } from "antd";
import { useSearchParams } from 'react-router-dom';

import './AutoGenerationSelectAnt.css';

import { useGetGenerationsQuery } from '../../pages/VehiclesSold/store/vehiclesSoldApi';
import { useGetCarsFilterActions } from '../../pages/VehiclesSold/store/autoFilterSlice';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { getGenerationUUIDs, getModelUUID } from '../../pages/VehiclesSold';

const AutoGenerationSelect = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const { setGenerationUUIDs } = useGetCarsFilterActions();

  const modelUUID = useTypedSelector(getModelUUID)
  const generationUUIDs = useTypedSelector(getGenerationUUIDs)

  const { data = [], isLoading } = useGetGenerationsQuery(modelUUID)

  const onChange = (value: Array<string>) => {
    setGenerationUUIDs(value);

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
      setGenerationUUIDs(generationIDFromParams.split(','));
    }
  }, []);

  return (
    <Col style={{ display: 'flex', flexDirection: 'column' }}>
      <Select
        className='generationSelect'
        popupClassName='generationSelectDropdown'
        loading={isLoading}
        value={generationUUIDs}
        listHeight={500}
        showSearch
        mode='multiple'
        style={{ width: 160 }}
        placeholder="Select a generation"
        optionLabelProp="label"
        onChange={onChange}
      >
        {data.map((gen) => (
          <Select.Option
            key={gen.uuid}
            value={gen.uuid}
            label={gen.title}
          >
            <Space>
              <div>
                <img width={280} height={168} src="https://wp-s.ru/wallpapers/1/17/496466279414011/krasivyj-ch-rnyj-avtomobil-v-mrachnyx-tonax.jpg" />
                <div className='genImageBG'>Selected</div>
              </div>
              <span>
                {gen.title}
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
