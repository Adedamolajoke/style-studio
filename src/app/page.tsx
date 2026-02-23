"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  Palette, 
  Type, 
  Copy, 
  Check, 
  RefreshCw, 
  Download,
  Share2,
  Moon,
  Sun,
  Shuffle
} from "lucide-react";
import { colord, extend } from "colord";
import names from "colord/plugins/names";
import a11y from "colord/plugins/a11y";
import harmonies from "colord/plugins/harmonies";
import Values from "values.js";

extend([names, a11y, harmonies]);

interface ColorState {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  foreground: string;
  muted: string;
}

interface TypographyState {
  fontFamily: string;
  fontSize: number;
  fontWeight: number;
  lineHeight: number;
  letterSpacing: number;
}

const GOOGLE_FONTS = [
  "Inter",
  "Playfair Display",
  "JetBrains Mono",
  "Space Grotesk",
  "DM Sans",
  "Source Serif Pro",
  "Work Sans",
  "Crimson Pro",
  "Fira Code",
  "Sora",
  "Lora",
  "Space Mono",
];

export default function StyleStudio() {
  const [activeTab, setActiveTab] = useState<"color" | "typography">("color");
  const [darkMode, setDarkMode] = useState(true);
  const [copied, setCopied] = useState(false);
  
  const [colors, setColors] = useState<ColorState>({
    primary: "#6366f1",
    secondary: "#8b5cf6",
    accent: "#f43f5e",
    background: "#0f172a",
    foreground: "#f8fafc",
    muted: "#64748b",
  });

  const [typography, setTypography] = useState<TypographyState>({
    fontFamily: "Inter",
    fontSize: 16,
    fontWeight: 400,
    lineHeight: 1.5,
    letterSpacing: 0,
  });

  const [generatedPalette, setGeneratedPalette] = useState<string[]>([]);

  useEffect(() => {
    try {
      const values = new Values(colors.primary);
      const shades = values.all(10).map((v: any) => v.hex);
      setGeneratedPalette(shades);
    } catch (e) {
      setGeneratedPalette([]);
    }
  }, [colors.primary]);

  const generateRandomColors = () => {
    const randomColor = () => '#' + Math.floor(Math.random()*16777215).toString(16).padStart(6, '0');
    setColors({
      primary: randomColor(),
      secondary: randomColor(),
      accent: randomColor(),
      background: darkMode ? "#0f172a" : "#ffffff",
      foreground: darkMode ? "#f8fafc" : "#0f172a",
      muted: darkMode ? "#64748b" : "#94a3b8",
    });
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const exportConfig = () => {
    const config = { colors, typography, darkMode };
    const blob = new Blob([JSON.stringify(config, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "style-studio-config.json";
    a.click();
  };

  const colorInfo = (color: string) => {
    const c = colord(color);
    return {
      hex: c.toHex(),
      luminance: c.luminance(),
    };
  };

  return (
    <div className="min-h-screen bg-slate-950">
      <header className="border-b border-slate-800 bg-slate-950/50 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                <Palette className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-semibold text-white">Style Studio</h1>
                <p className="text-xs text-slate-400">Color & Typography Playground</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <button
                onClick={() => setDarkMode(!darkMode)}
                className="p-2 rounded-lg bg-slate-800 text-slate-300 hover:bg-slate-700 transition-colors"
              >
                {darkMode ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
              </button>
              <button
                onClick={generateRandomColors}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-800 text-slate-300 hover:bg-slate-700 transition-colors"
              >
                <Shuffle className="w-4 h-4" />
                <span className="hidden sm:inline">Randomize</span>
              </button>
              <button
                onClick={exportConfig}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-500 transition-colors"
              >
                <Download className="w-4 h-4" />
                <span className="hidden sm:inline">Export</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-12 gap-8">
          <div className="lg:col-span-4 space-y-6">
            <div className="flex p-1 bg-slate-900 rounded-xl">
              <button
                onClick={() => setActiveTab("color")}
                className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-lg font-medium transition-all ${
                  activeTab === "color" ? "bg-slate-800 text-white shadow-lg" : "text-slate-400 hover:text-slate-200"
                }`}
              >
                <Palette className="w-4 h-4" />
                Colors
              </button>
              <button
                onClick={() => setActiveTab("typography")}
                className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-lg font-medium transition-all ${
                  activeTab === "typography" ? "bg-slate-800 text-white shadow-lg" : "text-slate-400 hover:text-slate-200"
                }`}
              >
                <Type className="w-4 h-4" />
                Typography
              </button>
            </div>

            {activeTab === "color" && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
                {Object.entries(colors).map(([key, value]) => (
                  <div key={key} className="p-4 bg-slate-900 rounded-xl border border-slate-800">
                    <label className="block text-sm font-medium text-slate-300 mb-2 capitalize">{key}</label>
                    <div className="flex gap-3">
                      <input
                        type="color"
                        value={value}
                        onChange={(e) => setColors({ ...colors, [key]: e.target.value })}
                        className="w-12 h-10 rounded-lg cursor-pointer bg-transparent border-0"
                      />
                      <input
                        type="text"
                        value={value}
                        onChange={(e) => setColors({ ...colors, [key]: e.target.value })}
                        className="flex-1 px-3 py-2 bg-slate-800 rounded-lg text-sm font-mono text-slate-300 border border-slate-700 focus:border-indigo-500 focus:outline-none uppercase"
                      />
                    </div>
                  </div>
                ))}
              </motion.div>
            )}

            {activeTab === "typography" && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
                <div className="p-4 bg-slate-900 rounded-xl border border-slate-800">
                  <label className="block text-sm font-medium text-slate-300 mb-2">Font Family</label>
                  <select
                    value={typography.fontFamily}
                    onChange={(e) => setTypography({ ...typography, fontFamily: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-800 rounded-lg text-sm text-slate-300 border border-slate-700 focus:border-indigo-500 focus:outline-none"
                  >
                    {GOOGLE_FONTS.map((font) => (
                      <option key={font} value={font}>{font}</option>
                    ))}
                  </select>
                </div>

                <div className="p-4 bg-slate-900 rounded-xl border border-slate-800">
                  <label className="block text-sm font-medium text-slate-300 mb-2">Font Size: {typography.fontSize}px</label>
                  <input type="range" min={12} max={72} value={typography.fontSize}
                    onChange={(e) => setTypography({ ...typography, fontSize: parseInt(e.target.value) })}
                    className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer"
                  />
                </div>

                <div className="p-4 bg-slate-900 rounded-xl border border-slate-800">
                  <label className="block text-sm font-medium text-slate-300 mb-2">Font Weight: {typography.fontWeight}</label>
                  <input type="range" min={100} max={900} step={100} value={typography.fontWeight}
                    onChange={(e) => setTypography({ ...typography, fontWeight: parseInt(e.target.value) })}
                    className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer"
                  />
                </div>
              </motion.div>
            )}

            {generatedPalette.length > 0 && (
              <div className="p-4 bg-slate-900 rounded-xl border border-slate-800">
                <h3 className="text-sm font-medium text-slate-300 mb-3">Generated Shades</h3>
                <div className="grid grid-cols-5 gap-2">
                  {generatedPalette.map((shade, i) => (
                    <button
                      key={i}
                      onClick={() => copyToClipboard(shade)}
                      className="aspect-square rounded-lg transition-transform hover:scale-110"
                      style={{ backgroundColor: shade }}
                      title={shade}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="lg:col-span-8">
            <div className="rounded-2xl overflow-hidden border border-slate-800 shadow-2xl"
              style={{ backgroundColor: darkMode ? colors.background : colors.foreground, color: darkMode ? colors.foreground : colors.background }}>
              <div className="p-6 border-b border-current border-opacity-10">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: colors.accent }} />
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: colors.secondary }} />
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: colors.primary }} />
                  </div>
                  <span className="text-xs opacity-50 font-mono">Preview</span>
                </div>
              </div>

              <div className="p-8 space-y-8">
                <div className="space-y-4">
                  <span className="inline-block px-3 py-1 rounded-full text-xs font-medium"
                    style={{ backgroundColor: colors.primary + "20", color: colors.primary }}>
                    Welcome to Style Studio
                  </span>
                  <h1 className="text-4xl md:text-5xl font-bold"
                    style={{ fontFamily: typography.fontFamily, fontWeight: typography.fontWeight }}>
                    Design with <span style={{ color: colors.primary }}>Confidence</span>
                  </h1>
                  <p className="text-lg max-w-2xl" style={{ color: colors.muted, fontFamily: typography.fontFamily }}>
                    Experiment with colors, generate palettes, pair fonts, and create beautiful design systems in real-time.
                  </p>
                  <div className="flex gap-4 pt-4">
                    <button className="px-6 py-3 rounded-lg font-medium transition-transform hover:scale-105"
                      style={{ backgroundColor: colors.primary, color: darkMode ? colors.background : colors.foreground }}>
                      Get Started
                    </button>
                    <button className="px-6 py-3 rounded-lg font-medium border-2 transition-transform hover:scale-105"
                      style={{ borderColor: colors.muted, color: colors.muted }}>
                      Learn More
                    </button>
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-4 pt-8">
                  {[
                    { title: "Colors", desc: "Generate and test palettes" },
                    { title: "Typography", desc: "Pair fonts and styles" },
                    { title: "Export", desc: "Download your config" },
                  ].map((item, i) => (
                    <div key={i} className="p-6 rounded-xl border border-current border-opacity-10"
                      style={{ backgroundColor: darkMode ? colors.background : colors.foreground }}>
                      <h3 className="font-semibold mb-2" style={{ color: colors.foreground }}>{item.title}</h3>
                      <p className="text-sm" style={{ color: colors.muted }}>{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
