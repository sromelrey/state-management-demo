"use client";

import React, { useState, useMemo, useRef } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CodeViewer } from "@/components/ui/code-viewer";

// Expensive calculation that we want to avoid running unnecessarily
function expensiveCalculation(num: number): number {
    console.log("💰 Running expensive calculation for:", num);
    let result = 0;
    // Simulate expensive operation
    for (let i = 0; i < 100000000; i++) {
        result += num;
    }
    return result;
}

const WITHOUT_MEMO_CODE = `function WithoutMemoComponent() {
    const [count, setCount] = useState(5);
    const [otherState, setOtherState] = useState(0);
    const calculationCount = useRef(0);

    // Without useMemo - runs on EVERY render
    const expensiveResult = expensiveCalculation(count);
    calculationCount.current += 1;

    return (
        <Card className="border-red-200">
            {/* ... UI components ... */}
            <p>Result: {expensiveResult}</p>
            <Button onClick={() => setCount(count + 1)}>Change Input</Button>
            <Button onClick={() => setOtherState(otherState + 1)}>Change Other</Button>
        </Card>
    );
}`;

// Component WITHOUT useMemo
function WithoutMemoComponent() {
    const [count, setCount] = useState(5);
    const [otherState, setOtherState] = useState(0);
    const calculationCount = useRef(0);

    // Without useMemo - runs on EVERY render
    const expensiveResult = expensiveCalculation(count);
    calculationCount.current += 1;

    return (
        <Card className="border-red-200">
            <CardHeader>
                <CardTitle className="text-lg">❌ Without useMemo</CardTitle>
                <CardDescription>Calculation runs on every render</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
                <div className="bg-muted p-3 rounded">
                    <p className="text-xs font-semibold mb-1">Calculation Input:</p>
                    <p className="font-mono text-lg">{count}</p>
                </div>

                <div className="bg-muted p-3 rounded">
                    <p className="text-xs font-semibold mb-1">Expensive Result:</p>
                    <p className="font-mono text-lg">{expensiveResult.toLocaleString()}</p>
                </div>

                <div className="bg-red-50 dark:bg-red-950 p-3 rounded">
                    <p className="text-xs font-semibold">Calculation ran: <span className="font-mono text-red-600 dark:text-red-400">{calculationCount.current} times</span></p>
                    <p className="text-xs text-muted-foreground mt-1">
                        🔴 Check console - runs even when "Other State" changes!
                    </p>
                </div>

                <div className="space-y-2">
                    <Button onClick={() => setCount(count + 1)} size="sm" className="w-full">
                        Change Input ({count})
                    </Button>
                    <Button onClick={() => setOtherState(otherState + 1)} size="sm" variant="outline" className="w-full">
                        Change Other State ({otherState})
                    </Button>
                </div>

                <CodeViewer code={WITHOUT_MEMO_CODE} title="View Implementation" />
            </CardContent>
        </Card>
    );
}

const WITH_MEMO_CODE = `function WithMemoComponent() {
    const [count, setCount] = useState(5);
    const [otherState, setOtherState] = useState(0);
    const calculationCount = useRef(0);

    // With useMemo - only runs when 'count' changes
    const expensiveResult = useMemo(() => {
        calculationCount.current += 1;
        return expensiveCalculation(count);
    }, [count]); // Only re-run when count changes

    return (
        <Card className="border-green-200">
            {/* ... UI components ... */}
            <p>Result: {expensiveResult}</p>
            <Button onClick={() => setCount(count + 1)}>Change Input</Button>
            <Button onClick={() => setOtherState(otherState + 1)}>Change Other</Button>
        </Card>
    );
}`;

// Component WITH useMemo
function WithMemoComponent() {
    const [count, setCount] = useState(5);
    const [otherState, setOtherState] = useState(0);
    const calculationCount = useRef(0);

    // With useMemo - only runs when 'count' changes
    const expensiveResult = useMemo(() => {
        calculationCount.current += 1;
        return expensiveCalculation(count);
    }, [count]); // Only re-run when count changes

    return (
        <Card className="border-green-200">
            <CardHeader>
                <CardTitle className="text-lg">✅ With useMemo</CardTitle>
                <CardDescription>Calculation only runs when input changes</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
                <div className="bg-muted p-3 rounded">
                    <p className="text-xs font-semibold mb-1">Calculation Input:</p>
                    <p className="font-mono text-lg">{count}</p>
                </div>

                <div className="bg-muted p-3 rounded">
                    <p className="text-xs font-semibold mb-1">Expensive Result:</p>
                    <p className="font-mono text-lg">{expensiveResult.toLocaleString()}</p>
                </div>

                <div className="bg-green-50 dark:bg-green-950 p-3 rounded">
                    <p className="text-xs font-semibold">Calculation ran: <span className="font-mono text-green-600 dark:text-green-400">{calculationCount.current} times</span></p>
                    <p className="text-xs text-muted-foreground mt-1">
                        ✅ Only runs when input actually changes!
                    </p>
                </div>

                <div className="space-y-2">
                    <Button onClick={() => setCount(count + 1)} size="sm" className="w-full">
                        Change Input ({count})
                    </Button>
                    <Button onClick={() => setOtherState(otherState + 1)} size="sm" variant="outline" className="w-full">
                        Change Other State ({otherState})
                    </Button>
                </div>

                <CodeViewer code={WITH_MEMO_CODE} title="View Implementation" />
            </CardContent>
        </Card>
    );
}

export default function UseMemoDemo() {
    return (
        <div className="space-y-6 max-w-6xl mx-auto">
            <div>
                <h1 className="text-3xl font-bold">useMemo Hook</h1>
                <p className="text-muted-foreground mt-2">
                    Memoize expensive calculations to avoid unnecessary recomputations
                </p>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Interactive Comparison</CardTitle>
                    <CardDescription>
                        Try clicking "Change Other State" on both sides and watch the calculation counters
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid md:grid-cols-2 gap-4">
                        <WithoutMemoComponent />
                        <WithMemoComponent />
                    </div>

                    <div className="bg-yellow-50 dark:bg-yellow-950 p-4 rounded-lg mt-4">
                        <p className="font-semibold mb-2">🧪 Try This:</p>
                        <p className="text-sm text-muted-foreground">
                            Click "Change Other State" on both cards and observe:
                        </p>
                        <ul className="list-disc list-inside text-sm text-muted-foreground mt-2 space-y-1">
                            <li>Left (without useMemo): calculation runs even though input didn't change</li>
                            <li>Right (with useMemo): calculation is skipped, previous result is reused</li>
                        </ul>
                    </div>
                </CardContent>
            </Card>

            <div className="grid md:grid-cols-2 gap-4">
                <Card className="border-red-200">
                    <CardHeader>
                        <CardTitle className="text-lg">❌ Without useMemo</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <pre className="bg-muted p-4 rounded text-xs overflow-x-auto">
                            {`function Component() {
  const [count, setCount] = useState(0);
  const [other, setOther] = useState(0);
  
  // Runs on EVERY render
  const result = expensiveCalculation(count);
  
  return (
    <div>
      <p>Result: {result}</p>
      <button onClick={() => setOther(other + 1)}>
        Update Other
      </button>
    </div>
  );
}`}
                        </pre>
                        <div className="mt-3 text-sm space-y-2">
                            <p className="font-semibold">Why it's a problem:</p>
                            <ul className="list-disc list-inside space-y-1 text-muted-foreground text-xs">
                                <li>Calculation runs on every render</li>
                                <li>Even when 'other' changes (unrelated to count)</li>
                                <li>Wastes CPU time and causes lag</li>
                                <li>User experiences slow interactions</li>
                            </ul>
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-green-200">
                    <CardHeader>
                        <CardTitle className="text-lg">✅ With useMemo</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <pre className="bg-muted p-4 rounded text-xs overflow-x-auto">
                            {`function Component() {
  const [count, setCount] = useState(0);
  const [other, setOther] = useState(0);
  
  // Only runs when count changes
  const result = useMemo(
    () => expensiveCalculation(count),
    [count] // Dependency array
  );
  
  return (
    <div>
      <p>Result: {result}</p>
      <button onClick={() => setOther(other + 1)}>
        Update Other
      </button>
    </div>
  );
}`}
                        </pre>
                        <div className="mt-3 text-sm space-y-2">
                            <p className="font-semibold">Why it works:</p>
                            <ul className="list-disc list-inside space-y-1 text-muted-foreground text-xs">
                                <li>Calculation only runs when count changes</li>
                                <li>Previous result is cached and reused</li>
                                <li>Saves CPU time on other state updates</li>
                                <li>Smoother, more responsive UI ✨</li>
                            </ul>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>When to Use useMemo</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="bg-green-50 dark:bg-green-950 p-4 rounded-lg">
                        <p className="font-semibold mb-2">✅ Good Use Cases:</p>
                        <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                            <li>Expensive calculations (complex math, data transformations, filtering/sorting large arrays)</li>
                            <li>Derived values from props/state that are costly to compute</li>
                            <li>Creating stable object/array references for memoized components</li>
                            <li>Preventing expensive JSX generation from running on every render</li>
                        </ul>
                    </div>

                    <div className="bg-red-50 dark:bg-red-950 p-4 rounded-lg">
                        <p className="font-semibold mb-2">❌ When NOT to Use:</p>
                        <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                            <li>Simple calculations (addition, string concatenation, etc.)</li>
                            <li>Calculations that are already fast</li>
                            <li>When dependencies change frequently anyway</li>
                            <li>Premature optimization without profiling</li>
                        </ul>
                    </div>

                    <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg">
                        <p className="font-semibold mb-2">💡 Key Difference from useCallback:</p>
                        <p className="text-sm text-muted-foreground mb-2">
                            <strong>useMemo</strong> memoizes the <em>result</em> of a calculation.
                        </p>
                        <p className="text-sm text-muted-foreground">
                            <strong>useCallback</strong> memoizes the <em>function itself</em>.
                        </p>
                        <p className="text-sm text-muted-foreground mt-2">
                            In fact, <code className="bg-muted px-1 rounded">useCallback(fn, deps)</code> is equivalent to{" "}
                            <code className="bg-muted px-1 rounded">useMemo({`() => fn`}, deps)</code>
                        </p>
                    </div>

                    <div className="bg-purple-50 dark:bg-purple-950 p-4 rounded-lg">
                        <p className="font-semibold mb-2">⚡ Performance Tip:</p>
                        <p className="text-sm text-muted-foreground">
                            Don't guess - measure! Use React DevTools Profiler to identify actual performance bottlenecks
                            before adding useMemo. The overhead of memoization itself can sometimes be worse than just
                            recalculating, especially for simple operations.
                        </p>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>🧠 JavaScript Execution Context Phases</CardTitle>
                    <CardDescription>How useMemo caches expensive calculations</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-lg border-l-4 border-blue-500">
                        <p className="font-semibold mb-2">📦 Phase 1: Creation Phase</p>
                        <p className="text-sm text-muted-foreground mb-2">
                            When React calls your component function:
                        </p>
                        <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                            <li>Memory allocated for variables and state</li>
                            <li>React's hooks registry accessed</li>
                            <li><code className="bg-muted px-1 rounded">useMemo</code> hook slot identified</li>
                            <li>Previous cached VALUE is retrieved (not function, the actual result!)</li>
                        </ul>
                    </div>

                    <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-lg border-l-4 border-green-500">
                        <p className="font-semibold mb-2">⚡ Phase 2: Execution Phase</p>
                        <p className="text-sm text-muted-foreground mb-2">
                            React compares dependencies and decides whether to RUN the calculation:
                        </p>
                        <pre className="bg-muted p-3 rounded text-xs overflow-x-auto mb-2">
                            {`// Your code:
const expensiveResult = useMemo(() => {
    return expensiveCalculation(count);
}, [count]);

// React internally:
if (count === previousCount) {
    // Dependencies unchanged!
    return cachedValue;  // Skip calculation entirely!
} else {
    // Dependencies changed
    const newValue = expensiveCalculation(count);  // Run it
    cache.set(hookIndex, newValue);
    return newValue;
}`}
                        </pre>
                    </div>

                    <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-lg border-l-4 border-purple-500">
                        <p className="font-semibold mb-2">🔄 Computation Comparison</p>
                        <div className="grid md:grid-cols-2 gap-4 text-sm">
                            <div className="bg-red-50 dark:bg-red-900/30 p-3 rounded">
                                <p className="font-semibold mb-1">❌ Without useMemo:</p>
                                <p className="text-muted-foreground text-xs">
                                    Render 1: <code className="bg-muted px-1 rounded">expensiveCalc(0)</code> runs<br />
                                    Render 2: <code className="bg-muted px-1 rounded">expensiveCalc(0)</code> runs<br />
                                    Render 3: <code className="bg-muted px-1 rounded">expensiveCalc(0)</code> runs
                                </p>
                                <p className="text-yellow-600 dark:text-yellow-400 text-xs mt-1">⚠️ Same result, wasted CPU!</p>
                            </div>
                            <div className="bg-green-50 dark:bg-green-900/30 p-3 rounded">
                                <p className="font-semibold mb-1">✅ With useMemo:</p>
                                <p className="text-muted-foreground text-xs">
                                    Render 1: <code className="bg-muted px-1 rounded">expensiveCalc(0)</code> runs<br />
                                    Render 2: returns cached value<br />
                                    Render 3: returns cached value
                                </p>
                                <p className="text-green-600 dark:text-green-400 text-xs mt-1">✨ Only runs when count changes!</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-orange-50 dark:bg-orange-950 p-4 rounded-lg">
                        <p className="font-semibold mb-2">🎯 Key Difference from useCallback</p>
                        <div className="text-sm text-muted-foreground space-y-1">
                            <p><strong>useMemo:</strong> Caches the <em>result</em> of running the function</p>
                            <p><strong>useCallback:</strong> Caches the <em>function itself</em> (memory reference)</p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
