import { Col, Divider, Row, Spin } from 'antd';
import { useState } from 'react'

import classes from './LastSoldAutoGallery.module.css';

import CarGallaryItem from '../../../components/CarGallaryItem/CarGallaryItem';

import { useTypedSelector } from '../../../hooks/useTypedSelector';
import { getAutoFilter, getTriggerToRefetchCars } from '../../../pages/Transport';
import { useEffect } from 'react';
import { getMileageCarsFromLocalhost } from '../../../api/mileageCardApi';
import { IMileageCars } from '../../../api/dto';
import { autoFilterSliceActions } from '../../../pages/Transport/store/autoFilterSlice';
import { useAppDispatch } from '../../../hooks/useAppDispatch';

const LastSoldAutoGallery = () => {
  const dispatch = useAppDispatch();

  const { brandId, generationId, modelId, year } = useTypedSelector(getAutoFilter);
  const triggerToRefetchCars = useTypedSelector(getTriggerToRefetchCars)

  const { setTriggerToRefetchCars } = autoFilterSliceActions;

  const [isLoading, setIsLoading] = useState(false)
  const [data, setData] = useState<Array<IMileageCars>>([]);

  const fetchData = async (config: any, triggerToRefetchCars?: boolean) => {
    setIsLoading(true)

    const response = await getMileageCarsFromLocalhost(config)

    setData(response.sort((a, b) => a?.year - b?.year));
    setIsLoading(false)

    if (triggerToRefetchCars) {
      dispatch(setTriggerToRefetchCars(false));
    }
  }

  useEffect(() => {
    if (brandId && generationId && modelId) {
      const config = {
        brand: brandId,
        generation: generationId,
        model: modelId,
        year,
      };

      fetchData(config)
    }
  }, [brandId, generationId, modelId, year])

  useEffect(() => {
    if (brandId && generationId && modelId && triggerToRefetchCars) {
      const config = {
        brand: brandId,
        generation: generationId,
        model: modelId,
        year,
      };

      fetchData(config, triggerToRefetchCars)
    }
  }, [triggerToRefetchCars, brandId, generationId, modelId, year])

  return (
    <Spin spinning={isLoading}>
      {data.map((yearData) => (
        yearData?.year && (
          <>
            <Row className={classes.price}>
              <Divider style={{ margin: '2.5rem 0' }} children={<span style={{ color: "#ff4d4f" }}>{yearData.year}</span>} />
              <h2>Price:</h2>
              <Col span={24} className={classes.priceList}>
                <Col span={6}>
                  Medium price - {yearData.data?.mediumPrice?.priceUsd} $
                </Col>
                <Col span={6}>
                  Minimum price - {yearData.data?.mediumPrice?.minPriceUsd} $
                </Col>
                <Col span={6}>
                  Maximum price - {yearData.data?.mediumPrice?.maxPriceUsd} $
                </Col>
              </Col>
            </Row>
            <h2>Last sold:</h2>
            <Row className={classes.gallary}>
              {yearData.data?.lastSoldCars?.map((car) => (
                <CarGallaryItem key={car.id} car={car} />
              ))}
            </Row>
          </>
        )
      ))}
    </Spin>
  )
}

export default LastSoldAutoGallery;
