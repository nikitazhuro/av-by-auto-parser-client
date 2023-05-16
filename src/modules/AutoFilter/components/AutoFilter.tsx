import { Col, Row } from 'antd';

import classes from './AutoFilter.module.css';

import AutoBrandSelect from '../../../components/AutoFilterSelects/AutoBrandSelect';
import AutoModelSelect from '../../../components/AutoFilterSelects/AutoModelSelect';
import AutoGenerationSelect from '../../../components/AutoFilterSelects/AutoGenerationSelect';
import AutoYearSelect from '../../../components/AutoFilterSelects/AutoYearSelect';
import SaveCarsFromOptions from './SaveCarsFromOptions/SaveCarsFromOptions';
import FetchAllCars from './FetchAllCars/FetchAllCars';

import { useGetBrandsQuery } from '../../../pages/Transport/store/transportApi';
import { useTypedSelector } from '../../../hooks/useTypedSelector';
import { getBrandId, getGenerationId, getModelId } from '../../../pages/Transport';

const AutoBrandFilter = () => {
  const { data = [], isLoading } = useGetBrandsQuery();

  const generationId = useTypedSelector(getGenerationId)
  const brandId = useTypedSelector(getBrandId)
  const modelId = useTypedSelector(getModelId)

  return (
    <Row className={classes.carsFilter}>
      <Col className={classes.filterHeader}>
        <span className={classes.carsFilterTitle}>
          Cars filter:
        </span>
        <Col>
          <FetchAllCars />
          <SaveCarsFromOptions />
        </Col>
      </Col>
      <Col span={24} className={classes.filterList}>
        <Col span={6}>
          <AutoBrandSelect
            isLoading={isLoading}
            data={data}
          />
        </Col>
        <Col span={6}>
          {brandId && (
            <AutoModelSelect />
          )}
        </Col>
        <Col span={6}>
          {brandId && modelId && (
            <AutoGenerationSelect />
          )}
        </Col>
        <Col span={6}>
          {brandId && modelId && generationId && (
            <AutoYearSelect />
          )}
        </Col>
      </Col>
    </Row>
  )
}

export default AutoBrandFilter;
