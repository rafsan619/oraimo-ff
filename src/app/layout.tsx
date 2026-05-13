import type { Metadata } from "next";
import { Space_Grotesk, Manrope } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Oraimo x Free Fire | The Biggest Collaboration",
  description: "Register for the Oraimo x Free Fire ZCS Showmatch.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${manrope.variable} dark`} style={{ colorScheme: 'dark' }}>
      <body className="antialiased min-h-screen bg-carbon-900 text-[#adaaaa] font-manrope selection:bg-neon-green selection:text-black">
        {children}
        <Toaster theme="dark" position="bottom-right" toastOptions={{ style: { background: '#1a1919', borderColor: '#2ff801', color: '#fff' } }} />
      </body>
    </html>
  );
}
