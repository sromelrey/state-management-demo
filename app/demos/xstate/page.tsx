"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useMachine } from "@xstate/react";
import { counterMachine } from "./counterMachine";
import { CounterDisplay } from "./components/CounterDisplay";
import { CounterControls } from "./components/CounterControls";
import { AdditionalDisplay } from "./components/AdditionalDisplay";

export default function XStateDemo() {
  const [state, send] = useMachine(counterMachine);

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold">XState</h1>
        <p className="text-muted-foreground mt-2">
          State machines and statecharts for managing complex application logic
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <CounterDisplay state={state} />
        <CounterControls send={send} state={state} />
      </div>

      <AdditionalDisplay state={state} />

      <Card>
        <CardHeader>
          <CardTitle>Implementation Details</CardTitle>
          <CardDescription>How this XState implementation works</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="font-semibold mb-2">Setup Required:</h3>
            <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
              <li>Install xstate and @xstate/react packages (~7 KB)</li>
              <li>Define state machine with states and transitions</li>
              <li>Define context (data) and events</li>
              <li>Use useMachine() hook in components</li>
              <li>Send events to trigger state transitions</li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-2">Pros:</h3>
            <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
              <li>Explicit state management with visual state charts</li>
              <li>Impossible states become impossible to represent</li>
              <li>Built-in async state handling (loading, success, error)</li>
              <li>Excellent for complex workflows and UI flows</li>
              <li>Great TypeScript support</li>
              <li>Built-in history states and parallel states</li>
              <li>Visual debugging with XState Inspector</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Cons:</h3>
            <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
              <li>Different mental model (state machines)</li>
              <li>Steeper learning curve</li>
              <li>Can be overkill for simple state</li>
              <li>More verbose for basic use cases</li>
              <li>Requires understanding of state machine concepts</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Code Sample:</h3>
            <pre className="bg-muted p-4 rounded-lg text-xs overflow-x-auto">
{`// Define the machine
const counterMachine = createMachine({
  id: 'counter',
  initial: 'idle',
  context: { count: 0 },
  states: {
    idle: {
      on: {
        INCREMENT: {
          actions: assign({ count: (ctx) => ctx.count + 1 })
        }
      }
    }
  }
});

// Use in component
const [state, send] = useMachine(counterMachine);
send({ type: 'INCREMENT' });`}
            </pre>
          </div>

          <div className="bg-purple-50 dark:bg-purple-950 p-4 rounded-lg">
            <p className="text-sm font-semibold mb-2">💡 State Machines Advantage:</p>
            <p className="text-sm text-muted-foreground">
              XState uses finite state machines which make your application logic explicit and 
              visual. Notice how we have "idle" and "incrementing" states? This prevents bugs 
              by making impossible states impossible - you can't be both idle and incrementing!
            </p>
          </div>

          <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg">
            <p className="text-sm font-semibold mb-2">📊 When to Use XState:</p>
            <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
              <li>Complex user flows (multi-step forms, wizards)</li>
              <li>State-dependent UI (authentication flows, onboarding)</li>
              <li>When you need visual state charts for documentation</li>
              <li>Applications with complex async state management</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

