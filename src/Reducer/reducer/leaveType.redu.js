import {
    createAsyncThunk,
    createSlice,
  } from "@reduxjs/toolkit";
  
  import { addLevTypapi, deleteLevTypapi, getLevTypapi, getLevTypapibyid, updateLevTypapi } from "../../service/api";
  
  const nameSpace = "LeaveType";
  
  export const createleaveType = createAsyncThunk(
    `${nameSpace}/createleaveType`,
    async (formData, { rejectWithValue }) => {
      try {
        const responce = await addLevTypapi(formData);
        return responce;
      } catch (error) {
        return rejectWithValue(error);
      }
    }
  );
  
  export const updateeleaveType = createAsyncThunk(
    `${nameSpace}/updateeleaveType`,
    async (formData, { rejectWithValue }) => {
      try {
        const responce = await updateLevTypapi(formData);
        return responce;
      } catch (error) {
        return rejectWithValue(error);
      }
    }
  );
  
  export const deleteleaveType = createAsyncThunk(
    `${nameSpace}/deleteleaveType`,
    async (id, { rejectWithValue }) => {
      try {
        const responce = await deleteLevTypapi(id);
        return responce;
      } catch (error) {
        return rejectWithValue(error);
      }
    }
  );
  
  export const getleaveType = createAsyncThunk(
    `${nameSpace}/getleaveType`,
    async (query, { rejectWithValue }) => {
      try {
        const responce = await getLevTypapi(query);
        return responce.data;
      } catch (error) {
        return rejectWithValue(error);
      }
    }
  );
  
  export const getleaveTypebyid = createAsyncThunk(
    `${nameSpace}/getleaveTypebyid`,
    async (id, { rejectWithValue }) => {
      try {
        const responce = await getLevTypapibyid(id);
        return responce.data;
      } catch (error) {
        return rejectWithValue(error);
      }
    }
  );
  
  const initialState = {
    createLeaveType: "initial",
    createLeaveTypeLoading: false,
    updateLeaveType: "initial",
    updateLeaveTypeLoading: false,
    deleteLeaveType: "initial",
    deleteLeaveTypeLoading: false,
    getLeaveType: [],
    getLeaveTypeLoading: false,
    getLeaveTypeById: [],
    getLeaveTypeByIdLoading: false,
  };
  const leaveTypeSlice = createSlice({
    name: `${nameSpace}`,
    initialState,
    reducers: {
      clearLeaveTypeLoading: (state) => {
        state.createLeaveType = "initial";
        state.updateLeaveType = "initial";
        state.deleteLeaveType = "initial";
      },
    },
    extraReducers: (builder) => {
      builder
        .addCase(createleaveType.pending, (state) => {
          state.createLeaveTypeLoading = true;
        })
        .addCase(createleaveType.fulfilled, (state, action) => {
          state.createLeaveType = action?.payload;
          state.createLeaveTypeLoading = false;
        })
        .addCase(createleaveType.rejected, (state, action) => {
          state.createLeaveType = action?.payload;
          state.createLeaveTypeLoading = false;
        })
  
        .addCase(updateeleaveType.pending, (state) => {
          state.updateLeaveTypeLoading = true;
        })
        .addCase(updateeleaveType.fulfilled, (state, action) => {
          state.updateLeaveType = action?.payload;
          state.updateLeaveTypeLoading = false;
        })
        .addCase(updateeleaveType.rejected, (state, action) => {
          state.updateLeaveType = action?.payload;
          state.updateLeaveTypeLoading = false;
        })
  
        .addCase(deleteleaveType.pending, (state) => {
          state.deleteLeaveTypeLoading = true;
        })
        .addCase(deleteleaveType.fulfilled, (state, action) => {
          state.deleteLeaveType = action?.payload;
          state.deleteLeaveTypeLoading = false;
        })
        .addCase(deleteleaveType.rejected, (state, action) => {
          state.deleteLeaveType = action?.payload;
          state.deleteLeaveTypeLoading = false;
        })
  
        .addCase(getleaveType.pending, (state) => {
          state.getLeaveTypeLoading = true;
        })
        .addCase(getleaveType.fulfilled, (state, action) => {
          state.getLeaveType = action?.payload?.data;
          state.getLeaveTypeLoading = false;
        })
        .addCase(getleaveType.rejected, (state, action) => {
          state.getLeaveType = action?.payload;
          state.getLeaveTypeLoading = false;
        })
  
        .addCase(getleaveTypebyid.pending, (state) => {
          state.getLeaveTypeByIdLoading = true;
        })
        .addCase(getleaveTypebyid.fulfilled, (state, action) => {
          state.getLeaveTypeById = action?.payload?.data;
          state.getLeaveTypeByIdLoading = false;
        })
        .addCase(getleaveTypebyid.rejected, (state, action) => {
          state.getLeaveTypeById = action?.payload;
          state.getLeaveTypeByIdLoading = false;
        });
    },
  });
  
  export const leaveTypeSelector = (state) => state.LeaveType;
  export const {clearLeaveTypeLoading} = leaveTypeSlice.actions;
  export default leaveTypeSlice.reducer;
  