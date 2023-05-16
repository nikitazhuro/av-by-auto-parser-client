import { Button, Checkbox, Modal, Row, message } from "antd"
import { useState } from "react";

import classes from './FetchAllCars.module.css';

import { fetchMileageCarsOnBackend, fetchMileageCarsOnBackendWithPhotos } from "../../../../api/mileageCardApi";
import { useSpeech } from "../../../../hooks/useSpeech";

const FetchAllCars = () => {
  const [speak] = useSpeech()

  const [messageApi, contextHolder] = message.useMessage();
  const [isModelOpen, setIsModalOpen] = useState(false);
  const [withPhotosCheckbox, setWithPhotosCheckbox] = useState(true);

  const success = () => {
    speak('я закончил парсинг твоих ржавых корыт кожаный ублюдок')
    messageApi.open({
      type: 'success',
      content: 'This is a success message',
    });
  };

  const fetchingMessage = () => {
    messageApi.open({
      type: 'loading',
      content: 'Fetching in progress..',
      duration: 0,
    });
  };

  const fetchAllCars = async () => {
    closeModal();
    fetchingMessage();

    if (withPhotosCheckbox) {
      await fetchMileageCarsOnBackendWithPhotos();

      messageApi.destroy()
      success()
    } else {
      await fetchMileageCarsOnBackend();

      messageApi.destroy()
      success()
    }
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
            <Button onClick={fetchAllCars} className={classes.saveBtn} type="primary">
              Fetch
            </Button>
          </Row>
        )}
      >
        <Checkbox checked={withPhotosCheckbox} onChange={onChangeHandler}>
          Do you want also to save car photos on your computer?
        </Checkbox>
      </Modal>
      <Button onClick={openModal} className={classes.fetchAllCars} size="small" type="primary">
        Fetch all cars
      </Button>
    </>
  )
}

export default FetchAllCars;
