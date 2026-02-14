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
import { deleteJobById, fetchJobTableData } from "../redux/job/thunk.js";
import { selectJobTableData } from "../redux/job/selector.js";
import JobModal from "../components/job/JobModal.jsx";
import { OptionsList } from "../utils/utils.js";
const JobPage = () => {
  const { response } = useSelector(selectJobTableData);
  const [openModal, setOpenModal] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchJobTableData());
  }, []);

  const renderStatusText = (status) => {
    return OptionsList.find((option) => option.value === status).viewValue;
  };

  const handleActionClick = (e, row) => {
    setAnchorEl(e.currentTarget);
    setSelectedJob(row._id);
  };

  const handleMenuClose = (e) => {
    setAnchorEl(null);
  };

  const handleEditClick = () => {
    setOpenModal(true);
    setEditMode(true);
    handleMenuClose();
  };

  const handleDeleteClick = async () => {
    try {
      await dispatch(deleteJobById(selectedJob)).unwrap();
      dispatch(fetchJobTableData());
    } catch (error) {
      console.error("Delete is failed", error);
    } finally {
      setAnchorEl(null);
    }
  };

  const renderTableCell = (column, rowData) => {
    switch (column.id) {
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
        return <TableCell>{renderStatusText(rowData.status)}</TableCell>;
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
        <span>Jobs</span>
        <Button variant="contained" onClick={handleOpen}>
          Add
        </Button>
      </div>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleEditClick}>Edit</MenuItem>
        <MenuItem onClick={handleDeleteClick}>Delete</MenuItem>
      </Menu>
      <TableContainer className={styles.tableContainier}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {TableColumns.map((item) => (
                <TableCell key={item.id}>{item.name}</TableCell>
              ))}
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {response?.map((item) => (
              <TableRow>
                {TableColumns.map((column) => renderTableCell(column, item))}
                <TableCell onClick={(event) => handleActionClick(event, item)}>
                  .
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <JobModal
        open={openModal}
        editMode={editMode}
        setOpen={setOpenModal}
        jobRefNum={selectedJob}
      />
    </div>
  );
};

export default JobPage;
