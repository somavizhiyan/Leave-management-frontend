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
  Grid2,
  Typography,
  Badge,
  Chip,
} from "@mui/material";
import { SearchIcon } from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import ToggleOnIcon from "@mui/icons-material/ToggleOn";
import ToggleOffIcon from "@mui/icons-material/ToggleOff";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import {
  createemploye,
  employeSelector,
  getemploye,
  deleteemploye,
  getemployebyid,
  updateemploye,
  clearEmployeLoading,
} from "../Reducer/reducer/employe.redu";
import {
  departmentSelector,
  getdepartment,
} from "../Reducer/reducer/department.Redu";
import { toast, ToastContainer } from "react-toastify";

const Employe = () => {
  const {
    createEmployeLoading,
    updateEmployeLoading,
    deleteEmployeLoading,
    getEmploye,
    getEmployeById,
    createEmploye,
    updateEmploye,
    deleteEmploye
  } = useSelector(employeSelector);

  const { getDepartment } = useSelector(departmentSelector);
  console.log(getDepartment, "cawedew");
  const [openCreatemodel, setOpenCreatemodel] = useState(false);
  const [openUpdatemodel, setOpenUpdatemodel] = useState(false);
  // const [status, setstatus] = useState("");
  const [search, setsearch] = useState("");
  const [page, setpage] = useState(1);
  const [show, setShow] = useState(10);
  const dispatch = useDispatch();
  const validationSchema = Yup.object().shape({
    firstname: Yup.string().required(),
    lastname: Yup.string().required(),
    empCode: Yup.string().required(),
    password: Yup.string().min(6, "Minimum 6 characters required").required(),
    empDepartment: Yup.string().required(),
    address: Yup.string().required(),
    city: Yup.string().required(),
    email: Yup.string().email("Enter a email format").required(),
    confirmpassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required(),
    dob: Yup.string().required(),
    gender: Yup.string().required(),
    mobileno: Yup.string()
      .min(10, "Please Check Your Mobile Number")
      .required(),
  });

  //functions
  const handleDelete = (id) => {
    dispatch(deleteemploye(id));
  };
  const handleUpdate = (id) => {
    setOpenUpdatemodel(!openUpdatemodel);
    dispatch(getemployebyid(id));
  };

  const handleStatus = (id, status) => {
    const formData = {
      id: id,
      status: status,
    };
    dispatch(updateemploye(formData));
  };

  //useEffect

  useEffect(() => {
    const query = {
      query: search,
      limit: show,
      page: page,
    };
    dispatch(getemploye(query));
  }, [
    createEmployeLoading,
    updateEmployeLoading,
    deleteEmployeLoading,
    show,
    page,
    search,
  ]);
  useEffect(() => {
    if (createEmploye) {
      console.log("entered");
      if (createEmploye?.data?.message) {
        toast.success(createEmploye?.data?.message);
        dispatch(clearEmployeLoading());
      }
      if (createEmploye?.data?.error) {
        toast.error(createEmploye?.data?.error);
        dispatch(clearEmployeLoading());
      }
    }
    if (updateEmploye) {
      console.log("entered");
      if (updateEmploye?.data?.message) {
        toast.success(updateEmploye?.data?.message);
        dispatch(clearEmployeLoading());
      }
      if (updateEmploye?.response?.data?.error) {
        toast.error(updateEmploye?.response?.data?.error);
        dispatch(clearEmployeLoading());
      }
    }
    if (deleteEmploye) {
      console.log("entered");
      if (deleteEmploye?.data?.message) {
        toast.success(deleteEmploye?.data?.message);
        dispatch(clearEmployeLoading());
      }
      if (deleteEmploye?.response?.data?.error) {
        toast.error(deleteEmploye?.response?.data?.error);
        dispatch(clearEmployeLoading());
      }
    }
  }, [createEmploye, updateEmploye, deleteEmploye]);

  useEffect(() => {
    const query = {
      query: "",
      limit: "",
      page: "",
    };
    dispatch(getdepartment(query));
  }, []);

  return (
    <div className="department-container">
      <ToastContainer/>
      <h4>MANAGE EMPLOYE DETAILS</h4>
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
                value={show}
                label="Age"
                onChange={(e) => setShow(e.target.value)}
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
              Add Employe
            </Button>
          </div>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>S No</TableCell>
                <TableCell>Employe id</TableCell>
                <TableCell>Employe Name</TableCell>
                <TableCell>Department</TableCell>
                <TableCell>Reg at</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {getEmploye?.count !== 0 ? (
                getEmploye?.rows?.map((emp, index) => (
                  <TableRow key={emp?.id}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{emp?.empCode}</TableCell>
                    <TableCell>
                      {emp?.firstname + " " + emp?.lastname}
                    </TableCell>
                    <TableCell>
                      {
                        getDepartment?.rows?.filter(
                          (dep) => dep?.id == emp?.empDepartment
                        )?.[0]?.DepartmentName
                      }
                    </TableCell>
                    <TableCell>{emp?.createdAt}</TableCell>
                    <TableCell>
                      <Chip
                        label={emp?.status == 0 ? "Active" : "inactive"}
                        color={emp?.status == 0 ? "success" : "error"}
                      />
                    </TableCell>
                    <TableCell>
                      <Button color="" onClick={() => handleDelete(emp?.id)}>
                        <DeleteIcon />
                      </Button>
                      <Button color="" onClick={() => handleUpdate(emp?.id)}>
                        <EditIcon />
                      </Button>
                      <Button
                        color=""
                        onClick={() => {
                          handleStatus(emp?.id, emp?.status == 0 ? 1 : 0);
                        }}
                      >
                        {emp?.status == 0 ? (
                          <ToggleOnIcon />
                        ) : (
                          <ToggleOffIcon />
                        )}
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <p>No Employes Found</p>
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
            count={Math.ceil(getEmploye?.count / show)}
            page={page}
            onChange={(e, v) => setpage(v)}
            color="grey[400]"
          />
        </Box>
      </div>

      {/* Create Modal Component */}

      <Modal
        open={openCreatemodel}
        onClose={() => setOpenCreatemodel(false)}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
        className="model-wholeContainer"
      >
        <Box component="div" className="modal-container">
          <IconButton
            className="close-btn"
            onClick={() => setOpenCreatemodel(false)}
            sx={{ position: "absolute", right: 8, top: 8 }}
          >
            <CloseIcon />
          </IconButton>

          <Typography id="modal-title" variant="h6" component="h2" gutterBottom>
            Add Employee Details
          </Typography>

          <Formik
            initialValues={{
              firstname: "",
              lastname: "",
              empCode: "",
              password: "",
              empDepartment: "",
              address: "",
              city: "",
              email: "",
              confirmpassword: "",
              dob: "",
              gender: "",
              mobileno: "",
            }}
            validationSchema={validationSchema}
            onSubmit={(formData) => {
              console.log(formData, "formikemp");
              dispatch(createemploye(formData));
              setOpenCreatemodel(!openCreatemodel);
            }}
          >
            {() => (
              <>
                <Form noValidate={" "}>
                  {" "}
                  <Grid2 container spacing={2} className={"classss"}>
                    <Grid2 size={4}>
                      <Field
                        as={TextField}
                        label="First Name"
                        name="firstname"
                        fullWidth
                        margin="normal"
                        helperText={<ErrorMessage name="firstname" />}
                      />
                      <Field
                        as={TextField}
                        label="Employe code"
                        name="empCode"
                        fullWidth
                        margin="normal"
                        helperText={<ErrorMessage name="empCode" />}
                      />
                      <Field
                        as={TextField}
                        label="Password"
                        name="password"
                        type="password"
                        autoComplete="new-password"
                        fullWidth
                        margin="normal"
                        helperText={<ErrorMessage name="password" />}
                      />

                      <Field
                        as={TextField}
                        select
                        label="Department"
                        name="empDepartment"
                        fullWidth
                        margin="normal"
                        helperText={<ErrorMessage name="empDepartment" />}
                      >
                        {getDepartment?.rows?.map((dep) => (
                          <MenuItem value={dep?.id}>
                            {dep?.DepartmentName}
                          </MenuItem>
                        ))}
                      </Field>
                      <Field
                        as={TextField}
                        label="Address"
                        name="address"
                        fullWidth
                        margin="normal"
                        helperText={<ErrorMessage name="address" />}
                      />
                      <Field
                        as={TextField}
                        label="City"
                        name="city"
                        fullWidth
                        margin="normal"
                        helperText={<ErrorMessage name="city" />}
                      />
                    </Grid2>
                    <Grid2 size={4}>
                      <Field
                        as={TextField}
                        label="Last Name"
                        name="lastname"
                        fullWidth
                        margin="normal"
                        helperText={<ErrorMessage name="lastname" />}
                      />
                      <Field
                        as={TextField}
                        label="Email"
                        name="email"
                        fullWidth
                        margin="normal"
                        helperText={<ErrorMessage name="email" />}
                        autoComplete="off"
                      />
                      <Field
                        as={TextField}
                        label="Confirm Password"
                        name="confirmpassword"
                        fullWidth
                        margin="normal"
                        helperText={<ErrorMessage name="confirmpassword" />}
                      />
                      <Field
                        as={TextField}
                        label="Date of Birth"
                        name="dob"
                        type="date"
                        fullWidth
                        margin="normal"
                        InputLabelProps={{
                          shrink: true,
                        }}
                        helperText={<ErrorMessage name="dob" />}
                      />

                      <Field
                        as={TextField}
                        select
                        label="Gender"
                        name="gender"
                        fullWidth
                        margin="normal"
                        helperText={<ErrorMessage name="gender" />}
                      >
                        <MenuItem value={0}>Male</MenuItem>
                        <MenuItem value={1}>Female</MenuItem>
                        <MenuItem value={2}>Other</MenuItem>
                      </Field>

                      <Field
                        as={TextField}
                        label="Phone"
                        name="mobileno"
                        type="tel"
                        fullWidth
                        margin="normal"
                        helperText={<ErrorMessage name="mobileno" />}
                      />
                    </Grid2>
                  </Grid2>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    sx={{ mt: 2 }}
                  >
                    Add
                  </Button>
                </Form>
              </>
            )}
          </Formik>
        </Box>
      </Modal>

      {/*  Update Modal Component */}

      <Modal
        open={openUpdatemodel}
        onClose={() => setOpenUpdatemodel(!openUpdatemodel)}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
        className="model-wholeContainer"
      >
        <Box component="div" className="modal-container">
          <IconButton
            className="close-btn"
            onClick={() => setOpenUpdatemodel(false)}
            sx={{ position: "absolute", right: 8, top: 8 }}
          >
            <CloseIcon />
          </IconButton>

          <Typography id="modal-title" variant="h6" component="h2" gutterBottom>
            Update Employee Details
          </Typography>

          <Formik
            enableReinitialize={true}
            initialValues={{
              firstname: getEmployeById?.firstname || "",
              lastname: getEmployeById?.lastname || "",
              empCode: getEmployeById?.empCode || "",
              password: "",
              empDepartment: getEmployeById?.empDepartment || "",
              address: getEmployeById?.address || "",
              city: getEmployeById?.city || "",
              email: getEmployeById?.email || "",
              confirmpassword: "",
              dob: "",
              gender: getEmployeById?.gender || "",
              mobileno: getEmployeById?.mobileno || "",
            }}
            validationSchema={validationSchema}
            onSubmit={(formData) => {
              console.log(formData, "formikemp");
              formData.id = getEmployeById?.id;
              dispatch(updateemploye(formData));
              setOpenUpdatemodel(!openUpdatemodel);
            }}
          >
            {() => (
              <>
                <Form noValidate={" "}>
                  {" "}
                  <Grid2 container spacing={2} className={"classss"}>
                    <Grid2 size={4}>
                      <Field
                        as={TextField}
                        label="First Name"
                        name="firstname"
                        fullWidth
                        margin="normal"
                        helperText={<ErrorMessage name="firstname" />}
                      />
                      <Field
                        as={TextField}
                        label="Employe code"
                        name="empCode"
                        fullWidth
                        margin="normal"
                        helperText={<ErrorMessage name="empCode" />}
                      />
                      <Field
                        as={TextField}
                        label="Password"
                        name="password"
                        type="password"
                        autoComplete="new-password"
                        fullWidth
                        margin="normal"
                        helperText={<ErrorMessage name="password" />}
                      />

                      <Field
                        as={TextField}
                        select
                        label="Department"
                        name="empDepartment"
                        fullWidth
                        margin="normal"
                        helperText={<ErrorMessage name="empDepartment" />}
                      >
                        {getDepartment?.rows?.map((dep) => (
                          <MenuItem value={dep?.id}>
                            {dep?.DepartmentName}
                          </MenuItem>
                        ))}
                      </Field>
                      <Field
                        as={TextField}
                        label="Address"
                        name="address"
                        fullWidth
                        margin="normal"
                        helperText={<ErrorMessage name="address" />}
                      />
                      <Field
                        as={TextField}
                        label="City"
                        name="city"
                        fullWidth
                        margin="normal"
                        helperText={<ErrorMessage name="city" />}
                      />
                    </Grid2>
                    <Grid2 size={4}>
                      <Field
                        as={TextField}
                        label="Last Name"
                        name="lastname"
                        fullWidth
                        margin="normal"
                        helperText={<ErrorMessage name="lastname" />}
                      />
                      <Field
                        as={TextField}
                        label="Email"
                        name="email"
                        fullWidth
                        margin="normal"
                        helperText={<ErrorMessage name="email" />}
                        autoComplete="off"
                      />
                      <Field
                        as={TextField}
                        label="Confirm Password"
                        name="confirmpassword"
                        fullWidth
                        margin="normal"
                        helperText={<ErrorMessage name="confirmpassword" />}
                      />
                      <Field
                        as={TextField}
                        label="Date of Birth"
                        name="dob"
                        type="date"
                        fullWidth
                        margin="normal"
                        InputLabelProps={{
                          shrink: true,
                        }}
                        helperText={<ErrorMessage name="dob" />}
                      />

                      <Field
                        as={TextField}
                        select
                        label="Gender"
                        name="gender"
                        fullWidth
                        margin="normal"
                        helperText={<ErrorMessage name="gender" />}
                      >
                        <MenuItem value={0}>Male</MenuItem>
                        <MenuItem value={1}>Female</MenuItem>
                        <MenuItem value={2}>Other</MenuItem>
                      </Field>

                      <Field
                        as={TextField}
                        label="Phone"
                        name="mobileno"
                        type="tel"
                        fullWidth
                        margin="normal"
                        helperText={<ErrorMessage name="mobileno" />}
                      />
                    </Grid2>
                  </Grid2>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    sx={{ mt: 2 }}
                  >
                    Update
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

export default Employe;
