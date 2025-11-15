import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  fetchNearby,
  fetchOrgById,
  fetchOrgQueues,
} from '../../services/orgService';

const initialState = {
  nearby: [],
  selectedOrg: null,
  orgQueues: [],
  status: 'idle',
  error: null,
};

export const getNearbyOrgs = createAsyncThunk(
  'org/nearby',
  async ({ lat, lng, radius = 5000 }) => {
    const response = await fetchNearby({ lat, lng, radius });
    return response.data;
  }
);

export const getOrganization = createAsyncThunk(
  'org/get',
  async (orgId) => {
    const response = await fetchOrgById(orgId);
    return response.data;
  }
);

export const getOrgQueues = createAsyncThunk('org/queues', async (orgId) => {
  const response = await fetchOrgQueues(orgId);
  return response.data;
});

const orgSlice = createSlice({
  name: 'org',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getNearbyOrgs.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(getNearbyOrgs.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.nearby = action.payload;
      })
      .addCase(getNearbyOrgs.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(getOrganization.fulfilled, (state, action) => {
        state.selectedOrg = action.payload;
      })
      .addCase(getOrgQueues.fulfilled, (state, action) => {
        state.orgQueues = action.payload;
      });
  },
});

export default orgSlice.reducer;

