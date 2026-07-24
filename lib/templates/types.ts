export interface SignatureProfile {
  // Language for template labels
  language: "es" | "en";

  // Personal & Company Details
  fullName: string;
  jobTitle: string;
  companyName: string;
  department: string;
  pronouns: string;
  pronounsEs: string;
  pronounsEn: string;

  // Contact Info
  email: string;
  phone: string;
  mobile: string;
  website: string;
  address: string;

  // Social Handles / Usernames
  linkedinUsername: string;
  githubUsername: string;
  twitterUsername: string;
  instagramUsername: string;

  // Generated or Custom Social URLs
  linkedin: string;
  github: string;
  twitter: string;
  instagram: string;
  portfolio: string;

  // Styling & Customization
  primaryColor: string; // Accent color (Hex e.g. #2563eb)
  secondaryColor: string; // Muted color (Hex e.g. #475569)
  textColor: string; // Base text color (Hex e.g. #1e293b)
  fontFamily: "Arial, sans-serif" | "Helvetica, sans-serif" | "Georgia, serif" | "Tahoma, sans-serif" | "Trebuchet MS, sans-serif" | "Verdana, sans-serif" | "Courier New, monospace";

  // Additional elements
  statusBadge: string; // e.g., "● Open to new career opportunities"
  disclaimer: string; // Legal or confidentiality notice
}

export interface SignatureTemplate {
  id: string;
  name: string;
  category: "Executive" | "Minimalist" | "Corporate" | "Technology" | "Creative" | "Modern";
  description: string;
  renderHtml: (data: SignatureProfile) => string;
  renderText: (data: SignatureProfile) => string;
}

export const DEFAULT_PROFILE: SignatureProfile = {
  language: "en",
  fullName: "Alex Morgan",
  jobTitle: "Senior Software Engineer",
  companyName: "Acme Innovations Inc.",
  department: "Engineering",
  pronouns: "He / Him",
  pronounsEs: "Él / Him",
  pronounsEn: "He / Him",
  email: "alex.morgan@example.com",
  phone: "+1 (555) 019-2834",
  mobile: "+1 (555) 014-9281",
  website: "https://alexmorgan.dev",
  address: "San Francisco, CA",
  linkedinUsername: "alexmorgan",
  githubUsername: "alexmorgan",
  twitterUsername: "alexmorgan",
  instagramUsername: "alexmorgan",
  linkedin: "https://linkedin.com/in/alexmorgan",
  github: "https://github.com/alexmorgan",
  twitter: "https://x.com/alexmorgan",
  instagram: "https://instagram.com/alexmorgan",
  portfolio: "https://alexmorgan.dev/portfolio",
  primaryColor: "#2563eb",
  secondaryColor: "#64748b",
  textColor: "#1e293b",
  fontFamily: "Arial, sans-serif",
  statusBadge: "● Open to new career opportunities",
  disclaimer: "This email and any attachments are confidential and intended solely for the recipient. If received in error, please notify the sender immediately and delete this message.",
};
