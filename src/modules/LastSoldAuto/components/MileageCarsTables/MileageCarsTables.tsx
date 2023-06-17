import { useEffect, useState } from 'react';
import { Row, Tabs, TabsProps } from "antd";

import classes from './MileageCarsTables.module.css';

import MileageCarsTable from '../../../../components/MileageCarsTable/MileageCarsTable';

interface IMileageCarsTables {
  data: Array<Array<any>>;
  isLoading: boolean;
}

const MileageCarsTables: React.FC<IMileageCarsTables> = ({
  data,
  isLoading,
}) => {
  const [tabs, setTabs] = useState<TabsProps['items']>([])

  useEffect(() => {
    if (data.length) {
      let newTabs = [[], ...data].map((yearCars, i) => {        
        if (i === 0) {
          return ({
            label: 'All',
            key: '0',
            children: (
              <Row className={classes.mileageCarsTable}>
                <MileageCarsTable isLoading={isLoading} data={data.flat(1)} />
              </Row>
            ),
          })
        }
        return ({
          label: yearCars[0].year,
          key: yearCars[0].year,
          children: (
            <Row>
              <MileageCarsTable isLoading={isLoading} data={yearCars} />
            </Row>
          )
        })
      })
      setTabs(newTabs);
    } else {
      setTabs([])
    }
  }, [data, isLoading])
  return (
    <Tabs
      style={{
        width: "100%"
      }}
      items={tabs}
    />
  )
}

export default MileageCarsTables;