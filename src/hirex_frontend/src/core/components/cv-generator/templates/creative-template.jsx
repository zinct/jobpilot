import { useCV } from "@/core/components/cv-generator/cv-context";

export function CreativeTemplate() {
  const { cvData, getColorClass } = useCV();
  const colorClass = getColorClass();

  return (
    <div className="flex h-full">
      {/* Sidebar */}
      <div className={`w-1/3 bg-gradient-to-b ${colorClass} p-8 text-white`}>
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold">{cvData.personalInfo.name}</h1>
          <h2 className="text-xl mt-1">{cvData.personalInfo.title}</h2>
        </div>

        <div className="mb-8">
          <h3 className="text-lg font-bold mb-4 border-b border-white/30 pb-2">
            Contact
          </h3>
          <ul className="space-y-2 text-sm">
            <li>{cvData.personalInfo.email}</li>
            <li>{cvData.personalInfo.phone}</li>
            <li>{cvData.personalInfo.location}</li>
            {cvData.personalInfo.website && (
              <li>{cvData.personalInfo.website}</li>
            )}
          </ul>
        </div>

        <div className="mb-8">
          <h3 className="text-lg font-bold mb-4 border-b border-white/30 pb-2">
            Skills
          </h3>
          <div className="flex flex-wrap gap-2">
            {cvData.skills.map((skill, index) => (
              <span
                key={index}
                className="inline-block rounded-full bg-white/20 px-3 py-1 text-sm"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {cvData.languages.length > 0 && (
          <div className="mb-8">
            <h3 className="text-lg font-bold mb-4 border-b border-white/30 pb-2">
              Languages
            </h3>
            <ul className="space-y-2">
              {cvData.languages.map((lang, index) => (
                <li key={index} className="flex justify-between">
                  <span>{lang.language}</span>
                  <span className="text-white/70">{lang.proficiency}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {cvData.certifications.length > 0 && (
          <div>
            <h3 className="text-lg font-bold mb-4 border-b border-white/30 pb-2">
              Certifications
            </h3>
            <ul className="space-y-3">
              {cvData.certifications.map((cert) => (
                <li key={cert.id}>
                  <div className="font-medium">{cert.name}</div>
                  <div className="text-sm text-white/70">{cert.issuer}</div>
                  <div className="text-sm text-white/70">{cert.date}</div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="w-2/3 p-8 bg-white text-gray-800">
        <section className="mb-8">
          <h3
            className={`text-2xl font-bold mb-4 text-gradient-to-r ${colorClass} bg-clip-text text-transparent`}
          >
            About Me
          </h3>
          <p>{cvData.personalInfo.summary}</p>
        </section>

        <section className="mb-8">
          <h3
            className={`text-2xl font-bold mb-4 text-gradient-to-r ${colorClass} bg-clip-text text-transparent`}
          >
            Experience
          </h3>

          <div className="space-y-6">
            {cvData.experience.map((exp) => (
              <div
                key={exp.id}
                className="relative pl-6 before:absolute before:left-0 before:top-0 before:bottom-0 before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-gray-300 before:to-transparent"
              >
                <div className="flex justify-between">
                  <h4 className="font-bold">{exp.position}</h4>
                  <div className="text-sm text-gray-600">
                    {exp.startDate} - {exp.current ? "Present" : exp.endDate}
                  </div>
                </div>
                <div className="text-sm font-medium">
                  {exp.company}, {exp.location}
                </div>
                <p className="mt-2 text-sm">{exp.description}</p>

                {exp.achievements.length > 0 && (
                  <ul className="mt-2 list-disc pl-5 text-sm">
                    {exp.achievements.map((achievement, index) => (
                      <li key={index}>{achievement}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </section>

        <section className="mb-8">
          <h3
            className={`text-2xl font-bold mb-4 text-gradient-to-r ${colorClass} bg-clip-text text-transparent`}
          >
            Education
          </h3>

          <div className="space-y-4">
            {cvData.education.map((edu) => (
              <div
                key={edu.id}
                className="relative pl-6 before:absolute before:left-0 before:top-0 before:bottom-0 before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-gray-300 before:to-transparent"
              >
                <div className="flex justify-between">
                  <h4 className="font-bold">{edu.degree}</h4>
                  <div className="text-sm text-gray-600">
                    {edu.startDate} - {edu.endDate}
                  </div>
                </div>
                <div className="text-sm font-medium">
                  {edu.institution}, {edu.location}
                </div>
                {edu.description && (
                  <p className="mt-2 text-sm">{edu.description}</p>
                )}
              </div>
            ))}
          </div>
        </section>

        {cvData.projects.length > 0 && (
          <section>
            <h3
              className={`text-2xl font-bold mb-4 text-gradient-to-r ${colorClass} bg-clip-text text-transparent`}
            >
              Projects
            </h3>

            <div className="space-y-4">
              {cvData.projects.map((project) => (
                <div
                  key={project.id}
                  className="relative pl-6 before:absolute before:left-0 before:top-0 before:bottom-0 before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-gray-300 before:to-transparent"
                >
                  <h4 className="font-bold">{project.title}</h4>
                  <p className="mt-1 text-sm">{project.description}</p>

                  {project.technologies.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-1">
                      {project.technologies.map((tech, index) => (
                        <span
                          key={index}
                          className={`inline-block rounded-full bg-gradient-to-r ${colorClass} bg-opacity-10 px-2 py-0.5 text-xs`}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
