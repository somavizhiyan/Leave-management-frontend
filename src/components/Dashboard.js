import React, { useEffect } from "react";
import {
  Box,
  Card,
  Typography,
  CardContent,
  Container,
  Paper,
  CardHeader,
  TableBody,
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  departmentSelector,
  getdepartment,
} from "../Reducer/reducer/department.Redu";
import { employeSelector, getemploye } from "../Reducer/reducer/employe.redu";
import {
  getleaverequest,
  leaverequestSelector,
} from "../Reducer/reducer/leaverequest.redu";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { getDepartment } = useSelector(departmentSelector);
  const { getEmploye } = useSelector(employeSelector);
  const { getLeaveRequest } = useSelector(leaverequestSelector);

  useEffect(() => {
    const query = {
      query: "",
      limit: 10,
      page: 1,
      status: 3,
    };
    dispatch(getdepartment(query));
    dispatch(getleaverequest(query));
    dispatch(getemploye(query));
  }, []);
  return (
    <div className="Dashboard-container">
      <div className="dashboard-header">
        <Card className="dashboard-card">
          <CardContent className="CardContent">
            <Typography>Total Employee</Typography>
            <Typography>{getEmploye?.count}</Typography>
          </CardContent>
        </Card>
        <Card className="dashboard-card">
          <CardContent className="CardContent">
            <Typography>Total Department</Typography>
            <Typography>{getDepartment?.count}</Typography>
          </CardContent>
        </Card>
        <Card className="dashboard-card">
          <CardContent className="CardContent">
            <Typography>Total Leave Request</Typography>
            <Typography>{getLeaveRequest?.count}</Typography>
          </CardContent>
        </Card>
      </div>
      <div className="dashboard-body">
        <h4>LATEST LEAVE APPLICATIONS</h4>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>S no</TableCell>
                <TableCell>Employe Name</TableCell>
                <TableCell>Leave type</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {getLeaveRequest?.count !== 0 ? (
                getLeaveRequest?.rows?.map((lev, index) => (
                  <TableRow>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>
                      {lev?.firstname + " " + lev?.lastname}
                    </TableCell>
                    <TableCell>{lev?.leavetype}</TableCell>
                    <TableCell>
                      {" "}
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
                  </TableRow>
                ))
              ) : (
                <p></p>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

export default Dashboard;
