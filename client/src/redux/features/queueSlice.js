import { createSlice } from "@reduxjs/toolkit";

const queueSlice = createSlice({
  name: "queue",
  initialState: {
    info: {},
    tickets: [],
  },
  reducers: {
    setInfo: (state, action) => {
      state.info = action.payload;
    },
    setTickets: (state, action) => {
      state.tickets = action.payload;
    },
    enqueue: (state, action) => {
      state.tickets.push(action.payload);
    },
    dequeue: (state) => {
      state.tickets.shift();
    },
  },
});

export const { setInfo, setTickets, enqueue, dequeue } = queueSlice.actions;
export default queueSlice.reducer;
