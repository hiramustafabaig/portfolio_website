export type SkillGroup = {
  category: string;
  items: string[];
};

export const skillGroups: SkillGroup[] = [
  {
    category: "Machine Learning & AI",
    items: ["Python", "Scikit-learn", "XGBoost", "SHAP", "NLP", "LangChain", "Computer Vision", "Deep Learning"],
  },
  {
    category: "Web & Full-Stack",
    items: ["Next.js", "React", "Node.js", "TypeScript", "Tailwind CSS", "RESTful APIs"],
  },
  {
    category: "Data & Cloud",
    items: ["PostgreSQL", "Supabase", "MySQL", "Power BI", "Data Visualization"],
  },
  {
    category: "Research Methods",
    items: ["Experimental Design", "Statistical Evaluation", "Explainability Analysis", "Federated Learning"],
  },
];
