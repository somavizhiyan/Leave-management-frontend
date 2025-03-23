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
  Grid2,
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
  adminsignup,
  adminupdate,
  getadmindetails,
  signSelector,
  clearLoading,
} from "../Reducer/reducer/signin.redu";
import {
  employeSelector,
  getemployebyid,
} from "../Reducer/reducer/employe.redu";
import { toast, ToastContainer } from "react-toastify";
const Profile = () => {
  const role = localStorage.getItem("role");
  const ids = localStorage.getItem("id");

  const dispatch = useDispatch();
  const {
    getDepartment,
    getDepartmentById,
    deleteDepartmentLoading,
    createDepartmentLoading,
    updateDepartmentLoading,
  } = useSelector(departmentSelector);

  const { ADMIN_DATA, ADMINSIGIN_DATA, SIGNIN_DATA } =
    useSelector(signSelector);
  const { getEmployeById } = useSelector(employeSelector);

  console.log(ADMIN_DATA, "sdcsd");
  const adminvalidationSchema = Yup.object().shape({
    firstname: Yup.string().required(),
    lastname: Yup.string().required(),
    email: Yup.string().email("email format only").required(),
    oldpassword: Yup.string().required(),
    newpassword: Yup.string()
      .min(6, "Minimum 6 characters required")
      .required(),
    confirmpassword: Yup.string()
      .oneOf([Yup.ref("newpassword"), null], "Passwords must match")
      .required(),
  });

  const employevalidationSchema = Yup.object().shape({
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

  //useeffect
  useEffect(() => {
    if (ADMINSIGIN_DATA) {
      if (ADMINSIGIN_DATA?.data?.message) {
        toast.success(ADMINSIGIN_DATA?.data?.message);
        dispatch(clearLoading());
      }
    }

    if (SIGNIN_DATA) {
      if (SIGNIN_DATA?.data?.message) {
        toast.success(SIGNIN_DATA?.data?.message);
        dispatch(clearLoading());
      }
    }
  }, [ADMINSIGIN_DATA, SIGNIN_DATA]);

  useEffect(() => {
    const query = { query: "", limit: 10, page: 1 };
    role == 0 ? dispatch(getadmindetails(ids)) : dispatch(getemployebyid(ids));
    dispatch(getdepartment(query));
  }, [ids]);

  return (
    <div className="department-container">
      <ToastContainer />
      <div>
        {role == 0 ? (
          <div className="department-container">
            <div>
              <Box component="div" className="">
                <Typography
                  id="modal-title"
                  variant="h6"
                  component="h2"
                  gutterBottom
                >
                  Admin Details
                </Typography>

                <Formik
                  enableReinitialize={true}
                  initialValues={{
                    firstname: ADMIN_DATA?.firstname || "",
                    lastname: ADMIN_DATA?.lastname || "",
                    email: ADMIN_DATA?.email || "",
                    newpassword: "",
                    oldpassword: "",
                    newpassword: "",
                  }}
                  validationSchema={adminvalidationSchema}
                  onSubmit={(formData) => {
                    console.log(formData, "formikemp");
                    formData.id = ids;
                    dispatch(adminupdate(formData));
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
                              label="Email"
                              name="email"
                              fullWidth
                              margin="normal"
                              helperText={<ErrorMessage name="email" />}
                              autoComplete="off"
                            />
                            <Field
                              as={TextField}
                              label="New Password"
                              name="newpassword"
                              type="password"
                              autoComplete="new-password"
                              fullWidth
                              margin="normal"
                              helperText={<ErrorMessage name="newpassword" />}
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
                              label="old Password"
                              name="oldpassword"
                              type="password"
                              fullWidth
                              margin="normal"
                              autoComplete="new-password"
                              helperText={<ErrorMessage name="oldpassword" />}
                            />
                            <Field
                              as={TextField}
                              label="confirm Password"
                              name="confirmpassword"
                              type="password"
                              fullWidth
                              margin="normal"
                              autoComplete="new-password"
                              helperText={
                                <ErrorMessage name="confirmpassword" />
                              }
                            />
                          </Grid2>
                        </Grid2>
                        <Button
                          type="submit"
                          variant="contained"
                          color="primary"
                          sx={{ mt: 2, display: "block", mx: "auto" }}
                        >
                          Update
                        </Button>
                      </Form>
                    </>
                  )}
                </Formik>
              </Box>
            </div>
          </div>
        ) : (
          <Box component="div" className="">
            <Typography
              id="modal-title"
              variant="h6"
              component="h2"
              gutterBottom
            >
              Employee Details
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
                dob: ``,
                gender: getEmployeById?.gender,
                mobileno: getEmployeById?.mobileno || "",
              }}
              validationSchema={employevalidationSchema}
              onSubmit={(formData) => {
                console.log(formData, "formikemp");
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
        )}
      </div>
    </div>
  );
};

export default Profile;
