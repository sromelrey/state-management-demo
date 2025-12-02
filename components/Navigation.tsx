"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";

const navItems = [
  { name: "Home", path: "/" },
  { name: "useState", path: "/demos/usestate" },
  { name: "Context", path: "/demos/context" },
  { name: "Zustand", path: "/demos/zustand" },
  { name: "Redux", path: "/demos/redux" },
  { name: "RTK", path: "/demos/rtk" },
  { name: "XState", path: "/demos/xstate" },
];

export function Navigation() {
  const pathname = usePathname();

  return (
    <nav className="border-b bg-background">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-xl font-bold">
            State Management Demo
          </Link>
          <div className="flex gap-2">
            {navItems.map((item) => (
              <Button
                key={item.path}
                asChild
                variant={pathname === item.path ? "default" : "ghost"}
                size="sm"
              >
                <Link href={item.path}>{item.name}</Link>
              </Button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}

