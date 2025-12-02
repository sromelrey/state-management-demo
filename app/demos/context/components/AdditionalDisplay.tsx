"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useCounter } from "../CounterContext";

export function AdditionalDisplay() {
  const { state } = useCounter();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Another Component Reading State</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">
          This component also reads from the same Context. Current count: <span className="font-bold text-foreground">{state.count}</span>
        </p>
        <p className="text-sm text-muted-foreground mt-2">
          This demonstrates how multiple components can share state using Context.
        </p>
      </CardContent>
    </Card>
  );
}

