import { Button, Checkbox, Modal, Row, message } from 'antd';
import { useState } from 'react';

import classes from './SaveCarsFromOptions.module.css';

import { useTypedSelector } from '../../../../hooks/useTypedSelector';
import { getAutoFilter } from '../../../../pages/Transport';
import { useAppDispatch } from '../../../../hooks/useAppDispatch';
import { autoFilterSliceActions } from '../../../../pages/Transport/store/autoFilterSlice';
import { fetchMileageCarsOnBackend } from '../../../../api/mileageCardApi';

const SaveCarsFromOptions = () => {
  const dispatch = useAppDispatch();

  const [messageApi, contextHolder] = message.useMessage();

  const [isModelOpen, setIsModalOpen] = useState(false);
  const [withPhotosCheckbox, setWithPhotosCheckbox] = useState(true);


  const { generationId, brandId, modelId } = useTypedSelector(getAutoFilter);

  const { setTriggerToRefetchCars } = autoFilterSliceActions;

  const fetchCars = async () => {
    const config = {
      brand: brandId,
      model: modelId,
      generation: generationId,
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
      <Modal
        open={isModelOpen}
        title='Do you want to fetch all the cars?'
        onCancel={closeModal}
        destroyOnClose
        footer={(
          <Row className={classes.confirmFooter}>
            <Button onClick={closeModal}>
              Cancel
            </Button>
            <Button onClick={fetchCars} className={classes.saveBtn} type="primary">
              Fetch
            </Button>
          </Row>
        )}
      >
        <Checkbox checked={withPhotosCheckbox} onChange={onChangeHandler}>
          Do you want also to save car photos on your computer?
        </Checkbox>
      </Modal>
      <Button
        type="primary"
        size="small"
        disabled={!brandId || !modelId}
        style={{
          marginRight: '0.5rem'
        }}
        onClick={openModal}
      >
        Save cars from selected options
      </Button>
    </>
  )
}

export default SaveCarsFromOptions;
