export type Lang = "en" | "ko";

const STORAGE_KEY = "peekabooLandingLang";

export function getStoredLang(): Lang {
  if (typeof window === "undefined") return "en";
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored === "ko" ? "ko" : "en";
}

export function setStoredLang(lang: Lang): void {
  localStorage.setItem(STORAGE_KEY, lang);
}

export const t = {
  en: {
    teaser: "What's new? Watch the demo →",
    heroTitle: "See through",
    heroSubtitle: "the web",
    heroDesc:
      "View web pages in a transparent window while working with other apps. Coding with reference docs, watching videos while taking notes—multitasking made easier.",
    bullet1: "Adjust opacity to see through to windows behind",
    bullet2: "Always on top keeps your workflow uninterrupted",
    bullet3: "Mac · Windows · Free & open source",
    featurePills: ["Transparent window", "Always on top", "한/EN support", "Shortcuts"],
    demo: "Demo",
    download: "Download",
    features: "Features",
    feature1Title: "Transparent window",
    feature1Desc: "Adjust opacity to see through and work with windows behind",
    feature2Title: "Always on top",
    feature2Desc: "Pin above other windows",
    feature3Title: "한/EN support",
    feature3Desc: "Language toggle button",
    feature4Title: "Shortcuts",
    feature4Desc: "Quick controls",
    downloadTitle: "Download",
    downloadSub: "Supports Mac and Windows",
    downloadForMacArm: "Download for Mac (Apple Silicon)",
    downloadForMacIntel: "Download for Mac (Intel)",
    downloadForWindows: "Download for Windows",
    downloadForDevice: "Download for your device",
    otherDownloads: "Other downloads",
    allReleases: "All releases on GitHub",
    comingSoon: "Coming soon",
    shortcutsTitle: "⌨️ Shortcuts",
    shortcutsDesc: "Keyboard shortcuts for quick access",
    shortcut1Action: "Increase opacity",
    shortcut2Action: "Decrease opacity",
    shortcut3Action: "Toggle always on top",
    shortcut4Action: "Quit",
  },
  ko: {
    teaser: "What's new? 데모 영상 보기 →",
    heroTitle: "웹을 반투명하게",
    heroSubtitle: "See through the web", // kept same per user request
    heroDesc:
      "투명 창으로 웹 페이지를 보면서 뒤 창과 함께 작업하세요. 참고 자료를 보며 코딩하고, 영상을 틀어두고 메모하는 등 멀티태스킹이 한결 수월해집니다.",
    bullet1: "투명도 조절로 뒤 창이 선명하게 보여요",
    bullet2: "항상 위 고정으로 작업 흐름을 유지해요",
    bullet3: "Mac · Windows 지원 · 무료 오픈소스",
    featurePills: ["투명 창", "항상 위", "한/영 지원", "단축키"],
    demo: "Demo",
    download: "Download",
    features: "Features",
    feature1Title: "투명 창",
    feature1Desc: "Opacity를 조절해 뒤 창을 보면서 작업",
    feature2Title: "항상 위",
    feature2Desc: "다른 창 위에 고정",
    feature3Title: "한/영 지원",
    feature3Desc: "언어 전환 버튼",
    feature4Title: "단축키",
    feature4Desc: "빠른 조작",
    downloadTitle: "다운로드",
    downloadSub: "Mac과 Windows를 지원합니다",
    downloadForMacArm: "Mac (Apple Silicon) 다운로드",
    downloadForMacIntel: "Mac (Intel) 다운로드",
    downloadForWindows: "Windows 다운로드",
    downloadForDevice: "내 기기에 맞게 다운로드",
    otherDownloads: "다른 버전",
    allReleases: "GitHub에서 전체 릴리스 보기",
    comingSoon: "준비중",
    shortcutsTitle: "⌨️ 단축키",
    shortcutsDesc: "빠른 조작을 위한 단축키",
    shortcut1Action: "투명도 증가",
    shortcut2Action: "투명도 감소",
    shortcut3Action: "항상 위 토글",
    shortcut4Action: "종료",
  },
} as const;
