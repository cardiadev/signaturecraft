"use client";

import React, { useState, useRef } from "react";
import { DEFAULT_PROFILE, SignatureProfile } from "@/lib/templates/types";
import {
  User,
  PhoneCall,
  Share2,
  Palette,
  Sparkles,
  X,
  ChevronDown,
  ChevronUp,
  Save,
  Check,
  Globe,
  Edit3,
  ShieldCheck,
  Briefcase,
  Download,
  Upload,
  RotateCcw,
  AlertTriangle,
  CheckCircle2,
} from "lucide-react";
import { toast } from "sonner";
import { Locale, translations } from "@/lib/i18n";
import { Kbd } from "@/components/ui/kbd";
import { isDarkModeCompliant, getContrastRatio, autoFixForDarkMode } from "@/lib/contrast";

interface SignatureFormProps {
  profile: SignatureProfile;
  onChange: (profile: SignatureProfile) => void;
  onResetProfile?: () => void;
  onCloseDrawer?: () => void;
  appLocale?: Locale;
}

const COLOR_PRESETS = [
  { label: "Executive Blue", primary: "#2563eb", secondary: "#64748b" },
  { label: "Emerald Green", primary: "#059669", secondary: "#475569" },
  { label: "Modern Indigo", primary: "#4f46e5", secondary: "#64748b" },
  { label: "Creative Purple", primary: "#7c3aed", secondary: "#64748b" },
  { label: "Sleek Dark", primary: "#0f172a", secondary: "#475569" },
  { label: "Crimson Red", primary: "#dc2626", secondary: "#52525b" },
];

const BADGE_PRESETS_ES = [
  { label: "● Abierto a oportunidades laborales", value: "● Abierto a oportunidades laborales" },
  { label: "● Abierto a nuevos retos profesionales", value: "● Abierto a nuevos retos profesionales" },
  { label: "● En búsqueda activa de empleo", value: "● En búsqueda activa de empleo" },
  { label: "● Disponible para contratación inmediata", value: "● Disponible para contratación inmediata" },
  { label: "✓ Perfil Profesional Verificado", value: "✓ Perfil Profesional Verificado" },
  { label: "Sin insignia (Ocultar)", value: "" },
];

const BADGE_PRESETS_EN = [
  { label: "● Open to new career opportunities", value: "● Open to new career opportunities" },
  { label: "● Open to work & professional roles", value: "● Open to work & professional roles" },
  { label: "● Actively seeking new opportunities", value: "● Actively seeking new opportunities" },
  { label: "● Available for immediate hire", value: "● Available for immediate hire" },
  { label: "✓ Verified Professional Profile", value: "✓ Verified Professional Profile" },
  { label: "None (Hide)", value: "" },
];

export const DISCLAIMER_PRESETS = [
  {
    title: "Spanish Standard",
    value:
      "Este correo electrónico y sus anexos son confidenciales y están dirigidos únicamente a su destinatario. Si lo recibió por error, notifique inmediatamente al remitente y elimine el mensaje.",
  },
  {
    title: "English Standard",
    value:
      "This email and any attachments are confidential and intended solely for the recipient. If received in error, please notify the sender immediately and delete this message.",
  },
  {
    title: "Corporate Privacy",
    value:
      "Aviso de Privacidad: La información contenida en esta transmisión es confidencial y protegida por la ley. Si usted no es el destinatario intencional, se prohíbe cualquier uso, divulgación o copia de este mensaje.",
  },
  {
    title: "Bilingual (ES / EN)",
    value:
      "Confidentiality Notice: This message is intended only for the designated recipient. / Este mensaje es confidencial y para uso exclusivo de su destinatario.",
  },
  {
    title: "No disclaimer",
    value: "",
  },
];

export function SignatureForm({
  profile,
  onChange,
  onResetProfile,
  onCloseDrawer,
  appLocale = "en",
}: SignatureFormProps) {
  const t = translations[appLocale];
  const [openSections, setOpenSections] = useState({
    personal: true,
    contact: true,
    social: true,
    style: true,
    extras: true,
  });

  const [isSaved, setIsSaved] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const updateField = (field: keyof SignatureProfile, value: any) => {
    const isEs = (profile.language || "es") === "es";
    let extraFields: Partial<SignatureProfile> = {};

    if (field === "jobTitle") {
      extraFields = isEs ? { jobTitleEs: value } : { jobTitleEn: value };
    } else if (field === "department") {
      extraFields = isEs ? { departmentEs: value } : { departmentEn: value };
    } else if (field === "statusBadge") {
      extraFields = isEs ? { statusBadgeEs: value } : { statusBadgeEn: value };
    } else if (field === "disclaimer") {
      extraFields = isEs ? { disclaimerEs: value } : { disclaimerEn: value };
    } else if (field === "pronouns") {
      extraFields = isEs ? { pronounsEs: value } : { pronounsEn: value };
    }

    onChange({
      ...profile,
      [field]: value,
      ...extraFields,
    });
  };

  const updateMultipleFields = (fields: Partial<SignatureProfile>) => {
    onChange({
      ...profile,
      ...fields,
    });
  };

  const handleLanguageSwitch = (lang: "es" | "en") => {
    if (lang === "en") {
      // Preserve current ES fields before switching
      const updatedEs = {
        jobTitleEs: profile.jobTitleEs || profile.jobTitle || "Ingeniero de Software Senior",
        departmentEs: profile.departmentEs || profile.department || "Ingeniería",
        statusBadgeEs: profile.statusBadgeEs || profile.statusBadge || "● Abierto a oportunidades laborales",
        disclaimerEs: profile.disclaimerEs || profile.disclaimer || DISCLAIMER_PRESETS[0].value,
        pronounsEs: profile.pronounsEs || profile.pronouns || "Él / Him",
      };

      const newJobTitle = profile.jobTitleEn || (profile.jobTitle === "Ingeniero de Software Senior" ? "Senior Software Engineer" : profile.jobTitle);
      const newDept = profile.departmentEn || (profile.department === "Ingeniería" ? "Engineering" : profile.department);
      const newBadge = profile.statusBadgeEn || (profile.statusBadge.includes("Abierto") ? "● Open to new career opportunities" : profile.statusBadge);
      const newDisclaimer = profile.disclaimerEn || (profile.disclaimer.includes("Este correo") ? DISCLAIMER_PRESETS[1].value : profile.disclaimer);
      const newPronouns = profile.pronounsEn || "He / Him";

      updateMultipleFields({
        ...updatedEs,
        language: "en",
        jobTitle: newJobTitle,
        department: newDept,
        statusBadge: newBadge,
        disclaimer: newDisclaimer,
        pronouns: newPronouns,
        jobTitleEn: newJobTitle,
        departmentEn: newDept,
        statusBadgeEn: newBadge,
        disclaimerEn: newDisclaimer,
        pronounsEn: newPronouns,
      });
    } else {
      // Preserve current EN fields before switching
      const updatedEn = {
        jobTitleEn: profile.jobTitleEn || profile.jobTitle || "Senior Software Engineer",
        departmentEn: profile.departmentEn || profile.department || "Engineering",
        statusBadgeEn: profile.statusBadgeEn || profile.statusBadge || "● Open to new career opportunities",
        disclaimerEn: profile.disclaimerEn || profile.disclaimer || DISCLAIMER_PRESETS[1].value,
        pronounsEn: profile.pronounsEn || profile.pronouns || "He / Him",
      };

      const newJobTitle = profile.jobTitleEs || (profile.jobTitle === "Senior Software Engineer" ? "Ingeniero de Software Senior" : profile.jobTitle);
      const newDept = profile.departmentEs || (profile.department === "Engineering" ? "Ingeniería" : profile.department);
      const newBadge = profile.statusBadgeEs || (profile.statusBadge.includes("Open") ? "● Abierto a oportunidades laborales" : profile.statusBadge);
      const newDisclaimer = profile.disclaimerEs || (profile.disclaimer.includes("This email") ? DISCLAIMER_PRESETS[0].value : profile.disclaimer);
      const newPronouns = profile.pronounsEs || "Él / Him";

      updateMultipleFields({
        ...updatedEn,
        language: "es",
        jobTitle: newJobTitle,
        department: newDept,
        statusBadge: newBadge,
        disclaimer: newDisclaimer,
        pronouns: newPronouns,
        jobTitleEs: newJobTitle,
        departmentEs: newDept,
        statusBadgeEs: newBadge,
        disclaimerEs: newDisclaimer,
        pronounsEs: newPronouns,
      });
    }
  };

  const handleUsernameChange = (
    platform: "linkedin" | "github" | "twitter" | "instagram",
    val: string
  ) => {
    const cleanUser = val.replace(/^@/, "").trim();
    let generatedUrl = "";
    if (cleanUser) {
      if (platform === "linkedin") generatedUrl = `https://linkedin.com/in/${cleanUser}`;
      if (platform === "github") generatedUrl = `https://github.com/${cleanUser}`;
      if (platform === "twitter") generatedUrl = `https://x.com/${cleanUser}`;
      if (platform === "instagram") generatedUrl = `https://instagram.com/${cleanUser}`;
    }

    const keyUser = `${platform}Username` as keyof SignatureProfile;
    updateMultipleFields({
      [keyUser]: val,
      [platform]: generatedUrl,
    });
  };

  const handleSaveData = () => {
    try {
      localStorage.setItem("signature_craft_profile_v2", JSON.stringify(profile));
      setIsSaved(true);
      toast.success(t.toastSavedTitle, {
        description: (
          <div className="mt-1 text-xs text-slate-600">
            {t.toastSavedDesc}
          </div>
        ),
      });
      setTimeout(() => setIsSaved(false), 2500);
    } catch (e) {
      toast.error("LocalStorage save error");
    }
  };

  const handleExportJson = () => {
    try {
      const fileName = `signature-profile-${profile.fullName ? profile.fullName.toLowerCase().replace(/\s+/g, "-") : "data"}.json`;
      const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(profile, null, 2));
      const downloadAnchor = document.createElement("a");
      downloadAnchor.setAttribute("href", dataStr);
      downloadAnchor.setAttribute("download", fileName);
      document.body.appendChild(downloadAnchor);
      downloadAnchor.click();
      downloadAnchor.remove();
      toast.success(t.toastExportTitle, {
        description: (
          <div className="mt-1 text-xs text-slate-600">
            <Kbd>{fileName}</Kbd>
          </div>
        ),
      });
    } catch (e) {
      toast.error("Export JSON error");
    }
  };

  const handleImportJsonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileReader = new FileReader();
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      fileReader.readAsText(file, "UTF-8");
      fileReader.onload = (event) => {
        try {
          const parsed = JSON.parse(event.target?.result as string);
          if (parsed && typeof parsed === "object") {
            const merged = { ...DEFAULT_PROFILE, ...parsed };
            onChange(merged);
            
            try {
              localStorage.setItem("signature_craft_profile_v2", JSON.stringify(merged));
            } catch (err) {}

            toast.success(t.toastImportTitle, {
              description: (
                <div className="mt-1 text-xs text-slate-600">
                  <Kbd>{file.name}</Kbd>
                </div>
              ),
            });
          } else {
            toast.error("Invalid JSON file");
          }
        } catch (err) {
          toast.error("JSON parse error");
        }
      };
    }
  };

  const activeBadgePresets = profile.language === "en" ? BADGE_PRESETS_EN : BADGE_PRESETS_ES;

  return (
    <div className="bg-white overflow-hidden flex flex-col h-full w-full relative">
      {/* Hidden File Input for JSON Import */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileImport}
        accept=".json"
        className="hidden"
      />

      {/* Native Sidebar Top Header */}
      <div className="px-4 py-3 border-b border-slate-200 bg-slate-50/90 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2">
          <span className="font-bold text-sm text-slate-900">
            {t.myProfileData}
          </span>
          <span className="text-[10px] bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full font-semibold">
            {t.localServerSync}
          </span>
        </div>

        {onCloseDrawer && (
          <button
            type="button"
            onClick={onCloseDrawer}
            className="p-1.5 rounded-lg hover:bg-slate-200 text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
            title={t.closeModal}
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Main Scrollable Content Area */}
      <div className="p-4 flex-1 overflow-y-auto space-y-3 scrollbar-thin">
        {/* 1. INFORMACIÓN PERSONAL */}
        <div className="border border-slate-200 rounded-xl overflow-hidden bg-white shadow-2xs">
          <button
            type="button"
            onClick={() => toggleSection("personal")}
            className="w-full px-3.5 py-2.5 bg-slate-50 hover:bg-slate-100 flex items-center justify-between text-xs font-bold text-slate-800 transition-colors border-b border-slate-100 cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <User className="w-4 h-4 text-blue-600" />
              <span>{t.personalInfo}</span>
            </div>
            {openSections.personal ? (
              <ChevronUp className="w-4 h-4 text-slate-400" />
            ) : (
              <ChevronDown className="w-4 h-4 text-slate-400" />
            )}
          </button>

          {openSections.personal && (
            <div className="p-3.5 space-y-3">
              {/* Language Selector Buttons */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5 flex items-center gap-1">
                  <Globe className="w-3.5 h-3.5 text-blue-600" />
                  {t.languageSelector}
                </label>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => handleLanguageSwitch("es")}
                    className={`flex-1 py-2 px-3 text-xs font-bold rounded-xl border transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                      profile.language === "es" || !profile.language
                        ? "bg-blue-600 text-white border-blue-600 shadow-xs"
                        : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                    }`}
                  >
                    <span>Spanish (ES)</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleLanguageSwitch("en")}
                    className={`flex-1 py-2 px-3 text-xs font-bold rounded-xl border transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                      profile.language === "en"
                        ? "bg-blue-600 text-white border-blue-600 shadow-xs"
                        : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                    }`}
                  >
                    <span>English (EN)</span>
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  {t.fullName}
                </label>
                <input
                  type="text"
                  value={profile.fullName || ""}
                  onChange={(e) => updateField("fullName", e.target.value)}
                  placeholder="Ex. Alex Morgan"
                  className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-300 bg-white text-slate-900 focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  {t.jobTitle}
                </label>
                <input
                  type="text"
                  value={profile.jobTitle || ""}
                  onChange={(e) => updateField("jobTitle", e.target.value)}
                  placeholder="Ex. Senior Software Engineer"
                  className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-300 bg-white text-slate-900 focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  {t.companyName}
                </label>
                <input
                  type="text"
                  value={profile.companyName || ""}
                  onChange={(e) => updateField("companyName", e.target.value)}
                  placeholder="Ex. Acme Corp"
                  className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-300 bg-white text-slate-900 focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  {t.department}
                </label>
                <input
                  type="text"
                  value={profile.department || ""}
                  onChange={(e) => updateField("department", e.target.value)}
                  placeholder="Ex. Software Engineering"
                  className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-300 bg-white text-slate-900 focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                />
              </div>

              {/* Single Clean Pronombres Input dependent on profile.language */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  {t.pronombres}
                </label>
                <input
                  type="text"
                  value={
                    profile.language === "en"
                      ? (profile.pronounsEn ?? "")
                      : (profile.pronounsEs ?? "")
                  }
                  onChange={(e) => {
                    const val = e.target.value;
                    if (profile.language === "en") {
                      updateField("pronounsEn", val);
                    } else {
                      updateField("pronounsEs", val);
                    }
                  }}
                  placeholder={profile.language === "en" ? "Ex. He / Him" : "Ej. Él / Him"}
                  className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-300 bg-white text-slate-900 focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                />
                {/* Dynamic Quick Presets */}
                <div className="flex flex-wrap items-center gap-1.5 mt-1.5">
                  {(profile.language === "en"
                    ? ["He / Him", "Él / Him", "She / Her", "Ella / Her", "They / Them"]
                    : ["Él / Him", "Él / Él", "Ella / Her", "Ella / Ella", "Elle / They"]
                  ).map((p) => {
                    const currentVal =
                      profile.language === "en"
                        ? profile.pronounsEn
                        : profile.pronounsEs;
                    return (
                      <button
                        key={p}
                        type="button"
                        onClick={() => {
                          if (profile.language === "en") {
                            updateField("pronounsEn", p);
                          } else {
                            updateField("pronounsEs", p);
                          }
                        }}
                        className={`text-[10px] px-2 py-0.5 rounded-md font-semibold border transition-colors cursor-pointer ${
                          currentVal === p
                            ? "bg-blue-100 text-blue-800 border-blue-300"
                            : "bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100"
                        }`}
                      >
                        {p}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* 2. DATOS DE CONTACTO */}
        <div className="border border-slate-200 rounded-xl overflow-hidden bg-white shadow-2xs">
          <button
            type="button"
            onClick={() => toggleSection("contact")}
            className="w-full px-3.5 py-2.5 bg-slate-50 hover:bg-slate-100 flex items-center justify-between text-xs font-bold text-slate-800 transition-colors border-b border-slate-100 cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <PhoneCall className="w-4 h-4 text-blue-600" />
              <span>{t.contactData}</span>
            </div>
            {openSections.contact ? (
              <ChevronUp className="w-4 h-4 text-slate-400" />
            ) : (
              <ChevronDown className="w-4 h-4 text-slate-400" />
            )}
          </button>

          {openSections.contact && (
            <div className="p-3.5 space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  {t.email}
                </label>
                <input
                  type="email"
                  value={profile.email || ""}
                  onChange={(e) => updateField("email", e.target.value)}
                  placeholder="alex.morgan@example.com"
                  className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-300 bg-white text-slate-900 focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  {t.officePhone}
                </label>
                <input
                  type="text"
                  value={profile.phone || ""}
                  onChange={(e) => updateField("phone", e.target.value)}
                  placeholder="+1 (555) 019-2834"
                  className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-300 bg-white text-slate-900 focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  {t.mobilePhone}
                </label>
                <input
                  type="text"
                  value={profile.mobile || ""}
                  onChange={(e) => updateField("mobile", e.target.value)}
                  placeholder="+1 (555) 014-9281"
                  className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-300 bg-white text-slate-900 focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  {t.website}
                </label>
                <input
                  type="url"
                  value={profile.website || ""}
                  onChange={(e) => updateField("website", e.target.value)}
                  placeholder="https://alexmorgan.dev"
                  className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-300 bg-white text-slate-900 focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  {t.address}
                </label>
                <input
                  type="text"
                  value={profile.address || ""}
                  onChange={(e) => updateField("address", e.target.value)}
                  placeholder="San Francisco, CA"
                  className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-300 bg-white text-slate-900 focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                />
              </div>
            </div>
          )}
        </div>

        {/* 3. REDES SOCIALES */}
        <div className="border border-slate-200 rounded-xl overflow-hidden bg-white shadow-2xs">
          <button
            type="button"
            onClick={() => toggleSection("social")}
            className="w-full px-3.5 py-2.5 bg-slate-50 hover:bg-slate-100 flex items-center justify-between text-xs font-bold text-slate-800 transition-colors border-b border-slate-100 cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <Share2 className="w-4 h-4 text-blue-600" />
              <span>{t.socialNetworks}</span>
            </div>
            {openSections.social ? (
              <ChevronUp className="w-4 h-4 text-slate-400" />
            ) : (
              <ChevronDown className="w-4 h-4 text-slate-400" />
            )}
          </button>

          {openSections.social && (
            <div className="p-3.5 space-y-3">
              <p className="text-[11px] text-slate-500 mb-2">
                {t.socialSubtext}
              </p>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  LinkedIn (Username)
                </label>
                <div className="flex items-center">
                  <span className="px-2.5 py-1.5 text-xs bg-slate-100 border border-r-0 border-slate-300 rounded-l-lg text-slate-500 font-mono">
                    in/
                  </span>
                  <input
                    type="text"
                    value={profile.linkedinUsername || ""}
                    onChange={(e) => handleUsernameChange("linkedin", e.target.value)}
                    placeholder="alexmorgan"
                    className="w-full px-3 py-1.5 text-xs rounded-r-lg border border-slate-300 bg-white text-slate-900 focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  GitHub (Username)
                </label>
                <div className="flex items-center">
                  <span className="px-2.5 py-1.5 text-xs bg-slate-100 border border-r-0 border-slate-300 rounded-l-lg text-slate-500 font-mono">
                    github.com/
                  </span>
                  <input
                    type="text"
                    value={profile.githubUsername || ""}
                    onChange={(e) => handleUsernameChange("github", e.target.value)}
                    placeholder="alexmorgan"
                    className="w-full px-3 py-1.5 text-xs rounded-r-lg border border-slate-300 bg-white text-slate-900 focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  X / Twitter (Username)
                </label>
                <div className="flex items-center">
                  <span className="px-2.5 py-1.5 text-xs bg-slate-100 border border-r-0 border-slate-300 rounded-l-lg text-slate-500 font-mono">
                    x.com/
                  </span>
                  <input
                    type="text"
                    value={profile.twitterUsername || ""}
                    onChange={(e) => handleUsernameChange("twitter", e.target.value)}
                    placeholder="alexmorgan"
                    className="w-full px-3 py-1.5 text-xs rounded-r-lg border border-slate-300 bg-white text-slate-900 focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Instagram (Username)
                </label>
                <div className="flex items-center">
                  <span className="px-2.5 py-1.5 text-xs bg-slate-100 border border-r-0 border-slate-300 rounded-l-lg text-slate-500 font-mono">
                    instagram.com/
                  </span>
                  <input
                    type="text"
                    value={profile.instagramUsername || ""}
                    onChange={(e) => handleUsernameChange("instagram", e.target.value)}
                    placeholder="alexmorgan"
                    className="w-full px-3 py-1.5 text-xs rounded-r-lg border border-slate-300 bg-white text-slate-900 focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                  />
                </div>
              </div>

              {/* Advanced URL Customization Subsection */}
              <details className="pt-2 border-t border-slate-100 text-xs text-slate-600">
                <summary className="cursor-pointer font-bold text-blue-600 flex items-center gap-1 select-none">
                  <Edit3 className="w-3.5 h-3.5" />
                  {t.editCustomUrls}
                </summary>
                <div className="mt-3 space-y-2.5 pl-1">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-0.5">LinkedIn URL</label>
                    <input
                      type="url"
                      value={profile.linkedin || ""}
                      onChange={(e) => updateField("linkedin", e.target.value)}
                      placeholder="https://linkedin.com/in/..."
                      className="w-full px-2.5 py-1 text-xs rounded-md border border-slate-300 bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-0.5">GitHub URL</label>
                    <input
                      type="url"
                      value={profile.github || ""}
                      onChange={(e) => updateField("github", e.target.value)}
                      placeholder="https://github.com/..."
                      className="w-full px-2.5 py-1 text-xs rounded-md border border-slate-300 bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-0.5">X / Twitter URL</label>
                    <input
                      type="url"
                      value={profile.twitter || ""}
                      onChange={(e) => updateField("twitter", e.target.value)}
                      placeholder="https://x.com/..."
                      className="w-full px-2.5 py-1 text-xs rounded-md border border-slate-300 bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-0.5">Instagram URL</label>
                    <input
                      type="url"
                      value={profile.instagram || ""}
                      onChange={(e) => updateField("instagram", e.target.value)}
                      placeholder="https://instagram.com/..."
                      className="w-full px-2.5 py-1 text-xs rounded-md border border-slate-300 bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-0.5">Portfolio URL</label>
                    <input
                      type="url"
                      value={profile.portfolio || ""}
                      onChange={(e) => updateField("portfolio", e.target.value)}
                      placeholder="https://alexmorgan.dev/portfolio"
                      className="w-full px-2.5 py-1 text-xs rounded-md border border-slate-300 bg-white"
                    />
                  </div>
                </div>
              </details>
            </div>
          )}
        </div>

        {/* 4. ESTILO Y COLORES */}
        <div className="border border-slate-200 rounded-xl overflow-hidden bg-white shadow-2xs">
          <button
            type="button"
            onClick={() => toggleSection("style")}
            className="w-full px-3.5 py-2.5 bg-slate-50 hover:bg-slate-100 flex items-center justify-between text-xs font-bold text-slate-800 transition-colors border-b border-slate-100 cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <Palette className="w-4 h-4 text-blue-600" />
              <span>{t.styleAndColors}</span>
            </div>
            {openSections.style ? (
              <ChevronUp className="w-4 h-4 text-slate-400" />
            ) : (
              <ChevronDown className="w-4 h-4 text-slate-400" />
            )}
          </button>

          {openSections.style && (
            <div className="p-3.5 space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  {t.presetPalettes}
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {COLOR_PRESETS.map((preset) => (
                    <button
                      key={preset.label}
                      type="button"
                      onClick={() =>
                        updateMultipleFields({
                          primaryColor: preset.primary,
                          secondaryColor: preset.secondary,
                        })
                      }
                      className={`p-2 rounded-lg border text-left flex items-center gap-2 transition-all cursor-pointer ${
                        profile.primaryColor === preset.primary
                          ? "border-blue-600 bg-blue-50/50 shadow-2xs"
                          : "border-slate-200 hover:bg-slate-50"
                      }`}
                    >
                      <div
                        className="w-4 h-4 rounded-full border border-black/10 shrink-0"
                        style={{ backgroundColor: preset.primary }}
                      />
                      <span className="text-[11px] font-medium text-slate-800 truncate">
                        {preset.label.split(" ")[0]}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    {t.primaryColor}
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={profile.primaryColor || "#2563eb"}
                      onChange={(e) => updateField("primaryColor", e.target.value)}
                      className="w-8 h-8 rounded-lg border border-slate-300 cursor-pointer"
                    />
                    <input
                      type="text"
                      value={profile.primaryColor || "#2563eb"}
                      onChange={(e) => updateField("primaryColor", e.target.value)}
                      className="w-full px-2 py-1 text-xs font-mono rounded-lg border border-slate-300 bg-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    {t.secondaryColor}
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={profile.textColor || "#1e293b"}
                      onChange={(e) => updateField("textColor", e.target.value)}
                      className="w-8 h-8 rounded-lg border border-slate-300 cursor-pointer"
                    />
                    <input
                      type="text"
                      value={profile.textColor || "#1e293b"}
                      onChange={(e) => updateField("textColor", e.target.value)}
                      className="w-full px-2 py-1 text-xs font-mono rounded-lg border border-slate-300 bg-white"
                    />
                  </div>
                </div>
              </div>

              {/* Dynamic WCAG Dark Mode Contrast Audit & Auto-Adjust Banner */}
              {(() => {
                const primaryHex = profile.primaryColor || "#2563eb";
                const isCompliant = isDarkModeCompliant(primaryHex);
                const primaryContrastRatio = getContrastRatio(primaryHex, "#1e1e1e");
                return isCompliant ? (
                  <div className="flex items-center gap-1.5 text-[11px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 p-2.5 rounded-xl">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>
                      {appLocale === "es"
                        ? `Contraste Óptimo (Ratio ${primaryContrastRatio}:1 vs Modo Oscuro)`
                        : `Optimal Contrast (Ratio ${primaryContrastRatio}:1 vs Dark Mode)`}
                    </span>
                  </div>
                ) : (
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 p-2.5 rounded-xl border bg-amber-50 border-amber-200 text-amber-900">
                    <div className="flex items-center gap-1.5 text-[11px] font-semibold">
                      <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
                      <span>
                        {appLocale === "es"
                          ? `Bajo contraste en Modo Oscuro (Ratio ${primaryContrastRatio}:1 < 4.5:1)`
                          : `Low contrast in Dark Mode (Ratio ${primaryContrastRatio}:1 < 4.5:1)`}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        const fixed = autoFixForDarkMode(primaryHex);
                        updateField("primaryColor", fixed);
                        toast.success(
                          appLocale === "es"
                            ? "Tono ajustado para alto contraste en Modo Oscuro"
                            : "Color adjusted for high contrast in Dark Mode"
                        );
                      }}
                      className="px-2.5 py-1 text-[11px] font-bold rounded-lg bg-amber-600 hover:bg-amber-700 text-white shadow-2xs transition-colors whitespace-nowrap cursor-pointer"
                    >
                      {appLocale === "es" ? "Auto-Ajustar Tono" : "Auto-Adjust Hue"}
                    </button>
                  </div>
                );
              })()}

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  {t.fontFamily}
                </label>
                <select
                  value={profile.fontFamily || "Arial, sans-serif"}
                  onChange={(e) => updateField("fontFamily", e.target.value)}
                  className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-300 bg-white text-slate-900 focus:ring-2 focus:ring-blue-500 focus:outline-hidden cursor-pointer"
                >
                  <option value="Arial, sans-serif">Arial (Clean & Modern)</option>
                  <option value="Helvetica, sans-serif">Helvetica (Corporate)</option>
                  <option value="Georgia, serif">Georgia (Elegant Serif)</option>
                  <option value="Trebuchet MS, sans-serif">Trebuchet MS (Dynamic)</option>
                  <option value="Verdana, sans-serif">Verdana (Readable)</option>
                  <option value="Courier New, monospace">Courier New (Developer Monospace)</option>
                </select>
              </div>
            </div>
          )}
        </div>

        {/* 5. EXTRAS E INSIGNIAS */}
        <div className="border border-slate-200 rounded-xl overflow-hidden bg-white shadow-2xs">
          <button
            type="button"
            onClick={() => toggleSection("extras")}
            className="w-full px-3.5 py-2.5 bg-slate-50 hover:bg-slate-100 flex items-center justify-between text-xs font-bold text-slate-800 transition-colors border-b border-slate-100 cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-blue-600" />
              <span>{t.extrasAndLegal}</span>
            </div>
            {openSections.extras ? (
              <ChevronUp className="w-4 h-4 text-slate-400" />
            ) : (
              <ChevronDown className="w-4 h-4 text-slate-400" />
            )}
          </button>

          {openSections.extras && (
            <div className="p-3.5 space-y-4">
              {/* INSIGNIA DE ESTADO / BUSQUEDA DE EMPLEO */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1.5">
                  <Briefcase className="w-3.5 h-3.5 text-blue-600" />
                  {t.statusBadgeLabel}
                </label>
                <input
                  type="text"
                  value={profile.statusBadge || ""}
                  onChange={(e) => updateField("statusBadge", e.target.value)}
                  placeholder="Ex. ● Open to new career opportunities"
                  className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-300 bg-white text-slate-900 focus:ring-2 focus:ring-blue-500 focus:outline-hidden mb-2"
                />

                {/* Badge Presets */}
                <span className="block text-[11px] font-medium text-slate-500 mb-1.5">
                  {t.statusBadgeSubtext}
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {activeBadgePresets.map((preset) => (
                    <button
                      key={preset.label}
                      type="button"
                      onClick={() => updateField("statusBadge", preset.value)}
                      className={`text-left px-2.5 py-1 rounded-lg border text-xs transition-colors cursor-pointer ${
                        profile.statusBadge === preset.value
                          ? "bg-emerald-50 text-emerald-800 border-emerald-300 font-bold"
                          : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                      }`}
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* LEGAL DISCLAIMER SECTION */}
              <div className="pt-2 border-t border-slate-100">
                <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
                  {t.disclaimerLabel}
                </label>
                <textarea
                  rows={3}
                  value={profile.disclaimer || ""}
                  onChange={(e) => updateField("disclaimer", e.target.value)}
                  placeholder="This email and any attachments are confidential..."
                  className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-300 bg-white text-slate-900 focus:ring-2 focus:ring-blue-500 focus:outline-hidden resize-none mb-2"
                />

                {/* Selectable Presets for Legal Disclaimer */}
                <span className="block text-[11px] font-medium text-slate-500 mb-1.5">
                  {t.disclaimerSubtext}
                </span>
                <div className="flex flex-col gap-1.5">
                  {DISCLAIMER_PRESETS.map((preset) => (
                    <button
                      key={preset.title}
                      type="button"
                      onClick={() => updateField("disclaimer", preset.value)}
                      className={`text-left px-2.5 py-1.5 rounded-lg border text-xs transition-all cursor-pointer ${
                        profile.disclaimer === preset.value
                          ? "bg-blue-50 text-blue-800 border-blue-300 font-bold"
                          : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                      }`}
                    >
                      <span className="font-bold block text-[11px]">{preset.title}</span>
                      {preset.value && (
                        <span className="text-[10px] text-slate-500 line-clamp-1 block">
                          {preset.value}
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Sticky Save Bar with Export / Import JSON & Reset Data */}
      <div className="p-4 border-t border-slate-200 bg-white shrink-0 flex flex-col gap-2.5 shadow-md">
        <div className="flex items-center justify-between text-[11px] text-slate-500">
          <span>{t.localServerSync}</span>
        </div>

        {/* Primary Save Button */}
        <button
          type="button"
          onClick={handleSaveData}
          className="w-full py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-xs rounded-xl shadow-xs flex items-center justify-center gap-2 transition-all transform active:scale-95 cursor-pointer"
        >
          {isSaved ? <Check className="w-4 h-4" /> : <Save className="w-4 h-4" />}
          <span>{isSaved ? t.savedSuccess : t.saveChanges}</span>
        </button>

        {/* Action Row: Export, Import & Reset */}
        <div className="grid grid-cols-3 gap-1.5 pt-1">
          <button
            type="button"
            onClick={handleExportJson}
            className="py-2 px-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl border border-slate-200 flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            title={appLocale === "es" ? "Exportar todos los datos (Español e Inglés)" : "Export full data (Spanish & English)"}
          >
            <Download className="w-3.5 h-3.5 text-blue-600 shrink-0" />
            <span className="truncate">{t.exportJson}</span>
          </button>
          <button
            type="button"
            onClick={handleImportJsonClick}
            className="py-2 px-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl border border-slate-200 flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            title={appLocale === "es" ? "Importar perfil de respaldo JSON" : "Import JSON profile backup"}
          >
            <Upload className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
            <span className="truncate">{t.importJson}</span>
          </button>
          <button
            type="button"
            onClick={() => {
              if (onResetProfile) {
                onResetProfile();
              } else if (window.confirm(translations[appLocale].resetConfirm)) {
                onChange(DEFAULT_PROFILE);
                try {
                  localStorage.setItem("signature_craft_profile_v2", JSON.stringify(DEFAULT_PROFILE));
                } catch (e) {}
                toast.success("Profile reset to defaults");
              }
            }}
            className="py-2 px-2 bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold text-xs rounded-xl border border-rose-200 flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            title={appLocale === "es" ? "Restablecer todos los datos por defecto" : "Reset profile to default data"}
          >
            <RotateCcw className="w-3.5 h-3.5 text-rose-600 shrink-0" />
            <span className="truncate">{t.resetData}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
