import { useEffect, useRef, useState } from "react";
import { useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import { projects } from "../../data/projects";
import ProjectCard from "./ProjectCard";

const ROTATIONS = [-0.6, 0.4, -0.35, 0.5, -0.3, 0.45];

function StaticList() {
  return (
    <div className="mt-12 space-y-6">
      {projects.map((p) => (
        <article
          key={p.slug}
          id={p.slug}
          className="spot-card glass scroll-mt-28 rounded-3xl border border-border/70 p-6 sm:p-9"
        >
          <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
            {p.image && (
              <img
                src={p.image}
                alt={p.title}
                width={160}
                height={160}
                loading="lazy"
                className="h-28 w-28 flex-shrink-0 rounded-2xl object-cover sm:h-32 sm:w-32"
              />
            )}
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-3">
                <h3 className="font-display text-2xl font-semibold text-text sm:text-3xl">{p.title}</h3>
                <span className="rounded-full border border-accent/40 px-2.5 py-0.5 text-xs text-accent-soft">{p.status}</span>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-text-muted sm:text-base">{p.description}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {p.tech.map((t) => (
                  <span key={t} className="rounded-full border border-border bg-surface-2/50 px-3 py-1 text-xs text-text-muted">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}

function StackedScroll({ intensity }: { intensity: number }) {
  const count = projects.length;
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ["start start", "end end"],
  });

  // progress spans "card 0 active" (0) to "last card active" (1) — dividing by
  // (count - 1) rather than count means the final card settles at depth 0 and
  // stays there through the end of the scroll range, instead of continuing on
  // to fully exit before the wrapper's scroll runway is used up.
  const activeIndexMV = useTransform(scrollYProgress, (p) => Math.min(count - 1, Math.max(0, Math.round(p * (count - 1)))));
  useMotionValueEvent(activeIndexMV, "change", (v) => setActiveIndex(v));

  return (
    <div ref={wrapperRef} style={{ height: `${count * 85}vh` }} className="relative mt-12">
      <div className="sticky top-28 h-[62vh] min-h-[420px] sm:h-[58vh]">
        {projects.map((p, i) => {
          // eslint-disable-next-line react-hooks/rules-of-hooks
          const depth = useTransform(scrollYProgress, (progress) => i - progress * (count - 1));
          return (
            <ProjectCard
              key={p.slug}
              project={p}
              index={i}
              count={count}
              depth={depth}
              rotateBase={ROTATIONS[i % ROTATIONS.length]}
              intensity={intensity}
            />
          );
        })}

        <div className="pointer-events-none absolute -bottom-2 left-1/2 -translate-x-1/2 font-mono text-xs tracking-widest text-text-dim">
          {String(activeIndex + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}
        </div>
      </div>
    </div>
  );
}

export default function ProjectStack() {
  const [mode, setMode] = useState<"loading" | "static" | "stacked" | "stacked-mobile">("loading");

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) {
      setMode("static");
      return;
    }
    const update = () => setMode(window.innerWidth < 768 ? "stacked-mobile" : "stacked");
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  if (mode === "loading") return <div className="mt-12 h-[40vh]" />;
  if (mode === "static") return <StaticList />;
  return <StackedScroll intensity={mode === "stacked-mobile" ? 0.5 : 1} />;
}
