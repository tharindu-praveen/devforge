"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";

export default function PasswordGeneratorPage() {
  const [password, setPassword] = useState("");
  const [length, setLength] = useState(16);

  const [uppercase, setUppercase] = useState(true);
  const [lowercase, setLowercase] = useState(true);
  const [numbers, setNumbers] = useState(true);
  const [symbols, setSymbols] = useState(false);

  const generatePassword = useCallback(() => {
    let chars = "";

    if (uppercase) chars += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (lowercase) chars += "abcdefghijklmnopqrstuvwxyz";
    if (numbers) chars += "0123456789";
    if (symbols) chars += "!@#$%^&*()_+-=[]{}|;:,.<>?";

    if (!chars) {
      setPassword("");
      return;
    }

    let generated = "";

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(
        Math.random() * chars.length
      );

      generated += chars[randomIndex];
    }

    setPassword(generated);
  }, [length, lowercase, numbers, symbols, uppercase]);

  const copyPassword = async () => {
    if (!password) return;

    await navigator.clipboard.writeText(password);
    alert("Password copied!");
  };

  const getStrength = () => {
    let score = 0;

    if (length >= 12) score++;
    if (length >= 16) score++;
    if (uppercase) score++;
    if (lowercase) score++;
    if (numbers) score++;
    if (symbols) score++;

    if (score <= 2)
      return {
        text: "Weak",
        color: "text-red-500",
      };

    if (score <= 4)
      return {
        text: "Medium",
        color: "text-yellow-500",
      };

    return {
      text: "Strong",
      color: "text-green-500",
    };
  };

  const strength = getStrength();

  useEffect(() => {
    queueMicrotask(generatePassword);
  }, [generatePassword]);

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
          Password Generator
        </h1>

        <p className="mt-2 text-slate-400">
          Generate strong and secure passwords.
        </p>

        <div className="mt-8 rounded-2xl border border-slate-800 bg-slate-900 p-6">
          <div className="rounded-xl bg-slate-950 p-4">
            <div className="break-all text-lg font-mono">
              {password}
            </div>
          </div>

          <div className="mt-4 flex flex-wrap gap-3">
            <button
              onClick={generatePassword}
              className="rounded-lg bg-blue-600 px-4 py-2 hover:bg-blue-700"
            >
              Generate
            </button>

            <button
              onClick={copyPassword}
              className="rounded-lg border border-slate-700 px-4 py-2 hover:bg-slate-800"
            >
              Copy
            </button>
          </div>

          <div className="mt-6">
            <label className="font-medium">
              Length: {length}
            </label>

            <input
              type="range"
              min={4}
              max={64}
              value={length}
              onChange={(e) =>
                setLength(Number(e.target.value))
              }
              className="mt-2 w-full"
            />
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={uppercase}
                onChange={() =>
                  setUppercase(!uppercase)
                }
              />
              Uppercase Letters
            </label>

            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={lowercase}
                onChange={() =>
                  setLowercase(!lowercase)
                }
              />
              Lowercase Letters
            </label>

            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={numbers}
                onChange={() =>
                  setNumbers(!numbers)
                }
              />
              Numbers
            </label>

            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={symbols}
                onChange={() =>
                  setSymbols(!symbols)
                }
              />
              Symbols
            </label>
          </div>

          <div className="mt-6">
            <span className="font-medium">
              Strength:
            </span>{" "}
            <span className={strength.color}>
              {strength.text}
            </span>
          </div>
        </div>
      </div>
    </main>
  );
}
