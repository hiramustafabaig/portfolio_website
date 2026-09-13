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
      "My final year project, supervised by Prof. Dr. Manzoor Elahi Tamimi, building an AI-enabled platform that matches skilled workers with employers across Pakistan's informal labor market. I designed the identity verification pipeline, combining CNIC OCR with face matching so workers can be onboarded and trusted without traditional paperwork, alongside an AI-driven job-worker matching engine that factors in fraud-detection signals to keep the marketplace safe. To reach workers with low digital literacy, the platform also includes an AI/IVR calling bot so people can register and get matched over a simple phone call, not just through the web or mobile app. A core part of my research on this project looks at cross-modality consistency, making sure identity signals extracted from a CNIC, a live photo, and a voice call all agree with each other before trust is granted.",
    tech: ["Next.js", "Supabase", "Python", "Computer Vision", "NLP"],
    status: "In Progress",
    featured: true,
  },
  {
    slug: "bioxplain",
    title: "BioXplain",
    blurb: "Explainable gene-expression disease classification using SHAP.",
    description:
      "A research project that grew out of my background in Biology, applying SHAP-based explainability to gene-expression-based disease classification. I compared how several classical ML classifiers, including logistic regression, random forest, XGBoost, and SVM, arrive at their predictions, rather than only comparing how accurate they are. The focus is on whether the feature attributions each model produces stay stable and biologically plausible across models, since a model that is accurate but points to the wrong genes is far less useful in a biomedical setting than one that is both accurate and explainable.",
    tech: ["Python", "Scikit-learn", "XGBoost", "SHAP"],
    status: "Research",
    featured: true,
  },
  {
    slug: "multi-modal-health-assistant",
    title: "Multi-Modal Health Assistant",
    blurb: "Explainable diabetes-risk assessment combining structured data and NLP.",
    description:
      "An AI-powered health assessment system I built with Python, LangChain, and Streamlit, combining structured health data (things like BMI, age, and blood glucose) with NLP-based analysis of a user's described symptoms to deliver a diabetes-risk prediction. Rather than returning a single opaque score, the assistant explains which factors drove the assessment and pairs that with personalized recommendations, so the output is something a user can actually understand and act on.",
    tech: ["Python", "LangChain", "Streamlit", "NLP"],
    status: "Live",
    featured: true,
  },
  {
    slug: "careerai",
    title: "CareerAI",
    blurb: "AI-driven career guidance with skill-gap analysis.",
    description:
      "A career guidance web app built with Next.js, React, and TypeScript, wired up to AI APIs to analyze a user's profile and recommend personalized career paths. It runs a skill-gap analysis against a user's target role, then surfaces relevant learning resources for exactly the skills they're missing, turning a vague \"what should I learn next\" question into a concrete, prioritized plan.",
    tech: ["Next.js", "React", "TypeScript", "AI APIs"],
    status: "Live",
  },
];
