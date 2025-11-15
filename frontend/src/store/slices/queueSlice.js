import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  createQueue,
  fetchFeedbackForQueue,
  fetchQueueAnalytics,
  getQueue,
  submitFeedback,
  updateQueue,
} from '../../services/queueService';
import {
  joinQueue,
  listQueueTokens,
  markTokenDone,
} from '../../services/tokenService';

const initialState = {
  activeQueue: null,
  tokens: [],
  analytics: null,
  feedback: [],
  status: 'idle',
  error: null,
};

export const fetchQueueById = createAsyncThunk(
  'queue/getById',
  async (queueId) => {
    const response = await getQueue(queueId);
    return response.data;
  }
);

export const fetchQueueTokens = createAsyncThunk(
  'queue/getTokens',
  async (queueId) => {
    const response = await listQueueTokens(queueId);
    return response.data;
  }
);

export const joinQueueThunk = createAsyncThunk(
  'queue/join',
  async ({ queueId, payload }) => {
    const response = await joinQueue(queueId, payload);
    return response.data;
  }
);

export const markTokenDoneThunk = createAsyncThunk(
  'queue/markDone',
  async (tokenId) => {
    const response = await markTokenDone(tokenId);
    return response.data;
  }
);

export const createQueueThunk = createAsyncThunk(
  'queue/create',
  async (payload) => {
    const response = await createQueue(payload);
    return response.data;
  }
);

export const updateQueueThunk = createAsyncThunk(
  'queue/update',
  async ({ queueId, payload }) => {
    const response = await updateQueue(queueId, payload);
    return response.data;
  }
);

export const fetchQueueAnalyticsThunk = createAsyncThunk(
  'queue/analytics',
  async (queueId) => {
    const response = await fetchQueueAnalytics(queueId);
    return response.data;
  }
);

export const fetchQueueFeedbackThunk = createAsyncThunk(
  'queue/feedback',
  async (queueId) => {
    const response = await fetchFeedbackForQueue(queueId);
    return response.data;
  }
);

export const submitFeedbackThunk = createAsyncThunk(
  'queue/submitFeedback',
  async (payload) => {
    const response = await submitFeedback(payload);
    return response.data;
  }
);

const queueSlice = createSlice({
  name: 'queue',
  initialState,
  reducers: {
    setActiveQueue(state, action) {
      state.activeQueue = action.payload;
    },
    upsertToken(state, action) {
      const token = action.payload;
      const idx = state.tokens.findIndex((t) => t._id === token._id);
      if (idx >= 0) {
        state.tokens[idx] = token;
      } else {
        state.tokens.push(token);
      }
      state.tokens.sort((a, b) => a.number - b.number);
      if (
        state.activeQueue &&
        token.queue?.toString() === state.activeQueue._id
      ) {
        state.activeQueue.nowServing =
          token.status === 'serving'
            ? token.number
            : state.activeQueue.nowServing;
      }
    },
    clearQueueState(state) {
      state.activeQueue = null;
      state.tokens = [];
      state.analytics = null;
      state.feedback = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchQueueById.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchQueueById.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.activeQueue = action.payload;
      })
      .addCase(fetchQueueById.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(fetchQueueTokens.fulfilled, (state, action) => {
        state.tokens = action.payload;
      })
      .addCase(joinQueueThunk.fulfilled, (state, action) => {
        const token = action.payload;
        state.tokens = [...state.tokens, token].sort(
          (a, b) => a.number - b.number
        );
      })
      .addCase(markTokenDoneThunk.fulfilled, (state, action) => {
        const token = action.payload;
        state.tokens = state.tokens.map((t) =>
          t._id === token._id ? token : t
        );
      })
      .addCase(createQueueThunk.fulfilled, (state, action) => {
        state.activeQueue = action.payload;
      })
      .addCase(updateQueueThunk.fulfilled, (state, action) => {
        if (state.activeQueue?._id === action.payload._id) {
          state.activeQueue = action.payload;
        }
      })
      .addCase(fetchQueueAnalyticsThunk.fulfilled, (state, action) => {
        state.analytics = action.payload;
      })
      .addCase(fetchQueueFeedbackThunk.fulfilled, (state, action) => {
        state.feedback = action.payload;
      });
  },
});

export const { setActiveQueue, upsertToken, clearQueueState } =
  queueSlice.actions;
export default queueSlice.reducer;

