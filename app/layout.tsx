import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import Footer from "@/components/Footer";
import { Toaster } from "sonner";

const mont = Montserrat({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SRM GPA Calculator",
  description: "Calculate your CGPA & SGPA",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={mont.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Footer />
          <Toaster position="top-right" richColors closeButton theme="system" />
        </ThemeProvider>
      </body>
    </html>
  );
}
