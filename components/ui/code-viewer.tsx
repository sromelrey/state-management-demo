"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp, Code } from "lucide-react";

interface CodeViewerProps {
    code: string;
    title?: string;
    defaultOpen?: boolean;
}

export function CodeViewer({ code, title = "View Code", defaultOpen = false }: CodeViewerProps) {
    const [isOpen, setIsOpen] = useState(defaultOpen);

    return (
        <div className="mt-4 border rounded-lg overflow-hidden">
            <Button
                variant="ghost"
                size="sm"
                className="w-full flex justify-between items-center rounded-none bg-muted/50 hover:bg-muted"
                onClick={() => setIsOpen(!isOpen)}
            >
                <span className="flex items-center gap-2">
                    <Code className="h-4 w-4" />
                    {title}
                </span>
                {isOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </Button>

            {isOpen && (
                <div className="bg-muted p-4 overflow-x-auto">
                    <pre className="text-xs font-mono text-foreground whitespace-pre">
                        {code}
                    </pre>
                </div>
            )}
        </div>
    );
}
