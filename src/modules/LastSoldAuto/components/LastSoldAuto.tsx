import { Col, Row } from 'antd';

import classes from './LastSoldAuto.module.css';

import LastSoldAutoGallery from './LastSoldAutoGallery';

import { useTypedSelector } from '../../../hooks/useTypedSelector';
import { RootState } from '../../../store';

const getAutoFilter = (state: RootState) => state.autoFilter;

const LastSoldAuto = () => {
  const { brandId, generationId, modelId, year } = useTypedSelector(getAutoFilter);

  const showAutoGallery = brandId && generationId && modelId && year;

  return (
    showAutoGallery ? (
      <Row className={classes.carsList}>
        <Col className={classes.carsListHeader}>
          <span className={classes.carsListTitle}>
            Details:
          </span>
        </Col>
        <Col>
          <LastSoldAutoGallery />
        </Col>
      </Row>
    )
      : null
  )
}

export default LastSoldAuto;
