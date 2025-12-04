"use client";

import React, { useState, useCallback, useRef, memo } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CodeViewer } from "@/components/ui/code-viewer";

// Render counter component
function RenderCounter({ label, count }: { label: string; count: number }) {
    return (
        <div className="text-sm text-muted-foreground mb-2">
            {label}: <span className="font-mono font-bold text-primary">{count}</span>
        </div>
    );
}

const CHILD_WITHOUT_MEMO_CODE = `// WITHOUT useCallback - child component (not memoized)
function ChildWithoutMemo({ onClick, renderCount }: { onClick: () => void; renderCount: React.MutableRefObject<number> }) {
    renderCount.current += 1;

    return (
        <Card className="border-red-200">
            {/* ... UI components ... */}
            <RenderCounter label="Renders" count={renderCount.current} />
            <Button onClick={onClick} size="sm">Trigger Callback</Button>
        </Card>
    );
}`;

// WITHOUT useCallback - child component (not memoized)
function ChildWithoutMemo({ onClick, renderCount }: { onClick: () => void; renderCount: React.MutableRefObject<number> }) {
    renderCount.current += 1;

    return (
        <Card className="border-red-200">
            <CardHeader>
                <CardTitle className="text-base">Child (No Optimization)</CardTitle>
            </CardHeader>
            <CardContent>
                <RenderCounter label="Renders" count={renderCount.current} />
                <Button onClick={onClick} size="sm">Trigger Callback</Button>
                <p className="text-xs text-muted-foreground mt-2">
                    🔴 Re-renders every time parent updates, even unrelated state changes
                </p>
                <CodeViewer code={CHILD_WITHOUT_MEMO_CODE} title="View Child Implementation" />
            </CardContent>
        </Card>
    );
}

const CHILD_WITH_MEMO_CODE = `// WITH useCallback - child component (memoized)
const ChildWithMemo = memo(({ onClick, renderCount }: { onClick: () => void; renderCount: React.MutableRefObject<number> }) => {
    renderCount.current += 1;

    return (
        <Card className="border-green-200">
            {/* ... UI components ... */}
            <RenderCounter label="Renders" count={renderCount.current} />
            <Button onClick={onClick} size="sm" variant="secondary">Trigger Callback</Button>
        </Card>
    );
});`;

// WITH useCallback - child component (memoized)
const ChildWithMemo = memo(({ onClick, renderCount }: { onClick: () => void; renderCount: React.MutableRefObject<number> }) => {
    renderCount.current += 1;

    return (
        <Card className="border-green-200">
            <CardHeader>
                <CardTitle className="text-base">Child (With React.memo + useCallback)</CardTitle>
            </CardHeader>
            <CardContent>
                <RenderCounter label="Renders" count={renderCount.current} />
                <Button onClick={onClick} size="sm" variant="secondary">Trigger Callback</Button>
                <p className="text-xs text-muted-foreground mt-2">
                    ✅ Only re-renders when callback actually changes (which it won't!)
                </p>
                <CodeViewer code={CHILD_WITH_MEMO_CODE} title="View Child Implementation" />
            </CardContent>
        </Card>
    );
});

ChildWithMemo.displayName = "ChildWithMemo";

const PARENT_CODE = `export default function UseCallbackDemo() {
    const [count, setCount] = useState(0);
    const [otherState, setOtherState] = useState(0);

    // WITHOUT useCallback - new function created on every render
    const handleClickWithout = () => {
        console.log("Without useCallback - clicked!");
    };

    // WITH useCallback - function reference stays the same
    const handleClickWith = useCallback(() => {
        console.log("With useCallback - clicked!");
    }, []); // Empty dependency array means this never changes

    return (
        <div className="space-y-6 max-w-6xl mx-auto">
            {/* ... UI components ... */}
            <Button onClick={() => setCount(count + 1)}>Increment Count</Button>
            <Button onClick={() => setOtherState(otherState + 1)}>Update Other State</Button>

            <ChildWithoutMemo onClick={handleClickWithout} />
            <ChildWithMemo onClick={handleClickWith} />
        </div>
    );
}`;
export default function UseCallbackDemo() {
    const [count, setCount] = useState(0);
    const [otherState, setOtherState] = useState(0);

    const childWithoutMemoRenders = useRef(0);
    const childWithMemoRenders = useRef(0);

    // WITHOUT useCallback - new function created on every render
    const handleClickWithout = () => {
        console.log("Without useCallback - clicked!");
    };

    // WITH useCallback - function reference stays the same
    const handleClickWith = useCallback(() => {
        console.log("With useCallback - clicked!");
    }, []); // Empty dependency array means this never changes

    return (
        <div className="space-y-6 max-w-6xl mx-auto">
            <div>
                <h1 className="text-3xl font-bold">useCallback Hook</h1>
                <p className="text-muted-foreground mt-2">
                    Memoize callback functions to maintain stable references across renders
                </p>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Interactive Comparison</CardTitle>
                    <CardDescription>
                        Notice how the child without optimization re-renders on any state change
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex gap-4">
                        <Button onClick={() => setCount(count + 1)}>
                            Increment Count: {count}
                        </Button>
                        <Button onClick={() => setOtherState(otherState + 1)} variant="outline">
                            Update Other State: {otherState}
                        </Button>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                        <ChildWithoutMemo onClick={handleClickWithout} renderCount={childWithoutMemoRenders} />
                        <ChildWithMemo onClick={handleClickWith} renderCount={childWithMemoRenders} />
                    </div>

                    <div className="bg-yellow-50 dark:bg-yellow-950 p-4 rounded-lg">
                        <p className="font-semibold mb-2">🧪 Try This:</p>
                        <p className="text-sm text-muted-foreground">
                            Click "Update Other State" and watch the render counters. The left child (without useCallback)
                            re-renders even though its props haven't meaningfully changed. The right child (with useCallback
                            and React.memo) stays the same!
                        </p>
                    </div>

                    <CodeViewer code={PARENT_CODE} title="View Parent Implementation" />
                </CardContent>
            </Card>

            <div className="grid md:grid-cols-2 gap-4">
                <Card className="border-red-200">
                    <CardHeader>
                        <CardTitle className="text-lg">❌ Without useCallback</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <pre className="bg-muted p-4 rounded text-xs overflow-x-auto">
                            {`function Parent() {
    const [count, setCount] = useState(0);

    // New function created on EVERY render
    const handleClick = () => {
        console.log("Clicked!");
    };

    return (
        <MemoizedChild onClick={handleClick} />
    );
}

// Even with React.memo, this still re-renders
// because onClick is a new function reference
const MemoizedChild = memo(({ onClick }) => {
    return <button onClick={onClick}>Click</button>;
}); `}
                        </pre>
                        <div className="mt-3 text-sm space-y-2">
                            <p className="font-semibold">Why it's a problem:</p>
                            <ul className="list-disc list-inside space-y-1 text-muted-foreground text-xs">
                                <li>Function recreated on every Parent render</li>
                                <li>MemoizedChild receives "new" onClick prop</li>
                                <li>React.memo's shallow comparison fails</li>
                                <li>Child re-renders unnecessarily</li>
                            </ul>
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-green-200">
                    <CardHeader>
                        <CardTitle className="text-lg">✅ With useCallback</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <pre className="bg-muted p-4 rounded text-xs overflow-x-auto">
                            {`function Parent() {
    const [count, setCount] = useState(0);

    // Function reference stays the same
    const handleClick = useCallback(() => {
        console.log("Clicked!");
    }, []); // Dependencies array

    return (
        <MemoizedChild onClick={handleClick} />
    );
}

// Now React.memo works as expected!
const MemoizedChild = memo(({ onClick }) => {
    return <button onClick={onClick}>Click</button>;
}); `}
                        </pre>
                        <div className="mt-3 text-sm space-y-2">
                            <p className="font-semibold">Why it works:</p>
                            <ul className="list-disc list-inside space-y-1 text-muted-foreground text-xs">
                                <li>useCallback returns same function reference</li>
                                <li>MemoizedChild receives same onClick prop</li>
                                <li>React.memo's comparison succeeds</li>
                                <li>Child doesn't re-render! ✨</li>
                            </ul>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>When to Use useCallback</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="bg-green-50 dark:bg-green-950 p-4 rounded-lg">
                        <p className="font-semibold mb-2">✅ Good Use Cases:</p>
                        <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                            <li>Passing callbacks to memoized child components (React.memo)</li>
                            <li>Callbacks used as dependencies in other hooks (useEffect, useMemo)</li>
                            <li>Callbacks passed to expensive child components</li>
                            <li>Preventing unnecessary effect executions</li>
                        </ul>
                    </div>

                    <div className="bg-red-50 dark:bg-red-950 p-4 rounded-lg">
                        <p className="font-semibold mb-2">❌ When NOT to Use:</p>
                        <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                            <li>Callbacks passed to regular (non-memoized) components</li>
                            <li>Simple event handlers that aren't dependencies</li>
                            <li>When the function is only used in the same component</li>
                            <li>Premature optimization without measuring performance</li>
                        </ul>
                    </div>

                    <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg">
                        <p className="font-semibold mb-2">💡 Key Takeaway:</p>
                        <p className="text-sm text-muted-foreground">
                            useCallback is <strong>only useful with React.memo</strong>. Without memoized child components,
                            it just adds overhead without benefit. Always combine useCallback with React.memo for the child
                            component you're passing the callback to.
                        </p>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>🧠 JavaScript Execution Context Phases</CardTitle>
                    <CardDescription>How useCallback preserves function references across renders</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-lg border-l-4 border-blue-500">
                        <p className="font-semibold mb-2">📦 Phase 1: Creation Phase</p>
                        <p className="text-sm text-muted-foreground mb-2">
                            When React calls your component, the JavaScript engine sets up the execution context:
                        </p>
                        <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                            <li>Memory allocated for state variables and refs</li>
                            <li>React's hooks registry is accessed</li>
                            <li><code className="bg-muted px-1 rounded">useCallback</code> hook slot is identified</li>
                            <li>Previous cached function reference is retrieved (if exists)</li>
                        </ul>
                    </div>

                    <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-lg border-l-4 border-green-500">
                        <p className="font-semibold mb-2">⚡ Phase 2: Execution Phase</p>
                        <p className="text-sm text-muted-foreground mb-2">
                            React compares dependencies and decides what to return:
                        </p>
                        <pre className="bg-muted p-3 rounded text-xs overflow-x-auto mb-2">
                            {`// React internally does something like this:
const handleClick = useCallback(() => {
    console.log("clicked");
}, []);

// Internally:
if (dependenciesHaveNotChanged) {
    return cachedFunctionFromPreviousRender;  // Same memory address!
} else {
    const newFunction = () => { console.log("clicked"); };
    cache.set(hookIndex, newFunction);
    return newFunction;  // New memory address
}`}
                        </pre>
                    </div>

                    <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-lg border-l-4 border-purple-500">
                        <p className="font-semibold mb-2">🔄 Memory Reference Comparison</p>
                        <div className="grid md:grid-cols-2 gap-4 text-sm">
                            <div className="bg-red-50 dark:bg-red-900/30 p-3 rounded">
                                <p className="font-semibold mb-1">❌ Without useCallback:</p>
                                <p className="text-muted-foreground text-xs">
                                    Render 1: <code className="bg-muted px-1 rounded">0x001</code><br />
                                    Render 2: <code className="bg-muted px-1 rounded">0x002</code> (NEW)<br />
                                    Render 3: <code className="bg-muted px-1 rounded">0x003</code> (NEW)
                                </p>
                            </div>
                            <div className="bg-green-50 dark:bg-green-900/30 p-3 rounded">
                                <p className="font-semibold mb-1">✅ With useCallback:</p>
                                <p className="text-muted-foreground text-xs">
                                    Render 1: <code className="bg-muted px-1 rounded">0x001</code><br />
                                    Render 2: <code className="bg-muted px-1 rounded">0x001</code> (SAME!)<br />
                                    Render 3: <code className="bg-muted px-1 rounded">0x001</code> (SAME!)
                                </p>
                            </div>
                        </div>
                        <p className="text-sm text-muted-foreground mt-3">
                            Same memory address = React.memo sees no change = child skips re-render!
                        </p>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
