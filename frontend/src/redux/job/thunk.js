import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
export const fetchJobTableData = createAsyncThunk(
  "fetchJobTableData",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("http://localhost:5000/api/job");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  },
);

export const fetchJobByJobRefNum = createAsyncThunk(
  "fetchJobByJobRefNum",
  async (jobRefNum, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/job/${jobRefNum}`,
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  },
);

export const createJob = createAsyncThunk(
  "createJob",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/job",
        payload,
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  },
);

export const updateJobByJobRefNum = createAsyncThunk(
  "updateJobByJobRefNum",
  async ({ jobRefNum, payload }, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `http://localhost:5000/api/job/${jobRefNum}`,
        payload,
      );
      return response.data;
    } catch (error) {
      rejectWithValue(error.response.data.message);
    }
  },
);

export const deleteJobByJobRefNum = createAsyncThunk(
  "deleteJobByJobRefNum",
  async (jobRefNum, { rejectWithValue }) => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/api/job/${jobRefNum}`,
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(err);
    }
  },
);
