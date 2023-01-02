import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Modal from "@mui/material/Modal";

type AlertSuccess = {
  modalOpen: boolean;
};

const AlertSuccess = ({ modalOpen }: AlertSuccess) => {
  return (
    <Modal open={modalOpen}>
      <Alert severity="success">
        <AlertTitle>Success</AlertTitle>
        <strong>
          記事が投稿されました。 <br />
          承認までしばらくお待ちください。
        </strong>
      </Alert>
    </Modal>
  );
};

export default AlertSuccess;
