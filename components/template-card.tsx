"use client";

import React, { useState, useMemo } from "react";
import { SignatureProfile, SignatureTemplate } from "@/lib/templates/types";
import { copyFormattedHtmlToClipboard } from "@/lib/utils";
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
  ChevronUp,
  ChevronDown,
} from "lucide-react";
import { toast } from "sonner";
import { Kbd, KbdGroup } from "@/components/ui/kbd";
import { autoFixForDarkMode } from "@/lib/contrast";

interface TemplateCardProps {
  template: SignatureTemplate;
  profile: SignatureProfile;
}

/**
 * VSCode HTML Syntax Highlighting Helper
 * Colors tags (#569cd6), attributes (#9cdcfe), string values (#ce9178), and text (#d4d4d4).
 */
function highlightHtmlLine(line: string): string {
  if (!line) return "&nbsp;";

  let escaped = line
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

  // Highlight quotes/strings in #ce9178
  escaped = escaped.replace(/&quot;([^&]*)&quot;/g, '<span style="color: #ce9178;">&quot;$1&quot;</span>');

  // Highlight attribute keys in #9cdcfe
  escaped = escaped.replace(/\b([a-zA-Z0-9-]+)=/g, '<span style="color: #9cdcfe;">$1</span>=');

  // Highlight tag names in #569cd6
  escaped = escaped.replace(/&lt;(\/?[a-zA-Z0-9-]+)/g, '<span style="color: #569cd6;">&lt;$1</span>');
  escaped = escaped.replace(/(&gt;)/g, '<span style="color: #569cd6;">$1</span>');

  return escaped;
}

export function TemplateCard({ template, profile }: TemplateCardProps) {
  const [copiedRich, setCopiedRich] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);
  const [isEmailDarkMode, setIsEmailDarkMode] = useState(false);
  const [isMobileView, setIsMobileView] = useState(false);
  const [isCodeOpen, setIsCodeOpen] = useState(false);
  
  // Per-template language toggle state
  const [cardLanguage, setCardLanguage] = useState<"es" | "en">(profile.language || "es");

  // Sync with profile.language if updated globally
  React.useEffect(() => {
    if (profile.language) {
      setCardLanguage(profile.language);
    }
  }, [profile.language]);

  // Compute effective profile with card-specific language, status badge and disclaimer
  const effectiveProfile: SignatureProfile = useMemo(() => {
    const isEn = cardLanguage === "en";
    let badge = profile.statusBadge;
    if (isEn && (badge === "● Abierto a oportunidades laborales" || !badge)) {
      badge = "● Open to new career opportunities";
    } else if (!isEn && (badge === "● Open to new career opportunities" || !badge)) {
      badge = "● Abierto a oportunidades laborales";
    }

    let disc = profile.disclaimer;
    if (isEn && (!disc || disc.includes("Este correo"))) {
      disc = "This email and any attachments are confidential and intended solely for the recipient. If received in error, please notify the sender immediately and delete this message.";
    } else if (!isEn && (!disc || disc.includes("This email"))) {
      disc = "Este correo electrónico y sus anexos son confidenciales y están dirigidos únicamente a su destinatario. Si lo recibió por error, notifique inmediatamente al remitente y elimine el mensaje.";
    }

    // Resolve pronouns per selected card language
    const pronounsVal = isEn
      ? (profile.pronounsEn || profile.pronouns || "He / Him")
      : (profile.pronounsEs || profile.pronouns || "Él / Him");

    // Resolve high-contrast colors in email dark mode
    let effectiveTextColor = profile.textColor || "#1e293b";
    let effectiveSecondaryColor = profile.secondaryColor || "#64748b";
    let effectivePrimaryColor = profile.primaryColor || "#2563eb";

    if (isEmailDarkMode) {
      if (effectiveTextColor === "#1e293b" || effectiveTextColor === "#0f172a") {
        effectiveTextColor = "#f8fafc";
      }
      if (effectiveSecondaryColor === "#64748b" || effectiveSecondaryColor === "#475569") {
        effectiveSecondaryColor = "#cbd5e1";
      }
      // Automatically boost primary accent color lightness to guarantee >= 4.5:1 contrast against #1e1e1e!
      effectivePrimaryColor = autoFixForDarkMode(effectivePrimaryColor);
    }

    return {
      ...profile,
      language: cardLanguage,
      statusBadge: badge,
      disclaimer: disc,
      pronouns: pronounsVal,
      textColor: effectiveTextColor,
      secondaryColor: effectiveSecondaryColor,
      primaryColor: effectivePrimaryColor,
    };
  }, [profile, cardLanguage, isEmailDarkMode]);

  const renderedHtml = template.renderHtml(effectiveProfile);
  const renderedText = template.renderText(effectiveProfile);

  // 1-Click Copy for Gmail
  const handleCopyForGmail = async () => {
    const success = await copyFormattedHtmlToClipboard(renderedHtml, renderedText);
    if (success) {
      toast.success(`¡Firma "${template.name}" copiada para Gmail!`, {
        description: (
          <div className="mt-1.5 space-y-1 text-xs font-medium text-slate-600">
            <div>1. Ve a <strong>Gmail &gt; Configuración &gt; Ver todos los ajustes &gt; Firma</strong>.</div>
            <div className="flex items-center gap-1.5 flex-wrap">
              <span>2. Haz clic en la casilla y presiona</span>
              <KbdGroup>
                <Kbd>⌘</Kbd>
                <span>/</span>
                <Kbd>Ctrl</Kbd>
                <span>+</span>
                <Kbd>V</Kbd>
              </KbdGroup>
            </div>
          </div>
        ),
        duration: 7000,
      });
      setTimeout(() => setCopiedRich(false), 2500);
    } else {
      toast.error("Error al copiar firma");
    }
  };

  // Copy raw HTML
  const handleCopyRawHtml = async () => {
    try {
      await navigator.clipboard.writeText(renderedHtml);
      setCopiedCode(true);
      toast.success("Código HTML copiado");
      setTimeout(() => setCopiedCode(false), 2000);
    } catch (e) {
      toast.error("Error al copiar código");
    }
  };

  // Download .html file
  const handleDownloadFile = () => {
    try {
      const blob = new Blob([renderedHtml], { type: "text/html;charset=utf-8" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `signature-${template.id}-${profile.fullName ? profile.fullName.toLowerCase().replace(/\s+/g, "-") : "data"}.html`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      URL.revokeObjectURL(url);
      toast.success("Archivo .html descargado");
    } catch (e) {
      toast.error("Error al descargar archivo");
    }
  };

  const htmlLines = useMemo(() => renderedHtml.split("\n"), [renderedHtml]);

  return (
    <div className="bg-white border border-slate-200 rounded-2xl shadow-xs hover:shadow-md transition-shadow overflow-hidden flex flex-col">
      {/* Card Header Info */}
      <div className="p-4 sm:p-5 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-50/50">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="font-bold text-base text-slate-900">
              {template.name}
            </h3>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-slate-200 text-slate-700 uppercase tracking-wider">
              {template.category}
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            {template.description}
          </p>
        </div>

        {/* Card Specific Controls */}
        <div className="flex items-center gap-2 flex-wrap">
          {/* Per-Template Language Selector */}
          <div className="flex items-center p-0.5 rounded-lg border border-slate-200 bg-white shadow-2xs">
            <button
              type="button"
              onClick={() => setCardLanguage("es")}
              className={`px-2 py-1 text-[11px] font-bold rounded-md transition-colors cursor-pointer ${
                cardLanguage === "es"
                  ? "bg-blue-600 text-white"
                  : "text-slate-600 hover:text-slate-900"
              }`}
              title="Idioma de plantilla: Español"
            >
              ES
            </button>
            <button
              type="button"
              onClick={() => setCardLanguage("en")}
              className={`px-2 py-1 text-[11px] font-bold rounded-md transition-colors cursor-pointer ${
                cardLanguage === "en"
                  ? "bg-blue-600 text-white"
                  : "text-slate-600 hover:text-slate-900"
              }`}
              title="Template Language: English"
            >
              EN
            </button>
          </div>

          {/* Light / Dark Email Mode Switcher */}
          <button
            type="button"
            onClick={() => setIsEmailDarkMode(!isEmailDarkMode)}
            className={`px-3 py-1.5 rounded-lg border text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
              isEmailDarkMode
                ? "bg-slate-800 border-slate-700 text-amber-300"
                : "bg-white border-slate-200 text-slate-700 hover:bg-slate-50"
            }`}
            title={isEmailDarkMode ? "Cambiar a vista de correo clara" : "Probar cómo se ve en modo oscuro de Gmail"}
          >
            {isEmailDarkMode ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
            <span>{isEmailDarkMode ? "Modo Claro" : "Modo Oscuro"}</span>
          </button>

          {/* Desktop / Mobile View Switcher */}
          <div className="flex items-center p-0.5 rounded-lg border border-slate-200 bg-white">
            <button
              type="button"
              onClick={() => setIsMobileView(false)}
              className={`p-1.5 rounded-md transition-colors cursor-pointer ${
                !isMobileView
                  ? "bg-blue-50 text-blue-600 font-bold"
                  : "text-slate-400 hover:text-slate-600"
              }`}
              title="Vista de Escritorio"
            >
              <Monitor className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => setIsMobileView(true)}
              className={`p-1.5 rounded-md transition-colors cursor-pointer ${
                isMobileView
                  ? "bg-blue-50 text-blue-600 font-bold"
                  : "text-slate-400 hover:text-slate-600"
              }`}
              title="Vista Móvil"
            >
              <Smartphone className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Gmail Window Simulator Container */}
      <div className="p-4 sm:p-6 bg-slate-100/70 border-b border-slate-100 flex justify-center">
        <div
          className={`w-full transition-all duration-300 rounded-xl overflow-hidden border shadow-sm ${
            isMobileView ? "max-w-xs" : "max-w-full"
          } ${
            isEmailDarkMode
              ? "bg-[#1e1e1e] border-slate-800"
              : "bg-white border-slate-200"
          }`}
        >
          {/* Gmail Header Mock */}
          <div
            className={`px-4 py-2.5 border-b flex items-center justify-between text-xs font-semibold ${
              isEmailDarkMode
                ? "bg-[#2d2d2d] border-slate-800 text-slate-300"
                : "bg-[#f2f6fc] border-[#e5e7eb] text-slate-700"
            }`}
          >
            <span>Mensaje nuevo</span>
            <div className="flex items-center gap-2 text-slate-400">
              <span className="cursor-pointer">&mdash;</span>
              <span className="cursor-pointer">&#x2922;</span>
              <span className="cursor-pointer">&times;</span>
            </div>
          </div>

          {/* Email Fields Mock */}
          <div
            className={`px-4 py-2 border-b text-xs space-y-1.5 ${
              isEmailDarkMode
                ? "border-slate-800 text-slate-400"
                : "border-[#f1f3f4] text-[#70757a]"
            }`}
          >
            <div className="py-0.5 font-normal">Destinatarios</div>
            <div
              className={`border-t pt-2 pb-0.5 font-normal ${
                isEmailDarkMode ? "border-slate-800" : "border-[#f1f3f4]"
              }`}
            >
              Asunto
            </div>
          </div>

          {/* Email Body & Signature Container */}
          <div
            className={`p-4 sm:p-5 text-[13px] leading-relaxed space-y-4 min-h-[220px] overflow-x-auto ${
              isEmailDarkMode ? "bg-[#1e1e1e] text-[#e3e2e6]" : "bg-white text-[#202124]"
            }`}
          >
            <div className="space-y-3 font-sans">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras non odio ex. Quisque euismod lacus eget nunc sodales tempor. Quisque eleifend ullamcorper quam, quis rutrum urna viverra non.
              </p>
              <p>
                Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Nam in iaculis dui, vitae bibendum sapien. Aenean tempus leo sed eros porta vulputate.
              </p>
            </div>

            {/* Authentic Gmail Signature Separator -- */}
            <div className={`pt-2 text-xs ${isEmailDarkMode ? "text-slate-500" : "text-[#70757a]"}`}>
              --
            </div>

            {/* LIVE RENDERED SIGNATURE */}
            <div className="pt-1 overflow-x-auto">
              <div
                className="signature-container font-sans"
                dangerouslySetInnerHTML={{
                  __html: isMobileView
                    ? `<style>.sig-item { display: block !important; margin-right: 0 !important; margin-bottom: 5px !important; width: 100% !important; } .sig-sep { display: none !important; }</style>` + renderedHtml
                    : renderedHtml,
                }}
              />
            </div>
          </div>

          {/* Gmail Footer Bottom Toolbar */}
          <div
            className={`px-4 py-2.5 border-t flex items-center justify-between text-xs ${
              isEmailDarkMode
                ? "bg-[#28292a] border-slate-800"
                : "bg-[#f8faff] border-[#f1f3f4]"
            }`}
          >
            <div className="flex items-center gap-3">
              <button className="px-4 py-1.5 bg-[#0b57d0] hover:bg-[#0842a0] text-white font-medium text-xs rounded-full flex items-center gap-1.5 shadow-xs cursor-pointer">
                Enviar <Send className="w-3 h-3" />
              </button>
              <div className="flex items-center gap-3 text-slate-500">
                <Paperclip className="w-4 h-4 cursor-pointer hover:text-slate-800" />
                <Sparkles className="w-4 h-4 cursor-pointer text-amber-500 hover:text-amber-600" />
              </div>
            </div>
            <Trash2 className="w-4 h-4 text-slate-400 cursor-pointer hover:text-red-500" />
          </div>
        </div>
      </div>

      {/* Action Buttons Row */}
      <div className="p-3.5 bg-white flex items-center justify-between gap-2">
        {/* Clean Light-Styled Code Viewer Button */}
        <button
          onClick={() => setIsCodeOpen(!isCodeOpen)}
          className="px-3.5 py-2 text-xs font-semibold rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 shadow-xs flex items-center gap-1.5 transition-all cursor-pointer"
        >
          <Code className="w-3.5 h-3.5 text-blue-600" />
          <span>Ver Código</span>
          {isCodeOpen ? <ChevronUp className="w-3.5 h-3.5 text-slate-500" /> : <ChevronDown className="w-3.5 h-3.5 text-slate-400" />}
        </button>

        {/* Primary Gmail Copy Button */}
        <button
          onClick={handleCopyForGmail}
          className="px-4 py-2 text-xs font-bold rounded-xl bg-blue-600 hover:bg-blue-700 text-white shadow-xs flex items-center gap-1.5 transition-all transform active:scale-95 cursor-pointer"
        >
          {copiedRich ? (
            <>
              <Check className="w-4 h-4" />
              ¡Firma Copiada!
            </>
          ) : (
            <>
              <Sparkles className="w-3.5 h-3.5 text-white" />
              Copiar para Gmail
            </>
          )}
        </button>
      </div>

      {/* Authentic VSCode Code Viewer with Line Numbers & Syntax Colors */}
      {isCodeOpen && (
        <div className="border-t border-[#333333] bg-[#1e1e1e] animate-in fade-in slide-in-from-top-2 duration-200">
          {/* VSCode Window Header */}
          <div className="px-4 py-2 bg-[#252526] border-b border-[#333333] flex items-center justify-between font-mono text-xs select-none">
            {/* Left: Mac Dots & Active File Tab */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
                <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1 bg-[#1e1e1e] text-[#cccccc] rounded-t-md border-t-2 border-blue-500 font-sans text-xs font-semibold">
                <Code className="w-3.5 h-3.5 text-blue-400" />
                <span>signature-{template.id}.html</span>
              </div>
            </div>

            {/* Right: Actions inside VSCode Viewer Header Bar */}
            <div className="flex items-center gap-2">
              <button
                onClick={handleCopyRawHtml}
                className="px-2.5 py-1 text-[11px] bg-[#333333] hover:bg-[#444444] text-[#cccccc] rounded flex items-center gap-1.5 transition-colors cursor-pointer font-sans font-medium"
                title="Copiar código HTML crudo"
              >
                {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedCode ? "¡Copiado!" : "Copiar Raw"}</span>
              </button>

              <button
                onClick={handleDownloadFile}
                className="px-2.5 py-1 text-[11px] bg-[#333333] hover:bg-[#444444] text-[#cccccc] rounded flex items-center gap-1.5 transition-colors cursor-pointer font-sans font-medium"
                title="Descargar archivo .html"
              >
                <Download className="w-3.5 h-3.5 text-blue-400" />
                <span>.HTML</span>
              </button>

              <button
                onClick={() => setIsCodeOpen(false)}
                className="p-1 hover:bg-[#333333] text-[#888888] hover:text-white rounded transition-colors cursor-pointer ml-1"
                title="Cerrar visor de código"
              >
                <ChevronUp className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* VSCode Editor Code Box with Line Numbers & Syntax Colors */}
          <div className="p-4 bg-[#1e1e1e] font-mono text-[11px] leading-relaxed max-h-80 overflow-auto scrollbar-thin">
            <div className="table w-full border-collapse font-mono">
              {htmlLines.map((line, idx) => (
                <div key={idx} className="table-row leading-5">
                  {/* Line Numbers Column */}
                  <span className="table-cell pr-4 text-right text-[#5a5a5a] select-none font-mono text-[11px] w-8">
                    {idx + 1}
                  </span>
                  {/* Syntax Highlighted HTML Line */}
                  <span
                    className="table-cell whitespace-pre-wrap break-all text-[#d4d4d4]"
                    dangerouslySetInnerHTML={{
                      __html: highlightHtmlLine(line),
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
