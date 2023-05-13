import { Col, Divider, Empty, Row, Spin } from 'antd';
import { useMemo, useState, useEffect } from 'react'

import classes from './LastSoldAutoGallery.module.css';

import CarGallaryItem from '../../../components/CarGallaryItem/CarGallaryItem';

import { useTypedSelector } from '../../../hooks/useTypedSelector';
import { getAutoFilter, getTriggerToRefetchCars } from '../../../pages/Transport';
import { getMileageCarsFromLocalhost } from '../../../api/mileageCardApi';
import { autoFilterSliceActions } from '../../../pages/Transport/store/autoFilterSlice';
import { useAppDispatch } from '../../../hooks/useAppDispatch';

const LastSoldAutoGallery = () => {
  const dispatch = useAppDispatch();

  const { brandId, generationId, modelId, year } = useTypedSelector(getAutoFilter);
  const triggerToRefetchCars = useTypedSelector(getTriggerToRefetchCars)

  const { setTriggerToRefetchCars } = autoFilterSliceActions;

  const [isLoading, setIsLoading] = useState(false)
  const [data, setData] = useState<Array<Array<any>>>([]);

  const fetchData = async (config: any, triggerToRefetchCars?: boolean) => {
    setIsLoading(true)

    const carsList = await getMileageCarsFromLocalhost(config)
    
    const listOfSortedCarsByYear: any[] = [];

    let sortedCarsByYear: any[] = [];

    carsList.sort((a, b) => a?.year - b?.year).forEach((car) => {
      if (!sortedCarsByYear.length) {
        sortedCarsByYear.push(car);
      } else {
        const lastEl = sortedCarsByYear[sortedCarsByYear.length - 1];

        if (car.year === lastEl.year) {
          sortedCarsByYear.push(car);
        } else {
          listOfSortedCarsByYear.push(sortedCarsByYear)
          sortedCarsByYear = [car]
        }
      }
    })

    if (sortedCarsByYear.length) {
      listOfSortedCarsByYear.push(sortedCarsByYear)
    }
 
    setData(listOfSortedCarsByYear);
    setIsLoading(false)

    if (triggerToRefetchCars) {
      dispatch(setTriggerToRefetchCars(false));
    }
  }

  const priceData = useMemo(() => {
    const resultYearCollection: any = {};

    for (let i = 0; i < data.length; i++) {
      const year = data[i][0]?.year;

      if (year) {
        let prices: { byn: number, usd: number}[] = [];

        data[i].forEach((car) => {
          const soldPrice = {
            byn: 0,
            usd: 0,
          }
        
          if (car?.data?.price?.byn?.amount) {
            soldPrice.byn = car.data.price.byn.amount
          }
          if (car?.data?.price?.usd?.amount) {
            soldPrice.usd = car.data.price.usd.amount;
          }

          if (soldPrice.byn || soldPrice.usd) {
            prices.push(soldPrice)
          }
        })

        prices = prices.sort((a, b) => a.usd - b.usd);
        
        resultYearCollection[year] = {
          mediumPrice: {
            usd: (prices.reduce((a, b) => a + b.usd, 0) / prices.length).toFixed(2),
            byn: (prices.reduce((a, b) => a + b.byn, 0) / prices.length).toFixed(2)
          },
          minPrice: prices[0],
          maxPrice: prices[prices.length - 1],
        }
      }
    }

    return resultYearCollection;
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
      {data.map((carsByYear) => (
        carsByYear?.length && (
          <Row key={carsByYear[0].year} className={classes.mainContainer}>
            <Row>
              <Divider style={{ margin: '2.5rem 0' }} children={<span style={{ color: "#ff4d4f" }}>{carsByYear[0].year}</span>} />
              {/* <h2>Actual price:</h2>
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
              </Col> */}
            </Row>
            <Row className={classes.soldPrice}>
              <h2>Sold price:</h2>
              <Col span={24} className={classes.priceList}>
                <Col span={8}>
                  Medium price - {priceData[carsByYear[0].year].mediumPrice.usd} $ ~ {priceData[carsByYear[0].year].mediumPrice.byn} BYN
                </Col>
                <Col span={8}>
                  Minimum price - {priceData[carsByYear[0].year].minPrice.usd} $ ~ {priceData[carsByYear[0].year].minPrice.byn} BYN
                </Col>
                <Col span={8}>
                  Maximum price - {priceData[carsByYear[0].year].maxPrice.usd} $ ~ {priceData[carsByYear[0].year].maxPrice.byn} BYN
                </Col>
              </Col>
            </Row>
            <h2>Last sold:</h2>
            <Row className={classes.gallary}>
              {carsByYear?.map((car) => (
                <CarGallaryItem key={car.id} car={car} />
              ))}
            </Row>
          </Row>
        )
      ))}
      {!data.length && (
        <Row className={classes.emptyBlock}>
          <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
        </Row>
      )}
    </Spin>
  )
}

export default LastSoldAutoGallery;
