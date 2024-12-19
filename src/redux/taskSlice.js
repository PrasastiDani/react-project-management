import { createSlice } from '@reduxjs/toolkit';

const taskSlice = createSlice({
  name: 'tasks',
  initialState: [],
  reducers: {
    addTask: (state, action) => {
      state.push(action.payload);
    },
    setTasks: (state, action) => {
      return action.payload;
    },
  },
});

export const { addTask, setTasks } = taskSlice.actions;

export default taskSlice.reducer;
