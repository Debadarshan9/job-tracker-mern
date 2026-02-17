import { createSlice } from "@reduxjs/toolkit";
import { LoadingStatusEnum } from "../../utils/enum.js";
import { fetchJobByJobRefNum, fetchJobTableData } from "./thunk.js";

const initialState = {
  jobTableData: {
    response: null,
    isLoading: LoadingStatusEnum.NOT_LOADING,
    error: "",
  },
  jobById: {
    response: null,
    isLoading: LoadingStatusEnum.NOT_LOADING,
    error: "",
  },
};
const jobSlice = createSlice({
  name: "Jobs",
  initialState,
  reducers: {
    resetJobSlice: () => initialState,

    clearJobTableData: (state) =>
      (state.jobTableData = initialState.jobTableData),
    clearJobById: (state) => (state.jobById = initialState.jobById),
  },
  extraReducers: (builder) => {
    // To get all data
    builder.addCase(fetchJobTableData.pending, (state) => {
      state.jobTableData.isLoading = LoadingStatusEnum.LOADING;
    });
    builder.addCase(fetchJobTableData.rejected, (state, action) => {
      state.jobTableData.isLoading = LoadingStatusEnum.LOADED;
      state.jobTableData.error = action.payload;
      state.jobTableData.response = null;
    });
    builder.addCase(fetchJobTableData.fulfilled, (state, action) => {
      state.jobTableData.isLoading = LoadingStatusEnum.LOADED;
      state.jobTableData.error = "";
      state.jobTableData.response = action.payload;
    });

    // To get data by id
    builder.addCase(fetchJobByJobRefNum.pending, (state) => {
      state.jobById.isLoading = LoadingStatusEnum.LOADING;
    });
    builder.addCase(fetchJobByJobRefNum.rejected, (state, action) => {
      state.jobById.isLoading = LoadingStatusEnum.LOADED;
      state.jobById.error = action.payload;
      state.jobById.response = null;
    });
    builder.addCase(fetchJobByJobRefNum.fulfilled, (state, action) => {
      state.jobById.isLoading = LoadingStatusEnum.LOADED;
      state.jobById.response = action.payload;
      state.jobById.error = "";
    });
  },
});

export const { resetJobSlice, clearJobById, clearJobTableData } =
  jobSlice.actions;

export default jobSlice.reducer;
