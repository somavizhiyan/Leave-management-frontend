import {
    createAsyncThunk,
    createSlice,
  } from "@reduxjs/toolkit";
  
  import { addLevReqapi, deleteLevReqapi, getLevReqapi, getLevReqapibyid, updateLevReqapi } from "../../service/api";
  
  const nameSpace = "LeaveRequest";
  
  export const createleaverequest = createAsyncThunk(
    `${nameSpace}/createleaverequest`,
    async (formData, { rejectWithValue }) => {
      try {
        const responce = await addLevReqapi(formData);
        return responce;
      } catch (error) {
        return rejectWithValue(error);
      }
    }
  );
  
  export const updateeleaverequest = createAsyncThunk(
    `${nameSpace}/updateeleaverequest`,
    async (formData, { rejectWithValue }) => {
      try {
        const responce = await updateLevReqapi(formData);
        return responce;
      } catch (error) {
        return rejectWithValue(error);
      }
    }
  );
  
  export const deleteleaverequest = createAsyncThunk(
    `${nameSpace}/deleteleaverequest`,
    async (id, { rejectWithValue }) => {
      try {
        const responce = await deleteLevReqapi(id);
        return responce;
      } catch (error) {
        return rejectWithValue(error);
      }
    }
  );
  
  export const getleaverequest = createAsyncThunk(
    `${nameSpace}/getleaverequest`,
    async (query, { rejectWithValue }) => {
      try {
        const responce = await getLevReqapi(query);
        return responce.data;
      } catch (error) {
        return rejectWithValue(error);
      }
    }
  );
  
  export const getleaverequestbyid = createAsyncThunk(
    `${nameSpace}/getleaverequestbyid`,
    async (id, { rejectWithValue }) => {
      try {
        const responce = await getLevReqapibyid(id);
        return responce.data;
      } catch (error) {
        return rejectWithValue(error);
      }
    }
  );
  
  const initialState = {
    createLeaveRequest: "initial",
    createLeaveRequestLoading: false,
    updateLeaveRequest: "initial",
    updateLeaveRequestLoading: false,
    deleteLeaveRequest: "initial",
    deleteLeaveRequestLoading: false,
    getLeaveRequest: [],
    getLeaveRequestLoading: false,
    getLeaveRequestById: [],
    getLeaveRequestByIdLoading: false,
  };
  const leaverequestSlice = createSlice({
    name: `${nameSpace}`,
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(createleaverequest.pending, (state) => {
          state.createLeaveRequestLoading = true;
        })
        .addCase(createleaverequest.fulfilled, (state, action) => {
          state.createLeaveRequest = action?.payload;
          state.createLeaveRequestLoading = false;
        })
        .addCase(createleaverequest.rejected, (state, action) => {
          state.createLeaveRequest = action?.payload;
          state.createLeaveRequestLoading = false;
        })
  
        .addCase(updateeleaverequest.pending, (state) => {
          state.updateLeaveRequestLoading = true;
        })
        .addCase(updateeleaverequest.fulfilled, (state, action) => {
          state.updateLeaveRequest = action?.payload;
          state.updateLeaveRequestLoading = false;
        })
        .addCase(updateeleaverequest.rejected, (state, action) => {
          state.updateLeaveRequest = action?.payload;
          state.updateLeaveRequestLoading = false;
        })
  
        .addCase(deleteleaverequest.pending, (state) => {
          state.deleteLeaveRequestLoading = true;
        })
        .addCase(deleteleaverequest.fulfilled, (state, action) => {
          state.deleteLeaveRequest = action?.payload;
          state.deleteLeaveRequestLoading = false;
        })
        .addCase(deleteleaverequest.rejected, (state, action) => {
          state.deleteLeaveRequest = action?.payload;
          state.deleteLeaveRequestLoading = false;
        })
  
        .addCase(getleaverequest.pending, (state) => {
          state.getLeaveRequestLoading = true;
        })
        .addCase(getleaverequest.fulfilled, (state, action) => {
          state.getLeaveRequest = action?.payload?.data;
          state.getLeaveRequestLoading = false;
        })
        .addCase(getleaverequest.rejected, (state, action) => {
          state.getLeaveRequest = action?.payload;
          state.getLeaveRequestLoading = false;
        })
  
        .addCase(getleaverequestbyid.pending, (state) => {
          state.getLeaveRequestByIdLoading = true;
        })
        .addCase(getleaverequestbyid.fulfilled, (state, action) => {
          state.getLeaveRequestById = action?.payload?.data;
          state.getLeaveRequestByIdLoading = false;
        })
        .addCase(getleaverequestbyid.rejected, (state, action) => {
          state.getLeaveRequestById = action?.payload;
          state.getLeaveRequestByIdLoading = false;
        });
    },
  });
  
  export const leaverequestSelector = (state) => state.LeaveRequest;
  export default leaverequestSlice.reducer;
  