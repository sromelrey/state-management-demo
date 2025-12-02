"use client";

import { Provider } from "react-redux";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { store } from "./store";
import { CounterDisplay } from "./components/CounterDisplay";
import { CounterControls } from "./components/CounterControls";
import { AdditionalDisplay } from "./components/AdditionalDisplay";

function ReduxDemoContent() {
  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold">Traditional Redux</h1>
        <p className="text-muted-foreground mt-2">
          Classic Redux pattern with actions, action creators, reducers, and middleware
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
          <CardDescription>How this Redux implementation works</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="font-semibold mb-2">Setup Required:</h3>
            <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
              <li>Install redux and react-redux packages</li>
              <li>Define action type constants</li>
              <li>Create action creator functions</li>
              <li>Implement reducer with switch statement</li>
              <li>Create store with createStore()</li>
              <li>Set up middleware (thunk for async)</li>
              <li>Wrap app with Provider component</li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-2">Pros:</h3>
            <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
              <li>Mature and battle-tested</li>
              <li>Excellent developer tools (Redux DevTools)</li>
              <li>Large ecosystem of middleware and libraries</li>
              <li>Predictable state updates</li>
              <li>Great for large, complex applications</li>
              <li>Strong community and resources</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Cons:</h3>
            <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
              <li>Significant boilerplate code</li>
              <li>Steep learning curve</li>
              <li>Verbose API</li>
              <li>Requires multiple files/patterns for simple features</li>
              <li>Manual middleware setup for async actions</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Code Sample:</h3>
            <pre className="bg-muted p-4 rounded-lg text-xs overflow-x-auto">
{`// Action types
const INCREMENT = 'INCREMENT';

// Action creators
const increment = () => ({ type: INCREMENT });

// Reducer
function reducer(state = { count: 0 }, action) {
  switch (action.type) {
    case INCREMENT:
      return { ...state, count: state.count + 1 };
    default:
      return state;
  }
}

// Usage
dispatch(increment());`}
            </pre>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default function ReduxDemo() {
  return (
    <Provider store={store}>
      <ReduxDemoContent />
    </Provider>
  );
}

