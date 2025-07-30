import type { Metadata } from "next";
import { ThemeProvider } from "@/components/theme-provider";
import { Nunito_Sans } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Toaster } from "@/components/ui/sonner";
import { CountryProvider } from "@/lib/CountryContext";

const nunitoSans = Nunito_Sans({
  variable: "--font-nunito-sans",
  weight: ["300", "600", "800"],
  subsets: ["latin"],
});
export const metadata: Metadata = {
  title: "restcountries-app",
  description:
    "A Next.js app using the Rest Countries API with light/dark mode",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <CountryProvider>
      <html lang="en" suppressHydrationWarning>
        <body className={`${nunitoSans.variable} font-nunito-sans antialiased`}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Header />
            <div className="py-6 md:py-12">{children}</div>
            <Toaster richColors />
          </ThemeProvider>
        </body>
      </html>
    </CountryProvider>
  );
}
