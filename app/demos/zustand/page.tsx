import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CounterDisplay } from "./components/CounterDisplay";
import { CounterControls } from "./components/CounterControls";
import { AdditionalDisplay } from "./components/AdditionalDisplay";

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

          <div>
            <h3 className="font-semibold mb-2">Code Sample:</h3>
            <pre className="bg-muted p-4 rounded-lg text-xs overflow-x-auto">
{`// Creating the store
const useStore = create((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 }))
}));

// ✅ DO: Select values individually
const count = useStore((state) => state.count);
const increment = useStore((state) => state.increment);

// ❌ DON'T: Return object (causes infinite loops)
const { count, increment } = useStore((state) => ({
  count: state.count,
  increment: state.increment
}));`}
            </pre>
          </div>

          <div className="bg-yellow-50 dark:bg-yellow-950 p-4 rounded-lg">
            <p className="text-sm font-semibold mb-2">⚠️ Important Pattern:</p>
            <p className="text-sm text-muted-foreground">
              When using Zustand, select values individually rather than returning an object. 
              Returning an object creates a new reference on every render, causing infinite loops. 
              This is the most common Zustand mistake!
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

