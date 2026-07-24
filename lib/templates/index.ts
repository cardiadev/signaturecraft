import { SignatureProfile, SignatureTemplate } from "./types";

/**
 * Helpers for clickable contact links
 */
function cleanPhoneForTel(phone: string): string {
  return phone.replace(/[^\d+]/g, "");
}

function renderEmailLink(email: string, color: string): string {
  if (!email) return "";
  return `<a href="mailto:${email}" style="color: ${color}; text-decoration: none;">${email}</a>`;
}

function renderPhoneLink(phone: string, color: string): string {
  if (!phone) return "";
  const tel = cleanPhoneForTel(phone);
  return `<a href="tel:${tel}" style="color: ${color}; text-decoration: none;">${phone}</a>`;
}

function renderMobileLink(mobile: string, color: string): string {
  if (!mobile) return "";
  const tel = cleanPhoneForTel(mobile);
  return `<a href="tel:${tel}" style="color: ${color}; text-decoration: none;">${mobile}</a>`;
}

function renderWebLink(website: string, color: string): string {
  if (!website) return "";
  const url = website.startsWith("http") ? website : `https://${website}`;
  const display = website.replace(/^https?:\/\//, "");
  return `<a href="${url}" target="_blank" style="color: ${color}; text-decoration: none; font-weight: 600;">${display}</a>`;
}

/**
 * Responsive CSS Styles embedded into HTML Email templates
 * Desktop: Single horizontal elegant row with separators
 * Mobile (<480px): Stacks items into clean single-row blocks automatically
 */
const RESPONSIVE_EMAIL_CSS = `
<style type="text/css">
  @media only screen and (max-width: 480px) {
    .sig-item {
      display: block !important;
      margin-right: 0 !important;
      margin-bottom: 5px !important;
      white-space: normal !important;
      width: 100% !important;
    }
    .sig-sep {
      display: none !important;
    }
  }
</style>
`.trim();

/**
 * Social Links (Desktop: Horizontal with | dividers. Mobile: Responsive Stacking)
 */
function renderSocialLinks(data: SignatureProfile): string {
  const links = [];
  if (data.linkedin) {
    links.push(`
      <span class="sig-item" style="display: inline-block; white-space: nowrap;">
        <a href="${data.linkedin}" target="_blank" style="color: ${data.primaryColor}; text-decoration: none; font-weight: 700; font-size: 11px; letter-spacing: 0.5px; text-transform: uppercase;">
          LinkedIn
        </a>
      </span>
    `);
  }
  if (data.github) {
    links.push(`
      <span class="sig-item" style="display: inline-block; white-space: nowrap;">
        <a href="${data.github}" target="_blank" style="color: ${data.primaryColor}; text-decoration: none; font-weight: 700; font-size: 11px; letter-spacing: 0.5px; text-transform: uppercase;">
          GitHub
        </a>
      </span>
    `);
  }
  if (data.twitter) {
    links.push(`
      <span class="sig-item" style="display: inline-block; white-space: nowrap;">
        <a href="${data.twitter}" target="_blank" style="color: ${data.primaryColor}; text-decoration: none; font-weight: 700; font-size: 11px; letter-spacing: 0.5px; text-transform: uppercase;">
          X / Twitter
        </a>
      </span>
    `);
  }
  if (data.instagram) {
    links.push(`
      <span class="sig-item" style="display: inline-block; white-space: nowrap;">
        <a href="${data.instagram}" target="_blank" style="color: ${data.primaryColor}; text-decoration: none; font-weight: 700; font-size: 11px; letter-spacing: 0.5px; text-transform: uppercase;">
          Instagram
        </a>
      </span>
    `);
  }
  if (data.portfolio) {
    links.push(`
      <span class="sig-item" style="display: inline-block; white-space: nowrap;">
        <a href="${data.portfolio}" target="_blank" style="color: ${data.primaryColor}; text-decoration: none; font-weight: 700; font-size: 11px; letter-spacing: 0.5px; text-transform: uppercase;">
          Portfolio
        </a>
      </span>
    `);
  }
  return links.join(`<span class="sig-sep" style="color: ${data.secondaryColor}; font-weight: normal; margin: 0 8px;">|</span>`);
}

/**
 * Clean plain green text status badge helper
 */
function renderStatusBadgeHtml(data: SignatureProfile): string {
  if (!data.statusBadge) return "";
  return `
    <div style="margin-top: 6px; font-size: 11px; color: #10b981; font-weight: 700; letter-spacing: 0.2px;">
      ${data.statusBadge}
    </div>
  `;
}

/**
 * Helper to render legal disclaimer notice
 */
function renderDisclaimerHtml(data: SignatureProfile): string {
  if (!data.disclaimer) return "";
  return `
    <div style="margin-top: 10px; padding-top: 6px; border-top: 1px dashed ${data.secondaryColor}; font-size: 10px; color: ${data.secondaryColor}; line-height: 1.35; opacity: 0.85;">
      ${data.disclaimer}
    </div>
  `;
}

/**
 * 1. EXECUTIVE SLEEK (Desktop Horizontal + Mobile Responsive Stacking)
 */
const executiveSleek: SignatureTemplate = {
  id: "executive-sleek",
  name: "Executive Sleek",
  category: "Executive",
  description: "Modern executive design: Elegant horizontal layout on desktop with automatic mobile stacking.",
  renderText: (d) => `${d.fullName} | ${d.jobTitle} at ${d.companyName}\nEmail: ${d.email} | Tel: ${d.phone} | Mobile: ${d.mobile}`,
  renderHtml: (d) => {
    const isEn = d.language === "en";
    return `
${RESPONSIVE_EMAIL_CSS}
<table cellPadding="0" cellSpacing="0" border="0" style="font-family: ${d.fontFamily}; color: ${d.textColor}; font-size: 13px; line-height: 1.4; border-top: 3px solid ${d.primaryColor}; width: 100%; max-width: 600px;">
  <tr>
    <td style="padding-top: 16px; padding-bottom: 10px;">
      <span style="font-size: 18px; font-weight: 800; color: ${d.textColor}; letter-spacing: -0.3px; display: block;">${d.fullName} ${d.pronouns ? `<span style="font-size: 11px; font-weight: 400; color: ${d.secondaryColor};">(${d.pronouns})</span>` : ""}</span>
      ${d.jobTitle ? `<span style="font-size: 12px; font-weight: 700; color: ${d.primaryColor}; text-transform: uppercase; letter-spacing: 0.8px;">${d.jobTitle}</span>` : ""}
      ${d.companyName ? `<span style="font-size: 12px; color: ${d.secondaryColor}; font-weight: 500;"> ${d.jobTitle ? "&bull; " : ""}${d.companyName} ${d.department ? `(${d.department})` : ""}</span>` : ""}
    </td>
  </tr>
  <tr>
    <td style="padding-bottom: 10px; border-bottom: 1px solid ${d.secondaryColor};">
      <!-- Desktop Horizontal Row & Mobile Responsive Stacking -->
      <div style="font-size: 12px; color: ${d.secondaryColor}; line-height: 1.6;">
        ${d.email ? `<span class="sig-item" style="display: inline-block; margin-right: 16px; white-space: nowrap;"><span style="color: ${d.primaryColor}; font-weight: 700;">E:</span> ${renderEmailLink(d.email, d.textColor)}</span>` : ""}
        ${d.phone ? `<span class="sig-item" style="display: inline-block; margin-right: 16px; white-space: nowrap;"><span style="color: ${d.primaryColor}; font-weight: 700;">T:</span> ${renderPhoneLink(d.phone, d.textColor)}</span>` : ""}
        ${d.mobile ? `<span class="sig-item" style="display: inline-block; margin-right: 16px; white-space: nowrap;"><span style="color: ${d.primaryColor}; font-weight: 700;">M:</span> ${renderMobileLink(d.mobile, d.textColor)}</span>` : ""}
        ${d.website ? `<span class="sig-item" style="display: inline-block; white-space: nowrap;"><span style="color: ${d.primaryColor}; font-weight: 700;">W:</span> ${renderWebLink(d.website, d.primaryColor)}</span>` : ""}
      </div>
      ${d.address ? `<div style="font-size: 11px; color: ${d.secondaryColor}; margin-top: 4px;"><span style="font-weight: 700; color: ${d.primaryColor};">${isEn ? "L:" : "U:"}</span> ${d.address}</div>` : ""}
    </td>
  </tr>
  ${d.linkedin || d.github || d.twitter || d.instagram || d.portfolio ? `
  <tr>
    <td style="padding-top: 10px; padding-bottom: 4px;">
      ${renderSocialLinks(d)}
    </td>
  </tr>` : ""}
  <tr>
    <td>
      ${renderStatusBadgeHtml(d)}
      ${renderDisclaimerHtml(d)}
    </td>
  </tr>
</table>
`.trim();
  }
};

/**
 * 2. CORPORATE CLASSIC
 */
const corporateClassic: SignatureTemplate = {
  id: "corporate-classic",
  name: "Corporate Classic",
  category: "Corporate",
  description: "Left vertical accent bar with clean corporate styling and responsive design.",
  renderText: (d) => `${d.fullName}\n${d.jobTitle} - ${d.companyName}\nEmail: ${d.email} | Mobile: ${d.mobile}`,
  renderHtml: (d) => {
    const isEn = d.language === "en";
    return `
${RESPONSIVE_EMAIL_CSS}
<table cellPadding="0" cellSpacing="0" border="0" style="font-family: ${d.fontFamily}; color: ${d.textColor}; font-size: 13px; line-height: 1.4; max-width: 600px;">
  <tr>
    <td style="border-left: 4px solid ${d.primaryColor}; padding-left: 14px;">
      <div style="font-size: 17px; font-weight: 800; color: ${d.textColor}; line-height: 1.2;">${d.fullName} ${d.pronouns ? `<span style="font-size: 11px; color: ${d.secondaryColor}; font-weight: normal;">(${d.pronouns})</span>` : ""}</div>
      ${d.jobTitle ? `<div style="font-size: 12px; font-weight: 700; color: ${d.primaryColor}; margin-top: 2px; text-transform: uppercase; letter-spacing: 0.5px;">${d.jobTitle}</div>` : ""}
      ${d.companyName ? `<div style="font-size: 12px; color: ${d.secondaryColor}; font-weight: 600;">${d.companyName} ${d.department ? `| ${d.department}` : ""}</div>` : ""}
      
      <div style="margin-top: 8px; font-size: 12px; color: ${d.secondaryColor}; line-height: 1.6;">
        ${d.email ? `<div><span style="font-weight: 700; color: ${d.primaryColor}; text-transform: uppercase; font-size: 10px; display: inline-block; width: 60px;">Email</span>${renderEmailLink(d.email, d.textColor)}</div>` : ""}
        ${d.phone ? `<div><span style="font-weight: 700; color: ${d.primaryColor}; text-transform: uppercase; font-size: 10px; display: inline-block; width: 60px;">${isEn ? "Tel" : "Tel. Fijo"}</span>${renderPhoneLink(d.phone, d.textColor)}</div>` : ""}
        ${d.mobile ? `<div><span style="font-weight: 700; color: ${d.primaryColor}; text-transform: uppercase; font-size: 10px; display: inline-block; width: 60px;">${isEn ? "Mobile" : "Móvil"}</span>${renderMobileLink(d.mobile, d.textColor)}</div>` : ""}
        ${d.website ? `<div><span style="font-weight: 700; color: ${d.primaryColor}; text-transform: uppercase; font-size: 10px; display: inline-block; width: 60px;">Web</span>${renderWebLink(d.website, d.primaryColor)}</div>` : ""}
        ${d.address ? `<div><span style="font-weight: 700; color: ${d.primaryColor}; text-transform: uppercase; font-size: 10px; display: inline-block; width: 60px;">${isEn ? "Location" : "Ubicación"}</span><span style="color: ${d.secondaryColor};">${d.address}</span></div>` : ""}
      </div>

      ${d.linkedin || d.github || d.twitter || d.instagram || d.portfolio ? `
      <div style="margin-top: 10px; padding-top: 8px; border-top: 1px solid ${d.secondaryColor};">
        ${renderSocialLinks(d)}
      </div>` : ""}
      ${renderStatusBadgeHtml(d)}
      ${renderDisclaimerHtml(d)}
    </td>
  </tr>
</table>
`.trim();
  }
};

/**
 * 3. CLEAN & MINIMAL
 */
const cleanMinimal: SignatureTemplate = {
  id: "clean-minimal",
  name: "Clean & Minimal",
  category: "Minimalist",
  description: "Ultra-clean minimal horizontal layout with subtle horizontal dividers.",
  renderText: (d) => `${d.fullName} • ${d.jobTitle} @ ${d.companyName}\n${d.email} • ${d.website}`,
  renderHtml: (d) => {
    const isEn = d.language === "en";
    return `
${RESPONSIVE_EMAIL_CSS}
<table cellPadding="0" cellSpacing="0" border="0" style="font-family: ${d.fontFamily}; color: ${d.textColor}; font-size: 13px; line-height: 1.5; max-width: 580px;">
  <tr>
    <td>
      <span style="font-weight: 800; font-size: 16px; color: ${d.textColor}; letter-spacing: -0.2px;">${d.fullName}</span>
      ${d.jobTitle ? `<span style="color: ${d.primaryColor}; font-weight: 700;"> &bull; ${d.jobTitle}</span>` : ""}
      ${d.companyName ? `<span style="color: ${d.secondaryColor}; font-weight: 500;"> ${isEn ? "at" : "en"} ${d.companyName} ${d.department ? `(${d.department})` : ""}</span>` : ""}
    </td>
  </tr>
  <tr>
    <td style="padding: 6px 0 8px 0;">
      <div style="height: 1px; background-color: ${d.secondaryColor}; opacity: 0.3; width: 100%;"></div>
    </td>
  </tr>
  <tr>
    <td style="font-size: 12px; color: ${d.secondaryColor}; line-height: 1.6;">
      ${d.email ? `<span class="sig-item" style="display: inline-block; margin-right: 12px; white-space: nowrap;">${renderEmailLink(d.email, d.textColor)}</span>` : ""}
      ${d.phone ? `<span class="sig-item" style="display: inline-block; margin-right: 12px; white-space: nowrap;"><span class="sig-sep" style="color: ${d.primaryColor}; font-weight: bold;">&bull; </span>${isEn ? "Tel:" : "Tel:"} ${renderPhoneLink(d.phone, d.textColor)}</span>` : ""}
      ${d.mobile ? `<span class="sig-item" style="display: inline-block; margin-right: 12px; white-space: nowrap;"><span class="sig-sep" style="color: ${d.primaryColor}; font-weight: bold;">&bull; </span>${isEn ? "Mobile:" : "Móvil:"} ${renderMobileLink(d.mobile, d.textColor)}</span>` : ""}
      ${d.website ? `<span class="sig-item" style="display: inline-block; white-space: nowrap;"><span class="sig-sep" style="color: ${d.primaryColor}; font-weight: bold;">&bull; </span>${renderWebLink(d.website, d.primaryColor)}</span>` : ""}
    </td>
  </tr>
  ${d.address ? `<tr><td style="font-size: 11px; color: ${d.secondaryColor}; padding-top: 3px;">${d.address}</td></tr>` : ""}
  ${d.linkedin || d.github || d.twitter || d.instagram || d.portfolio ? `
  <tr>
    <td style="padding-top: 8px;">
      ${renderSocialLinks(d)}
    </td>
  </tr>` : ""}
  <tr>
    <td>
      ${renderStatusBadgeHtml(d)}
      ${renderDisclaimerHtml(d)}
    </td>
  </tr>
</table>
`.trim();
  }
};

/**
 * 4. MODERN SPLIT
 */
const modernSplit: SignatureTemplate = {
  id: "modern-split",
  name: "Modern Split",
  category: "Modern",
  description: "2-column structure featuring a prominent initials badge.",
  renderText: (d) => `[${d.fullName}] ${d.jobTitle} - ${d.companyName}\nEmail: ${d.email}`,
  renderHtml: (d) => {
    const isEn = d.language === "en";
    const initials = d.fullName.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
    return `
${RESPONSIVE_EMAIL_CSS}
<table cellPadding="0" cellSpacing="0" border="0" style="font-family: ${d.fontFamily}; color: ${d.textColor}; font-size: 13px; max-width: 600px;">
  <tr>
    <!-- Left Column: Initials Box -->
    <td style="vertical-align: top; padding-right: 16px;">
      <table cellPadding="0" cellSpacing="0" border="0">
        <tr>
          <td style="background-color: ${d.primaryColor}; color: #ffffff; font-weight: 800; font-size: 18px; text-align: center; width: 46px; height: 46px; border-radius: 8px; line-height: 46px; letter-spacing: 0.5px;">
            ${initials}
          </td>
        </tr>
      </table>
    </td>
    <!-- Vertical Line -->
    <td style="width: 1px; background-color: ${d.secondaryColor}; opacity: 0.4; vertical-align: top;"></td>
    <!-- Right Column: Info -->
    <td style="vertical-align: top; padding-left: 16px;">
      <div style="font-size: 16px; font-weight: 800; color: ${d.textColor}; line-height: 1.2;">${d.fullName} ${d.pronouns ? `<span style="font-size: 11px; color: ${d.secondaryColor}; font-weight: normal;">(${d.pronouns})</span>` : ""}</div>
      <div style="font-size: 12px; font-weight: 700; color: ${d.primaryColor}; margin-bottom: 6px; text-transform: uppercase; letter-spacing: 0.5px;">
        ${d.jobTitle} ${d.companyName ? `&bull; ${d.companyName}` : ""} ${d.department ? `(${d.department})` : ""}
      </div>
      
      <div style="font-size: 12px; color: ${d.secondaryColor}; line-height: 1.5;">
        ${d.email ? `<div style="margin-bottom: 3px;"><span style="font-weight: 700; color: ${d.primaryColor};">Email:</span> ${renderEmailLink(d.email, d.textColor)}</div>` : ""}
        ${d.phone ? `<div style="margin-bottom: 3px;"><span style="font-weight: 700; color: ${d.primaryColor};">Tel:</span> ${renderPhoneLink(d.phone, d.textColor)}</div>` : ""}
        ${d.mobile ? `<div style="margin-bottom: 3px;"><span style="font-weight: 700; color: ${d.primaryColor};">${isEn ? "Mobile:" : "Móvil:"}</span> ${renderMobileLink(d.mobile, d.textColor)}</div>` : ""}
        ${d.website ? `<div style="margin-bottom: 3px;"><span style="font-weight: 700; color: ${d.primaryColor};">Web:</span> ${renderWebLink(d.website, d.primaryColor)}</div>` : ""}
        ${d.address ? `<div style="margin-bottom: 3px;"><span style="font-weight: 700; color: ${d.primaryColor};">${isEn ? "Location:" : "Ubicación:"}</span> <span style="color: ${d.secondaryColor};">${d.address}</span></div>` : ""}
      </div>

      ${d.linkedin || d.github || d.twitter || d.instagram || d.portfolio ? `
      <div style="margin-top: 8px;">
        ${renderSocialLinks(d)}
      </div>` : ""}
      ${renderStatusBadgeHtml(d)}
      ${renderDisclaimerHtml(d)}
    </td>
  </tr>
</table>
`.trim();
  }
};

/**
 * 5. TECH SPECIALIST
 */
const techSpecialist: SignatureTemplate = {
  id: "tech-specialist",
  name: "Tech Specialist",
  category: "Technology",
  description: "Developer tag style blocks with dark badge accents.",
  renderText: (d) => `${d.fullName} - ${d.jobTitle}\nGitHub: ${d.github} | Email: ${d.email}`,
  renderHtml: (d) => `
${RESPONSIVE_EMAIL_CSS}
<table cellPadding="0" cellSpacing="0" border="0" style="font-family: ${d.fontFamily}; color: ${d.textColor}; font-size: 13px; max-width: 600px;">
  <tr>
    <td style="padding-bottom: 6px;">
      <span style="font-size: 16px; font-weight: 800; color: ${d.textColor}; font-family: monospace;">&lt;${d.fullName} /&gt;</span>
      ${d.pronouns ? `<span style="font-size: 11px; color: ${d.secondaryColor}; font-family: monospace; margin-left: 6px;">[${d.pronouns}]</span>` : ""}
    </td>
  </tr>
  <tr>
    <td style="padding-bottom: 8px;">
      ${d.jobTitle ? `<span style="background-color: ${d.primaryColor}; color: #ffffff; font-family: monospace; font-size: 11px; padding: 3px 8px; border-radius: 4px; font-weight: 700; letter-spacing: 0.5px;">${d.jobTitle}</span>` : ""}
      ${d.companyName ? `<span style="font-size: 12px; color: ${d.secondaryColor}; margin-left: 6px; font-weight: 600;">@ ${d.companyName} ${d.department ? `(${d.department})` : ""}</span>` : ""}
    </td>
  </tr>
  <tr>
    <td style="padding-bottom: 8px; font-size: 12px; color: ${d.secondaryColor}; border-top: 1px solid ${d.secondaryColor}; padding-top: 8px; line-height: 1.5;">
      ${d.email ? `<div style="margin-bottom: 3px;"><span style="color: ${d.primaryColor}; font-family: monospace; font-weight: bold;">email:</span> ${renderEmailLink(d.email, d.textColor)}</div>` : ""}
      ${d.phone ? `<div style="margin-bottom: 3px;"><span style="color: ${d.primaryColor}; font-family: monospace; font-weight: bold;">tel:</span> ${renderPhoneLink(d.phone, d.textColor)}</div>` : ""}
      ${d.mobile ? `<div style="margin-bottom: 3px;"><span style="color: ${d.primaryColor}; font-family: monospace; font-weight: bold;">mobile:</span> ${renderMobileLink(d.mobile, d.textColor)}</div>` : ""}
      ${d.website ? `<div style="margin-bottom: 3px;"><span style="color: ${d.primaryColor}; font-family: monospace; font-weight: bold;">web:</span> ${renderWebLink(d.website, d.primaryColor)}</div>` : ""}
    </td>
  </tr>
  ${d.linkedin || d.github || d.twitter || d.instagram || d.portfolio ? `
  <tr>
    <td style="padding-bottom: 6px;">
      ${renderSocialLinks(d)}
    </td>
  </tr>` : ""}
  <tr>
    <td>
      ${renderStatusBadgeHtml(d)}
      ${renderDisclaimerHtml(d)}
    </td>
  </tr>
</table>
`.trim()
};

/**
 * 6. COMPACT BADGE
 */
const compactBadge: SignatureTemplate = {
  id: "compact-badge",
  name: "Compact Badge",
  category: "Minimalist",
  description: "Ultra-compact bordered design ideal for fast email reply threads.",
  renderText: (d) => `${d.fullName} | ${d.jobTitle} (${d.email})`,
  renderHtml: (d) => {
    const isEn = d.language === "en";
    return `
${RESPONSIVE_EMAIL_CSS}
<table cellPadding="0" cellSpacing="0" border="0" style="font-family: ${d.fontFamily}; color: ${d.textColor}; font-size: 12px; border: 1px solid ${d.secondaryColor}; border-radius: 8px; padding: 10px 14px; max-width: 550px;">
  <tr>
    <td>
      <span style="font-weight: 800; font-size: 14px; color: ${d.textColor};">${d.fullName}</span>
      ${d.jobTitle ? `<span style="color: ${d.primaryColor}; font-weight: 700;"> — ${d.jobTitle}</span>` : ""}
    </td>
  </tr>
  <tr>
    <td style="color: ${d.secondaryColor}; padding-top: 4px; line-height: 1.6;">
      ${d.companyName ? `<strong>${d.companyName}</strong> ${d.department ? `(${d.department})` : ""} &bull; ` : ""}
      ${d.email ? `<span class="sig-item" style="display: inline-block; margin-right: 8px;">${renderEmailLink(d.email, d.textColor)}</span>` : ""}
      ${d.phone ? `<span class="sig-item" style="display: inline-block; margin-right: 8px;">Tel: ${renderPhoneLink(d.phone, d.textColor)}</span>` : ""}
      ${d.mobile ? `<span class="sig-item" style="display: inline-block;">${isEn ? "Mobile:" : "Móvil:"} ${renderMobileLink(d.mobile, d.textColor)}</span>` : ""}
    </td>
  </tr>
  ${d.linkedin || d.github || d.twitter || d.instagram || d.portfolio ? `
  <tr>
    <td style="padding-top: 6px;">
      ${renderSocialLinks(d)}
    </td>
  </tr>` : ""}
  <tr>
    <td>
      ${renderStatusBadgeHtml(d)}
      ${renderDisclaimerHtml(d)}
    </td>
  </tr>
</table>
`.trim();
  }
};

/**
 * 7. BORDERED ACCENT
 */
const borderedAccent: SignatureTemplate = {
  id: "bordered-accent",
  name: "Bordered Accent",
  category: "Executive",
  description: "Subtle top and bottom border accents for formal corporate tone.",
  renderText: (d) => `--- ${d.fullName} ---\n${d.jobTitle} at ${d.companyName}\n${d.email} | ${d.phone}`,
  renderHtml: (d) => {
    const isEn = d.language === "en";
    return `
${RESPONSIVE_EMAIL_CSS}
<table cellPadding="0" cellSpacing="0" border="0" style="font-family: ${d.fontFamily}; color: ${d.textColor}; font-size: 13px; border-top: 1px solid ${d.secondaryColor}; border-bottom: 1px solid ${d.secondaryColor}; padding: 12px 0; max-width: 600px; width: 100%;">
  <tr>
    <td>
      <div style="font-size: 17px; font-weight: 800; color: ${d.primaryColor}; letter-spacing: -0.3px;">${d.fullName} ${d.pronouns ? `<span style="font-size: 11px; color: ${d.secondaryColor}; font-weight: normal;">(${d.pronouns})</span>` : ""}</div>
      <div style="font-size: 13px; font-weight: 700; color: ${d.textColor}; margin-bottom: 6px;">
        ${d.jobTitle} ${d.companyName ? `<span style="color: ${d.secondaryColor}; font-weight: 400;">| ${d.companyName} ${d.department ? `(${d.department})` : ""}</span>` : ""}
      </div>
      
      <div style="font-size: 12px; color: ${d.secondaryColor}; line-height: 1.6;">
        ${d.email ? `<span class="sig-item" style="display: inline-block; margin-right: 14px; white-space: nowrap;"><span style="font-weight: 700; color: ${d.primaryColor};">Email:</span> ${renderEmailLink(d.email, d.textColor)}</span>` : ""}
        ${d.phone ? `<span class="sig-item" style="display: inline-block; margin-right: 14px; white-space: nowrap;"><span style="font-weight: 700; color: ${d.primaryColor};">Tel:</span> ${renderPhoneLink(d.phone, d.textColor)}</span>` : ""}
        ${d.mobile ? `<span class="sig-item" style="display: inline-block; margin-right: 14px; white-space: nowrap;"><span style="font-weight: 700; color: ${d.primaryColor};">${isEn ? "Mobile:" : "Móvil:"}</span> ${renderMobileLink(d.mobile, d.textColor)}</span>` : ""}
        ${d.website ? `<span class="sig-item" style="display: inline-block; white-space: nowrap;"><span style="font-weight: 700; color: ${d.primaryColor};">Web:</span> ${renderWebLink(d.website, d.primaryColor)}</span>` : ""}
        ${d.address ? `<div style="margin-top: 3px;"><span style="font-weight: 700; color: ${d.primaryColor};">${isEn ? "Location:" : "Ubicación:"}</span> ${d.address}</div>` : ""}
      </div>

      ${d.linkedin || d.github || d.twitter || d.instagram || d.portfolio ? `
      <div style="margin-top: 8px;">
        ${renderSocialLinks(d)}
      </div>` : ""}
      ${renderStatusBadgeHtml(d)}
      ${renderDisclaimerHtml(d)}
    </td>
  </tr>
</table>
`.trim();
  }
};

/**
 * 8. SERIF ELEGANT
 */
const serifElegant: SignatureTemplate = {
  id: "serif-elegant",
  name: "Serif Elegant",
  category: "Creative",
  description: "Refined Georgia serif typography for formal or institutional signatures.",
  renderText: (d) => `${d.fullName}\n${d.jobTitle}, ${d.companyName}\nEmail: ${d.email}`,
  renderHtml: (d) => {
    const isEn = d.language === "en";
    return `
${RESPONSIVE_EMAIL_CSS}
<table cellPadding="0" cellSpacing="0" border="0" style="font-family: Georgia, serif; color: ${d.textColor}; font-size: 13px; line-height: 1.5; max-width: 580px;">
  <tr>
    <td style="padding-bottom: 4px;">
      <span style="font-size: 19px; font-weight: normal; font-style: italic; color: ${d.textColor}; border-bottom: 1px solid ${d.primaryColor}; padding-bottom: 2px;">
        ${d.fullName}
      </span>
      ${d.pronouns ? `<span style="font-size: 11px; color: ${d.secondaryColor}; font-style: normal; margin-left: 6px;">(${d.pronouns})</span>` : ""}
    </td>
  </tr>
  <tr>
    <td style="font-size: 13px; color: ${d.secondaryColor}; padding-top: 4px;">
      ${d.jobTitle ? `<strong>${d.jobTitle}</strong>` : ""}
      ${d.companyName ? ` &bull; <em>${d.companyName}</em> ${d.department ? `(${d.department})` : ""}` : ""}
    </td>
  </tr>
  <tr>
    <td style="font-size: 12px; color: ${d.secondaryColor}; padding-top: 6px; line-height: 1.6;">
      ${d.email ? `<span class="sig-item" style="display: inline-block; margin-right: 12px; white-space: nowrap;">Email: ${renderEmailLink(d.email, d.textColor)}</span>` : ""}
      ${d.phone ? `<span class="sig-item" style="display: inline-block; margin-right: 12px; white-space: nowrap;">Tel: ${renderPhoneLink(d.phone, d.textColor)}</span>` : ""}
      ${d.mobile ? `<span class="sig-item" style="display: inline-block; margin-right: 12px; white-space: nowrap;">${isEn ? "Mobile:" : "Móvil:"} ${renderMobileLink(d.mobile, d.textColor)}</span>` : ""}
      ${d.website ? `<span class="sig-item" style="display: inline-block; white-space: nowrap;">Web: ${renderWebLink(d.website, d.primaryColor)}</span>` : ""}
    </td>
  </tr>
  ${d.linkedin || d.github || d.twitter || d.instagram || d.portfolio ? `
  <tr>
    <td style="padding-top: 8px;">
      ${renderSocialLinks(d)}
    </td>
  </tr>` : ""}
  <tr>
    <td>
      ${renderStatusBadgeHtml(d)}
      ${renderDisclaimerHtml(d)}
    </td>
  </tr>
</table>
`.trim();
  }
};

/**
 * 9. CREATIVE FREELANCE
 */
const creativeFreelance: SignatureTemplate = {
  id: "creative-freelance",
  name: "Creative Freelance",
  category: "Creative",
  description: "Clean modern design highlighting portfolio link and social channels.",
  renderText: (d) => `${d.fullName} - ${d.jobTitle}\nPortfolio: ${d.portfolio} | Email: ${d.email}`,
  renderHtml: (d) => {
    const isEn = d.language === "en";
    return `
${RESPONSIVE_EMAIL_CSS}
<table cellPadding="0" cellSpacing="0" border="0" style="font-family: ${d.fontFamily}; color: ${d.textColor}; font-size: 13px; max-width: 600px;">
  <tr>
    <td style="padding-bottom: 4px;">
      <span style="font-size: 18px; font-weight: 800; color: ${d.primaryColor}; letter-spacing: -0.2px;">
        ${d.fullName}
      </span>
    </td>
  </tr>
  <tr>
    <td style="font-size: 13px; font-weight: 700; color: ${d.textColor}; padding-bottom: 8px;">
      ${d.jobTitle} ${d.companyName ? `<span style="color: ${d.primaryColor}; font-weight: 600;">@ ${d.companyName}</span> ${d.department ? `(${d.department})` : ""}` : ""}
    </td>
  </tr>
  ${d.linkedin || d.github || d.twitter || d.instagram || d.portfolio ? `
  <tr>
    <td style="padding-bottom: 8px;">
      ${renderSocialLinks(d)}
    </td>
  </tr>` : ""}
  <tr>
    <td style="font-size: 12px; color: ${d.secondaryColor}; border-top: 1px solid ${d.secondaryColor}; padding-top: 6px; line-height: 1.6;">
      ${d.email ? `<span class="sig-item" style="display: inline-block; margin-right: 14px; white-space: nowrap;">Email: ${renderEmailLink(d.email, d.textColor)}</span>` : ""}
      ${d.phone ? `<span class="sig-item" style="display: inline-block; margin-right: 14px; white-space: nowrap;">Tel: ${renderPhoneLink(d.phone, d.textColor)}</span>` : ""}
      ${d.mobile ? `<span class="sig-item" style="display: inline-block; white-space: nowrap;">${isEn ? "Mobile:" : "Móvil:"} ${renderMobileLink(d.mobile, d.textColor)}</span>` : ""}
    </td>
  </tr>
  <tr>
    <td>
      ${renderStatusBadgeHtml(d)}
      ${renderDisclaimerHtml(d)}
    </td>
  </tr>
</table>
`.trim();
  }
};

/**
 * 10. DEVELOPER TERMINAL
 */
const developerTerminal: SignatureTemplate = {
  id: "developer-terminal",
  name: "Developer Terminal",
  category: "Technology",
  description: "Monospace terminal console styling ($ whoami > Alex Morgan).",
  renderText: (d) => `$ whoami -> ${d.fullName}\n$ role -> ${d.jobTitle}\n$ contact -> ${d.email}`,
  renderHtml: (d) => `
${RESPONSIVE_EMAIL_CSS}
<table cellPadding="0" cellSpacing="0" border="0" style="font-family: 'Courier New', monospace; color: ${d.textColor}; font-size: 12px; border-left: 3px solid ${d.primaryColor}; padding: 10px 14px; max-width: 580px;">
  <tr>
    <td style="color: ${d.textColor}; font-weight: bold; font-size: 14px;">
      $ whoami &gt; <span style="color: ${d.primaryColor};">${d.fullName}</span>
    </td>
  </tr>
  <tr>
    <td style="color: ${d.secondaryColor}; padding-top: 2px;">
      role: "${d.jobTitle}" ${d.companyName ? `@ ${d.companyName} ${d.department ? `[${d.department}]` : ""}` : ""}
    </td>
  </tr>
  <tr>
    <td style="color: ${d.secondaryColor}; padding-top: 6px; font-size: 11px; line-height: 1.5;">
      ${d.email ? `<div>email: ${renderEmailLink(d.email, d.textColor)}</div>` : ""}
      ${d.phone ? `<div>phone: ${renderPhoneLink(d.phone, d.textColor)}</div>` : ""}
      ${d.mobile ? `<div>mobile: ${renderMobileLink(d.mobile, d.textColor)}</div>` : ""}
      ${d.github ? `<div>github: <a href="${d.github}" target="_blank" style="color: ${d.primaryColor}; text-decoration: none;">${d.github}</a></div>` : ""}
    </td>
  </tr>
  ${d.linkedin || d.twitter || d.instagram || d.portfolio ? `
  <tr>
    <td style="padding-top: 4px;">
      ${renderSocialLinks(d)}
    </td>
  </tr>` : ""}
  <tr>
    <td>
      ${renderStatusBadgeHtml(d)}
      ${renderDisclaimerHtml(d)}
    </td>
  </tr>
</table>
`.trim()
};

export const TEMPLATES: SignatureTemplate[] = [
  executiveSleek,
  corporateClassic,
  cleanMinimal,
  modernSplit,
  techSpecialist,
  compactBadge,
  borderedAccent,
  serifElegant,
  creativeFreelance,
  developerTerminal,
];
