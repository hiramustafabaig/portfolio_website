import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform, type MotionValue } from "framer-motion";
import type { Project } from "../../data/projects";

const statusColor: Record<Project["status"], string> = {
  Live: "text-mist border-mist/40",
  "In Progress": "text-accent-soft border-accent/40",
  Research: "text-accent-2 border-accent-2/40",
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
          className="spot-card glass scroll-mt-28 rounded-3xl border border-border/70 p-6 shadow-[0_20px_60px_-25px_rgba(0,0,0,0.5)] sm:p-9"
          style={{ rotateX: springX, rotateY: springY, transformPerspective: 900 }}
          onPointerMove={handlePointerMove}
          onPointerLeave={handlePointerLeave}
        >
          <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
            <div className="h-28 w-28 flex-shrink-0 overflow-hidden rounded-2xl bg-surface-2/70 sm:h-32 sm:w-32">
              {project.image ? (
                <img
                  src={project.image}
                  alt={project.title}
                  width={160}
                  height={160}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                />
              ) : (
                <AbstractVisual slug={project.slug} />
              )}
            </div>
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-3">
                <h3 className="font-display text-2xl font-semibold text-text sm:text-3xl">{project.title}</h3>
                <span className={`rounded-full border px-2.5 py-0.5 text-xs ${statusColor[project.status]}`}>
                  {project.status}
                </span>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-text-muted sm:text-base">{project.description}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {project.tech.map((t) => (
                  <span key={t} className="rounded-full border border-border bg-surface-2/50 px-3 py-1 text-xs text-text-muted">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <p className="mt-6 font-mono text-xs text-text-dim">
            {String(index + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}
          </p>
        </motion.article>
      </motion.div>
    </motion.div>
  );
}

// Small helper so each numeric mapping above reads as one line.
function useMotionValueTransform(value: MotionValue<number>, input: number[], output: number[]) {
  return useTransform(value, input, output);
}
