"use client";

import { Provider } from "react-redux";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { store } from "./store";
import { CounterDisplay } from "./components/CounterDisplay";
import { CounterControls } from "./components/CounterControls";
import { AdditionalDisplay } from "./components/AdditionalDisplay";

function RTKDemoContent() {
  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold">Redux Toolkit (RTK)</h1>
        <p className="text-muted-foreground mt-2">
          Modern Redux with less boilerplate using createSlice and createAsyncThunk
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
          <CardDescription>How this Redux Toolkit implementation works</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="font-semibold mb-2">Setup Required:</h3>
            <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
              <li>Install @reduxjs/toolkit and react-redux</li>
              <li>Create slice with createSlice() - combines actions and reducer!</li>
              <li>Use createAsyncThunk() for async actions</li>
              <li>Configure store with configureStore() - middleware included!</li>
              <li>Wrap app with Provider component</li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-2">Pros:</h3>
            <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
              <li>Much less boilerplate than traditional Redux</li>
              <li>Built-in best practices and sensible defaults</li>
              <li>Immer integration for "mutable" updates</li>
              <li>Excellent TypeScript support</li>
              <li>Same great Redux DevTools</li>
              <li>createAsyncThunk simplifies async logic</li>
              <li>All Redux ecosystem benefits</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Cons:</h3>
            <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
              <li>Still requires Provider wrapper</li>
              <li>Larger bundle size than simpler solutions (~14 KB)</li>
              <li>More complex than Context or Zustand for simple cases</li>
              <li>Learning curve for Redux concepts</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Code Sample:</h3>
            <pre className="bg-muted p-4 rounded-lg text-xs overflow-x-auto">
{`// Create slice - actions auto-generated!
const counterSlice = createSlice({
  name: 'counter',
  initialState: { count: 0 },
  reducers: {
    increment: (state) => {
      state.count += 1; // Looks mutable but uses Immer
    }
  }
});

// Extract actions and reducer
export const { increment } = counterSlice.actions;

// Usage
dispatch(increment()); // Much cleaner!`}
            </pre>
          </div>

          <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg">
            <p className="text-sm font-semibold mb-2">💡 RTK vs Traditional Redux:</p>
            <p className="text-sm text-muted-foreground">
              Notice how RTK eliminates action type constants, action creator functions, 
              and verbose switch statements. The createSlice function combines all of these 
              into one concise definition!
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default function RTKDemo() {
  return (
    <Provider store={store}>
      <RTKDemoContent />
    </Provider>
  );
}

