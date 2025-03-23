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
  clearDepartmentLoading,
} from "../Reducer/reducer/department.Redu";
import { toast, ToastContainer } from "react-toastify";
const Department = () => {
  const {
    getDepartment,
    getDepartmentById,
    deleteDepartmentLoading,
    createDepartmentLoading,
    updateDepartmentLoading,
    createDepartment,
    updateDepartment,
    deleteDepartment,
  } = useSelector(departmentSelector);
  const [opencreatemodel, setOpencreatemodel] = useState(false);
  const [openupdatemodel, setOpenupdatemodel] = useState(false);
  const [search, setsearch] = useState("");
  const [show, setShow] = useState(10);
  const [page, setpage] = useState(1);
  const [id, setid] = useState();
  const [updateval, setUpdateval] = useState();
  const validationSchema = Yup.object().shape({
    DepartmentCode: Yup.string().required(),
    DepartmentName: Yup.string().required(),
    DepartmentShortName: Yup.string().required(),
  });

  console.log(getDepartmentById, "dccdc");
  console.log(getDepartment?.count, "jhvjh");

  const dispatch = useDispatch();

  const handleDelete = (id) => {
    dispatch(deletedepartment(id));
  };

  const handleUpdate = (id) => {
    setid(id);
    // const currentDep = getDepartment?.rows?.find((row) => row.id === id);
    // console.log(currentDep,'edad')
    setUpdateval();
    console.log(id, "cdscd");
    dispatch(getdepartmentbyid(id));
    setOpenupdatemodel(!openupdatemodel);
  };

  useEffect(() => {
    if (createDepartment) {
      console.log("entered");
      if (createDepartment?.data?.message) {
        toast.success(createDepartment?.data?.message);
        dispatch(clearDepartmentLoading());
      }
      if (createDepartment?.data?.error) {
        toast.error(createDepartment?.data?.error);
        dispatch(clearDepartmentLoading());
      }
    }
    if (updateDepartment) {
      console.log("entered");
      if (updateDepartment?.data?.message) {
        toast.success(updateDepartment?.data?.message);
        dispatch(clearDepartmentLoading());
      }
      if (updateDepartment?.response?.data?.error) {
        toast.error(updateDepartment?.response?.data?.error);
        dispatch(clearDepartmentLoading());
      }
    }
    if (deleteDepartment) {
      console.log("entered");
      if (deleteDepartment?.data?.message) {
        toast.success(deleteDepartment?.data?.message);
        dispatch(clearDepartmentLoading());
      }
      if (deleteDepartment?.response?.data?.error) {
        toast.error(deleteDepartment?.response?.data?.error);
        dispatch(clearDepartmentLoading());
      }
    }
  }, [createDepartment, updateDepartment, deleteDepartment]);

  useEffect(() => {
    const query = {
      query: search,
      limit: show,
      page: page,
    };
    dispatch(getdepartment(query));
  }, [
    deleteDepartmentLoading,
    updateDepartmentLoading,
    createDepartmentLoading,
    show,
    page,
    search,
  ]);

  return (
    <div className="department-container">
      <ToastContainer />
      <h4>MANAGE DEPARTMENTS</h4>
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
              Add Deptarment
            </Button>
          </div>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>S No</TableCell>
                <TableCell>Department Code</TableCell>
                <TableCell>Department Name</TableCell>
                <TableCell>Department Short Name</TableCell>
                <TableCell>Created at</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {getDepartment?.count !== 0 ? (
                getDepartment?.rows?.map((dep, index) => (
                  <TableRow key={dep.id}>
                    <TableCell>{index + 1 + (page - 1) * show}</TableCell>
                    <TableCell>{dep.DepartmentCode}</TableCell>
                    <TableCell>{dep.DepartmentName}</TableCell>
                    <TableCell>{dep.DepartmentShortName}</TableCell>
                    <TableCell>{dep.createdAt}</TableCell>
                    <TableCell>
                      <Button color="" onClick={() => handleDelete(dep.id)}>
                        <DeleteIcon />
                      </Button>
                      <Button color="" onClick={() => handleUpdate(dep?.id)}>
                        <EditIcon />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <center>
                  <p>No data founds</p>
                </center>
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
            count={Math.ceil(getDepartment?.count / show)}
            page={page}
            onChange={(e, v) => setpage(v)}
            color="grey[400]"
          />
        </Box>
      </div>

      {/* Create Modal Component */}
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
            Add Department
          </Typography>

          {/* Form */}

          <Formik
            initialValues={{
              DepartmentCode: "",
              DepartmentName: "",
              DepartmentShortName: "",
            }}
            validationSchema={validationSchema}
            onSubmit={(formData) => {
              console.log(formData, "valuesFromFormik");
              dispatch(createdepartment(formData));
              setOpencreatemodel(!opencreatemodel);
            }}
          >
            {() => (
              <>
                <Form noValidate={" "} className="addition-container">
                  <Field
                    as={TextField}
                    label="Enter Department Code"
                    name="DepartmentCode"
                    fullWidth
                    helperText={<ErrorMessage name="DepartmentCode" />}
                  />
                  <Field
                    as={TextField}
                    label="Enter Department Name"
                    name="DepartmentName"
                    fullWidth
                    helperText={<ErrorMessage name="DepartmentName" />}
                  />
                  <Field
                    as={TextField}
                    label="Enter Department Short Name"
                    name="DepartmentShortName"
                    fullWidth
                    helperText={<ErrorMessage name="DepartmentShortName" />}
                  />

                  <Button type="submit" variant="contained" sx={{ mt: 2 }}>
                    Add
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
            Update Department
          </Typography>

          {/* Form */}

          <Formik
            enableReinitialize={true}
            initialValues={{
              DepartmentCode: getDepartmentById?.DepartmentCode || "",
              DepartmentName: getDepartmentById?.DepartmentName || "",
              DepartmentShortName: getDepartmentById?.DepartmentShortName || "",
            }}
            validationSchema={validationSchema}
            onSubmit={(formData) => {
              console.log(formData, "valuesFromFormik");
              formData.id = id;
              console.log(formData, "hgvgh");
              dispatch(updateedepartment(formData));
              setOpenupdatemodel(!openupdatemodel);
            }}
          >
            {() => (
              <>
                <Form noValidate={" "} className="addition-container">
                  <Field
                    as={TextField}
                    label="Enter Department Code"
                    name="DepartmentCode"
                    fullWidth
                    // value={getDepartmentById?.DepartmentCode}
                    helperText={<ErrorMessage name="DepartmentCode" />}
                  />
                  <Field
                    as={TextField}
                    label="Enter Department Name"
                    name="DepartmentName"
                    fullWidth
                    // value={getDepartmentById?.DepartmentName}
                    helperText={<ErrorMessage name="DepartmentName" />}
                  />
                  <Field
                    as={TextField}
                    label="Enter Department Short Name"
                    name="DepartmentShortName"
                    fullWidth
                    // value={getDepartmentById?.DepartmentShortName}
                    helperText={<ErrorMessage name="DepartmentShortName" />}
                  />

                  <Button type="submit" variant="contained" sx={{ mt: 2 }}>
                    Add
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

export default Department;
