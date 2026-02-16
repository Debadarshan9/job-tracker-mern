import { Button, Modal, Typography } from "@mui/material";
import styles from "./Deletemodal.module.scss";
const DeleteModal = ({ open, handleClose, handleConfirm }) => {
  return (
    <Modal open={open} onClose={handleClose}>
      <div className={styles.container}>
        <Typography variant="subtitle1">
          Are you sure want to delete this record
        </Typography>
        <div className={styles.btnWrapper}>
          <Button variant="contained" onClick={handleConfirm}>
            Yes
          </Button>
          <Button variant="outlined" onClick={handleClose}>
            No
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteModal;
