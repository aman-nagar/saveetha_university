// AryavartPath.jsx — FIXED scroll timing
// Key fix: track the entire section with offset ["start start", "end end"]
// then remap progress to only the cards region so the path never races ahead.

import { useRef, useEffect, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useInView,
} from "framer-motion";
import {
  FaUserPlus,
  FaBookReader,
  FaFlask,
  FaGlobeAmericas,
} from "react-icons/fa";

const GOLD = "#d4a843";
const CARD_SPACING = 260;
``;
const STEPS = [
  {
    title: "Seamless Admission",
    desc: "A simplified, digital-first process to jumpstart your academic journey in fields like BCA, faculty of science, or agriculture.",
    Icon: FaUserPlus,
    align: "left",
    year: "Step 01",
  },
  {
    title: "Skill-Based Learning",
    desc: "Beyond textbooks. Engage in industry-oriented practicals and workshops designed for real-world readiness.",
    Icon: FaBookReader,
    align: "right",
    year: "Step 02",
  },
  {
    title: "Innovation & Research",
    desc: "Access state-of-the-art labs and research centers to turn your unique ideas into impactful solutions.",
    Icon: FaFlask,
    align: "left",
    year: "Step 03",
  },
  {
    title: "Global Placement",
    desc: "Graduate with confidence as our placement cell connects you with top MNCs and global career opportunities.",
    Icon: FaGlobeAmericas,
    align: "right",
    year: "Step 04",
  },
];

function ZigzagSVGPath({ scrollYProgress }) {
  const d = `M 50,0 
             C 50,30 8,55 8,110 
             C 8,165 50,175 50,200 
             C 50,225 92,245 92,300
             C 92,355 50,365 50,400 
             C 50,425 8,445 8,500 
             C 8,555 50,565 50,600
             C 50,625 92,645 92,700 
             C 92,755 50,765 50,800`;

  return (
    <svg
      viewBox="0 0 100 800"
      style={{ width: "100%", height: "100%", overflow: "visible" }}
      preserveAspectRatio="none"
    >
      {/* Faint background path */}
      <path
        d={d}
        fill="none"
        stroke="rgba(212,168,67,0.07)"
        strokeWidth="1.5"
      />

      {/* Animated growing line */}
      <motion.path
        d={d}
        fill="none"
        stroke="#d4a843"
        strokeWidth="2.5"
        strokeLinecap="round"
        style={{
          pathLength: scrollYProgress,
          filter: "drop-shadow(0 0 6px rgba(212,168,67,0.9))",
        }}
      />
    </svg>
  );
}

/* ─── Desktop Card (scroll-driven, not useInView) ───────────────── */
function DesktopCard({
  step,
  isLeft,
  topPx,
  triggerProgress,
  scrollYProgress,
}) {
  // ✅ FIX: Cards animate based on scrollYProgress thresholds, not viewport detection
  const opacity = useTransform(
    scrollYProgress,
    [triggerProgress - 0.06, triggerProgress + 0.08],
    [0, 1],
  );
  const x = useTransform(
    scrollYProgress,
    [triggerProgress - 0.06, triggerProgress + 0.1],
    [isLeft ? -60 : 60, 0],
  );
  const scale = useTransform(
    scrollYProgress,
    [triggerProgress - 0.06, triggerProgress + 0.1],
    [0.82, 1],
  );
  const { Icon } = step;
  return (
    <motion.div
      style={{
        position: "absolute",
        top: topPx,
        width: "43%",
        ...(isLeft ? { left: 0 } : { right: 0 }),
        opacity,
        x,
        scale,
      }}
    >
      <motion.div
        whileHover={{ y: -5 }}
        className="ary-card"
        style={{
          position: "relative",
          background: "linear-gradient(135deg,#0d1b3e 0%,#091226 100%)",
          border: "1px solid rgba(212,168,67,0.22)",
          borderRadius: 16,
          padding: "28px 28px 24px",
          boxShadow: "0 8px 48px rgba(0,0,0,0.55)",
          cursor: "pointer",
          overflow: "hidden",
        }}
      >
        <motion.div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 2,
            background: `linear-gradient(90deg,${GOLD},#f0c84a,${GOLD})`,
            transformOrigin: "left",
            scaleX: 0,
          }}
          whileHover={{ scaleX: 1 }}
          transition={{ duration: 0.45 }}
        />
        <div
          style={{
            position: "absolute",
            top: "50%",
            transform: "translateY(-50%)",
            [isLeft ? "right" : "left"]: -6,
            width: 12,
            height: 12,
            borderRadius: "50%",
            background: GOLD,
            boxShadow: "0 0 12px rgba(212,168,67,0.9)",
          }}
        />
        <span
          style={{
            fontSize: 10,
            fontWeight: 700,
            letterSpacing: "0.25em",
            textTransform: "uppercase",
            color: "rgba(212,168,67,0.55)",
            display: "block",
            marginBottom: 14,
          }}
        >
          {step.year}
        </span>
        <div style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
          <div
            style={{
              width: 48,
              height: 48,
              flexShrink: 0,
              borderRadius: 12,
              background: "rgba(212,168,67,0.08)",
              border: "1px solid rgba(212,168,67,0.2)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 20,
              color: GOLD,
            }}
          >
            <Icon />
          </div>
          <div>
            <h3
              style={{
                fontSize: 18,
                fontWeight: 800,
                color: "#fff",
                marginBottom: 8,
                letterSpacing: "-0.02em",
              }}
            >
              {step.title}
            </h3>
            <p style={{ fontSize: 13.5, lineHeight: 1.65, color: "#7a8eaa" }}>
              {step.desc}
            </p>
          </div>
        </div>
        <div
          style={{
            position: "absolute",
            bottom: 8,
            right: 14,
            fontSize: 52,
            fontWeight: 900,
            color: GOLD,
            opacity: 0.04,
            lineHeight: 1,
            userSelect: "none",
          }}
        >
          {step.year.split(" ")[1]}
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ─── Mobile Card ───────────────────────────────────────────────── */
function MobileCard({ step }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });
  const { Icon } = step;
  return (
    <div ref={ref} style={{ position: "relative", paddingLeft: 40 }}>
      <motion.div
        initial={{ scale: 0 }}
        animate={isInView ? { scale: 1 } : {}}
        transition={{ type: "spring", stiffness: 200, damping: 14, delay: 0.1 }}
        style={{
          position: "absolute",
          left: 0,
          top: 28,
          width: 16,
          height: 16,
          borderRadius: "50%",
          background: GOLD,
          border: "2.5px solid #06101f",
          boxShadow: "0 0 10px rgba(212,168,67,0.8)",
          zIndex: 10,
        }}
      />
      <motion.div
        initial={{ opacity: 0, x: 35, scale: 0.87 }}
        animate={isInView ? { opacity: 1, x: 0, scale: 1 } : {}}
        transition={{ type: "spring", stiffness: 95, damping: 17, delay: 0.15 }}
        style={{
          background: "linear-gradient(135deg,#0d1b3e,#091226)",
          border: "1px solid rgba(212,168,67,0.2)",
          borderRadius: 14,
          padding: "20px 18px",
          marginBottom: 22,
          boxShadow: "0 4px 24px rgba(0,0,0,0.4)",
          overflow: "hidden",
        }}
      >
        <span
          style={{
            fontSize: 9,
            fontWeight: 700,
            letterSpacing: "0.25em",
            textTransform: "uppercase",
            color: "rgba(212,168,67,0.55)",
            display: "block",
            marginBottom: 10,
          }}
        >
          {step.year}
        </span>
        <div
          style={{
            display: "flex",
            gap: 12,
            alignItems: "center",
            marginBottom: 10,
          }}
        >
          <div
            style={{
              width: 38,
              height: 38,
              borderRadius: 10,
              background: "rgba(212,168,67,0.1)",
              border: "1px solid rgba(212,168,67,0.2)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 17,
              color: GOLD,
              flexShrink: 0,
            }}
          >
            <Icon />
          </div>
          <h3 style={{ fontSize: 15, fontWeight: 800, color: "#fff" }}>
            {step.title}
          </h3>
        </div>
        <p style={{ fontSize: 13, lineHeight: 1.65, color: "#7a8eaa" }}>
          {step.desc}
        </p>
      </motion.div>
    </div>
  );
}

/* ─── Main Component ────────────────────────────────────────────── */
export default function AryavartPath() {
  const sectionRef = useRef(null);
  const mobileRef = useRef(null);

  // ✅ FIX 1: Track full section from top-of-section entering viewport top
  //           to bottom-of-section leaving viewport bottom
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const { scrollYProgress: mobileProgress } = useScroll({
    target: mobileRef,
    offset: ["start 90%", "end 10%"],
  });
  const sm = useSpring(mobileProgress, { stiffness: 60, damping: 25 });

  const totalH = STEPS.length * CARD_SPACING + 160;

  // ✅ FIX 2: Remap so path only draws over the CARDS region of the section,
  //           not over the header or padding — prevents early completion
  const cardsContainerRef = useRef(null);
  const [range, setRange] = useState([0, 1]);

  useEffect(() => {
    if (!sectionRef.current || !cardsContainerRef.current) return;

    const sectionRect = sectionRef.current.getBoundingClientRect();
    const cardsRect = cardsContainerRef.current.getBoundingClientRect();

    const sectionHeight = sectionRef.current.offsetHeight;

    const cardsTopOffset = cardsContainerRef.current.offsetTop;
    const cardsHeight = cardsContainerRef.current.offsetHeight;

    const start = cardsTopOffset / sectionHeight;
    const end = (cardsTopOffset + cardsHeight) / sectionHeight;

    setRange([start, end]);
  }, []);

  const pathProgress = useTransform(scrollYProgress, range, [0, 1]);

  // ✅ FIX 3: Card thresholds spread evenly over pathProgress [0→1]
  const cardTriggers = STEPS.map((_, i) => (i + 0.6) / STEPS.length);

  return (
    <section
      ref={sectionRef}
      style={{
        padding: "96px 0",
        background:
          "linear-gradient(160deg,#050d1a 0%,#080f1e 55%,#060b16 100%)",
        minHeight: "100vh",
        position: "relative",
        overflow: "hidden",
        fontFamily: "'Inter',system-ui,sans-serif",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "30%",
          left: "20%",
          width: 400,
          height: 400,
          borderRadius: "50%",
          pointerEvents: "none",
          background:
            "radial-gradient(circle,rgba(212,168,67,0.04) 0%,transparent 70%)",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "20%",
          right: "15%",
          width: 450,
          height: 450,
          borderRadius: "50%",
          pointerEvents: "none",
          background:
            "radial-gradient(circle,rgba(26,58,110,0.12) 0%,transparent 70%)",
        }}
      />

      <div
        style={{
          maxWidth: 1100,
          margin: "0 auto",
          padding: "0 20px",
          position: "relative",
        }}
      >
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, ease: "easeOut" }}
          viewport={{ once: true }}
          style={{ textAlign: "center", marginBottom: 80 }}
        >
          <motion.p
            initial={{ opacity: 0, letterSpacing: "0.08em" }}
            whileInView={{ opacity: 1, letterSpacing: "0.3em" }}
            transition={{ duration: 1.1, delay: 0.2 }}
            viewport={{ once: true }}
            style={{
              fontSize: 11,
              fontWeight: 700,
              textTransform: "uppercase",
              color: "rgba(212,168,67,0.65)",
              marginBottom: 14,
              display: "block",
            }}
          >
            Your Journey Awaits
          </motion.p>
          <h2
            style={{
              fontSize: "clamp(2.2rem,6vw,4rem)",
              fontWeight: 900,
              color: "#fff",
              lineHeight: 1.15,
              letterSpacing: "-0.03em",
              margin: "0 0 20px",
            }}
          >
            The{" "}
            <span
              style={{
                background:
                  "linear-gradient(135deg,#c49a2a 0%,#f0c84a 50%,#b8902a 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Saveetha Amravati
            </span>{" "}
            Path
          </h2>
          <p
            style={{
              maxWidth: 480,
              margin: "0 auto 28px",
              fontSize: 16,
              lineHeight: 1.7,
              color: "#6b7e9a",
            }}
          >
            From aspiration to achievement — four transformative milestones that
            shape tomorrow's global professionals.
          </p>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 12,
            }}
          >
            <div
              style={{
                height: 1,
                width: 56,
                background: `linear-gradient(to right,transparent,${GOLD})`,
              }}
            />
            <div
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: GOLD,
                boxShadow: "0 0 10px rgba(212,168,67,0.9)",
              }}
            />
            <div
              style={{
                height: 1,
                width: 56,
                background: `linear-gradient(to left,transparent,${GOLD})`,
              }}
            />
          </div>
        </motion.div>

        {/* Desktop */}
        <div
          ref={cardsContainerRef}
          className="ary-desktop"
          style={{
            position: "relative",
            maxWidth: 880,
            margin: "0 auto",
            height: totalH,
          }}
        >
          <div
            style={{
              position: "absolute",
              left: "50%",
              transform: "translateX(-50%)",
              width: "10%",
              top: 0,
              bottom: 0,
            }}
          >
            <ZigzagSVGPath scrollYProgress={pathProgress} />
          </div>
          {STEPS.map((step, i) => (
            <DesktopCard
              key={i}
              step={step}
              isLeft={step.align === "left"}
              topPx={i * CARD_SPACING + 20}
              triggerProgress={cardTriggers[i]}
              scrollYProgress={pathProgress}
            />
          ))}
        </div>

        {/* Mobile */}
        <div
          ref={mobileRef}
          className="ary-mobile"
          style={{ position: "relative" }}
        >
          <div
            style={{
              position: "absolute",
              left: 7,
              top: 0,
              bottom: 0,
              width: 2,
              background: "rgba(212,168,67,0.08)",
            }}
          />
          <motion.div
            style={{
              position: "absolute",
              left: 7,
              top: 0,
              bottom: 0,
              width: 2,
              background: `linear-gradient(to bottom,${GOLD},#f0c84a)`,
              boxShadow: "0 0 10px rgba(212,168,67,0.5)",
              scaleY: sm,
              transformOrigin: "top",
            }}
          />
          {STEPS.map((step, i) => (
            <MobileCard key={i} step={step} />
          ))}
        </div>
      </div>

      <style>{`
        .ary-desktop { display:none; }
        .ary-mobile  { display:block; }
        @media(min-width:768px){ .ary-desktop{display:block!important;} .ary-mobile{display:none!important;} }
        .ary-card:hover { box-shadow:0 12px 60px rgba(212,168,67,0.18)!important; border-color:rgba(212,168,67,0.48)!important; }
      `}</style>
    </section>
  );
}
