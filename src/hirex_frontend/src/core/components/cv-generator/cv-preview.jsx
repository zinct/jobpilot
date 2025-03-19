"use client";

import { useRef, forwardRef, useImperativeHandle } from "react";
import { motion } from "framer-motion";
import { useCV } from "./cv-context";
import { ModernTemplate } from "./templates/modern-template";
import { ProfessionalTemplate } from "./templates/professional-template";
import { CreativeTemplate } from "./templates/creative-template";
import { MinimalTemplate } from "./templates/minimal-template";
import { ExecutiveTemplate } from "./templates/executive-template";

export const CVPreview = forwardRef(function CVPreview(props, ref) {
  const { template, getFontSizeClass } = useCV();
  const cvPreviewRef = useRef(null);
  const templateContainerRef = useRef(null);

  // Expose the internal ref to parent components
  useImperativeHandle(ref, () => ({
    getPreviewElement: () => templateContainerRef.current,
    prepareForPDF: () => {
      // Return a clone of just the template content for PDF generation
      if (templateContainerRef.current) {
        const clone = templateContainerRef.current.cloneNode(true);

        // Remove any border radius, margins, or other styling that might cause issues
        // clone.style.borderRadius = "0";
        // clone.style.overflow = "visible";
        // clone.style.margin = "0";
        // clone.style.padding = "0";
        // clone.style.boxShadow = "none";
        // clone.style.height = "auto";
        // clone.style.width = "100%";
        // clone.style.position = "relative";
        clone.classList.add("pdf-for-export");

        // Remove any top margins from all child elements
        // const allElements = clone.querySelectorAll("*");
        // allElements.forEach((el) => {
        //   const style = window.getComputedStyle(el);
        //   if (Number.parseInt(style.marginTop) > 0) {
        //     el.style.marginTop = "0";
        //   }
        //   if (Number.parseInt(style.paddingTop) > 0 && el.tagName !== "BODY" && el.tagName !== "HTML") {
        //     el.style.paddingTop = "0";
        //   }
        // });

        // Ensure first child has no top margin
        // if (clone.firstElementChild) {
        //   clone.firstElementChild.style.marginTop = "0";
        //   clone.firstElementChild.style.paddingTop = "0";
        // }

        return clone;
      }
      return null;
    },
  }));

  const renderTemplate = () => {
    switch (template) {
      case "modern":
        return <ModernTemplate />;
      case "professional":
        return <ProfessionalTemplate />;
      case "creative":
        return <CreativeTemplate />;
      case "minimal":
        return <MinimalTemplate />;
      case "executive":
        return <ExecutiveTemplate />;
      default:
        return <ModernTemplate />;
    }
  };

  return (
    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }} className="sticky top-24" ref={cvPreviewRef}>
      <div className="rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
        <h2 className="mb-4 text-xl font-semibold">CV Preview</h2>

        <div className={`bg-white ${getFontSizeClass()} overflow-hidden rounded-lg shadow-xl pdf-content`}>
          <div ref={templateContainerRef}>{renderTemplate()}</div>
        </div>
      </div>
    </motion.div>
  );
});
