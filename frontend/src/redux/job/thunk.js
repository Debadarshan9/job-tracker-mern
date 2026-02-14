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

export const fetchJobById = createAsyncThunk(
  "fetchJobById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/job/${id}`);
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

export const updateJobById = createAsyncThunk(
  "updateJobById",
  async ({ id, payload }, { rejectWithValue }) => {
    try {
      console.log({ id });
      console.log({ payload });
      const response = await axios.put(
        `http://localhost:5000/api/job/${id}`,
        payload,
      );
      return response.data;
    } catch (error) {
      rejectWithValue(error.response.data.message);
    }
  },
);

export const deleteJobById = createAsyncThunk(
  "deleteJobById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/api/job/${id}`,
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(err);
    }
  },
);
