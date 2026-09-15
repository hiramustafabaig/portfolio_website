import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
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
  delay = 0,
}: {
  project: Project;
  index: number;
  count: number;
  delay?: number;
}) {
  const fromLeft = index % 2 === 0;
  const [reducedMotion, setReducedMotion] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const tiltX = useMotionValue(0);
  const tiltY = useMotionValue(0);
  const springX = useSpring(tiltX, { stiffness: 220, damping: 22 });
  const springY = useSpring(tiltY, { stiffness: 220, damping: 22 });

  useEffect(() => {
    setReducedMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  function handlePointerMove(e: React.PointerEvent<HTMLDivElement>) {
    if (reducedMotion) return;
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    tiltY.set(px * 4);
    tiltX.set(-py * 4);
  }
  function handlePointerLeave() {
    tiltX.set(0);
    tiltY.set(0);
  }

  return (
    <motion.article
      ref={cardRef}
      id={project.slug}
      className="spot-card group relative scroll-mt-28 overflow-hidden rounded-[2rem] border border-border/70 bg-surface/70 shadow-[0_20px_60px_-25px_rgba(0,0,0,0.5)] transition-shadow duration-500 hover:shadow-[0_40px_85px_-20px_rgba(0,0,0,0.6)]"
      style={{ rotateX: springX, rotateY: springY, transformPerspective: 900 }}
      initial={reducedMotion ? undefined : { opacity: 0, x: fromLeft ? -90 : 90, scale: 0.94 }}
      whileInView={reducedMotion ? undefined : { opacity: 1, x: 0, scale: 1 }}
      whileHover={reducedMotion ? undefined : { scale: 1.015, y: -4 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      <div
        className="pointer-events-none absolute -top-16 h-40 w-40 rounded-full opacity-0 blur-3xl transition-opacity duration-700 group-hover:opacity-60"
        style={{
          left: fromLeft ? undefined : "-2.5rem",
          right: fromLeft ? "-2.5rem" : undefined,
          background: "radial-gradient(circle, #9c2c3d55, transparent 70%)",
        }}
      />
      <span
        className="pointer-events-none absolute inset-x-0 top-0 h-[3px] scale-x-0 bg-gradient-to-r from-transparent via-accent to-transparent opacity-0 transition-all duration-500 group-hover:scale-x-100 group-hover:opacity-100"
      />

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
  );
}
