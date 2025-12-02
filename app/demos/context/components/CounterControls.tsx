"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useCounter } from "../CounterContext";

export function CounterControls() {
  const { increment, decrement, reset, incrementAsync, state } = useCounter();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Controls</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="grid grid-cols-2 gap-2">
          <Button onClick={increment} disabled={state.isLoading}>
            Increment
          </Button>
          <Button onClick={decrement} disabled={state.isLoading}>
            Decrement
          </Button>
        </div>
        <Button onClick={reset} variant="outline" className="w-full" disabled={state.isLoading}>
          Reset
        </Button>
        <Button onClick={incrementAsync} variant="secondary" className="w-full" disabled={state.isLoading}>
          Increment Async (1s)
        </Button>
      </CardContent>
    </Card>
  );
}

