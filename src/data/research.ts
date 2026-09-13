export type Publication = {
  authors: string;
  title: string;
  venue: string;
  year: string;
  status: "Published" | "Under Review";
  href?: string;
};

export const publications: Publication[] = [
  {
    authors: "Majeed, M. K., Dawood, O. B., Baig, H., Siddique, M. E., Zia, A., & Ahmad, E.",
    title:
      "Privacy-Preserving Federated Learning Framework Using Differential Privacy, Byzantine-Resilient Aggregation, and Carbon-Aware Distributed Training for Secure, Fair, and Sustainable Artificial Intelligence",
    venue: "International Journal of Advanced Research, 3(4), 347–371",
    year: "2026",
    status: "Published",
  },
  {
    authors: "Baig, H., & Dawood, O. B.",
    title: "The Role of Artificial Intelligence in Early Disease Detection and Diagnosis",
    venue: "Manuscript under review",
    year: "2026",
    status: "Under Review",
  },
];

export const researchInterests = [
  "Trustworthy & explainable machine learning",
  "Robustness under real-world distribution shift",
  "Privacy-preserving & federated learning",
  "Healthcare & biomedical AI",
];
