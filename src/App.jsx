import { useState, useEffect, useRef } from "react";

const NAV_LINKS = ["About", "Skills", "Projects", "Contact"];

const SKILLS = [
  { cat: "AI & LLM APIs", items: ["OpenAI API", "Gemini", "LangChain", "Hugging Face"], pct: 82 },
  { cat: "Full Stack Dev", items: ["React", "Next.js", "Node.js", "TypeScript"], pct: 88 },
  { cat: "Backend & DB", items: ["Supabase", "Firebase", "PostgreSQL", "REST APIs"], pct: 80 },
  { cat: "Cybersecurity", items: ["Linux", "Network Security", "OWASP", "CTF Basics"], pct: 70 },
  { cat: "Cloud & DevOps", items: ["Git", "GitHub Actions", "Vercel", "Docker Basics"], pct: 75 },
  { cat: "UI/UX Systems", items: ["Tailwind CSS", "Framer Motion", "Figma", "GSAP"], pct: 85 },
];

const PROJECTS = [
  {
    title: "NagrikSetu",
    subtitle: "Smart Civic Management Platform",
    desc: "A futuristic civic SaaS platform with complaint tracking, geolocation, real-time analytics, dashboards and authentication — bridging citizens and governance.",
    tech: ["React", "TypeScript", "Supabase", "Firebase", "OpenStreetMap", "Tailwind"],
    color: "#3b82f6",
    glow: "#1d4ed8",
    icon: "⬡",
    demoLink: "https://nagriksetu-main.vercel.app/",
  },
];


const CERTS = [
  { title: "Cyber Hackathon", org: "Ganpat University", icon: "⬡", color: "#3b82f6" },
  { title: "IEEE Event Participation", org: "IEEE Student Chapter", icon: "◈", color: "#8b5cf6" },
  { title: "AI Impact Summit", org: "Innovation Cell", icon: "◉", color: "#10b981" },
  { title: "NIPAM IPR Awareness", org: "Govt. of India Initiative", icon: "◆", color: "#f59e0b" },
  { title: "Startup Innovation Forum", org: "Entrepreneurship Cell", icon: "◇", color: "#ec4899" },
  { title: "National Science Day", org: "Ganpat University", icon: "○", color: "#06b6d4" },
];

function useCountUp(target, duration = 2000, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime = null;
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration, start]);
  return count;
}

function Particles() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let w = (canvas.width = canvas.offsetWidth);
    let h = (canvas.height = canvas.offsetHeight);
    const particles = Array.from({ length: 80 }, () => ({
      x: Math.random() * w, y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.4, vy: (Math.random() - 0.5) * 0.4,
      r: Math.random() * 1.5 + 0.5,
      alpha: Math.random() * 0.5 + 0.1,
    }));
    let raf;
    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      particles.forEach((p) => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0) p.x = w; if (p.x > w) p.x = 0;
        if (p.y < 0) p.y = h; if (p.y > h) p.y = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(99,179,237,${p.alpha})`;
        ctx.fill();
      });
      particles.forEach((a, i) => {
        particles.slice(i + 1).forEach((b) => {
          const d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d < 120) {
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(99,179,237,${0.08 * (1 - d / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        });
      });
      raf = requestAnimationFrame(draw);
    };
    draw();
    const resize = () => { w = canvas.width = canvas.offsetWidth; h = canvas.height = canvas.offsetHeight; };
    window.addEventListener("resize", resize);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, []);
  return <canvas ref={canvasRef} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }} />;
}

const playSound = (type) => {
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
      gain.gain.setValueAtTime(0.1, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.1);
      osc.start(); osc.stop(ctx.currentTime + 0.1);
    } else if (type === "type") {
      osc.type = "square";
      osc.frequency.setValueAtTime(400 + Math.random() * 200, ctx.currentTime);
      gain.gain.setValueAtTime(0.02, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);
      osc.start(); osc.stop(ctx.currentTime + 0.05);
    }
  } catch(e) {}
};

function Reveal({ children, delay = 0 }) {
  const [visible, setVisible] = useState(false);
  const ref = useRef();
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) setVisible(true);
    }, { threshold: 0.2 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(40px)", transition: `all 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms` }}>
      {children}
    </div>
  );
}

function GlowBtn({ children, primary, onClick }) {
  return (
    <button onClick={(e) => { playSound("click"); if(onClick) onClick(e); }} style={{
      padding: "14px 32px", borderRadius: "50px", fontFamily: "'Space Grotesk',sans-serif",
      fontWeight: 600, fontSize: "14px", letterSpacing: "0.05em", cursor: "pointer",
      transition: "all 0.3s ease", border: primary ? "none" : "1px solid rgba(99,179,237,0.4)",
      background: primary ? "linear-gradient(135deg,#3b82f6,#8b5cf6)" : "rgba(99,179,237,0.05)",
      color: "#fff", boxShadow: primary ? "0 0 20px rgba(59,130,246,0.4)" : "none",
    }}
      onMouseEnter={e => { playSound("click"); e.target.style.transform = "translateY(-2px)"; e.target.style.boxShadow = primary ? "0 0 40px rgba(59,130,246,0.6)" : "0 0 20px rgba(99,179,237,0.3)"; }}
      onMouseLeave={e => { e.target.style.transform = "none"; e.target.style.boxShadow = primary ? "0 0 20px rgba(59,130,246,0.4)" : "none"; }}>
      {children}
    </button>
  );
}

function SkillBar({ skill, delay }) {
  const [visible, setVisible] = useState(false);
  const ref = useRef();
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.3 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "16px", padding: "24px", backdropFilter: "blur(10px)", transition: "all 0.3s" }}
      onMouseEnter={e => e.currentTarget.style.borderColor = "rgba(99,179,237,0.3)"}
      onMouseLeave={e => e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)"}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "12px" }}>
        <span style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 600, color: "#e2e8f0", fontSize: "15px" }}>{skill.cat}</span>
        <span style={{ color: "#63b3ed", fontWeight: 700, fontSize: "14px" }}>{skill.pct}%</span>
      </div>
      <div style={{ background: "rgba(255,255,255,0.05)", borderRadius: "100px", height: "6px", overflow: "hidden" }}>
        <div style={{ height: "100%", borderRadius: "100px", width: visible ? `${skill.pct}%` : "0%", background: "linear-gradient(90deg,#3b82f6,#8b5cf6)", transition: `width 1.2s cubic-bezier(0.4,0,0.2,1) ${delay}ms`, boxShadow: "0 0 12px rgba(59,130,246,0.6)" }} />
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginTop: "14px" }}>
        {skill.items.map(it => (
          <span key={it} style={{ fontSize: "12px", padding: "4px 10px", borderRadius: "100px", background: "rgba(99,179,237,0.08)", color: "#93c5fd", border: "1px solid rgba(99,179,237,0.2)", fontFamily: "'Space Grotesk',sans-serif" }}>{it}</span>
        ))}
      </div>
    </div>
  );
}

function ProjectCard({ project }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      style={{ background: "rgba(255,255,255,0.03)", borderRadius: "20px", padding: "32px", border: `1px solid ${hovered ? project.color + "60" : "rgba(255,255,255,0.07)"}`, transition: "all 0.4s ease", transform: hovered ? "translateY(-8px)" : "none", boxShadow: hovered ? `0 20px 60px ${project.glow}40` : "none", cursor: "pointer", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "2px", background: `linear-gradient(90deg, transparent, ${project.color}, transparent)`, opacity: hovered ? 1 : 0, transition: "opacity 0.4s" }} />
      <div style={{ fontSize: "32px", marginBottom: "16px", filter: `drop-shadow(0 0 12px ${project.color})` }}>{project.icon}</div>
      <h3 style={{ fontFamily: "'Syne',sans-serif", fontSize: "22px", fontWeight: 800, color: "#f1f5f9", margin: "0 0 6px" }}>{project.title}</h3>
      <p style={{ color: project.color, fontSize: "13px", fontWeight: 600, margin: "0 0 16px", fontFamily: "'Space Grotesk',sans-serif", letterSpacing: "0.05em", textTransform: "uppercase" }}>{project.subtitle}</p>
      <p style={{ color: "#94a3b8", fontSize: "14px", lineHeight: "1.7", margin: "0 0 24px", fontFamily: "'Space Grotesk',sans-serif" }}>{project.desc}</p>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "24px" }}>
        {project.tech.map(t => (
          <span key={t} style={{ fontSize: "11px", padding: "4px 10px", borderRadius: "100px", background: `${project.color}15`, color: project.color, border: `1px solid ${project.color}30`, fontFamily: "'Space Grotesk',sans-serif", fontWeight: 500 }}>{t}</span>
        ))}
      </div>
      <div style={{ display: "flex", gap: "12px" }}>
        {project.demoLink && (
          <a href={project.demoLink} target="_blank" rel="noopener noreferrer" style={{ display: "block", textAlign: "center", textDecoration: "none", flex: 1, padding: "10px", borderRadius: "10px", background: `${project.color}20`, color: project.color, border: `1px solid ${project.color}40`, fontFamily: "'Space Grotesk',sans-serif", fontWeight: 600, fontSize: "13px", cursor: "pointer" }}>Live Demo ↗</a>
        )}
        {project.githubLink && (
          <a href={project.githubLink} target="_blank" rel="noopener noreferrer" style={{ display: "block", textAlign: "center", textDecoration: "none", flex: 1, padding: "10px", borderRadius: "10px", background: "rgba(255,255,255,0.04)", color: "#94a3b8", border: "1px solid rgba(255,255,255,0.1)", fontFamily: "'Space Grotesk',sans-serif", fontWeight: 600, fontSize: "13px", cursor: "pointer" }}>GitHub ⌥</a>
        )}
      </div>
    </div>
  );
}

function CertCard({ cert }) {
  const [hov, setHov] = useState(false);
  return (
    <div onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ background: "rgba(255,255,255,0.03)", backdropFilter: "blur(12px)", border: `1px solid ${hov ? cert.color + "50" : "rgba(255,255,255,0.07)"}`, borderRadius: "16px", padding: "24px", transition: "all 0.3s", transform: hov ? "translateY(-4px)" : "none", boxShadow: hov ? `0 12px 40px ${cert.color}30` : "none" }}>
      <div style={{ fontSize: "28px", marginBottom: "12px", color: cert.color, filter: `drop-shadow(0 0 8px ${cert.color})` }}>{cert.icon}</div>
      <h4 style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, color: "#f1f5f9", fontSize: "15px", margin: "0 0 6px" }}>{cert.title}</h4>
      <p style={{ color: "#64748b", fontSize: "12px", fontFamily: "'Space Grotesk',sans-serif", margin: 0 }}>{cert.org}</p>
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
  return <span>{disp}<span style={{ animation: "blink 1s step-end infinite" }}>█</span></span>;
}

function Terminal() {
  const [hist, setHist] = useState([{ cmd: "", out: "GAUSWAMI-OS v2.0.4. Type 'help' to start." }]);
  const [inp, setInp] = useState("");
  const endRef = useRef(null);
  
  useEffect(() => { endRef.current?.scrollIntoView({ behavior: "smooth" }); }, [hist]);
  
  const handle = (e) => {
    playSound("type");
    if (e.key === "Enter") {
      const c = inp.trim().toLowerCase();
      setInp("");
      let out = "";
      if (c === "help") out = "Commands: help, whoami, skills, clear";
      else if (c === "whoami") out = "Gauswami Ashish Devpuri. Root user. Engineer. Hacker.";
      else if (c === "skills") out = "Loading modules... AI, Cyber, React, Supabase, Linux.";
      else if (c === "clear") { setHist([]); return; }
      else if (c) out = `Command not found: ${c}`;
      
      setHist(p => [...p, { cmd: `root@ashish:~$ ${c}`, out }]);
    }
  };
  return (
    <div style={{ background: "#050a14", border: "1px solid rgba(59,130,246,0.3)", borderRadius: "12px", padding: "16px", fontFamily: "monospace", color: "#63b3ed", fontSize: "14px", height: "300px", overflowY: "auto", boxShadow: "0 0 20px rgba(0,0,0,0.5) inset" }}>
      <div style={{ display: "flex", gap: "6px", marginBottom: "16px" }}>
        <div style={{ width: "12px", height: "12px", borderRadius: "50%", background: "#ef4444" }} />
        <div style={{ width: "12px", height: "12px", borderRadius: "50%", background: "#eab308" }} />
        <div style={{ width: "12px", height: "12px", borderRadius: "50%", background: "#22c55e" }} />
      </div>
      {hist.map((h, i) => (
        <div key={i} style={{ marginBottom: "8px" }}>
          {h.cmd && <div style={{ color: "#f8fafc" }}>{h.cmd}</div>}
          {h.out && <div style={{ color: "#93c5fd", marginTop: "4px" }}>{h.out}</div>}
        </div>
      ))}
      <div style={{ display: "flex", alignItems: "center" }}>
        <span style={{ color: "#f8fafc", marginRight: "8px" }}>root@ashish:~$</span>
        <input value={inp} onChange={e => setInp(e.target.value)} onKeyDown={handle} style={{ background: "transparent", border: "none", color: "#63b3ed", fontFamily: "monospace", fontSize: "14px", outline: "none", flex: 1 }} autoFocus={false} />
      </div>
      <div ref={endRef} />
    </div>
  );
}

export default function Portfolio() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [cursor, setCursor] = useState({ x: 0, y: 0 });
  const [heroVisible, setHeroVisible] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  useEffect(() => {
    setHeroVisible(true);
    const onScroll = () => setScrollY(window.scrollY);
    const onMove = (e) => setCursor({ x: e.clientX, y: e.clientY });
    window.addEventListener("scroll", onScroll);
    window.addEventListener("mousemove", onMove);
    return () => { window.removeEventListener("scroll", onScroll); window.removeEventListener("mousemove", onMove); };
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  const handleSend = () => {
    if (formData.name && formData.email && formData.message) {
      setSent(true);
      setFormData({ name: "", email: "", message: "" });
    }
  };

  const fonts = `@import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;700;800&family=Space+Grotesk:wght@300;400;500;600;700&display=swap');`;

  return (
    <div style={{ background: "#020408", minHeight: "100vh", color: "#fff", fontFamily: "'Space Grotesk',sans-serif", overflowX: "hidden" }}>
      <style>{`
        ${fonts}
        * { box-sizing: border-box; margin: 0; }
        html { scroll-behavior: smooth; }
        section { scroll-margin-top: 80px; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #020408; }
        ::-webkit-scrollbar-thumb { background: #3b82f6; border-radius: 2px; }
        @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-12px)} }
        @keyframes spin { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        @keyframes pulse { 0%,100%{opacity:0.4;transform:scale(1)} 50%{opacity:0.8;transform:scale(1.05)} }
        @keyframes slideIn { from{opacity:0;transform:translateY(40px)} to{opacity:1;transform:translateY(0)} }
        @keyframes glow { 0%,100%{box-shadow:0 0 20px rgba(59,130,246,0.3)} 50%{box-shadow:0 0 40px rgba(59,130,246,0.6)} }
        @keyframes scanline { 0%{transform:translateY(-100%)} 100%{transform:translateY(100vh)} }
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
        .cursor-glow { pointer-events:none; position:fixed; z-index:9999; width:300px; height:300px; border-radius:50%; background:radial-gradient(circle,rgba(59,130,246,0.06),transparent 70%); transform:translate(-50%,-50%); transition:all 0.1s; }
        .nav-link { color:#94a3b8; text-decoration:none; font-size:14px; font-weight:500; letter-spacing:0.05em; transition:color 0.3s; cursor:pointer; }
        .nav-link:hover { color:#63b3ed; }
        .section-label { font-size:11px; font-weight:700; letter-spacing:0.2em; text-transform:uppercase; color:#3b82f6; margin-bottom:16px; }
        .section-title { font-family:'Syne',sans-serif; font-size:clamp(32px,5vw,56px); font-weight:800; line-height:1.1; color:#f1f5f9; }
        .grid-bg { background-image:linear-gradient(rgba(99,179,237,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(99,179,237,0.03) 1px,transparent 1px); background-size:60px 60px; }
        .glass { background:rgba(255,255,255,0.03); backdrop-filter:blur(12px); border:1px solid rgba(255,255,255,0.08); }
        .form-input { width:100%; padding:14px 18px; background:rgba(255,255,255,0.06); border:1px solid rgba(255,255,255,0.2); border-radius:12px; color:#e2e8f0; font-family:'Space Grotesk',sans-serif; font-size:14px; outline:none; transition:all 0.3s; }
        .form-input:focus { background:rgba(255,255,255,0.08); border-color:rgba(59,130,246,0.6); box-shadow:0 0 0 4px rgba(59,130,246,0.15); }
        .form-input::placeholder { color:#475569; }
        textarea.form-input { resize:vertical; min-height:120px; }
        .status-badge { display:flex; align-items:center; gap:8px; background:rgba(16,185,129,0.1); border:1px solid rgba(16,185,129,0.2); padding:6px 12px; border-radius:50px; }
        @media(max-width: 768px) { .status-badge { display: none; } }
      `}</style>

      {/* Cursor glow */}
      <div className="cursor-glow" style={{ left: cursor.x, top: cursor.y }} />

      {/* NAV */}
      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, padding: "0 5%", height: "72px", display: "flex", alignItems: "center", justifyContent: "space-between", background: scrollY > 50 ? "rgba(2,4,8,0.9)" : "transparent", backdropFilter: scrollY > 50 ? "blur(20px)" : "none", borderBottom: scrollY > 50 ? "1px solid rgba(255,255,255,0.06)" : "none", transition: "all 0.4s" }}>
        <div style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: "20px", background: "linear-gradient(135deg,#63b3ed,#8b5cf6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", letterSpacing: "-0.02em" }}>
          Gauswami Ashish
        </div>
        <div style={{ display: "flex", gap: "32px", alignItems: "center" }}>
          <div className="status-badge">
            <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#10b981", animation: "pulse 1.5s infinite" }} />
            <span style={{ fontSize: "10px", color: "#10b981", fontWeight: 700, letterSpacing: "0.1em" }}>SYSTEM ONLINE</span>
          </div>
          {NAV_LINKS.map(l => (
            <span key={l} className="nav-link" onClick={() => scrollTo(l.toLowerCase())}>{l}</span>
          ))}
          <GlowBtn primary onClick={() => scrollTo("contact")}>Connect ↗</GlowBtn>
        </div>
      </nav>

      {/* HERO */}
      <section id="hero" className="grid-bg" style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", position: "relative", overflow: "hidden", padding: "100px 5% 60px" }}>
        <Particles />
        {/* Radial glow */}
        <div style={{ position: "absolute", top: "30%", left: "50%", transform: "translate(-50%,-50%)", width: "600px", height: "600px", background: "radial-gradient(circle,rgba(59,130,246,0.08),transparent 70%)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", top: "60%", left: "20%", width: "300px", height: "300px", background: "radial-gradient(circle,rgba(139,92,246,0.06),transparent 70%)", pointerEvents: "none" }} />
        {/* HUD corners */}
        {[["0","0","right","bottom"],["0","auto","right","top"],["auto","0","left","bottom"],["auto","auto","left","top"]].map(([b,r,br,tr],i)=>(
          <div key={i} style={{ position:"absolute", bottom:b||undefined, right:r||undefined, top:tr||undefined, left: i>1?"5%":undefined, right: i<2?"5%":undefined, bottom: i%2===0?"8%":undefined, top: i%2===1?"120px":undefined, width:"60px", height:"60px", borderTop: i<2?"none":`1px solid rgba(99,179,237,0.2)`, borderBottom: i>=2?"none":`1px solid rgba(99,179,237,0.2)`, borderLeft: i%2===0?"none":`1px solid rgba(99,179,237,0.2)`, borderRight: i%2===1?"none":`1px solid rgba(99,179,237,0.2)`, opacity:0.5 }} />
        ))}

        <div style={{ textAlign: "center", maxWidth: "900px", position: "relative", zIndex: 2, animation: heroVisible ? "slideIn 1s ease forwards" : "none" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "10px", padding: "8px 20px", borderRadius: "100px", background: "rgba(59,130,246,0.1)", border: "1px solid rgba(59,130,246,0.25)", marginBottom: "40px" }}>
            <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#3b82f6", animation: "pulse 2s infinite" }} />
            <span style={{ fontSize: "12px", color: "#93c5fd", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase" }}>Available for Collaborations</span>
          </div>

          <h1 style={{ fontFamily: "'Syne',sans-serif", fontSize: "clamp(40px,7vw,84px)", fontWeight: 800, lineHeight: 1.05, marginBottom: "28px", letterSpacing: "-0.02em" }}>
            <span style={{ color: "#f1f5f9" }}>Building the Future with</span><br />
            <span style={{ background: "linear-gradient(135deg,#93c5fd,#c4b5fd,#f9a8d4)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>AI, Cybersecurity</span><br />
            <span style={{ color: "#f1f5f9" }}>&amp; Intelligent Systems</span>
          </h1>

          <p style={{ color: "#64748b", fontSize: "clamp(15px,2vw,19px)", lineHeight: 1.7, maxWidth: "680px", margin: "0 auto 48px", minHeight: "60px" }}>
            <Typewriter text="Computer Engineering student focused on AI integration, secure systems, automation, full-stack development, and futuristic digital experiences." speed={30} />
          </p>

          <div style={{ display: "flex", flexWrap: "wrap", gap: "16px", justifyContent: "center", marginBottom: "56px" }}>
            <GlowBtn primary onClick={() => scrollTo("projects")}>Explore Projects ⬡</GlowBtn>
            <a href="https://drive.google.com/file/d/13Df2A7L547X_zWa0sRqbDXGvWwQV7pC8/view?usp=sharing" target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>
              <GlowBtn onClick={() => {}}>Download Resume 📄</GlowBtn>
            </a>
          </div>

          {/* Stats row */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "32px", justifyContent: "center" }}>
            {[["Full Stack Dev", "⬡"],["AI Explorer","◈"],["Cyber Enthusiast","◉"],["Hackathon Competitor","◆"]].map(([label,icon]) => (
              <div key={label} style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <span style={{ color: "#3b82f6", fontSize: "16px" }}>{icon}</span>
                <span style={{ color: "#94a3b8", fontSize: "14px", fontWeight: 500 }}>{label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <div style={{ position: "absolute", bottom: "40px", left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: "8px", opacity: 0.4 }}>
          <span style={{ fontSize: "11px", letterSpacing: "0.15em", textTransform: "uppercase", color: "#94a3b8" }}>Scroll</span>
          <div style={{ width: "1px", height: "40px", background: "linear-gradient(to bottom,#3b82f6,transparent)", animation: "pulse 2s infinite" }} />
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" style={{ padding: "120px 5%", position: "relative" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "80px", alignItems: "center" }}>
          <div>
            <p className="section-label">Who I Am</p>
            <h2 className="section-title" style={{ marginBottom: "32px" }}>Engineering <span style={{ background: "linear-gradient(135deg,#63b3ed,#8b5cf6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Tomorrow</span><br />Today.</h2>
            <p style={{ color: "#64748b", fontSize: "16px", lineHeight: 1.8, marginBottom: "24px" }}>
              I'm <strong style={{ color: "#94a3b8" }}>Gauswami Ashish Devpuri</strong> — a B.Tech Computer Engineering student at Ganpat University, building systems that sit at the intersection of artificial intelligence, security, and elegant software.
            </p>
            <p style={{ color: "#64748b", fontSize: "16px", lineHeight: 1.8, marginBottom: "24px" }}>
              My work is driven by one core belief: technology should be intelligent, secure, and beautiful. I don't build products — I architect experiences. From civic SaaS platforms to AI-powered automation engines, every project is an attempt to compress the future into the present.
            </p>
            <p style={{ color: "#64748b", fontSize: "16px", lineHeight: 1.8 }}>
              When I'm not writing code, I'm competing in hackathons, exploring cybersecurity, or obsessing over the next wave of AI breakthroughs that will redefine how humans interact with machines.
            </p>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
              {[
                { label: "Projects", val: "10+", icon: "◆", color: "#3b82f6" },
                { label: "Techs", val: "20+", icon: "◈", color: "#8b5cf6" },
                { label: "Hackathons", val: "5+", icon: "⬡", color: "#10b981" },
                { label: "Certs", val: "6+", icon: "◉", color: "#f59e0b" },
              ].map(s => (
                <div key={s.label} className="glass" style={{ borderRadius: "20px", padding: "24px", textAlign: "center", transition: "all 0.3s" }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = s.color + "40"; e.currentTarget.style.boxShadow = `0 8px 30px ${s.color}20`; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"; e.currentTarget.style.boxShadow = "none"; }}>
                  <div style={{ fontSize: "24px", color: s.color, marginBottom: "8px", filter: `drop-shadow(0 0 8px ${s.color})` }}>{s.icon}</div>
                  <div style={{ fontFamily: "'Syne',sans-serif", fontSize: "32px", fontWeight: 800, color: "#f1f5f9", marginBottom: "6px" }}>{s.val}</div>
                  <div style={{ color: "#64748b", fontSize: "12px", fontWeight: 500 }}>{s.label}</div>
                </div>
              ))}
            </div>

            {/* GitHub Stats Card */}
            <div className="glass" style={{ borderRadius: "20px", padding: "24px", display: "flex", flexWrap: "wrap", gap: "16px", justifyContent: "center" }}>
              <img src="https://github-readme-stats.vercel.app/api?username=gauswamiashih&show_icons=true&theme=radical&bg_color=00000000&title_color=63b3ed&icon_color=8b5cf6&text_color=94a3b8&hide_border=true" alt="GitHub Stats" style={{ height: "160px" }} />
              <img src="https://github-readme-stats.vercel.app/api/top-langs/?username=gauswamiashih&layout=compact&theme=radical&bg_color=00000000&title_color=63b3ed&text_color=94a3b8&hide_border=true" alt="Top Languages" style={{ height: "160px" }} />
            </div>

            <Terminal />
          </div>
        </div>
      </section>

      {/* SKILLS */}
      <section id="skills" className="grid-bg" style={{ padding: "120px 5%", position: "relative" }}>
        <div style={{ position: "absolute", top: "50%", right: "5%", width: "400px", height: "400px", background: "radial-gradient(circle,rgba(139,92,246,0.05),transparent 70%)", pointerEvents: "none" }} />
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "80px" }}>
            <p className="section-label">Technical Arsenal</p>
            <h2 className="section-title">Skills &amp; <span style={{ background: "linear-gradient(135deg,#8b5cf6,#ec4899)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Expertise</span></h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: "20px" }}>
            {SKILLS.map((s, i) => <SkillBar key={s.cat} skill={s} delay={i * 150} />)}
          </div>
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects" style={{ padding: "120px 5%" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "80px" }}>
            <p className="section-label">Selected Work</p>
            <h2 className="section-title">Project <span style={{ background: "linear-gradient(135deg,#3b82f6,#10b981)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Showcase</span></h2>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "24px" }}>
            {PROJECTS.map((p, i) => (
              <Reveal key={p.title} delay={i * 100}>
                <div style={{ flex: "1 1 400px", maxWidth: "600px" }}>
                  <ProjectCard project={p} />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CERTIFICATIONS */}
      <section id="certs" style={{ padding: "120px 5%" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "80px" }}>
            <p className="section-label">Recognition</p>
            <h2 className="section-title">Achievements &amp; <span style={{ background: "linear-gradient(135deg,#10b981,#3b82f6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Certifications</span></h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: "20px" }}>
            {CERTS.map((c, i) => (
              <Reveal key={c.title} delay={i * 100}>
                <CertCard cert={c} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FUTURISTIC VISUAL BAND */}
      <section style={{ padding: "100px 5%", background: "linear-gradient(180deg,#020408,#050e1a,#020408)", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 50% 50%,rgba(59,130,246,0.06),transparent 70%)" }} />
        <div style={{ maxWidth: "1200px", margin: "0 auto", textAlign: "center", position: "relative", zIndex: 2 }}>
          <p className="section-label">The Vision</p>
          <h2 className="section-title" style={{ marginBottom: "24px" }}>
            Architecting the <span style={{ background: "linear-gradient(135deg,#63b3ed,#8b5cf6,#ec4899)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>2030 Web</span>
          </h2>
          <p style={{ color: "#475569", fontSize: "18px", maxWidth: "600px", margin: "0 auto 64px", lineHeight: 1.7 }}>
            AI-native interfaces. Zero-trust architectures. Autonomous systems. The future isn't coming — it's being built right now.
          </p>
          {/* HUD grid visual */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "20px", maxWidth: "800px", margin: "0 auto" }}>
            {[
              { label: "AI Systems", val: "Neural", icon: "◈", color: "#8b5cf6" },
              { label: "Security", val: "Zero Trust", icon: "◉", color: "#10b981" },
              { label: "Automation", val: "Autonomous", icon: "◆", color: "#f59e0b" },
              { label: "Full Stack", val: "Serverless", icon: "⬡", color: "#3b82f6" },
              { label: "Performance", val: "Edge Native", icon: "◇", color: "#ec4899" },
              { label: "Experience", val: "Immersive", icon: "○", color: "#06b6d4" },
            ].map(item => (
              <div key={item.label} className="glass" style={{ borderRadius: "16px", padding: "28px 20px", textAlign: "center", animation: "float 4s ease-in-out infinite", animationDelay: Math.random() * 2 + "s" }}>
                <div style={{ fontSize: "24px", color: item.color, marginBottom: "12px", filter: `drop-shadow(0 0 10px ${item.color})` }}>{item.icon}</div>
                <div style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, color: "#f1f5f9", fontSize: "14px", marginBottom: "4px" }}>{item.val}</div>
                <div style={{ color: "#475569", fontSize: "11px", letterSpacing: "0.1em", textTransform: "uppercase" }}>{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="grid-bg" style={{ padding: "120px 5%" }}>
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "64px" }}>
            <p className="section-label">Let's Build</p>
            <h2 className="section-title">Get in <span style={{ background: "linear-gradient(135deg,#3b82f6,#8b5cf6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Touch</span></h2>
            <p style={{ color: "#475569", marginTop: "16px", fontSize: "16px" }}>Have an idea, a project, or just want to connect? Let's talk.</p>
          </div>

          {sent ? (
            <div className="glass" style={{ borderRadius: "24px", padding: "64px", textAlign: "center", borderColor: "rgba(16,185,129,0.3)" }}>
              <div style={{ fontSize: "48px", marginBottom: "16px", color: "#10b981" }}>◉</div>
              <h3 style={{ fontFamily: "'Syne',sans-serif", fontSize: "24px", fontWeight: 700, color: "#f1f5f9", marginBottom: "8px" }}>Message Sent</h3>
              <p style={{ color: "#64748b" }}>I'll get back to you within 24 hours.</p>
            </div>
          ) : (
            <form action="https://formsubmit.co/gauswamiashish760@gmail.com" method="POST" className="glass" style={{ borderRadius: "24px", padding: "48px" }}>
              <input type="hidden" name="_next" value={window.location.href} />
              <input type="hidden" name="_captcha" value="false" />
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "16px" }}>
                <input type="text" name="name" className="form-input" placeholder="Your Name" required />
                <input type="email" name="email" className="form-input" placeholder="Your Email" required />
              </div>
              <textarea name="message" className="form-input" placeholder="Your message..." required style={{ marginBottom: "24px", display: "block" }} />
              <button type="submit" style={{ padding: "14px 32px", borderRadius: "50px", fontFamily: "'Space Grotesk',sans-serif", fontWeight: 600, fontSize: "14px", letterSpacing: "0.05em", cursor: "pointer", transition: "all 0.3s ease", border: "none", background: "linear-gradient(135deg,#3b82f6,#8b5cf6)", color: "#fff", boxShadow: "0 0 20px rgba(59,130,246,0.4)" }}
                onMouseEnter={e => { playSound("click"); e.target.style.transform = "translateY(-2px)"; e.target.style.boxShadow = "0 0 40px rgba(59,130,246,0.6)"; }}
                onMouseLeave={e => { e.target.style.transform = "none"; e.target.style.boxShadow = "0 0 20px rgba(59,130,246,0.4)"; }}>
                Send Message ↗
              </button>
            </form>
          )}

          {/* Socials */}
          <div style={{ display: "flex", justifyContent: "center", gap: "24px", marginTop: "48px" }}>
            {[
              { label: "GitHub", icon: "⌥", href: "https://github.com/gauswamiashih" },
              { label: "LinkedIn", icon: "◈", href: "https://www.linkedin.com/in/gauswami-ashish-078870293?utm_source=share_via&utm_content=profile&utm_medium=member_android" },
              { label: "Email", icon: "◉", href: "mailto:gauswamiashish760@gmail.com" },
              { label: "Instagram", icon: "◆", href: "https://www.instagram.com/gauswami_8_07_18?igsh=MXQxMmdqM3A2YXN0ZQ==" },
            ].map(s => (
              <a key={s.label} href={s.href} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "8px", color: "#475569", textDecoration: "none", transition: "all 0.3s", padding: "16px 20px", borderRadius: "12px", border: "1px solid rgba(255,255,255,0.05)" }}
                onMouseEnter={e => { e.currentTarget.style.color = "#63b3ed"; e.currentTarget.style.borderColor = "rgba(99,179,237,0.3)"; e.currentTarget.style.background = "rgba(99,179,237,0.05)"; }}
                onMouseLeave={e => { e.currentTarget.style.color = "#475569"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.05)"; e.currentTarget.style.background = "transparent"; }}>
                <span style={{ fontSize: "20px" }}>{s.icon}</span>
                <span style={{ fontSize: "11px", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase" }}>{s.label}</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ padding: "40px 5%", borderTop: "1px solid rgba(255,255,255,0.05)", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "16px" }}>
        <div style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: "16px", background: "linear-gradient(135deg,#63b3ed,#8b5cf6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Gauswami Ashish</div>
        <div style={{ color: "#94a3b8", fontSize: "13px" }}>
          Designed &amp; Engineered by{" "}
          <span style={{ background: "linear-gradient(135deg,#63b3ed,#8b5cf6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", fontWeight: 600 }}>Ashish Devpuri</span>
          {" "}· {new Date().getFullYear()}
        </div>
        <div style={{ color: "#fbbf24", fontSize: "12px", letterSpacing: "0.1em", fontWeight: 600 }}>B.TECH · COMPUTER ENGINEERING · GANPAT UNIVERSITY</div>
      </footer>
    </div>
  );
}
