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
  Chip,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { Formik, ErrorMessage, Form, Field } from "formik";
import * as Yup from "yup";
import { useSelector, useDispatch } from "react-redux";
import {
  createdepartment,
  getdepartment,
  departmentSelector,
  deletedepartment,
  getdepartmentbyid,
  updateedepartment,
} from "../Reducer/reducer/department.Redu";
import {
  getleaveType,
  leaveTypeSelector,
} from "../Reducer/reducer/leaveType.redu";
import {
  createleaverequest,
  deleteleaverequest,
  getleaverequest,
  getleaverequestbyid,
  leaverequestSelector,
  updateeleaverequest,
  clearLevReqLoading
} from "../Reducer/reducer/leaverequest.redu";
import {
  employeSelector,
  getemployebyid,
} from "../Reducer/reducer/employe.redu";
import { toast, ToastContainer } from "react-toastify";

const EmployeLeaveApply = () => {
  const ids = localStorage.getItem("id");
  const { getLeaveType } = useSelector(leaveTypeSelector);
  const {
    getLeaveRequest,
    getLeaveRequestById,
    createLeaveRequestLoading,
    updateLeaveRequestLoading,
    deleteLeaveRequestLoading,
    createLeaveRequest,
    updateLeaveRequest,
    deleteLeaveRequest
  } = useSelector(leaverequestSelector);

  const { getEmployeById } = useSelector(employeSelector);
  const [opencreatemodel, setOpencreatemodel] = useState(false);
  const [openupdatemodel, setOpenupdatemodel] = useState(false);
  const [search, setsearch] = useState("");
  const [show, setShow] = useState(10);
  const [page, setpage] = useState(1);
  const [id, setid] = useState();
  const [updateval, setUpdateval] = useState();

  const validationSchema = Yup.object().shape({
    leavetype: Yup.string().required(),
    fromdate: Yup.string().required(),
    todate: Yup.string().required(),
    shortreason: Yup.string().required().max(50, "Maxmium 50 Charecters"),
  });

  const dispatch = useDispatch();

  const handleDelete = (id) => {
    dispatch(deleteleaverequest(id));
  };

  const handleUpdate = (id) => {
    setid(id);
    setUpdateval();
    console.log(id, "cdscd");
    dispatch(getleaverequestbyid(id));
    setOpenupdatemodel(!openupdatemodel);
  };

  useEffect(() => {
    const query = {
      query: search,
      limit: show,
      page: page,
      status: 3,
    };
    dispatch(getleaveType(query));
    dispatch(getleaverequest(query));
    dispatch(getemployebyid(id));
  }, [
    show,
    page,
    search,
    createLeaveRequestLoading,
    deleteLeaveRequestLoading,
    updateLeaveRequestLoading,
    id,
  ]);

  useEffect(() => {
    setid(ids);
  }, [ids]);

  useEffect(() => {
    if (createLeaveRequest) {
      console.log("entered");
      if (createLeaveRequest?.data?.message) {
        toast.success(createLeaveRequest?.data?.message);
        dispatch(clearLevReqLoading());
      }
      if (createLeaveRequest?.data?.error) {
        toast.error(createLeaveRequest?.data?.error);
        dispatch(clearLevReqLoading());
      }
    }
    if (updateLeaveRequest) {
      console.log("entered");
      if (updateLeaveRequest?.data?.message) {
        toast.success(updateLeaveRequest?.data?.message);
        dispatch(clearLevReqLoading());
      }
      if (updateLeaveRequest?.response?.data?.error) {
        toast.error(updateLeaveRequest?.response?.data?.error);
        dispatch(clearLevReqLoading());
      }
    }
    if (deleteLeaveRequest) {
      console.log("entered");
      if (deleteLeaveRequest?.data?.message) {
        toast.success(deleteLeaveRequest?.data?.message);
        dispatch(clearLevReqLoading());
      }
      if (deleteLeaveRequest?.response?.data?.error) {
        toast.error(deleteLeaveRequest?.response?.data?.error);
        dispatch(clearLevReqLoading());
      }
    }
  }, [createLeaveRequest, updateLeaveRequest, deleteLeaveRequest]);
  return (
    <div className="department-container">
      <ToastContainer/>
      <h4>LEAVE APPLY</h4>
      <div>
        <TableContainer component={Paper} className="table-container">
          <div className="table-header">
            <TextField
              variant="outlined"
              placeholder="Search..."
              value={search}
              onChange={(e) => setsearch(e.target.value)}
            />

            <FormControl className="form-select">
              <InputLabel id="demo-simple-select-label">Show</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={show}
                label="Show"
                onChange={(e) => setShow(e.target.value)}
              >
                <MenuItem value={10}>10</MenuItem>
                <MenuItem value={20}>20</MenuItem>
                <MenuItem value={30}>50</MenuItem>
              </Select>
            </FormControl>
            <Button
              variant="contained"
              color="primary"
              onClick={() => setOpencreatemodel(!opencreatemodel)}
            >
              Leave Resquest
            </Button>
          </div>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>S No</TableCell>
                <TableCell>Leave Type</TableCell>
                <TableCell>From</TableCell>
                <TableCell>To</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Created at</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {getLeaveRequest?.count !== 0 ? (
                getLeaveRequest?.rows?.map((row, index) => (
                  <TableRow key={row?.id}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{row?.leavetype}</TableCell>
                    <TableCell>{row?.fromdate}</TableCell>
                    <TableCell>{row?.todate}</TableCell>
                    <TableCell>{row?.shortreason}</TableCell>
                    <TableCell>
                      {row?.status == 2 && (
                        <Chip label={"Pending"} color={"warning"} />
                      )}
                      {row?.status == 1 && (
                        <Chip label={"Approved"} color={"success"} />
                      )}
                      {row?.status == 0 && (
                        <Chip label={"Not Approved"} color={"error"} />
                      )}
                    </TableCell>
                    <TableCell>{row?.createdAt}</TableCell>
                    <TableCell>
                      <Button color="" onClick={() => handleDelete(row?.id)}>
                        <DeleteIcon />
                      </Button>
                      {row?.status == 2 && (
                        <Button color="" onClick={() => handleUpdate(row?.id)}>
                          <EditIcon />
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <p>No Leave Request Found</p>
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
            count={Math.ceil(getLeaveRequest?.count / show)}
            page={page}
            onChange={(e, v) => setpage(v)}
            color="grey[400]"
          />
        </Box>
      </div>

      <Modal
        open={opencreatemodel}
        onClose={() => setOpencreatemodel(!opencreatemodel)}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box component="div" className="modal-container">
          <IconButton
            className="close-btn"
            onClick={() => setOpencreatemodel(!opencreatemodel)}
            sx={{ position: "absolute", right: 8, top: 8 }}
          >
            <CloseIcon />
          </IconButton>

          <Typography id="modal-title" variant="h6" component="h2">
            Leave Form
          </Typography>

          {/* Form */}

          <Formik
            initialValues={{
              leavetype: "",
              fromdate: "",
              todate: "",
              shortreason: "",
            }}
            validationSchema={validationSchema}
            onSubmit={(formData) => {
              console.log(formData, "valuesFromFormik");
              formData.empid = id;
              formData.firstname = getEmployeById?.firstname;
              formData.lastname = getEmployeById?.lastname;
              formData.empCode = getEmployeById?.empCode;
              formData.empDepartment = getEmployeById?.empDepartment;
              formData.address = getEmployeById?.address;
              formData.city = getEmployeById?.city;
              formData.email = getEmployeById?.email;
              formData.gender = getEmployeById?.gender;
              formData.mobileno = getEmployeById?.mobileno;
              formData.dob = getEmployeById?.dob;
              formData.empstatus = getEmployeById?.status;
              dispatch(createleaverequest(formData));
              setOpencreatemodel(!opencreatemodel);
            }}
          >
            {() => (
              <>
                <Form noValidate={" "} className="addition-container">
                  <Field
                    as={TextField}
                    select
                    label="Leave Type"
                    name="leavetype"
                    fullWidth
                    margin="normal"
                    helperText={<ErrorMessage name="leavetype" />}
                  >
                    {getLeaveType?.rows?.map((lev) => (
                      <MenuItem value={lev?.leavetype}>
                        {lev?.leavetype}
                      </MenuItem>
                    ))}
                  </Field>

                  <Field
                    as={TextField}
                    label="From Date"
                    name="fromdate"
                    type="date"
                    fullWidth
                    margin="normal"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    helperText={<ErrorMessage name="fromdate" />}
                  />
                  <Field
                    as={TextField}
                    label="To Date"
                    name="todate"
                    type="date"
                    fullWidth
                    margin="normal"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    helperText={<ErrorMessage name="todate" />}
                  />
                  <Field
                    as={TextField}
                    label="Enter a Short Reason"
                    multiline
                    name="shortreason"
                    fullWidth
                    helperText={<ErrorMessage name="shortreason" />}
                  />

                  <Button type="submit" variant="contained" sx={{ mt: 2 }}>
                    Submit
                  </Button>
                </Form>
              </>
            )}
          </Formik>
        </Box>
      </Modal>

      {/* Update Modal Component */}

      <Modal
        open={openupdatemodel}
        onClose={() => setOpenupdatemodel(!openupdatemodel)}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box component="div" className="modal-container">
          <IconButton
            className="close-btn"
            onClick={() => setOpenupdatemodel(!openupdatemodel)}
            sx={{ position: "absolute", right: 8, top: 8 }}
          >
            <CloseIcon />
          </IconButton>

          <Typography id="modal-title" variant="h6" component="h2">
            Update Form
          </Typography>

          {/* Form */}

          <Formik
            enableReinitialize={true}
            initialValues={{
              leavetype: getLeaveRequestById?.leavetype || "",
              fromdate: getLeaveRequestById?.fromdate || "",
              todate: getLeaveRequestById?.todate || "",
              shortreason: getLeaveRequestById?.shortreason || "",
            }}
            validationSchema={validationSchema}
            onSubmit={(formData) => {
              console.log(formData, "valuesFromFormik");
              formData.id = id;
              dispatch(updateeleaverequest(formData));
              setOpenupdatemodel(!openupdatemodel);
            }}
          >
            {() => (
              <>
                <Form noValidate={" "} className="addition-container">
                  <Field
                    as={TextField}
                    select
                    label="Leave Type"
                    name="leavetype"
                    fullWidth
                    margin="normal"
                    helperText={<ErrorMessage name="leavetype" />}
                  >
                    {getLeaveType?.rows?.map((dep) => (
                      <MenuItem value={dep?.leavetype}>
                        {dep?.leavetype}
                      </MenuItem>
                    ))}
                  </Field>

                  <Field
                    as={TextField}
                    label="From Date"
                    name="fromdate"
                    type="date"
                    fullWidth
                    margin="normal"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    helperText={<ErrorMessage name="fromdate" />}
                  />
                  <Field
                    as={TextField}
                    label="To Date"
                    name="todate"
                    type="date"
                    fullWidth
                    margin="normal"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    helperText={<ErrorMessage name="todate" />}
                  />
                  <Field
                    as={TextField}
                    label="Enter a Short Reason"
                    multiline
                    name="shortreason"
                    fullWidth
                    helperText={<ErrorMessage name="shortreason" />}
                  />

                  <Button type="submit" variant="contained" sx={{ mt: 2 }}>
                    Submit
                  </Button>
                </Form>
              </>
            )}
          </Formik>
        </Box>
      </Modal>
    </div>
  );
};

export default EmployeLeaveApply;
