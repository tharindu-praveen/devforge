"use client";

import Link from "next/link";
import { useState } from "react";
import { QRCodeSVG } from "qrcode.react";

export default function QRGeneratorPage() {
  const [text, setText] = useState(
    "https://github.com"
  );

  const downloadQR = () => {
    const svg = document.querySelector("svg");

    if (!svg) return;

    const svgData = new XMLSerializer().serializeToString(svg);

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    const img = new Image();

    img.onload = () => {
      canvas.width = 300;
      canvas.height = 300;

      ctx?.drawImage(img, 0, 0);

      const pngFile = canvas.toDataURL("image/png");

      const downloadLink =
        document.createElement("a");

      downloadLink.download = "qrcode.png";
      downloadLink.href = pngFile;
      downloadLink.click();
    };

    img.src =
      "data:image/svg+xml;base64," +
      btoa(svgData);
  };

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto max-w-4xl px-6 py-12">
        <Link
          href="/"
          className="text-slate-400 hover:text-white"
        >
          ← Back to Home
        </Link>

        <h1 className="mt-6 text-4xl font-bold">
          QR Generator
        </h1>

        <p className="mt-2 text-slate-400">
          Generate downloadable QR codes.
        </p>

        <div className="mt-8 rounded-2xl border border-slate-800 bg-slate-900 p-6">
          <input
            type="text"
            value={text}
            onChange={(e) =>
              setText(e.target.value)
            }
            placeholder="Enter text or URL"
            className="w-full rounded-xl border border-slate-700 bg-slate-950 p-4"
          />

          <div className="mt-8 flex justify-center">
            <div className="rounded-2xl bg-white p-6">
              <QRCodeSVG
                value={text}
                size={250}
              />
            </div>
          </div>

          <div className="mt-8 flex justify-center">
            <button
              onClick={downloadQR}
              className="rounded-lg bg-blue-600 px-5 py-2 hover:bg-blue-700"
            >
              Download QR
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}