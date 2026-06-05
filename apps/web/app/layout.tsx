import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "FainPi",
  description: "Pay-per-request API monetization powered by Stellar.",
};

const navigationItems = [
  { href: "/", label: "Home" },
  { href: "/generator", label: "Generator" },
  { href: "/demo", label: "Demo" },
  { href: "/payment", label: "Payment" },
  { href: "/docs", label: "Docs" },
];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <div className="min-h-screen bg-[#050505] text-white">
          <header className="sticky top-0 z-50 border-b border-[#1f1f1f] bg-[#050505]/85 backdrop-blur-xl">
            <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
              <Link href="/" className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-sm font-black text-black">
                  FP
                </div>
                <span className="text-xl font-extrabold tracking-tight">
                  FainPi
                </span>
              </Link>

              <div className="flex gap-1 rounded-full border border-[#1f1f1f] bg-[#0d0d0d] p-1 text-sm text-neutral-300">
                {navigationItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="rounded-full px-4 py-2 transition hover:bg-white hover:text-black"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </nav>
          </header>

          <main className="mx-auto max-w-6xl px-6 py-10">{children}</main>
        </div>
      </body>
    </html>
  );
}