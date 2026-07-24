"use client";

import React from "react";
import { X, ShieldCheck, Globe, Code2, Cpu } from "lucide-react";
import { Locale, translations } from "@/lib/i18n";

interface ChangelogModalProps {
  isOpen: boolean;
  onClose: () => void;
  locale?: Locale;
}

export function ChangelogModal({ isOpen, onClose, locale = "en" }: ChangelogModalProps) {
  if (!isOpen) return null;
  const t = translations[locale];

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full border border-slate-200 overflow-hidden flex flex-col max-h-[85vh] animate-in fade-in zoom-in-95 duration-150">
        {/* Modal Header */}
        <div className="p-4 border-b border-slate-100 bg-slate-50/90 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold text-xs shadow-xs">
              v1.0
            </div>
            <div>
              <h3 className="font-bold text-base text-slate-900">
                {t.changelogTitle}
              </h3>
              <p className="text-xs text-slate-500">{t.changelogSubtitle}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-slate-200 text-slate-500 hover:text-slate-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 overflow-y-auto space-y-4 text-xs text-slate-700 leading-relaxed scrollbar-thin">
          <div className="p-3 bg-blue-50 border border-blue-200 rounded-xl text-blue-900 font-medium">
            {t.changelogSummary}
          </div>

          <div className="space-y-3">
            <div className="flex items-start gap-2.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <strong className="text-slate-900 block text-xs">100% Anti-Spam (Zero Images & Emojis)</strong>
                <p className="text-slate-500">Pure HTML tables with inline CSS styles for 100% deliverability in Gmail, Outlook, and Apple Mail.</p>
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <Globe className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
              <div>
                <strong className="text-slate-900 block text-xs">International i18n & Bilingual Pronouns</strong>
                <p className="text-slate-500">Instant English and Spanish localization with persistent independent bilingual pronouns (<code className="text-blue-600 font-mono">pronounsEs</code> & <code className="text-blue-600 font-mono">pronounsEn</code>).</p>
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <Code2 className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
              <div>
                <strong className="text-slate-900 block text-xs">1-Click WYSIWYG Copying for Gmail</strong>
                <p className="text-slate-500">Native <code className="text-indigo-600 font-mono">ClipboardItem</code> API & DOM Selection fallback for direct visual pasting in Gmail Settings.</p>
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <Cpu className="w-4 h-4 text-purple-600 shrink-0 mt-0.5" />
              <div>
                <strong className="text-slate-900 block text-xs">Dual Persistence & JSON Management</strong>
                <p className="text-slate-500">Automatic synchronization between browser LocalStorage and <code className="text-purple-600 font-mono">data/profile.json</code> with Export/Import backup support.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-slate-100 bg-slate-50/50 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl shadow-xs transition-colors cursor-pointer"
          >
            {t.changelogClose}
          </button>
        </div>
      </div>
    </div>
  );
}
