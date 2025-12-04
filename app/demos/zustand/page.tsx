import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CounterDisplay } from "./components/CounterDisplay";
import { CounterControls } from "./components/CounterControls";
import { AdditionalDisplay } from "./components/AdditionalDisplay";
import { CodeViewer } from "@/components/ui/code-viewer";

const DEMO_CODE = `// 1. Create the store - state and actions together
// store.ts
import { create } from 'zustand';

export const useCounterStore = create((set) => ({
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

// 2. Use in components - NO Provider needed!
function CounterDisplay() {
  // ✅ Select only what you need
  const count = useCounterStore((state) => state.count);
  const isLoading = useCounterStore((state) => state.isLoading);
  
  return <div>Count: {count}</div>;
}

function CounterControls() {
  // ✅ Select actions
  const increment = useCounterStore((state) => state.increment);
  const decrement = useCounterStore((state) => state.decrement);
  
  return (
    <>
      <button onClick={increment}>+</button>
      <button onClick={decrement}>-</button>
    </>
  );
}

// ❌ DON'T DO THIS - causes infinite loops!
function BadExample() {
  const { count, increment } = useCounterStore((state) => ({
    count: state.count,
    increment: state.increment,
  }));
  // New object created on every render!
}`;

export default function ZustandDemo() {
  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold">Zustand</h1>
        <p className="text-muted-foreground mt-2">
          Minimal state management with a simple, hook-based API - no Provider needed!
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <CounterDisplay />
        <CounterControls />
      </div>

      <AdditionalDisplay />

      <Card>
        <CardHeader>
          <CardTitle>Implementation Details</CardTitle>
          <CardDescription>How this Zustand implementation works</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="font-semibold mb-2">Setup Required:</h3>
            <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
              <li>Install zustand package (~3 KB)</li>
              <li>Create store with create() function</li>
              <li>Define state and actions in one place</li>
              <li>Use the hook in any component - no Provider needed!</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Pros:</h3>
            <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
              <li>Minimal boilerplate compared to Context and Redux</li>
              <li>No Provider wrapper needed</li>
              <li>Built-in selector optimization prevents unnecessary re-renders</li>
              <li>Simple and intuitive API</li>
              <li>Small bundle size (~3 KB)</li>
              <li>Works with React DevTools</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Cons:</h3>
            <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
              <li>Smaller ecosystem compared to Redux</li>
              <li>Fewer middleware options</li>
              <li>Less established patterns for large applications</li>
            </ul>
          </div>

          <div className="bg-yellow-50 dark:bg-yellow-950 p-4 rounded-lg">
            <p className="text-sm font-semibold mb-2">⚠️ Important Pattern:</p>
            <p className="text-sm text-muted-foreground">
              When using Zustand, select values individually rather than returning an object.
              Returning an object creates a new reference on every render, causing infinite loops.
              This is the most common Zustand mistake!
            </p>
          </div>

          <CodeViewer code={DEMO_CODE} title="View Implementation" />
        </CardContent>
      </Card>
    </div>
  );
}

