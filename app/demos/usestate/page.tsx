"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CounterDisplay } from "./components/CounterDisplay";
import { CounterControls } from "./components/CounterControls";
import { MiddlewareComponent } from "./components/MiddlewareComponent";
import { CodeViewer } from "@/components/ui/code-viewer";

const DEMO_CODE = `export default function UseStateDemo() {
  // All state lives in this parent component
  const [count, setCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  // All handlers must be defined here and passed down
  const handleIncrement = () => setCount(count + 1);
  const handleDecrement = () => setCount(count - 1);
  const handleReset = () => setCount(0);
  const handleIncrementAsync = () => {
    setIsLoading(true);
    setTimeout(() => {
      setCount(count + 1);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="grid md:grid-cols-2 gap-4">
        {/* Props must be explicitly passed to every component */}
        <CounterDisplay count={count} isLoading={isLoading} />
        <CounterControls
          onIncrement={handleIncrement}
          onDecrement={handleDecrement}
          onReset={handleReset}
          onIncrementAsync={handleIncrementAsync}
          isLoading={isLoading}
        />
      </div>

      {/* Props drilling: passing through components that don't need them */}
      <MiddlewareComponent count={count} />
    </div>
  );
}`;

export default function UseStateDemo() {
  // All state lives in this parent component
  const [count, setCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  // All handlers must be defined here and passed down
  const handleIncrement = () => setCount(count + 1);
  const handleDecrement = () => setCount(count - 1);
  const handleReset = () => setCount(0);
  const handleIncrementAsync = () => {
    setIsLoading(true);
    setTimeout(() => {
      setCount(count + 1);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold">useState + Props Drilling</h1>
        <p className="text-muted-foreground mt-2">
          Traditional React approach using useState and passing props down the component tree
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {/* Props must be explicitly passed to every component */}
        <CounterDisplay count={count} isLoading={isLoading} />
        <CounterControls
          onIncrement={handleIncrement}
          onDecrement={handleDecrement}
          onReset={handleReset}
          onIncrementAsync={handleIncrementAsync}
          isLoading={isLoading}
        />
      </div>

      {/* Props drilling: passing through components that don't need them */}
      <MiddlewareComponent count={count} />

      <Card>
        <CardHeader>
          <CardTitle>Implementation Details</CardTitle>
          <CardDescription>How this useState implementation works</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="font-semibold mb-2">Setup Required:</h3>
            <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
              <li>No external dependencies - built into React</li>
              <li>State lives in parent component</li>
              <li>Define all handlers in parent</li>
              <li>Pass state and handlers as props to children</li>
              <li>Every component in the chain must accept and pass props</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Pros:</h3>
            <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
              <li>Simple and straightforward for small apps</li>
              <li>No external dependencies</li>
              <li>Easy to understand and learn</li>
              <li>Explicit data flow</li>
              <li>Works great for local component state</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Cons:</h3>
            <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
              <li><strong>Props Drilling</strong> - must pass props through intermediate components</li>
              <li>State must live in common ancestor (often very high in tree)</li>
              <li>Difficult to refactor component structure</li>
              <li>Lots of prop interfaces to maintain</li>
              <li>Components become tightly coupled</li>
              <li>Hard to share state across distant components</li>
            </ul>
          </div>

          <div className="bg-red-50 dark:bg-red-950 p-4 rounded-lg">
            <p className="text-sm font-semibold mb-2">🔴 The Props Drilling Problem:</p>
            <p className="text-sm text-muted-foreground mb-2">
              Notice the orange "Middleware Component" above? It doesn't use the count value at all,
              but it MUST receive it as a prop just to pass it down to its children.
            </p>
            <p className="text-sm text-muted-foreground">
              Imagine this happening across 5-10 levels of components - this is why state management
              solutions exist! Every other approach in this demo solves this problem in different ways.
            </p>
          </div>

          <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg">
            <p className="text-sm font-semibold mb-2">💡 When to Use useState + Props:</p>
            <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
              <li>Small applications with simple state needs</li>
              <li>Local component state (doesn't need to be shared)</li>
              <li>Shallow component hierarchies (2-3 levels max)</li>
              <li>Learning React basics</li>
            </ul>
          </div>

          <CodeViewer code={DEMO_CODE} title="View Implementation" />
        </CardContent>
      </Card>
    </div>
  );
}

