import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const approaches = [
  {
    name: "useState + Props",
    path: "/demos/usestate",
    description: "Traditional React approach with local state and props drilling",
    pros: ["Simple and straightforward", "No dependencies", "Easy to learn", "Great for local state"],
    cons: ["Props drilling problem", "Hard to share state", "Tightly coupled components"],
    bundleSize: "0 KB",
  },
  {
    name: "React Context",
    path: "/demos/context",
    description: "Built-in React solution using Context API with useReducer",
    pros: ["No external dependencies", "Built into React", "Solves props drilling"],
    cons: ["Can cause unnecessary re-renders", "Boilerplate with useReducer", "Limited dev tools"],
    bundleSize: "0 KB",
  },
  {
    name: "Zustand",
    path: "/demos/zustand",
    description: "Minimal state management with a simple, hook-based API",
    pros: ["Minimal boilerplate", "Small bundle size", "Easy to learn", "No Provider needed"],
    cons: ["Smaller ecosystem", "Less tooling", "Simple feature set"],
    bundleSize: "~3 KB",
  },
  {
    name: "Redux",
    path: "/demos/redux",
    description: "Traditional Redux with actions, reducers, and middleware",
    pros: ["Mature ecosystem", "Excellent dev tools", "Predictable patterns", "Large community"],
    cons: ["Lots of boilerplate", "Steep learning curve", "Verbose code"],
    bundleSize: "~12 KB",
  },
  {
    name: "Redux Toolkit",
    path: "/demos/rtk",
    description: "Modern Redux with simplified API and better defaults",
    pros: ["Less boilerplate than Redux", "Great dev tools", "Built-in best practices", "TypeScript friendly"],
    cons: ["Still more complex than simpler solutions", "Larger bundle size"],
    bundleSize: "~14 KB",
  },
  {
    name: "XState",
    path: "/demos/xstate",
    description: "State machines and statecharts for explicit state management",
    pros: ["Impossible states are impossible", "Visual state charts", "Great for complex flows", "Built-in async handling"],
    cons: ["Different mental model", "Steeper learning curve", "Can be overkill for simple cases"],
    bundleSize: "~7 KB",
  },
];

export default function Home() {
  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold">State Management Comparison</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Compare useState, React Context, Zustand, Redux, Redux Toolkit, and XState side-by-side with identical counter examples
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {approaches.map((approach) => (
          <Card key={approach.name} className="flex flex-col">
            <CardHeader>
              <CardTitle>{approach.name}</CardTitle>
              <CardDescription>{approach.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 space-y-4">
              <div>
                <h4 className="font-semibold text-sm mb-2">Pros:</h4>
                <ul className="text-sm space-y-1">
                  {approach.pros.map((pro) => (
                    <li key={pro} className="text-muted-foreground">✓ {pro}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-sm mb-2">Cons:</h4>
                <ul className="text-sm space-y-1">
                  {approach.cons.map((con) => (
                    <li key={con} className="text-muted-foreground">✗ {con}</li>
                  ))}
                </ul>
              </div>
              <div className="pt-2 border-t">
                <p className="text-sm">
                  <span className="font-semibold">Bundle Size:</span>{" "}
                  <span className="text-muted-foreground">{approach.bundleSize}</span>
                </p>
              </div>
              <Button asChild className="w-full">
                <Link href={approach.path}>View Demo →</Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>About This Demo</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>
            Each demo implements an identical counter application with the following features:
          </p>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground">
            <li>Increment, decrement, and reset counter</li>
            <li>Async increment (1 second delay)</li>
            <li>Multiple components sharing the same state</li>
            <li>Loading states for async operations</li>
          </ul>
          <p className="text-sm text-muted-foreground">
            By using identical functionality across all implementations, you can clearly see the
            differences in setup, boilerplate, and API design.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
