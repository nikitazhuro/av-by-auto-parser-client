import { Row } from 'antd';
import { useEffect, useState } from 'react';

import classes from './MileageCars.module.css';

import MileageCarsTableWrapper from './MileageCarsTableWrapper/MileageCarsTableWrapper';

import { useTypedSelector } from '../../../hooks/useTypedSelector';
import { getAutoFilter, getTriggerToRefetchCars } from '../../../pages/Transport';
import { useAppDispatch } from '../../../hooks/useAppDispatch';
import { autoFilterSliceActions } from '../../../pages/Transport/store/autoFilterSlice';
import { getMileageCarsFromLocalhost } from '../../../api/mileageCardApi';

const MileageCars = () => {
  const { brandId, generationIds, modelId, filterConfig } = useTypedSelector(getAutoFilter);
  const showAutoGallery = brandId && generationIds.length && modelId;

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
    if (brandId && generationIds.length && modelId) {
      const config: any = {
        brand: brandId,
        generations: generationIds,
        model: modelId,
      };

      if (filterConfig) {
        config.filter = filterConfig;
      }

      fetchData(config);
    }
  }

  useEffect(() => {
    fetchMileageCardWrapper();
  }, [brandId, generationIds, modelId, filterConfig])

  useEffect(() => {
    if (triggerToRefetchCars) {
      fetchMileageCardWrapper();
    }
  }, [triggerToRefetchCars, brandId, generationIds, modelId])

  return (
    showAutoGallery ? (
      <Row className={classes.carsList}>
        <MileageCarsTableWrapper data={data} isLoading={isLoading} />
      </Row>
    )
      : null
  )
}

export default MileageCars;
