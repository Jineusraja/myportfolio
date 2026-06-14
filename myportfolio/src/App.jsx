import { useState, useEffect, useRef } from "react";

const DATA = {
  name: "Jineus Raja",
  title: "Full Stack Developer",
  tagline: "Building scalable systems at the intersection of performance & design.",
  location: "Bengaluru, Karnataka, India",
  email: "jineus2001raja@gmail.com",
  phone: "+91 9122104128",
  linkedin: "linkedin.com/in/jineusraja",
  github: "github.com/Jineusraja",
  portfolio: "jineusraja.github.io/Portfoliyo-JineusRAJA",
  skills: {
    "Languages": ["JavaScript", "TypeScript", "Python", "Java", "C++", "SQL"],
    "Frontend": ["React.js", "HTML5", "CSS3", "Bootstrap", "Tailwind CSS", "Redux", "Context API"],
    "Backend": ["Node.js", "Express.js", "REST APIs", "JWT Auth", "WebSockets"],
    "Databases": ["MongoDB", "MySQL", "PostgreSQL"],
    "Tools": ["Git", "GitHub", "Docker", "Postman", "Firebase", "VS Code", "Socket.IO"],
    "Concepts": ["DSA", "OOP", "SDLC", "MVC", "Microservices", "Agile"],
  },
  experience: [
    {
      company: "ABC Technology", role: "Software Developer",
      period: "Mar 2026 – Present", location: "Bengaluru, India",
      color: "#00D4FF",
      points: [
        "Developing and enhancing Learning Management System modules and resolving production issues.",
        "Building scalable backend services and REST APIs for enterprise applications.",
        "Integrated real-time code execution and discussion systems to improve learning experiences.",
        "Performed debugging, API testing, and feature optimization using Postman and Git.",
      ],
    },
    {
      company: "Codersz (Zent Corporation)", role: "Software Developer (Freelancer)",
      period: "Jan 2026 – Mar 2026", location: "Bengaluru, India",
      color: "#A855F7",
      points: [
        "Developed AI-enabled LMS modules and online examination systems.",
        "Built coding practice functionality with real-time compiler integration.",
        "Designed scalable backend APIs and improved application performance.",
        "Collaborated with teams in Agile development environments.",
      ],
    },
    {
      company: "Navikshaa Technologies LLP", role: "Full Stack Developer",
      period: "Feb 2025 – Nov 2025", location: "Bengaluru, India",
      color: "#10B981",
      points: [
        "Developed the official company website using the MERN Stack.",
        "Built a cloud-based ERP system for employee, payroll, and attendance management.",
        "Integrated real-time chat functionality using WebSocket technology.",
        "Developed secure REST APIs and role-based access control mechanisms.",
      ],
    },
  ],
  projects: [
    { title: "AI Integrated LMS", subtitle: "Online Examination Platform", stack: ["MERN Stack","AI","WebSockets"], year: "2026", description: "Scalable LMS with AI-enabled assistance, online examinations, coding practice modules, analytics dashboards, role-based auth, and real-time code execution.", color: "#00D4FF" },
    { title: "ERP Software", subtitle: "with Real-Time Chat", stack: ["MERN Stack","JWT","WebSockets"], year: "2025", description: "Cloud-based ERP system for HR, payroll, and attendance management with JWT authentication, RBAC, and WebSocket-based real-time communication.", color: "#A855F7" },
    { title: "LeadMaster CRM", subtitle: "Lead Management System", stack: ["Laravel","PHP","MySQL"], year: "2025", description: "CRM system for lead management and reporting with multi-team data management features.", color: "#10B981" },
    { title: "Doctor Patient Portal", subtitle: "Healthcare Management", stack: ["JSP","Servlet","MySQL"], year: "2024", description: "Healthcare management system for doctor-patient interaction, appointment booking, and medical record maintenance.", color: "#F59E0B" },
  ],
  certifications: ["NoSQL Databases – Coursera","Software Testing – NPTEL","Angular, Spring MVC & TypeScript – Infosys","Google Cloud Security Challenges","Certificate of Appreciation – Devtown"],
  education: { degree: "Bachelor of Engineering in Computer Science", institution: "Chandigarh University", location: "Mohali, Punjab", period: "2020 – 2024" },
};

// ── PARTICLE CANVAS ──────────────────────────────────────────────────────────
function ParticleField() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let w = canvas.width = window.innerWidth;
    let h = canvas.height = window.innerHeight;
    let mouseX = w / 2, mouseY = h / 2;
    const particles = Array.from({ length: 80 }, () => ({
      x: Math.random() * w, y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.4, vy: (Math.random() - 0.5) * 0.4,
      r: Math.random() * 1.5 + 0.3,
      color: ["#00D4FF","#A855F7","#10B981"][Math.floor(Math.random()*3)],
      alpha: Math.random() * 0.5 + 0.1,
    }));
    const onMouse = e => { mouseX = e.clientX; mouseY = e.clientY; };
    const onResize = () => { w = canvas.width = window.innerWidth; h = canvas.height = window.innerHeight; };
    window.addEventListener("mousemove", onMouse);
    window.addEventListener("resize", onResize);
    let raf;
    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      particles.forEach(p => {
        const dx = mouseX - p.x, dy = mouseY - p.y;
        const dist = Math.sqrt(dx*dx + dy*dy);
        if (dist < 120) { p.vx += dx/dist*0.015; p.vy += dy/dist*0.015; }
        p.vx *= 0.98; p.vy *= 0.98;
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0) p.x = w; if (p.x > w) p.x = 0;
        if (p.y < 0) p.y = h; if (p.y > h) p.y = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI*2);
        ctx.fillStyle = p.color + Math.round(p.alpha*255).toString(16).padStart(2,"0");
        ctx.fill();
      });
      // draw connecting lines
      for (let i = 0; i < particles.length; i++) {
        for (let j = i+1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const d = Math.sqrt(dx*dx+dy*dy);
          if (d < 100) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(0,212,255,${0.08*(1-d/100)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(raf); window.removeEventListener("mousemove", onMouse); window.removeEventListener("resize", onResize); };
  }, []);
  return <canvas ref={canvasRef} style={{ position:"fixed", top:0, left:0, zIndex:0, pointerEvents:"none", opacity:0.6 }} />;
}

// ── MAGNETIC CURSOR ──────────────────────────────────────────────────────────
function MagneticCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const pos = useRef({ x:0, y:0 });
  const ring = useRef({ x:0, y:0 });
  useEffect(() => {
    const move = e => { pos.current = { x: e.clientX, y: e.clientY }; };
    window.addEventListener("mousemove", move);
    let raf;
    const animate = () => {
      ring.current.x += (pos.current.x - ring.current.x) * 0.12;
      ring.current.y += (pos.current.y - ring.current.y) * 0.12;
      if (dotRef.current) { dotRef.current.style.transform = `translate(${pos.current.x-4}px,${pos.current.y-4}px)`; }
      if (ringRef.current) { ringRef.current.style.transform = `translate(${ring.current.x-16}px,${ring.current.y-16}px)`; }
      raf = requestAnimationFrame(animate);
    };
    animate();
    return () => { window.removeEventListener("mousemove", move); cancelAnimationFrame(raf); };
  }, []);
  return (
    <>
      <div ref={dotRef} style={{ position:"fixed", top:0, left:0, width:8, height:8, borderRadius:"50%", background:"#00D4FF", zIndex:9999, pointerEvents:"none", mixBlendMode:"screen" }} />
      <div ref={ringRef} style={{ position:"fixed", top:0, left:0, width:32, height:32, borderRadius:"50%", border:"1.5px solid #00D4FF66", zIndex:9998, pointerEvents:"none", transition:"border-color 0.2s" }} />
    </>
  );
}

// ── AVATAR ────────────────────────────────────────────────────────────────────
function Avatar({ size=80, glow=false, spin=false }) {
  return (
    <svg width={size} height={size} viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg"
      style={{ filter: glow ? "drop-shadow(0 0 20px #00D4FF99)" : "none" }}>
      <defs>
        <radialGradient id="bg2" cx="50%" cy="35%" r="65%">
          <stop offset="0%" stopColor="#162A4A" />
          <stop offset="100%" stopColor="#080D1A" />
        </radialGradient>
        <radialGradient id="skin2" cx="50%" cy="35%" r="65%">
          <stop offset="0%" stopColor="#FDDCB5" /><stop offset="100%" stopColor="#E8B98A" />
        </radialGradient>
        <linearGradient id="shirt2" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#0EA5E9" /><stop offset="100%" stopColor="#6D28D9" />
        </linearGradient>
        <radialGradient id="halo" cx="50%" cy="50%" r="50%">
          <stop offset="60%" stopColor="transparent" /><stop offset="100%" stopColor="#00D4FF22" />
        </radialGradient>
        <clipPath id="cc2"><circle cx="60" cy="60" r="57" /></clipPath>
      </defs>
      {/* Halo */}
      <circle cx="60" cy="60" r="59" fill="url(#halo)" />
      {/* Spinning dashed ring */}
      <circle cx="60" cy="60" r="58" fill="none" stroke="url(#shirt2)" strokeWidth="2" strokeDasharray="6 3" opacity="0.7"
        style={spin ? { animation: "spinRing 8s linear infinite", transformOrigin:"60px 60px" } : {}} />
      <circle cx="60" cy="60" r="57" fill="url(#bg2)" />
      {/* Grid */}
      <g clipPath="url(#cc2)" opacity="0.07">
        {[22,34,46,58,70,82,94].map(v=>[
          <line key={"h"+v} x1="3" y1={v} x2="117" y2={v} stroke="#00D4FF" strokeWidth="0.6"/>,
          <line key={"v"+v} x1={v} y1="3" x2={v} y2="117" stroke="#00D4FF" strokeWidth="0.6"/>
        ])}
      </g>
      {/* Shirt */}
      <ellipse cx="60" cy="109" rx="37" ry="24" fill="url(#shirt2)" clipPath="url(#cc2)" />
      <path d="M51,90 Q60,98 69,90 L72,109 Q60,105 48,109 Z" fill="#1e1046" clipPath="url(#cc2)" />
      <rect x="54" y="79" width="12" height="14" rx="4" fill="url(#skin2)" clipPath="url(#cc2)" />
      <ellipse cx="60" cy="63" rx="22" ry="25" fill="url(#skin2)" clipPath="url(#cc2)" />
      <ellipse cx="60" cy="39" rx="22" ry="11" fill="#140A02" clipPath="url(#cc2)" />
      <rect x="38" y="39" width="7" height="15" rx="3" fill="#140A02" clipPath="url(#cc2)" />
      <rect x="75" y="39" width="7" height="15" rx="3" fill="#140A02" clipPath="url(#cc2)" />
      <ellipse cx="51" cy="63" rx="4.5" ry="5" fill="#fff"/>
      <ellipse cx="69" cy="63" rx="4.5" ry="5" fill="#fff"/>
      <circle cx="52" cy="64" r="2.8" fill="#140A02"/>
      <circle cx="70" cy="64" r="2.8" fill="#140A02"/>
      <circle cx="53.2" cy="62.8" r="0.9" fill="#fff"/>
      <circle cx="71.2" cy="62.8" r="0.9" fill="#fff"/>
      <path d="M47,57 Q51,54 55,57" stroke="#140A02" strokeWidth="2" fill="none" strokeLinecap="round"/>
      <path d="M65,57 Q69,54 73,57" stroke="#140A02" strokeWidth="2" fill="none" strokeLinecap="round"/>
      <path d="M59,69 Q57,74 60,75 Q63,74 61,69" stroke="#C89060" strokeWidth="1.2" fill="none" strokeLinecap="round"/>
      <path d="M54,79 Q60,84 66,79" stroke="#C47A4A" strokeWidth="2" fill="none" strokeLinecap="round"/>
      <text x="1" y="73" fontSize="11" fill="#00D4FF" opacity="0.9" fontFamily="monospace">{"</"}</text>
      <text x="107" y="73" fontSize="11" fill="#A855F7" opacity="0.9" fontFamily="monospace">{">"}</text>
    </svg>
  );
}

// ── TERMINAL ──────────────────────────────────────────────────────────────────
function TerminalHero() {
  const lines = [
    "$ whoami", "> Jineus Raja — Full Stack Dev",
    "$ cat stack.txt", "> MERN · TypeScript · Docker · PostgreSQL",
    "$ git log --oneline", "> LMS · ERP · CRM · Healthcare Portal",
    "$ echo 'status'", "> Open to opportunities ✓",
  ];
  const [displayed, setDisplayed] = useState([]);
  const [current, setCurrent] = useState("");
  const [li, setLi] = useState(0);
  const [ci, setCi] = useState(0);
  useEffect(() => {
    if (li >= lines.length) return;
    if (ci < lines[li].length) {
      const t = setTimeout(() => { setCurrent(p => p + lines[li][ci]); setCi(p => p+1); }, 24);
      return () => clearTimeout(t);
    } else {
      const t = setTimeout(() => { setDisplayed(p => [...p, lines[li]]); setCurrent(""); setLi(p => p+1); setCi(0); }, 340);
      return () => clearTimeout(t);
    }
  }, [ci, li]);
  return (
    <div style={{ background:"#080D1A", border:"1px solid #00D4FF33", borderRadius:14,
      padding:"18px 22px", fontFamily:"'Fira Code',monospace", fontSize:12.5, lineHeight:1.9,
      maxWidth:480, boxShadow:"0 0 60px #00D4FF12, 0 20px 60px #00000040",
      position:"relative", overflow:"hidden" }}>
      {/* scanline effect */}
      <div style={{ position:"absolute", inset:0, background:"repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,0,0,0.03) 2px,rgba(0,0,0,0.03) 4px)", pointerEvents:"none", zIndex:1 }} />
      <div style={{ display:"flex", gap:6, marginBottom:14, position:"relative", zIndex:2 }}>
        {["#FF5F56","#FFBD2E","#27C93F"].map(c => <div key={c} style={{ width:11,height:11,borderRadius:"50%",background:c }} />)}
        <span style={{ color:"#475569", fontSize:11, marginLeft:8 }}>jineus@portfolio ~ bash</span>
      </div>
      <div style={{ position:"relative", zIndex:2 }}>
        {displayed.map((l,i) => <div key={i} style={{ color: l.startsWith("$") ? "#00D4FF" : l.startsWith(">") ? "#A0F0C0" : "#888" }}>{l}</div>)}
        {li < lines.length && (
          <div style={{ color: current.startsWith("$") ? "#00D4FF" : "#A0F0C0" }}>
            {current}<span style={{ animation:"blink 1s step-end infinite", color:"#00D4FF" }}>█</span>
          </div>
        )}
      </div>
    </div>
  );
}

// ── ANIMATED TIMELINE LINE ────────────────────────────────────────────────────
function AnimatedTimelineLine({ containerRef }) {
  const lineRef = useRef(null);
  const glowRef = useRef(null);
  const mouse = useRef({ y: 0 });
  useEffect(() => {
    const onMouse = e => { mouse.current.y = e.clientY; };
    window.addEventListener("mousemove", onMouse);
    let raf;
    const animate = () => {
      if (containerRef.current && lineRef.current && glowRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const scrollProg = Math.max(0, Math.min(1, (-rect.top) / (rect.height - window.innerHeight * 0.5)));
        const mouseProg = Math.max(0, Math.min(1, (mouse.current.y - rect.top) / rect.height));
        const pct = Math.round((scrollProg * 0.6 + mouseProg * 0.4) * 100);
        lineRef.current.style.background = `linear-gradient(180deg,#00D4FF 0%,#A855F7 ${pct}%,#1E293B ${pct}%,#1E293B 100%)`;
        glowRef.current.style.top = `${Math.min(Math.max(pct, 1), 97)}%`;
        glowRef.current.style.opacity = "1";
      }
      raf = requestAnimationFrame(animate);
    };
    animate();
    return () => { window.removeEventListener("mousemove", onMouse); cancelAnimationFrame(raf); };
  }, []);
  return (
    <div style={{ position:"absolute", left:19, top:10, bottom:10, width:3, borderRadius:2 }}>
      <div ref={lineRef} style={{ width:"100%", height:"100%", borderRadius:2 }} />
      <div ref={glowRef} style={{
        position:"absolute", left:"50%", transform:"translate(-50%,-50%)",
        width:14, height:14, borderRadius:"50%", background:"#00D4FF",
        boxShadow:"0 0 16px 6px #00D4FF66", top:"2%", opacity:0,
        transition:"top 0.1s ease-out", pointerEvents:"none",
      }} />
    </div>
  );
}

// ── GLITCH TEXT ───────────────────────────────────────────────────────────────
function GlitchText({ text, style: s }) {
  const [glitching, setGlitching] = useState(false);
  useEffect(() => {
    const iv = setInterval(() => { setGlitching(true); setTimeout(() => setGlitching(false), 200); }, 4000);
    return () => clearInterval(iv);
  }, []);
  return (
    <span style={{ position:"relative", display:"inline-block", ...s }}>
      {text}
      {glitching && <>
        <span style={{ position:"absolute", top:0, left:"2px", color:"#FF0066", opacity:0.7, clipPath:"inset(20% 0 60% 0)" }}>{text}</span>
        <span style={{ position:"absolute", top:0, left:"-2px", color:"#00D4FF", opacity:0.7, clipPath:"inset(50% 0 20% 0)" }}>{text}</span>
      </>}
    </span>
  );
}

// ── STAT COUNTER ──────────────────────────────────────────────────────────────
function StatCounter({ end, label, color }) {
  const [val, setVal] = useState(0);
  const ref = useRef(null);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        let s = 0;
        const step = end / 40;
        const iv = setInterval(() => { s = Math.min(s + step, end); setVal(Math.round(s)); if (s >= end) clearInterval(iv); }, 40);
      }
    }, { threshold: 0.5 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [end]);
  return (
    <div ref={ref} style={{ textAlign:"center" }}>
      <div style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:42, fontWeight:800, color, lineHeight:1,
        textShadow:`0 0 20px ${color}66` }}>{val}+</div>
      <div style={{ color:"#64748B", fontSize:13, marginTop:6, fontFamily:"'Space Grotesk',sans-serif" }}>{label}</div>
    </div>
  );
}

// ── SKILL PILL ────────────────────────────────────────────────────────────────
function SkillPill({ label }) {
  const [h, setH] = useState(false);
  return (
    <span onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)} style={{
      display:"inline-block", padding:"5px 14px", borderRadius:20,
      fontSize:12.5, fontWeight:500, fontFamily:"'Space Grotesk',sans-serif",
      background: h ? "linear-gradient(90deg,#00D4FF22,#A855F722)" : "#0F172A",
      color: h ? "#00D4FF" : "#64748B",
      border:`1px solid ${h ? "#00D4FF55" : "#1E293B"}`,
      transition:"all 0.2s", cursor:"default",
      boxShadow: h ? "0 0 12px #00D4FF22" : "none",
    }}>{label}</span>
  );
}

// ── NAV ───────────────────────────────────────────────────────────────────────
function Nav() {
  const links = ["About","Skills","Experience","Projects","Education","Contact"];
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("About");
  useEffect(() => {
    const fn = () => {
      setScrolled(window.scrollY > 60);
      links.forEach(l => {
        const el = document.getElementById(l.toLowerCase());
        if (el) { const r = el.getBoundingClientRect(); if (r.top <= 120 && r.bottom > 120) setActive(l); }
      });
    };
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);
  return (
    <nav style={{
      position:"fixed", top:0, left:0, right:0, zIndex:200,
      background: scrolled ? "rgba(8,13,26,0.92)" : "transparent",
      backdropFilter: scrolled ? "blur(16px)" : "none",
      borderBottom: scrolled ? "1px solid #00D4FF18" : "none",
      transition:"all 0.3s ease", padding:"14px 44px",
      display:"flex", alignItems:"center", justifyContent:"space-between",
    }}>
      <div style={{ display:"flex", alignItems:"center", gap:10 }}>
        <Avatar size={34} />
        <span style={{ fontFamily:"'Space Grotesk',sans-serif", fontWeight:800, fontSize:17 }}>
          <span style={{ color:"#00D4FF" }}>JR</span><span style={{ color:"#334155" }}>.dev</span>
        </span>
      </div>
      <div style={{ display:"flex", gap:6 }}>
        {links.map(l => (
          <button key={l} onClick={() => document.getElementById(l.toLowerCase())?.scrollIntoView({behavior:"smooth"})}
            style={{
              background: active===l ? "linear-gradient(90deg,#00D4FF15,#A855F715)" : "none",
              border: active===l ? "1px solid #00D4FF33" : "1px solid transparent",
              cursor:"pointer", color: active===l ? "#00D4FF" : "#64748B",
              fontFamily:"'Space Grotesk',sans-serif", fontSize:13, fontWeight:500,
              padding:"6px 14px", borderRadius:20, transition:"all 0.2s",
            }}
            onMouseEnter={e => { e.currentTarget.style.color="#00D4FF"; e.currentTarget.style.borderColor="#00D4FF33"; }}
            onMouseLeave={e => { e.currentTarget.style.color=active===l?"#00D4FF":"#64748B"; e.currentTarget.style.borderColor=active===l?"#00D4FF33":"transparent"; }}
          >{l}</button>
        ))}
      </div>
    </nav>
  );
}

// ── SECTION ───────────────────────────────────────────────────────────────────
function Section({ id, title, children }) {
  return (
    <section id={id} style={{ padding:"90px 0 60px", position:"relative" }}>
      <div style={{ maxWidth:940, margin:"0 auto", padding:"0 28px" }}>
        <div style={{ display:"flex", alignItems:"center", gap:14, marginBottom:50 }}>
          <span style={{ color:"#00D4FF", fontFamily:"monospace", fontSize:14, opacity:0.6 }}>{"//"}</span>
          <h2 style={{ margin:0, fontFamily:"'Space Grotesk',sans-serif", fontSize:28, fontWeight:800,
            color:"#F0F4FF", letterSpacing:"-0.02em" }}>{title}</h2>
          <div style={{ flex:1, height:1, background:"linear-gradient(90deg,#00D4FF44,#A855F722,transparent)" }} />
        </div>
        {children}
      </div>
    </section>
  );
}

// ── TILT CARD ─────────────────────────────────────────────────────────────────
function TiltCard({ children, style: s }) {
  const ref = useRef(null);
  const onMove = e => {
    const r = ref.current.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    ref.current.style.transform = `perspective(600px) rotateY(${x*10}deg) rotateX(${-y*10}deg) translateY(-4px)`;
  };
  const onLeave = () => { ref.current.style.transform = "perspective(600px) rotateY(0deg) rotateX(0deg) translateY(0)"; };
  return <div ref={ref} onMouseMove={onMove} onMouseLeave={onLeave} style={{ transition:"transform 0.15s ease", ...s }}>{children}</div>;
}

// ── APP ───────────────────────────────────────────────────────────────────────
export default function Portfolio() {
  const timelineRef = useRef(null);

  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700;800&family=Inter:wght@300;400;500&family=Fira+Code:wght@400;500&display=swap";
    document.head.appendChild(link);
    const style = document.createElement("style");
    style.textContent = `
      *{box-sizing:border-box;margin:0;padding:0}
      html{scroll-behavior:smooth}
      body{background:#080D1A;color:#CBD5E1;font-family:'Inter',sans-serif;cursor:none}
      @keyframes blink{0%,100%{opacity:1}50%{opacity:0}}
      @keyframes float{0%,100%{transform:translateY(0) rotate(0deg)}50%{transform:translateY(-12px) rotate(2deg)}}
      @keyframes fadeUp{from{opacity:0;transform:translateY(32px)}to{opacity:1;transform:translateY(0)}}
      @keyframes pulse{0%,100%{box-shadow:0 0 0 0 #22C55E55}50%{box-shadow:0 0 0 12px transparent}}
      @keyframes spinRing{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
      @keyframes shimmer{0%{background-position:-200% 0}100%{background-position:200% 0}}
      @keyframes borderGlow{0%,100%{border-color:#00D4FF44}50%{border-color:#A855F766}}
      ::-webkit-scrollbar{width:5px}
      ::-webkit-scrollbar-track{background:#080D1A}
      ::-webkit-scrollbar-thumb{background:linear-gradient(#00D4FF,#A855F7);border-radius:3px}
    `;
    document.head.appendChild(style);
  }, []);

  return (
    <div style={{ background:"#080D1A", minHeight:"100vh", position:"relative" }}>
      <ParticleField />
      <MagneticCursor />
      <Nav />

      {/* ── HERO ── */}
      <section id="about" style={{
        minHeight:"100vh", display:"flex", alignItems:"center",
        padding:"120px 28px 80px", position:"relative", overflow:"hidden",
      }}>
        {/* Big background glow */}
        <div style={{ position:"absolute", top:"10%", right:"0%", width:600, height:600,
          background:"radial-gradient(circle,#00D4FF08,transparent 65%)", borderRadius:"50%", pointerEvents:"none" }} />
        <div style={{ position:"absolute", bottom:"5%", left:"0%", width:500, height:500,
          background:"radial-gradient(circle,#A855F708,transparent 65%)", borderRadius:"50%", pointerEvents:"none" }} />
        {/* Horizontal accent line */}
        <div style={{ position:"absolute", top:"50%", left:0, right:0, height:1,
          background:"linear-gradient(90deg,transparent,#00D4FF08,transparent)", pointerEvents:"none" }} />

<div style={{
  width: "100%",
  maxWidth: "1600px",
  margin: "0",
  padding: "0 60px",
  position: "relative",
  zIndex: 1
}}>
<div
  style={{
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    gap: "80px"
  }}
>            <div style={{ width: "48%", animation:"fadeUp 0.9s ease both" }}>
              {/* Eyebrow */}
              <div style={{ display:"inline-flex", alignItems:"center", gap:10, marginBottom:22,
                padding:"7px 16px", borderRadius:30, border:"1px solid #00D4FF33",
                background:"linear-gradient(90deg,#00D4FF08,#A855F708)" }}>
                <div style={{ width:7,height:7,borderRadius:"50%",background:"#22C55E",animation:"pulse 2s infinite" }} />
                <span style={{ color:"#94A3B8", fontSize:12.5, fontFamily:"'Space Grotesk',sans-serif", fontWeight:500 }}>
                  Available for opportunities
                </span>
              </div>

              <h1 style={{ fontFamily:"'Space Grotesk',sans-serif", fontWeight:800,
                fontSize:"clamp(42px,6.5vw,72px)", lineHeight:1.06, letterSpacing:"-0.03em",
                color:"#F0F4FF", marginBottom:10 }}>
                <GlitchText text="Jineus" style={{ display:"block" }} />
                <span style={{ background:"linear-gradient(90deg,#00D4FF,#A855F7)", WebkitBackgroundClip:"text",
                  WebkitTextFillColor:"transparent", backgroundClip:"text" }}>Raja</span>
              </h1>

              <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:20 }}>
                <div style={{ height:1, width:30, background:"linear-gradient(90deg,#00D4FF,transparent)" }} />
                <p style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:13, fontWeight:600,
                  color:"#A855F7", letterSpacing:"0.1em", textTransform:"uppercase" }}>
                  Full Stack Developer · MERN Stack
                </p>
              </div>

              <p style={{ color:"#64748B", lineHeight:1.8, fontSize:16, maxWidth:460, marginBottom:36 }}>
                Building scalable systems at the intersection of performance & design.
              </p>

              <div style={{ display:"flex", gap:14, flexWrap:"wrap", marginBottom:40 }}>
                <a href={`mailto:${DATA.email}`} style={{
                  padding:"12px 28px", borderRadius:8,
                  background:"linear-gradient(135deg,#00D4FF,#0EA5E9)",
                  color:"#080D1A", fontFamily:"'Space Grotesk',sans-serif", fontWeight:700,
                  fontSize:14, textDecoration:"none", transition:"all 0.2s",
                  boxShadow:"0 0 24px #00D4FF44",
                }}
                  onMouseEnter={e => { e.currentTarget.style.boxShadow="0 0 40px #00D4FF77"; e.currentTarget.style.transform="translateY(-2px)"; }}
                  onMouseLeave={e => { e.currentTarget.style.boxShadow="0 0 24px #00D4FF44"; e.currentTarget.style.transform="none"; }}
                >✦ Hire Me</a>
                <a href={`https://${DATA.github}`} target="_blank" rel="noreferrer" style={{
                  padding:"12px 28px", borderRadius:8,
                  background:"transparent", color:"#A855F7",
                  border:"1.5px solid #A855F744",
                  fontFamily:"'Space Grotesk',sans-serif", fontWeight:700,
                  fontSize:14, textDecoration:"none", transition:"all 0.2s",
                }}
                  onMouseEnter={e => { e.currentTarget.style.background="#A855F715"; e.currentTarget.style.borderColor="#A855F7"; e.currentTarget.style.boxShadow="0 0 20px #A855F733"; }}
                  onMouseLeave={e => { e.currentTarget.style.background="transparent"; e.currentTarget.style.borderColor="#A855F744"; e.currentTarget.style.boxShadow="none"; }}
                >GitHub ↗</a>
              </div>

              {/* Quick stats */}
              <div style={{ display:"flex", gap:40 }}>
                <StatCounter end={3} label="Years Exp." color="#00D4FF" />
                <StatCounter end={4} label="Projects" color="#A855F7" />
                <StatCounter end={5} label="Certifications" color="#10B981" />
              </div>
            </div>

            {/* Avatar side */}
            <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:28, animation:"fadeUp 0.9s ease 0.25s both" }}>
              <div style={{ animation:"float 5s ease-in-out infinite", position:"relative" }}>
                {/* Orbit ring */}
                <div style={{ position:"absolute", inset:-20, borderRadius:"50%",
                  border:"1px dashed #00D4FF22", animation:"spinRing 12s linear infinite" }} />
                <div style={{ position:"absolute", inset:-36, borderRadius:"50%",
                  border:"1px dashed #A855F718", animation:"spinRing 20s linear infinite reverse" }} />
                <Avatar size={140} glow spin />
              </div>
              <TerminalHero />
            </div>
          </div>
        </div>
      </section>

      {/* ── SKILLS ── */}
      <Section id="skills" title="Technical Skills">
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(248px,1fr))", gap:18 }}>
          {Object.entries(DATA.skills).map(([cat, items], i) => {
            const colors = ["#00D4FF","#A855F7","#10B981","#F59E0B","#EF4444","#EC4899"];
            const c = colors[i % colors.length];
            return (
              <TiltCard key={cat} style={{
                background:"linear-gradient(135deg,#0F172A,#0A0F1E)",
                border:`1px solid ${c}22`, borderRadius:14, padding:"22px 24px",
                transition:"border-color 0.25s, box-shadow 0.25s",
              }}>
                <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:14 }}>
                  <div style={{ width:8, height:8, borderRadius:"50%", background:c, boxShadow:`0 0 8px ${c}` }} />
                  <div style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:11, fontWeight:700,
                    letterSpacing:"0.12em", textTransform:"uppercase", color:c }}>{cat}</div>
                </div>
                <div style={{ display:"flex", flexWrap:"wrap", gap:7 }}>
                  {items.map(s => <SkillPill key={s} label={s} />)}
                </div>
              </TiltCard>
            );
          })}
        </div>
      </Section>

      {/* ── EXPERIENCE ── */}
      <Section id="experience" title="Work Experience">
        <div ref={timelineRef} style={{ position:"relative" }}>
          <AnimatedTimelineLine containerRef={timelineRef} />
          <div style={{ display:"flex", flexDirection:"column", gap:36 }}>
            {DATA.experience.map((exp, i) => (
              <div key={i} style={{ display:"flex", gap:32 }}>
                <div style={{
                  flexShrink:0, width:40, height:40, borderRadius:"50%",
                  background:"#080D1A", border:`2.5px solid ${exp.color}`,
                  display:"flex", alignItems:"center", justifyContent:"center",
                  boxShadow:`0 0 20px ${exp.color}55`, zIndex:1,
                }}>
                  <div style={{ width:10, height:10, borderRadius:"50%", background:exp.color }} />
                </div>
                <TiltCard style={{
                  flex:1,
                  background:"linear-gradient(135deg,#0D1829,#080D1A)",
                  border:`1px solid ${exp.color}22`,
                  borderRadius:14, padding:"24px 28px",
                  animation:`borderGlow 4s ease-in-out ${i*1.2}s infinite`,
                }}>
                  <div style={{ display:"flex", justifyContent:"space-between", flexWrap:"wrap", gap:10, marginBottom:10 }}>
                    <div>
                      <h3 style={{ fontFamily:"'Space Grotesk',sans-serif", fontWeight:700, fontSize:18, color:"#F0F4FF", marginBottom:4 }}>{exp.role}</h3>
                      <span style={{ color:exp.color, fontFamily:"'Space Grotesk',sans-serif", fontSize:14, fontWeight:600,
                        textShadow:`0 0 12px ${exp.color}66` }}>{exp.company}</span>
                    </div>
                    <div style={{ textAlign:"right" }}>
                      <div style={{
                        display:"inline-block", padding:"4px 13px", borderRadius:20,
                        background:`${exp.color}18`, border:`1px solid ${exp.color}44`,
                        color:exp.color, fontSize:12, fontFamily:"'Space Grotesk',sans-serif", fontWeight:600,
                      }}>{exp.period}</div>
                      <div style={{ color:"#475569", fontSize:12, marginTop:5 }}>{exp.location}</div>
                    </div>
                  </div>
                  <ul style={{ paddingLeft:18, marginTop:14, color:"#64748B", fontSize:14, lineHeight:1.85 }}>
                    {exp.points.map((p, j) => (
                      <li key={j} style={{ marginBottom:5 }}
                        onMouseEnter={e => e.currentTarget.style.color="#94A3B8"}
                        onMouseLeave={e => e.currentTarget.style.color="#64748B"}
                      >{p}</li>
                    ))}
                  </ul>
                </TiltCard>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* ── PROJECTS ── */}
      <Section id="projects" title="Projects">
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(380px,1fr))", gap:22 }}>
          {DATA.projects.map((p, i) => (
            <TiltCard key={i} style={{
              background:"linear-gradient(135deg,#0D1829,#080D1A)",
              border:`1.5px solid ${p.color}25`, borderRadius:16, padding:"28px 30px",
              position:"relative", overflow:"hidden",
            }}>
              {/* Corner accent */}
              <div style={{ position:"absolute", top:0, right:0, width:80, height:80,
                background:`radial-gradient(circle at top right,${p.color}18,transparent 70%)`, pointerEvents:"none" }} />
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:12 }}>
                <div>
                  <h3 style={{ fontFamily:"'Space Grotesk',sans-serif", fontWeight:800, fontSize:18, color:"#F0F4FF", marginBottom:4 }}>{p.title}</h3>
                  <p style={{ color:p.color, fontSize:13, fontFamily:"'Space Grotesk',sans-serif", fontWeight:600,
                    textShadow:`0 0 10px ${p.color}55` }}>{p.subtitle}</p>
                </div>
                <span style={{ padding:"3px 10px", borderRadius:6, background:`${p.color}15`,
                  color:p.color, fontSize:11, fontFamily:"monospace", border:`1px solid ${p.color}30` }}>{p.year}</span>
              </div>
              <p style={{ color:"#64748B", fontSize:14, lineHeight:1.8, marginBottom:20 }}>{p.description}</p>
              <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
                {p.stack.map(s => (
                  <span key={s} style={{
                    padding:"4px 12px", borderRadius:6,
                    background:`${p.color}14`, color:p.color,
                    fontSize:12, fontFamily:"'Space Grotesk',sans-serif", fontWeight:600,
                    border:`1px solid ${p.color}35`,
                  }}>{s}</span>
                ))}
              </div>
            </TiltCard>
          ))}
        </div>
      </Section>

      {/* ── EDUCATION ── */}
      <Section id="education" title="Education & Certifications">
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(330px,1fr))", gap:22 }}>
          <TiltCard style={{ background:"linear-gradient(135deg,#130A2E,#080D1A)", border:"1.5px solid #A855F730", borderRadius:16, padding:"30px 32px" }}>
            <div style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:11, fontWeight:700,
              letterSpacing:"0.12em", textTransform:"uppercase", color:"#A855F7", marginBottom:18 }}>🎓 Education</div>
            <h3 style={{ fontFamily:"'Space Grotesk',sans-serif", fontWeight:700, fontSize:17, color:"#F0F4FF", marginBottom:8 }}>{DATA.education.degree}</h3>
            <p style={{ color:"#00D4FF", fontFamily:"'Space Grotesk',sans-serif", fontSize:15, fontWeight:600, marginBottom:5 }}>{DATA.education.institution}</p>
            <p style={{ color:"#475569", fontSize:13 }}>{DATA.education.location}</p>
            <div style={{ marginTop:16, padding:"5px 14px", display:"inline-block", borderRadius:20,
              background:"#A855F715", border:"1px solid #A855F745",
              color:"#A855F7", fontSize:12, fontFamily:"'Space Grotesk',sans-serif", fontWeight:600 }}>{DATA.education.period}</div>
          </TiltCard>

          <TiltCard style={{ background:"linear-gradient(135deg,#061A12,#080D1A)", border:"1.5px solid #10B98130", borderRadius:16, padding:"30px 32px" }}>
            <div style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:11, fontWeight:700,
              letterSpacing:"0.12em", textTransform:"uppercase", color:"#10B981", marginBottom:18 }}>🏆 Certifications</div>
            {DATA.certifications.map((c,i) => (
              <div key={i} style={{
                display:"flex", alignItems:"center", gap:12, padding:"10px 0",
                borderBottom: i < DATA.certifications.length-1 ? "1px solid #1E293B" : "none",
                color:"#94A3B8", fontSize:14, transition:"color 0.2s",
              }}
                onMouseEnter={e => e.currentTarget.style.color="#F0F4FF"}
                onMouseLeave={e => e.currentTarget.style.color="#94A3B8"}
              >
                <span style={{ color:"#10B981", fontSize:16 }}>▸</span>{c}
              </div>
            ))}
          </TiltCard>
        </div>
      </Section>

      {/* ── CONTACT ── */}
      <Section id="contact" title="Get In Touch">
        <div style={{
          background:"linear-gradient(135deg,#0D1829,#0A0514,#061A12)",
          border:"1.5px solid transparent",
          borderRadius:20, padding:"52px 44px",
          display:"flex", justifyContent:"space-between", alignItems:"center",
          flexWrap:"wrap", gap:36, position:"relative", overflow:"hidden",
          boxShadow:"0 0 80px #00D4FF08, 0 0 80px #A855F708",
          backgroundClip:"padding-box",
        }}>
          <div style={{ position:"absolute", inset:0, borderRadius:20, padding:1.5, background:"linear-gradient(135deg,#00D4FF44,#A855F744,#10B98133)", WebkitMask:"linear-gradient(#fff 0 0) content-box,linear-gradient(#fff 0 0)", WebkitMaskComposite:"xor", maskComposite:"exclude", pointerEvents:"none" }} />
          <div style={{ position:"absolute", top:"-30%", right:"-10%", width:400, height:400,
            background:"radial-gradient(circle,#00D4FF06,transparent 65%)", pointerEvents:"none" }} />
          <div style={{ position:"relative", zIndex:1 }}>
            <h3 style={{ fontFamily:"'Space Grotesk',sans-serif", fontWeight:800, fontSize:28,
              color:"#F0F4FF", marginBottom:12, letterSpacing:"-0.02em" }}>Let's build something<br />
              <span style={{ background:"linear-gradient(90deg,#00D4FF,#A855F7)", WebkitBackgroundClip:"text",
                WebkitTextFillColor:"transparent", backgroundClip:"text" }}>great together.</span>
            </h3>
            <p style={{ color:"#64748B", fontSize:15, maxWidth:400, lineHeight:1.8 }}>
              Open to full-time roles, freelance contracts, and collaboration in full stack development.
            </p>
          </div>
          <div style={{ display:"flex", flexDirection:"column", gap:16, position:"relative", zIndex:1 }}>
            {[
              { label:"Email", value:DATA.email, href:`mailto:${DATA.email}`, color:"#00D4FF" },
              { label:"LinkedIn", value:DATA.linkedin, href:`https://${DATA.linkedin}`, color:"#A855F7" },
              { label:"GitHub", value:DATA.github, href:`https://${DATA.github}`, color:"#10B981" },
              { label:"Phone", value:DATA.phone, href:`tel:${DATA.phone}`, color:"#F59E0B" },
            ].map(({ label, value, href, color }) => (
              <a key={label} href={href} target="_blank" rel="noreferrer"
                style={{ display:"flex", gap:14, alignItems:"center", textDecoration:"none" }}>
                <span style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:11, fontWeight:700,
                  letterSpacing:"0.08em", textTransform:"uppercase", color, minWidth:64 }}>{label}</span>
                <span style={{ color:"#64748B", fontSize:14, transition:"color 0.2s" }}
                  onMouseEnter={e => e.target.style.color=color}
                  onMouseLeave={e => e.target.style.color="#64748B"}
                >{value}</span>
              </a>
            ))}
          </div>
        </div>
      </Section>

      {/* ── FOOTER ── */}
      <footer style={{ borderTop:"1px solid #1E293B", padding:"28px 44px",
        display:"flex", justifyContent:"space-between", alignItems:"center",
        flexWrap:"wrap", gap:16, background:"#080D1A", position:"relative", zIndex:1 }}>
        <div style={{ display:"flex", alignItems:"center", gap:12 }}>
          <Avatar size={40} glow />
          <div>
            <div style={{ fontFamily:"'Space Grotesk',sans-serif", fontWeight:700, color:"#F0F4FF", fontSize:14 }}>Jineus Raja</div>
            <div style={{ color:"#334155", fontSize:12 }}>Full Stack Developer · Bengaluru</div>
          </div>
        </div>
        <div style={{ color:"#1E293B", fontSize:12, fontFamily:"monospace" }}>{"// crafted with React · © 2026"}</div>
        <div style={{ display:"flex", gap:20 }}>
          {[
            { label:"LinkedIn", href:`https://${DATA.linkedin}`, color:"#00D4FF" },
            { label:"GitHub", href:`https://${DATA.github}`, color:"#A855F7" },
            { label:"Portfolio", href:`https://${DATA.portfolio}`, color:"#10B981" },
          ].map(({ label, href, color }) => (
            <a key={label} href={href} target="_blank" rel="noreferrer"
              style={{ color:"#334155", fontSize:13, textDecoration:"none",
                fontFamily:"'Space Grotesk',sans-serif", transition:"all 0.2s" }}
              onMouseEnter={e => { e.target.style.color=color; e.target.style.textShadow=`0 0 10px ${color}66`; }}
              onMouseLeave={e => { e.target.style.color="#334155"; e.target.style.textShadow="none"; }}
            >{label}</a>
          ))}
        </div>
      </footer>
    </div>
  );
}
