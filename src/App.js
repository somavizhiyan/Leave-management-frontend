import Signin from "./components/Signin";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Employesignin from "./components/EmployeSignin";
import Sidebar from "./components/Sidebar";
import Dashboard from "./components/Dashboard";
import Department from "./components/Department";
import Leave from "./components/Leave";
import Employe from "./components/Employe";
import LeaveManagement from "./components/LeaveManage";
import Profile from "./components/profile";
import EmployeLeaveApply from "./components/EmplyeLeaveApply";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Signin />} />
          <Route path="/employe_signin" element={<Employesignin />} />

          <Route path="/dashboard" element={<Sidebar />}>
            <Route path="profile" element={<Profile />} />
            <Route path="dash" element={<Dashboard />} />
            <Route path="department" element={<Department />} />
            <Route path="leave" element={<Leave />} />
            <Route path="employe" element={<Employe />} />
            <Route path="leavemanage" element={<LeaveManagement />} />
            <Route path = "leaveapply" element={<EmployeLeaveApply/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
