export const defaultCVData = {
  personalInfo: {
    name: "John Smith",
    title: "Senior Frontend Developer",
    email: "john.smith@example.com",
    phone: "+1 (555) 123-4567",
    location: "San Francisco, CA",
    website: "johnsmith.dev",
    summary:
      "Experienced frontend developer with 8+ years of expertise in building responsive and user-friendly web applications. Proficient in React, Next.js, and modern JavaScript frameworks.",
  },
  experience: [
    {
      id: "exp1",
      company: "TechCorp Inc.",
      position: "Senior Frontend Developer",
      location: "San Francisco, CA",
      startDate: "2020-01",
      endDate: "Present",
      current: true,
      description:
        "Led the development of the company's flagship product, a cloud-based SaaS platform. Implemented new features, improved performance, and mentored junior developers.",
      achievements: [
        "Reduced page load time by 40% through code optimization and lazy loading",
        "Implemented a component library that increased development speed by 30%",
        "Led a team of 5 developers to deliver projects on time and within budget",
      ],
    },
    {
      id: "exp2",
      company: "Digital Solutions",
      position: "Frontend Developer",
      location: "New York, NY",
      startDate: "2018-03",
      endDate: "2019-12",
      current: false,
      description:
        "Developed and maintained multiple client websites and web applications using React and Redux.",
      achievements: [
        "Created responsive designs that improved mobile user engagement by 25%",
        "Collaborated with UX designers to implement intuitive user interfaces",
        "Integrated third-party APIs for payment processing and data visualization",
      ],
    },
  ],
  education: [
    {
      id: "edu1",
      institution: "University of California, Berkeley",
      degree: "Bachelor of Science in Computer Science",
      location: "Berkeley, CA",
      startDate: "2014-09",
      endDate: "2018-05",
      description:
        "Graduated with honors. Focused on web development and user interface design.",
    },
  ],
  skills: [
    "JavaScript",
    "TypeScript",
    "React",
    "Next.js",
    "HTML5",
    "CSS3",
    "Tailwind CSS",
    "Redux",
    "Node.js",
    "Git",
    "Responsive Design",
    "UI/UX",
    "RESTful APIs",
    "GraphQL",
    "Jest",
    "Webpack",
  ],
  languages: [
    { language: "English", proficiency: "Native" },
    { language: "Spanish", proficiency: "Intermediate" },
  ],
  projects: [
    {
      id: "proj1",
      title: "E-commerce Platform",
      description:
        "A full-featured e-commerce platform with product management, cart functionality, and payment processing.",
      technologies: ["React", "Node.js", "MongoDB", "Stripe API"],
      link: "https://example.com/project1",
    },
  ],
  certifications: [
    {
      id: "cert1",
      name: "AWS Certified Developer",
      issuer: "Amazon Web Services",
      date: "2021-06",
      link: "https://example.com/certification1",
    },
  ],
};

export const templateOptions = [
  { value: "modern", label: "Modern" },
  { value: "professional", label: "Professional" },
  { value: "creative", label: "Creative" },
  { value: "minimal", label: "Minimal" },
  { value: "executive", label: "Executive" },
];

export const colorSchemeOptions = [
  { value: "gradient", label: "Gradient (Cyan to Violet)" },
  { value: "blue", label: "Blue" },
  { value: "green", label: "Green" },
  { value: "purple", label: "Purple" },
  { value: "monochrome", label: "Monochrome" },
];

export const fontSizeOptions = [
  { value: "small", label: "Small" },
  { value: "medium", label: "Medium" },
  { value: "large", label: "Large" },
];
