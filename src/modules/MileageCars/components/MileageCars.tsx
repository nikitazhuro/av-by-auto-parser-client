import { Col, Row } from 'antd';
import { useEffect, useState } from 'react';

import classes from './MileageCars.module.css';

import MileageCarsTableWrapper from './MileageCarsTableWrapper/MileageCarsTableWrapper';

import { useTypedSelector } from '../../../hooks/useTypedSelector';
import { getAutoFilter, getTriggerToRefetchCars } from '../../../pages/VehiclesSold';
import { useAppDispatch } from '../../../hooks/useAppDispatch';
import { autoFilterSliceActions } from '../../../pages/VehiclesSold/store/autoFilterSlice';
import { getMileageCarsFromLocalhost } from '../../../api/mileageCardApi';

const MileageCars = () => {
  const { brandUUID, generationUUIDs, modelUUID, filterConfig } = useTypedSelector(getAutoFilter);
  const showCarsTable = brandUUID && generationUUIDs.length && modelUUID;

  const dispatch = useAppDispatch();

  const triggerToRefetchCars = useTypedSelector(getTriggerToRefetchCars)

  const { setTriggerToRefetchCars } = autoFilterSliceActions;

  const [isLoading, setIsLoading] = useState(false)
  const [data, setData] = useState<Array<any>>([]);

  const fetchData = async (config: any, triggerToRefetchCars?: boolean) => {
    setIsLoading(true)

    const carsList = await getMileageCarsFromLocalhost(config);

    if (!carsList.length) {
      setIsLoading(false);
      setData([]);
      return;
    }

    setData(carsList);
    setIsLoading(false)

    if (triggerToRefetchCars) {
      dispatch(setTriggerToRefetchCars(false));
    }
  }

  const fetchMileageCardWrapper = () => {
    if (brandUUID && generationUUIDs.length && modelUUID) {
      const config: any = {
        brand: brandUUID,
        generations: generationUUIDs,
        model: modelUUID,
      };

      if (filterConfig) {
        config.filter = filterConfig;
      }

      fetchData(config);
    }
  }

  useEffect(() => {
    fetchMileageCardWrapper();
  }, [brandUUID, generationUUIDs, modelUUID, filterConfig])

  useEffect(() => {
    if (triggerToRefetchCars) {
      fetchMileageCardWrapper();
    }
  }, [triggerToRefetchCars, brandUUID, generationUUIDs, modelUUID])

  return (
    <Row className={classes.milageCarsTableBlock}>
      {showCarsTable
        ? (
          <Col className={classes.carsList}>
            <MileageCarsTableWrapper data={data} isLoading={isLoading} />
          </Col>
        )
        : null
      }
      <Col className={classes.description}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
      </Col>
    </Row>
  )
}

export default MileageCars;
