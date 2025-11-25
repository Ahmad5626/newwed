"use client";

import { useState } from "react";
import { INVITE_TEMPLATES } from "@/app/utils/invite-templates";
import { useParams } from "next/navigation";
import domtoimage from "dom-to-image";
export default function InviteEditor() {
    const { templateId } = useParams(); 
    const template = INVITE_TEMPLATES.find(t => t.id === templateId);
  const [form, setForm] = useState({
    nameA: "Richard",
    nameB: "Olivia",
    dateLine: "SUNDAY\nAUGUST 26 2025\nAT 10 PM",
    venue: "123 Anywhere St., Any City, USA",
    subtitle: "Please Join Us To Celebrate\nThe Wedding Of",
  });

 

const handleDownload = () => {
  const card = document.getElementById("finalCard");

  domtoimage
    .toPng(card, { quality: 1 })
    .then((dataUrl) => {
      const link = document.createElement("a");
      link.download = "invite-card.png";
      link.href = dataUrl;
      link.click();
    })
    .catch((error) => {
      console.error("Error generating image:", error);
    });
};


  const onChange = (key) => (e) =>
    setForm((s) => ({ ...s, [key]: e.target.value }));

  return (
    <div style={{ maxWidth: 1100, margin: "24px auto", padding: 20, fontFamily: "Lora, serif" }}>
      <h2 style={{ fontFamily: "Playfair Display, serif", fontSize: 28, marginBottom: 12 }}>
        Elegant Invite — Live Editor
      </h2>

      <div style={{ display: "flex", gap: 20, alignItems: "flex-start" }}>
        {/* Form */}
        <div style={{ flex: "0 0 340px" }}>
          <label style={{ display: "block", marginBottom: 8, fontWeight: 600 }}>Couple First Name</label>
          <input value={form.nameA} onChange={onChange("nameA")} style={inputStyle} />

          <label style={{ display: "block", marginTop: 12, marginBottom: 8, fontWeight: 600 }}>Couple Second Name</label>
          <input value={form.nameB} onChange={onChange("nameB")} style={inputStyle} />

          <label style={{ display: "block", marginTop: 12, marginBottom: 8, fontWeight: 600 }}>Subtitle / Intro</label>
          <textarea value={form.subtitle} onChange={onChange("subtitle")} rows={3} style={textareaStyle} />

          <label style={{ display: "block", marginTop: 12, marginBottom: 8, fontWeight: 600 }}>Date Line</label>
          <textarea value={form.dateLine} onChange={onChange("dateLine")} rows={3} style={textareaStyle} />

          <label style={{ display: "block", marginTop: 12, marginBottom: 8, fontWeight: 600 }}>Venue</label>
          <input value={form.venue} onChange={onChange("venue")} style={inputStyle} />

          <div style={{ marginTop: 16, display: "flex", gap: 8 }}>
            <button onClick={handleDownload} style={downloadBtnStyle}>
              Download PNG
            </button>
            <button onClick={() => {
              setForm({
                nameA: "Richard",
                nameB: "Olivia",
                dateLine: "SUNDAY\nAUGUST 26 2025\nAT 10 PM",
                venue: "123 Anywhere St., Any City, USA",
                subtitle: "Please Join Us To Celebrate\nThe Wedding Of",
              });
            }} style={resetBtnStyle}>
              Reset
            </button>
          </div>
        </div>

        {/* Preview (html2canvas safe: inline styles only) */}
        <div style={{ flex: 1, display: "flex", justifyContent: "center" }}>
          <div
            id="finalCard"
            style={{
              width: 520,
              height: 700,
              position: "relative",
              overflow: "hidden",
              backgroundColor: "#f7f1ec",
              boxShadow: "0 10px 30px rgba(0,0,0,0.12)",
              borderRadius: 10,
            }}
          >
            {/* Background image */}
          <img src={template.image} alt="Template" width={520} height={700} className="rounded-lg" />
            

            {/* Soft translucent overlay so text is readable */}
            {/* <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(180deg, rgba(255,255,255,0.6) 0%, rgba(255,255,255,0.85) 200%)",
                pointerEvents: "none",
              }}
            /> */}

            {/* Center content */}
            <div
              style={{
                position: "absolute",
                left: 48,
                right: 48,
                top: 72,
                bottom: 72,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
                gap: 14,
                color: "#2b2b2b",
                pointerEvents: "none",
              }}
            >
              {/* Subtitle / small heading */}
              <div style={{ fontFamily: "Lora, serif", fontSize: 14, letterSpacing: 1.2 }}>
                {form.subtitle.split("\n").map((line, i) => <div key={i}>{line}</div>)}
              </div>

              {/* Big names (script font) */}
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{ fontFamily: "Great Vibes, citadel script", fontSize: 50, lineHeight: 0.9 }}>
                  {form.nameA}
                </div>
                <div style={{ fontSize: 28, color: "#a88b6f", fontWeight: 700, transform: "translateY(-6px)" }}>
                  &
                </div>
                <div style={{ fontFamily: "Great Vibes, citalic", fontSize: 50, lineHeight: 0.9 }}>
                  {form.nameB}
                </div>
              </div>

              {/* Sub date line (serif) */}
              <div style={{ fontFamily: "Playfair Display, serif", fontSize: 14, letterSpacing: 1.4, color: "#5b5246" }}>
                {form.dateLine.split("\n").map((line, i) => <div key={i}>{line}</div>)}
              </div>

              {/* Decorative rule */}
              <div style={{ width: 160, height: 2, background: "#e6d8c7", marginTop: 6, borderRadius: 2 }} />

              {/* Venue */}
              <div style={{ fontFamily: "Lora, serif", fontSize: 13, color: "#4a4238", marginTop: 6 }}>
                {form.venue}
              </div>
            </div>

            {/* Small bottom ornament / credit area */}
            <div style={{ position: "absolute", bottom: 12, left: 16, right: 16, textAlign: "center", fontSize: 11, color: "#9a8f84", pointerEvents: "none" }}>
              <span>Invited with love • RSVP at example@email.com</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// simple shared inline styles (kept outside component for brevity)
const inputStyle = {
  width: "100%",
  padding: "10px 12px",
  border: "1px solid #ddd",
  borderRadius: 6,
  fontSize: 14,
  boxSizing: "border-box",
};

const textareaStyle = {
  width: "100%",
  padding: "10px 12px",
  border: "1px solid #ddd",
  borderRadius: 6,
  fontSize: 14,
  boxSizing: "border-box",
};

const downloadBtnStyle = {
  background: "#b9855f",
  color: "#fff",
  border: "none",
  padding: "10px 16px",
  borderRadius: 8,
  cursor: "pointer",
  fontWeight: 600,
};

const resetBtnStyle = {
  background: "#f3f3f3",
  color: "#333",
  border: "1px solid #ddd",
  padding: "10px 12px",
  borderRadius: 8,
  cursor: "pointer",
};
