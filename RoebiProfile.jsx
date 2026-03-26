import { useState, useEffect } from "react";

const LINKS = [
  { label: "new-work-skills.dev", href: "https://new-work-skills.dev", desc: "The methodology & skill cards", icon: "🌐" },
  { label: "Blog", href: "https://roebi.github.io/roebi-halter-in-blog", desc: "What I'm learning & building", icon: "📝" },
  { label: "GitHub", href: "https://github.com/roebi", desc: "Open source skills & projects", icon: "⚙️" },
];

const TAGLINE = "New Work with Skills · Swiss Open Source · AI-augmented Engineering";

function TypingText({ text, speed = 40, delay = 0, className = "" }) {
  const [displayed, setDisplayed] = useState("");
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setStarted(true), delay);
    return () => clearTimeout(t);
  }, [delay]);

  useEffect(() => {
    if (!started) return;
    if (displayed.length >= text.length) return;
    const t = setTimeout(() => setDisplayed(text.slice(0, displayed.length + 1)), speed);
    return () => clearTimeout(t);
  }, [started, displayed, text, speed]);

  return (
    <span className={className}>
      {displayed}
      {displayed.length < text.length && (
        <span style={{ animation: "blink 1s step-end infinite", borderRight: "2px solid #c9a84c", marginLeft: 1 }}>&nbsp;</span>
      )}
    </span>
  );
}

function LinkCard({ href, label, desc, icon, delay }) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), delay);
    return () => clearTimeout(t);
  }, [delay]);

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        display: "flex",
        alignItems: "center",
        gap: "16px",
        padding: "14px 20px",
        background: "rgba(78,205,196,0.05)",
        border: "1px solid rgba(78,205,196,0.2)",
        borderRadius: "8px",
        textDecoration: "none",
        transition: "all 0.25s ease",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(12px)",
        cursor: "pointer",
      }}
      onMouseEnter={e => {
        e.currentTarget.style.background = "rgba(201,168,76,0.08)";
        e.currentTarget.style.borderColor = "rgba(201,168,76,0.5)";
        e.currentTarget.style.transform = "translateX(4px)";
      }}
      onMouseLeave={e => {
        e.currentTarget.style.background = "rgba(78,205,196,0.05)";
        e.currentTarget.style.borderColor = "rgba(78,205,196,0.2)";
        e.currentTarget.style.transform = "translateX(0)";
      }}
    >
      <span style={{ fontSize: "24px", minWidth: "32px", textAlign: "center" }}>{icon}</span>
      <div>
        <div style={{ color: "#c9a84c", fontFamily: "'JetBrains Mono', monospace", fontWeight: 700, fontSize: "15px" }}>
          {label}
        </div>
        <div style={{ color: "#8b9ab0", fontSize: "13px", marginTop: "2px" }}>{desc}</div>
      </div>
      <span style={{ marginLeft: "auto", color: "#4ecdc4", opacity: 0.6, fontSize: "18px" }}>→</span>
    </a>
  );
}

export default function RoebiProfile() {
  const [showTagline, setShowTagline] = useState(false);
  const [showLinks, setShowLinks] = useState(false);
  const [showMethod, setShowMethod] = useState(false);

  useEffect(() => {
    setTimeout(() => setShowTagline(true), 600);
    setTimeout(() => setShowMethod(true), 2400);
    setTimeout(() => setShowLinks(true), 3000);
  }, []);

  return (
    <div style={{
      minHeight: "100vh",
      background: "#0d1117",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: "system-ui, sans-serif",
      padding: "32px 16px",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;700&display=swap');
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
        @keyframes fadeUp { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:translateY(0)} }
      `}</style>

      <div style={{ maxWidth: "560px", width: "100%" }}>

        {/* Prompt + Name */}
        <div style={{ display: "flex", alignItems: "baseline", gap: "12px", marginBottom: "8px" }}>
          <span style={{ color: "#4ecdc4", fontFamily: "'JetBrains Mono', monospace", fontSize: "28px" }}>❯</span>
          <TypingText
            text="roebi"
            speed={120}
            delay={100}
            className=""
          />
          <span style={{
            color: "#c9a84c",
            fontFamily: "'JetBrains Mono', monospace",
            fontWeight: 700,
            fontSize: "clamp(28px, 6vw, 42px)",
            letterSpacing: "-1px",
          }} />
        </div>

        {/* Name rendered large */}
        <div style={{
          color: "#c9a84c",
          fontFamily: "'JetBrains Mono', monospace",
          fontWeight: 700,
          fontSize: "clamp(32px, 8vw, 52px)",
          letterSpacing: "-1.5px",
          lineHeight: 1,
          marginBottom: "16px",
          marginLeft: "40px",
        }}>
          <TypingText text="roebi" speed={100} delay={100} />
        </div>

        {/* Tagline */}
        <div style={{
          marginLeft: "40px",
          marginBottom: "32px",
          color: "#4ecdc4",
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: "13px",
          letterSpacing: "0.5px",
          opacity: showTagline ? 1 : 0,
          transition: "opacity 0.6s ease",
          minHeight: "20px",
        }}>
          {showTagline && <TypingText text={TAGLINE} speed={22} delay={0} />}
        </div>

        {/* 1-liner method */}
        <div style={{
          marginBottom: "28px",
          padding: "16px 20px",
          borderLeft: "3px solid #c9a84c",
          background: "rgba(201,168,76,0.04)",
          borderRadius: "0 6px 6px 0",
          opacity: showMethod ? 1 : 0,
          transform: showMethod ? "translateY(0)" : "translateY(8px)",
          transition: "all 0.5s ease",
        }}>
          <div style={{ color: "#e6edf3", fontSize: "15px", lineHeight: 1.6 }}>
            I combine years of engineering experience with the <strong style={{ color: "#c9a84c" }}>New Work way</strong> —
            AI agent skills that are versioned, portable, and actually ship.
          </div>
          <div style={{ marginTop: "8px" }}>
            <a href="https://agentskills.io" target="_blank" rel="noopener noreferrer"
              style={{ color: "#4ecdc4", fontSize: "12px", fontFamily: "'JetBrains Mono', monospace", textDecoration: "none" }}>
              agentskills.io specification ↗
            </a>
          </div>
        </div>

        {/* Links */}
        <div style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          opacity: showLinks ? 1 : 0,
          transition: "opacity 0.3s ease",
        }}>
          {LINKS.map((link, i) => (
            <LinkCard key={link.href} {...link} delay={i * 150} />
          ))}
        </div>

        {/* Footer */}
        <div style={{
          marginTop: "28px",
          textAlign: "center",
          color: "#3d4f66",
          fontSize: "11px",
          fontFamily: "'JetBrains Mono', monospace",
          opacity: showLinks ? 1 : 0,
          transition: "opacity 0.5s ease 0.6s",
        }}>
          🇨🇭 Robert Halter · roebi · Switzerland
        </div>

      </div>
    </div>
  );
}
