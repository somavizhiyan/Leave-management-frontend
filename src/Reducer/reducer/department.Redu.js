import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import {
  addDepapi,
  deleteDepapi,
  getDepapi,
  getDepapibyid,
  updateDepapi,
} from "../../service/api";

const nameSpace = "Department";

export const createdepartment = createAsyncThunk(
  `${nameSpace}/createdepartment`,
  async (formData, { rejectWithValue }) => {
    try {
      const responce = await addDepapi(formData);
      return responce;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const updateedepartment = createAsyncThunk(
  `${nameSpace}/updateedepartment`,
  async (formData, { rejectWithValue }) => {
    try {
      const responce = await updateDepapi(formData);
      return responce;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const deletedepartment = createAsyncThunk(
  `${nameSpace}/deletedepartment`,
  async (id, { rejectWithValue }) => {
    try {
      const responce = await deleteDepapi(id);
      return responce;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getdepartment = createAsyncThunk(
  `${nameSpace}/getdepartment`,
  async (query, { rejectWithValue }) => {
    try {
      const responce = await getDepapi(query);
      return responce.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getdepartmentbyid = createAsyncThunk(
  `${nameSpace}/getdepartmentbyid`,
  async (id, { rejectWithValue }) => {
    try {
      const responce = await getDepapibyid(id);
      return responce.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const initialState = {
  createDepartment: "initial",
  createDepartmentLoading: false,
  updateDepartment: "initial",
  updateDepartmentLoading: false,
  deleteDepartment: "initial",
  deleteDepartmentLoading: false,
  getDepartment: [],
  getDepartmentLoading: false,
  getDepartmentById: [],
  getDepartmentByIdLoading: false,
};
const departmentSlice = createSlice({
  name: `${nameSpace}`,
  initialState,
  reducers: {
    clearDepartmentLoading: (state) => {
      state.createDepartment = "initial";
      state.updateDepartment = "initial";
      state.deleteDepartment = "initial";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createdepartment.pending, (state) => {
        state.createDepartmentLoading = true;
      })
      .addCase(createdepartment.fulfilled, (state, action) => {
        state.createDepartment = action?.payload;
        console.log(action?.payload?.data?.message, "dcwc");
        state.createDepartmentLoading = false;
      })
      .addCase(createdepartment.rejected, (state, action) => {
        state.createDepartment = action?.payload;
        state.createDepartmentLoading = false;
      })

      .addCase(updateedepartment.pending, (state) => {
        state.updateDepartmentLoading = true;
      })
      .addCase(updateedepartment.fulfilled, (state, action) => {
        state.updateDepartment = action?.payload;
        state.updateDepartmentLoading = false;
      })
      .addCase(updateedepartment.rejected, (state, action) => {
        state.updateDepartment = action?.payload;
        state.updateDepartmentLoading = false;
      })

      .addCase(deletedepartment.pending, (state) => {
        state.deleteDepartmentLoading = true;
      })
      .addCase(deletedepartment.fulfilled, (state, action) => {
        state.deleteDepartment = action?.payload;
        state.deleteDepartmentLoading = false;
      })
      .addCase(deletedepartment.rejected, (state, action) => {
        state.deleteDepartment = action?.payload;
        state.deleteDepartmentLoading = false;
      })

      .addCase(getdepartment.pending, (state) => {
        state.getDepartmentLoading = true;
      })
      .addCase(getdepartment.fulfilled, (state, action) => {
        state.getDepartment = action?.payload?.data;
        state.getDepartmentLoading = false;
      })
      .addCase(getdepartment.rejected, (state, action) => {
        state.getDepartment = action?.payload;
        state.getDepartmentLoading = false;
      })

      .addCase(getdepartmentbyid.pending, (state) => {
        state.getDepartmentByIdLoading = true;
      })
      .addCase(getdepartmentbyid.fulfilled, (state, action) => {
        state.getDepartmentById = action?.payload?.data;
        state.getDepartmentByIdLoading = false;
      })
      .addCase(getdepartmentbyid.rejected, (state, action) => {
        state.getDepartmentById = action?.payload;
        state.getDepartmentByIdLoading = false;
      });
  },
});

export const departmentSelector = (state) => state.Department;
export const { clearDepartmentLoading } = departmentSlice.actions;
export default departmentSlice.reducer;
