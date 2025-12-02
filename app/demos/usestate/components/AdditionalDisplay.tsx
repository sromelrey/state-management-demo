"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface AdditionalDisplayProps {
  count: number;
}

export function AdditionalDisplay({ count }: AdditionalDisplayProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Another Component Reading State</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">
          This component also needs the count passed as a prop. Current count: <span className="font-bold text-foreground">{count}</span>
        </p>
        <p className="text-sm text-muted-foreground mt-2">
          With useState, every component that needs data must receive it through props. 
          This is called "props drilling" and becomes cumbersome in larger apps.
        </p>
      </CardContent>
    </Card>
  );
}

