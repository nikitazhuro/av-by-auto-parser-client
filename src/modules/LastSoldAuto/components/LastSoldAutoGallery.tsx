import { Col, Divider, Row, Spin } from 'antd';
import { useMemo, useState } from 'react'

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

  const priceData = useMemo(() => {
    const result = data.map((cars) => {
      const prices = cars.data.lastSoldCars
        .map((car) => ({ usd: car.price.usd.amount, byn: car.price.byn.amount }))
        .sort((a, b) => a.usd - b.usd);

      if (prices) {
        const min = prices[0];
        const max = prices[prices.length - 1]
        const midUSD = (prices.reduce((a, b) => a + b.usd, 0) / prices.length).toFixed(2);
        const midBYN = (prices.reduce((a, b) => a + b.byn, 0) / prices.length).toFixed(2);

        return {
          year: cars.year,
          minPrice: min,
          maxPrice: max,
          mediumUSDPrice: midUSD,
          mediumBYNPrice: midBYN,
        }
      }
    })

    return result;
  }, [JSON.stringify(data)])

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
          <Row key={yearData?.year} className={classes.mainContainer}>
            <Row>
              <Divider style={{ margin: '2.5rem 0' }} children={<span style={{ color: "#ff4d4f" }}>{yearData.year}</span>} />
              <h2>Actual price:</h2>
              <Col span={24} className={classes.priceList}>
                <Col span={8}>
                  Medium price - {yearData.data?.mediumPrice?.priceUsd} $ ~ {yearData.data?.mediumPrice?.priceByn} BYN
                </Col>
                <Col span={8}>
                  Minimum price - {yearData.data?.mediumPrice?.minPriceUsd} $
                </Col>
                <Col span={8}>
                  Maximum price - {yearData.data?.mediumPrice?.maxPriceUsd} $
                </Col>
              </Col>
            </Row>
            <Row className={classes.soldPrice}>
              <h2>Sold price:</h2>
              <Col span={24} className={classes.priceList}>
                <Col span={8}>
                  Medium price - {priceData.find((price) => price?.year === yearData.year)?.mediumUSDPrice} $ ~ {priceData.find((price) => price?.year === yearData.year)?.mediumBYNPrice} BYN
                </Col>
                <Col span={8}>
                  Minimum price - {priceData.find((price) => price?.year === yearData.year)?.minPrice.usd} $ ~ {priceData.find((price) => price?.year === yearData.year)?.minPrice.byn} BYN
                </Col>
                <Col span={8}>
                  Maximum price - {priceData.find((price) => price?.year === yearData.year)?.maxPrice.usd} $ ~ {priceData.find((price) => price?.year === yearData.year)?.maxPrice.byn} BYN
                </Col>
              </Col>
            </Row>
            <h2>Last sold:</h2>
            <Row className={classes.gallary}>
              {yearData.data?.lastSoldCars?.map((car) => (
                <CarGallaryItem key={car.id} car={car} listUUID={yearData.uuid} />
              ))}
            </Row>
          </Row>
        )
      ))}
    </Spin>
  )
}

export default LastSoldAutoGallery;
