"use client";

import { createContext, useContext, useReducer, ReactNode } from "react";

// Define the state type
interface CounterState {
  count: number;
  isLoading: boolean;
}

// Define action types
type CounterAction =
  | { type: "INCREMENT" }
  | { type: "DECREMENT" }
  | { type: "RESET" }
  | { type: "SET_LOADING"; payload: boolean };

// Define the context type
interface CounterContextType {
  state: CounterState;
  increment: () => void;
  decrement: () => void;
  reset: () => void;
  incrementAsync: () => void;
}

// Create the context
const CounterContext = createContext<CounterContextType | undefined>(undefined);

// Reducer function
function counterReducer(state: CounterState, action: CounterAction): CounterState {
  switch (action.type) {
    case "INCREMENT":
      return { ...state, count: state.count + 1 };
    case "DECREMENT":
      return { ...state, count: state.count - 1 };
    case "RESET":
      return { ...state, count: 0 };
    case "SET_LOADING":
      return { ...state, isLoading: action.payload };
    default:
      return state;
  }
}

// Provider component
export function CounterProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(counterReducer, {
    count: 0,
    isLoading: false,
  });

  // Action creators
  const increment = () => dispatch({ type: "INCREMENT" });
  const decrement = () => dispatch({ type: "DECREMENT" });
  const reset = () => dispatch({ type: "RESET" });
  
  const incrementAsync = () => {
    dispatch({ type: "SET_LOADING", payload: true });
    setTimeout(() => {
      dispatch({ type: "INCREMENT" });
      dispatch({ type: "SET_LOADING", payload: false });
    }, 1000);
  };

  return (
    <CounterContext.Provider value={{ state, increment, decrement, reset, incrementAsync }}>
      {children}
    </CounterContext.Provider>
  );
}

// Custom hook to use the counter context
export function useCounter() {
  const context = useContext(CounterContext);
  if (context === undefined) {
    throw new Error("useCounter must be used within a CounterProvider");
  }
  return context;
}

