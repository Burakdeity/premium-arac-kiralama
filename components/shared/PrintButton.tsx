"use client";

import { Printer } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface PrintButtonProps {
  label: string;
}

export function PrintButton({ label }: PrintButtonProps) {
  return (
    <Button variant="outline" onClick={() => window.print()}>
      <Printer className="h-5 w-5" />
      {label}
    </Button>
  );
}
