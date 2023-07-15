import React, { useMemo, useEffect } from 'react'
import { Col, Select } from "antd";
import { useSearchParams } from 'react-router-dom';
import { upperFirst } from 'lodash';

import { useGetCarsFilterActions } from '../../pages/VehiclesSold/store/autoFilterSlice';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { getBrandUUID } from '../../pages/VehiclesSold';
import { IBrand } from '../../pages/VehiclesSold/types';


interface IAutoBrandSelect {
  isLoading: boolean;
  data: Array<IBrand>
}

const AutoBrandSelect: React.FC<IAutoBrandSelect> = ({
  isLoading,
  data,
}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const brandUUID = useTypedSelector(getBrandUUID)
  const { setBrandUUID, clearAllForNewBrand } = useGetCarsFilterActions();

  const selectOptions = useMemo(() => {
    return data.map((e) => ({ value: e.uuid, label: upperFirst(e.title) }))
  }, [data]);

  const onChange = (value: string) => {
    setBrandUUID(value);
    if (value) {
      setSearchParams({ brand: `${value}` })
    } else {
      setSearchParams({});
    }
    clearAllForNewBrand();
  }

  useEffect(() => {
    const brandUUIDFromParams = searchParams.get('brand');

    if (brandUUIDFromParams) {
      setBrandUUID(brandUUIDFromParams);    
    }
  }, []);

  return (
    <Col style={{ display: 'flex', flexDirection: 'column'}}>
      <Select
        loading={isLoading}
        showSearch
        value={(data.length && brandUUID) || null}
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
