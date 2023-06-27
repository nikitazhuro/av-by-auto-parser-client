import { Row } from 'antd';

import classes from './MileageCars.module.css';
import { useTypedSelector } from '../../../hooks/useTypedSelector';
import { getAutoFilter, getTriggerToRefetchCars } from '../../../pages/Transport';
import { useEffect, useState } from 'react';
import MileageCarsTable from './MileageCarsTable/MileageCarsTable';
import { useAppDispatch } from '../../../hooks/useAppDispatch';
import { autoFilterSliceActions } from '../../../pages/Transport/store/autoFilterSlice';
import { getMileageCarsFromLocalhost } from '../../../api/mileageCardApi';

const MileageCars = () => {
  const { brandId, generationIds, modelId, year, filterConfig } = useTypedSelector(getAutoFilter);
  const showAutoGallery = brandId && generationIds.length && modelId;

  const dispatch = useAppDispatch();

  const triggerToRefetchCars = useTypedSelector(getTriggerToRefetchCars)

  const { setTriggerToRefetchCars } = autoFilterSliceActions;

  const [isLoading, setIsLoading] = useState(false)
  const [data, setData] = useState<Array<Array<any>>>([]);
  
  const fetchData = async (config: any, triggerToRefetchCars?: boolean) => {
    setIsLoading(true)

    const carsList = await getMileageCarsFromLocalhost(config);
    
    if (!carsList.length) {      
      setIsLoading(false);
      setData([]);
      return;
    }
    
    const listOfSortedCarsByYear: any[] = [];

    let sortedCarsByYear: any[] = [];

    carsList.sort((a, b) => a?.year - b?.year).forEach((car) => {
      if (!sortedCarsByYear.length) {
        sortedCarsByYear.push(car);
      } else {
        const lastEl = sortedCarsByYear[sortedCarsByYear.length - 1];

        if (car.year === lastEl.year) {
          sortedCarsByYear.push(car);
        } else {
          listOfSortedCarsByYear.push(sortedCarsByYear);
          sortedCarsByYear = [car]
        }
      }
    })

    if (sortedCarsByYear.length) {
      listOfSortedCarsByYear.push(sortedCarsByYear);
    }

    setData(listOfSortedCarsByYear);
    setIsLoading(false)

    if (triggerToRefetchCars) {
      dispatch(setTriggerToRefetchCars(false));
    }
  }
  useEffect(() => {
    if (brandId && generationIds.length && modelId) {
      const config: any = {
        brand: brandId,
        generations: generationIds,
        model: modelId,
        year,
      };

      if (filterConfig) {
        config.filter = filterConfig;
      }

      fetchData(config);
    }
  }, [
    brandId,
    generationIds,
    modelId,
    year,
    filterConfig,
  ])

  useEffect(() => {
    if (
      brandId
      && generationIds.length
      && modelId
      && triggerToRefetchCars
    ) {
      const config = {
        brand: brandId,
        generations: generationIds,
        model: modelId,
        year,
      };

      fetchData(config, triggerToRefetchCars)
    }
  }, [
    triggerToRefetchCars,
    brandId,
    generationIds,
    modelId,
    year,
  ])

  return (
    showAutoGallery ? (
      <Row className={classes.carsList}>
        <MileageCarsTable data={data} isLoading={isLoading} />
      </Row>
    )
      : null
  )
}

export default MileageCars;
