export const profile = {
  name: "Hira Baig",
  role: "Data Scientist & AI/ML Engineer",
  tagline: "Building AI systems that stay reliable, explainable, and useful once they leave the lab.",
  location: "Islamabad, Pakistan",
  email: "hirabaig1357@gmail.com",
  summary:
    "Final-semester Data Science student researching trustworthy, explainable machine learning for healthcare and real-world deployment. I came into computing from a Biology background, and now build AI-powered systems end-to-end — from published research to production-facing platforms.",
  social: {
    github: "https://github.com/hiramustafabaig",
    linkedin: "https://www.linkedin.com/in/hira-baig-195b13338/",
  },
} as const;

export const coreValues = [
  {
    name: "Reliability over demos",
    icon: "◈",
    description:
      "A model that works in a benchmark and not in the real world hasn't solved the problem. I test for the messy middle, not just the happy path.",
  },
  {
    name: "Explainability",
    icon: "◇",
    description:
      "If a prediction can't be explained, it can't be trusted with a real decision — especially in healthcare. Evidence over accuracy scores alone.",
  },
  {
    name: "Ship real systems",
    icon: "◆",
    description:
      "Research questions are more honest when they come from a system real users touch — verification, matching, dashboards, not just notebooks.",
  },
  {
    name: "Lifelong learning",
    icon: "○",
    description:
      "I came into this field sideways, from Biology. Staying curious about what I don't know yet is the whole strategy.",
  },
] as const;
