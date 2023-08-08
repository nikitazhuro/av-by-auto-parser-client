import { Button, Checkbox, Modal, Row, message } from "antd"
import { useState } from "react";

import classes from './FetchPhoneNumbers.module.css';

import { comparePhoneNumberWithCarsOnBackend, fetchPhoneNumberOnBackend } from "../../../../api/mileageCardApi";
import { useSpeech } from "../../../../hooks/useSpeech";
import GreenButton from "../../../../components/Button/GreenButton";
import ApModal from "../../../../components/Modal/ApModal";

const FetchPhoneNumbers = () => {
  const [speak] = useSpeech()

  const [messageApi, contextHolder] = message.useMessage();
  const [isModelOpen, setIsModalOpen] = useState(false);

  const success = () => {
    speak('я закончил парсинг твоих ржавых корыт кожаный ублюдок')
    messageApi.open({
      type: 'success',
      content: 'Fetching complete successfully',
    });
  };

  const fetchingMessage = () => {
    messageApi.open({
      type: 'loading',
      content: 'Fetching in progress..',
      duration: 0,
    });
  };

  const fetchPhoneNumber = async () => {
    closeModal();
    fetchingMessage();

    await fetchPhoneNumberOnBackend();

    messageApi.destroy()
    success()
  }

  const compareCarsWithNumbers = async () => {
    closeModal();
    fetchingMessage();

    await comparePhoneNumberWithCarsOnBackend();

    messageApi.destroy()
    success()
  }

  const openModal = () => {
    setIsModalOpen(true)
  };

  const closeModal = () => {
    setIsModalOpen(false)
  }

  return (
    <>
      {contextHolder}
      <ApModal
        open={isModelOpen}
        title='Do you want to fetch phone numbers or compate it with cars?'
        onCancel={closeModal}
        destroyOnClose
        footer={(
          <Row className={classes.confirmFooter}>
            <GreenButton mode="modal" onClick={closeModal}>
              Cancel
            </GreenButton>
            <GreenButton mode="modal" onClick={compareCarsWithNumbers}>
              Compare cars with numbers
            </GreenButton>
            <GreenButton mode="modal" onClick={fetchPhoneNumber}>
              Fetch numbers
            </GreenButton>
          </Row>
        )}
      >
      </ApModal>
      <GreenButton onClick={openModal} className={classes.fetchAllCars}>
        Fetch phone numbers
      </GreenButton>
    </>
  )
}

export default FetchPhoneNumbers;