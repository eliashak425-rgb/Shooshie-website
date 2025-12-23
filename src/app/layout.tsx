import "~/styles/globals.css";
import { Instrument_Serif, Inter } from "next/font/google";
import { type Metadata } from "next";
import LoadingScreen from "~/components/LoadingScreen";

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-serif",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Eli Isaac | Frontend Web Developer",
  description: "Frontend web developer & editor based in Belgium. I create beautiful, user-friendly websites for businesses.",
  keywords: ["web developer", "frontend developer", "website editor", "Belgium", "React", "Vue"],
  authors: [{ name: "Eli Isaac" }],
  openGraph: {
    type: "website",
    title: "Eli Isaac | Frontend Web Developer",
    description: "Frontend web developer & editor based in Belgium. I create beautiful, user-friendly websites for businesses.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Eli Isaac | Frontend Web Developer",
    description: "Frontend web developer & editor based in Belgium. I create beautiful, user-friendly websites for businesses.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${instrumentSerif.variable} ${inter.variable} scroll-smooth`}>
      <body className="bg-[#0a0a0b] font-sans text-zinc-100 antialiased selection:bg-purple-500 selection:text-white">
        <LoadingScreen>{children}</LoadingScreen>
      </body>
    </html>
  );
}
