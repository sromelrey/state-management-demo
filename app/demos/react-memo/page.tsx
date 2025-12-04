"use client";

import React, { useState, useRef, memo } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CodeViewer } from "@/components/ui/code-viewer";

// Render counter component
function RenderCounter({ label, count }: { label: string; count: number }) {
    return (
        <div className="text-xs text-muted-foreground">
            {label}: <span className="font-mono font-bold text-primary">{count}</span>
        </div>
    );
}

const REGULAR_CHILD_CODE = `// Regular child component WITHOUT React.memo
function RegularChild({ value, renderCount }: { value: number; renderCount: React.MutableRefObject<number> }) {
    renderCount.current += 1;

    return (
        <Card className="border-red-200">
            {/* ... UI components ... */}
            <RenderCounter label="Render count" count={renderCount.current} />
            <p>Received Prop: {value}</p>
        </Card>
    );
}`;

// Regular child component WITHOUT React.memo
function RegularChild({ value, renderCount }: { value: number; renderCount: React.MutableRefObject<number> }) {
    renderCount.current += 1;

    return (
        <Card className="border-red-200">
            <CardHeader>
                <CardTitle className="text-base">Regular Child</CardTitle>
                <CardDescription>No optimization</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
                <RenderCounter label="Render count" count={renderCount.current} />
                <div className="bg-muted p-3 rounded">
                    <p className="text-xs font-semibold mb-1">Received Prop:</p>
                    <p className="font-mono text-lg">{value}</p>
                </div>
                <p className="text-xs text-muted-foreground">
                    🔴 Re-renders every time parent renders, even when prop doesn't change
                </p>
                <CodeViewer code={REGULAR_CHILD_CODE} title="View Child Implementation" />
            </CardContent>
        </Card>
    );
}

const MEMOIZED_CHILD_CODE = `// Memoized child component WITH React.memo
const MemoizedChild = memo(({ value, renderCount }: { value: number; renderCount: React.MutableRefObject<number> }) => {
    renderCount.current += 1;

    return (
        <Card className="border-green-200">
            {/* ... UI components ... */}
            <RenderCounter label="Render count" count={renderCount.current} />
            <p>Received Prop: {value}</p>
        </Card>
    );
});`;

// Memoized child component WITH React.memo
const MemoizedChild = memo(({ value, renderCount }: { value: number; renderCount: React.MutableRefObject<number> }) => {
    renderCount.current += 1;

    return (
        <Card className="border-green-200">
            <CardHeader>
                <CardTitle className="text-base">Memoized Child</CardTitle>
                <CardDescription>Wrapped with React.memo</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
                <RenderCounter label="Render count" count={renderCount.current} />
                <div className="bg-muted p-3 rounded">
                    <p className="text-xs font-semibold mb-1">Received Prop:</p>
                    <p className="font-mono text-lg">{value}</p>
                </div>
                <p className="text-xs text-muted-foreground">
                    ✅ Only re-renders when prop actually changes
                </p>
                <CodeViewer code={MEMOIZED_CHILD_CODE} title="View Child Implementation" />
            </CardContent>
        </Card>
    );
}

const PARENT_CODE = `// Parent component that demonstrates the difference
function ComparisonDemo() {
    const [childValue, setChildValue] = useState(10);
    const [parentState, setParentState] = useState(0);
    
    return (
        <Card>
            {/* ... UI components ... */}
            <Button onClick={() => setChildValue(childValue + 1)}>
                Update Child Prop
            </Button>
            <Button onClick={() => setParentState(parentState + 1)}>
                Update Parent State (Unrelated)
            </Button>

            <div className="grid md:grid-cols-2 gap-4">
                <RegularChild value={childValue} />
                <MemoizedChild value={childValue} />
            </div>
        </Card>
    );
}`;

// Parent component that demonstrates the difference
function ComparisonDemo() {
    const [childValue, setChildValue] = useState(10);
    const [parentState, setParentState] = useState(0);
    const parentRenderCount = useRef(0);
    const regularChildRenders = useRef(0);
    const memoizedChildRenders = useRef(0);

    parentRenderCount.current += 1;

    return (
        <Card>
            <CardHeader>
                <CardTitle>Interactive Comparison</CardTitle>
                <CardDescription>Parent component that renders both child types</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="bg-muted p-4 rounded">
                    <RenderCounter label="Parent render count" count={parentRenderCount.current} />
                </div>

                <div className="space-y-2">
                    <Button onClick={() => setChildValue(childValue + 1)} className="w-full">
                        Update Child Prop: {childValue}
                    </Button>
                    <Button onClick={() => setParentState(parentState + 1)} variant="outline" className="w-full">
                        Update Parent State (Unrelated): {parentState}
                    </Button>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                    <RegularChild value={childValue} renderCount={regularChildRenders} />
                    <MemoizedChild value={childValue} renderCount={memoizedChildRenders} />
                </div>

                <div className="bg-yellow-50 dark:bg-yellow-950 p-4 rounded-lg">
                    <p className="font-semibold mb-2">🧪 Try This:</p>
                    <p className="text-sm text-muted-foreground">
                        Click "Update Parent State (Unrelated)" and watch what happens:
                    </p>
                    <ul className="list-disc list-inside text-sm text-muted-foreground mt-2 space-y-1">
                        <li>Regular Child: render count increases even though its prop didn't change</li>
                        <li>Memoized Child: render count stays the same! The prop hasn't changed, so no re-render</li>
                    </ul>
                </div>

                <CodeViewer code={PARENT_CODE} title="View Parent Implementation" />
            </CardContent>
        </Card>
    );
}

export default function ReactMemoDemo() {
    return (
        <div className="space-y-6 max-w-6xl mx-auto">
            <div>
                <h1 className="text-3xl font-bold">React.memo</h1>
                <p className="text-muted-foreground mt-2">
                    Prevent component re-renders when props haven't changed
                </p>
            </div>

            <ComparisonDemo />

            <div className="grid md:grid-cols-2 gap-4">
                <Card className="border-red-200">
                    <CardHeader>
                        <CardTitle className="text-lg">❌ Without React.memo</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <pre className="bg-muted p-4 rounded text-xs overflow-x-auto">
                            {`// Regular component
function ExpensiveChild({ value }) {
    console.log("ExpensiveChild rendered");

    // Imagine expensive rendering logic here
    return <div>{value}</div>;
}

function Parent() {
    const [count, setCount] = useState(0);
    const [other, setOther] = useState(0);

    return (
        <>
            {/* Re-renders every time Parent does */}
            <ExpensiveChild value={count} />

            {/* This triggers ExpensiveChild re-render */}
            <button onClick={() => setOther(other + 1)}>
                Update Other
            </button>
        </>
    );
} `}
                        </pre>
                        <div className="mt-3 text-sm space-y-2">
                            <p className="font-semibold">Why it's a problem:</p>
                            <ul className="list-disc list-inside space-y-1 text-muted-foreground text-xs">
                                <li>Child re-renders when parent re-renders</li>
                                <li>Even if child's props haven't changed</li>
                                <li>Wastes time re-rendering identical output</li>
                                <li>Can cause performance issues with expensive children</li>
                            </ul>
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-green-200">
                    <CardHeader>
                        <CardTitle className="text-lg">✅ With React.memo</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <pre className="bg-muted p-4 rounded text-xs overflow-x-auto">
                            {`// Memoized component
const ExpensiveChild = memo(({ value }) => {
    console.log("ExpensiveChild rendered");

    // Expensive rendering logic
    return <div>{value}</div>;
});

function Parent() {
    const [count, setCount] = useState(0);
    const [other, setOther] = useState(0);

    return (
        <>
            {/* Only re-renders when 'value' changes */}
            <ExpensiveChild value={count} />

            {/* This does NOT trigger ExpensiveChild */}
            <button onClick={() => setOther(other + 1)}>
                Update Other
            </button>
        </>
    );
} `}
                        </pre>
                        <div className="mt-3 text-sm space-y-2">
                            <p className="font-semibold">Why it works:</p>
                            <ul className="list-disc list-inside space-y-1 text-muted-foreground text-xs">
                                <li>React.memo does shallow props comparison</li>
                                <li>If props haven't changed, skip re-render</li>
                                <li>Reuses previous render result</li>
                                <li>Significant savings for expensive components ✨</li>
                            </ul>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Advanced: Custom Comparison Function</CardTitle>
                </CardHeader>
                <CardContent>
                    <pre className="bg-muted p-4 rounded text-xs overflow-x-auto">
                        {`// React.memo with custom comparison
const MyComponent = memo(
    ({ user, onClick }) => {
        return <div onClick={onClick}>{user.name}</div>;
    },
    // Custom comparison function (optional)
    (prevProps, nextProps) => {
        // Return true if props are equal (skip render)
        // Return false if props are different (do render)
        return prevProps.user.id === nextProps.user.id;
    }
);

// This allows you to do deep comparisons or
// compare only specific fields you care about`}
                    </pre >
                    <p className="text-sm text-muted-foreground mt-3">
                        By default, React.memo does shallow comparison. You can provide a custom comparison function
                        for more control over when re-renders should happen.
                    </p>
                </CardContent >
            </Card >

            <Card>
                <CardHeader>
                    <CardTitle>When to Use React.memo</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="bg-green-50 dark:bg-green-950 p-4 rounded-lg">
                        <p className="font-semibold mb-2">✅ Good Use Cases:</p>
                        <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                            <li>Components that render frequently with the same props</li>
                            <li>Expensive components (complex rendering, many children)</li>
                            <li>Large lists where items should only update individually</li>
                            <li>Pure functional components that don't depend on context</li>
                        </ul>
                    </div>

                    <div className="bg-red-50 dark:bg-red-950 p-4 rounded-lg">
                        <p className="font-semibold mb-2">❌ When NOT to Use:</p>
                        <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                            <li>Components that always render with different props</li>
                            <li>Simple, fast-rendering components</li>
                            <li>When props include functions/objects that change on every render (use useCallback/useMemo)</li>
                            <li>Premature optimization before profiling</li>
                        </ul>
                    </div>

                    <div className="bg-orange-50 dark:bg-orange-950 p-4 rounded-lg">
                        <p className="font-semibold mb-2">⚠️ Common Pitfall:</p>
                        <p className="text-sm text-muted-foreground mb-2">
                            React.memo won't help if you pass new object/array/function references on every render:
                        </p>
                        <pre className="bg-muted p-3 rounded text-xs overflow-x-auto mt-2">
                            {`// ❌ BAD - memo won't help here
const MemoChild = memo(({ onClick }) => /*...*/);

function Parent() {
  return (
    // New function created every render!
    <MemoChild onClick={() => console.log("hi")} />
  );
}

// ✅ GOOD - combine with useCallback
const MemoChild = memo(({ onClick }) => /*...*/);

function Parent() {
  const handleClick = useCallback(
    () => console.log("hi"),
    []
  );
  return <MemoChild onClick={handleClick} />;
}`}
                        </pre>
                    </div>

                    <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg">
                        <p className="font-semibold mb-2">💡 Key Takeaway:</p>
                        <p className="text-sm text-muted-foreground">
                            React.memo is a <strong>higher-order component</strong> that wraps your component.
                            It's different from useMemo (memoizes values) and useCallback (memoizes functions).
                            Use all three together for maximum optimization of expensive components.
                        </p>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>🧠 JavaScript Execution Context Phases</CardTitle>
                    <CardDescription>How React.memo prevents unnecessary re-renders</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-lg border-l-4 border-blue-500">
                        <p className="font-semibold mb-2">📦 Phase 1: Creation Phase (Parent Renders)</p>
                        <p className="text-sm text-muted-foreground mb-2">
                            When the parent component re-renders:
                        </p>
                        <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                            <li>Parent's execution context is created</li>
                            <li>Parent's JSX includes <code className="bg-muted px-1 rounded">{`<MemoizedChild value={...} />`}</code></li>
                            <li>React sees it's a memoized component</li>
                            <li>Previous props are retrieved from cache</li>
                        </ul>
                    </div>

                    <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-lg border-l-4 border-green-500">
                        <p className="font-semibold mb-2">⚡ Phase 2: Execution Phase (Shallow Comparison)</p>
                        <p className="text-sm text-muted-foreground mb-2">
                            React performs a shallow comparison of props:
                        </p>
                        <pre className="bg-muted p-3 rounded text-xs overflow-x-auto mb-2">
                            {`// React internally does something like:
function shallowEqual(prevProps, nextProps) {
    const prevKeys = Object.keys(prevProps);
    const nextKeys = Object.keys(nextProps);
    
    if (prevKeys.length !== nextKeys.length) return false;
    
    for (let key of prevKeys) {
        // Uses === comparison (reference equality!)
        if (prevProps[key] !== nextProps[key]) {
            return false;  // Props are different
        }
    }
    return true;  // Props are the same
}`}
                        </pre>
                    </div>

                    <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-lg border-l-4 border-purple-500">
                        <p className="font-semibold mb-2">🔄 Render Decision Flow</p>
                        <div className="text-sm text-muted-foreground space-y-2">
                            <div className="flex items-center gap-2">
                                <span className="font-mono">1.</span> Parent re-renders
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="font-mono">2.</span> React checks: Are props === previous props?
                            </div>
                            <div className="grid md:grid-cols-2 gap-4 mt-2">
                                <div className="bg-green-50 dark:bg-green-900/30 p-3 rounded">
                                    <p className="font-semibold mb-1">✅ YES (same references):</p>
                                    <p className="text-xs">
                                        Child's function is <strong>NOT called</strong><br />
                                        No new execution context created<br />
                                        Previous render result reused<br />
                                        <span className="text-green-600 dark:text-green-400">= Performance saved!</span>
                                    </p>
                                </div>
                                <div className="bg-red-50 dark:bg-red-900/30 p-3 rounded">
                                    <p className="font-semibold mb-1">❌ NO (different references):</p>
                                    <p className="text-xs">
                                        Child's function <strong>IS called</strong><br />
                                        New execution context created<br />
                                        Full re-render occurs<br />
                                        <span className="text-red-600 dark:text-red-400">= Normal render</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-orange-50 dark:bg-orange-950 p-4 rounded-lg">
                        <p className="font-semibold mb-2">⚠️ Why useCallback Matters</p>
                        <p className="text-sm text-muted-foreground">
                            Remember: <code className="bg-muted px-1 rounded">===</code> compares memory addresses!
                            A new function object has a different address even if the code is identical.
                            That's why <strong>useCallback + React.memo</strong> must work together.
                        </p>
                    </div>
                </CardContent>
            </Card>
        </div >
    );
}

