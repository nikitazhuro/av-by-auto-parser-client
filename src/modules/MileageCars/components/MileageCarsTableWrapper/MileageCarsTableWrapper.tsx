import { Row } from "antd";

import classes from './MileageCarsTableWrapper.module.css';

import MileageCarsTable from '../../../../components/MileageCarsTable/MileageCarsTable';

interface IMileageCarsTableWrapper {
  data: Array<Array<any>>;
  isLoading: boolean;
}

const MileageCarsTableWrapper: React.FC<IMileageCarsTableWrapper> = ({
  data,
  isLoading,
}) => {
  return (
    <Row className={classes.mileageCarsTable}>
      <MileageCarsTable isLoading={isLoading} data={data} />
    </Row>
  )
}

export default MileageCarsTableWrapper;