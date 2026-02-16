import { useEffect, useState } from "react";
import { TableColumns } from "./JobPage.data.js";
import styles from "./JobPage.module.scss";
import {
  Button,
  Menu,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { deleteJobByJobRefNum, fetchJobTableData } from "../redux/job/thunk.js";
import { selectJobTableData } from "../redux/job/selector.js";
import JobModal from "../components/job/JobModal.jsx";
import { classes, OptionsList } from "../utils/utils.js";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { StatusEnum } from "../utils/enum.js";
import DeleteModal from "../components/deleteModal/DeleteModal.jsx";
const JobPage = () => {
  const { response } = useSelector(selectJobTableData);
  const [openModal, setOpenModal] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [openDelete, setOpenDelete] = useState(false);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchJobTableData());
  }, []);

  const renderStatusText = (status) => {
    return OptionsList.find((option) => option.value === status).viewValue;
  };

  const renderStatusStyle = (status) => {
    switch (status) {
      case StatusEnum.APPLIED:
        return styles.applied;
      case StatusEnum.INTERVIEW:
        return styles.interview;
      case StatusEnum.REJECTED:
        return styles.rejected;
      default:
        return "";
    }
  };

  const handleActionClick = (e, row) => {
    setAnchorEl(e.currentTarget);
    setSelectedJob(row);
  };

  const handleMenuClose = (e) => {
    setAnchorEl(null);
  };

  const handleEditClick = () => {
    setOpenModal(true);
    setEditMode(true);
    handleMenuClose();
  };

  const handleConfirmation = async () => {
    try {
      await dispatch(deleteJobByJobRefNum(selectedJob.jobRefNum)).unwrap();
      dispatch(fetchJobTableData());
    } catch (error) {
      console.error("Delete is failed", error);
    } finally {
      setOpenDelete(false);
    }
  };

  const handleDeleteClick = () => {
    setOpenDelete(true);
    setAnchorEl(null);
  };

  const renderTableCell = (index, column, rowData) => {
    switch (column.id) {
      case "#":
        return <TableCell sx={{ width: "4.5rem" }}>{index + 1}</TableCell>;
      case "title":
        return <TableCell>{rowData.title}</TableCell>;
      case "companyName":
        return <TableCell>{rowData.company.name}</TableCell>;
      case "logo":
        return (
          <TableCell>
            {rowData.company.logoUrl ? (
              <img src={rowData.company.logoUrl} height="30rem" alt="Test" />
            ) : (
              "-"
            )}
          </TableCell>
        );
      case "status":
        return (
          <TableCell>
            <div
              className={classes(
                styles.statusCell,
                renderStatusStyle(rowData.status),
              )}
            >
              {renderStatusText(rowData.status)}
            </div>
          </TableCell>
        );
      case "createdAt":
        return (
          <TableCell>
            {new Date(rowData.createdAt).toLocaleDateString("en-GB")}
          </TableCell>
        );
      default:
        return "-";
    }
  };
  const handleOpen = () => {
    setOpenModal(true);
  };
  return (
    <div className={styles.container}>
      <div className={styles.heading}>
        <span>Jobs List</span>
        <Button variant="contained" onClick={handleOpen}>
          Add Jobs
        </Button>
      </div>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        autoFocus={false}
      >
        <MenuItem onClick={handleEditClick}>Edit</MenuItem>
        <MenuItem onClick={handleDeleteClick}>Delete</MenuItem>
      </Menu>
      <TableContainer className={styles.tableContainier}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {TableColumns.map((item) => (
                <TableCell className={styles.tableHeader} key={item.id}>
                  {item.name}
                </TableCell>
              ))}
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {response?.map((item, index) => (
              <TableRow>
                {TableColumns.map((column) =>
                  renderTableCell(index, column, item),
                )}
                <TableCell onClick={(event) => handleActionClick(event, item)}>
                  <MoreVertIcon className={styles.verticalIcon} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <JobModal
        open={openModal}
        editMode={editMode}
        setEditMode={setEditMode}
        setOpen={setOpenModal}
        jobRefNum={selectedJob?.jobRefNum}
      />
      <DeleteModal
        open={openDelete}
        handleClose={() => setOpenDelete(false)}
        handleConfirm={handleConfirmation}
      />
    </div>
  );
};

export default JobPage;
