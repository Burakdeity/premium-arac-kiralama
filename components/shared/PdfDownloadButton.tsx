"use client";

import { Download } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface PdfDownloadButtonProps {
  reservationNumber: string;
  label?: string;
}

export function PdfDownloadButton({
  reservationNumber,
  label = "PDF İndir",
}: PdfDownloadButtonProps) {
  const apiUrl =
    process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/v1";
  const pdfUrl = `${apiUrl}/reservations/${reservationNumber}/pdf`;

  return (
    <a href={pdfUrl} target="_blank" rel="noopener noreferrer">
      <Button variant="outline" className="gap-2">
        <Download className="h-4 w-4" />
        {label}
      </Button>
    </a>
  );
}
