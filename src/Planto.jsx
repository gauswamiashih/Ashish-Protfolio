import { useState, useEffect, useRef } from "react";
import "./Planto.css";

// Sample Plant Collections Data
const PRODUCT_PLANTS = [
  {
    id: 1,
    name: "Calathea plant",
    price: 399,
    rating: 5,
    img: "https://images.unsplash.com/photo-1545241047-6083a3684587?w=500&auto=format&fit=crop&q=80",
    desc: "Stunning patterned foliage that folds at night."
  },
  {
    id: 2,
    name: "Desk plant",
    price: 359,
    rating: 4.8,
    img: "https://images.unsplash.com/photo-1512428813833-df44b75a6397?w=500&auto=format&fit=crop&q=80",
    desc: "Compact green companion, perfect for workstation tables."
  },
  {
    id: 3,
    name: "Calathea ai plant",
    price: 299,
    rating: 5,
    img: "https://images.unsplash.com/photo-1596547609652-9cf5d8d76921?w=500&auto=format&fit=crop&q=80",
    desc: "Low maintenance, high oxygen producing indoor plant."
  },
  {
    id: 4,
    name: "Cactus plant",
    price: 319,
    rating: 4.7,
    img: "https://images.unsplash.com/photo-1508500383182-6c9ab4820042?w=500&auto=format&fit=crop&q=80",
    desc: "Hardy desert beauty in a premium terracotta pot."
  },
  {
    id: 5,
    name: "Shore plant",
    price: 799,
    rating: 4.9,
    img: "https://images.unsplash.com/photo-1599599810769-bcde5a160d32?w=500&auto=format&fit=crop&q=80",
    desc: "Sleek dwarf bonsai styled tree, adds ultimate zen."
  },
  {
    id: 6,
    name: "Calathea o2 plant",
    price: 659,
    rating: 5,
    img: "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?w=500&auto=format&fit=crop&q=80",
    desc: "Broad air-purifying leaves, ideal for bedroom corners."
  }
];

const BEST_O2_COLLECTION = [
  {
    id: 1,
    title: "Monstera Deliciosa",
    price: 899,
    img: "https://images.unsplash.com/photo-1614594975525-e45190c55d0b?w=600&auto=format&fit=crop&q=80",
    desc: "The Swiss cheese plant is famous for its iconic leaf fenestrations. It thrives in bright indirect sunlight and elevates the visual tone of any living room setup."
  },
  {
    id: 2,
    title: "Fiddle Leaf Fig",
    price: 1249,
    img: "https://images.unsplash.com/photo-1597055181300-e3633a207518?w=600&auto=format&fit=crop&q=80",
    desc: "Elegant and sculptural tree-like plant with massive violin-shaped leaves. A favorite of modern interior designers looking to establish vertical scale."
  },
  {
    id: 3,
    title: "Premium ZZ Plant",
    price: 679,
    img: "https://images.unsplash.com/photo-1632203171982-cc0df6e9ceb4?w=600&auto=format&fit=crop&q=80",
    desc: "Virtually indestructible indoor plant featuring shiny, deep-green feather-like stems. Excellent for workspaces, bedrooms, and low-light areas."
  },
  {
    id: 4,
    title: "Burgundy Rubber Tree",
    price: 799,
    img: "https://images.unsplash.com/photo-1598880940080-ff9a29891b85?w=600&auto=format&fit=crop&q=80",
    desc: "Features glossy, dark-burgundy leaves that generate thick silhouettes. A fast-growing air-purifier that loves warm spots with filtered sunshine."
  }
];

const REVIEWS = [
  {
    name: "Alina Patel",
    stars: 5,
    role: "Plant Collector",
    img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80",
    comment: "The glassmorphic design of these plants is beautiful! They arrived in healthy condition and are growing extremely fast."
  },
  {
    name: "Alice Madison",
    stars: 5,
    role: "Interior Designer",
    img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&auto=format&fit=crop&q=80",
    comment: "Exceptional quality and premium pots. These air-purifying plants fit perfectly into my minimalist dark-themed design drafts."
  },
  {
    name: "Alex Johnson",
    stars: 5,
    role: "Home Decor Enthusiast",
    img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80",
    comment: "Fast shipping and very detailed care sheets! Planto's customer support guided me on watering frequencies for the Cactus."
  }
];

const MARQUEE_TECH = [
  "React 19 Hooks", "Vite 8 Compiler", "CSS Glassmorphism", "Web Audio API Synths",
  "HTML5 Semantics", "Intersection Observer Reveals", "Canvas Particle Physics",
  "Plus Jakarta Sans", "Playfair Display Serif", "Responsive Layouts",
  "Float Animation Keyframes", "Bespoke UI Design", "Fast Production Build"
];

// Leaf Particle Canvas Component
function PlantoParticles() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    
    let w = (canvas.width = canvas.parentElement.offsetWidth);
    let h = (canvas.height = canvas.parentElement.offsetHeight);

    const particles = Array.from({ length: 28 }, () => ({
      x: Math.random() * w,
      y: Math.random() * h + h, // Start below or randomly in screen
      vx: (Math.random() - 0.5) * 0.35,
      vy: -(Math.random() * 0.6 + 0.25),
      r: Math.random() * 2.5 + 1.2,
      alpha: Math.random() * 0.25 + 0.1,
      wobble: Math.random() * Math.PI,
      wobbleSpeed: Math.random() * 0.02 + 0.008,
      rotation: Math.random() * Math.PI * 2,
      rotSpeed: (Math.random() - 0.5) * 0.015
    }));

    let raf;
    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      
      particles.forEach((p) => {
        p.y += p.vy;
        p.x += p.vx + Math.sin(p.wobble) * 0.22;
        p.wobble += p.wobbleSpeed;
        p.rotation += p.rotSpeed;

        // Reset if goes off top
        if (p.y < -30) {
          p.y = h + 30;
          p.x = Math.random() * w;
        }
        if (p.x < -30) p.x = w + 30;
        if (p.x > w + 30) p.x = -30;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);
        ctx.beginPath();
        // Leaf design
        ctx.moveTo(0, -p.r * 2.2);
        ctx.quadraticCurveTo(p.r * 1.2, 0, 0, p.r * 2.2);
        ctx.quadraticCurveTo(-p.r * 1.2, 0, 0, -p.r * 2.2);
        ctx.fillStyle = `rgba(171, 214, 103, ${p.alpha})`;
        ctx.fill();
        ctx.restore();
      });

      raf = requestAnimationFrame(draw);
    };

    draw();

    const resize = () => {
      if (!canvas || !canvas.parentElement) return;
      w = canvas.width = canvas.parentElement.offsetWidth;
      h = canvas.height = canvas.parentElement.offsetHeight;
    };
    window.addEventListener("resize", resize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="planto-particle-canvas" />;
}

export default function Planto({ onViewChange }) {
  const [cart, setCart] = useState([]);
  const [toast, setToast] = useState(null);
  const [activeMenu, setActiveMenu] = useState("Home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [o2Index, setO2Index] = useState(0);
  const [cursor, setCursor] = useState({ x: -100, y: -100 });

  // Custom Audio Context Synthesizer Cues
  const playClick = () => {
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.type = "sine";
      osc.frequency.setValueAtTime(650, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(120, ctx.currentTime + 0.1);
      gain.gain.setValueAtTime(0.04, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1);
      osc.start();
      osc.stop(ctx.currentTime + 0.1);
    } catch (e) {
      // Audio block
    }
  };

  const playSwoosh = () => {
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.type = "triangle";
      osc.frequency.setValueAtTime(200, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(800, ctx.currentTime + 0.25);
      gain.gain.setValueAtTime(0.02, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.25);
      osc.start();
      osc.stop(ctx.currentTime + 0.25);
    } catch (e) {
      // Audio block
    }
  };

  const handleAddToCart = (plantName, price) => {
    playSwoosh();
    setCart((prev) => [...prev, { name: plantName, price }]);
    setToast(`Added "${plantName}" to your bag!`);
  };

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  const nextO2 = () => {
    playClick();
    setO2Index((prev) => (prev + 1) % BEST_O2_COLLECTION.length);
  };

  const prevO2 = () => {
    playClick();
    setO2Index((prev) => (prev - 1 + BEST_O2_COLLECTION.length) % BEST_O2_COLLECTION.length);
  };

  // Cursor position listener
  useEffect(() => {
    const handleMove = (e) => {
      setCursor({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  // Scroll Reveal Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.08 }
    );

    const elements = document.querySelectorAll(".planto-reveal");
    elements.forEach((el) => observer.observe(el));

    return () => {
      elements.forEach((el) => observer.unobserve(el));
      observer.disconnect();
    };
  }, []);

  return (
    <div className="planto-theme" style={{ position: "relative" }}>
      {/* Dynamic Cursor Glow */}
      <div className="planto-cursor-glow" style={{ left: cursor.x, top: cursor.y }} />

      {/* Floating particles background (Canvas) */}
      <PlantoParticles />

      {/* Background spotlights */}
      <div className="planto-glow-spot planto-glow-1" />
      <div className="planto-glow-spot planto-glow-2" />
      <div className="planto-glow-spot planto-glow-3" />

      {/* Floating Exit/Return Header */}
      <div className="planto-back-bar">
        <button 
          onClick={() => { playClick(); onViewChange("portfolio"); }}
          className="planto-back-btn"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <line x1="19" y1="12" x2="5" y2="12" />
            <polyline points="12 19 5 12 12 5" />
          </svg>
          Back to Portfolio
        </button>
        <span style={{ color: "rgba(255,255,255,0.25)", fontSize: "12px" }}>|</span>
        <span style={{ color: "var(--planto-text-dim)", fontSize: "11px", fontWeight: 600 }}>Planto. Storefront UI</span>
      </div>

      {/* HEADER / NAVIGATION */}
      <header style={{ 
        position: "sticky", 
        top: 0, 
        zIndex: 50, 
        backdropFilter: "blur(20px)",
        background: "rgba(7, 14, 10, 0.75)",
        borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
        padding: "24px 8%" 
      }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          
          {/* Logo */}
          <div style={{ display: "flex", alignItems: "center", gap: "10px", cursor: "pointer" }} onClick={playClick}>
            <div style={{ 
              background: "rgba(171, 214, 103, 0.15)", 
              width: "36px", 
              height: "36px", 
              borderRadius: "10px", 
              display: "flex", 
              alignItems: "center", 
              justifyContent: "center",
              border: "1px solid var(--planto-accent)"
            }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--planto-accent)" strokeWidth="2">
                <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm0 18c-4.4 0-8-3.6-8-8s3.6-8 8-8 8 3.6 8 8-3.6 8-8 8z"/>
                <path d="M12 6c-3.3 0-6 2.7-6 6s2.7 6 6 6 6-2.7 6-6-2.7-6-6-6zm0 10c-2.2 0-4-1.8-4-4s1.8-4 4-4 4 1.8 4 4-1.8 4-4 4z"/>
              </svg>
            </div>
            <span style={{ fontSize: "22px", fontWeight: 800, letterSpacing: "-0.02em", color: "#fff", display: "flex", alignItems: "center" }}>
              Planto<span style={{ color: "var(--planto-accent)" }}>.</span>
            </span>
          </div>

          {/* Desktop Nav Links */}
          <div className="planto-desktop-nav" style={{ display: "flex", gap: "36px" }}>
            {["Home", "Plant Types", "More", "Contact"].map((item) => (
              <a 
                key={item} 
                className={`planto-nav-item ${activeMenu === item ? "active" : ""}`}
                onClick={() => { playClick(); setActiveMenu(item); }}
              >
                {item}
              </a>
            ))}
          </div>

          {/* Utilities & Icons */}
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <button className="planto-btn-icon" onClick={playClick}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </button>
            
            <button className="planto-btn-icon" style={{ position: "relative" }} onClick={playClick}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="M16 10a4 4 0 0 1-8 0" />
              </svg>
              {cart.length > 0 && (
                <span style={{ 
                  position: "absolute", 
                  top: "-4px", 
                  right: "-4px", 
                  background: "var(--planto-accent)", 
                  color: "#070e0a", 
                  fontSize: "10px", 
                  fontWeight: 800, 
                  width: "18px", 
                  height: "18px", 
                  borderRadius: "50%", 
                  display: "flex", 
                  alignItems: "center", 
                  justifyContent: "center",
                  boxShadow: "0 0 8px rgba(171, 214, 103, 0.5)"
                }}>
                  {cart.length}
                </span>
              )}
            </button>

            {/* Mobile menu toggle */}
            <button 
              className="planto-btn-icon planto-mobile-menu-btn" 
              style={{ display: "none" }} 
              onClick={() => { playClick(); setMobileMenuOpen(!mobileMenuOpen); }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu dropdown */}
        {mobileMenuOpen && (
          <div style={{ 
            background: "var(--planto-bg-darker)", 
            borderTop: "1px solid rgba(255,255,255,0.05)", 
            padding: "20px 8%", 
            display: "flex", 
            flexDirection: "column", 
            gap: "16px",
            marginTop: "16px",
            borderRadius: "16px"
          }}>
            {["Home", "Plant Types", "More", "Contact"].map((item) => (
              <a 
                key={item} 
                className={`planto-nav-item ${activeMenu === item ? "active" : ""}`}
                style={{ fontSize: "16px", padding: "8px 0" }}
                onClick={() => { playClick(); setActiveMenu(item); setMobileMenuOpen(false); }}
              >
                {item}
              </a>
            ))}
          </div>
        )}
      </header>

      {/* HERO SECTION */}
      <section style={{ padding: "80px 8% 80px", position: "relative", zIndex: 2 }}>
        <div className="planto-hero-layout" style={{ maxWidth: "1280px", margin: "0 auto", display: "grid", gridTemplateColumns: "1.2fr 0.8fr", gap: "60px", alignItems: "center" }}>
          
          {/* Hero Left Content */}
          <div className="planto-reveal">
            <span style={{ 
              color: "var(--planto-accent)", 
              fontSize: "12px", 
              fontWeight: 700, 
              letterSpacing: "0.2em", 
              textTransform: "uppercase",
              display: "block",
              marginBottom: "16px"
            }}>
              Bring Nature Indoors
            </span>
            <h1 className="planto-title-serif" style={{ 
              fontSize: "clamp(48px, 6.5vw, 92px)", 
              fontWeight: 700, 
              lineHeight: 1.05, 
              color: "#fff",
              margin: "0 0 24px"
            }}>
              Breath Natural
            </h1>
            <p style={{ 
              color: "var(--planto-text-dim)", 
              fontSize: "16px", 
              lineHeight: 1.8, 
              maxWidth: "520px",
              marginBottom: "40px"
            }}>
              Transform your workspace and living spaces with our premium selection of organic, highly filtering houseplants designed to increase wellness, clean oxygen, and bring premium aesthetics.
            </p>

            <div style={{ display: "flex", alignItems: "center", gap: "20px", flexWrap: "wrap" }}>
              <button 
                onClick={() => {
                  playClick();
                  document.getElementById("catalog")?.scrollIntoView({ behavior: "smooth" });
                }} 
                className="planto-btn planto-btn-primary"
              >
                Explore Collection
              </button>
              
              <button 
                onClick={() => {
                  playClick();
                  setToast("Launching live demo workspace presentation...");
                }} 
                className="planto-btn planto-btn-secondary" 
                style={{ display: "flex", alignItems: "center", gap: "10px" }}
              >
                <div style={{ 
                  width: "28px", 
                  height: "28px", 
                  borderRadius: "50%", 
                  background: "rgba(255, 255, 255, 0.1)", 
                  display: "flex", 
                  alignItems: "center", 
                  justifyContent: "center",
                  color: "var(--planto-accent)"
                }}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                    <polygon points="5 3 19 12 5 21" />
                  </svg>
                </div>
                Live Demo...
              </button>
            </div>

            {/* Bottom-left plant layout and rating badge */}
            <div style={{ display: "grid", gridTemplateColumns: "1.1fr 0.9fr", gap: "24px", marginTop: "80px", alignItems: "flex-end" }}>
              
              {/* Alina Patel Floating Glass Badge */}
              <div className="planto-glass planto-hover-scale" style={{ padding: "20px", borderRadius: "20px", borderLeft: "4px solid var(--planto-accent)" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "8px" }}>
                  <img 
                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80" 
                    alt="Alina Patel" 
                    style={{ width: "36px", height: "36px", borderRadius: "50%", border: "1.5px solid var(--planto-accent)" }}
                  />
                  <div>
                    <h5 style={{ fontWeight: 700, fontSize: "14px", color: "#fff", margin: 0 }}>Alina Patel</h5>
                    <div style={{ display: "flex", gap: "2px", marginTop: "2px" }}>
                      {[1, 2, 3, 4, 5].map((s) => (
                        <span key={s} className="planto-rating-star" style={{ fontSize: "10px" }}>★</span>
                      ))}
                    </div>
                  </div>
                </div>
                <p style={{ color: "var(--planto-text-dim)", fontSize: "11px", lineHeight: 1.5, margin: 0 }}>
                  "Highly recommend Planto! The glassmorphism design looks amazing, and the plants purify my home perfectly."
                </p>
              </div>

              {/* Central Round Plant Card with Overlay Title */}
              <div style={{ position: "relative" }}>
                <div style={{ 
                  position: "absolute", 
                  inset: 0, 
                  background: "radial-gradient(circle at center, rgba(171, 214, 103, 0.15) 0%, transparent 60%)",
                  pointerEvents: "none" 
                }} />
                <img 
                  src="https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?w=800&auto=format&fit=crop&q=80" 
                  alt="Our Trendy Plants" 
                  className="planto-animate-float-slow"
                  style={{ width: "160px", height: "160px", objectFit: "cover", borderRadius: "50%", border: "2px solid rgba(255,255,255,0.08)", boxShadow: "0 15px 35px rgba(0,0,0,0.3)" }}
                />
                <div className="planto-hero-overlay-title" style={{ position: "absolute", bottom: "-10px", left: "-20px" }}>
                  Trendy
                </div>
              </div>
            </div>
          </div>

          {/* Hero Right Content */}
          <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
            
            {/* Top Right Card: Trendy House Plant (Calathea) */}
            <div className="planto-glass planto-animate-float planto-reveal planto-delay-200" style={{ borderRadius: "28px", padding: "28px", position: "relative" }}>
              <div style={{ width: "100%", height: "200px", borderRadius: "18px", overflow: "hidden", marginBottom: "20px" }}>
                <img 
                  src="https://images.unsplash.com/photo-1545241047-6083a3684587?w=600&auto=format&fit=crop&q=80" 
                  alt="Calathea plant" 
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </div>
              <span style={{ color: "var(--planto-accent)", fontSize: "11px", fontWeight: 700, textTransform: "uppercase" }}>Trendy House Plant</span>
              <h3 className="planto-title-serif" style={{ fontSize: "22px", margin: "4px 0 16px", color: "#fff" }}>Calathea plant</h3>
              
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <button 
                  onClick={() => handleAddToCart("Calathea plant", 499)}
                  className="planto-btn planto-btn-primary" 
                  style={{ padding: "10px 24px", borderRadius: "12px" }}
                >
                  Buy Now
                </button>
                <div style={{ display: "flex", gap: "4px" }}>
                  <div className="planto-dot active" />
                  <div className="planto-dot" />
                  <div className="planto-dot" />
                </div>
              </div>
            </div>

            {/* Bottom Right Card: For Small Desk Ai Plant */}
            <div className="planto-glass planto-reveal planto-delay-300 planto-hover-scale" style={{ borderRadius: "24px", padding: "24px" }}>
              <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
                <img 
                  src="https://images.unsplash.com/photo-1502082553048-f009c37129b9?w=600&auto=format&fit=crop&q=80" 
                  alt="Small Desk Plant" 
                  style={{ width: "90px", height: "90px", objectFit: "cover", borderRadius: "16px" }}
                />
                <div style={{ flex: 1 }}>
                  <h4 style={{ fontWeight: 700, fontSize: "16px", color: "#fff", margin: "0 0 4px" }}>For Small Desk Ai Plant</h4>
                  <p style={{ color: "var(--planto-text-dim)", fontSize: "12px", margin: "0 0 12px" }}>Ideal companion for desks.</p>
                  
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ color: "var(--planto-accent)", fontWeight: 700, fontSize: "16px" }}>Rs. 599/-</span>
                    <div style={{ display: "flex", gap: "8px" }}>
                      <button 
                        onClick={() => handleAddToCart("Small Desk Ai Plant", 599)}
                        className="planto-btn planto-btn-primary" 
                        style={{ padding: "6px 14px", borderRadius: "8px", fontSize: "11px" }}
                      >
                        Buy Now
                      </button>
                      <button 
                        onClick={() => handleAddToCart("Small Desk Ai Plant", 599)}
                        className="planto-btn-icon" 
                        style={{ width: "30px", height: "30px" }}
                      >
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* INFINITE TECHNOLOGY SCROLLING MARQUEE */}
      <section className="planto-marquee-container planto-reveal">
        <div style={{ display: "flex", justifyContent: "center", marginBottom: "14px" }}>
          <span style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--planto-accent)" }}>
            Engineered Core Technologies
          </span>
        </div>
        <div className="planto-marquee-track">
          {[...MARQUEE_TECH, ...MARQUEE_TECH, ...MARQUEE_TECH].map((tech, idx) => (
            <div key={idx} className="planto-marquee-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--planto-accent)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              {tech}
            </div>
          ))}
        </div>
      </section>

      {/* PRODUCTS / CATALOG SECTION */}
      <section id="catalog" style={{ padding: "100px 8%", background: "var(--planto-bg-darker)", position: "relative", zIndex: 2 }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
          
          <div className="planto-reveal" style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "64px", flexWrap: "wrap", gap: "20px" }}>
            <div>
              <span style={{ color: "var(--planto-accent)", fontSize: "12px", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase" }}>Our Catalog</span>
              <h2 className="planto-title-serif" style={{ fontSize: "clamp(32px, 4.5vw, 48px)", fontWeight: 700, margin: "8px 0 0", color: "#fff" }}>
                Our Trendy Plants
              </h2>
            </div>
            <div style={{ display: "flex", gap: "10px" }}>
              <span style={{ 
                border: "1px solid var(--planto-accent)", 
                color: "var(--planto-accent)", 
                padding: "8px 18px", 
                borderRadius: "50px", 
                fontSize: "13px", 
                fontWeight: 600,
                background: "rgba(171, 214, 103, 0.05)"
              }}>
                All Categories
              </span>
              <span style={{ border: "1px solid rgba(255,255,255,0.08)", color: "var(--planto-text-dim)", padding: "8px 18px", borderRadius: "50px", fontSize: "13px", fontWeight: 600, cursor: "pointer" }}>Indoor</span>
              <span style={{ border: "1px solid rgba(255,255,255,0.08)", color: "var(--planto-text-dim)", padding: "8px 18px", borderRadius: "50px", fontSize: "13px", fontWeight: 600, cursor: "pointer" }}>Outdoor</span>
            </div>
          </div>

          {/* Plant items grid */}
          <div className="planto-grid-wrapper">
            {PRODUCT_PLANTS.map((plant, i) => (
              <div 
                key={plant.id} 
                className={`planto-glass planto-product-card planto-reveal planto-delay-${(i % 3) * 100}`}
              >
                
                {/* Image */}
                <div className="planto-product-img-wrapper">
                  <img 
                    src={plant.img} 
                    alt={plant.name} 
                    className="planto-product-img"
                  />
                  
                  {/* Floating cart icon in corner */}
                  <button 
                    onClick={() => handleAddToCart(plant.name, plant.price)}
                    className="planto-btn-icon" 
                    style={{ 
                      position: "absolute", 
                      bottom: "12px", 
                      right: "12px", 
                      background: "rgba(7, 14, 10, 0.8)", 
                      borderColor: "rgba(255, 255, 255, 0.15)" 
                    }}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                    </svg>
                  </button>
                </div>

                {/* Info */}
                <h4 style={{ fontWeight: 700, fontSize: "18px", color: "#fff", margin: "0 0 6px" }}>{plant.name}</h4>
                <p style={{ color: "var(--planto-text-dim)", fontSize: "12px", margin: "0 0 16px", lineHeight: 1.5, flex: 1 }}>{plant.desc}</p>
                
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "auto" }}>
                  <span style={{ fontSize: "18px", fontWeight: 800, color: "var(--planto-accent)" }}>Rs. {plant.price}/-</span>
                  
                  {/* Rating */}
                  <div style={{ display: "flex", gap: "2px", alignItems: "center" }}>
                    <span className="planto-rating-star" style={{ fontSize: "12px" }}>★</span>
                    <span style={{ fontSize: "12px", color: "var(--planto-text)", fontWeight: 600 }}>{plant.rating}</span>
                  </div>
                </div>

              </div>
            ))}
          </div>

        </div>
      </section>

      {/* CUSTOMER REVIEWS SECTION */}
      <section style={{ padding: "100px 8%", position: "relative", zIndex: 2 }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
          
          {/* Heading block with border styling like Figma */}
          <div className="planto-reveal" style={{ display: "flex", justifyContent: "center", marginBottom: "64px" }}>
            <div style={{ 
              border: "1.5px dashed var(--planto-border-active)", 
              padding: "12px 32px", 
              borderRadius: "100px", 
              display: "inline-flex", 
              alignItems: "center", 
              gap: "12px",
              boxShadow: "0 0 15px rgba(171, 214, 103, 0.04)"
            }}>
              <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "var(--planto-accent)" }} />
              <h2 className="planto-title-serif" style={{ fontSize: "20px", color: "#fff", margin: 0, letterSpacing: "0.05em", textTransform: "uppercase", fontWeight: 700 }}>
                Customer Review
              </h2>
              <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "var(--planto-accent)" }} />
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "24px" }}>
            {REVIEWS.map((review, i) => (
              <div 
                key={i} 
                className={`planto-glass planto-reveal planto-delay-${i * 100} planto-hover-scale`} 
                style={{ padding: "28px", borderRadius: "24px", display: "flex", flexDirection: "column" }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "20px" }}>
                  <img 
                    src={review.img} 
                    alt={review.name} 
                    style={{ width: "48px", height: "48px", borderRadius: "50%", border: "2px solid var(--planto-accent)" }}
                  />
                  <div>
                    <h4 style={{ fontWeight: 700, fontSize: "16px", color: "#fff", margin: "0 0 2px" }}>{review.name}</h4>
                    <span style={{ color: "var(--planto-text-dim)", fontSize: "11px" }}>{review.role}</span>
                  </div>
                  
                  {/* Stars in right top */}
                  <div style={{ marginLeft: "auto", display: "flex", gap: "2px" }}>
                    {[1, 2, 3, 4, 5].map((s) => (
                      <span key={s} className="planto-rating-star" style={{ fontSize: "12px" }}>★</span>
                    ))}
                  </div>
                </div>

                <p style={{ color: "var(--planto-text-dim)", fontSize: "13px", lineHeight: 1.7, margin: 0, fontStyle: "italic" }}>
                  "{review.comment}"
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* OUR BEST O2 SECTION */}
      <section style={{ padding: "100px 8% 140px", background: "var(--planto-bg-darker)", position: "relative", zIndex: 2 }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
          
          {/* Header */}
          <div className="planto-reveal" style={{ display: "flex", justifyContent: "center", marginBottom: "80px" }}>
            <div style={{ 
              border: "1.5px dashed var(--planto-border-active)", 
              padding: "12px 32px", 
              borderRadius: "100px", 
              display: "inline-flex", 
              alignItems: "center", 
              gap: "12px"
            }}>
              <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "var(--planto-accent)" }} />
              <h2 className="planto-title-serif" style={{ fontSize: "20px", color: "#fff", margin: 0, letterSpacing: "0.05em", textTransform: "uppercase", fontWeight: 700 }}>
                Our Best o2
              </h2>
              <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "var(--planto-accent)" }} />
            </div>
          </div>

          {/* Content Widget Slider */}
          <div style={{ display: "grid", gridTemplateColumns: "0.9fr 1.1fr", gap: "64px", alignItems: "center" }} className="planto-hero-layout">
            
            {/* Left: Interactive Spotlight Plant on stand */}
            <div className="planto-reveal" style={{ position: "relative", display: "flex", justifyContent: "center" }}>
              <div style={{ 
                position: "absolute", 
                width: "100%", 
                height: "100%", 
                background: "radial-gradient(circle, rgba(171,214,103,0.12) 0%, transparent 60%)",
                pointerEvents: "none" 
              }} />
              
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <img 
                  src={BEST_O2_COLLECTION[o2Index].img} 
                  alt={BEST_O2_COLLECTION[o2Index].title} 
                  className="planto-animate-float"
                  style={{ 
                    width: "280px", 
                    height: "300px", 
                    objectFit: "cover", 
                    borderRadius: "24px", 
                    boxShadow: "0 25px 50px rgba(0,0,0,0.5)",
                    border: "2px solid rgba(255,255,255,0.06)",
                    transition: "all 0.5s ease"
                  }}
                />
                
                {/* Wooden plant stand representation */}
                <div style={{ 
                  width: "160px", 
                  height: "20px", 
                  background: "linear-gradient(90deg, #3d2b1f, #5c4033, #3d2b1f)", 
                  borderRadius: "6px",
                  marginTop: "-10px",
                  boxShadow: "0 10px 20px rgba(0,0,0,0.4)" 
                }} />
                <div style={{ display: "flex", gap: "80px", marginTop: "0" }}>
                  <div style={{ width: "8px", height: "40px", background: "#3d2b1f", transform: "skewX(-10deg)" }} />
                  <div style={{ width: "8px", height: "40px", background: "#3d2b1f", transform: "skewX(10deg)" }} />
                </div>
              </div>
            </div>

            {/* Right: Text Information + Slider control controls */}
            <div className="planto-reveal planto-delay-200">
              <span style={{ color: "var(--planto-accent)", fontSize: "12px", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase" }}>
                Spotlight Collection
              </span>
              <h3 className="planto-title-serif" style={{ fontSize: "clamp(28px, 4vw, 40px)", color: "#fff", margin: "12px 0 24px", lineHeight: 1.2 }}>
                We Have Small And Best O2 Plants Collections
              </h3>
              
              <h4 style={{ color: "var(--planto-accent)", fontSize: "20px", fontWeight: 700, margin: "0 0 12px" }}>
                {BEST_O2_COLLECTION[o2Index].title}
              </h4>
              <p style={{ color: "var(--planto-text-dim)", fontSize: "15px", lineHeight: 1.8, marginBottom: "40px", minHeight: "100px", transition: "all 0.5s ease" }}>
                {BEST_O2_COLLECTION[o2Index].desc}
              </p>

              {/* Slider footer controls */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: "32px" }}>
                <button 
                  onClick={() => handleAddToCart(BEST_O2_COLLECTION[o2Index].title, BEST_O2_COLLECTION[o2Index].price)}
                  className="planto-btn planto-btn-primary"
                >
                  Explore Spotlight (Rs. {BEST_O2_COLLECTION[o2Index].price})
                </button>

                <div style={{ display: "flex", alignItems: "center", gap: "24px" }}>
                  <span style={{ color: "var(--planto-text-dim)", fontSize: "14px", fontWeight: 700, fontFamily: "monospace" }}>
                    0{o2Index + 1} / 0{BEST_O2_COLLECTION.length}
                  </span>
                  
                  <div style={{ display: "flex", gap: "10px" }}>
                    <button className="planto-btn-icon" style={{ width: "36px", height: "36px" }} onClick={prevO2}>
                      ‹
                    </button>
                    <button className="planto-btn-icon" style={{ width: "36px", height: "36px" }} onClick={nextO2}>
                      ›
                    </button>
                  </div>
                </div>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ 
        borderTop: "1px solid rgba(255, 255, 255, 0.05)", 
        padding: "60px 8% 40px", 
        background: "var(--planto-bg-darker)",
        position: "relative",
        zIndex: 2
      }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "24px" }}>
          <div>
            <div style={{ fontSize: "20px", fontWeight: 800, color: "#fff", marginBottom: "8px" }}>
              Planto<span style={{ color: "var(--planto-accent)" }}>.</span>
            </div>
            <p style={{ color: "var(--planto-text-dim)", fontSize: "12px", maxWidth: "250px", lineHeight: 1.6 }}>
              Premium houseplants engineered to bring clean air, focus, and modern design.
            </p>
          </div>

          <div style={{ display: "flex", gap: "60px", flexWrap: "wrap" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              <span style={{ color: "#fff", fontSize: "13px", fontWeight: 700, textTransform: "uppercase" }}>Links</span>
              <a href="#" className="planto-nav-item" style={{ fontSize: "13px" }} onClick={playClick}>Home</a>
              <a href="#" className="planto-nav-item" style={{ fontSize: "13px" }} onClick={playClick}>Catalog</a>
              <a href="#" className="planto-nav-item" style={{ fontSize: "13px" }} onClick={playClick}>Reviews</a>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              <span style={{ color: "#fff", fontSize: "13px", fontWeight: 700, textTransform: "uppercase" }}>Office</span>
              <span style={{ color: "var(--planto-text-dim)", fontSize: "13px" }}>Palanpur High Market Road</span>
              <span style={{ color: "var(--planto-text-dim)", fontSize: "13px" }}>Gujarat, India</span>
            </div>
          </div>
        </div>

        <div style={{ maxWidth: "1280px", margin: "40px auto 0", borderTop: "1px solid rgba(255,255,255,0.03)", paddingTop: "20px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px" }}>
          <span style={{ color: "var(--planto-text-dim)", fontSize: "12px" }}>
            © {new Date().getFullYear()} Planto. All rights reserved.
          </span>
          <span style={{ color: "var(--planto-accent)", fontSize: "12px", fontWeight: 600 }}>
            Mockup Designed &amp; Coded by Gauswami Ashish Devpuri
          </span>
        </div>
      </footer>

      {/* Interactive Toast Notifications */}
      {toast && (
        <div style={{ 
          position: "fixed", 
          bottom: "32px", 
          right: "32px", 
          background: "rgba(18, 38, 25, 0.95)", 
          border: "1px solid var(--planto-accent)", 
          padding: "16px 24px", 
          borderRadius: "16px", 
          color: "#fff", 
          fontSize: "14px", 
          fontWeight: 600,
          zIndex: 9999,
          boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
          display: "flex",
          alignItems: "center",
          gap: "12px",
          animation: "slideIn 0.3s cubic-bezier(0.16, 1, 0.3, 1)"
        }}>
          <div style={{ 
            width: "8px", 
            height: "8px", 
            borderRadius: "50%", 
            background: "var(--planto-accent)",
            boxShadow: "0 0 10px var(--planto-accent)"
          }} />
          {toast}
        </div>
      )}
    </div>
  );
}
