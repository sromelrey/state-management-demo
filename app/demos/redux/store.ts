import { createStore, applyMiddleware, Middleware } from "redux";

// Action Types
export const INCREMENT = "INCREMENT" as const;
export const DECREMENT = "DECREMENT" as const;
export const RESET = "RESET" as const;
export const SET_LOADING = "SET_LOADING" as const;

// Action Creators
export const increment = () => ({ type: INCREMENT });
export const decrement = () => ({ type: DECREMENT });
export const reset = () => ({ type: RESET });
export const setLoading = (isLoading: boolean) => ({ type: SET_LOADING, payload: isLoading });

// Async Action Creator (Thunk)
export const incrementAsync = () => {
  return (dispatch: any) => {
    dispatch(setLoading(true));
    setTimeout(() => {
      dispatch(increment());
      dispatch(setLoading(false));
    }, 1000);
  };
};

// Action Types
type CounterAction =
  | ReturnType<typeof increment>
  | ReturnType<typeof decrement>
  | ReturnType<typeof reset>
  | ReturnType<typeof setLoading>;

// State Type
export interface CounterState {
  count: number;
  isLoading: boolean;
}

// Initial State
const initialState: CounterState = {
  count: 0,
  isLoading: false,
};

// Reducer
export function counterReducer(state = initialState, action: CounterAction): CounterState {
  switch (action.type) {
    case INCREMENT:
      return { ...state, count: state.count + 1 };
    case DECREMENT:
      return { ...state, count: state.count - 1 };
    case RESET:
      return { ...state, count: 0 };
    case SET_LOADING:
      return { ...state, isLoading: action.payload };
    default:
      return state;
  }
}

// Simple thunk middleware implementation
const thunkMiddleware: Middleware = ({ dispatch, getState }) => (next) => (action) => {
  if (typeof action === "function") {
    return action(dispatch, getState);
  }
  return next(action);
};

// Create Store with middleware
export const store = createStore(counterReducer, applyMiddleware(thunkMiddleware));

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

