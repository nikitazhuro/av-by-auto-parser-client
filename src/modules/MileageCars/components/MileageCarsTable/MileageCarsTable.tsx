import { useEffect, useState } from 'react';
import { Row, Tabs, TabsProps } from "antd";

import classes from './MileageCarsTable.module.css';

import MileageCarsTable from '../../../../components/MileageCarsTable/MileageCarsTable';

interface IMileageCarsTables {
  data: Array<Array<any>>;
  isLoading: boolean;
}

const MileageCarsTables: React.FC<IMileageCarsTables> = ({
  data,
  isLoading,
}) => {
  return (
    <Row className={classes.mileageCarsTable}>
      <MileageCarsTable isLoading={isLoading} data={data.flat(1)} />
    </Row>
  )
}

export default MileageCarsTables;