import { Button, notification } from 'antd';

import { useTypedSelector } from '../../../../hooks/useTypedSelector';
import { getAutoFilter } from '../../../../pages/Transport';
import { createMileageCarsToLocalhost, getMileageCarsFromAVApi } from '../../../../api/mileageCardApi';
import { useAppDispatch } from '../../../../hooks/useAppDispatch';
import { autoFilterSliceActions } from '../../../../pages/Transport/store/autoFilterSlice';


const SaveCarsFromOptions = () => {
  const dispatch = useAppDispatch();

  const { generationId, brandId, modelId, year, yearFrom, yearTo } = useTypedSelector(getAutoFilter);

  const { setTriggerToRefetchCars } = autoFilterSliceActions;

  const saveCarsFromSelectedOptions = async (data: Array<any>) => {
    const newData = data.map((e: any) => ({
      year: e.year,
      lastSoldCars: e.data.lastSoldAdverts,
      title: e.data.title,
      mediumPrice: e.data.mediumPrice
    }))
    
  
    const config = {
      brand: brandId,
      model: modelId,
      generation: generationId,
      data: newData,
    }

    return createMileageCarsToLocalhost(config).then(() => {
      notification.success({
        type: 'success',
        message: `Данные успешно сохранены в базу данных`,
      })

      dispatch(setTriggerToRefetchCars(true));
    })
  }

  const getAndSaveCarsFromSelectedOptions = async () => {
    const resultData = [];
    if (year) {
      const data = await getMileageCarsFromAVApi(brandId, modelId, generationId, year);

      if (data) {
        resultData.push({ data, year})
      }

      notification.success({
        type: 'success',
        message: `Данные с AV.by за ${year} г. успешно получены`,
      })

      return saveCarsFromSelectedOptions(resultData)
    } else if (!year && (yearFrom && yearTo)) {

      for (let i = yearFrom; i <= yearTo; i++) {
        const data = await getMileageCarsFromAVApi(brandId, modelId, generationId, i);
        
        if (data) {
          resultData.push({ data, year: i})
        }
      }

      notification.success({
        type: 'success',
        message: `Данные с AV.by за ${yearFrom} - ${yearTo} гг. успешно получены`,
      })

      return saveCarsFromSelectedOptions(resultData)
    } else if (!year && (yearFrom || yearTo)) {
      const data = await getMileageCarsFromAVApi(brandId, modelId, generationId, yearFrom || yearTo);

      if (data) {
        resultData.push({ data, year: yearFrom || yearTo })
      }

      notification.success({
        type: 'success',
        message: `Данные с AV.by за ${yearFrom || yearTo} г. успешно получены`,
      })

      return saveCarsFromSelectedOptions(resultData)
    }

    return notification.error({
      type: 'error',
      message: 'No information about of years of this generation',
    })
  }

  return (
    <Button
      type="primary"
      disabled={!generationId || !brandId || !modelId}
      style={{
        marginRight: '0.5rem'
      }}
      onClick={getAndSaveCarsFromSelectedOptions}
    >
      Save cars from selected options
    </Button>
  )
}

export default SaveCarsFromOptions;
