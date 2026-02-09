/**
 * Detects user's platform for auto-download.
 * - Windows -> "windows"
 * - Mac Intel -> "mac-intel"
 * - Mac Apple Silicon -> "mac-arm"
 * - Linux/other -> "other"
 */
export type Platform = "mac-arm" | "mac-intel" | "windows" | "other";

export async function detectPlatform(): Promise<Platform> {
  if (typeof navigator === "undefined") return "other";

  const ua = navigator.userAgent.toLowerCase();
  const isWin = ua.includes("win32") || ua.includes("windows");
  const isMac = ua.includes("mac") || navigator.platform?.toLowerCase().includes("mac");

  if (isWin) return "windows";
  if (!isMac) return "other";

  // Try User-Agent Client Hints for Mac architecture (Chrome 90+, Edge)
  try {
    const uaData = (navigator as Navigator & { userAgentData?: { getHighEntropyValues: (hints: string[]) => Promise<{ architecture?: string }> } }).userAgentData;
    if (uaData?.getHighEntropyValues) {
      const values = await uaData.getHighEntropyValues(["architecture"]);
      const arch = (values.architecture ?? "").toLowerCase();
      if (arch === "arm" || arch === "arm64") return "mac-arm";
      if (arch === "x86" || arch === "x86_64") return "mac-intel";
    }
  } catch {
    // ignore
  }

  // Fallback: newer Macs are likely Apple Silicon, default to arm
  return "mac-arm";
}
