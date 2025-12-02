"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useMachine } from "@xstate/react";
import { counterMachine } from "../counterMachine";

interface CounterDisplayProps {
  state: ReturnType<typeof useMachine<typeof counterMachine>>[0];
}

export function CounterDisplay({ state }: CounterDisplayProps) {
  const count = state.context.count;
  const isLoading = state.matches("incrementing");

  return (
    <Card>
      <CardHeader>
        <CardTitle>Current Count</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-6xl font-bold text-center">{count}</div>
        {isLoading && (
          <p className="text-center text-muted-foreground mt-2">Loading...</p>
        )}
        <p className="text-xs text-center text-muted-foreground mt-2">
          State: <span className="font-mono font-semibold">{String(state.value)}</span>
        </p>
      </CardContent>
    </Card>
  );
}

