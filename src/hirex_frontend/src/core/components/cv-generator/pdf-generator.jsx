"use client";

import { useState } from "react";
import { toPng } from "html-to-image";
import { jsPDF } from "jspdf";
import { Loader2 } from "lucide-react";
import { Button } from "@/core/components/ui/button";

export function generatePDF(elementRef, fileName = "resume.pdf", callback) {
  return new Promise(async (resolve, reject) => {
    if (!elementRef.current) {
      reject(new Error("Element reference is not available"));
      return;
    }

    try {
      // Capture the CV preview as an image
      const dataUrl = await toPng(elementRef.current, {
        quality: 1.0,
        pixelRatio: 2,
        backgroundColor: "white",
      });

      // Create a new PDF document
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      // Get dimensions
      const imgProps = pdf.getImageProperties(dataUrl);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

      // Add the image to the PDF
      pdf.addImage(dataUrl, "PNG", 0, 0, pdfWidth, pdfHeight);

      // Save the PDF
      pdf.save(fileName);

      if (callback) callback();
      resolve();
    } catch (error) {
      console.error("Error generating PDF:", error);
      reject(error);
    }
  });
}

export function PDFDownloadButton({ elementRef, fileName, onDownloadStart, onDownloadComplete }) {
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = async () => {
    try {
      setIsDownloading(true);
      if (onDownloadStart) onDownloadStart();

      await generatePDF(elementRef, fileName, () => {
        if (onDownloadComplete) onDownloadComplete();
      });
    } catch (error) {
      console.error("Failed to download PDF:", error);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <Button variant="outline" className="border-white/10 text-white hover:bg-white/10" onClick={handleDownload} disabled={isDownloading}>
      {isDownloading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Generating PDF...
        </>
      ) : (
        <>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 h-4 w-4">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="7 10 12 15 17 10" />
            <line x1="12" y1="15" x2="12" y2="3" />
          </svg>
          Download Resume
        </>
      )}
    </Button>
  );
}
