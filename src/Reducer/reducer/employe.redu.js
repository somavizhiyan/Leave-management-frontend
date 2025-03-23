import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import {
  addEmpapi,
  deleteEmpapi,
  getEmpapi,
  getEmpapibyid,
  updateEmpapi,
} from "../../service/api";

const nameSpace = "Employe";

export const createemploye = createAsyncThunk(
  `${nameSpace}/createemploye`,
  async (formData, { rejectWithValue }) => {
    try {
      console.log(formData, "thunk");
      const responce = await addEmpapi(formData);
      return responce;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const updateemploye = createAsyncThunk(
  `${nameSpace}/updateemploye`,
  async (formData, { rejectWithValue }) => {
    try {
      const responce = await updateEmpapi(formData);
      return responce;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const deleteemploye = createAsyncThunk(
  `${nameSpace}/deleteemploye`,
  async (id, { rejectWithValue }) => {
    try {
      const responce = await deleteEmpapi(id);
      return responce;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getemploye = createAsyncThunk(
  `${nameSpace}/getemploye`,
  async (query, { rejectWithValue }) => {
    try {
      const responce = await getEmpapi(query);
      return responce.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getemployebyid = createAsyncThunk(
  `${nameSpace}/getemployebyid`,
  async (id, { rejectWithValue }) => {
    try {
      const responce = await getEmpapibyid(id);
      return responce.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const initialState = {
  createEmploye: "initial",
  createEmployeLoading: false,
  updateEmploye: "initial",
  updateEmployeLoading: false,
  deleteEmploye: "initial",
  deleteEmployeLoading: false,
  getEmploye: [],
  getEmployeLoading: false,
  getEmployeById: [],
  getEmployeByIdLoading: false,
};
const employeSlice = createSlice({
  name: `${nameSpace}`,
  initialState,
  reducers: {
    clearEmployeLoading: (state) => {
      state.createEmploye = "initial";
      state.updateEmploye = "initial";
      state.deleteEmploye = "initial";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createemploye.pending, (state) => {
        state.createEmployeLoading = true;
      })
      .addCase(createemploye.fulfilled, (state, action) => {
        state.createEmploye = action?.payload;
        state.createEmployeLoading = false;
      })
      .addCase(createemploye.rejected, (state, action) => {
        state.createEmploye = action?.payload;
        state.createEmployeLoading = false;
      })

      .addCase(updateemploye.pending, (state) => {
        state.updateEmployeLoading = true;
      })
      .addCase(updateemploye.fulfilled, (state, action) => {
        state.updateEmploye = action?.payload;
        state.updateEmployeLoading = false;
      })
      .addCase(updateemploye.rejected, (state, action) => {
        state.updateEmploye = action?.payload;
        state.updateEmployeLoading = false;
      })

      .addCase(deleteemploye.pending, (state) => {
        state.deleteEmployeLoading = true;
      })
      .addCase(deleteemploye.fulfilled, (state, action) => {
        state.deleteEmploye = action?.payload;
        state.deleteEmployeLoading = false;
      })
      .addCase(deleteemploye.rejected, (state, action) => {
        state.deleteEmploye = action?.payload;
        state.deleteEmployeLoading = false;
      })

      .addCase(getemploye.pending, (state) => {
        state.getEmployeLoading = true;
      })
      .addCase(getemploye.fulfilled, (state, action) => {
        state.getEmploye = action?.payload?.data;
        state.getEmployeLoading = false;
      })
      .addCase(getemploye.rejected, (state, action) => {
        state.getEmploye = action?.payload;
        state.getEmployeLoading = false;
      })

      .addCase(getemployebyid.pending, (state) => {
        state.getEmployeByIdLoading = true;
      })
      .addCase(getemployebyid.fulfilled, (state, action) => {
        state.getEmployeById = action?.payload?.data;
        state.getEmployeByIdLoading = false;
      })
      .addCase(getemployebyid.rejected, (state, action) => {
        state.getEmployeById = action?.payload;
        state.getEmployeByIdLoading = false;
      });
  },
});

export const employeSelector = (state) => state.Employe;
export const { clearEmployeLoading } = employeSlice.actions;
export default employeSlice.reducer;
