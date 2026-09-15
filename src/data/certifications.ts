export type Certification = {
  title: string;
  issuer: string;
  href?: string;
};

export const certifications: Certification[] = [
  { title: "Introduction to SQL", issuer: "Kaggle" },
  { title: "Introduction to Networks", issuer: "Cisco" },
  {
    title: "Data Analytics",
    issuer: "Coursera (Google)",
    href: "https://www.linkedin.com/safety/go/?url=https%3A%2F%2Fwww%2Ecoursera%2Eorg%2Faccount%2Faccomplishments%2Frecords%2F3KWLO2DD6BUP&urlhash=1FgY&mt=YpWGra8yfvFOnWy3an90XJuxridFb2ErabrpDpnYUHxHpf3u8Ad33r5n1KATtopygVGzNPvwo3hkYuLlWmh8kcPwxkU5&isSdui=true",
  },
  {
    title: "Build AI Agents Using LangGraph",
    issuer: "Simplilearn",
    href: "https://www.linkedin.com/posts/hira-baig-195b13338_ai-langgraph-langchain-activity-7359281329437376512-Ky5h?utm_source=share&utm_medium=member_android&rcm=ACoAAFTh6kEBOAaQuTpX4jJSRzKg6RxjZPuK-aw",
  },
  { title: "Power BI for Beginners", issuer: "Microsoft" },
];

export type Activity = {
  role: string;
  org: string;
  period: string;
  href?: string;
};

export const activities: Activity[] = [
  {
    role: "Vice President",
    org: "Industrial Liaison Cell, COMSATS University Islamabad",
    period: "2026",
    href: "https://www.linkedin.com/posts/industrial-liaison-cell_meet-hira-baig-our-student-body-co-lead-activity-7429970404187762688-eyyY?utm_source=share&utm_medium=member_android&rcm=ACoAAFTh6kEBOAaQuTpX4jJSRzKg6RxjZPuK-aw",
  },
  { role: "Design Team Member", org: "Data Science Society, COMSATS University Islamabad", period: "2025" },
  {
    role: "Event Management Co-Head",
    org: "Hult Prize Foundation",
    period: "2025",
    href: "https://www.linkedin.com/posts/hira-baig-195b13338_eventmanagement-ilc-comsats-activity-7366038285661413377-i8We?utm_source=social_share_video_v2&utm_medium=android_app&rcm=ACoAAFTh6kEBOAaQuTpX4jJSRzKg6RxjZPuK-aw&utm_campaign=copy_link",
  },
  {
    role: "Event Management Co-Lead",
    org: "Industrial Liaison Cell, COMSATS University Islamabad",
    period: "2025",
    href: "https://www.linkedin.com/posts/hira-baig-195b13338_eventmanagement-ilc-comsats-activity-7366038285661413377-i8We?utm_source=social_share_video_v2&utm_medium=android_app&rcm=ACoAAFTh6kEBOAaQuTpX4jJSRzKg6RxjZPuK-aw&utm_campaign=copy_link",
  },
];
