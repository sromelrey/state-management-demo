"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useMachine } from "@xstate/react";
import { counterMachine } from "../counterMachine";

interface AdditionalDisplayProps {
  state: ReturnType<typeof useMachine<typeof counterMachine>>[0];
}

export function AdditionalDisplay({ state }: AdditionalDisplayProps) {
  const count = state.context.count;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Another Component Reading State</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">
          This component also reads from the same XState machine. Current count: <span className="font-bold text-foreground">{count}</span>
        </p>
        <p className="text-sm text-muted-foreground mt-2">
          XState uses state machines - notice the current state is shown: <span className="font-mono font-semibold">{String(state.value)}</span>
        </p>
      </CardContent>
    </Card>
  );
}

