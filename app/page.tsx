"use client";

import React, { useState, useEffect, useMemo } from "react";
import { Header } from "@/components/header";
import { SignatureForm } from "@/components/signature-form";
import { TemplateCard } from "@/components/template-card";
import { ChangelogModal } from "@/components/changelog-modal";
import { TEMPLATES } from "@/lib/templates";
import { DEFAULT_PROFILE, SignatureProfile } from "@/lib/templates/types";
import { Locale, translations } from "@/lib/i18n";
import {
  SidebarProvider,
  SidebarInset,
  Sidebar,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import { Search, Filter, Sparkles } from "lucide-react";

function MainDashboard() {
  const [profile, setProfile] = useState<SignatureProfile>(DEFAULT_PROFILE);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");
  const [isChangelogOpen, setIsChangelogOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { open, toggleSidebar } = useSidebar();

  // App Locale State (EN / ES) - Decoupled from Signature Profile Language
  const [appLocale, setAppLocale] = useState<Locale>("es");

  useEffect(() => {
    setMounted(true);
    // Load appLocale from LocalStorage
    try {
      const savedLocale = localStorage.getItem("signature_craft_app_locale_v1") as Locale;
      if (savedLocale === "en" || savedLocale === "es") {
        setAppLocale(savedLocale);
      }
    } catch (e) {}

    // Load profile from LocalStorage
    try {
      const savedProfileStr = localStorage.getItem("signature_craft_profile_v2");
      if (savedProfileStr) {
        const parsed = JSON.parse(savedProfileStr);
        if (parsed && typeof parsed === "object") {
          setProfile({ ...DEFAULT_PROFILE, ...parsed });
        }
      }
    } catch (e) {}
  }, []);

  const handleSetAppLocale = (newLocale: Locale) => {
    setAppLocale(newLocale);
    try {
      localStorage.setItem("signature_craft_app_locale_v1", newLocale);
    } catch (e) {}
  };

  const handleUpdateProfile = (newProfile: SignatureProfile) => {
    setProfile(newProfile);
  };

  const handleResetProfile = () => {
    const t = translations[appLocale];
    if (window.confirm(t.resetConfirm)) {
      setProfile(DEFAULT_PROFILE);
      try {
        localStorage.setItem("signature_craft_profile_v2", JSON.stringify(DEFAULT_PROFILE));
      } catch (e) {}
    }
  };

  const t = translations[appLocale];

  const categories = useMemo(() => {
    const rawCats = Array.from(new Set(TEMPLATES.map((tmpl) => tmpl.category)));
    return [
      { id: "ALL", label: t.allCategories },
      ...rawCats.map((cat) => ({ id: cat, label: cat })),
    ];
  }, [t.allCategories]);

  const filteredTemplates = useMemo(() => {
    return TEMPLATES.filter((tmpl) => {
      const matchesCategory =
        selectedCategory === "ALL" || tmpl.category === selectedCategory;
      const matchesSearch =
        tmpl.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tmpl.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, selectedCategory]);

  if (!mounted) return null;

  return (
    <div className="h-screen w-screen flex flex-col bg-slate-50 text-slate-900 font-sans overflow-hidden">
      {/* Changelog Modal */}
      <ChangelogModal
        isOpen={isChangelogOpen}
        onClose={() => setIsChangelogOpen(false)}
        locale={appLocale}
      />

      {/* Independent Widescreen Fluid Header */}
      <Header
        appLocale={appLocale}
        onSetAppLocale={handleSetAppLocale}
        isDrawerOpen={open}
        onToggleDrawer={toggleSidebar}
      />

      {/* Main Workspace (Widescreen Fluid Layout) */}
      <div className="flex-1 flex w-full overflow-hidden">
        {/* Main Content Area */}
        <SidebarInset className="flex-1 h-full overflow-y-auto scrollbar-thin">
          <div className="p-4 sm:p-6 space-y-6">
            {/* Filter Toolbar */}
            <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-4">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-xl font-bold text-slate-900">
                      {t.templateDirectory}
                    </h2>
                    <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                      {t.templateCount}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-1">
                    {t.templateSubtext}
                  </p>
                </div>

                <SidebarTrigger />
              </div>

              {/* Filter Pills & Search */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-2 border-t border-slate-100">
                <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none pb-1 sm:pb-0">
                  <Filter className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  {categories.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.id)}
                      className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all whitespace-nowrap cursor-pointer ${
                        selectedCategory === cat.id
                          ? "bg-blue-600 text-white shadow-xs"
                          : "bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900"
                      }`}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>

                {/* Search Bar */}
                <div className="relative shrink-0">
                  <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={t.searchPlaceholder}
                    className="pl-8 pr-3 py-1.5 text-xs rounded-xl border border-slate-200 bg-slate-50 text-slate-900 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-hidden w-full sm:w-64"
                  />
                </div>
              </div>
            </div>

            {/* Grid of Template Cards */}
            <div className="space-y-6">
              {filteredTemplates.map((template) => (
                <TemplateCard
                  key={template.id}
                  template={template}
                  profile={profile}
                  appLocale={appLocale}
                />
              ))}

              {filteredTemplates.length === 0 && (
                <div className="bg-white border border-slate-200 rounded-2xl p-8 text-center space-y-2">
                  <p className="text-sm font-semibold text-slate-700">
                    {t.noTemplatesFound}
                  </p>
                  <button
                    onClick={() => {
                      setSelectedCategory("ALL");
                      setSearchQuery("");
                    }}
                    className="text-xs text-blue-600 font-semibold hover:underline cursor-pointer"
                  >
                    {t.resetFilters}
                  </button>
                </div>
              )}
            </div>

            {/* App Footer at Bottom of Main Page Scroll Stream */}
            <footer className="border border-slate-200 bg-white rounded-2xl p-4 text-center text-xs text-slate-500 flex items-center justify-between flex-wrap gap-2 shadow-xs mt-8 mb-4">
              <div className="flex items-center gap-2">
                <span>{t.footerCopy}</span>
                <span>&bull;</span>
                <button
                  type="button"
                  onClick={() => setIsChangelogOpen(true)}
                  className="inline-flex items-center gap-1 font-bold text-blue-600 hover:text-blue-800 hover:underline cursor-pointer"
                  title="View Release Notes"
                >
                  <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                  <span>v1.1.0</span>
                </button>
              </div>
              <span>{t.footerDetails}</span>
            </footer>
          </div>
        </SidebarInset>

        {/* Official Shadcn Sidebar (Right Side - Independent Profile Container) */}
        <Sidebar side="right" className="h-full border-l border-slate-200 bg-white">
          <SignatureForm
            profile={profile}
            onChange={handleUpdateProfile}
            onResetProfile={handleResetProfile}
            onCloseDrawer={toggleSidebar}
            appLocale={appLocale}
          />
        </Sidebar>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <SidebarProvider defaultOpen={true}>
      <MainDashboard />
    </SidebarProvider>
  );
}
