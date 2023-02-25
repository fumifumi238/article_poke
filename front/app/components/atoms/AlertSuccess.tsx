import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Modal from "@mui/material/Modal";
import { ReactNode, useEffect } from "react";

type AlertSuccess = {
  modalOpen: boolean;
  message: ReactNode;
};

const AlertSuccess = ({ modalOpen, message }: AlertSuccess) => {
  return (
    <Modal open={modalOpen}>
      <Alert severity="success">
        <AlertTitle>Success</AlertTitle>
        <div>{message}</div>
      </Alert>
    </Modal>
  );
};

export default AlertSuccess;
