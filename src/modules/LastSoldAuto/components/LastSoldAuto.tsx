import { Col, Row, Select } from 'antd';

import classes from './LastSoldAuto.module.css';

import LastSoldAutoGallery from './LastSoldAutoGallery';

import { useTypedSelector } from '../../../hooks/useTypedSelector';
import { getAutoFilter } from '../../../pages/Transport';
import { useState } from 'react';

const selectOptions = [
  { value: 'date', label: 'Removed date' },
  { value: 'price1', label: 'Price (expensive first)' },
  { value: 'price2', label: 'Price (cheap first)' },
]

const LastSoldAuto = () => {
  const { brandId, generationId, modelId } = useTypedSelector(getAutoFilter);

  const [selectsortOption, setSelectSortOprion] = useState('date');

  const showAutoGallery = brandId && generationId && modelId;

  const onChangeSortHandler = (value: string) => {
    setSelectSortOprion(value);
  }

  return (
    showAutoGallery ? (
      <Row className={classes.carsList}>
        <Col className={classes.carsListHeader}>
          <span className={classes.carsListTitle}>
            Details:
          </span>
        </Col>
        <Col className={classes.sort}>
          <span className={classes.sort__title}>
            Sort:
          </span>
          <Select
            className={classes.sort__select}
            defaultValue={selectsortOption}
            onChange={onChangeSortHandler}
            options={selectOptions}
          />
        </Col>
        <Col>
          <LastSoldAutoGallery sortOption={selectsortOption} />
        </Col>
      </Row>
    )
      : null
  )
}

export default LastSoldAuto;
