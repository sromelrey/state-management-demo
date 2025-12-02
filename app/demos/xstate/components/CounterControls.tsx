"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useMachine } from "@xstate/react";
import { counterMachine } from "../counterMachine";

interface CounterControlsProps {
  send: ReturnType<typeof useMachine<typeof counterMachine>>[1];
  state: ReturnType<typeof useMachine<typeof counterMachine>>[0];
}

export function CounterControls({ send, state }: CounterControlsProps) {
  const isLoading = state.matches("incrementing");

  return (
    <Card>
      <CardHeader>
        <CardTitle>Controls</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="grid grid-cols-2 gap-2">
          <Button onClick={() => send({ type: "INCREMENT" })} disabled={isLoading}>
            Increment
          </Button>
          <Button onClick={() => send({ type: "DECREMENT" })} disabled={isLoading}>
            Decrement
          </Button>
        </div>
        <Button onClick={() => send({ type: "RESET" })} variant="outline" className="w-full" disabled={isLoading}>
          Reset
        </Button>
        <Button onClick={() => send({ type: "INCREMENT_ASYNC" })} variant="secondary" className="w-full" disabled={isLoading}>
          Increment Async (1s)
        </Button>
      </CardContent>
    </Card>
  );
}

