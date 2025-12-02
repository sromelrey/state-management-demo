"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useDispatch, useSelector } from "react-redux";
import { increment, decrement, reset, incrementAsync, RootState } from "../store";

export function CounterControls() {
  // useDispatch to get the dispatch function
  const dispatch = useDispatch();
  const isLoading = useSelector((state: RootState) => state.isLoading);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Controls</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="grid grid-cols-2 gap-2">
          <Button onClick={() => dispatch(increment())} disabled={isLoading}>
            Increment
          </Button>
          <Button onClick={() => dispatch(decrement())} disabled={isLoading}>
            Decrement
          </Button>
        </div>
        <Button onClick={() => dispatch(reset())} variant="outline" className="w-full" disabled={isLoading}>
          Reset
        </Button>
        <Button onClick={() => dispatch(incrementAsync() as any)} variant="secondary" className="w-full" disabled={isLoading}>
          Increment Async (1s)
        </Button>
      </CardContent>
    </Card>
  );
}

