"use client";
import { useState, useRef, useCallback } from "react";

const cases = [
  {
    id: 1,
    title: "Teeth Whitening",
    subtitle: "Single session — 8 shades brighter",
    before: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=600&q=80&auto=format&fit=crop",
    after:  "https://images.unsplash.com/photo-1620775993977-0ca5dd7f1e8e?w=600&q=80&auto=format&fit=crop",
    tag: "Whitening",
    tagColor: "#E8913A",
    tagBg: "#FEF4EA",
    duration: "1 session",
  },
  {
    id: 2,
    title: "Braces Alignment",
    subtitle: "18 months of gradual correction",
    before: "https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?w=600&q=80&auto=format&fit=crop",
    after:  "https://images.unsplash.com/photo-1601049541100-5b63a29c3c7c?w=600&q=80&auto=format&fit=crop",
    tag: "Orthodontics",
    tagColor: "#7C4DFF",
    tagBg: "#EDE7FF",
    duration: "18 months",
  },
  {
    id: 3,
    title: "Dental Implants",
    subtitle: "Natural-looking permanent solution",
    before: "https://images.unsplash.com/photo-1588776814546-1ffbb503e9b9?w=600&q=80&auto=format&fit=crop",
    after:  "https://images.unsplash.com/photo-1598256989800-fe5f95da9787?w=600&q=80&auto=format&fit=crop",
    tag: "Implants",
    tagColor: "#0EA5E9",
    tagBg: "#E0F2FE",
    duration: "3 months",
  },
];

function SliderCard({ item }) {
  const [pos, setPos] = useState(50);
  const dragging = useRef(false);
  const containerRef = useRef(null);

  const updatePos = useCallback((clientX) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const pct = Math.min(100, Math.max(0, ((clientX - rect.left) / rect.width) * 100));
    setPos(pct);
  }, []);

  return (
    <div
      className="group relative rounded-3xl overflow-hidden bg-white border border-gray-100 flex flex-col"
      style={{ boxShadow: "0 6px 32px rgba(0,0,0,.08)" }}
    >
      {/* Drag instruction */}
      <div className="absolute top-4 left-0 right-0 flex justify-center z-20 pointer-events-none">
        <div
          className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium"
          style={{ background: "rgba(0,0,0,.55)", color: "#fff", backdropFilter: "blur(6px)" }}
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
          Drag to compare
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </div>
      </div>

      {/* Slider container */}
      <div
        ref={containerRef}
        className="relative h-64 cursor-ew-resize select-none"
        onMouseMove={(e) => { if (dragging.current) updatePos(e.clientX); }}
        onMouseDown={(e) => { dragging.current = true; updatePos(e.clientX); }}
        onMouseUp={() => { dragging.current = false; }}
        onMouseLeave={() => { dragging.current = false; }}
        onTouchMove={(e) => updatePos(e.touches[0].clientX)}
        onTouchStart={(e) => updatePos(e.touches[0].clientX)}
      >
        {/* AFTER — full */}
        <img src={item.after} alt={`After ${item.title}`} className="absolute inset-0 w-full h-full object-cover" />

        {/* BEFORE — clipped */}
        <div
          className="absolute inset-0 overflow-hidden"
          style={{ width: `${pos}%` }}
        >
          <img src={item.before} alt={`Before ${item.title}`} className="absolute inset-0 h-full object-cover" style={{ width: containerRef.current?.offsetWidth || 400 }} />
        </div>

        {/* Before label */}
        <div
          className="absolute bottom-3 left-3 px-2.5 py-1 rounded-full text-xs font-semibold"
          style={{ background: "rgba(239,68,68,.9)", color: "#fff", opacity: pos > 15 ? 1 : 0, transition: "opacity .2s" }}
        >
          Before
        </div>

        {/* After label */}
        <div
          className="absolute bottom-3 right-3 px-2.5 py-1 rounded-full text-xs font-semibold"
          style={{ background: "rgba(15,130,120,.9)", color: "#fff", opacity: pos < 85 ? 1 : 0, transition: "opacity .2s" }}
        >
          After
        </div>

        {/* Divider line */}
        <div
          className="absolute top-0 bottom-0 flex items-center justify-center z-10"
          style={{ left: `${pos}%`, transform: "translateX(-50%)" }}
        >
          <div className="w-px h-full bg-white/80" />
          <div
            className="absolute w-10 h-10 rounded-full flex items-center justify-center"
            style={{
              background: "#fff",
              boxShadow: "0 4px 16px rgba(0,0,0,.25)",
              border: "2px solid rgba(255,255,255,.8)",
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0F8278" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </div>
        </div>
      </div>

      {/* Card info */}
      <div className="p-5 flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span
              className="px-2.5 py-0.5 rounded-full text-xs font-semibold"
              style={{ background: item.tagBg, color: item.tagColor }}
            >
              {item.tag}
            </span>
            <span className="text-xs text-gray-400">{item.duration}</span>
          </div>
          <h3 className="font-semibold text-gray-900 text-sm">{item.title}</h3>
          <p className="text-xs text-gray-400 mt-0.5">{item.subtitle}</p>
        </div>
        <button
          className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 transition-transform duration-200 hover:scale-110 active:scale-90"
          style={{ background: "#E6F4F2", color: "#0F8278", border: "none", cursor: "pointer" }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default function BeforeAfter() {
  return (
    <section className="relative py-24 overflow-hidden" style={{ background: "#F8FAF9" }}>
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at 50% 0%, rgba(15,130,120,.08) 0%, transparent 60%)",
        }}
      />

      <div className="relative max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-5 text-xs font-semibold tracking-widest uppercase"
            style={{ background: "#E6F4F2", color: "#0F8278" }}
          >
            <span className="w-2 h-2 rounded-full bg-teal-500 animate-pulse inline-block" />
            Real Results
          </div>
          <h2
            className="font-bold text-gray-900 mb-4"
            style={{
              fontFamily: "var(--font-cormorant, 'Georgia', serif)",
              fontSize: "clamp(2rem, 4vw, 3rem)",
              letterSpacing: "-.02em",
              lineHeight: 1.15,
            }}
          >
            Before &amp; After Results
          </h2>
          <p className="text-gray-500 max-w-lg mx-auto text-sm leading-relaxed">
            Drag the slider to witness real transformations from our patients. Each result achieved at BrightSmile Dental Care.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
          {cases.map((item) => (
            <SliderCard key={item.id} item={item} />
          ))}
        </div>

        {/* Disclaimer */}
        <p className="text-center text-xs text-gray-400 mt-8">
          * Individual results may vary. Photos are for illustrative purposes.
        </p>
      </div>
    </section>
  );
}