import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "next-themes"
import Provider from "./provider";


export const metadata: Metadata = {
  title: "Thala Technologies",
  description: "Thala Technologies",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="dark">
          <Provider>
            {/* <Header /> */}
            {children}
          </Provider>
        </ThemeProvider>
      </body>
    </html>
  );
}
