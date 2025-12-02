"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface CounterControlsProps {
  onIncrement: () => void;
  onDecrement: () => void;
  onReset: () => void;
  onIncrementAsync: () => void;
  isLoading: boolean;
}

export function CounterControls({
  onIncrement,
  onDecrement,
  onReset,
  onIncrementAsync,
  isLoading,
}: CounterControlsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Controls</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="grid grid-cols-2 gap-2">
          <Button onClick={onIncrement} disabled={isLoading}>
            Increment
          </Button>
          <Button onClick={onDecrement} disabled={isLoading}>
            Decrement
          </Button>
        </div>
        <Button onClick={onReset} variant="outline" className="w-full" disabled={isLoading}>
          Reset
        </Button>
        <Button onClick={onIncrementAsync} variant="secondary" className="w-full" disabled={isLoading}>
          Increment Async (1s)
        </Button>
      </CardContent>
    </Card>
  );
}

