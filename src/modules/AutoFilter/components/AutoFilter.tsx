import { Col, Row } from 'antd';

import classes from './AutoFilter.module.css';

import AutoBrandSelect from '../../../components/AutoFilterSelects/AutoBrandSelect';
import AutoModelSelect from '../../../components/AutoFilterSelects/AutoModelSelect';
import AutoGenerationSelect from '../../../components/AutoFilterSelects/AutoGenerationSelect';
import SaveCarsFromOptions from './SaveCarsFromOptions/SaveCarsFromOptions';
import FetchAllCars from './FetchAllCars/FetchAllCars';
import Filter from '../../MileageCars/components/Filter/Filter';

import { useGetBrandsQuery } from '../../../pages/Transport/store/transportApi';
import { useTypedSelector } from '../../../hooks/useTypedSelector';
import { getBrandId, getModelId } from '../../../pages/Transport';
import GreenButton from '../../../components/Button/GreenButton';

const AutoBrandFilter = () => {
  const { data = [], isLoading } = useGetBrandsQuery();

  const brandId = useTypedSelector(getBrandId)
  const modelId = useTypedSelector(getModelId)

  return (
    <Row className={classes.carsFilter}>
      <Col className={classes.banner}>
        <a href="/"  target='_blank'>
          <h1 className={classes.bannerTitle}>try our free telegram bot for the fastest search</h1>
          <GreenButton className={classes.bannerBtn}>
            Let's try
          </GreenButton>
        </a>
      </Col>
      <Col className={classes.filterHeader}>
        <h1 className={classes.carsFilterTitle}>
          Mileage cars
        </h1>
        <span className={classes.carsFilterDescription}>
          List of mileage cars from our database
        </span>
      </Col>
      <Col>
        <FetchAllCars />
        <SaveCarsFromOptions />
      </Col>
      <Col span={24} className={classes.filterList}>
        <Col span={12} className={classes.carsSelects}>
          <AutoBrandSelect
            isLoading={isLoading}
            data={data}
          />
          {brandId && (
            <AutoModelSelect />
          )}
          {brandId && modelId && (
            <AutoGenerationSelect />
          )}
        </Col>
        <Col span={12} className={classes.filterIcon}>
          <Filter />
        </Col>
      </Col>
    </Row>
  )
}

export default AutoBrandFilter;
