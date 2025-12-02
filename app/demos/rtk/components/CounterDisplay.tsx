"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useSelector } from "react-redux";
import { RootState } from "../store";

export function CounterDisplay() {
  const count = useSelector((state: RootState) => state.count);
  const isLoading = useSelector((state: RootState) => state.isLoading);

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

