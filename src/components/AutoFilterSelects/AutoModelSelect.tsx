import { useMemo, useEffect } from 'react'
import { Col, Select } from "antd";
import { useSearchParams } from 'react-router-dom';

import { useGetModelsQuery } from '../../pages/VehiclesSold/store/vehiclesSoldApi';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { useGetCarsFilterActions } from '../../pages/VehiclesSold/store/autoFilterSlice';
import { RootState } from '../../store';
import { upperFirst } from 'lodash';

const AutoModelSelect = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const { brandUUID, modelUUID } = useTypedSelector((state: RootState) => state.autoFilter)

  const { data = [], isLoading } = useGetModelsQuery(brandUUID)

  const { setModelUUID, clearAllForNewModel } = useGetCarsFilterActions();

  const selectOptions = useMemo(() => {
    return data.map((e) => ({ value: e.uuid, label: upperFirst(e.title) }))
  }, [data]);

  const onChange = (value: string) => {
    setModelUUID(value);
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
    const modelUUIDFromParams = searchParams.get('model');

    if (modelUUIDFromParams) {
      setModelUUID(modelUUIDFromParams);
    }
  }, []);

  return (
    <Col style={{ display: 'flex', flexDirection: 'column', margin: '0 0.5rem' }}>
      <Select
        loading={isLoading}
        showSearch
        value={(data.length && modelUUID) || null}
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
