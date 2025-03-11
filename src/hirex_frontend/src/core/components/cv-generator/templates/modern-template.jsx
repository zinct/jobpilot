import { useCV } from "@/core/components/cv-generator/cv-context";

export function ModernTemplate() {
  const { cvData, getColorClass } = useCV();
  const colorClass = getColorClass();

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <header className={`bg-gradient-to-r ${colorClass} p-8 text-white`}>
        <h1 className="text-3xl font-bold">{cvData.personalInfo.name}</h1>
        <h2 className="text-xl mt-1">{cvData.personalInfo.title}</h2>

        <div className="mt-4 flex flex-wrap gap-4 text-sm">
          <div>{cvData.personalInfo.email}</div>
          <div>{cvData.personalInfo.phone}</div>
          <div>{cvData.personalInfo.location}</div>
          {cvData.personalInfo.website && (
            <div>{cvData.personalInfo.website}</div>
          )}
        </div>
      </header>

      {/* Content */}
      <div className="flex flex-1 p-8 text-gray-800">
        <div className="w-2/3 pr-8">
          {/* Summary */}
          <section className="mb-6">
            <h3
              className={`text-lg font-bold mb-2 text-gradient-to-r ${colorClass} bg-clip-text text-transparent`}
            >
              Professional Summary
            </h3>
            <p>{cvData.personalInfo.summary}</p>
          </section>

          {/* Experience */}
          <section className="mb-6">
            <h3
              className={`text-lg font-bold mb-4 text-gradient-to-r ${colorClass} bg-clip-text text-transparent`}
            >
              Work Experience
            </h3>

            <div className="space-y-4">
              {cvData.experience.map((exp) => (
                <div key={exp.id}>
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

          {/* Education */}
          <section className="mb-6">
            <h3
              className={`text-lg font-bold mb-4 text-gradient-to-r ${colorClass} bg-clip-text text-transparent`}
            >
              Education
            </h3>

            <div className="space-y-4">
              {cvData.education.map((edu) => (
                <div key={edu.id}>
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

          {/* Projects */}
          {cvData.projects.length > 0 && (
            <section className="mb-6">
              <h3
                className={`text-lg font-bold mb-4 text-gradient-to-r ${colorClass} bg-clip-text text-transparent`}
              >
                Projects
              </h3>

              <div className="space-y-4">
                {cvData.projects.map((project) => (
                  <div key={project.id}>
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

                    {project.link && (
                      <div className="mt-1 text-sm">
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`text-gradient-to-r ${colorClass} bg-clip-text text-transparent`}
                        >
                          View Project
                        </a>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        <div className="w-1/3">
          {/* Skills */}
          <section className="mb-6">
            <h3
              className={`text-lg font-bold mb-4 text-gradient-to-r ${colorClass} bg-clip-text text-transparent`}
            >
              Skills
            </h3>

            <div className="flex flex-wrap gap-2">
              {cvData.skills.map((skill, index) => (
                <span
                  key={index}
                  className={`inline-block rounded-full bg-gradient-to-r ${colorClass} bg-opacity-10 px-3 py-1 text-sm`}
                >
                  {skill}
                </span>
              ))}
            </div>
          </section>

          {/* Languages */}
          {cvData.languages.length > 0 && (
            <section className="mb-6">
              <h3
                className={`text-lg font-bold mb-4 text-gradient-to-r ${colorClass} bg-clip-text text-transparent`}
              >
                Languages
              </h3>

              <ul className="space-y-2">
                {cvData.languages.map((lang, index) => (
                  <li key={index} className="flex justify-between">
                    <span>{lang.language}</span>
                    <span className="text-gray-600">{lang.proficiency}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Certifications */}
          {cvData.certifications.length > 0 && (
            <section className="mb-6">
              <h3
                className={`text-lg font-bold mb-4 text-gradient-to-r ${colorClass} bg-clip-text text-transparent`}
              >
                Certifications
              </h3>

              <ul className="space-y-3">
                {cvData.certifications.map((cert) => (
                  <li key={cert.id}>
                    <div className="font-medium">{cert.name}</div>
                    <div className="text-sm text-gray-600">{cert.issuer}</div>
                    <div className="text-sm text-gray-600">{cert.date}</div>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}
