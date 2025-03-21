"use client";

import { motion } from "framer-motion";
import { Award, ChevronUp, ChevronDown, Plus, Trash } from "lucide-react";
import { Button } from "@/core/components/ui/button";
import { useCV } from "@/core/components/cv-generator/cv-context";

export function CertificationsSection() {
  const { cvData, addCertification, updateCertification, removeCertification, activeSection, toggleSection } = useCV();

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.6 }} className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm">
      <button className="flex w-full items-center justify-between p-4" onClick={() => toggleSection("certifications")}>
        <div className="flex items-center gap-2">
          <Award className="h-5 w-5 text-cyan-400" />
          <h3 className="text-lg font-medium">Certifications</h3>
        </div>
        {activeSection === "certifications" ? <ChevronUp className="h-5 w-5 text-gray-400" /> : <ChevronDown className="h-5 w-5 text-gray-400" />}
      </button>

      {activeSection === "certifications" && (
        <div className="border-t border-white/10 p-4">
          <div className="space-y-6">
            {cvData.certifications.map((cert, index) => (
              <div key={cert.id} className="rounded-lg border border-white/10 bg-white/5 p-4">
                <div className="mb-4 flex items-center justify-between">
                  <h4 className="text-lg font-medium">{cert.name || `Certification ${index + 1}`}</h4>
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:bg-white/10 hover:text-white" onClick={() => removeCertification(cert.id)}>
                    <Trash className="h-4 w-4" />
                  </Button>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <label className="mb-1 block text-sm font-medium text-gray-300">Certification Name</label>
                    <input type="text" value={cert.name} onChange={(e) => updateCertification(cert.id, "name", e.target.value)} className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-white placeholder-gray-500 focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400" />
                  </div>

                  <div>
                    <label className="mb-1 block text-sm font-medium text-gray-300">Issuing Organization</label>
                    <input type="text" value={cert.issuer} onChange={(e) => updateCertification(cert.id, "issuer", e.target.value)} className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-white placeholder-gray-500 focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400" />
                  </div>

                  <div>
                    <label className="mb-1 block text-sm font-medium text-gray-300">Date</label>
                    <input type="month" value={cert.date} onChange={(e) => updateCertification(cert.id, "date", e.target.value)} className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-white placeholder-gray focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400" style={{ colorScheme: "dark" }} />
                  </div>

                  <div>
                    <label className="mb-1 block text-sm font-medium text-gray-300">Credential Link</label>
                    <input type="url" value={cert.link} onChange={(e) => updateCertification(cert.id, "link", e.target.value)} className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-white placeholder-gray-500 focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400" />
                  </div>
                </div>
              </div>
            ))}

            <Button className="w-full text-gray-400 hover:bg-white/10 hover:text-white" onClick={addCertification}>
              <Plus className="mr-2 h-4 w-4" />
              Add Certification
            </Button>
          </div>
        </div>
      )}
    </motion.div>
  );
}
