"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Palette, Type, Download, Moon, Sun, LayoutTemplate } from "lucide-react";
import Values from "values.js";

const STYLE_PRESETS = {
  editorial: {
    name: "Editorial Portfolio",
    colors: { primary: "#9F1239", secondary: "#FBCFE8", accent: "#F59E0B", background: "#FFFBF7", foreground: "#1C1917", muted: "#78716C" },
    fonts: { display: "DM Serif Display", headline: "Anton", body: "Poppins", mono: "Fragment Mono" },
    darkMode: false,
  },
  dashboard: {
    name: "Dark Dashboard",
    colors: { primary: "#F59E0B", secondary: "#10B981", accent: "#6366F1", background: "#0A0A0A", foreground: "#FAFAF9", muted: "#A8A29E" },
    fonts: { display: "Inter", headline: "Inter", body: "Inter", mono: "JetBrains Mono" },
    darkMode: true,
  },
  mobile: {
    name: "Purple Mobile",
    colors: { primary: "#7C3AED", secondary: "#A78BFA", accent: "#EC4899", background: "#FFFFFF", foreground: "#18181B", muted: "#71717A" },
    fonts: { display: "Inter", headline: "Inter", body: "Inter", mono: "Fragment Mono" },
    darkMode: false,
  },
};

export default function StyleStudio() {
  const [selectedPreset, setSelectedPreset] = useState<keyof typeof STYLE_PRESETS>("editorial");
  const [activeTab, setActiveTab] = useState<"presets" | "colors" | "typography">("presets");
  const preset = STYLE_PRESETS[selectedPreset];
  const [colors, setColors] = useState(preset.colors);
  const [fonts, setFonts] = useState(preset.fonts);
  const [darkMode, setDarkMode] = useState(preset.darkMode);

  useEffect(() => {
    setColors(preset.colors);
    setFonts(preset.fonts);
    setDarkMode(preset.darkMode);
  }, [selectedPreset, preset]);

  const shades = new Values(colors.primary).all(10).map((v: any) => v.hex);

  return (
    <div style={{ backgroundColor: colors.background, color: colors.foreground, minHeight: "100vh" }}>
      <header style={{ borderBottom: "1px solid rgba(128,128,128,0.2)", padding: "16px 24px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ width: 40, height: 40, borderRadius: 12, backgroundColor: colors.primary, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Palette size={20} color="white" />
            </div>
            <div>
              <h1 style={{ margin: 0, fontFamily: fonts.display, fontSize: 20 }}>Style Studio</h1>
              <p style={{ margin: 0, opacity: 0.6, fontSize: 12 }}>Your Personal Design System</p>
            </div>
          </div>
          <div style={{ display: "flex", gap: 12 }}>
            <button onClick={() => setDarkMode(!darkMode)} style={{ padding: 8, borderRadius: 8, border: "none", background: "rgba(128,128,128,0.1)", cursor: "pointer" }}>
              {darkMode ? <Moon size={18} /> : <Sun size={18} />}
            </button>
            <button style={{ padding: "8px 16px", borderRadius: 8, border: "none", backgroundColor: colors.primary, color: "white", display: "flex", alignItems: "center", gap: 8 }}>
              <Download size={16} /> Export
            </button>
          </div>
        </div>
      </header>

      <div style={{ maxWidth: 1200, margin: "0 auto", padding: 32, display: "grid", gridTemplateColumns: "1fr 2fr", gap: 32 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={{ display: "flex", gap: 8, padding: 4, backgroundColor: "rgba(128,128,128,0.05)", borderRadius: 12 }}>
            {["presets", "colors", "typography"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as any)}
                style={{
                  flex: 1,
                  padding: "10px 16px",
                  borderRadius: 8,
                  border: "none",
                  backgroundColor: activeTab === tab ? (darkMode ? "rgba(255,255,255,0.1)" : "white") : "transparent",
                  color: activeTab === tab ? colors.foreground : colors.muted,
                  fontWeight: activeTab === tab ? 600 : 400,
                  cursor: "pointer",
                  fontSize: 14,
                }}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          {activeTab === "presets" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {Object.entries(STYLE_PRESETS).map(([key, p]) => (
                <button
                  key={key}
                  onClick={() => setSelectedPreset(key as any)}
                  style={{
                    padding: 16,
                    borderRadius: 12,
                    border: selectedPreset === key ? `2px solid ${p.colors.primary}` : "2px solid transparent",
                    backgroundColor: "rgba(128,128,128,0.03)",
                    textAlign: "left",
                    cursor: "pointer",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
                    <div style={{ width: 32, height: 32, borderRadius: 8, backgroundColor: p.colors.primary }} />
                    <span style={{ fontWeight: 600 }}>{p.name}</span>
                  </div>
                  <p style={{ margin: 0, opacity: 0.6, fontSize: 13 }}>{p.description}</p>
                  <div style={{ display: "flex", gap: 6, marginTop: 12 }}>
                    {Object.values(p.colors).slice(0, 4).map((c, i) => (
                      <div key={i} style={{ width: 24, height: 24, borderRadius: "50%", backgroundColor: c }} />
                    ))}
                  </div>
                </button>
              ))}
            </motion.div>
          )}

          {activeTab === "colors" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {Object.entries(colors).map(([key, value]) => (
                <div key={key} style={{ padding: 12, backgroundColor: "rgba(128,128,128,0.03)", borderRadius: 12 }}>
                  <label style={{ fontSize: 11, textTransform: "uppercase", opacity: 0.5, letterSpacing: 1 }}>{key}</label>
                  <div style={{ display: "flex", gap: 8, marginTop: 6 }}>
                    <input type="color" value={value} onChange={(e) => setColors({ ...colors, [key]: e.target.value })} style={{ width: 40, height: 40, border: "none", borderRadius: 8, cursor: "pointer" }} />
                    <input type="text" value={value} onChange={(e) => setColors({ ...colors, [key]: e.target.value })} style={{ flex: 1, padding: "8px 12px", borderRadius: 8, border: "1px solid rgba(128,128,128,0.2)", fontFamily: "monospace", textTransform: "uppercase" }} />
                  </div>
                </div>
              ))}
              <div style={{ padding: 16, backgroundColor: "rgba(128,128,128,0.03)", borderRadius: 12 }}>
                <label style={{ fontSize: 11, textTransform: "uppercase", opacity: 0.5, letterSpacing: 1 }}>Generated Shades</label>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 6, marginTop: 12 }}>
                  {shades.map((shade: string, i: number) => (
                    <div key={i} style={{ aspectRatio: "1", borderRadius: 8, backgroundColor: shade }} />
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === "typography" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {Object.entries(fonts).map(([key, value]) => (
                <div key={key} style={{ padding: 12, backgroundColor: "rgba(128,128,128,0.03)", borderRadius: 12 }}>
                  <label style={{ fontSize: 11, textTransform: "uppercase", opacity: 0.5, letterSpacing: 1 }}>{key}</label>
                  <select value={value} onChange={(e) => setFonts({ ...fonts, [key]: e.target.value })} style={{ width: "100%", marginTop: 6, padding: 10, borderRadius: 8, border: "1px solid rgba(128,128,128,0.2)" }}>
                    {["DM Serif Display", "Anton", "Poppins", "Inter", "JetBrains Mono", "Fragment Mono", "Playfair Display", "Space Grotesk"].map((f) => (
                      <option key={f} value={f}>{f}</option>
                    ))}
                  </select>
                </div>
              ))}
            </motion.div>
          )}
        </div>

        <div style={{ borderRadius: 24, overflow: "hidden", boxShadow: "0 25px 50px -12px rgba(0,0,0,0.25)" }}>
          <div style={{ padding: 24, backgroundColor: colors.background, borderBottom: `1px solid ${colors.muted}20` }}>
            <div style={{ display: "flex", gap: 8 }}>
              <div style={{ width: 12, height: 12, borderRadius: "50%", backgroundColor: "#ef4444" }} />
              <div style={{ width: 12, height: 12, borderRadius: "50%", backgroundColor: "#f59e0b" }} />
              <div style={{ width: 12, height: 12, borderRadius: "50%", backgroundColor: "#10b981" }} />
            </div>
          </div>
          <div style={{ padding: 48, backgroundColor: colors.background }}>
            <span style={{ display: "inline-block", padding: "6px 14px", borderRadius: 20, backgroundColor: `${colors.primary}20`, color: colors.primary, fontSize: 12, fontWeight: 600 }}>
              Welcome
            </span>
            <h1 style={{ marginTop: 24, fontSize: 48, fontFamily: fonts.display || fonts.headline, fontWeight: 400, lineHeight: 1.1 }}>
              Design with <span style={{ color: colors.primary }}>Confidence</span>
            </h1>
            <p style={{ marginTop: 16, fontSize: 18, opacity: 0.7, maxWidth: 480, lineHeight: 1.6, fontFamily: fonts.body }}>
              Experiment with colors, generate palettes, pair fonts, and create beautiful design systems in real-time.
            </p>
            <div style={{ display: "flex", gap: 12, marginTop: 32 }}>
              <button style={{ padding: "14px 28px", borderRadius: 12, backgroundColor: colors.primary, color: "white", border: "none", fontWeight: 600, fontSize: 15 }}>
                Get Started
              </button>
              <button style={{ padding: "14px 28px", borderRadius: 12, backgroundColor: "transparent", color: colors.muted, border: `2px solid ${colors.muted}40`, fontWeight: 600, fontSize: 15 }}>
                Learn More
              </button>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, marginTop: 48 }}>
              {[
                { title: "Colors", desc: "Generate palettes" },
                { title: "Typography", desc: "Pair fonts" },
                { title: "Export", desc: "Download config" },
              ].map((item, i) => (
                <div key={i} style={{ padding: 24, borderRadius: 16, border: `1px solid ${colors.muted}20` }}>
                  <h3 style={{ margin: 0, fontSize: 16, fontWeight: 600 }}>{item.title}</h3>
                  <p style={{ margin: "8px 0 0", fontSize: 13, opacity: 0.6 }}>{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
