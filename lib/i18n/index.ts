export type Locale = "es" | "en";

export const translations = {
  es: {
    appTitle: "SignatureCraft",
    appSubtitle: "Generador Profesional de Firmas HTML para Correo Electrónico",
    versionBadge: "v1.1.0",
    openSource: "Open Source",
    antiSpam: "100% Anti-Spam HTML",
    myProfileData: "Mis Datos",
    hideProfileData: "Ocultar Mis Datos",
    showProfileData: "Mostrar Mis Datos",
    localServerSync: "LocalStorage",
    
    // Header
    searchPlaceholder: "Buscar plantilla...",
    allCategories: "Todos",
    executive: "Ejecutivo",
    minimalist: "Minimalista",
    corporate: "Corporativo",
    technology: "Tecnología",
    creative: "Creativo",
    resetData: "Restablecer Datos",
    resetConfirm: "¿Deseas restablecer todos los datos por defecto?",
    templateDirectory: "Directorio de Firmas HTML (Anti-Spam)",
    templateCount: "10 Plantillas",
    templateSubtext: "Cada plantilla cuenta con su propia vista previa Gmail, modo claro/oscuro y botón de copiado 1-clic.",

    // Sidebar Sections
    personalInfo: "Información Personal",
    contactData: "Datos de Contacto",
    socialNetworks: "Redes Sociales",
    styleAndColors: "Estilo y Colores",
    extrasAndLegal: "Insignia de Estado y Aviso Legal",
    languageSelector: "Idioma de la Firma (Language)",
    
    // Form Labels
    fullName: "Nombre Completo *",
    jobTitle: "Cargo / Puesto *",
    companyName: "Empresa / Organización *",
    department: "Departamento",
    pronombres: "Pronombres",
    email: "Correo Electrónico *",
    officePhone: "Teléfono Fijo / Oficina",
    mobilePhone: "Teléfono Móvil / WhatsApp",
    website: "Sitio Web",
    address: "Ubicación / Dirección",
    
    // Social
    socialSubtext: "Ingresa tu nombre de usuario y se generará automáticamente tu URL. También puedes editar la URL completa abajo.",
    editCustomUrls: "Editar URLs Completas (Personalizado)",
    
    // Style
    presetPalettes: "Paleta de Colores Predefinida",
    primaryColor: "Color Principal (Acento)",
    secondaryColor: "Color Secundario (Texto)",
    fontFamily: "Tipografía de la Firma",

    // Extras
    statusBadgeLabel: "Insignia de Estado Profesional (Job Seeker / Availability)",
    statusBadgeSubtext: "Insignias profesionales sugeridas (Haz clic para seleccionar):",
    disclaimerLabel: "Aviso Legal / Confidencialidad (Disclaimer Editable)",
    disclaimerSubtext: "Opciones legales predefinidas (Haz clic para aplicar o edita arriba):",

    // Actions & Buttons
    saveChanges: "Guardar Cambios",
    savedSuccess: "¡Guardado con Éxito!",
    exportJson: "Exportar",
    importJson: "Importar",
    copyForGmail: "Copiar para Gmail",
    copiedSignature: "¡Firma Copiada!",
    copyRaw: "Copiar Raw",
    copied: "¡Copiado!",
    viewCode: "Ver Código",
    downloadHtml: "Descargar HTML (.html)",
    lightMode: "Modo Claro",
    darkMode: "Modo Oscuro",
    desktopView: "Vista de Escritorio",
    mobileView: "Vista Móvil",

    // Toasts
    toastSavedTitle: "¡Datos guardados con éxito!",
    toastSavedDesc: "Sincronizado en LocalStorage del navegador",
    toastExportTitle: "¡Configuración exportada!",
    toastImportTitle: "¡Perfil importado con éxito!",
    toastCopyGmailTitle: "¡Firma copiada para Gmail!",
    toastCopyGmailStep1: "1. Ve a Gmail > Configuración > Ver todos los ajustes > Firma.",
    toastCopyGmailStep2: "2. Haz clic en la casilla y presiona",

    // Empty state
    noTemplatesFound: "No se encontraron plantillas con ese filtro.",
    resetFilters: "Restablecer filtros",

    // Modal
    codeModalTitle: "Código HTML de la Firma",
    codeModalSubtext: "Código HTML inline compatible con Gmail, Outlook y Thunderbird.",
    closeModal: "Cerrar",

    // Changelog Modal
    changelogTitle: "Notas de la Versión SignatureCraft v1.1.0",
    changelogSubtitle: "Actualización de Funcionalidades y Accesibilidad WCAG",
    changelogSummary: "SignatureCraft v1.1.0 incorpora un visualizador de código inline estilo VSCode, motor de cálculo de contraste WCAG 2.1 con auto-ajuste de tono, diseño fluido panorámico y persistencia 100% en el cliente.",
    changelogClose: "Cerrar Notas de la Versión",

    // Footer
    footerCopy: "SignatureCraft © 2026",
    footerDetails: "100% Firmas HTML en White Mode sin imágenes para Gmail & Outlook.",
  },
  en: {
    appTitle: "SignatureCraft",
    appSubtitle: "Professional HTML Email Signature Generator",
    versionBadge: "v1.0.0",
    openSource: "Open Source",
    antiSpam: "100% Anti-Spam HTML",
    myProfileData: "My Profile",
    hideProfileData: "Hide My Profile",
    showProfileData: "Show My Profile",
    localServerSync: "LocalStorage",
    
    // Header
    searchPlaceholder: "Search templates...",
    allCategories: "All",
    executive: "Executive",
    minimalist: "Minimalist",
    corporate: "Corporate",
    technology: "Technology",
    creative: "Creative",
    resetData: "Reset Data",
    resetConfirm: "Are you sure you want to reset profile data to defaults?",
    templateDirectory: "HTML Signature Directory (Anti-Spam)",
    templateCount: "10 Templates",
    templateSubtext: "Each template features its own Gmail preview window, light/dark mode switch, and 1-click copy button.",

    // Sidebar Sections
    personalInfo: "Personal Information",
    contactData: "Contact Details",
    socialNetworks: "Social Networks",
    styleAndColors: "Style & Colors",
    extrasAndLegal: "Status Badge & Legal Disclaimer",
    languageSelector: "Signature Language",
    
    // Form Labels
    fullName: "Full Name *",
    jobTitle: "Job Title *",
    companyName: "Company / Organization *",
    department: "Department",
    pronombres: "Pronouns",
    email: "Email Address *",
    officePhone: "Office Phone",
    mobilePhone: "Mobile / WhatsApp",
    website: "Website",
    address: "Location / Address",
    
    // Social
    socialSubtext: "Enter your username to auto-generate standard profile URLs, or expand below to customize full URLs.",
    editCustomUrls: "Edit Full URLs (Custom)",
    
    // Style
    presetPalettes: "Preset Color Palettes",
    primaryColor: "Primary Color (Accent)",
    secondaryColor: "Secondary Color (Text)",
    fontFamily: "Signature Font Family",

    // Extras
    statusBadgeLabel: "Professional Status Badge (Job Seeker / Availability)",
    statusBadgeSubtext: "Suggested professional badges (Click to select):",
    disclaimerLabel: "Legal & Confidentiality Disclaimer (Editable)",
    disclaimerSubtext: "Preset legal notices (Click to apply or edit above):",

    // Actions & Buttons
    saveChanges: "Save Changes",
    savedSuccess: "Saved Successfully!",
    exportJson: "Export",
    importJson: "Import",
    copyForGmail: "Copy for Gmail",
    copiedSignature: "Signature Copied!",
    copyRaw: "Copy Raw",
    copied: "Copied!",
    viewCode: "View Code",
    downloadHtml: "Download HTML (.html)",
    lightMode: "Light Mode",
    darkMode: "Dark Mode",
    desktopView: "Desktop View",
    mobileView: "Mobile View",

    // Toasts
    toastSavedTitle: "Data saved successfully!",
    toastSavedDesc: "Synchronized in browser LocalStorage",
    toastExportTitle: "Configuration exported!",
    toastImportTitle: "Profile imported successfully!",
    toastCopyGmailTitle: "Signature copied for Gmail!",
    toastCopyGmailStep1: "1. Go to Gmail > Settings > See all settings > Signature.",
    toastCopyGmailStep2: "2. Click in the signature field and press",

    // Empty state
    noTemplatesFound: "No templates found matching filters.",
    resetFilters: "Reset filters",

    // Modal
    codeModalTitle: "Signature HTML Code",
    codeModalSubtext: "Inline HTML code fully compatible with Gmail, Outlook, and Thunderbird.",
    closeModal: "Close",

    // Changelog Modal
    changelogTitle: "SignatureCraft v1.1.0 Release Notes",
    changelogSubtitle: "Feature & WCAG Accessibility Release",
    changelogSummary: "SignatureCraft v1.1.0 brings an inline VSCode-style code viewer, WCAG 2.1 contrast calculation engine with auto-hue adjustment, fluid widescreen layout, and 100% client LocalStorage persistence.",
    changelogClose: "Close Release Notes",

    // Footer
    footerCopy: "SignatureCraft © 2026",
    footerDetails: "100% Anti-Spam HTML Signatures for Gmail & Outlook.",
  },
};
