import { useRef } from "react";
import { motion } from "framer-motion";
import { useCV } from "@/core/components/cv-generator/cv-context";
import { ModernTemplate } from "@/core/components/cv-generator/templates/modern-template";
import { ProfessionalTemplate } from "@/core/components/cv-generator/templates/professional-template";
import { CreativeTemplate } from "@/core/components/cv-generator/templates/creative-template";
import { MinimalTemplate } from "@/core/components/cv-generator/templates/minimal-template";
import { ExecutiveTemplate } from "@/core/components/cv-generator/templates/executive-template";

export function CVPreview() {
  const { template, getFontSizeClass } = useCV();
  const cvPreviewRef = useRef(null);

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
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="sticky top-24"
    >
      <div className="rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
        <h2 className="mb-4 text-xl font-semibold">CV Preview</h2>

        <div
          ref={cvPreviewRef}
          className={`bg-white ${getFontSizeClass()} overflow-hidden rounded-lg shadow-xl`}
        >
          {renderTemplate()}
        </div>
      </div>
    </motion.div>
  );
}
