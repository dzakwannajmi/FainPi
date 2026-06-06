import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "FainPi",
  description: "Pay-per-request API monetization powered by Stellar.",
};

const navigationItems = [
  { href: "/#work", label: "Work" },
  { href: "/#services", label: "Services" },
  { href: "/#about", label: "About" },
  { href: "/registry", label: "Registry" },
  { href: "/docs", label: "Docs" },
];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-body">
        <div className="min-h-screen bg-[hsl(var(--background))] text-[hsl(var(--foreground))]">
          <header className="fixed inset-x-0 top-0 z-50 px-8 py-6">
            <nav className="flex items-center justify-between">
              <Link
                href="/"
                className="font-body text-xl font-semibold tracking-tight text-[hsl(var(--foreground))]"
              >
                FAINPI
              </Link>

              <div className="liquid-glass hidden rounded-full px-1 py-1 md:flex">
                {navigationItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="rounded-full px-4 py-2 text-sm font-medium text-[hsl(var(--foreground))] transition hover:bg-white/10"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>

              <Link
                href="/payment"
                className="liquid-glass-strong rounded-full px-6 py-2.5 text-sm font-medium text-[hsl(var(--foreground))]"
              >
                Get Started
              </Link>
            </nav>
          </header>

          <main className="mx-auto max-w-6xl px-6 pt-28 pb-10">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}