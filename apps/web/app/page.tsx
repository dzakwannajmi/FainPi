"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { FeatureLinkCard } from "@/components/FeatureLinkCard";
import { HlsVideoBackground } from "@/components/HlsVideoBackground";
import { ScrollRevealText } from "@/components/ScrollRevealText";

const heroVideo =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260326_073936_8dd07fdb-4f6b-4220-a3f0-9dedfaab0c88.mp4";

const hlsStream =
  "https://stream.mux.com/4IMYGcL01xjs7ek5ANO17JC4VQVUTsojZlnw4fXzwSxc.m3u8";

const aboutText =
  "We blend Stellar payments with developer-first API tooling to craft monetization flows that are simple, fast, and ready for the next generation of machine-to-machine commerce.";

const workItems = [
  {
    title: "Paywall Generator",
    category: "Middleware",
    description:
      "Create a developer-friendly Express middleware snippet for a protected API endpoint with a payment-required flow.",
    href: "/generator",
  },
  {
    title: "API Paywall Demo",
    category: "HTTP 402",
    description:
      "Test how a premium endpoint returns 402 Payment Required before unlocking protected API data.",
    href: "/demo",
  },
  {
    title: "Freighter Payment",
    category: "Wallet",
    description:
      "Connect Freighter, send native XLM on Stellar Testnet, and unlock the premium endpoint after payment submission.",
    href: "/payment",
  },
  {
    title: "Soroban Registry",
    category: "Contract",
    description:
      "View the on-chain paywall metadata registry that stores endpoint path, price, asset, network, and recipient address.",
    href: "/registry",
  },
];

const services = [
  "API paywall generation",
  "HTTP 402 protected endpoint",
  "Freighter wallet payment",
  "Soroban paywall registry",
];

export default function HomePage() {
  return (
    <div className="full-bleed-page -mt-28 bg-[hsl(var(--background))] text-[hsl(var(--foreground))]">
      <section className="relative h-screen w-full overflow-hidden">
        <video
          className="absolute inset-0 h-full w-full -translate-y-[100px] object-cover object-bottom md:translate-y-0"
          src={heroVideo}
          autoPlay
          loop
          muted
          playsInline
        />

        <div className="absolute inset-x-0 bottom-0 h-60 bg-gradient-to-t from-[hsl(var(--background))] to-transparent" />

        <div className="relative z-10 mx-auto flex h-full max-w-6xl flex-col justify-end px-8 pb-10 md:pb-20">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="mb-6 flex flex-wrap items-center gap-4"
          >
            <div className="-space-x-2">
              {[11, 32, 48].map((id) => (
                <img
                  key={id}
                  src={`https://i.pravatar.cc/96?img=${id}`}
                  alt="FainPi user avatar"
                  className="inline-block h-8 w-8 rounded-full border-2 border-[hsl(var(--background))]"
                />
              ))}
            </div>

            <p className="text-sm text-[hsl(var(--muted-foreground))]">
              7,000+ API requests ready to be monetized
            </p>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 36 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.1 }}
            className="max-w-5xl font-body text-3xl font-medium tracking-[-1px] text-[hsl(var(--foreground))] sm:text-5xl md:text-6xl md:tracking-[-2px] lg:text-7xl"
          >
            Build paid APIs with{" "}
            <span className="font-accent italic font-normal">
              Stellar Magic
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.2 }}
            className="mt-6 text-sm text-[hsl(var(--muted-foreground))] md:text-lg md:whitespace-nowrap"
          >
            Pay-per-request API monetization with Freighter, HTTP 402, and
            Soroban metadata.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.3 }}
            className="mt-8 flex flex-wrap gap-3"
          >
            <Link href="/generator" className="primary-button px-8 py-4">
              GENERATE
            </Link>

            <Link
              href="/payment"
              className="liquid-glass-strong rounded-full px-8 py-4 text-sm font-semibold text-[hsl(var(--foreground))]"
            >
              TRY PAYMENT
            </Link>
          </motion.div>
        </div>
      </section>

      <section
        id="about"
        className="mx-auto max-w-4xl bg-[hsl(var(--background))] px-8 py-32 text-center"
      >
        <ScrollRevealText text={aboutText} />
      </section>

      <section
        id="work"
        className="relative z-10 mx-auto max-w-6xl bg-[hsl(var(--background))] px-8 py-32"
      >
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <h2 className="font-body text-4xl font-medium tracking-[-2px] text-[hsl(var(--foreground))] md:text-5xl">
            Selected{" "}
            <span className="font-accent italic font-normal">Modules</span>
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-lg text-[hsl(var(--muted-foreground))]">
            A focused set of FainPi modules that demonstrate pay-per-request API
            monetization on Stellar.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {workItems.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <FeatureLinkCard
                href={item.href}
                index={`0${index + 1}`}
                title={item.title}
                description={item.description}
                meta={item.category}
              />
            </motion.div>
          ))}
        </div>
      </section>

      <section
        id="services"
        className="mx-auto grid max-w-6xl gap-6 px-8 py-24 md:grid-cols-4"
      >
        {services.map((service, index) => (
          <motion.div
            key={service}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.08 }}
            className="liquid-glass rounded-2xl p-6"
          >
            <p className="text-sm text-[hsl(var(--muted-foreground))]">
              0{index + 1}
            </p>

            <h3 className="mt-4 text-lg font-medium text-[hsl(var(--foreground))]">
              {service}
            </h3>
          </motion.div>
        ))}
      </section>

      <section
        id="contact"
        className="relative z-10 flex h-screen w-full items-center justify-center overflow-hidden"
      >
        <HlsVideoBackground src={hlsStream} />

        <div className="absolute inset-0 bg-black/30" />
        <div className="absolute inset-x-0 top-0 z-10 h-40 bg-gradient-to-b from-[hsl(var(--background))] to-transparent" />
        <div className="absolute inset-x-0 bottom-0 z-10 h-40 bg-gradient-to-t from-[hsl(var(--background))] to-transparent" />

        <div className="relative z-20 mx-auto max-w-3xl px-8 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="font-body text-4xl font-medium tracking-[-2px] text-[hsl(var(--foreground))] md:text-5xl lg:text-6xl"
          >
            Ready to{" "}
            <span className="font-accent italic font-normal">Monetize</span>{" "}
            Your API?
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="mt-6 text-lg text-[hsl(var(--muted-foreground))]"
          >
            Generate a paywall, test the 402 flow, pay with Freighter, and
            verify the registry.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-10 flex flex-wrap justify-center gap-4"
          >
            <Link
              href="/generator"
              className="rounded-full bg-[hsl(var(--foreground))] px-10 py-4 text-sm font-semibold text-[hsl(var(--background))]"
            >
              START A PROJECT
            </Link>

            <Link
              href="/payment"
              className="liquid-glass-strong rounded-full px-10 py-4 text-sm font-semibold text-[hsl(var(--foreground))]"
            >
              TRY PAYMENT
            </Link>
          </motion.div>
        </div>
      </section>

      <footer className="border-t border-[hsl(var(--border))] bg-[hsl(var(--background))] px-8 py-16">
        <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-4">
          <div>
            <h3 className="text-xl font-semibold tracking-tight">FAINPI</h3>
            <p className="mt-4 max-w-xs text-sm leading-7 text-[hsl(var(--muted-foreground))]">
              Pay-per-request API monetization powered by Stellar.
            </p>
          </div>

          <FooterGroup
            title="Product"
            links={[
              { label: "Generator", href: "/generator" },
              { label: "Demo", href: "/demo" },
              { label: "Payment", href: "/payment" },
              { label: "Registry", href: "/registry" },
            ]}
          />

          <FooterGroup
            title="Build"
            links={[
              { label: "Next.js", href: "/docs" },
              { label: "Freighter", href: "/payment" },
              { label: "Soroban", href: "/registry" },
              { label: "Stellar Testnet", href: "/docs" },
            ]}
          />

          <FooterGroup
            title="Connect"
            links={[
              { label: "GitHub", href: "https://github.com/dzakwannajmi/FainPi" },
              { label: "Docs", href: "/docs" },
              { label: "Workshop", href: "/docs" },
              { label: "Submission", href: "/docs" },
            ]}
          />
        </div>

        <div className="mx-auto mt-16 flex max-w-6xl flex-wrap items-center justify-between gap-4 border-t border-[hsl(var(--border))] pt-8 text-sm text-[hsl(var(--muted-foreground))]">
          <p>© 2026 FainPi. All rights reserved.</p>

          <div className="flex gap-5">
            <Link href="/docs" className="hover:text-[hsl(var(--foreground))]">
              Privacy
            </Link>

            <Link href="/docs" className="hover:text-[hsl(var(--foreground))]">
              Terms
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

function FooterGroup({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string }[];
}) {
  return (
    <div>
      <h4 className="text-sm font-semibold text-[hsl(var(--foreground))]">
        {title}
      </h4>

      <ul className="mt-4 space-y-3">
        {links.map((link) => (
          <li key={link.label}>
            <Link
              href={link.href}
              className="text-sm text-[hsl(var(--muted-foreground))] transition hover:text-[hsl(var(--foreground))]"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}