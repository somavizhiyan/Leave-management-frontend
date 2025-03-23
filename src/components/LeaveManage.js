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
  Card,
  CardContent,
  Grid2,
} from "@mui/material";
import { SearchIcon } from "@mui/icons-material";
import {
  createleaverequest,
  deleteleaverequest,
  getleaverequest,
  getleaverequestbyid,
  leaverequestSelector,
  updateeleaverequest,
} from "../Reducer/reducer/leaverequest.redu";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import {
  getleaveType,
  leaveTypeSelector,
} from "../Reducer/reducer/leaveType.redu";
import {
  employeSelector,
  getemploye,
  getemployebyid,
} from "../Reducer/reducer/employe.redu";
import { ErrorMessage, Field, Form, Formik } from "formik";
const LeaveManagement = () => {
  const dispatch = useDispatch();
  const [search, setsearch] = useState("");
  const [status, setStatus] = useState(3);
  const [show, setShow] = useState(10);
  const [page, setpage] = useState(1);

  const {
    getLeaveRequest,
    getLeaveRequestById,
    createLeaveRequestLoading,
    updateLeaveRequestLoading,
    deleteLeaveRequestLoading,
  } = useSelector(leaverequestSelector);
  const { getLeaveType } = useSelector(leaveTypeSelector);
  const { getEmploye, getEmployeById } = useSelector(employeSelector);

  const [openmodel, setOpenmodel] = useState(false);

  const validationSchema = Yup.object().shape({
    status: Yup.string().required(),
    description: Yup.string().required(),
  });
  
  useEffect(() => {
    const query = {
      query: search,
      limit: show,
      page: page,
      status: status,
    };
    dispatch(getemploye(query));
    dispatch(getleaveType(query));
    dispatch(getleaverequest(query));
  }, [
    show,
    page,
    search,
    status,
    createLeaveRequestLoading,
    deleteLeaveRequestLoading,
    updateLeaveRequestLoading,
  ]);

  const handleAction = (empid, id) => {
    dispatch(getemployebyid(empid));
    dispatch(getleaverequestbyid(id));
    setOpenmodel(!openmodel);
  };

  console.log(
    getLeaveType?.rows?.filter(
      (lev) => lev?.id == getLeaveRequestById?.leavetype
    )?.[0]?.leavetype,
    "wcdecew"
  );

  return (
    <div className="department-container">
      <h4>LEAVE MANAGEMENT</h4>
      <div>
        <TableContainer component={Paper} className="table-container">
          <div className="table-header">
            <TextField variant="outlined" placeholder="Search..." onChange={(e)=>setsearch(e.target.value)} />

            <FormControl className="form-select">
              <InputLabel id="demo-simple-select-label">Show</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={show}
                label="Age"
                onChange={(e) => setShow(e.target.value)}
              >
                <MenuItem value={10}>10</MenuItem>
                <MenuItem value={20}>20</MenuItem>
                <MenuItem value={50}>50</MenuItem>
              </Select>
            </FormControl>

            <FormControl className="form-select">
              <InputLabel id="demo-simple-select-label">Status</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={status}
                label="Age"
                onChange={(e) => setStatus(e.target.value)}
              >
                <MenuItem value={3}>All</MenuItem>
                <MenuItem value={1}>Approved</MenuItem>
                <MenuItem value={0}>Not approved</MenuItem>
                <MenuItem value={2}>Pending</MenuItem>
              </Select>
            </FormControl>
          </div>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>S No</TableCell>
                <TableCell>Employe Name</TableCell>
                <TableCell>Leave Type</TableCell>
                <TableCell>Posted at</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {getLeaveRequest?.count !== 0 ? (
                getLeaveRequest?.rows?.map((lev, index) => (
                  <TableRow>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>
                      {lev?.firstname+" "+lev?.lastname}
                    </TableCell>
                    <TableCell>
                      {
                        lev?.leavetype
                      }
                    </TableCell>
                    <TableCell>{lev?.createdAt}</TableCell>
                    <TableCell>
                      {lev?.status == 2 && (
                        <Chip label={"Pending"} color={"warning"} />
                      )}
                      {lev?.status == 1 && (
                        <Chip label={"Approved"} color={"success"} />
                      )}
                      {lev?.status == 0 && (
                        <Chip label={"Not Approved"} color={"error"} />
                      )}
                    </TableCell>
                    <TableCell>
                      <Button onClick={() => handleAction(lev?.empid, lev?.id)}>
                        {lev?.status == 2 ? "Take action" : "View Details"}
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <></>
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
              onChange={(e,v)=>setpage(v)}
            color="grey[400]"
          />
        </Box>
      </div>

      {/* Modal Component */}
      <Modal
        open={openmodel}
        onClose={() => setOpenmodel(!openmodel)}
        aria-labelledby="modal-title"
      >
        <Card className="modal-container">
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Employee Details
            </Typography>

            <IconButton
              className="close-btn"
              onClick={() => setOpenmodel(false)}
              sx={{ position: "absolute", right: 8, top: 8 }}
            >
              <CloseIcon />
            </IconButton>

            {/* Employee Table */}
            <TableContainer component={Paper} sx={{ p: 2, mb: 2 }}>
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell>
                      <strong>Employee Name :</strong>
                    </TableCell>
                    <TableCell>
                      {getLeaveRequestById?.firstname} {getLeaveRequestById?.lastname}
                    </TableCell>
                    <TableCell>
                      <strong>Emp ID :</strong>
                    </TableCell>
                    <TableCell>{getLeaveRequestById?.empCode}</TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell>
                      <strong>Emp Email ID :</strong>
                    </TableCell>
                    <TableCell>{getLeaveRequestById?.email}</TableCell>
                    <TableCell>
                      <strong>Emp Contact No. :</strong>
                    </TableCell>
                    <TableCell>{getLeaveRequestById?.mobileno}</TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell>
                      <strong>Leave Type :</strong>
                    </TableCell>
                    <TableCell>
                      {
                        getLeaveRequestById?.leavetype
                      }
                    </TableCell>
                    <TableCell>
                      <strong>Leave Date :</strong>
                    </TableCell>
                    <TableCell>
                      From {getLeaveRequestById?.fromdate} to{" "}
                      {getLeaveRequestById?.todate}
                    </TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell>
                      <strong>Leave Description :</strong>
                    </TableCell>
                    <TableCell>{getLeaveRequestById?.shortreason}</TableCell>
                    <TableCell>
                      <strong>Gender :</strong>
                    </TableCell>
                    <TableCell>
                      {getLeaveRequestById?.gender == 0 && "Male"}
                      {getLeaveRequestById?.gender == 1 && "Female"}
                      {getLeaveRequestById?.gender == 3 && "Other"}
                    </TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell>
                      <strong>Leave Status :</strong>
                    </TableCell>
                    <TableCell>
                      {getLeaveRequestById?.status == 0 && "Not Approved"}{" "}
                      {getLeaveRequestById?.status == 1 && "Approved"}{" "}
                      {getLeaveRequestById?.status == 2 && "Pending"}
                    </TableCell>
                    <TableCell>
                      <strong>Posting Date :</strong>
                    </TableCell>
                    <TableCell>{getLeaveRequestById?.createdAt}</TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell>
                      <strong>Admin Remark :</strong>
                    </TableCell>
                    <TableCell>{getLeaveRequestById?.description}</TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell>
                      <strong>Admin Action Taken Date :</strong>
                    </TableCell>
                    <TableCell>
                      {getLeaveRequestById?.updatedAt || "NA"}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>

            {/* Formik Form */}

            {getLeaveRequestById?.status == 2 && (
              <Formik
                initialValues={{
                  status: "",
                  description: "",
                }}
                validationSchema={validationSchema}
                onSubmit={(formData) => {
                  console.log(formData, "valuesFromFormik");
                  formData.id = getLeaveRequestById?.id;
                  dispatch(updateeleaverequest(formData));
                  setOpenmodel(!openmodel);
                }}
              >
                {() => (
                  <>
                    <Form noValidate={" "} className="addition-container">
                      <Field
                        as={TextField}
                        select
                        label="Approval"
                        name="status"
                        fullWidth
                        margin="normal"
                        helperText={<ErrorMessage name="status" />}
                      >
                        <MenuItem value={1}>Approved</MenuItem>
                        <MenuItem value={0}>Not approved</MenuItem>
                      </Field>
                      <Field
                        multiline
                        as={TextField}
                        label="Description"
                        name="description"
                        fullWidth
                        helperText={<ErrorMessage name="description" />}
                      />

                      <Button type="submit" variant="contained" sx={{ mt: 2 }}>
                        Send
                      </Button>
                    </Form>
                  </>
                )}
              </Formik>
            )}
          </CardContent>
        </Card>
      </Modal>
    </div>
  );
};

export default LeaveManagement;
