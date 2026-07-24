"use client";

import React, { useState } from "react";
import { SignatureProfile, SignatureTemplate } from "@/lib/templates/types";
import { copyFormattedHtmlToClipboard } from "@/lib/utils";
import { CodeModal } from "./code-modal";
import {
  Copy,
  Check,
  Code,
  Download,
  Smartphone,
  Monitor,
  Sun,
  Moon,
  Send,
  Paperclip,
  Trash2,
  Sparkles,
  Info,
} from "lucide-react";
import { toast } from "sonner";
import confetti from "canvas-confetti";

interface GmailPreviewProps {
  profile: SignatureProfile;
  template: SignatureTemplate;
}

export function GmailPreview({ profile, template }: GmailPreviewProps) {
  const [copiedRich, setCopiedRich] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMobileView, setIsMobileView] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const renderedHtml = template.renderHtml(profile);
  const renderedText = template.renderText(profile);

  // 1-Click "Copiar para Gmail" (Rich Text Clipboard Copy)
  const handleCopyForGmail = async () => {
    const success = await copyFormattedHtmlToClipboard(renderedHtml, renderedText);
    if (success) {
      setCopiedRich(true);
      confetti({ particleCount: 70, spread: 70, origin: { y: 0.6 } });
      toast.success("¡Firma copiada para Gmail!", {
        description: "Abre la configuración de Gmail > Firma y presiona Pegar (Ctrl+V / Cmd+V).",
        duration: 5000,
      });
      setTimeout(() => setCopiedRich(false), 2500);
    } else {
      toast.error("No se pudo copiar en formato enriquecido. Prueba copiar el código HTML.");
    }
  };

  // Quick Copy HTML Code string
  const handleCopyRawHtml = async () => {
    try {
      await navigator.clipboard.writeText(renderedHtml);
      setCopiedCode(true);
      toast.success("Código HTML copiado al portapapeles");
      setTimeout(() => setCopiedCode(false), 2000);
    } catch (e) {
      toast.error("Error al copiar el código");
    }
  };

  // Quick Download .html file
  const handleDownloadFile = () => {
    try {
      const blob = new Blob([renderedHtml], { type: "text/html;charset=utf-8" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `firma-${template.id}-${profile.fullName.toLowerCase().replace(/\s+/g, "-")}.html`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      URL.revokeObjectURL(url);
      toast.success("Archivo de firma .html descargado");
    } catch (e) {
      toast.error("Error al descargar archivo");
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-xs overflow-hidden flex flex-col h-full">
      {/* Top Toolbar */}
      <div className="px-4 py-3 border-b border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-950/60 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="font-bold text-sm text-slate-900 dark:text-slate-100 flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500 inline-block"></span>
            Vista Previa Gmail
          </span>
          <span className="text-xs text-slate-500 font-normal hidden sm:inline">
            ({template.name})
          </span>
        </div>

        {/* View Mode Controls */}
        <div className="flex items-center gap-2">
          {/* Light / Dark Mode email preview */}
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className={`p-1.5 rounded-lg border text-xs flex items-center gap-1 transition-colors ${
              isDarkMode
                ? "bg-slate-800 border-slate-700 text-amber-400"
                : "bg-white border-slate-200 text-slate-600 hover:bg-slate-100"
            }`}
            title={isDarkMode ? "Cambiar a vista clara de correo" : "Probar cómo se ve en modo oscuro de Gmail"}
          >
            {isDarkMode ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
            <span className="text-[11px] font-medium hidden md:inline">
              {isDarkMode ? "Modo Oscuro" : "Modo Claro"}
            </span>
          </button>

          {/* Desktop / Mobile switcher */}
          <div className="flex items-center p-0.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950">
            <button
              onClick={() => setIsMobileView(false)}
              className={`p-1 rounded-md transition-colors ${
                !isMobileView
                  ? "bg-slate-100 dark:bg-slate-800 text-blue-600 dark:text-blue-400"
                  : "text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
              }`}
              title="Vista de Escritorio"
            >
              <Monitor className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setIsMobileView(true)}
              className={`p-1 rounded-md transition-colors ${
                isMobileView
                  ? "bg-slate-100 dark:bg-slate-800 text-blue-600 dark:text-blue-400"
                  : "text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
              }`}
              title="Vista Móvil"
            >
              <Smartphone className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Gmail Window Content */}
      <div className="p-4 flex-1 overflow-y-auto flex flex-col items-center bg-slate-100 dark:bg-slate-950/80">
        <div
          className={`w-full transition-all duration-300 rounded-xl shadow-lg border overflow-hidden flex flex-col ${
            isDarkMode
              ? "bg-[#1f1f1f] text-slate-100 border-slate-800"
              : "bg-white text-slate-900 border-slate-200"
          } ${isMobileView ? "max-w-xs" : "max-w-2xl"}`}
        >
          {/* Gmail Red Top Window Bar */}
          <div className="bg-[#e03d32] text-white px-4 py-2.5 flex items-center justify-between font-sans">
            <span className="font-medium text-xs tracking-wide">Mensaje Nuevo</span>
            <div className="flex items-center gap-1.5 opacity-80 text-xs">
              <span>&mdash;</span>
              <span>&#x274F;</span>
              <span>&times;</span>
            </div>
          </div>

          {/* Gmail Header Meta Fields */}
          <div className="px-4 py-2 border-b border-slate-200/40 dark:border-slate-800/80 text-xs font-sans space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="text-slate-400 font-medium w-12 shrink-0">Para:</span>
              <span className="bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-full text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                cliente.destinatario@ejemplo.com
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-slate-400 font-medium w-12 shrink-0">Asunto:</span>
              <span className="font-semibold text-slate-800 dark:text-slate-200">
                Propuesta de Trabajo &amp; Presentación de Proyecto
              </span>
            </div>
          </div>

          {/* Email Body & Signature Container */}
          <div className="p-5 flex-1 font-sans text-xs sm:text-sm leading-relaxed space-y-4 min-h-[260px] overflow-x-auto">
            <div className="text-slate-700 dark:text-slate-300 space-y-2">
              <p>Hola Estimado/a,</p>
              <p>
                Te adjunto los detalles de la propuesta que revisamos previamente. Quedo totalmente disponible si tienes dudas o comentarios adicionales.
              </p>
              <p className="pt-1">Saludos cordiales,</p>
            </div>

            {/* LIVE RENDERED SIGNATURE */}
            <div className="pt-4 border-t border-slate-200/50 dark:border-slate-800">
              <div
                className="signature-preview-area overflow-x-auto"
                dangerouslySetInnerHTML={{ __html: renderedHtml }}
              />
            </div>
          </div>

          {/* Gmail Footer Action Buttons Simulation */}
          <div className="px-4 py-2.5 bg-slate-50 dark:bg-[#181818] border-t border-slate-200/60 dark:border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="px-4 py-1.5 bg-[#1a73e8] hover:bg-blue-600 text-white font-medium text-xs rounded-full flex items-center gap-1.5 shadow-xs cursor-default">
                Enviar <Send className="w-3 h-3" />
              </span>
              <Paperclip className="w-4 h-4 text-slate-400" />
            </div>
            <Trash2 className="w-4 h-4 text-slate-400" />
          </div>
        </div>

        {/* Gmail Copy Instructions Note */}
        <div className="mt-3 max-w-2xl w-full p-3 rounded-lg bg-blue-50/80 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900/60 text-xs text-blue-900 dark:text-blue-200 flex items-start gap-2">
          <Info className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
          <div>
            <span className="font-semibold">¿Cómo agregar a Gmail?</span>
            <ol className="list-decimal list-inside mt-1 space-y-0.5 text-[11px] text-slate-600 dark:text-slate-300">
              <li>Haz clic en el botón <strong>&quot;Copiar para Gmail&quot;</strong> abajo.</li>
              <li>Abre <strong>Gmail</strong> &gt; Configuración (ícono engranaje) &gt; Ver toda la configuración.</li>
              <li>En la sección <strong>&quot;Firma&quot;</strong>, crea una firma y presiona <strong>Ctrl+V</strong> (o Cmd+V).</li>
              <li>¡Listo! Tu firma HTML se pegará con todos los formatos, colores y enlaces intactos.</li>
            </ol>
          </div>
        </div>
      </div>

      {/* Main Action Buttons */}
      <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-3 py-2 text-xs font-semibold rounded-lg border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 flex items-center gap-1.5 transition-colors"
          >
            <Code className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
            Ver Código HTML
          </button>

          <button
            onClick={handleDownloadFile}
            className="px-3 py-2 text-xs font-semibold rounded-lg border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 flex items-center gap-1.5 transition-colors hidden sm:flex"
          >
            <Download className="w-3.5 h-3.5" />
            .HTML
          </button>

          <button
            onClick={handleCopyRawHtml}
            className="px-3 py-2 text-xs font-semibold rounded-lg border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 flex items-center gap-1.5 transition-colors"
          >
            {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
            {copiedCode ? "¡Copiado!" : "Copiar HTML"}
          </button>
        </div>

        {/* PRIMARY ACTION BUTTON */}
        <button
          onClick={handleCopyForGmail}
          className="px-5 py-2.5 text-xs font-bold rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-md shadow-blue-500/20 flex items-center gap-2 transition-all transform active:scale-95"
        >
          {copiedRich ? (
            <>
              <Check className="w-4 h-4" />
              ¡Firma Copiada para Gmail!
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4 text-amber-300" />
              Copiar para Gmail
            </>
          )}
        </button>
      </div>

      {/* Code Modal Dialog */}
      <CodeModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        htmlCode={renderedHtml}
        templateName={template.name}
      />
    </div>
  );
}
