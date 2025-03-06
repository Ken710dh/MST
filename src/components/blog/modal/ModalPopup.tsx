import { Form, Modal, Typography } from "antd";
import React from "react";
import InputField from "../form/InputField";
interface Props {
  isModalOpen: boolean;
  handleCancel: () => void;
  handleOk: () => void;
  modalType: "delete" | "edit";
}

const ModalPopup: React.FC<Props> = ({
  isModalOpen,
  handleCancel,
  handleOk,
  modalType,
}) => {
  return (
    <Modal
      title="Basic Modal"
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <div>
        {modalType === "delete" ? (
          <Typography>Are you sure you want to delete this task?</Typography>
        ) : (
          <div>
            <Typography>Edit Task</Typography>
            <Form></Form>
          </div>
        )}
      </div>
    </Modal>
  );
};

export default ModalPopup;
