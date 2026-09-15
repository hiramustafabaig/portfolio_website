import { projects } from "../../data/projects";
import ProjectCard from "./ProjectCard";

export default function ProjectStack() {
  return (
    <div className="mt-12 grid gap-8 md:grid-cols-2">
      {projects.map((p, i) => (
        <ProjectCard key={p.slug} project={p} index={i} count={projects.length} delay={i * 0.08} />
      ))}
    </div>
  );
}
