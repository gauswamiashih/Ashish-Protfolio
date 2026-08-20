import { useState, useEffect, useRef } from "react";
import Planto from "./Planto.jsx";

const NAV_LINKS = [
  { id: "hero", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "certs", label: "Certs" },
  { id: "contact", label: "Contact" }
];

const SKILLS = [
  { 
    cat: "AI & LLM APIs", 
    items: ["OpenAI API", "Gemini", "ChatGPT", "Cloud", "Antigravity"], 
    pct: 82, 
    color: "#8b5cf6",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2a5 5 0 0 1 5 5v2a5 5 0 0 1-5 5a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5z"/>
        <path d="M12 14v6"/>
        <path d="M9 17h6"/>
        <path d="M6 8h12"/>
      </svg>
    )
  },
  { 
    cat: "Full Stack Dev", 
    items: ["React", "Next.js", "Node.js", "TypeScript", "Python", "HTML", "CSS", "Basic C"], 
    pct: 88, 
    color: "#3b82f6",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect width="18" height="12" x="3" y="4" rx="2" ry="2"/>
        <line x1="2" x2="22" y1="20" y2="20"/>
        <line x1="12" x2="12" y1="16" y2="20"/>
      </svg>
    )
  },
  { 
    cat: "Backend & DB", 
    items: ["Supabase", "PostgreSQL", "REST APIs"], 
    pct: 80, 
    color: "#0ea5e9",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <ellipse cx="12" cy="5" rx="9" ry="3"/>
        <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/>
        <path d="M3 12c0 1.66 4 3 9 3s9-1.34 9-3"/>
      </svg>
    )
  },
  { 
    cat: "Cybersecurity", 
    items: ["Linux", "Network Security", "OWASP", "CTF Basics"], 
    pct: 70, 
    color: "#ef4444",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
    )
  },
  { 
    cat: "Cloud & DevOps", 
    items: ["Git", "GitHub Actions", "Vercel", "Docker Basics"], 
    pct: 75, 
    color: "#10b981",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17.5 19A3.5 3.5 0 0 0 21 15.5c0-2.79-2.54-4.5-5-4.5-.42-1.01-1.04-1.88-1.8-2.58A5.99 5.99 0 0 0 6 12c0 .34.03.67.09 1-.9.64-1.59 1.58-1.93 2.66A3.5 3.5 0 0 0 7.5 19h10z"/>
      </svg>
    )
  },
  { 
    cat: "UI/UX Systems", 
    items: ["Tailwind CSS", "Framer Motion", "Figma", "GSAP"], 
    pct: 85, 
    color: "#ec4899",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"/>
        <path d="M12 8A4 4 0 1 0 12 16A4 4 0 1 0 12 8Z"/>
      </svg>
    )
  },
];

const PROJECTS = [
  {
    title: "NagrikSetu",
    subtitle: "Smart Civic Management Platform",
    desc: "A futuristic civic SaaS platform with complaint tracking, geolocation, real-time analytics, dashboards and authentication — bridging citizens and governance.",
    tech: ["React", "TypeScript", "Supabase", "OpenStreetMap", "Tailwind"],
    color: "#3b82f6",
    glow: "#1d4ed8",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
        <polyline points="3.29 7 12 12 20.71 7"/>
        <line x1="12" x2="12" y1="22" y2="12"/>
      </svg>
    ),
    demoLink: "https://nagriksetu-main.vercel.app/",
  },
  {
    title: "Brotherhood Clothing",
    subtitle: "Palanpur's Fashion Market Storefront",
    desc: "A premium luxury e-commerce storefront and product catalog web application designed for Palanpur's fashion market. Features a sleek black-and-gold aesthetic, glassmorphism UI, and interactive collection galleries.",
    tech: ["React", "Vite", "Tailwind CSS", "Glassmorphism UI"],
    color: "#D4AF37",
    glow: "#8B5CF6",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.38 3.46L16 2.18M18.15 6.07l-2.43-.88M3.62 20.54l4.38-1.28M5.85 17.93l2.43-.88M12 2v20M2 12h20"/>
      </svg>
    ),
    demoLink: "https://brotherhood-ebon-omega.vercel.app/",
  },
  {
    title: "Planto.",
    subtitle: "Premium Plant E-Commerce Storefront",
    desc: "A stunning e-commerce landing page featuring forest-green aesthetics, glassmorphic cards, active review overlays, and an interactive plant carousel widget.",
    tech: ["React", "CSS Glassmorphism", "Micro-Interactions"],
    color: "#abd667",
    glow: "#0e3c23",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm0 18c-4.4 0-8-3.6-8-8s3.6-8 8-8 8 3.6 8 8-3.6 8-8 8z"/>
        <path d="M12 6c-3.3 0-6 2.7-6 6s2.7 6 6 6 6-2.7 6-6-2.7-6-6-6zm0 10c-2.2 0-4-1.8-4-4s1.8-4 4-4 4 1.8 4 4-1.8 4-4 4z"/>
      </svg>
    ),
    demoLink: "planto-trigger",
  },
];

const CERTS = [
  { title: "Certified LLM Security Professional (CLLMSP)", org: "Red Team Leaders", icon: "🛡️", color: "#ef4444", link: "https://drive.google.com/file/d/1xlaFwDrUHWNfEhDnaNQ2lMFtffuzlwqN/view?usp=drive_link" },
  { title: "Gen AI on AWS", org: "AWS Student Builder Groups", icon: "✦", color: "#f97316", link: "https://drive.google.com/file/d/13Lih68iN1IrwwpOMOXkhl_mOPLQIyujH/view?usp=drivesdk" },
  { title: "Cyber Threat Management", org: "Cisco Networking Academy", icon: "⬢", color: "#0ea5e9", link: "https://drive.google.com/file/d/1O-2j8gC0VxrDH4RWeaiMSkJGxEdLLd0w/view?usp=drivesdk" },
  { title: "Cybersecurity Analyst", org: "Tata | Forage", icon: "⬩", color: "#14b8a6", link: "https://drive.google.com/file/d/1RxOTXxuEVH7KHcdotaxzZgpCqdm9iq8l/view?usp=drivesdk" },
  { title: "Cyber Hackathon", org: "Ganpat University", icon: "⬡", color: "#3b82f6", link: "https://drive.google.com/file/d/1sTe9kr1RO046HAJnqFF-FnhG_K97x19-/view?usp=drivesdk" },
  { title: "IEEE Event Participation", org: "IEEE Student Chapter", icon: "◈", color: "#8b5cf6", link: "https://drive.google.com/file/d/1YRJUp4aPU83S1cAIQX-DM_12HrXDndGe/view?usp=drivesdk" },
  { title: "AI Impact Summit", org: "Innovation Cell", icon: "◉", color: "#10b981", link: "https://drive.google.com/file/d/14gIowMQdKeXcMKMljfoe9sNn6f1qBaxv/view?usp=drivesdk" },
];

const playSound = (type) => {
  if (!window.soundEnabled) return;
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    if (type === "click") {
      osc.type = "sine";
      osc.frequency.setValueAtTime(800, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(300, ctx.currentTime + 0.1);
      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1);
      osc.start(); osc.stop(ctx.currentTime + 0.1);
    } else if (type === "type") {
      osc.type = "square";
      osc.frequency.setValueAtTime(350 + Math.random() * 150, ctx.currentTime);
      gain.gain.setValueAtTime(0.015, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);
      osc.start(); osc.stop(ctx.currentTime + 0.05);
    }
  } catch {
    // Audio Context is not supported or not allowed to start
  }
};

function Particles({ theme = "blue" }) {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: null, y: null });
  const themeRef = useRef(theme);

  useEffect(() => {
    themeRef.current = theme;
  }, [theme]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let w = (canvas.width = canvas.offsetWidth);
    let h = (canvas.height = canvas.offsetHeight);

    const themeColors = {
      blue: "59, 130, 246",
      purple: "139, 92, 246",
      emerald: "16, 185, 129",
      pink: "236, 72, 153"
    };

    const particles = Array.from({ length: 70 }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      r: Math.random() * 1.5 + 0.6,
      alpha: Math.random() * 0.4 + 0.15,
    }));

    let raf;
    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;
      const colorRGB = themeColors[themeRef.current] || "59, 130, 246";

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = w;
        if (p.x > w) p.x = 0;
        if (p.y < 0) p.y = h;
        if (p.y > h) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${colorRGB}, ${p.alpha})`;
        ctx.fill();

        if (mx !== null && my !== null) {
          const dMouse = Math.hypot(p.x - mx, p.y - my);
          if (dMouse < 160) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(mx, my);
            ctx.strokeStyle = `rgba(${colorRGB}, ${0.15 * (1 - dMouse / 160)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      });

      particles.forEach((a, i) => {
        particles.slice(i + 1).forEach((b) => {
          const d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d < 110) {
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(${colorRGB}, ${0.06 * (1 - d / 110)})`;
            ctx.lineWidth = 0.4;
            ctx.stroke();
          }
        });
      });
      raf = requestAnimationFrame(draw);
    };

    draw();

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    };

    const handleMouseLeave = () => {
      mouseRef.current = { x: null, y: null };
    };

    window.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", handleMouseLeave);

    const resize = () => {
      w = canvas.width = canvas.offsetWidth;
      h = canvas.height = canvas.offsetHeight;
    };
    window.addEventListener("resize", resize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={canvasRef} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }} />;
}

function Reveal({ children, delay = 0 }) {
  const [visible, setVisible] = useState(false);
  const ref = useRef();
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) setVisible(true);
    }, { threshold: 0.15 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(30px)", transition: `all 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms` }}>
      {children}
    </div>
  );
}

function GlowBtn({ children, primary, onClick, type = "button" }) {
  return (
    <button 
      type={type} 
      onClick={(e) => { playSound("click"); if (onClick) onClick(e); }} 
      className="hologram-btn"
      style={{
        padding: "12px 28px", 
        borderRadius: "50px", 
        fontFamily: "'Space Grotesk', sans-serif",
        fontWeight: 600, 
        fontSize: "14px", 
        letterSpacing: "0.05em", 
        cursor: "pointer",
        transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)", 
        border: primary ? "none" : "1px solid rgba(var(--accent-glow-rgb), 0.35)",
        background: primary ? "var(--theme-gradient)" : "rgba(var(--accent-glow-rgb), 0.05)",
        color: "#fff", 
        boxShadow: primary ? "0 0 20px var(--accent-glow)" : "none",
        outline: "none"
      }}
      onMouseEnter={e => { 
        playSound("click"); 
        e.target.style.transform = "translateY(-2px)"; 
        e.target.style.boxShadow = primary ? "0 0 35px var(--accent-glow)" : "0 0 20px rgba(var(--accent-glow-rgb), 0.25)"; 
      }}
      onMouseLeave={e => { 
        e.target.style.transform = "none"; 
        e.target.style.boxShadow = primary ? "0 0 20px var(--accent-glow)" : "none"; 
      }}
    >
      {children}
    </button>
  );
}

function CountUpElement({ target, duration = 1500 }) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started) {
        setStarted(true);
      }
    }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;
    let startTime = null;
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [started, target, duration]);

  return <span ref={ref}>{count}</span>;
}

function SkillBar({ skill, delay }) {
  const [visible, setVisible] = useState(false);
  const ref = useRef();
  
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { 
      if (e.isIntersecting) setVisible(true); 
    }, { threshold: 0.25 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div 
      ref={ref} 
      className="glass-panel"
      style={{ 
        borderRadius: "20px", 
        padding: "28px", 
        position: "relative",
        overflow: "hidden"
      }}
      onMouseEnter={e => e.currentTarget.style.borderColor = skill.color + "60"}
      onMouseLeave={e => e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)"}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "16px" }}>
        <div style={{ color: skill.color }}>{skill.icon}</div>
        <div style={{ flex: 1 }}>
          <h4 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, color: "#e2e8f0", fontSize: "16px" }}>{skill.cat}</h4>
        </div>
        <span style={{ color: skill.color, fontWeight: 700, fontSize: "15px" }}>{skill.pct}%</span>
      </div>
      <div style={{ background: "rgba(255,255,255,0.05)", borderRadius: "100px", height: "6px", overflow: "hidden", marginBottom: "16px" }}>
        <div style={{ height: "100%", borderRadius: "100px", width: visible ? `${skill.pct}%` : "0%", background: `linear-gradient(90deg, ${skill.color}, #a78bfa)`, transition: `width 1.2s cubic-bezier(0.4, 0, 0.2, 1) ${delay}ms`, boxShadow: `0 0 12px ${skill.color}80` }} />
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
        {skill.items.map(it => (
          <span key={it} style={{ fontSize: "11px", padding: "4px 10px", borderRadius: "100px", background: "rgba(255,255,255,0.03)", color: "#93c5fd", border: "1px solid rgba(255,255,255,0.06)", fontFamily: "'Space Grotesk', sans-serif", transition: "all 0.3s" }}
            onMouseEnter={e => { e.target.style.borderColor = skill.color; e.target.style.background = skill.color + "15"; }}
            onMouseLeave={e => { e.target.style.borderColor = "rgba(255,255,255,0.06)"; e.target.style.background = "rgba(255,255,255,0.03)"; }}>
            {it}
          </span>
        ))}
      </div>
    </div>
  );
}

function ProjectPreview({ project }) {
  if (project.title === "NagrikSetu") {
    return (
      <div className="browser-mockup" style={{ borderColor: project.color + "25" }}>
        <div className="browser-header">
          <div className="browser-dots">
            <span className="dot red"></span>
            <span className="dot yellow"></span>
            <span className="dot green"></span>
          </div>
          <div className="browser-bar">nagriksetu.gov.in</div>
        </div>
        <div className="browser-content nagriksetu-mock">
          <div className="mock-sidebar">
            <div className="mock-logo"></div>
            <div className="mock-item active"></div>
            <div className="mock-item"></div>
            <div className="mock-item"></div>
          </div>
          <div className="mock-main">
            <div className="mock-stats-row">
              <div className="mock-stat-card"><div className="glow-bar"></div></div>
              <div className="mock-stat-card"></div>
              <div className="mock-stat-card"></div>
            </div>
            <div className="mock-map-container">
              <svg width="100%" height="100%" viewBox="0 0 200 100" style={{ opacity: 0.25 }}>
                <path d="M20,50 L50,20 L100,80 L140,30 L180,70" fill="none" stroke="var(--preview-accent)" strokeWidth="1.5" strokeDasharray="3" />
                <circle cx="20" cy="50" r="3" fill="#ef4444" className="pulse-dot" />
                <circle cx="100" cy="80" r="3" fill="var(--preview-accent)" className="pulse-dot" />
                <circle cx="140" cy="30" r="3" fill="#10b981" className="pulse-dot" />
              </svg>
              <div className="mock-floating-panel">
                <span className="label">Civic Alert</span>
                <span className="val">Active Node 04</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } else if (project.title === "Brotherhood Clothing") {
    return (
      <div className="browser-mockup" style={{ borderColor: project.color + "25" }}>
        <div className="browser-header">
          <div className="browser-dots">
            <span className="dot red"></span>
            <span className="dot yellow"></span>
            <span className="dot green"></span>
          </div>
          <div className="browser-bar">brotherhoodclothing.co</div>
        </div>
        <div className="browser-content brotherhood-mock">
          <div className="mock-shop-hero">
            <div className="gold-monogram">B</div>
            <span className="gold-text">BROTHERHOOD</span>
            <span className="gold-sub">Luxury Apparel Storefront</span>
          </div>
          <div className="mock-shop-grid">
            <div className="mock-shop-card">
              <div className="mock-item-outline"></div>
              <span className="item-price">Gold Coat</span>
            </div>
            <div className="mock-shop-card">
              <div className="mock-item-outline"></div>
              <span className="item-price">Silky Tee</span>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="browser-mockup" style={{ borderColor: project.color + "25" }}>
        <div className="browser-header">
          <div className="browser-dots">
            <span className="dot red"></span>
            <span className="dot yellow"></span>
            <span className="dot green"></span>
          </div>
          <div className="browser-bar">planto.store</div>
        </div>
        <div className="browser-content planto-mock">
          <div style={{ display: "flex", gap: "16px", height: "100%", alignItems: "center", padding: "12px 20px" }}>
            <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "6px" }}>
              <span style={{ fontSize: "14px", fontWeight: 800, fontFamily: "Playfair Display, serif", color: "#fff", lineHeight: 1.1 }}>Breath Natural</span>
              <span style={{ fontSize: "7px", color: "var(--planto-text-dim)" }}>Premium houseplants generated to filter clean air.</span>
              <div style={{ background: "var(--planto-accent)", color: "#070e0a", padding: "3px 8px", borderRadius: "100px", fontSize: "7px", fontWeight: 700, width: "fit-content", marginTop: "4px" }}>Rs. 599/-</div>
            </div>
            <div style={{ position: "relative", width: "70px", height: "70px" }}>
              <div style={{ position: "absolute", inset: 0, background: "radial-gradient(circle, rgba(171,214,103,0.15) 0%, transparent 60%)" }} />
              <img 
                src="https://images.unsplash.com/photo-1545241047-6083a3684587?w=300&auto=format&fit=crop&q=80" 
                alt="Planto Preview" 
                style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "50%", border: "1px solid rgba(255,255,255,0.06)" }}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function ProjectCard({ project, onDemoClick }) {
  const [hovered, setHovered] = useState(false);
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    cardRef.current.style.setProperty("--mx", `${x}px`);
    cardRef.current.style.setProperty("--my", `${y}px`);
  };

  return (
    <div 
      ref={cardRef}
      onMouseEnter={() => setHovered(true)} 
      onMouseLeave={() => setHovered(false)}
      onMouseMove={handleMouseMove}
      className="project-card-container"
      style={{ 
        background: "radial-gradient(400px circle at var(--mx, 0px) var(--my, 0px), rgba(255,255,255,0.02), transparent 70%), rgba(255,255,255,0.01)", 
        borderRadius: "24px", 
        padding: "28px", 
        border: `1px solid ${hovered ? project.color + "50" : "rgba(255,255,255,0.06)"}`, 
        transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)", 
        transform: hovered ? "translateY(-6px)" : "none", 
        boxShadow: hovered ? `0 20px 60px ${project.glow}20` : "none", 
        cursor: "default", 
        position: "relative", 
        overflow: "hidden" 
      }}
    >
      <div style={{ position: "absolute", inset: 0, background: `radial-gradient(250px circle at var(--mx, 0px) var(--my, 0px), ${project.color}12, transparent 70%)`, pointerEvents: "none" }} />
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "2px", background: `linear-gradient(90deg, transparent, ${project.color}, transparent)`, opacity: hovered ? 1 : 0, transition: "opacity 0.4s" }} />
      
      <ProjectPreview project={project} />

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
        <div style={{ fontSize: "28px", color: project.color, filter: `drop-shadow(0 0 10px ${project.color}50)` }}>{project.icon}</div>
        <span style={{ fontSize: "9px", color: project.color, border: `1px solid ${project.color}25`, background: `${project.color}08`, padding: "4px 10px", borderRadius: "100px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em" }}>
          {project.demoLink === "planto-trigger" ? "UI DESIGN MOCKUP" : "WEB APPLICATION"}
        </span>
      </div>

      <h3 className="project-card-title" style={{ fontFamily: "'Syne', sans-serif", fontSize: "22px", fontWeight: 800, color: "#f1f5f9", margin: "0 0 8px", transition: "color 0.3s" }}>{project.title}</h3>
      <p style={{ color: "#94a3b8", fontSize: "13px", lineHeight: "1.6", margin: "0 0 24px", fontFamily: "'Space Grotesk', sans-serif", minHeight: "48px" }}>{project.desc}</p>
      
      <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginBottom: "28px" }}>
        {project.tech.map(t => (
          <span key={t} style={{ fontSize: "11px", padding: "4px 12px", borderRadius: "100px", background: "rgba(255,255,255,0.03)", color: "#94a3b8", border: "1px solid rgba(255,255,255,0.05)", fontFamily: "'Space Grotesk', sans-serif", fontWeight: 500 }}>{t}</span>
        ))}
      </div>
      
      <div style={{ display: "flex", gap: "12px" }}>
        {project.demoLink && (
          project.demoLink === "planto-trigger" ? (
            <button 
              onClick={(e) => { e.preventDefault(); onDemoClick?.(); }}
              style={{ display: "block", textAlign: "center", textDecoration: "none", flex: 1, padding: "12px", borderRadius: "12px", background: `${project.color}20`, color: project.color, border: `1px solid ${project.color}35`, fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: "13px", cursor: "pointer", transition: "all 0.3s", outline: "none" }}
              onMouseEnter={e => { e.target.style.background = project.color + "30"; }}
              onMouseLeave={e => { e.target.style.background = project.color + "20"; }}>
              Interactive UI ↗
            </button>
          ) : (
            <a href={project.demoLink} target="_blank" rel="noopener noreferrer" style={{ display: "block", textAlign: "center", textDecoration: "none", flex: 1, padding: "12px", borderRadius: "12px", background: `${project.color}20`, color: project.color, border: `1px solid ${project.color}35`, fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: "13px", cursor: "pointer", transition: "all 0.3s" }}
              onMouseEnter={e => { e.target.style.background = project.color + "30"; }}
              onMouseLeave={e => { e.target.style.background = project.color + "20"; }}>
              Live Demo ↗
            </a>
          )
        )}
        <a href="https://github.com/gauswamiashih" target="_blank" rel="noopener noreferrer" style={{ display: "block", textAlign: "center", textDecoration: "none", flex: 1, padding: "12px", borderRadius: "12px", background: "rgba(255,255,255,0.03)", color: "#94a3b8", border: "1px solid rgba(255,255,255,0.08)", fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: "13px", cursor: "pointer", transition: "all 0.3s" }}
          onMouseEnter={e => { e.target.style.background = "rgba(255,255,255,0.08)"; e.target.style.color = "#fff"; }}
          onMouseLeave={e => { e.target.style.background = "rgba(255,255,255,0.03)"; e.target.style.color = "#94a3b8"; }}>
          GitHub ⌥
        </a>
      </div>
    </div>
  );
}

function CertCard({ cert }) {
  const [hov, setHov] = useState(false);
  const isClickable = !!cert.link;
  
  const handleClick = () => {
    if (isClickable) {
      playSound("click");
      window.open(cert.link, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <div 
      onMouseEnter={() => setHov(true)} 
      onMouseLeave={() => setHov(false)} 
      onClick={handleClick}
      className="glass-panel"
      style={{
        borderRadius: "16px",
        padding: "24px",
        transform: hov ? "translateY(-4px)" : "none",
        boxShadow: hov && isClickable ? `0 12px 40px ${cert.color}25` : "none",
        cursor: isClickable ? "pointer" : "default"
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
        <div style={{ fontSize: "28px", color: cert.color, filter: `drop-shadow(0 0 8px ${cert.color})` }}>{cert.icon}</div>
        <div style={{ flex: 1 }}>
          <h4 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, color: "#f1f5f9", fontSize: "15px", margin: "0 0 4px" }}>
            {cert.title} {isClickable && <span style={{ fontSize: "11px", color: "#64748b", fontWeight: 400, marginLeft: "4px" }}>↗</span>}
          </h4>
          <p style={{ color: "#64748b", fontSize: "12px", fontFamily: "'Space Grotesk', sans-serif" }}>{cert.org}</p>
        </div>
      </div>
    </div>
  );
}

function Typewriter({ text, speed = 40 }) {
  const [disp, setDisp] = useState("");
  useEffect(() => {
    let i = 0;
    const t = setInterval(() => {
      setDisp(text.slice(0, i + 1));
      i++;
      if (i >= text.length) clearInterval(t);
    }, speed);
    return () => clearInterval(t);
  }, [text, speed]);
  return <span>{disp}<span style={{ animation: "cursorBlink 1s step-end infinite", color: "#3b82f6" }}>█</span></span>;
}

function Terminal() {
  const [hist, setHist] = useState([{ cmd: "", out: "GAUSWAMI-OS v2.0.4. Type 'help' to initialize." }]);
  const [inp, setInp] = useState("");
  const [accent, setAccent] = useState("#63b3ed");
  const endRef = useRef(null);
  const isFirstRender = useRef(true);
  
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [hist]);
  
  const handle = (e) => {
    playSound("type");
    if (e.key === "Enter") {
      const c = inp.trim().toLowerCase();
      setInp("");
      let out = "";
      
      if (c === "help") {
        out = "Commands available: help, whoami, skills, hack, neofetch, clear, theme [blue|emerald|pink]";
      } else if (c === "whoami") {
        out = "Name: Gauswami Ashish Devpuri | Rank: Student CE Engineer | Focus: Intelligent SaaS Systems, Cloud APIs & Cyber Defense.";
      } else if (c === "skills") {
        out = "AI Modules (82%) | Full Stack Modules (88%) | Cloud Pipelines (75%) | Security Operations (70%)";
      } else if (c === "hack") {
        out = "INITIALIZING DECRYPT PROTOCOL...\n[SYSTEM PORT 443 OPEN]\nBYPASSING FIREWALL DEFENSES...\nACCESS GRANTED. Ashish Devpuri core database terminal online.";
      } else if (c === "neofetch") {
        out = `    /\\_/\\       ashish@gauswami-os
   ( o.o )      ------------------
    > ^ <       OS: GauswamiOS v2.0.4
   /     \\      Kernel: React 19.2.6 & Vite 8.0.12
  /   |   \\     Uptime: 20 Hackathons Completed
 (___|___)    Shell: SpaceGrotesk-Shell
                CPU: Ganpat University B.Tech
                RAM: Supabase / PostgreSQL / REST APIs
                GPU: Gemini API / OpenAI API / Antigravity SDK`;
      } else if (c.startsWith("theme ")) {
        const t = c.split(" ")[1];
        if (t === "blue") { setAccent("#63b3ed"); out = "Theme set to Cyber Blue."; }
        else if (t === "emerald") { setAccent("#10b981"); out = "Theme set to Emerald."; }
        else if (t === "pink") { setAccent("#ec4899"); out = "Theme set to Pink."; }
        else out = `Unknown theme option: ${t}`;
      } else if (c === "clear") { 
        setHist([]); 
        return; 
      } else if (c) {
        out = `Command parsing failure: '${c}'. Type 'help' for options.`;
      }
      
      setHist(p => [...p, { cmd: `root@ashish:~$ ${c}`, out }]);
    }
  };

  return (
    <div style={{ background: "#050a14", border: `1px solid ${accent}45`, borderRadius: "16px", padding: "20px", fontFamily: "monospace", color: accent, fontSize: "14px", height: "320px", overflowY: "auto", boxShadow: "0 10px 40px rgba(0,0,0,0.5) inset" }}>
      <div style={{ display: "flex", gap: "8px", marginBottom: "20px" }}>
        <div style={{ width: "12px", height: "12px", borderRadius: "50%", background: "#ef4444" }} />
        <div style={{ width: "12px", height: "12px", borderRadius: "50%", background: "#eab308" }} />
        <div style={{ width: "12px", height: "12px", borderRadius: "50%", background: "#22c55e" }} />
      </div>
      {hist.map((h, i) => (
        <div key={i} style={{ marginBottom: "10px" }}>
          {h.cmd && <div style={{ color: "#f8fafc", fontWeight: "bold" }}>{h.cmd}</div>}
          {h.out && <div style={{ color: "#93c5fd", marginTop: "4px", whiteSpace: "pre-wrap", lineHeight: 1.5 }}>{h.out}</div>}
        </div>
      ))}
      <div style={{ display: "flex", alignItems: "center", marginTop: "10px" }}>
        <span style={{ color: "#f8fafc", marginRight: "8px" }}>root@ashish:~$</span>
        <input value={inp} onChange={e => setInp(e.target.value)} onKeyDown={handle} style={{ background: "transparent", border: "none", color: accent, fontFamily: "monospace", fontSize: "14px", outline: "none", flex: 1 }} placeholder="type a command..." />
      </div>
      <div ref={endRef} />
    </div>
  );
}

export default function Portfolio() {
  const [theme, setTheme] = useState(() => localStorage.getItem("portfolio-theme") || "blue");
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [cursor, setCursor] = useState({ x: 0, y: 0 });
  const [heroVisible, setHeroVisible] = useState(false);
  const [sent, setSent] = useState(false);
  const [currentView, setCurrentView] = useState("portfolio");
  const [activeSection, setActiveSection] = useState("hero");

  const handleViewChange = (view) => {
    window.scrollTo(0, 0);
    setCurrentView(view);
  };

  useEffect(() => {
    localStorage.setItem("portfolio-theme", theme);
  }, [theme]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setHeroVisible(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    window.soundEnabled = soundEnabled;
  }, [soundEnabled]);

  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);

    const onScroll = () => setScrollY(window.scrollY);
    const onMove = (e) => setCursor({ x: e.clientX, y: e.clientY });
    window.addEventListener("scroll", onScroll);
    window.addEventListener("mousemove", onMove);
    return () => { 
      window.removeEventListener("scroll", onScroll); 
      window.removeEventListener("mousemove", onMove); 
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["hero", "about", "skills", "projects", "certs", "contact"];
      const scrollPos = window.scrollY + 250; // offset for scroll spy
      
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  const bentoRef1 = useRef(null);
  const bentoRef2 = useRef(null);
  const bentoRef3 = useRef(null);
  const bentoRef4 = useRef(null);
  const bentoRef5 = useRef(null);
  const bentoRef6 = useRef(null);

  const handleBentoMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    e.currentTarget.style.setProperty("--mx", `${x}px`);
    e.currentTarget.style.setProperty("--my", `${y}px`);
  };

  return currentView === "planto" ? (
    <Planto onViewChange={handleViewChange} />
  ) : (
    <div className={`theme-${theme}`} style={{ background: "#020408", minHeight: "100vh", color: "#fff", fontFamily: "'Space Grotesk', sans-serif", overflowX: "hidden", position: "relative" }}>
      
      <style>{`
        * { box-sizing: border-box; margin: 0; }
        html { scroll-behavior: smooth; }
        section { scroll-margin-top: 80px; }
        
        .cursor-glow { 
          pointer-events: none; 
          position: fixed; 
          z-index: 9999; 
          width: 350px; 
          height: 350px; 
          border-radius: 50%; 
          background: radial-gradient(circle, rgba(59,130,246,0.06) 0%, rgba(139,92,246,0.02) 40%, transparent 70%); 
          transform: translate(-50%,-50%); 
          transition: transform 0.08s ease-out; 
        }
        
        .nav-link { 
          color: #94a3b8; 
          text-decoration: none; 
          font-size: 14px; 
          font-weight: 500; 
          letter-spacing: 0.05em; 
          transition: all 0.3s; 
          cursor: pointer; 
        }
        .nav-link:hover { 
          color: #63b3ed; 
          text-shadow: 0 0 10px rgba(99,179,237,0.3);
        }
        
        .section-label { 
          font-size: 12px; 
          font-weight: 700; 
          letter-spacing: 0.25em; 
          text-transform: uppercase; 
          color: #3b82f6; 
          margin-bottom: 16px; 
          text-shadow: 0 0 8px rgba(59,130,246,0.3);
        }
        .section-title { 
          font-family: 'Syne', sans-serif; 
          font-size: clamp(36px, 5vw, 60px); 
          font-weight: 800; 
          line-height: 1.1; 
          color: #f1f5f9; 
        }
        
        .form-input { 
          width: 100%; 
          padding: 16px 20px; 
          background: rgba(255,255,255,0.03); 
          border: 1px solid rgba(255,255,255,0.08); 
          border-radius: 14px; 
          color: #e2e8f0; 
          font-family: 'Space Grotesk', sans-serif; 
          font-size: 14px; 
          outline: none; 
          transition: all 0.3s; 
        }
        .form-input:focus { 
          background: rgba(255,255,255,0.06); 
          border-color: rgba(59,130,246,0.6); 
          box-shadow: 0 0 0 4px rgba(59,130,246,0.15), 0 0 20px rgba(59,130,246,0.2) inset; 
        }
        
        textarea.form-input { resize: vertical; min-height: 130px; }
        
        .status-badge { 
          display: flex; 
          align-items: center; 
          gap: 8px; 
          background: rgba(16,185,129,0.08); 
          border: 1px solid rgba(16,185,129,0.25); 
          padding: 6px 14px; 
          border-radius: 50px; 
        }

        .hologram-wireframe {
          transform-style: preserve-3d;
          animation: holographicRotation 25s linear infinite;
        }

        .bento-glow-card {
          background: radial-gradient(800px circle at var(--mx, 0px) var(--my, 0px), rgba(99,179,237,0.08), transparent 40%), rgba(255,255,255,0.02);
          border: 1px solid rgba(255, 255, 255, 0.06);
          border-radius: 24px;
          padding: 32px;
          position: relative;
          overflow: hidden;
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .bento-glow-card:hover {
          border-color: rgba(99, 179, 237, 0.35);
          transform: translateY(-4px);
        }

        @media (max-width: 992px) {
          .hero-layout {
            grid-template-columns: 1fr !important;
            gap: 48px !important;
            text-align: center;
          }
          .hero-right {
            justify-content: center !important;
          }
          .about-layout {
            grid-template-columns: 1fr !important;
            gap: 60px !important;
          }
        }

        .bento-col-1 { grid-column: span 1; }
        .bento-col-2 { grid-column: span 2; }
        .bento-row-1 { grid-row: span 1; }
        .bento-row-2 { grid-row: span 2; }

        @media (max-width: 768px) {
          .nav-desktop { display: none !important; }
          .menu-toggle { display: flex !important; }
          .bento-grid {
            grid-template-columns: 1fr !important;
            grid-auto-rows: auto !important;
          }
          .bento-col-1, .bento-col-2 {
            grid-column: span 1 !important;
          }
          .bento-row-1, .bento-row-2 {
            grid-row: span 1 !important;
          }
        }

        /* Floating Capsule Header Navbar */
        .capsule-nav-container {
          position: fixed;
          top: 20px;
          left: 50%;
          transform: translateX(-50%);
          z-index: 1000;
          display: flex;
          align-items: center;
          gap: 28px;
          background: rgba(2, 4, 8, 0.45);
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 100px;
          padding: 8px 24px;
          box-shadow: 0 15px 40px rgba(0, 0, 0, 0.45);
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          width: auto;
          max-width: 90%;
        }

        .capsule-nav-logo {
          font-family: 'Syne', sans-serif;
          font-weight: 800;
          font-size: 16px;
          background: var(--theme-gradient);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          cursor: pointer;
          letter-spacing: -0.02em;
          white-space: nowrap;
        }

        .capsule-nav-links {
          display: flex;
          align-items: center;
          gap: 4px;
        }

        .capsule-nav-link {
          color: #94a3b8;
          text-decoration: none;
          font-size: 12.5px;
          font-weight: 600;
          padding: 6px 14px;
          border-radius: 100px;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          position: relative;
          white-space: nowrap;
        }

        .capsule-nav-link:hover {
          color: #fff;
        }

        .capsule-nav-link.active {
          background: rgba(255, 255, 255, 0.06);
          color: #fff;
          border: 1px solid rgba(255, 255, 255, 0.08);
          box-shadow: 0 4px 12px rgba(255, 255, 255, 0.02);
        }

        .capsule-status {
          display: flex;
          align-items: center;
          gap: 8px;
          background: rgba(16, 185, 129, 0.06);
          border: 1px solid rgba(16, 185, 129, 0.2);
          padding: 6px 12px;
          border-radius: 50px;
          white-space: nowrap;
        }

        .capsule-status-dot {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: #10b981;
          animation: pulseGlow 1.5s infinite;
        }

        .capsule-status-text {
          font-size: 8.5px;
          color: #10b981;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }

        .capsule-theme-picker {
          display: flex;
          gap: 6px;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.06);
          padding: 4px 8px;
          border-radius: 100px;
        }

        .capsule-mobile-toggle {
          display: none;
          cursor: pointer;
        }

        @media (max-width: 992px) {
          .capsule-nav-links, .capsule-status, .capsule-theme-picker, .capsule-sound-btn, .capsule-connect-btn {
            display: none !important;
          }
          .capsule-mobile-toggle {
            display: flex !important;
            flex-direction: column;
            gap: 5px;
            width: 20px;
            height: 14px;
            justify-content: center;
          }
          .capsule-nav-container {
            justify-content: space-between;
            width: 90%;
            padding: 12px 24px;
          }
        }

        /* Premium Browser Mockup Previews */
        .browser-mockup {
          background: rgba(2, 4, 8, 0.4);
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: 16px;
          overflow: hidden;
          margin-bottom: 24px;
          box-shadow: 0 15px 40px rgba(0, 0, 0, 0.4);
          transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.6s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.6s cubic-bezier(0.16, 1, 0.3, 1);
          transform-style: preserve-3d;
          perspective: 1000px;
        }

        .browser-header {
          background: rgba(14, 20, 30, 0.6);
          border-bottom: 1px solid rgba(255, 255, 255, 0.04);
          height: 32px;
          display: flex;
          align-items: center;
          padding: 0 16px;
          gap: 12px;
          position: relative;
        }

        .browser-dots {
          display: flex;
          gap: 6px;
          align-items: center;
        }

        .browser-dots .dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          display: inline-block;
        }

        .browser-dots .dot.red { background: #ff5f56; }
        .browser-dots .dot.yellow { background: #ffbd2e; }
        .browser-dots .dot.green { background: #27c93f; }

        .browser-bar {
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: 4px;
          font-size: 10px;
          font-family: monospace;
          color: #64748b;
          padding: 2px 16px;
          margin-left: 24px;
          flex: 0.6;
          text-align: center;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .browser-content {
          height: 160px;
          position: relative;
          overflow: hidden;
          background: radial-gradient(150px circle at 50% 50%, rgba(255, 255, 255, 0.015), transparent 70%);
        }

        /* NagrikSetu Mock */
        .nagriksetu-mock {
          --preview-accent: #3b82f6;
          display: flex;
        }
        .nagriksetu-mock .mock-sidebar {
          width: 32px;
          background: rgba(14, 20, 30, 0.4);
          border-right: 1px solid rgba(255,255,255,0.03);
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 10px 0;
          gap: 12px;
        }
        .nagriksetu-mock .mock-sidebar .mock-logo {
          width: 14px;
          height: 14px;
          border-radius: 3px;
          background: var(--preview-accent);
          opacity: 0.8;
        }
        .nagriksetu-mock .mock-sidebar .mock-item {
          width: 12px;
          height: 4px;
          background: rgba(255,255,255,0.1);
          border-radius: 1px;
        }
        .nagriksetu-mock .mock-sidebar .mock-item.active {
          background: var(--preview-accent);
        }
        .nagriksetu-mock .mock-main {
          flex: 1;
          padding: 12px;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .nagriksetu-mock .mock-stats-row {
          display: flex;
          gap: 8px;
        }
        .nagriksetu-mock .mock-stat-card {
          flex: 1;
          height: 24px;
          background: rgba(255,255,255,0.02);
          border: 1px solid rgba(255,255,255,0.04);
          border-radius: 6px;
          position: relative;
          overflow: hidden;
        }
        .nagriksetu-mock .mock-stat-card .glow-bar {
          position: absolute;
          left: 0;
          top: 0;
          height: 100%;
          width: 40%;
          background: linear-gradient(90deg, var(--preview-accent), transparent);
          opacity: 0.15;
        }
        .nagriksetu-mock .mock-map-container {
          flex: 1;
          background: rgba(255,255,255,0.01);
          border: 1px solid rgba(255,255,255,0.03);
          border-radius: 8px;
          position: relative;
          overflow: hidden;
        }
        .nagriksetu-mock .mock-floating-panel {
          position: absolute;
          bottom: 8px;
          right: 8px;
          background: rgba(4,9,15,0.85);
          backdrop-filter: blur(8px);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 4px;
          padding: 4px 8px;
          display: flex;
          flex-direction: column;
          font-family: monospace;
        }
        .nagriksetu-mock .mock-floating-panel .label { font-size: 6px; color: #64748b; }
        .nagriksetu-mock .mock-floating-panel .val { font-size: 7px; color: var(--preview-accent); font-weight: 700; }

        @keyframes pulseDot {
          0%, 100% { opacity: 0.5; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.3); }
        }
        .pulse-dot {
          animation: pulseDot 2s infinite ease-in-out;
          transform-origin: center;
        }

        /* Brotherhood Clothing Mock */
        .brotherhood-mock {
          --preview-accent: #D4AF37;
          background: linear-gradient(180deg, rgba(0, 0, 0, 0.4) 0%, rgba(20, 15, 10, 0.4) 100%);
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          padding: 12px;
        }
        .brotherhood-mock .mock-shop-hero {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 2px;
          margin-bottom: 12px;
        }
        .brotherhood-mock .gold-monogram {
          font-family: 'Playfair Display', serif;
          font-size: 24px;
          font-weight: 700;
          color: var(--preview-accent);
          text-shadow: 0 0 10px rgba(212, 175, 55, 0.35);
          border: 1px solid var(--preview-accent);
          width: 32px;
          height: 32px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .brotherhood-mock .gold-text {
          font-size: 10px;
          font-weight: 800;
          letter-spacing: 0.15em;
          color: #fff;
        }
        .brotherhood-mock .gold-sub {
          font-size: 6px;
          color: #64748b;
          text-transform: uppercase;
        }
        .brotherhood-mock .mock-shop-grid {
          display: flex;
          gap: 12px;
          width: 100%;
          justify-content: center;
        }
        .brotherhood-mock .mock-shop-card {
          width: 60px;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .brotherhood-mock .mock-item-outline {
          height: 36px;
          background: rgba(255,255,255,0.01);
          border: 1px solid rgba(212, 175, 55, 0.1);
          border-radius: 4px;
          position: relative;
        }
        .brotherhood-mock .mock-item-outline::after {
          content: '';
          position: absolute;
          inset: 8px;
          border: 1.5px solid rgba(212, 175, 55, 0.25);
          border-radius: 2px;
        }
        .brotherhood-mock .item-price {
          font-size: 6px;
          color: #64748b;
          text-align: center;
        }

        /* Planto Mock */
        .planto-mock {
          --preview-accent: #abd667;
          background: linear-gradient(180deg, rgba(0, 0, 0, 0.4) 0%, rgba(7, 14, 10, 0.4) 100%);
        }

        /* Project Card 3D tilt effects */
        .project-card-container:hover .browser-mockup {
          transform: perspective(1000px) rotateX(10deg) rotateY(-8deg) translateY(-6px);
          border-color: rgba(var(--project-glow-rgb, 255,255,255), 0.25);
          box-shadow: 0 25px 50px rgba(0, 0, 0, 0.6), 0 0 30px rgba(var(--project-glow-rgb, 255,255,255), 0.08);
        }
        .project-card-container:hover .project-card-title {
          background: var(--theme-gradient);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
      `}</style>

      {/* Global Cursor Glow */}
      <div className="cursor-glow" style={{ left: cursor.x, top: cursor.y }} />

      {/* NAV */}
      <div className="capsule-nav-container" style={{
        background: scrollY > 50 ? "rgba(4, 9, 15, 0.75)" : "rgba(4, 9, 15, 0.45)",
        borderColor: scrollY > 50 ? "rgba(255, 255, 255, 0.12)" : "rgba(255, 255, 255, 0.08)",
        padding: scrollY > 50 ? "6px 24px" : "8px 32px"
      }}>
        <div className="capsule-nav-logo" onClick={() => scrollTo("hero")}>
          Ashish
        </div>

        {/* Desktop Navigation */}
        <div className="capsule-nav-links">
          {NAV_LINKS.map(l => (
            <span 
              key={l.id} 
              className={`capsule-nav-link ${activeSection === l.id ? "active" : ""}`}
              onClick={() => scrollTo(l.id)}
            >
              {l.label}
            </span>
          ))}
        </div>

        {/* System Online badge */}
        <div className="capsule-status">
          <div className="capsule-status-dot" />
          <span className="capsule-status-text">SYSTEM ONLINE</span>
        </div>

        {/* Theme Picker */}
        <div className="capsule-theme-picker">
          <div className={`theme-dot ${theme === "blue" ? "active" : ""}`} style={{ background: "#3b82f6", width: "12px", height: "12px" }} onClick={() => setTheme("blue")} title="Cyber Blue" />
          <div className={`theme-dot ${theme === "purple" ? "active" : ""}`} style={{ background: "#8b5cf6", width: "12px", height: "12px" }} onClick={() => setTheme("purple")} title="Midnight Purple" />
          <div className={`theme-dot ${theme === "emerald" ? "active" : ""}`} style={{ background: "#10b981", width: "12px", height: "12px" }} onClick={() => setTheme("emerald")} title="Emerald Green" />
          <div className={`theme-dot ${theme === "pink" ? "active" : ""}`} style={{ background: "#ec4899", width: "12px", height: "12px" }} onClick={() => setTheme("pink")} title="Neon Pink" />
        </div>

        {/* Sound toggle button */}
        <button 
          className="capsule-sound-btn"
          onClick={() => setSoundEnabled(!soundEnabled)} 
          style={{ background: "transparent", border: "none", color: soundEnabled ? "var(--accent-secondary)" : "#475569", cursor: "pointer", fontSize: "16px", display: "flex", alignItems: "center", transition: "color 0.3s", outline: "none" }}
          title={soundEnabled ? "Mute Sounds" : "Enable Sound FX"}
        >
          {soundEnabled ? "🔊" : "🔇"}
        </button>

        <div className="capsule-connect-btn">
          <GlowBtn primary onClick={() => scrollTo("contact")} style={{ padding: "8px 20px", fontSize: "12px" }}>Connect ↗</GlowBtn>
        </div>

        {/* Mobile menu hamburger toggle */}
        <div 
          className="capsule-mobile-toggle"
          onClick={() => { playSound("click"); setMenuOpen(!menuOpen); }} 
        >
          <div style={{ width: "100%", height: "2px", background: "#fff", transition: "0.3s", transform: menuOpen ? "rotate(45deg) translate(5px, 5px)" : "none" }} />
          <div style={{ width: "100%", height: "2px", background: "#fff", transition: "0.3s", opacity: menuOpen ? 0 : 1 }} />
          <div style={{ width: "100%", height: "2px", background: "#fff", transition: "0.3s", transform: menuOpen ? "rotate(-45deg) translate(4px, -4px)" : "none" }} />
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      <div style={{
        position: "fixed",
        top: 0,
        right: 0,
        width: "100%",
        height: "100vh",
        background: "rgba(2,4,8,0.98)",
        backdropFilter: "blur(20px)",
        zIndex: 95,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: "36px",
        transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
        transform: menuOpen ? "translateX(0)" : "translateX(100%)",
        opacity: menuOpen ? 1 : 0,
        pointerEvents: menuOpen ? "auto" : "none"
      }}>
        {NAV_LINKS.map(l => (
          <span key={l.id} style={{ fontSize: "26px", fontWeight: 800, fontFamily: "'Syne', sans-serif", color: "#f1f5f9", cursor: "pointer" }} onClick={() => scrollTo(l.id)}>{l.label}</span>
        ))}

        {/* Mobile Theme Selector */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "12px" }}>
          <span style={{ fontSize: "12px", textTransform: "uppercase", letterSpacing: "0.1em", color: "#94a3b8", fontWeight: 600 }}>Select Theme</span>
          <div className="theme-picker-container" style={{ background: "rgba(255,255,255,0.08)" }}>
            <div className={`theme-dot ${theme === "blue" ? "active" : ""}`} style={{ background: "#3b82f6", width: "18px", height: "18px" }} onClick={() => setTheme("blue")} title="Cyber Blue" />
            <div className={`theme-dot ${theme === "purple" ? "active" : ""}`} style={{ background: "#8b5cf6", width: "18px", height: "18px" }} onClick={() => setTheme("purple")} title="Midnight Purple" />
            <div className={`theme-dot ${theme === "emerald" ? "active" : ""}`} style={{ background: "#10b981", width: "18px", height: "18px" }} onClick={() => setTheme("emerald")} title="Emerald Green" />
            <div className={`theme-dot ${theme === "pink" ? "active" : ""}`} style={{ background: "#ec4899", width: "18px", height: "18px" }} onClick={() => setTheme("pink")} title="Neon Pink" />
          </div>
        </div>

        <button 
          onClick={() => setSoundEnabled(!soundEnabled)} 
          style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "#fff", borderRadius: "30px", padding: "12px 28px", cursor: "pointer", fontSize: "15px", display: "flex", alignItems: "center", gap: "10px", outline: "none" }}
        >
          <span>Sound FX:</span>
          <span style={{ color: soundEnabled ? "var(--accent-secondary)" : "#94a3b8" }}>{soundEnabled ? "ON 🔊" : "OFF 🔇"}</span>
        </button>
        <GlowBtn primary onClick={() => scrollTo("contact")}>Connect ↗</GlowBtn>
      </div>

      {/* HERO */}
      <section id="hero" className="hero-section grid-bg">
        <Particles theme={theme} />
        
        {/* Visual Orbs */}
        <div style={{ position: "absolute", top: "25%", left: "55%", width: "550px", height: "550px", background: "radial-gradient(circle, var(--accent-glow) 0%, transparent 70%)", pointerEvents: "none", animation: "pulseGlow 8s infinite" }} />
        <div style={{ position: "absolute", top: "55%", left: "15%", width: "350px", height: "350px", background: "radial-gradient(circle, rgba(var(--accent-glow-rgb), 0.08) 0%, transparent 70%)", pointerEvents: "none", animation: "pulseGlow 12s infinite" }} />

        <div className="hero-layout" style={{ width: "100%", maxWidth: "1280px", margin: "0 auto", display: "grid", gridTemplateColumns: "1.2fr 0.8fr", alignItems: "center", gap: "32px", position: "relative", zIndex: 2 }}>
          
          <div className="hero-content-wrapper" style={{ animation: heroVisible ? "slideIn 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards" : "none" }}>
            <div className="hero-badge" style={{ display: "inline-flex", alignItems: "center", gap: "10px", padding: "8px 20px", borderRadius: "100px", background: "rgba(var(--accent-glow-rgb), 0.08)", border: "1px solid var(--accent-glow)", marginBottom: "32px" }}>
              <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "var(--accent-primary)", animation: "pulseGlow 1.5s infinite" }} />
              <span style={{ fontSize: "11px", color: "var(--accent-secondary)", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase" }}>Available for Collaborations</span>
            </div>

            <h1 className="hero-title" style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(38px, 6vw, 76px)", fontWeight: 800, lineHeight: 1.05, marginBottom: "24px", letterSpacing: "-0.02em" }}>
              <span style={{ color: "#f1f5f9" }}>Engineering</span><br />
              <span style={{ background: "var(--theme-gradient)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Intelligent Systems</span><br />
              <span style={{ color: "#f1f5f9" }}>&amp; Secure Frontiers</span>
            </h1>

            <p className="hero-desc" style={{ color: "#94a3b8", fontSize: "clamp(15px, 2vw, 18px)", lineHeight: 1.7, maxWidth: "620px", marginBottom: "40px", minHeight: "56px" }}>
              <Typewriter text="Transforming complex problems into elegant, scalable, and AI-driven solutions. I build software that thinks, scales, and protects." speed={25} />
            </p>

            <div className="hero-actions" style={{ display: "flex", flexWrap: "wrap", gap: "16px", marginBottom: "48px" }}>
              <GlowBtn primary onClick={() => scrollTo("projects")}>Explore Projects ⬡</GlowBtn>
              <a href="https://drive.google.com/file/d/1xRnLrVrKMPoBTUeW_KD1FBToYriMM8P-/view?usp=sharing" target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>
                <GlowBtn>Download Resume 📄</GlowBtn>
              </a>
            </div>

            <div className="hero-tags" style={{ display: "flex", flexWrap: "wrap", gap: "32px" }}>
              {[["Full Stack Dev", "⬡"], ["AI Explorer", "◈"], ["Cyber Enthusiast", "◉"], ["Hackathon Competitor", "◆"]].map(([label, icon]) => (
                <div key={label} style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <span style={{ color: "var(--accent-primary)", fontSize: "16px" }}>{icon}</span>
                  <span style={{ color: "#94a3b8", fontSize: "14px", fontWeight: 500 }}>{label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Hologram Wireframe Grid */}
          <div className="hero-right" style={{ display: "flex", justifyContent: "flex-end", zIndex: 1 }}>
            <div className="hologram-wireframe" style={{
              width: "clamp(240px, 30vw, 360px)",
              height: "clamp(240px, 30vw, 360px)",
              position: "relative",
              transformStyle: "preserve-3d"
            }}>
              <div style={{ position: "absolute", inset: 0, borderRadius: "50%", border: "2px dashed var(--accent-primary)", transform: "rotateX(75deg) rotateY(15deg)", boxShadow: "0 0 30px var(--accent-glow)" }} />
              <div style={{ position: "absolute", inset: 0, borderRadius: "50%", border: "2px dashed var(--accent-secondary)", transform: "rotateY(75deg) rotateX(15deg)", boxShadow: "0 0 30px var(--accent-glow)" }} />
              <div style={{ position: "absolute", inset: 0, borderRadius: "50%", border: "1.5px solid var(--accent-primary)", transform: "rotateZ(45deg)", animation: "spinSlow 12s linear infinite reverse" }} />
              
              {/* Inner core - Stylized Profile Avatar */}
              <div style={{
                position: "absolute",
                top: "15%",
                left: "15%",
                width: "70%",
                height: "70%",
                borderRadius: "50%",
                overflow: "hidden",
                border: "2.5px solid var(--accent-primary)",
                boxShadow: "0 0 35px var(--accent-glow), inset 0 0 20px var(--accent-glow)",
                animation: "float 6s ease-in-out infinite",
                background: "rgba(0, 0, 0, 0.4)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                zIndex: 2
              }}>
                <img 
                  src="/avatar.jpg" 
                  alt="Gauswami Ashish Devpuri Avatar" 
                  style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.5s ease" }}
                  onMouseEnter={e => { e.target.style.transform = "scale(1.08) rotate(1deg)"; }}
                  onMouseLeave={e => { e.target.style.transform = "none"; }}
                />
              </div>

              {/* Orbiting Node 1 Container */}
              <div style={{
                position: "absolute",
                inset: 0,
                animation: "spinSlow 12s linear infinite"
              }}>
                <div style={{
                  position: "absolute",
                  top: "-4px",
                  left: "50%",
                  width: "8px",
                  height: "8px",
                  borderRadius: "50%",
                  background: "var(--accent-secondary)",
                  boxShadow: "0 0 12px var(--accent-secondary)"
                }} />
              </div>

              {/* Orbiting Node 2 Container */}
              <div style={{
                position: "absolute",
                inset: 0,
                animation: "spinSlow 8s linear infinite reverse"
              }}>
                <div style={{
                  position: "absolute",
                  bottom: "-3px",
                  left: "50%",
                  width: "6px",
                  height: "6px",
                  borderRadius: "50%",
                  background: "var(--accent-primary)",
                  boxShadow: "0 0 10px var(--accent-primary)"
                }} />
              </div>

            </div>
          </div>

        </div>

        {/* Scroll Indicator */}
        <div style={{ position: "absolute", bottom: "40px", left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: "8px", opacity: 0.5 }}>
          <span style={{ fontSize: "11px", letterSpacing: "0.18em", textTransform: "uppercase", color: "#64748b", fontWeight: 700 }}>Scroll</span>
          <div style={{ width: "1px", height: "40px", background: "linear-gradient(to bottom, var(--accent-primary), transparent)", animation: "pulseGlow 2s infinite" }} />
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" style={{ padding: "120px 8%", position: "relative" }}>
        <div className="about-layout" style={{ maxWidth: "1200px", margin: "0 auto", display: "grid", gridTemplateColumns: "1.1fr 0.9fr", gap: "80px", alignItems: "center" }}>
          
          <div>
            <p className="section-label">Who I Am</p>
            <h2 className="section-title" style={{ marginBottom: "32px" }}>
              Engineering <span style={{ background: "linear-gradient(135deg,#63b3ed,#8b5cf6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Tomorrow</span><br />Today.
            </h2>
            <p style={{ color: "#94a3b8", fontSize: "16px", lineHeight: 1.8, marginBottom: "24px" }}>
              I'm <strong style={{ color: "#f1f5f9" }}>Gauswami Ashish Devpuri</strong> — a B.Tech Computer Engineering student at Ganpat University, building systems that sit at the intersection of artificial intelligence, security, and elegant software.
            </p>
            <p style={{ color: "#94a3b8", fontSize: "16px", lineHeight: 1.8, marginBottom: "24px" }}>
              My work is driven by one core belief: technology should be intelligent, secure, and beautiful. I don't build products — I architect experiences. From civic SaaS platforms to AI-powered automation engines, every project is an attempt to compress the future into the present.
            </p>
            <p style={{ color: "#94a3b8", fontSize: "16px", lineHeight: 1.8 }}>
              When I'm not writing code, I'm competing in hackathons, exploring cybersecurity, or obsessing over the next wave of AI breakthroughs that will redefine how humans interact with machines.
            </p>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
              {[
                { label: "Projects", val: 5, suffix: "+", icon: "◆", color: "#3b82f6" },
                { label: "Techs", val: 20, suffix: "+", icon: "◈", color: "#8b5cf6" },
                { label: "Hackathons", val: 5, suffix: "+", icon: "⬡", color: "#10b981" },
                { label: "Certs", val: 7, suffix: "+", icon: "◉", color: "#f59e0b" },
              ].map(s => (
                <div 
                  key={s.label} 
                  className="glass-panel" 
                  style={{ borderRadius: "20px", padding: "24px", textAlign: "center", border: "1px solid rgba(255,255,255,0.06)" }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = s.color + "50"; e.currentTarget.style.boxShadow = `0 8px 30px ${s.color}20`; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)"; e.currentTarget.style.boxShadow = "none"; }}
                >
                  <div style={{ fontSize: "24px", color: s.color, marginBottom: "8px", filter: `drop-shadow(0 0 8px ${s.color})` }}>{s.icon}</div>
                  <div style={{ fontFamily: "'Syne', sans-serif", fontSize: "36px", fontWeight: 800, color: "#f1f5f9", marginBottom: "6px" }}>
                    <CountUpElement target={s.val} />{s.suffix}
                  </div>
                  <div style={{ color: "#64748b", fontSize: "12px", fontWeight: 600, letterSpacing: "0.05em", textTransform: "uppercase" }}>{s.label}</div>
                </div>
              ))}
            </div>

            {/* GitHub Stats Card */}
            <div className="glass-panel" style={{ borderRadius: "20px", padding: "24px", display: "flex", flexWrap: "wrap", gap: "16px", justifyContent: "center" }}>
              <img src="https://github-readme-stats-eight-theta.vercel.app/api?username=gauswamiashih&show_icons=true&theme=radical&bg_color=00000000&title_color=63b3ed&icon_color=8b5cf6&text_color=94a3b8&hide_border=true" alt="GitHub Stats" style={{ height: "160px", maxWidth: "100%" }} />
              <img src="https://github-readme-stats-eight-theta.vercel.app/api/top-langs/?username=gauswamiashih&layout=compact&theme=radical&bg_color=00000000&title_color=63b3ed&text_color=94a3b8&hide_border=true" alt="Top Languages" style={{ height: "160px", maxWidth: "100%" }} />
            </div>

            <Terminal />
          </div>

        </div>
      </section>

      {/* SKILLS */}
      <section id="skills" className="grid-bg" style={{ padding: "120px 8%", position: "relative" }}>
        <div style={{ position: "absolute", top: "50%", right: "5%", width: "450px", height: "450px", background: "radial-gradient(circle, rgba(139,92,246,0.04) 0%, transparent 70%)", pointerEvents: "none" }} />
        
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "80px" }}>
            <p className="section-label">Technical Arsenal</p>
            <h2 className="section-title">Skills &amp; <span style={{ background: "linear-gradient(135deg,#8b5cf6,#ec4899)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Expertise</span></h2>
          </div>
          
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "24px" }}>
            {SKILLS.map((s, i) => <SkillBar key={s.cat} skill={s} delay={i * 120} />)}
          </div>
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects" style={{ padding: "120px 8%" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "80px" }}>
            <p className="section-label">Selected Work</p>
            <h2 className="section-title">Project <span style={{ background: "linear-gradient(135deg,#3b82f6,#10b981)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Showcase</span></h2>
          </div>
          
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(360px, 1fr))", gap: "32px", justifyContent: "center" }}>
            {PROJECTS.map((p, i) => (
              <Reveal key={p.title} delay={i * 100}>
                <ProjectCard project={p} onDemoClick={() => handleViewChange("planto")} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CERTIFICATIONS */}
      <section id="certs" style={{ padding: "120px 8%" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "80px" }}>
            <p className="section-label">Recognition</p>
            <h2 className="section-title">Achievements &amp; <span style={{ background: "linear-gradient(135deg,#10b981,#3b82f6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Certifications</span></h2>
          </div>
          
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "20px" }}>
            {CERTS.map((c, i) => (
              <Reveal key={c.title} delay={i * 80}>
                <CertCard cert={c} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* BENTO BOX VISION GRID */}
      <section style={{ padding: "120px 8%", background: "linear-gradient(180deg,#020408,#040e1f,#020408)", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 50% 50%, rgba(59,130,246,0.05), transparent 70%)" }} />
        
        <div style={{ maxWidth: "1200px", margin: "0 auto", textAlign: "center", position: "relative", zIndex: 2 }}>
          <p className="section-label">The Vision</p>
          <h2 className="section-title" style={{ marginBottom: "28px" }}>
            Pioneering the <span style={{ background: "linear-gradient(135deg,#63b3ed,#8b5cf6,#ec4899)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Next Era</span>
          </h2>
          <p style={{ color: "#94a3b8", fontSize: "17px", maxWidth: "700px", margin: "0 auto 64px", lineHeight: 1.8 }}>
            Transitioning from static layouts to intelligent, context-aware digital platforms. This is the blueprint for modern design.
          </p>

          {/* Bento Box Visual Grid */}
          <div className="bento-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gridAutoRows: "160px", gap: "20px", maxWidth: "1000px", margin: "0 auto" }}>
            {[
              { 
                ref: bentoRef1,
                label: "AI Systems", 
                val: "Neural Intelligence", 
                color: "#8b5cf6", 
                cols: 2, 
                rows: 2, 
                desc: "Self-learning models driving next-gen predictive algorithms.",
                icon: (
                  <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#8b5cf6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ filter: "drop-shadow(0 0 8px #8b5cf6)" }}>
                    <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/>
                    <path d="M12 6v12M8 10h8"/>
                  </svg>
                )
              },
              { 
                ref: bentoRef2,
                label: "Security", 
                val: "Zero Trust Architecture", 
                color: "#10b981", 
                cols: 2, 
                rows: 1, 
                desc: "Verify explicitly. Least privilege access. Assume breach.",
                icon: (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ filter: "drop-shadow(0 0 8px #10b981)" }}>
                    <rect width="18" height="11" x="3" y="11" rx="2" ry="2"/>
                    <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                  </svg>
                )
              },
              { 
                ref: bentoRef3,
                label: "Automation", 
                val: "Autonomous Ops", 
                color: "#f59e0b", 
                cols: 1, 
                rows: 1, 
                desc: "Self-healing deployments.",
                icon: (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ filter: "drop-shadow(0 0 8px #f59e0b)" }}>
                    <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.1a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/>
                    <circle cx="12" cy="12" r="3"/>
                  </svg>
                )
              },
              { 
                ref: bentoRef4,
                label: "Architecture", 
                val: "Serverless Scale", 
                color: "#3b82f6", 
                cols: 1, 
                rows: 1, 
                desc: "Zero maintenance.",
                icon: (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ filter: "drop-shadow(0 0 8px #3b82f6)" }}>
                    <ellipse cx="12" cy="5" rx="9" ry="3"/>
                    <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/>
                  </svg>
                )
              },
              { 
                ref: bentoRef5,
                label: "Performance", 
                val: "Edge Native Compute", 
                color: "#ec4899", 
                cols: 2, 
                rows: 1, 
                desc: "Deploying code steps away from client browsers for sub-millisecond response rates.",
                icon: (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ec4899" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ filter: "drop-shadow(0 0 8px #ec4899)" }}>
                    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
                  </svg>
                )
              },
              { 
                ref: bentoRef6,
                label: "Experience", 
                val: "Immersive User Interface", 
                color: "#0ea5e9", 
                cols: 2, 
                rows: 1, 
                desc: "Blending rich micro-interactions and audio triggers to lock in viewer attention.",
                icon: (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0ea5e9" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ filter: "drop-shadow(0 0 8px #0ea5e9)" }}>
                    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
                  </svg>
                )
              },
            ].map((item, i) => (
              <div 
                key={item.label} 
                ref={item.ref}
                className={`bento-glow-card bento-col-${item.cols} bento-row-${item.rows}`}
                style={{ 
                  textAlign: item.cols > 1 ? "left" : "center",
                  display: "flex", 
                  flexDirection: "column", 
                  justifyContent: "center",
                  animation: heroVisible ? `slideIn 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${i * 0.15}s forwards` : "none",
                  opacity: 0
                }}
                onMouseMove={handleBentoMouseMove}
                onMouseEnter={e => { e.currentTarget.style.borderColor = item.color + "70"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)"; }}
              >
                {item.cols > 1 && (
                  <div style={{ position: "absolute", bottom: "-20%", right: "-10%", width: "180px", height: "180px", background: `radial-gradient(circle, ${item.color}15, transparent 70%)`, pointerEvents: "none" }} />
                )}
                
                <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: item.cols > 1 ? "16px" : "10px", justifyContent: item.cols > 1 ? "flex-start" : "center" }}>
                  <div style={{ color: item.color }}>{item.icon}</div>
                  {item.cols > 1 && (
                    <div style={{ color: item.color, fontSize: "11px", letterSpacing: "0.15em", textTransform: "uppercase", fontWeight: 700 }}>{item.label}</div>
                  )}
                </div>
                
                <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, color: "#f1f5f9", fontSize: item.cols > 1 ? "24px" : "16px", marginBottom: "8px" }}>
                  {item.val}
                </div>
                
                {item.cols > 1 ? (
                  <p style={{ color: "#94a3b8", fontSize: "14px", lineHeight: 1.6, maxWidth: "85%" }}>{item.desc}</p>
                ) : (
                  <div style={{ color: "#475569", fontSize: "10px", letterSpacing: "0.1em", textTransform: "uppercase", fontWeight: 700 }}>{item.label}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="grid-bg" style={{ padding: "120px 8%" }}>
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "64px" }}>
            <p className="section-label">Let's Build</p>
            <h2 className="section-title">Get in <span style={{ background: "linear-gradient(135deg,#3b82f6,#8b5cf6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Touch</span></h2>
            <p style={{ color: "#94a3b8", marginTop: "16px", fontSize: "16px" }}>Have an idea, a project, or just want to connect? Let's talk.</p>
          </div>

          {sent ? (
            <div className="glass-panel" style={{ borderRadius: "24px", padding: "64px", textAlign: "center", borderColor: "rgba(16,185,129,0.4)" }}>
              <div style={{ fontSize: "56px", marginBottom: "20px", color: "#10b981", animation: "pulseGlow 2s infinite" }}>✓</div>
              <h3 style={{ fontFamily: "'Syne', sans-serif", fontSize: "26px", fontWeight: 800, color: "#f1f5f9", marginBottom: "8px" }}>Transmission Completed</h3>
              <p style={{ color: "#94a3b8" }}>Your data packet has been successfully sent. I will reply within 24 hours.</p>
              <div style={{ marginTop: "24px" }}>
                <GlowBtn onClick={() => setSent(false)}>Send Another Message</GlowBtn>
              </div>
            </div>
          ) : (
            <form 
              onSubmit={(e) => {
                e.preventDefault();
                setSent(true);
              }} 
              className="glass-panel" 
              style={{ borderRadius: "24px", padding: "48px" }}
            >
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginBottom: "20px" }}>
                <input type="text" className="form-input" placeholder="Your Name" required />
                <input type="email" className="form-input" placeholder="Your Email" required />
              </div>
              <textarea className="form-input" placeholder="Your message..." required style={{ marginBottom: "28px" }} />
              
              <GlowBtn primary type="submit">Send Message ↗</GlowBtn>
            </form>
          )}

          {/* Socials */}
          <div style={{ display: "flex", justifyContent: "center", gap: "20px", marginTop: "56px", flexWrap: "wrap" }}>
            {[
              { label: "GitHub", icon: "⌥", href: "https://github.com/gauswamiashih" },
              { label: "LinkedIn", icon: "◈", href: "https://www.linkedin.com/in/gauswami-ashish-078870293?utm_source=share_via&utm_content=profile&utm_medium=member_android" },
              { label: "Email", icon: "◉", href: "mailto:gauswamiashish760@gmail.com" },
              { label: "Instagram", icon: "◆", href: "https://www.instagram.com/gauswami_8_07_18?igsh=MXQxMmdqM3A2YXN0ZQ==" },
            ].map(s => (
              <a 
                key={s.label} 
                href={s.href} 
                target="_blank" 
                rel="noopener noreferrer"
                className="glass-panel"
                style={{ 
                  display: "flex", 
                  alignItems: "center", 
                  gap: "12px", 
                  color: "#94a3b8", 
                  textDecoration: "none", 
                  transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)", 
                  padding: "16px 24px", 
                  borderRadius: "14px", 
                  border: "1px solid rgba(255,255,255,0.05)" 
                }}
                onMouseEnter={e => { e.currentTarget.style.color = "#63b3ed"; e.currentTarget.style.borderColor = "rgba(99,179,237,0.3)"; e.currentTarget.style.background = "rgba(99,179,237,0.05)"; }}
                onMouseLeave={e => { e.currentTarget.style.color = "#94a3b8"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.05)"; e.currentTarget.style.background = "transparent"; }}
              >
                <span style={{ fontSize: "20px" }}>{s.icon}</span>
                <span style={{ fontSize: "12px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase" }}>{s.label}</span>
              </a>
            ))}
          </div>

        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ padding: "48px 8%", borderTop: "1px solid rgba(255,255,255,0.05)", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "24px" }}>
        <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "18px", background: "linear-gradient(135deg,#63b3ed,#8b5cf6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Gauswami Ashish</div>
        <div style={{ color: "#94a3b8", fontSize: "13px" }}>
          Designed &amp; Engineered by{" "}
          <span style={{ background: "linear-gradient(135deg,#63b3ed,#8b5cf6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", fontWeight: 600 }}>Ashish Devpuri</span>
          {" "}· {new Date().getFullYear()}
        </div>
        <div style={{ color: "#fbbf24", fontSize: "11px", letterSpacing: "0.08em", fontWeight: 700 }}>B.TECH · COMPUTER ENGINEERING · GANPAT UNIVERSITY</div>
      </footer>

    </div>
  );
}
