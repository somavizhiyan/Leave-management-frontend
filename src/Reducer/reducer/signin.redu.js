import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {toast} from "react-toastify"
import {
  adminsigninapi,
  adminsignupapi,
  adminupdateapi,
  empsigninapi,
  getadmindetailapi,
} from "../../service/api";

const initialState = {
  SIGNIN_STATUS: "initial",
  SIGNIN_DATA: [],
  ADMINSIGIN_STATUS: "initial",
  ADMINSIGIN_DATA: [],
  ADMINSIGNUP_STATUS: "initial",
  ADMINSIGNUP_DATA: [],
  ADMINUPDATE_STATUS:"initial",
  ADMIN_DATA:[],
  ADMINGET_STATUS:"initial"
};

const namespace = "Userempsign";

export const empsignin = createAsyncThunk(
  `${namespace}/empsignIn`,
  async (formdata, { rejectWithValue }) => {
    try {
      const data = await empsigninapi(formdata);

      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const adminsignin = createAsyncThunk(
  `${namespace}/adminsignin`,
  async (formdata, { rejectWithValue }) => {
    try {
      const data = await adminsigninapi(formdata);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const adminsignup = createAsyncThunk(
  `${namespace}/adminsignup`,
  async (formdata, { rejectWithValue }) => {
    try {
      const data = await adminsignupapi(formdata);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const adminupdate = createAsyncThunk(
    `${namespace}/adminupdate`,
    async (formdata, { rejectWithValue }) => {
      try {
        const data = await adminupdateapi(formdata);
        return data;
      } catch (error) {
        return rejectWithValue(error);
      }
    }
  );

  export const getadmindetails = createAsyncThunk(
    `${namespace}/getadmindetails`,
    async (id, { rejectWithValue }) => {
      try {
        const data = await getadmindetailapi(id);
        return data;
      } catch (error) {
        return rejectWithValue(error);
      }
    }
  );

const empSlice = createSlice({
  name: `${namespace}`,
  initialState,
  reducers: {
    clearLoading: (state) => {
      state.SIGNIN_STATUS = "initial";
      state.ADMINSIGIN_DATA = "initial";
      state.SIGNIN_DATA = "initial";
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(empsignin.pending, (state) => {
        state.SIGNIN_STATUS = "Loading";
      })
      .addCase(empsignin.fulfilled, (state, action) => {
        state.SIGNIN_DATA = action?.payload;
        console.log(action?.payload?.data, "edewdewd");
        localStorage.setItem("role", action?.payload?.data?.role);
        localStorage.setItem("id",action?.payload?.data?.id)
        localStorage.setItem("name",action?.payload?.data?.name)
        state.SIGNIN_STATUS = "Fullfilled";
      })
      .addCase(empsignin.rejected, (state, action) => {
        state.SIGNIN_DATA = action?.payload?.response?.data?.error;
        toast.error(action?.payload?.response?.data?.error)
        state.SIGNIN_STATUS = "Rejected";
      })

      .addCase(adminsignin.pending, (state) => {
        state.ADMINSIGIN_STATUS = "Loading";
      })
      .addCase(adminsignin.fulfilled, (state, action) => {
        state.ADMINSIGIN_DATA = action?.payload;
        console.log(action?.payload?.data, "edewdewd");
        localStorage.setItem("role", action?.payload?.data?.role);
        localStorage.setItem("id", action?.payload?.data?.id);
        localStorage.setItem("name",action?.payload?.data?.name)
        state.ADMINSIGIN_STATUS = "Fullfilled";
        // toast.success(action?.payload?.data?.message)
      })
      .addCase(adminsignin.rejected, (state, action) => {
        state.ADMINSIGIN_DATA = action?.payload?.response?.data?.error;
        toast.error(action?.payload?.response?.data?.error)
        state.ADMINSIGIN_STATUS = "Rejected";
      })
      .addCase(adminsignup.pending, (state) => {
        state.ADMINSIGNUP_STATUS = "Loading";
      })
      .addCase(adminsignup.fulfilled, (state, action) => {
        state.ADMINSIGNUP_STATUS = "Fullfilled";
        state.ADMINSIGNUP_DATA = action?.payload?.data;
      })
      .addCase(adminsignup.rejected, (state, action) => {
        state.ADMINSIGNUP_DATA = action?.payload?.data;
        state.ADMINSIGNUP_STATUS = "Rejected";
      })

      .addCase(adminupdate.pending, (state) => {
        state.ADMINUPDATE_STATUS = "Loading";
      })
      .addCase(adminupdate.fulfilled, (state, action) => {
        state.ADMINUPDATE_STATUS = "Fullfilled";
      })
      .addCase(adminupdate.rejected, (state, action) => {
        state.ADMINUPDATE_STATUS = "Rejected";
      })

      .addCase(getadmindetails.pending, (state) => {
        state.ADMINGET_STATUS = "Loading";
      })
      .addCase(getadmindetails.fulfilled, (state, action) => {
        state.ADMINGET_STATUS = "Fullfilled";
        state.ADMIN_DATA = action?.payload?.data?.data;
      })
      .addCase(getadmindetails.rejected, (state, action) => {
        state.ADMINGET_STATUS = "Rejected";
        state.ADMIN_DATA = action?.payload?.data?.data;
      });
  },
});

export const signSelector = (state) => state.Userempsign;
export const { clearLoading } = empSlice.actions;
export default empSlice.reducer;
