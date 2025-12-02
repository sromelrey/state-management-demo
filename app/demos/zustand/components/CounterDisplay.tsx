"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useCounterStore } from "../store";

export function CounterDisplay() {
  // Using selector to only subscribe to count and isLoading
  const count = useCounterStore((state) => state.count);
  const isLoading = useCounterStore((state) => state.isLoading);

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
      </CardContent>
    </Card>
  );
}

