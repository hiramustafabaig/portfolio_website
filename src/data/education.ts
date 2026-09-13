export type EducationEntry = {
  degree: string;
  institution: string;
  period: string;
  description: string;
};

export const education: EducationEntry[] = [
  {
    degree: "BS Data Science",
    institution: "COMSATS University Islamabad",
    period: "2023 – Expected Feb 2027",
    description:
      "Focused on machine learning, AI, and data engineering. Research on federated learning and healthcare AI; final-year project QaamQaaj.",
  },
  {
    degree: "FSc Pre-Medical",
    institution: "Islamabad Model College for Girls, F-7/2",
    period: "2019 – 2021",
    description: "Distinction in Biology, the foundation for my continued interest in healthcare and biomedical AI.",
  },
  {
    degree: "Matriculation in Science",
    institution: "The Educators School",
    period: "2017 – 2019",
    description: "Early exposure to programming and mathematics.",
  },
];

export type ExperienceEntry = {
  role: string;
  org: string;
  period: string;
  description: string;
};

export const experience: ExperienceEntry[] = [
  {
    role: "Online Tutor",
    org: "Nexus Academy (UK)",
    period: "Sep 2026 – Present",
    description: "Selected to deliver Biology and Computer Science tutoring to IGCSE and A-Level students.",
  },
  {
    role: "Private Tutor, Biology & Computer Science",
    org: "Online",
    period: "2023 – Present",
    description: "Mentored 10+ international students one-on-one through concept-based, personalized instruction.",
  },
  {
    role: "Biology Teacher",
    org: "Encore Star Academy",
    period: "Aug 2023 – Feb 2025",
    description: "Delivered concept-driven Biology instruction to FSc and A-Level students through interactive, student-centered methods.",
  },
  {
    role: "Freelance Web Developer",
    org: "Upwork & Fiverr",
    period: "Jul 2021 – Jan 2023",
    description: "Delivered end-to-end web development, graphic design, and video editing solutions for international clients.",
  },
];
