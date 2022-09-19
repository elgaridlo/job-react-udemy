import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

import { baseUrl } from '../../config'

const initialState = {
  jobs: [],
  status: 'idle',
  error: null,
}

/*
 const fun = (data) = (dispatch) => {
    //perform htpp after dispatch
    dispatch({
        type, payload
    })
}
*/

export const fetchJobs = createAsyncThunk('jobs/fetchJobs', async (filter) => {
  const { limit, offset } = filter
  const response = await axios.get(
    `${baseUrl}/api/v1/jobs?limit=${limit}&offset=${offset}`,
  )

  return response.data.job
})

export const jobSlice = createSlice({
  name: 'jobs',
  initialState,
  reducers: {}, // will create action for you
  extraReducers: {
    // you need to create your action
    [fetchJobs.pending]: (state, action) => {
      state.status = 'loading'
    },
    [fetchJobs.fulfilled]: (state, action) => {
      state.status = 'success'
      state.jobs = state.jobs.concat(action.payload)
    },
    [fetchJobs.rejected]: (state, action) => {
      state.status = 'failed'
      state.error = action.error.message
    },
  },
})

export default jobSlice.reducer

export const selectAllJobs = (state) => state.jobs.jobs
