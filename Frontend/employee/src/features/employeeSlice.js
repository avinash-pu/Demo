import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../api/axiosInstance';

// Initial state
const initialState = {
  employees: [],
  status: 'idle',
  error: null,
};

// Fetch employees
export const fetchEmployees = createAsyncThunk('employees/fetchEmployees', async () => {
  const response = await axiosInstance.get('/employees');
  return response.data.data; // Adjust based on API response structure
});

// Other thunks remain the same...

const employeeSlice = createSlice({
  name: 'employees',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      // Fetch employees
      .addCase(fetchEmployees.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchEmployees.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.employees = action.payload;
      })
      .addCase(fetchEmployees.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      // Other cases remain the same...
  },
});

export default employeeSlice.reducer;
