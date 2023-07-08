import React, { useMemo, useEffect } from 'react'
import { Col, Select } from "antd";
import { useSearchParams } from 'react-router-dom';

import { useGetCarsFilterActions } from '../../pages/VehiclesSold/store/autoFilterSlice';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { getBrandId } from '../../pages/VehiclesSold';

interface IAutoBrandSelect {
  isLoading: boolean;
  data: Array<{ id: number, name: string }>
}

const AutoBrandSelect: React.FC<IAutoBrandSelect> = ({
  isLoading,
  data,
}) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const brandId = useTypedSelector(getBrandId)

  const { setBrandId, clearAllForNewBrand } = useGetCarsFilterActions();

  const selectOptions = useMemo(() => {
    return data.map((e) => ({ value: e.id, label: e.name }))
  }, [data]);

  const onChange = (value: number) => {
    setBrandId(value);
    if (value) {
      setSearchParams({ brand: `${value}` })
    } else {
      setSearchParams({});
    }
    clearAllForNewBrand();
  }

  useEffect(() => {
    const brandIDFromParams = searchParams.get('brand');

    if (brandIDFromParams) {
      setBrandId(+brandIDFromParams);    
    }
  }, []);

  return (
    <Col style={{ display: 'flex', flexDirection: 'column'}}>
      <Select
        loading={isLoading}
        showSearch
        value={(data.length && brandId) || null}
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
