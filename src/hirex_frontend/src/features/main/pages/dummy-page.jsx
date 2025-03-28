import { Actor } from "@dfinity/agent";
import { useEffect, useState } from "react";
import { hirex_backend } from "declarations/hirex_backend";
import { useAuth } from "../../../core/providers/auth-provider";
import { optValue, toUnixTimestamps } from "../../../core/utils/canisterUtils";

const resume = {
  projects: [
    [
      {
        id: ["proj1742715874998"],
        title: [" BRI Chatbot"],
        link: [""],
        description: ["BRI Chatbot merupakan Whatsapp Chat bot yang berfungsi untuk memudahkan layanan transaksi pada merchant BRI, dan menyediakan layanan PPOB."],
        technologies: [["React", "Next.js", "TypeScript"]],
      },
    ],
  ],
  education: [
    [
      {
        id: ["educ1742715721129"],
        endDate: ["2020-02-23"],
        institution: ["SMK Bakti Nusantara 666"],
        description: ["• Served as the Head of Section 9 (Information and Communication Technology) in the student council (OSIS).\n• Held the position of Head of the Communication and Information Division at the West Java Student Council Forum.\n• Secured funding in the School Entrepreneurship Program."],
        degree: ["Computer Software Engineering"],
        location: ["Bandung"],
        startDate: ["2023-02-07"],
      },
      {
        id: ["educ1742715766457"],
        endDate: ["2026-05-04"],
        institution: ["Telkom University"],
        description: ["• Achieved 2nd place in GEMASTIK XVII, Software Development Division (Kemendikbud).\n• Secured 2nd place in the Blockchain Hackathon for Internet Computer Protocol (Codefest.id).\n• Won 1st place in Motionhack (Motion Innovation Laboratory).\n• Served as Project Manager at Mobile Innovation Laboratory and received the Best Mobile Programmer award.\n• Contributed as a Core Team member in R&D at Google Developer Student Club Telkom University.\n• Becoming speaker at Mobile Development Study Jam GDSC (500+ participants)"],
        degree: ["Computer Software Engineer"],
        location: ["Bandung"],
        startDate: ["2022-06-06"],
      },
    ],
  ],
  languages: [
    [
      {
        id: ["lang1742715839507"],
        language: ["Indonesia"],
        proficiency: ["Native"],
      },
      {
        id: ["lang1742715852889"],
        language: ["English"],
        proficiency: ["Fluent"],
      },
    ],
  ],
  experience: [
    [
      {
        id: ["expe1742715561999"],
        endDate: [""],
        description: [""],
        company: ["Metech.id"],
        achievements: [["Developed custom software solutions (frontend, backend, chatbot) for various clients.", "Involved in the full development lifecycle, from concept to production.", "Applied clean code practices and scalable architecture.", "Flexibly served as a frontend or backend developer as needed for each project."]],
        position: [" Fullstack Web Developer"],
        current: [true],
        location: ["Bandung"],
        startDate: ["2025-01-16"],
      },
    ],
  ],
  updatedAt: "1742715906272002791",
  certifications: [[]],
  personalInfo: [
    {
      title: ["Frontend Developer"],
      name: ["Indra Mahesa"],
      email: ["indramahesa128@gmail.com"],
      website: ["https://zinct.github.io"],
      summary: ["I'm an experienced Software Engineer with over 3 years in developing enterprise applications. With a comprehensive skill set as a fullstack developer, I specialize in backend development and DevOps.\n\nMy expertise in Software Engineering is primarily as a FullStack developer. On the frontend, I use Next.js and React as my main frameworks, while for the backend, I rely on Laravel. I have extensive experience with MySQL and MongoDB databases and use tools like Firebase as an additional solution. Moreover, I'm skilled in Testing, CI/CD, and Containerization with Docker, and I'm also capable of developing mobile applications using Flutter."],
      phone: ["62 81395749557"],
      location: ["Indonesia, Bandung"],
    },
  ],
  skills: [["JavaScript", "TypeScript", "Next.js", "Node.js", "Tailwind CSS", "CSS"]],
};

const user = {
  workMode: "remote",
  yearsOfExperience: "3-5",
  learningStyle: "visual",
  dateOfBirth: "1742947200",
  name: "Indra Mahesa",
  jobRoles: ["Frontend Developer", "Backend Developer", "Software Engineer"],
  companySize: "startup",
  personalityTraits: ["Analytical", "Creative", "Detail-oriented"],
  industriesOfInterest: ["IT"],
  isRegistered: 1,
  educationLevel: "high-school",
  jobLevel: "intern",
  expectedLocation: "Indonesia",
  jobSearchStatus: "active",
};

export function UserDummyPage() {
  const [isLoading, setIsLoading] = useState(false);
  const { identity, isLoading: isAuthLoading, logout } = useAuth();

  async function initialData() {
    setIsLoading(true);
    Actor.agentOf(hirex_backend).replaceIdentity(identity);

    const response = await hirex_backend.register({
      fullName: optValue(user.name),
      workMode: optValue(user.workMode),
      yearsOfExperience: optValue(user.yearsOfExperience),
      dateOfBirth: optValue(toUnixTimestamps(user.dateOfBirth)),
      educationLevel: optValue(user.educationLevel),
      personalityTraits: optValue(user.personalityTraits),
      learningStyle: optValue(user.learningStyle),
      jobRoles: optValue(user.jobRoles),
      jobSearchStatus: optValue(user.jobSearchStatus),
      jobLevel: optValue(user.jobLevel),
      companySize: optValue(user.companySize),
      industriesOfInterest: optValue(user.industriesOfInterest),
      expectedLocation: optValue(user.expectedLocation),
      isRegistered: [1],
    });

    console.log(response);

    setIsLoading(false);
  }

  useEffect(() => {
    if (!identity) return;

    initialData();
  }, [identity]);

  return isLoading || isAuthLoading ? <h2 onClick={initialData}>Loading...</h2> : <h2 onClick={initialData}>Sucess</h2>;
}

function DummyPage() {
  const [isLoading, setIsLoading] = useState(false);
  const { identity, isLoading: isAuthLoading, logout } = useAuth();

  async function initialData() {
    setIsLoading(true);
    Actor.agentOf(hirex_backend).replaceIdentity(identity);
    const response = await hirex_backend.createResume();

    const response2 = await hirex_backend.updateResume({
      resumeId: Number(response.ok),
      personalInfo: resume.personalInfo,
      experience: resume.experience,
      projects: resume.projects,
      certifications: resume.certifications,
      education: resume.education,
      languages: resume.languages,
      skills: resume.skills,
    });

    console.log(response2);
    setIsLoading(false);
  }

  useEffect(() => {
    if (!identity) return;

    initialData();
  }, [identity]);

  return isLoading || isAuthLoading ? <h2 onClick={initialData}>Loading...</h2> : <h2 onClick={initialData}>Sucess</h2>;
}

export default DummyPage;
