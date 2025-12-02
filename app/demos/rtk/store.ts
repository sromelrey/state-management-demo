import { configureStore, createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

// Define the state type
interface CounterState {
  count: number;
  isLoading: boolean;
}

// Initial state
const initialState: CounterState = {
  count: 0,
  isLoading: false,
};

// Async thunk for incrementing after delay
export const incrementAsync = createAsyncThunk(
  "counter/incrementAsync",
  async () => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return 1;
  }
);

// Create slice (combines actions and reducer)
const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    increment: (state) => {
      state.count += 1;
    },
    decrement: (state) => {
      state.count -= 1;
    },
    reset: (state) => {
      state.count = 0;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(incrementAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(incrementAsync.fulfilled, (state, action: PayloadAction<number>) => {
        state.count += action.payload;
        state.isLoading = false;
      });
  },
});

// Export actions
export const { increment, decrement, reset } = counterSlice.actions;

// Create store
export const store = configureStore({
  reducer: counterSlice.reducer,
});

// Export types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

