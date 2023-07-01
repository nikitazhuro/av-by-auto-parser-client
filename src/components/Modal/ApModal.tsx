import { Modal, ModalProps } from "antd";

import './ApModalAnt.css'

const ApModal: React.FC<ModalProps> = ({
  children,
  ...props
}) => {
  if (children) {
    return (
      <Modal {...props} className="ApModal">
        {children}
      </Modal>
    )
  }

  return (
    <Modal {...props} />
  )
}

export default ApModal;