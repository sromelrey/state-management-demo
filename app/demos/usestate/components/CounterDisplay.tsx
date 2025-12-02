"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface CounterDisplayProps {
  count: number;
  isLoading: boolean;
}

export function CounterDisplay({ count, isLoading }: CounterDisplayProps) {
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

