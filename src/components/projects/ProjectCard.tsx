import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform, type MotionValue } from "framer-motion";
import type { Project } from "../../data/projects";

const statusColor: Record<Project["status"], string> = {
  Live: "text-mist border-mist/40 bg-mist/10",
  "In Progress": "text-accent-soft border-accent/40 bg-accent/10",
  Research: "text-accent-2 border-accent-2/40 bg-accent-2/10",
};

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
          {project.image && (
            <div className="relative h-40 w-full overflow-hidden bg-surface-2/70 sm:h-48">
              <img
                src={project.image}
                alt={project.title}
                width={640}
                height={360}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-surface/70 via-transparent to-transparent"></div>
            </div>
          )}

          <div className="p-6 sm:p-8">
            <div className="flex items-center justify-between gap-4">
              <span className="font-mono text-xs text-text-dim/80">
                {String(index + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}
              </span>
              <span
                className={`rounded-full border px-3 py-1 font-mono text-[11px] uppercase tracking-wide ${statusColor[project.status]}`}
              >
                {project.status}
              </span>
            </div>
            <h3 className="mt-3 font-display text-2xl font-semibold text-text sm:text-3xl">{project.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-text-muted sm:text-base">{project.description}</p>
            <div className="mt-5 flex flex-wrap items-center gap-2 border-t border-border/60 pt-4">
              {project.tech.map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-accent/30 bg-accent/10 px-3 py-1 font-mono text-xs uppercase tracking-wide text-accent"
                >
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
