import { create } from "zustand";

interface CounterState {
  count: number;
  isLoading: boolean;
  increment: () => void;
  decrement: () => void;
  reset: () => void;
  incrementAsync: () => void;
}

export const useCounterStore = create<CounterState>((set) => ({
  count: 0,
  isLoading: false,
  
  increment: () => set((state) => ({ count: state.count + 1 })),
  
  decrement: () => set((state) => ({ count: state.count - 1 })),
  
  reset: () => set({ count: 0 }),
  
  incrementAsync: () => {
    set({ isLoading: true });
    setTimeout(() => {
      set((state) => ({ count: state.count + 1, isLoading: false }));
    }, 1000);
  },
}));

