"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useCounter } from "../CounterContext";

export function CounterDisplay() {
  const { state } = useCounter();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Current Count</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-6xl font-bold text-center">{state.count}</div>
        {state.isLoading && (
          <p className="text-center text-muted-foreground mt-2">Loading...</p>
        )}
      </CardContent>
    </Card>
  );
}

