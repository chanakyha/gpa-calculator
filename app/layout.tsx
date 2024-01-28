import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import Footer from "@/components/Footer";
import ThemeTogglerBtn from "@/components/ThemeTogglerBtn";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { headers } from "next/dist/client/components/headers";

import Link from "next/link";

const mont = Montserrat({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SRM GPA Calculator",
  description: "Calculate your CGPA & SGPA",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const requestUrl = headers().get("x-url");
  const url = new URL(requestUrl!);
  const pathname = url.pathname;

  return (
    <html suppressHydrationWarning={true} lang="en">
      <body suppressHydrationWarning={true} className={mont.className}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <main className="container-fix min-h-[calc(100vh-3.5rem)]">
            <ThemeTogglerBtn className="fixed top-2 right-2" />
            <h1 className="text-center text-primary">SRM GPA CALCULATOR</h1>
            <div className="py-4 ">
              <Tabs
                defaultValue={pathname === "/" ? "sgpa" : "cgpa"}
                className=" mx-auto"
              >
                <TabsList className="w-full md:max-w-4xl lg:max-w-2xl xl:max-w-xl mx-auto">
                  <TabsTrigger asChild className="w-full" value="sgpa">
                    <Link href={"/"}>SGPA Calculator</Link>
                  </TabsTrigger>
                  <TabsTrigger asChild className="w-full" value="cgpa">
                    <Link href={"/cgpa"}>CGPA Calculator</Link>
                  </TabsTrigger>
                </TabsList>
                {children}
              </Tabs>
            </div>
          </main>
        </ThemeProvider>
        <Footer />
      </body>
    </html>
  );
}
