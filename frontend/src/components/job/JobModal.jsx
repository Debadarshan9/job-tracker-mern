import { Button, Modal } from "@mui/material";
import styles from "./JobModal.module.scss";
import { OptionsList } from "../../utils/utils.js";
import { useEffect } from "react";
import { StatusEnum } from "../../utils/enum.js";
import { useDispatch, useSelector } from "react-redux";
import {
  createJob,
  fetchJobByJobRefNum,
  fetchJobTableData,
  updateJobByJobRefNum,
} from "../../redux/job/thunk.js";
import { selectJobById } from "../../redux/job/selector.js";
import TextFieldComponent from "../common/TextFieldComponent.jsx";
import { useForm } from "react-hook-form";
import SelectFieldComponent from "../common/SelectFieldComponent.jsx";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";

const JobModal = ({ open, setOpen, editMode, setEditMode, jobRefNum }) => {
  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      title: "",
      companyName: "",
      status: StatusEnum.APPLIED,
    },
  });

  const dispatch = useDispatch();
  const { response } = useSelector(selectJobById);

  useEffect(() => {
    if (editMode && jobRefNum) {
      dispatch(fetchJobByJobRefNum(jobRefNum));
    }
  }, [editMode, jobRefNum]);

  useEffect(() => {
    if (editMode && response) {
      reset({
        title: response.title,
        companyName: response.company.name,
        status: response.status,
      });
    }
  }, [editMode, response]);
  const handleClose = () => {
    setOpen(false);
    reset({
      title: "",
      companyName: "",
      status: StatusEnum.APPLIED,
    });
    setEditMode(false);
  };

  const onSubmit = async (formData) => {
    try {
      const payload = {
        title: formData.title,
        company: {
          name: formData.companyName,
        },
        status: Number(formData.status),
      };
      if (editMode) {
        await dispatch(
          updateJobByJobRefNum({ jobRefNum: jobRefNum, payload: payload }),
        ).unwrap();
      } else {
        await dispatch(createJob(payload)).unwrap();
      }
      handleClose();
      dispatch(fetchJobTableData());
    } catch (error) {
      console.error("Submission is failed", error);
    }
  };

  return (
    <Modal
      open={open}
      onClose={(_, reason) => {
        if (reason === "backdropClick") return;
        if (reason === "escapeKeyDown") return;
        handleClose();
      }}
    >
      <div className={styles.modal}>
        <HighlightOffIcon className={styles.closeBtn} onClick={handleClose} />
        <form
          className={styles.formContainer}
          onSubmit={handleSubmit(onSubmit)}
        >
          <TextFieldComponent
            name="title"
            control={control}
            placeholder="Enter Job Title"
            label="Job Title"
            fullWidth
            required="This field is required!"
          />
          <TextFieldComponent
            name="companyName"
            control={control}
            placeholder="Enter Company name"
            label="Company Name"
            fullWidth
            required="This field is required!"
          />
          <SelectFieldComponent
            name="status"
            control={control}
            label="Status"
            placeholder="Select Status"
            options={OptionsList}
          />
          <Button type="submit" variant="outlined">
            {editMode ? "Update" : "Submit"}
          </Button>
        </form>
      </div>
    </Modal>
  );
};

export default JobModal;
