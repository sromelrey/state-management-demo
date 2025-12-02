"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useSelector } from "react-redux";
import { RootState } from "../store";

export function AdditionalDisplay() {
  const count = useSelector((state: RootState) => state.count);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Another Component Reading State</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">
          This component also reads from the same Redux Toolkit store. Current count: <span className="font-bold text-foreground">{count}</span>
        </p>
        <p className="text-sm text-muted-foreground mt-2">
          RTK simplifies Redux while keeping all the power and dev tools!
        </p>
      </CardContent>
    </Card>
  );
}

