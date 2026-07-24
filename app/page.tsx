"use client";

import React, { useState, useEffect } from "react";
import { Header } from "@/components/header";
import { SignatureForm } from "@/components/signature-form";
import { TemplateCard } from "@/components/template-card";
import { ChangelogModal } from "@/components/changelog-modal";
import { DEFAULT_PROFILE, SignatureProfile } from "@/lib/templates/types";
import { TEMPLATES } from "@/lib/templates";
import { translations, Locale } from "@/lib/i18n";
import {
  SidebarProvider,
  Sidebar,
  SidebarInset,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import { Filter, Search, Sparkles } from "lucide-react";

const STORAGE_KEY = "signature_craft_profile_v2";
const APP_LOCALE_KEY = "signature_craft_app_locale_v1";

function MainDashboard() {
  const [profile, setProfile] = useState<SignatureProfile>(DEFAULT_PROFILE);
  const [appLocale, setAppLocale] = useState<Locale>("en");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isChangelogOpen, setIsChangelogOpen] = useState<boolean>(false);
  const [mounted, setMounted] = useState(false);
  const { open, toggleSidebar } = useSidebar();

  const t = translations[appLocale];

  const handleSetAppLocale = (newLocale: Locale) => {
    setAppLocale(newLocale);
    try {
      localStorage.setItem(APP_LOCALE_KEY, newLocale);
    } catch (e) {}
  };

  useEffect(() => {
    setMounted(true);

    try {
      const savedAppLocale = localStorage.getItem(APP_LOCALE_KEY) as Locale;
      if (savedAppLocale && (savedAppLocale === "en" || savedAppLocale === "es")) {
        setAppLocale(savedAppLocale);
      }
    } catch (e) {}

    try {
      const savedProfile = localStorage.getItem(STORAGE_KEY);
      if (savedProfile) {
        const parsed = JSON.parse(savedProfile);
        setProfile({ ...DEFAULT_PROFILE, ...parsed });
      }
    } catch (e) {
      console.error("Error reading LocalStorage: ", e);
    }
  }, []);

  const handleUpdateProfile = (updated: SignatureProfile) => {
    setProfile(updated);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch (e) {}
  };

  const handleResetProfile = () => {
    if (window.confirm(appLocale === "es" ? "¿Deseas restablecer los datos?" : "Are you sure you want to reset profile data to defaults?")) {
      handleUpdateProfile(DEFAULT_PROFILE);
    }
  };

  const categories = [t.allCategories, t.executive, t.minimalist, t.corporate, t.technology, t.creative];

  const filteredTemplates = TEMPLATES.filter((template) => {
    const matchesCategory =
      selectedCategory === "All" ||
      selectedCategory === "Todos" ||
      selectedCategory === t.allCategories ||
      template.category === selectedCategory;

    const matchesSearch =
      template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      template.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

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
        <SidebarInset className="flex-1 h-full overflow-y-auto p-4 sm:p-6 space-y-6 scrollbar-thin">
          <div className="w-full space-y-6">
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
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all whitespace-nowrap cursor-pointer ${
                        selectedCategory === cat
                          ? "bg-blue-600 text-white shadow-xs"
                          : "bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900"
                      }`}
                    >
                      {cat}
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
            <div className="space-y-6 pb-6">
              {filteredTemplates.map((template) => (
                <TemplateCard
                  key={template.id}
                  template={template}
                  profile={profile}
                />
              ))}

              {filteredTemplates.length === 0 && (
                <div className="bg-white border border-slate-200 rounded-2xl p-8 text-center space-y-2">
                  <p className="text-sm font-semibold text-slate-700">
                    {t.noTemplatesFound}
                  </p>
                  <button
                    onClick={() => {
                      setSelectedCategory(t.allCategories);
                      setSearchQuery("");
                    }}
                    className="text-xs text-blue-600 font-semibold hover:underline cursor-pointer"
                  >
                    {t.resetFilters}
                  </button>
                </div>
              )}
            </div>
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

      {/* App Footer Sticky to Viewport Bottom with Version & Changelog Trigger */}
      <footer className="shrink-0 border-t border-slate-200 bg-white py-2.5 px-4 text-center text-xs text-slate-500 z-30 flex items-center justify-center gap-1.5 flex-wrap">
        <span>{t.footerCopy}</span>
        <span>&bull;</span>
        <button
          type="button"
          onClick={() => setIsChangelogOpen(true)}
          className="inline-flex items-center gap-1 font-bold text-blue-600 hover:text-blue-800 hover:underline cursor-pointer"
          title="View Release Notes"
        >
          <Sparkles className="w-3 h-3 text-blue-600" />
          <span>v1.0.0</span>
        </button>
        <span>&bull;</span>
        <span>{t.footerDetails}</span>
      </footer>
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
