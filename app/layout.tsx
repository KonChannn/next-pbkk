import "./globals.css"; 
import type { Metadata } from "next"; 
import { Roboto } from "next/font/google"; 
import { Layout } from "@/components/layout"; 
import { FixedPlugin } from "@/components/fixed-plugin"; 
import { AuthProvider } from "./providers";

// Mengimpor font Roboto
const roboto = Roboto({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700", "900"],
  display: "swap",
});

// Metadata untuk halaman
export const metadata: Metadata = {
  title: "NextJS Tailwind Course Landing Page",
  description: "Introducing Tailwind Course Landing Page, a versatile and engaging landing page template designed using Tailwind CSS and Material Tailwind.",
};

// RootLayout untuk membungkus seluruh aplikasi
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className={roboto.className}>
        <AuthProvider>
          <Layout>
            {children}
          </Layout>
          <FixedPlugin />
        </AuthProvider>
      </body>
    </html>
  );
}
