import { NextResponse } from "next/server";

const REPO = "ho0405/tranparent-browser";

type Asset = {
  name: string;
  browser_download_url: string;
};

type Release = {
  assets: Asset[];
};

export async function GET() {
  try {
    const res = await fetch(
      `https://api.github.com/repos/${REPO}/releases/latest`,
      {
        headers: {
          Accept: "application/vnd.github+json",
          "X-GitHub-Api-Version": "2022-11-28",
        },
        next: { revalidate: 3600 }, // cache 1 hour
      }
    );
    if (!res.ok) throw new Error("Failed to fetch release");
    const data = (await res.json()) as Release;

    const assets = data.assets || [];
    const macIntel = assets.find((a) => a.name.includes(".dmg") && !a.name.toLowerCase().includes("arm64"));
    const macArm = assets.find((a) => a.name.toLowerCase().includes("arm64"));
    const win = assets.find((a) => a.name.endsWith(".exe"));

    return NextResponse.json({
      macIntel: macIntel?.browser_download_url ?? null,
      macArm: macArm?.browser_download_url ?? null,
      windows: win?.browser_download_url ?? null,
      releasesPage: `https://github.com/${REPO}/releases`,
    });
  } catch (e) {
    return NextResponse.json(
      {
        macIntel: null,
        macArm: null,
        windows: null,
        releasesPage: `https://github.com/${REPO}/releases`,
      },
      { status: 200 }
    );
  }
}
