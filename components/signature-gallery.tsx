"use client";

import React from "react";
import { SignatureProfile, SignatureTemplate } from "@/lib/templates/types";
import { TEMPLATES } from "@/lib/templates";
import { Check, LayoutGrid, Sparkles } from "lucide-react";

interface SignatureGalleryProps {
  profile: SignatureProfile;
  selectedTemplateId: string;
  onSelectTemplate: (templateId: string) => void;
}

export function SignatureGallery({
  profile,
  selectedTemplateId,
  onSelectTemplate,
}: SignatureGalleryProps) {
  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-xs p-4 flex flex-col h-full">
      <div className="flex items-center justify-between mb-3 pb-3 border-b border-slate-100 dark:border-slate-800">
        <div className="flex items-center gap-2">
          <LayoutGrid className="w-4 h-4 text-blue-600 dark:text-blue-400" />
          <h2 className="font-bold text-sm text-slate-900 dark:text-slate-100">
            Directorio de 10 Plantillas HTML (Anti-Spam)
          </h2>
        </div>
        <span className="text-xs text-slate-500 font-medium">
          Haz clic para seleccionar
        </span>
      </div>

      {/* Grid of Templates */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 overflow-y-auto max-h-[500px] pr-1">
        {TEMPLATES.map((tmpl) => {
          const isSelected = tmpl.id === selectedTemplateId;
          const renderedHtml = tmpl.renderHtml(profile);

          return (
            <div
              key={tmpl.id}
              onClick={() => onSelectTemplate(tmpl.id)}
              className={`relative cursor-pointer rounded-xl border p-3.5 transition-all flex flex-col justify-between group ${
                isSelected
                  ? "border-blue-600 dark:border-blue-500 bg-blue-50/40 dark:bg-blue-950/20 ring-2 ring-blue-500/20 shadow-xs"
                  : "border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-white dark:bg-slate-950 hover:shadow-xs"
              }`}
            >
              {/* Card Header */}
              <div className="flex items-start justify-between gap-2 mb-2">
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-semibold text-xs text-slate-900 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {tmpl.name}
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-medium">
                      {tmpl.category}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1 mt-0.5">
                    {tmpl.description}
                  </p>
                </div>

                {isSelected && (
                  <span className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center shrink-0">
                    <Check className="w-3 h-3" />
                  </span>
                )}
              </div>

              {/* Rendered Signature Live Miniature */}
              <div className="mt-2 p-3 bg-slate-50 dark:bg-slate-900/80 rounded-lg border border-slate-200/60 dark:border-slate-800 overflow-hidden text-slate-900 pointer-events-none transform scale-95 origin-top-left">
                <div
                  className="signature-container font-sans"
                  dangerouslySetInnerHTML={{ __html: renderedHtml }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
