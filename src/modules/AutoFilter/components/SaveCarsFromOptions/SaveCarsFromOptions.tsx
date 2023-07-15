import { Checkbox, Col, Row, message } from 'antd';
import { useState } from 'react';

import classes from './SaveCarsFromOptions.module.css';

import GreenButton from '../../../../components/Button/GreenButton';
import ApModal from '../../../../components/Modal/ApModal';

import { useTypedSelector } from '../../../../hooks/useTypedSelector';
import { getAutoFilter } from '../../../../pages/VehiclesSold';
import { useAppDispatch } from '../../../../hooks/useAppDispatch';
import { autoFilterSliceActions } from '../../../../pages/VehiclesSold/store/autoFilterSlice';
import { fetchMileageCarsOnBackend } from '../../../../api/mileageCardApi';

const SaveCarsFromOptions = () => {
  const dispatch = useAppDispatch();

  const [messageApi, contextHolder] = message.useMessage();

  const [isModelOpen, setIsModalOpen] = useState(false);
  const [withPhotosCheckbox, setWithPhotosCheckbox] = useState(true);


  const { generationUUIDs, brandUUID, modelUUID } = useTypedSelector(getAutoFilter);

  const { setTriggerToRefetchCars } = autoFilterSliceActions;

  const fetchCars = async () => {
    const config = {
      brand: brandUUID,
      model: modelUUID,
      generations: generationUUIDs,
      withPhotos: withPhotosCheckbox ? 1 : 0,
    }

    console.log(config);

    closeModal()
    messageApi.open({
      type: 'loading',
      content: 'Fetching in progress..',
      duration: 0,
    });

    await fetchMileageCarsOnBackend(config).then(() => {
      dispatch(setTriggerToRefetchCars(true));
      messageApi.destroy()
      messageApi.open({
        type: 'success',
        content: 'Fetching complete successfully',
      });
    })
  }

  const openModal = () => {
    setIsModalOpen(true)
  };

  const closeModal = () => {
    setIsModalOpen(false)
  }

  const onChangeHandler = () => {
    setWithPhotosCheckbox((prev) => !prev)
  }

  return (
    <>
      {contextHolder}
      <ApModal
        open={isModelOpen}
        title='Do you want to fetch selected cars?'
        onCancel={closeModal}
        destroyOnClose
        footer={(
          <Row className={classes.confirmFooter}>
            <GreenButton mode='modal' onClick={closeModal}>
              Cancel
            </GreenButton>
            <GreenButton mode='modal' onClick={fetchCars}>
              Fetch
            </GreenButton>
          </Row>
        )}>
        <Col className={classes.fetchSelectedCheckbox}>
          <Checkbox checked={withPhotosCheckbox} onChange={onChangeHandler}>
            Do you want also to save car photos on your computer?
          </Checkbox>
        </Col>
      </ApModal>
      <GreenButton
        disabled={!brandUUID}
        className={classes.fetchSelectedCars}
        onClick={openModal}
      >
        Fetch selected
      </GreenButton>
    </>
  )
}

export default SaveCarsFromOptions;
