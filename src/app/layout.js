import { Inter } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-main",
});

export const metadata = {
  metadataBase: new URL("https://chessio.dev"),
  title: "Chessio | Real-Time Stockfish Analysis",
  description:
    "Chessio is a powerful Chrome extension providing real-time Stockfish analysis overlaid on your live chess games. 100% offline, privacy-first, lightning fast.",
  icons: {
    icon: "/icon.png",
    apple: "/icon.png",
  },
  openGraph: {
    type: "website",
    title: "Chessio — Your AI Chess Companion",
    description:
      "Real-time Stockfish analysis directly on Chess.com and Lichess. 100% offline, powered by WebAssembly.",
    images: ["/images/screenshot-3.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Chessio — Your AI Chess Companion",
    description:
      "Real-time Stockfish analysis directly on Chess.com and Lichess. 100% offline, powered by WebAssembly.",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.variable}>
      <body>
        {children}
        <SpeedInsights />
      </body>
    </html>
  );
}
