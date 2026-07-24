"use client";

import React, { useState } from "react";
import { Copy, Check, Download, X, Code2 } from "lucide-react";
import { toast } from "sonner";
import confetti from "canvas-confetti";

interface CodeModalProps {
  isOpen: boolean;
  onClose: () => void;
  htmlCode: string;
  templateName: string;
}

export function CodeModal({ isOpen, onClose, htmlCode, templateName }: CodeModalProps) {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText(htmlCode);
      setCopied(true);
      confetti({ particleCount: 50, spread: 60, origin: { y: 0.7 } });
      toast.success("Código HTML copiado al portapapeles");
      setTimeout(() => setCopied(false), 2000);
    } catch (e) {
      toast.error("Error al copiar el código");
    }
  };

  const handleDownloadHtml = () => {
    try {
      const blob = new Blob([htmlCode], { type: "text/html;charset=utf-8" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `firma-${templateName.toLowerCase().replace(/\s+/g, "-")}.html`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      URL.revokeObjectURL(url);
      toast.success("Archivo .html descargado exitosamente");
    } catch (e) {
      toast.error("Error al descargar el archivo HTML");
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl max-w-3xl w-full shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">
        {/* Modal Header */}
        <div className="px-5 py-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-950">
          <div className="flex items-center gap-2">
            <Code2 className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            <div>
              <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100">
                Código HTML de la Firma ({templateName})
              </h3>
              <p className="text-xs text-slate-500">
                Código HTML inline compatible con Gmail, Outlook y Thunderbird.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Code View Area */}
        <div className="p-4 flex-1 overflow-y-auto bg-slate-950 text-slate-100 font-mono text-xs leading-relaxed">
          <pre className="whitespace-pre-wrap break-all">{htmlCode}</pre>
        </div>

        {/* Modal Footer Controls */}
        <div className="px-5 py-3 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 flex items-center justify-between">
          <button
            onClick={handleDownloadHtml}
            className="px-3.5 py-2 text-xs font-semibold rounded-lg border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 flex items-center gap-1.5 transition-colors"
          >
            <Download className="w-4 h-4" />
            Descargar HTML (.html)
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-3.5 py-2 text-xs font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100"
            >
              Cerrar
            </button>
            <button
              onClick={handleCopyCode}
              className="px-4 py-2 text-xs font-semibold rounded-lg bg-blue-600 hover:bg-blue-700 text-white shadow-xs flex items-center gap-1.5 transition-colors"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4" />
                  ¡Copiado!
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  Copiar Código
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
