import React from 'react';

import classes from './LastSoldAutoGallery.module.css';

import { RootState } from '../../../store';
import { useTypedSelector } from '../../../hooks/useTypedSelector';
import { useGetLastSoldCarsQuery } from '../../../pages/Transport/store/transportApi';
import { Col, Row, Spin } from 'antd';
import CarGallaryItem from '../../../components/CarGallaryItem/CarGallaryItem';

const getAutoFilter = (state: RootState) => state.autoFilter;

const LastSoldAutoGallery = () => {
  const { brandId, generationId, modelId, year } = useTypedSelector(getAutoFilter);

  const { data, isLoading } = useGetLastSoldCarsQuery({ brandId, generationId, modelId, year })

  console.log(data, year);

  return (
    <Spin spinning={isLoading}>
      <Row className={classes.price}>
        <h2>Price:</h2>
        <Col span={24} className={classes.priceList}>
          <Col span={6}>
            Medium price - {data?.mediumPrice?.priceUsd} $
          </Col>
          <Col span={6}>
            Minimum price - {data?.mediumPrice?.minPriceUsd} $
          </Col>
          <Col span={6}>
            Maximum price - {data?.mediumPrice?.maxPriceUsd} $
          </Col>
        </Col>
      </Row>
      <h2>Last sold:</h2>
      <Row className={classes.gallary}>
        {data?.lastSoldAdverts?.map((car) => (
          <CarGallaryItem car={car} />
        ))}
      </Row>
    </Spin>
  )
}

export default LastSoldAutoGallery;
