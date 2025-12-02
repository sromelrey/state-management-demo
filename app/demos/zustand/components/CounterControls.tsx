"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useCounterStore } from "../store";

export function CounterControls() {
  // Select values individually to avoid infinite loops
  const increment = useCounterStore((state) => state.increment);
  const decrement = useCounterStore((state) => state.decrement);
  const reset = useCounterStore((state) => state.reset);
  const incrementAsync = useCounterStore((state) => state.incrementAsync);
  const isLoading = useCounterStore((state) => state.isLoading);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Controls</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="grid grid-cols-2 gap-2">
          <Button onClick={increment} disabled={isLoading}>
            Increment
          </Button>
          <Button onClick={decrement} disabled={isLoading}>
            Decrement
          </Button>
        </div>
        <Button onClick={reset} variant="outline" className="w-full" disabled={isLoading}>
          Reset
        </Button>
        <Button onClick={incrementAsync} variant="secondary" className="w-full" disabled={isLoading}>
          Increment Async (1s)
        </Button>
      </CardContent>
    </Card>
  );
}

