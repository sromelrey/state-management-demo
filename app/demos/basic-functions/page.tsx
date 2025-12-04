"use client";

import React, { useState, useRef } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CodeViewer } from "@/components/ui/code-viewer";

// Component to show render count
function RenderCounter({ label, count }: { label: string; count: number }) {
    return (
        <div className="text-sm text-muted-foreground">
            {label}: <span className="font-mono font-bold text-primary">{count}</span>
        </div>
    );
}

// Expensive calculation function
function expensiveCalculation(num: number) {
    console.log("🔴 Running expensive calculation...");
    let result = 0;
    for (let i = 0; i < 100000000; i++) {
        result += num;
    }
    return result;
}

// Child component that re-renders unnecessarily
function ChildComponent({ onClick, renderCount }: { onClick: () => void; renderCount: React.MutableRefObject<number> }) {
    renderCount.current += 1;

    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-lg">Child Component</CardTitle>
            </CardHeader>
            <CardContent>
                <RenderCounter label="Child renders" count={renderCount.current} />
                <Button onClick={onClick} className="mt-3">Click Me</Button>
                <p className="text-xs text-muted-foreground mt-2">
                    This child re-renders every time the parent does, even if the onClick function logic hasn't changed!
                </p>
            </CardContent>
        </Card>
    );
}

const DEMO_CODE = `export default function BasicFunctionsDemo() {
    const [count, setCount] = useState(0);
    const [otherState, setOtherState] = useState(0);
    const parentRenderCount = useRef(0);
    const childRenderCount = useRef(0);

    parentRenderCount.current += 1;

    // This function is recreated on every render
    const handleClick = () => {
        console.log("Button clicked!");
    };

    // This expensive calculation runs on EVERY render
    const expensiveResult = expensiveCalculation(count);

    return (
        <div className="space-y-6 max-w-4xl mx-auto">
            {/* ... UI components ... */}
            <Button onClick={() => setCount(count + 1)}>
                Increment Count: {count}
            </Button>
            <Button onClick={() => setOtherState(otherState + 1)}>
                Update Other State: {otherState}
            </Button>
            
            <p>Expensive Result: {expensiveResult}</p>
            
            <ChildComponent onClick={handleClick} renderCount={childRenderCount} />
        </div>
    );
}`;

export default function BasicFunctionsDemo() {
    const [count, setCount] = useState(0);
    const [otherState, setOtherState] = useState(0);
    const parentRenderCount = useRef(0);
    const childRenderCount = useRef(0);

    parentRenderCount.current += 1;

    // This function is recreated on every render
    const handleClick = () => {
        console.log("Button clicked!");
    };

    // This expensive calculation runs on EVERY render
    const expensiveResult = expensiveCalculation(count);

    return (
        <div className="space-y-6 max-w-4xl mx-auto">
            <div>
                <h1 className="text-3xl font-bold">Basic Functions (No Optimization)</h1>
                <p className="text-muted-foreground mt-2">
                    Common performance issues when NOT using useCallback, useMemo, or React.memo
                </p>
            </div>

            <Card className="border-red-200 dark:border-red-900">
                <CardHeader>
                    <CardTitle>Performance Issues Demo</CardTitle>
                    <CardDescription>Watch the console and render counters to see the problems</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <RenderCounter label="Parent renders" count={parentRenderCount.current} />

                    <div className="flex gap-4">
                        <Button onClick={() => setCount(count + 1)}>
                            Increment Count: {count}
                        </Button>
                        <Button onClick={() => setOtherState(otherState + 1)} variant="secondary">
                            Update Other State: {otherState}
                        </Button>
                    </div>

                    <div className="bg-muted p-4 rounded">
                        <p className="text-sm font-semibold">Expensive Calculation Result:</p>
                        <p className="font-mono text-lg">{expensiveResult}</p>
                        <p className="text-xs text-muted-foreground mt-2">
                            🔴 Check console - this calculation runs on EVERY render, even when "Other State" changes!
                        </p>
                    </div>

                    <ChildComponent onClick={handleClick} renderCount={childRenderCount} />

                    <CodeViewer code={DEMO_CODE} title="View Implementation" />
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>What Problems Do You See?</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="bg-red-50 dark:bg-red-950 p-4 rounded-lg">
                        <p className="font-semibold mb-2">🔴 Problem 1: Functions Recreated on Every Render</p>
                        <p className="text-sm text-muted-foreground">
                            The <code className="bg-muted px-1 rounded">handleClick</code> function is recreated every time the component renders.
                            This causes child components to receive a "new" function reference, triggering unnecessary re-renders.
                        </p>
                        <p className="text-sm text-green-600 dark:text-green-400 mt-2">
                            ✅ Solution: <strong>useCallback</strong>
                        </p>
                    </div>

                    <div className="bg-red-50 dark:bg-red-950 p-4 rounded-lg">
                        <p className="font-semibold mb-2">🔴 Problem 2: Expensive Calculations Run Unnecessarily</p>
                        <p className="text-sm text-muted-foreground">
                            The <code className="bg-muted px-1 rounded">expensiveCalculation</code> runs on EVERY render, even when you click
                            "Update Other State" which doesn't affect the calculation input.
                        </p>
                        <p className="text-sm text-green-600 dark:text-green-400 mt-2">
                            ✅ Solution: <strong>useMemo</strong>
                        </p>
                    </div>

                    <div className="bg-red-50 dark:bg-red-950 p-4 rounded-lg">
                        <p className="font-semibold mb-2">🔴 Problem 3: Child Components Re-render Unnecessarily</p>
                        <p className="text-sm text-muted-foreground">
                            The ChildComponent re-renders every time the parent does, even when its props haven't meaningfully changed.
                            Watch the render counter increase even when you just change "Other State".
                        </p>
                        <p className="text-sm text-green-600 dark:text-green-400 mt-2">
                            ✅ Solution: <strong>React.memo</strong>
                        </p>
                    </div>

                    <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg">
                        <p className="font-semibold mb-2">💡 When These Problems Matter:</p>
                        <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                            <li>Large applications with many components</li>
                            <li>Components that render frequently</li>
                            <li>Expensive calculations or rendering operations</li>
                            <li>When you notice performance lag in your app</li>
                        </ul>
                    </div>

                    <div className="bg-yellow-50 dark:bg-yellow-950 p-4 rounded-lg">
                        <p className="font-semibold mb-2">⚠️ Important Note:</p>
                        <p className="text-sm text-muted-foreground">
                            Don't optimize prematurely! These hooks add complexity. Only use them when you have
                            actual performance issues. In many cases, React is fast enough without optimization.
                        </p>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>🧠 JavaScript Execution Context Phases</CardTitle>
                    <CardDescription>Understanding what happens under the hood when React renders</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-lg border-l-4 border-blue-500">
                        <p className="font-semibold mb-2">📦 Phase 1: Creation Phase</p>
                        <p className="text-sm text-muted-foreground mb-2">
                            When React calls your component function, the JavaScript engine first sets up the execution context:
                        </p>
                        <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                            <li>Memory is allocated for variables (<code className="bg-muted px-1 rounded">count</code>, <code className="bg-muted px-1 rounded">otherState</code>)</li>
                            <li>Function declarations are hoisted and stored in memory</li>
                            <li><code className="bg-muted px-1 rounded">handleClick</code> function definition is prepared (but not executed yet)</li>
                            <li>References to <code className="bg-muted px-1 rounded">expensiveCalculation</code> are established</li>
                        </ul>
                    </div>

                    <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-lg border-l-4 border-green-500">
                        <p className="font-semibold mb-2">⚡ Phase 2: Execution Phase</p>
                        <p className="text-sm text-muted-foreground mb-2">
                            Now the code runs line by line:
                        </p>
                        <pre className="bg-muted p-3 rounded text-xs overflow-x-auto mb-2">
                            {`// Line 1: useState hooks execute, return current state
const [count, setCount] = useState(0);

// Line 2: A NEW function object is created in memory
const handleClick = () => { console.log("clicked"); };
// ^ Every render = new memory address!

// Line 3: expensiveCalculation RUNS immediately
const expensiveResult = expensiveCalculation(count);
// ^ This blocks rendering until complete!`}
                        </pre>
                        <p className="text-sm text-muted-foreground">
                            The key insight: <strong>Every time React re-renders</strong>, a new execution context is created,
                            meaning all inline functions get <strong>new memory addresses</strong> and all calculations <strong>run again</strong>.
                        </p>
                    </div>

                    <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-lg border-l-4 border-purple-500">
                        <p className="font-semibold mb-2">🔄 What Happens on Re-render</p>
                        <div className="text-sm text-muted-foreground space-y-2">
                            <p><strong>Render 1:</strong> <code className="bg-muted px-1 rounded">handleClick</code> → Memory Address <code className="bg-red-100 dark:bg-red-900 px-1 rounded">0x001</code></p>
                            <p><strong>Render 2:</strong> <code className="bg-muted px-1 rounded">handleClick</code> → Memory Address <code className="bg-red-100 dark:bg-red-900 px-1 rounded">0x002</code> (NEW!)</p>
                            <p><strong>Render 3:</strong> <code className="bg-muted px-1 rounded">handleClick</code> → Memory Address <code className="bg-red-100 dark:bg-red-900 px-1 rounded">0x003</code> (NEW!)</p>
                            <p className="mt-2 text-yellow-600 dark:text-yellow-400">
                                React sees different references → Child component must re-render!
                            </p>
                        </div>
                    </div>

                    <div className="bg-orange-50 dark:bg-orange-950 p-4 rounded-lg">
                        <p className="font-semibold mb-2">🎯 Why React Strict Mode Shows Double Execution</p>
                        <p className="text-sm text-muted-foreground">
                            In development, React intentionally runs your component <strong>twice</strong> to detect impure side effects.
                            This is why you see <code className="bg-muted px-1 rounded">expensiveCalculation</code> logged twice on each render.
                            This <strong>does not happen in production</strong>.
                        </p>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
