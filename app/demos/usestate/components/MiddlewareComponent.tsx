"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AdditionalDisplay } from "./AdditionalDisplay";

interface MiddlewareComponentProps {
  count: number;
}

// This component doesn't use count itself, but must pass it down
// This demonstrates "props drilling" - passing props through components that don't need them
export function MiddlewareComponent({ count }: MiddlewareComponentProps) {
  return (
    <div className="space-y-4">
      <Card className="border-orange-200 dark:border-orange-800">
        <CardHeader>
          <CardTitle className="text-orange-600 dark:text-orange-400">Middleware Component</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            ⚠️ This component doesn't need the count, but must receive it as a prop 
            just to pass it down to children. This is the "props drilling" problem!
          </p>
        </CardContent>
      </Card>
      <AdditionalDisplay count={count} />
    </div>
  );
}

