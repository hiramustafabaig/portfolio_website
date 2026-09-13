export type Certification = {
  title: string;
  issuer: string;
};

export const certifications: Certification[] = [
  { title: "Introduction to SQL", issuer: "Kaggle" },
  { title: "Introduction to Networks", issuer: "Cisco" },
  { title: "Data Analytics", issuer: "Coursera (Google)" },
  { title: "Build AI Agents Using LangGraph", issuer: "Simplilearn" },
  { title: "Power BI for Beginners", issuer: "Microsoft" },
];

export type Activity = {
  role: string;
  org: string;
  period: string;
};

export const activities: Activity[] = [
  { role: "Vice President", org: "Industrial Liaison Cell, COMSATS University Islamabad", period: "2026" },
  { role: "Design Team Member", org: "Data Science Society, COMSATS University Islamabad", period: "2025" },
  { role: "Event Management Co-Head", org: "Hult Prize Foundation & Industrial Liaison Cell", period: "2025" },
];

export const hobbies: string[] = [
  "Photography & Videography",
  "Reading",
  "Hiking",
  "Cooking",
  "Traveling",
  "Chess",
];
