"use client";

import { useState } from "react";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { ResumePDF } from "./resume-pdf";
import { Button } from "@/core/components/ui/button";
import { Download } from "lucide-react";

export function PDFDownloadButton({ cvData, template, colorScheme }) {
  const [isGenerating, setIsGenerating] = useState(false);
  const fileName = `${cvData.personalInfo.name.replace(/\s+/g, "_")}_Resume.pdf`;

  // Fallback download function in case the PDFDownloadLink fails
  const handleManualDownload = async () => {
    try {
      setIsGenerating(true);

      // Import the libraries dynamically to reduce initial load time
      const { pdf } = await import("@react-pdf/renderer");
      const { saveAs } = await import("file-saver");

      // Create the PDF document
      const blob = await pdf(<ResumePDF cvData={cvData} template={template} colorScheme={colorScheme} />).toBlob();

      // Save the PDF
      saveAs(blob, fileName);
    } catch (error) {
      console.error("Error generating PDF:", error);
      alert("There was an error generating your PDF. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div>
      {isGenerating ? (
        <Button disabled className="w-full">
          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Generating PDF...
        </Button>
      ) : (
        <PDFDownloadLink document={<ResumePDF cvData={cvData} template={template} colorScheme={colorScheme} />} fileName={fileName} className="w-full">
          {({ loading, error }) =>
            loading || error ? (
              <Button onClick={handleManualDownload} className="w-full">
                <Download className="mr-2 h-4 w-4" />
                Download Resume
              </Button>
            ) : (
              <Button className="w-full">
                <Download className="mr-2 h-4 w-4" />
                Download Resume
              </Button>
            )
          }
        </PDFDownloadLink>
      )}
    </div>
  );
}
