import type { Metadata } from "next";
import { Toaster } from "sonner";
import "./globals.css";

export const metadata: Metadata = {
  title: "SignatureCraft | Creador de Firmas de Correo HTML Anti-Spam para Gmail",
  description: "Crea y personaliza firmas de correo profesional en HTML 100% libres de imágenes para evitar filtros de spam. Copia directamente a Gmail u Outlook con un solo clic.",
  keywords: ["firmas de correo", "gmail signature", "html email signature", "no image email signature", "firmas anti spam", "signature generator"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-slate-50 text-slate-900 font-sans">
        {children}
        <Toaster position="bottom-right" richColors />
      </body>
    </html>
  );
}
