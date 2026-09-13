export type Blog = {
  title: string;
  description: string;
  href: string;
  image?: string;
};

export const blogs: Blog[] = [
  {
    title: "The Power of Data Science",
    description: "An exploration of how data science is reshaping decision-making across industries.",
    href: "/The%20Power%20of%20Data%20Science%20by%20Hira%20Baig.pdf",
    image: "/images/blogs/datascience.jpg",
  },
  {
    title: "The Evolution of Operating Systems in the Age of Artificial Intelligence",
    description: "Tracing how operating systems are adapting as AI becomes a first-class workload.",
    href: "/The%20Evolution%20of%20Operating%20Systems%20in%20the%20Age%20of%20Artificial%20Intelligence%20by%20Hira%20Baig.pdf",
    image: "/images/blogs/os.webp",
  },
];
