"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useCounterStore } from "../store";

export function AdditionalDisplay() {
  // This component only subscribes to count
  const count = useCounterStore((state) => state.count);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Another Component Reading State</CardTitle>
      </CardHeader>
      <CardContent>
        <p className='text-muted-foreground'>
          This component also reads from the same Zustand store. Current count:{" "}
          <span className='font-bold text-foreground'>{count}</span>
        </p>
        <p className='text-sm text-muted-foreground mt-2'>
          Notice how we don&apos;t need a Provider! Zustand works without
          wrapping components.
        </p>
      </CardContent>
    </Card>
  );
}

