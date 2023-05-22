import { Col, Divider, Empty, Row, Spin } from 'antd';
import { useMemo } from 'react'

import classes from './MileageCarsGallery.module.css';

import CarGallaryItem from '../../../../components/CarGallaryItem/CarGallaryItem';

interface IMileaageCarsGallery {
  sortOption: string;
  data: Array<Array<any>>
  isLoading: boolean;
}

const MileageCarsGallery: React.FC<IMileaageCarsGallery> = ({
  sortOption,
  data,
  isLoading,
}) => {

  const priceData = useMemo(() => {
    const resultYearCollection: any = {};

    for (let i = 0; i < data.length; i++) {
      const year = data[i][0]?.year;

      if (year) {
        let prices: { byn: number, usd: number }[] = [];

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

  const sortedCars = useMemo(() => {
    return data.map((carsPerYear) => {
      switch (sortOption) {
        case 'date':
          console.log(carsPerYear);

          return carsPerYear.sort((a, b) => new Date(b.data.removedAt).valueOf() - new Date(a.data.removedAt).valueOf())
        case 'price1':
          return carsPerYear.sort((a, b) => b.data.price.usd.amount - a.data.price.usd.amount)
        case 'price2':
          return carsPerYear.sort((a, b) => a.data.price.usd.amount - b.data.price.usd.amount)
      }
    })
  }, [data, sortOption]);

  return (
    <Spin spinning={isLoading}>
      {sortedCars.map((carsByYear) => (
        carsByYear?.length && (
          <Row key={carsByYear[0].year} className={classes.mainContainer}>
            <Row>
              <Divider style={{ margin: '2.5rem 0' }} children={<span style={{ color: "#ff4d4f" }}>{carsByYear[0].year}</span>} />
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
      {!sortedCars.length && (
        <Row className={classes.emptyBlock}>
          <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
        </Row>
      )}
    </Spin>
  )
}

export default MileageCarsGallery;
