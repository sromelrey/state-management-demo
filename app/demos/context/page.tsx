import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CounterProvider } from "./CounterContext";
import { CounterDisplay } from "./components/CounterDisplay";
import { CounterControls } from "./components/CounterControls";
import { AdditionalDisplay } from "./components/AdditionalDisplay";

export default function ContextDemo() {
  return (
    <CounterProvider>
      <div className="space-y-6 max-w-4xl mx-auto">
        <div>
          <h1 className="text-3xl font-bold">React Context API</h1>
          <p className="text-muted-foreground mt-2">
            Built-in React solution using Context API with useReducer for state management
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
            <CardDescription>How this Context implementation works</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">Setup Required:</h3>
              <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                <li>Create Context with createContext()</li>
                <li>Define state type and action types</li>
                <li>Implement reducer function</li>
                <li>Create Provider component with useReducer</li>
                <li>Export custom hook for consuming context</li>
                <li>Wrap component tree with Provider</li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-2">Pros:</h3>
              <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                <li>No external dependencies - built into React</li>
                <li>Good for simple to moderate state management</li>
                <li>Familiar React patterns</li>
                <li>Type-safe with TypeScript</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Cons:</h3>
              <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                <li>Can cause unnecessary re-renders without optimization</li>
                <li>Requires boilerplate (actions, reducer, provider)</li>
                <li>Limited developer tools compared to Redux</li>
                <li>Async logic needs manual implementation</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Code Sample:</h3>
              <pre className="bg-muted p-4 rounded-lg text-xs overflow-x-auto">
{`// Using the counter
const { state, increment } = useCounter();
console.log(state.count); // 0
increment(); // count becomes 1`}
              </pre>
            </div>
          </CardContent>
        </Card>
      </div>
    </CounterProvider>
  );
}

