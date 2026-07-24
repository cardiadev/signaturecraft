"use client";

import React from "react";
import { Mail, ShieldCheck, PanelRightOpen, PanelRightClose } from "lucide-react";
import { Locale, translations } from "@/lib/i18n";

interface HeaderProps {
  appLocale: Locale;
  onSetAppLocale: (locale: Locale) => void;
  isDrawerOpen: boolean;
  onToggleDrawer: () => void;
}

export function Header({
  appLocale,
  onSetAppLocale,
  isDrawerOpen,
  onToggleDrawer,
}: HeaderProps) {
  const t = translations[appLocale];

  return (
    <header className="border-b border-slate-200 bg-white sticky top-0 z-40 shadow-xs select-none w-full">
      <div className="w-full px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Left: Logo & App Title */}
        <div className="flex items-center space-x-3">
          <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-xs">
            <Mail className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-bold text-base text-slate-900 leading-none">
                {t.appTitle}
              </h1>
              <span className="hidden sm:inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                <ShieldCheck className="w-3 h-3 text-emerald-600" />
                {t.antiSpam}
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              {t.appSubtitle}
            </p>
          </div>
        </div>

        {/* Right: Only Global App i18n Language Toggle & Profile Drawer Toggle */}
        <div className="flex items-center space-x-3">
          {/* Top Global i18n Language Switcher */}
          <div className="flex items-center p-0.5 rounded-xl border border-slate-200 bg-slate-50 shadow-2xs">
            <button
              type="button"
              onClick={() => onSetAppLocale("es")}
              className={`px-2.5 py-1 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                appLocale === "es"
                  ? "bg-blue-600 text-white shadow-2xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
              title="Español (ES)"
            >
              ES
            </button>
            <button
              type="button"
              onClick={() => onSetAppLocale("en")}
              className={`px-2.5 py-1 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                appLocale === "en"
                  ? "bg-blue-600 text-white shadow-2xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
              title="English (EN)"
            >
              EN
            </button>
          </div>

          <div className="h-6 w-px bg-slate-200 hidden sm:block" />

          {/* Profile Sidebar Drawer Toggle Button */}
          <button
            onClick={onToggleDrawer}
            className={`px-3.5 py-1.5 rounded-xl border font-bold text-xs flex items-center gap-1.5 transition-all shadow-xs cursor-pointer ${
              isDrawerOpen
                ? "bg-blue-600 text-white border-blue-600"
                : "bg-white text-slate-700 border-slate-200 hover:bg-slate-100"
            }`}
            title={isDrawerOpen ? t.hideProfileData : t.showProfileData}
          >
            {isDrawerOpen ? (
              <PanelRightClose className="w-4 h-4" />
            ) : (
              <PanelRightOpen className="w-4 h-4 text-blue-600" />
            )}
            <span>{t.myProfileData}</span>
          </button>
        </div>
      </div>
    </header>
  );
}
