"use client";

import React from "react";
import { X, ShieldCheck, Globe, Code2, Cpu, Eye, Palette } from "lucide-react";
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
              v1.1
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
            className="p-1.5 rounded-lg hover:bg-slate-200 text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
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
              <Eye className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
              <div>
                <strong className="text-slate-900 block text-xs">VSCode-Style Inline Code Viewer</strong>
                <p className="text-slate-500">Inline collapsible code box with line numbers, HTML syntax colors (<code className="text-blue-600 font-mono">#569cd6</code>, <code className="text-blue-600 font-mono">#9cdcfe</code>, <code className="text-blue-600 font-mono">#ce9178</code>), and header actions.</p>
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <Palette className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
              <div>
                <strong className="text-slate-900 block text-xs">WCAG 2.1 Color Contrast & Auto-Hue Adjustment</strong>
                <p className="text-slate-500">Real-time WCAG 2.1 contrast calculation for Dark Mode with warning banner and 1-click <code className="text-indigo-600 font-mono">Auto-Adjust Hue</code> button.</p>
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <strong className="text-slate-900 block text-xs">100% Anti-Spam (Zero Images & Emojis)</strong>
                <p className="text-slate-500">Pure HTML tables with inline CSS styles for 100% deliverability in Gmail, Outlook, and Apple Mail.</p>
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <Globe className="w-4 h-4 text-purple-600 shrink-0 mt-0.5" />
              <div>
                <strong className="text-slate-900 block text-xs">Decoupled i18n & Bilingual Pronouns</strong>
                <p className="text-slate-500">Topnav language selector controls 100% app UI, while sidebar configures signature defaults independently.</p>
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
