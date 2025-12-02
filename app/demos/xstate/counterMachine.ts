import { createMachine, assign } from "xstate";

// Define the context (state data)
interface CounterContext {
  count: number;
}

// Define the events
type CounterEvent =
  | { type: "INCREMENT" }
  | { type: "DECREMENT" }
  | { type: "RESET" }
  | { type: "INCREMENT_ASYNC" }
  | { type: "COMPLETE_ASYNC" };

// Create the state machine
export const counterMachine = createMachine({
  id: "counter",
  initial: "idle",
  context: {
    count: 0,
  } as CounterContext,
  states: {
    idle: {
      on: {
        INCREMENT: {
          actions: assign({
            count: ({ context }) => context.count + 1,
          }),
        },
        DECREMENT: {
          actions: assign({
            count: ({ context }) => context.count - 1,
          }),
        },
        RESET: {
          actions: assign({
            count: 0,
          }),
        },
        INCREMENT_ASYNC: {
          target: "incrementing",
        },
      },
    },
    incrementing: {
      after: {
        1000: {
          target: "idle",
          actions: assign({
            count: ({ context }) => context.count + 1,
          }),
        },
      },
    },
  },
});

