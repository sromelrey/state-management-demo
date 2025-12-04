"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CodeViewer } from "@/components/ui/code-viewer";

const KEYS_CODE = `const items = [
  { id: "redux", label: "Redux Toolkit" },
  { id: "zustand", label: "Zustand" },
  { id: "xstate", label: "XState" },
];

export function StateList() {
  return (
    <ul>
      {items.map((item) => (
        <li key={item.id}>{item.label}</li>
      ))}
    </ul>
  );
}`;

const VDOM_CODE = `import { useState } from "react";

export function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}`;

export default function ReactConceptsDemo() {
  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold">React Concepts: Keys & Virtual DOM</h1>
        <p className="text-muted-foreground mt-2">
          Short explanations of common React concepts with small examples.
        </p>
      </div>

      {/* Keys in lists */}
      <Card>
        <CardHeader>
          <CardTitle>Keys When Rendering Lists</CardTitle>
          <CardDescription>
            How React keeps track of list items between renders.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            When you render a list with <code className="bg-muted px-1 rounded">array.map</code>,
            each child should have a stable <code className="bg-muted px-1 rounded">key</code>.
            React uses this key to match items between renders, so it knows which items stayed,
            moved, or were removed.
          </p>

          <p className="text-sm text-muted-foreground">
            In a typical project (like your state management demos), you might render a list of
            approaches with an <code className="bg-muted px-1 rounded">id</code> field and use that as
            the key instead of the array index.
          </p>

          <CodeViewer code={KEYS_CODE} title="Example: Good Keys for a List" />
        </CardContent>
      </Card>

      {/* Virtual DOM vs Real DOM */}
      <Card>
        <CardHeader>
          <CardTitle>Virtual DOM vs Real DOM</CardTitle>
          <CardDescription>
            How React updates the UI efficiently.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            The <strong>real DOM</strong> is the tree of actual elements in the browser
            (like <code className="bg-muted px-1 rounded">&lt;div&gt;</code> and
            <code className="bg-muted px-1 rounded">&lt;button&gt;</code>). Updating it directly many
            times can be slow.
          </p>

          <p className="text-sm text-muted-foreground">
            React builds a <strong>Virtual DOM</strong> in JavaScript: a lightweight description of
            what the UI should look like. When state changes (for example, when a
            <code className="bg-muted px-1 rounded">useState</code> value updates), React creates a new
            Virtual DOM tree, compares it to the previous one, and applies the minimal set of
            changes to the real DOM.
          </p>

          <p className="text-sm text-muted-foreground">
            In your demos, components like counters re-render when state changes, but thanks to the
            Virtual DOM React only updates the parts of the UI that actually changed (for example,
            just the number on the screen, not the whole page).
          </p>

          <CodeViewer code={VDOM_CODE} title="Example: Simple Counter Component" />
        </CardContent>
      </Card>
    </div>
  );
}
