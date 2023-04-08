import { Col, Row } from 'antd';

import classes from './LastSoldAuto.module.css';

import LastSoldAutoGallery from './LastSoldAutoGallery';

import { useTypedSelector } from '../../../hooks/useTypedSelector';
import { getAutoFilter } from '../../../pages/Transport';

const LastSoldAuto = () => {
  const { brandId, generationId, modelId } = useTypedSelector(getAutoFilter);

  const showAutoGallery = brandId && generationId && modelId;

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
