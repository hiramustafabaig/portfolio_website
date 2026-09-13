export type Project = {
  slug: string;
  title: string;
  blurb: string;
  description: string;
  tech: string[];
  status: "Live" | "In Progress" | "Research";
  image?: string;
  links?: { label: string; href: string }[];
  featured?: boolean;
};

export const projects: Project[] = [
  {
    slug: "qaamqaaj",
    title: "QaamQaaj",
    blurb: "AI-powered workforce platform connecting skilled workers with employers across Pakistan.",
    description:
      "An AI-enabled platform matching skilled workers with employers across Pakistan's informal labor market. Built CNIC OCR + face-matching identity verification, an AI-driven job-worker matching engine with fraud-detection signals, and an AI/IVR calling bot extending access to users with low digital literacy — designed to work consistently across web, mobile, and voice interaction.",
    tech: ["Next.js", "Supabase", "Python", "Computer Vision", "NLP"],
    status: "In Progress",
    featured: true,
  },
  {
    slug: "bioxplain",
    title: "BioXplain",
    blurb: "Explainable gene-expression disease classification using SHAP.",
    description:
      "A SHAP-based explainability study comparing classical ML classifiers — logistic regression, random forest, XGBoost, SVM — for gene-expression-based disease classification, evaluating whether feature attributions stay stable and biologically plausible across models rather than optimizing for accuracy alone.",
    tech: ["Python", "Scikit-learn", "XGBoost", "SHAP"],
    status: "Research",
    featured: true,
  },
  {
    slug: "multi-modal-health-assistant",
    title: "Multi-Modal Health Assistant",
    blurb: "Explainable diabetes-risk assessment combining structured data and NLP.",
    description:
      "An AI-powered health assessment system combining structured health data with NLP-based symptom analysis to deliver explainable diabetes-risk predictions and personalized recommendations.",
    tech: ["Python", "LangChain", "Streamlit", "NLP"],
    status: "Live",
    image: "/images/projects/HealthRiskAI.jpg",
    featured: true,
  },
  {
    slug: "careerai",
    title: "CareerAI",
    blurb: "AI-driven career guidance with skill-gap analysis.",
    description:
      "An AI-driven career guidance application analyzing user profiles to recommend personalized career paths, perform skill-gap analysis, and surface relevant learning resources.",
    tech: ["Next.js", "React", "TypeScript", "AI APIs"],
    status: "Live",
    image: "/images/projects/CareerAI.png",
  },
];
