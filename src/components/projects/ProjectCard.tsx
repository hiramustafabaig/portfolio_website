import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform, type MotionValue } from "framer-motion";
import type { Project } from "../../data/projects";

const statusColor: Record<Project["status"], string> = {
  Live: "text-mist border-mist/40 bg-mist/10",
  "In Progress": "text-accent-soft border-accent/40 bg-accent/10",
  Research: "text-accent-2 border-accent-2/40 bg-accent-2/10",
};

/** A restrained, per-project abstract mark for cards with no screenshot — kept
 *  secondary to the text, never a stand-in stock photo. */
function AbstractVisual({ slug }: { slug: string }) {
  if (slug === "qaamqaaj") {
    return (
      <svg viewBox="0 0 160 160" className="h-full w-full opacity-80">
        <g stroke="currentColor" strokeWidth="1" className="text-accent/50">
          <line x1="30" y1="40" x2="90" y2="70" />
          <line x1="90" y1="70" x2="140" y2="35" />
          <line x1="90" y1="70" x2="60" y2="125" />
          <line x1="60" y1="125" x2="120" y2="130" />
          <line x1="30" y1="40" x2="60" y2="125" />
        </g>
        <g className="text-accent">
          <circle cx="30" cy="40" r="5" fill="currentColor" />
          <circle cx="140" cy="35" r="4" fill="currentColor" opacity="0.7" />
          <circle cx="60" cy="125" r="4" fill="currentColor" opacity="0.7" />
          <circle cx="120" cy="130" r="3.5" fill="currentColor" opacity="0.6" />
        </g>
        <circle cx="90" cy="70" r="7" className="text-accent-2" fill="currentColor" />
      </svg>
    );
  }
  if (slug === "bioxplain") {
    return (
      <svg viewBox="0 0 160 160" className="h-full w-full opacity-80">
        <g className="text-accent-2">
          {[24, 44, 64, 84, 104, 124].map((y, i) => (
            <rect
              key={y}
              x="20"
              y={y}
              width={30 + ((i * 17) % 90)}
              height="8"
              rx="2"
              fill="currentColor"
              opacity={0.35 + (i % 3) * 0.18}
            />
          ))}
        </g>
      </svg>
    );
  }
  if (slug === "multi-modal-health-assistant") {
    return (
      <svg viewBox="0 0 160 160" className="h-full w-full opacity-80">
        <polyline
          points="10,95 40,95 52,58 66,125 80,72 94,95 128,95 150,55"
          fill="none"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-accent-2"
          stroke="currentColor"
        />
        <circle cx="52" cy="58" r="3.5" className="text-accent" fill="currentColor" />
        <circle cx="66" cy="125" r="3.5" className="text-accent" fill="currentColor" opacity="0.7" />
        <circle cx="150" cy="55" r="4" className="text-accent-2" fill="currentColor" opacity="0.6" />
      </svg>
    );
  }
  if (slug === "careerai") {
    return (
      <svg viewBox="0 0 160 160" className="h-full w-full opacity-80">
        <g stroke="currentColor" strokeWidth="1.5" fill="none" className="text-accent-2/60">
          <path d="M80 132 L80 98" />
          <path d="M80 98 L46 68" />
          <path d="M80 98 L114 68" />
          <path d="M46 68 L26 36" />
          <path d="M46 68 L61 32" />
          <path d="M114 68 L99 32" />
          <path d="M114 68 L134 36" />
        </g>
        <g className="text-accent" fill="currentColor">
          <circle cx="80" cy="132" r="5" />
          <circle cx="80" cy="98" r="4" />
        </g>
        <g className="text-accent-2" fill="currentColor" opacity="0.75">
          <circle cx="46" cy="68" r="3.5" />
          <circle cx="114" cy="68" r="3.5" />
          <circle cx="26" cy="36" r="3" />
          <circle cx="61" cy="32" r="3" />
          <circle cx="99" cy="32" r="3" />
          <circle cx="134" cy="36" r="3" />
        </g>
      </svg>
    );
  }
  return null;
}

export default function ProjectCard({
  project,
  index,
  count,
  depth,
  rotateBase,
  intensity = 1,
}: {
  project: Project;
  index: number;
  count: number;
  depth: MotionValue<number>;
  rotateBase: number;
  intensity?: number;
}) {
  const translateY = useMotionValueTransform(depth, [-1, 0, 1, 2, 3], [-160 * intensity, 0, 22 * intensity, 42 * intensity, 60 * intensity]);
  const scale = useMotionValueTransform(depth, [-1, 0, 1, 2, 3], [1 - 0.08 * intensity, 1, 1 - 0.035 * intensity, 1 - 0.065 * intensity, 1 - 0.09 * intensity]);
  const opacity = useMotionValueTransform(depth, [-1, -0.15, 0, 1, 2, 3], [0, 0, 1, 0.88, 0.68, 0.48]);
  const exitRotate = useMotionValueTransform(depth, [-1, 0], [-2.2 * intensity, 0]);
  const zIndex = useMotionValueTransform(depth, [-1, 0, 1, 2, 3], [count + 10, count + 5, count - 1, count - 2, count - 3]);
  const pointerEvents = useTransform(depth, (d) => (Math.abs(d) < 0.5 ? "auto" : "none"));

  const tiltX = useMotionValue(0);
  const tiltY = useMotionValue(0);
  const springX = useSpring(tiltX, { stiffness: 220, damping: 22 });
  const springY = useSpring(tiltY, { stiffness: 220, damping: 22 });
  const cardRef = useRef<HTMLDivElement>(null);

  function handlePointerMove(e: React.PointerEvent<HTMLDivElement>) {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    tiltY.set(px * 5);
    tiltX.set(-py * 5);
  }
  function handlePointerLeave() {
    tiltX.set(0);
    tiltY.set(0);
  }

  return (
    <motion.div
      className="absolute inset-x-0 top-0 origin-top"
      style={{
        translateY,
        scale,
        opacity,
        zIndex,
        rotate: rotateBase,
        pointerEvents,
      }}
    >
      <motion.div style={{ rotate: exitRotate }}>
        <motion.article
          ref={cardRef}
          id={project.slug}
          className="spot-card group glass scroll-mt-28 overflow-hidden rounded-[2rem] border border-border/70 shadow-[0_20px_60px_-25px_rgba(0,0,0,0.5)]"
          style={{ rotateX: springX, rotateY: springY, transformPerspective: 900 }}
          onPointerMove={handlePointerMove}
          onPointerLeave={handlePointerLeave}
        >
          <div className="relative h-40 w-full overflow-hidden bg-surface-2/70 sm:h-48">
            {project.image ? (
              <img
                src={project.image}
                alt={project.title}
                width={640}
                height={360}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            ) : (
              <AbstractVisual slug={project.slug} />
            )}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-surface/70 via-transparent to-transparent"></div>
            <span
              className={`absolute right-4 top-4 rounded-full border px-3 py-1 font-mono text-[11px] uppercase tracking-wide backdrop-blur-sm ${statusColor[project.status]}`}
            >
              {project.status}
            </span>
            <span className="absolute left-4 top-4 font-mono text-xs text-text-dim/80">
              {String(index + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}
            </span>
          </div>

          <div className="p-6 sm:p-8">
            <h3 className="font-display text-2xl font-semibold text-text sm:text-3xl">{project.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-text-muted sm:text-base">{project.description}</p>
            <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-border/60 pt-4">
              {project.tech.map((t) => (
                <span key={t} className="font-mono text-xs uppercase tracking-wide text-text-dim">
                  {t}
                </span>
              ))}
            </div>
          </div>
        </motion.article>
      </motion.div>
    </motion.div>
  );
}

// Small helper so each numeric mapping above reads as one line.
function useMotionValueTransform(value: MotionValue<number>, input: number[], output: number[]) {
  return useTransform(value, input, output);
}
