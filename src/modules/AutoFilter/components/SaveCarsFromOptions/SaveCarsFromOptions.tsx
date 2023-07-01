import { Checkbox, Col, Modal, Row, message } from 'antd';
import { useState } from 'react';

import classes from './SaveCarsFromOptions.module.css';

import { useTypedSelector } from '../../../../hooks/useTypedSelector';
import { getAutoFilter } from '../../../../pages/Transport';
import { useAppDispatch } from '../../../../hooks/useAppDispatch';
import { autoFilterSliceActions } from '../../../../pages/Transport/store/autoFilterSlice';
import { fetchMileageCarsOnBackend } from '../../../../api/mileageCardApi';
import GreenButton from '../../../../components/Button/GreenButton';
import ApModal from '../../../../components/Modal/ApModal';

const SaveCarsFromOptions = () => {
  const dispatch = useAppDispatch();

  const [messageApi, contextHolder] = message.useMessage();

  const [isModelOpen, setIsModalOpen] = useState(false);
  const [withPhotosCheckbox, setWithPhotosCheckbox] = useState(true);


  const { generationIds, brandId, modelId } = useTypedSelector(getAutoFilter);

  const { setTriggerToRefetchCars } = autoFilterSliceActions;

  const fetchCars = async () => {
    const config = {
      brand: brandId,
      model: modelId,
      generations: generationIds,
      withPhotos: withPhotosCheckbox ? 1 : 0,
    }

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
        disabled={!brandId || !modelId}
        className={classes.fetchSelectedCars}
        onClick={openModal}
      >
        Fetch selected
      </GreenButton>
    </>
  )
}

export default SaveCarsFromOptions;
