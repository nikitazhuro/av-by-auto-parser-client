import { Row, Spin } from "antd"

import classes from './LoadingModal.module.css';

interface ILoadingModal {
  spinning: boolean;
}

const LoadingModal: React.FC<ILoadingModal> = ({
  spinning = false,
}) => {

  if (!spinning) return null;

  return (
    <Row className={classes.loadingModal}>
      <h1>Загрузка</h1>
      <Spin spinning={spinning} size="large" />
    </Row>
  )
}

export default LoadingModal;
