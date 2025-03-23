import axios from "axios";
const localhost = "http://localhost:5000/api/v1";
export const addDepapi = (formData) => {
  return axios.post(
    "http://localhost:5000/api/v1/department/adddepartment",
    formData
  );
};

export const updateDepapi = (formData) => {
  return axios.put(
    "http://localhost:5000/api/v1/department/updatedepartment/" + formData?.id,
    formData
  );
};

export const deleteDepapi = (id) => {
  return axios.delete(
    "http://localhost:5000/api/v1/department/deletedepartment/" + id
  );
};

export const getDepapi = (query) => {
  return axios.get(
    "http://localhost:5000/api/v1/department/getdepartment?query=" +
      query?.query +
      "&limit=" +
      query?.limit +
      "&page=" +
      query?.page
  );
};
export const getDepapibyid = (id) => {
  return axios.get(
    "http://localhost:5000/api/v1/department/getdepartmentbyid?id=" + id
  );
};
export const addEmpapi = (formData) => {
  return axios.post(
    "http://localhost:5000/api/v1/employe/addemploye",
    formData
  );
};
export const updateEmpapi = (formData) => {
  return axios.put(
    "http://localhost:5000/api/v1/employe/updateemploye/" + formData?.id,
    formData
  );
};

export const deleteEmpapi = (id) => {
  return axios.delete(
    "http://localhost:5000/api/v1/employe/deleteemploye/" + id
  );
};

export const getEmpapi = (query) => {
  return axios.get(
    "http://localhost:5000/api/v1/employe/getemploye?query=" +
      query?.query +
      "&limit=" +
      query?.limit +
      "&page=" +
      query?.page
  );
};
export const getEmpapibyid = (id) => {
  return axios.get(
    "http://localhost:5000/api/v1/employe/getemployebyid?id=" + id
  );
};

export const addLevTypapi = (formData) => {
  return axios.post(
    "http://localhost:5000/api/v1/leavetype/addleavetype",
    formData
  );
};
export const updateLevTypapi = (formData) => {
  return axios.put(
    "http://localhost:5000/api/v1/leavetype/updateleavetype/" + formData?.id,
    formData
  );
};

export const deleteLevTypapi = (id) => {
  return axios.delete(
    "http://localhost:5000/api/v1/leavetype/deleteleavetype/" + id
  );
};

export const getLevTypapi = (query) => {
  return axios.get(
    "http://localhost:5000/api/v1/leavetype/getleavetype?query=" +
      query?.query +
      "&limit=" +
      query?.limit +
      "&page=" +
      query?.page
  );
};
export const getLevTypapibyid = (id) => {
  return axios.get(
    "http://localhost:5000/api/v1/leavetype/getleavetypebyid?id=" + id
  );
};

export const empsigninapi = (formData) => {
  return axios.post(
    "http://localhost:5000/api/v1/auth/employesignin",
    formData
  );
};

export const adminsigninapi = (formData) => {
  return axios.post("http://localhost:5000/api/v1/auth/adminsignin", formData);
};

export const adminsignupapi = (formData) => {
  return axios.post("http://localhost:5000/api/v1/auth/adminsignup", formData);
};
export const adminupdateapi = (formData) => {
  return axios.put(
    "http://localhost:5000/api/v1/auth/adminupdate/" + formData?.id,
    formData
  );
};
export const getadmindetailapi = (id) => {
  return axios.get("http://localhost:5000/api/v1/auth/admindatas/" + id);
};

export const addLevReqapi = (formData) => {
  return axios.post(
    "http://localhost:5000/api/v1/leaverequest/addleaverequest",
    formData
  );
};

export const updateLevReqapi = (formData) => {
  return axios.put(
    "http://localhost:5000/api/v1/leaverequest/updateleaverequest/" +
      formData?.id,
    formData
  );
};

export const deleteLevReqapi = (id) => {
  return axios.delete(
    "http://localhost:5000/api/v1/leaverequest/deleteleaverequest/" + id
  );
};

export const getLevReqapi = (query) => {
  return axios.get(
    "http://localhost:5000/api/v1/leaverequest/getleaverequest?query=" +
      query?.query +
      "&limit=" +
      query?.limit +
      "&page=" +
      query?.page +
      "&status=" +
      query?.status
  );
};
export const getLevReqapibyid = (id) => {
  return axios.get(
    "http://localhost:5000/api/v1/leaverequest/getleaverequestbyid?id=" + id
  );
};
