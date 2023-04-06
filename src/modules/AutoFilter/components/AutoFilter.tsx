import { Button, Col, Row } from 'antd';

import classes from './AutoFilter.module.css';

import AutoBrandSelect from '../../../components/AutoBrandSelect';
import AutoModelSelect from '../../../components/AutoModelSelect';
import AutoGenerationSelect from '../../../components/AutoGenerationSelect';
import AutoYearSelect from '../../../components/AutoYearSelect';

import { useGetBrandsQuery } from '../../../pages/Transport/store/transportApi';
import { useTypedSelector } from '../../../hooks/useTypedSelector';
import { RootState } from '../../../store';

const getAutoFilter = (state: RootState) => state.autoFilter;

const AutoBrandFilter = () => {
  const { data = [], isLoading } = useGetBrandsQuery();

  const { generationId, brandId, modelId, year } = useTypedSelector(getAutoFilter)
  
  return (
    <Row className={classes.carsFilter}>
      <Col className={classes.filterHeader}>
        <span className={classes.carsFilterTitle}>
          Cars filter:
        </span>
        {/* <Button
          disabled={!brandId || !modelId || !generationId || !year}
          type="primary"
        >
          Show last sold
        </Button> */}
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
