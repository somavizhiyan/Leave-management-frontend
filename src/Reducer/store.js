import { configureStore } from "@reduxjs/toolkit";
import DepartmentReducer from "../Reducer/reducer/department.Redu";
import EmployeReducer from "../Reducer/reducer/employe.redu"
import LeaveTypeReducer from "../Reducer/reducer/leaveType.redu"
import SignEmployeReducer from "../Reducer/reducer/signin.redu"
import LeaveRequestReducer from "../Reducer/reducer/leaverequest.redu";
export const store = configureStore({
  reducer: {
    Department: DepartmentReducer,
    Employe:EmployeReducer,
    LeaveType:LeaveTypeReducer,
    Userempsign:SignEmployeReducer,
    LeaveRequest:LeaveRequestReducer,
  },
});
