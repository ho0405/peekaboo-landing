"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useMotionTemplate, useMotionValue } from "motion/react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Monitor,
  Pin,
  Languages,
  Keyboard,
  Download,
  Github,
  Play,
  ChevronDown,
} from "lucide-react";
import { type Lang, getStoredLang, setStoredLang, t } from "@/lib/i18n";
import {
  type Platform,
  detectPlatform,
} from "@/lib/detect-platform";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const FEATURES_KEYS = [
  { icon: Monitor, key: "feature1" as const },
  { icon: Pin, key: "feature2" as const },
  { icon: Languages, key: "feature3" as const },
  { icon: Keyboard, key: "feature4" as const },
];

const SHORTCUT_KEYS = [
  { actionKey: "shortcut1Action" as const, key: "Ctrl + ↑" },
  { actionKey: "shortcut2Action" as const, key: "Ctrl + ↓" },
  { actionKey: "shortcut3Action" as const, key: "Ctrl + T" },
  { actionKey: "shortcut4Action" as const, key: "Ctrl + Q" },
];

const RELEASES_URL = "https://github.com/ho0405/tranparent-browser/releases";
const GITHUB_URL = "https://github.com/ho0405/tranparent-browser";

type DownloadUrls = {
  macIntel: string | null;
  macArm: string | null;
  windows: string | null;
  releasesPage: string;
};

function TiltCard({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useMotionTemplate`${y}deg`;
  const rotateY = useMotionTemplate`${x}deg`;

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const factor = 6;
    x.set(((e.clientX - centerX) / (rect.width / 2)) * factor);
    y.set((-(e.clientY - centerY) / (rect.height / 2)) * factor);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <div className={className} style={{ perspective: 1000 }}>
      <motion.div
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}

export default function Home() {
  const [lang, setLang] = useState<Lang>("en");
  const [downloadUrls, setDownloadUrls] = useState<DownloadUrls | null>(null);
  const [platform, setPlatform] = useState<Platform | null>(null);

  useEffect(() => {
    setLang(getStoredLang());
  }, []);

  useEffect(() => {
    fetch("/api/releases")
      .then((r) => r.json())
      .then(setDownloadUrls)
      .catch(() => setDownloadUrls({ macIntel: null, macArm: null, windows: null, releasesPage: RELEASES_URL }));
  }, []);

  useEffect(() => {
    detectPlatform().then(setPlatform);
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  function toggleLang() {
    const next: Lang = lang === "en" ? "ko" : "en";
    setLang(next);
    setStoredLang(next);
  }

  const txt = t[lang];

  const autoDownloadUrl =
    downloadUrls && platform
      ? platform === "mac-arm"
        ? downloadUrls.macArm
        : platform === "mac-intel"
          ? downloadUrls.macIntel
          : platform === "windows"
            ? downloadUrls.windows
            : null
      : null;

  const autoDownloadLabel =
    platform === "mac-arm"
      ? txt.downloadForMacArm
      : platform === "mac-intel"
        ? txt.downloadForMacIntel
        : platform === "windows"
          ? txt.downloadForWindows
          : txt.downloadForDevice;

  return (
    <div className="min-h-screen bg-white text-zinc-900 overflow-x-hidden">
      {/* Nav Bar */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-zinc-200/80 bg-white/80 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/peekaboo.png"
              alt="Peekaboo"
              width={32}
              height={32}
              className="rounded-lg"
            />
            <span className="font-semibold text-zinc-900">Peekaboo</span>
          </Link>
          <div className="hidden md:flex items-center gap-8">
            <Link
              href="#features"
              className="text-sm text-zinc-600 hover:text-zinc-900 transition-colors"
            >
              Features
            </Link>
            <Link
              href="#download"
              className="text-sm text-zinc-600 hover:text-zinc-900 transition-colors flex items-center gap-1"
            >
              Download
              <ChevronDown className="size-3.5" />
            </Link>
            <Link
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-zinc-600 hover:text-zinc-900 transition-colors"
            >
              GitHub
            </Link>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              className="rounded-lg text-zinc-600 hover:text-zinc-900"
              onClick={toggleLang}
              aria-label={lang === "en" ? "Switch to Korean" : "Switch to English"}
            >
              {lang === "en" ? "한" : "EN"}
            </Button>
            <Button asChild variant="outline" size="sm" className="rounded-lg">
              <Link href={GITHUB_URL} target="_blank" rel="noopener noreferrer">
                <Github className="size-4 mr-1.5" />
                GitHub
              </Link>
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero - Two Column Layout */}
      <section className="pt-24 pb-16 md:pt-32 md:pb-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left - Content */}
            <motion.div
              className="order-2 lg:order-1"
              initial={{ opacity: 0, x: -24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <Link
                href="#demo"
                className="inline-flex items-center gap-2 text-sm text-violet-600 hover:text-violet-700 mb-6 rounded-full bg-violet-50 px-3 py-1.5 w-fit transition-colors"
              >
                {txt.teaser}
              </Link>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-zinc-900 leading-[1.1] mb-6">
                {txt.heroTitle}
                <br />
                <span className="text-zinc-600">{txt.heroSubtitle}</span>
              </h1>
              <p className="text-lg text-zinc-600 mb-6 max-w-lg leading-relaxed">
                {txt.heroDesc}
              </p>
              <ul className="space-y-2 mb-8 max-w-lg">
                <li className="flex items-center gap-2 text-zinc-600">
                  <span className="size-1.5 rounded-full bg-emerald-500" />
                  {txt.bullet1}
                </li>
                <li className="flex items-center gap-2 text-zinc-600">
                  <span className="size-1.5 rounded-full bg-emerald-500" />
                  {txt.bullet2}
                </li>
                <li className="flex items-center gap-2 text-zinc-600">
                  <span className="size-1.5 rounded-full bg-emerald-500" />
                  {txt.bullet3}
                </li>
              </ul>
              <div className="flex flex-wrap gap-4 mb-10">
                <Button asChild variant="outline" size="lg" className="rounded-xl gap-2 border-zinc-300 bg-white hover:bg-zinc-50">
                  <Link href="#demo">
                    <Play className="size-4 fill-current" />
                    {txt.demo}
                  </Link>
                </Button>
                <Button asChild size="lg" className="rounded-xl gap-2 bg-zinc-900 hover:bg-zinc-800 text-white">
                  <Link href="#download">
                    <Download className="size-4" />
                    {txt.download}
                  </Link>
                </Button>
              </div>
              <div className="flex flex-wrap gap-3">
                {txt.featurePills.map((label) => (
                  <span
                    key={label}
                    className="rounded-full bg-zinc-100 px-3 py-1 text-sm text-zinc-600"
                  >
                    {label}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Right - Video Visual */}
            <motion.div
              className="order-1 lg:order-2"
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
            >
              <TiltCard>
                <div
                  id="demo"
                  className="relative overflow-hidden rounded-2xl border border-white/40 bg-white/10 backdrop-blur-sm shadow-2xl shadow-black/10 ring-1 ring-white/20"
                >
                  <div className="flex items-center justify-center p-2 md:p-4">
                    <div className="w-full max-w-3xl rounded-xl overflow-hidden shadow-xl bg-black/10 h-[340px] sm:h-[420px] md:h-[500px] lg:h-[560px]">
                      <video
                        src="/peekaboo.mp4"
                        autoPlay
                        muted
                        loop
                        playsInline
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </div>
              </TiltCard>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section
        id="features"
        className="py-20 bg-zinc-50/80 border-y border-zinc-200/60"
      >
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-2xl font-semibold text-zinc-900 text-center mb-12">
            {txt.features}
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {FEATURES_KEYS.map((f, i) => (
              <motion.div
                key={f.key}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
              >
                <Card className="h-full border-zinc-200/80 bg-white shadow-sm hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-zinc-100 text-zinc-700 mb-2">
                      <f.icon className="size-5" />
                    </div>
                    <CardTitle className="text-base text-zinc-900">{txt[`${f.key}Title`]}</CardTitle>
                    <CardDescription className="text-zinc-600">
                      {txt[`${f.key}Desc`]}
                    </CardDescription>
                  </CardHeader>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Download */}
      <section id="download" className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-2xl font-semibold text-zinc-900 text-center mb-3">
            {txt.downloadTitle}
          </h2>
          <p className="text-zinc-600 text-center mb-10">
            {txt.downloadSub}
          </p>
          <div className="flex flex-wrap justify-center items-center gap-4">
            <Button asChild size="lg" className="gap-2 rounded-xl">
              <a
                href={autoDownloadUrl ?? downloadUrls?.releasesPage ?? RELEASES_URL}
                target="_blank"
                rel="noopener noreferrer"
                download={!!autoDownloadUrl}
              >
                <Download className="size-4" />
                {autoDownloadUrl ? autoDownloadLabel : txt.download}
              </a>
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="lg" className="gap-2 rounded-xl">
                  {txt.otherDownloads}
                  <ChevronDown className="size-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="center" className="w-56">
                <DropdownMenuItem asChild>
                  <a
                    href={downloadUrls?.macIntel ?? RELEASES_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    download={!!downloadUrls?.macIntel}
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <Download className="size-4" />
                    Mac (Intel) .dmg
                  </a>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <a
                    href={downloadUrls?.macArm ?? RELEASES_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    download={!!downloadUrls?.macArm}
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <Download className="size-4" />
                    Mac (Apple Silicon) .dmg
                  </a>
                </DropdownMenuItem>
                {downloadUrls?.windows ? (
                  <DropdownMenuItem asChild>
                    <a
                      href={downloadUrls.windows}
                      target="_blank"
                      rel="noopener noreferrer"
                      download
                      className="flex items-center gap-2 cursor-pointer"
                    >
                      <Download className="size-4" />
                      Windows .exe
                    </a>
                  </DropdownMenuItem>
                ) : (
                  <DropdownMenuItem disabled className="flex items-center gap-2 opacity-70">
                    <Download className="size-4" />
                    Windows .exe ({txt.comingSoon})
                  </DropdownMenuItem>
                )}
                <DropdownMenuItem asChild>
                  <a
                    href={downloadUrls?.releasesPage ?? RELEASES_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <Github className="size-4" />
                    {txt.allReleases}
                  </a>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </section>

      {/* Shortcuts */}
      <section className="py-20 bg-zinc-50/80">
        <div className="max-w-2xl mx-auto px-6">
          <TiltCard>
            <Card className="border-zinc-200/80 bg-white shadow-sm overflow-hidden">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl text-zinc-900">
                  <Keyboard className="size-5 text-zinc-700" />
                  {txt.shortcutsTitle}
                </CardTitle>
                <CardDescription className="text-zinc-600">
                  {txt.shortcutsDesc}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-0">
                  {SHORTCUT_KEYS.map((s, i) => (
                    <div
                      key={s.actionKey}
                      className={`flex justify-between items-center py-3 ${
                        i < SHORTCUT_KEYS.length - 1
                          ? "border-b border-zinc-100"
                          : ""
                      }`}
                    >
                      <span className="text-zinc-700">{txt[s.actionKey]}</span>
                      <kbd className="rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-1.5 text-sm font-mono text-zinc-600">
                        {s.key}
                      </kbd>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TiltCard>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-zinc-200/80">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <p className="text-zinc-500 text-sm">
            <Link
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-700 hover:underline"
            >
              GitHub
            </Link>
            {" · "}
            MIT License
          </p>
        </div>
      </footer>
    </div>
  );
}
