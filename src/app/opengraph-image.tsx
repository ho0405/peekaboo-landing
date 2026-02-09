import { ImageResponse } from "next/og";

export const alt = "Peekaboo – See through the web";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #fafafa 0%, #f4f4f5 50%, #e4e4e7 100%)",
        }}
      >
        <img
          src="https://peekaboo-daol.vercel.app/peekaboo.png"
          alt="Peekaboo"
          width={180}
          height={180}
          style={{ borderRadius: 36, marginBottom: 24 }}
        />
        <div
          style={{
            fontSize: 72,
            fontWeight: 700,
            color: "#18181b",
            textAlign: "center",
          }}
        >
          Peekaboo
        </div>
        <div
          style={{
            fontSize: 32,
            color: "#71717a",
            marginTop: 12,
          }}
        >
          See through the web
        </div>
      </div>
    ),
    { ...size }
  );
}
