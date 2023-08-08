import { Col, Row } from 'antd';

import classes from './AutoFilter.module.css';

import AutoBrandSelect from '../../../components/AutoFilterSelects/AutoBrandSelect';
import AutoModelSelect from '../../../components/AutoFilterSelects/AutoModelSelect';
import AutoGenerationSelect from '../../../components/AutoFilterSelects/AutoGenerationSelect';
import SaveCarsFromOptions from './SaveCarsFromOptions/SaveCarsFromOptions';
import FetchAllCars from './FetchAllCars/FetchAllCars';
import Filter from '../../MileageCars/components/Filter/Filter';
import GreenButton from '../../../components/Button/GreenButton';
import FetchPhoneNumbers from './FetchPhoneNumber/FetchPhoneNumbers';

import { useGetBrandsQuery } from '../../../pages/VehiclesSold/store/vehiclesSoldApi';
import { useTypedSelector } from '../../../hooks/useTypedSelector';
import { getBrandUUID, getModelUUID } from '../../../pages/VehiclesSold';


const AutoBrandFilter = () => {
  const { data = [], isLoading } = useGetBrandsQuery();

  const brandUUID = useTypedSelector(getBrandUUID)
  const modelUUID = useTypedSelector(getModelUUID)

  return (
    <Row className={classes.carsFilter}>
      <Col className={classes.banner}>
        <a href="/" target='_blank'>
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
      <Col span={24} className={classes.fetchBtns}>
        <Col>
          <FetchAllCars />
          <SaveCarsFromOptions />
          <FetchPhoneNumbers />
        </Col>
      </Col>
      <Col span={24} className={classes.filterList}>
        <Col span={12} className={classes.carsSelects}>
          <AutoBrandSelect
            isLoading={isLoading}
            data={data}
          />
          {brandUUID && (
            <AutoModelSelect />
          )}
          {brandUUID && modelUUID && (
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
