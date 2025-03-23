import React, { useEffect, useState } from "react";
import {
  Table,
  TableContainer,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  TextField,
  TableFooter,
  Stack,
  Pagination,
  Box,
  Modal,
  Typography,
} from "@mui/material";
import { SearchIcon } from "@mui/icons-material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import * as Yup from "yup";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch, useSelector } from "react-redux";
import { ErrorMessage, Field, Form, Formik } from "formik";
import {
  createleaveType,
  deleteleaveType,
  getleaveType,
  getleaveTypebyid,
  leaveTypeSelector,
  updateeleaveType,
  clearLeaveTypeLoading
} from "../Reducer/reducer/leaveType.redu";
import { toast, ToastContainer } from "react-toastify";
const Leave = () => {
  const dispatch = useDispatch();
  const {
    getLeaveType,
    createLeaveTypeLoading,
    updateLeaveTypeLoading,
    deleteLeaveTypeLoading,
    getLeaveTypeById,
    createLeaveType,
    updateLeaveType,
    deleteLeaveType,
  } = useSelector(leaveTypeSelector);
  const [openCreatemodel, setOpenCreatemodel] = useState(false);
  const [openUpdatemodel, setOpenUpdatemodel] = useState(false);
  const [page, setpage] = useState(1);
  const [limit, setlimit] = useState(10);
  const [search, setsearch] = useState("");
  const validationSchema = Yup.object().shape({
    leavetype: Yup.string().required(),
    leavedescription: Yup.string().required(),
  });

  // functions

  const handleDelete = (id) => {
    dispatch(deleteleaveType(id));
  };

  const handleUpdate = (id) => {
    dispatch(getleaveTypebyid(id));
    setOpenUpdatemodel(!openUpdatemodel);
  };

  //useeffects

  useEffect(() => {
    const query = {
      query: search,
      limit: limit,
      page: page,
    };
    dispatch(getleaveType(query));
  }, [
    createLeaveTypeLoading,
    updateLeaveTypeLoading,
    deleteLeaveTypeLoading,
    search,
    page,
    limit,
  ]);

  useEffect(() => {
    if (createLeaveType) {
      console.log("entered");
      if (createLeaveType?.data?.message) {
        toast.success(createLeaveType?.data?.message);
        dispatch(clearLeaveTypeLoading());
      }
      if (createLeaveType?.data?.error) {
        toast.error(createLeaveType?.data?.error);
        dispatch(clearLeaveTypeLoading());
      }
    }
    if (updateLeaveType) {
      console.log("entered");
      if (updateLeaveType?.data?.message) {
        toast.success(updateLeaveType?.data?.message);
        dispatch(clearLeaveTypeLoading());
      }
      if (updateLeaveType?.response?.data?.error) {
        toast.error(updateLeaveType?.response?.data?.error);
        dispatch(clearLeaveTypeLoading());
      }
    }
    if (deleteLeaveType) {
      console.log("entered");
      if (deleteLeaveType?.data?.message) {
        toast.success(deleteLeaveType?.data?.message);
        dispatch(clearLeaveTypeLoading());
      }
      if (deleteLeaveType?.response?.data?.error) {
        toast.error(deleteLeaveType?.response?.data?.error);
        dispatch(clearLeaveTypeLoading());
      }
    }
  }, [createLeaveType, updateLeaveType, deleteLeaveType]);
  return (
    <div className="department-container">
      <ToastContainer/>
      <h4>MANAGE LEAVE TYPE</h4>
      <div>
        <TableContainer component={Paper} className="table-container">
          <div className="table-header">
            <TextField
              variant="outlined"
              placeholder="Search..."
              onChange={(e) => setsearch(e.target.value)}
            />

            <FormControl className="form-select">
              <InputLabel id="demo-simple-select-label">Show</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={limit}
                label="Age"
                onChange={(e) => setlimit(e.target.value)}
              >
                <MenuItem value={10}>10</MenuItem>
                <MenuItem value={20}>20</MenuItem>
                <MenuItem value={50}>50</MenuItem>
              </Select>
            </FormControl>
            <Button
              variant="contained"
              color="primary"
              onClick={() => setOpenCreatemodel(!openCreatemodel)}
            >
              Add Leave-Type
            </Button>
          </div>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>S No</TableCell>
                <TableCell>Leave Type</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Created at</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {getLeaveType?.count !== 0 ? (
                getLeaveType?.rows?.map((lev, index) => (
                  <TableRow>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{lev?.leavetype}</TableCell>
                    <TableCell>{lev?.leavedescription}</TableCell>
                    <TableCell>{lev?.createdAt}</TableCell>
                    <TableCell>
                      <Button color="" onClick={() => handleDelete(lev.id)}>
                        <DeleteIcon />
                      </Button>
                      <Button color="" onClick={() => handleUpdate(lev?.id)}>
                        <EditIcon />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <p>No leave types found</p>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            padding: "10px 0",
          }}
        >
          <Pagination
            count={Math.ceil(getLeaveType?.count / limit)}
            page={page}
            onChange={(e, v) => setpage(v)}
            color="grey[400]"
          />
        </Box>
      </div>

      {/*Create Modal Component */}

      <Modal
        open={openCreatemodel}
        onClose={() => setOpenCreatemodel(!openCreatemodel)}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box component="div" className="modal-container">
          <IconButton
            className="close-btn"
            onClick={() => setOpenCreatemodel(!openCreatemodel)}
            sx={{ position: "absolute", right: 8, top: 8 }}
          >
            <CloseIcon />
          </IconButton>

          <Typography id="modal-title" variant="h6" component="h2">
            Add Leave Type
          </Typography>

          {/* Input Fields */}

          <Formik
            initialValues={{
              leavetype: "",
              leavedescription: "",
            }}
            validationSchema={validationSchema}
            onSubmit={(formData) => {
              console.log(formData, "lvtyp");
              dispatch(createleaveType(formData));
              setOpenCreatemodel(!openCreatemodel);
            }}
          >
            {() => (
              <Form noValidate={" "}>
                <Field
                  as={TextField}
                  label="Enter Leave Type"
                  name="leavetype"
                  fullWidth
                  margin="normal"
                  helperText={<ErrorMessage name="leavetype" />}
                />
                <Field
                  as={TextField}
                  label="Enter Leave Description"
                  name="leavedescription"
                  fullWidth
                  margin="normal"
                  helperText={<ErrorMessage name="leavedescription" />}
                />

                <Button
                  type="submit"
                  variant="contained"
                  className="submit-btn"
                >
                  Add
                </Button>
              </Form>
            )}
          </Formik>
        </Box>
      </Modal>

      {/* Update Modal Component */}

      <Modal
        open={openUpdatemodel}
        onClose={() => setOpenUpdatemodel(!openUpdatemodel)}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box component="div" className="modal-container">
          <IconButton
            className="close-btn"
            onClick={() => setOpenUpdatemodel(!openUpdatemodel)}
            sx={{ position: "absolute", right: 8, top: 8 }}
          >
            <CloseIcon />
          </IconButton>

          <Typography id="modal-title" variant="h6" component="h2">
            Update Leave Type
          </Typography>

          {/* inputs */}
          <Formik
            enableReinitialize={true}
            initialValues={{
              leavetype: getLeaveTypeById?.leavetype || "",
              leavedescription: getLeaveTypeById?.leavedescription || "",
            }}
            validationSchema={validationSchema}
            onSubmit={(formData) => {
              formData.id = getLeaveTypeById?.id;
              dispatch(updateeleaveType(formData));
              setOpenUpdatemodel(!openUpdatemodel);
            }}
          >
            {() => (
              <Form noValidate={" "}>
                <Field
                  as={TextField}
                  label="Enter Leave Type"
                  name="leavetype"
                  fullWidth
                  margin="normal"
                  helperText={<ErrorMessage name="leavetype" />}
                />
                <Field
                  as={TextField}
                  label="Enter Leave Description"
                  name="leavedescription"
                  fullWidth
                  margin="normal"
                  helperText={<ErrorMessage name="leavedescription" />}
                />

                <Button
                  type="submit"
                  variant="contained"
                  className="submit-btn"
                >
                  Update
                </Button>
              </Form>
            )}
          </Formik>
        </Box>
      </Modal>
    </div>
  );
};

export default Leave;
