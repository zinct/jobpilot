import { useCV } from "@/core/components/cv-generator/cv-context";

export function ExecutiveTemplate() {
  const { cvData, getColorClass } = useCV();
  const colorClass = getColorClass();

  return (
    <div className="flex flex-col h-full bg-white text-gray-800">
      {/* Header */}
      <header className="p-8 border-b-8 border-gray-800">
        <h1 className="text-4xl font-bold uppercase tracking-wider">
          {cvData.personalInfo.name}
        </h1>
        <h2
          className={`text-xl mt-1 uppercase tracking-wide text-gradient-to-r ${colorClass} bg-clip-text text-transparent`}
        >
          {cvData.personalInfo.title}
        </h2>

        <div className="mt-4 flex flex-wrap gap-6 text-sm">
          <div>{cvData.personalInfo.email}</div>
          <div>{cvData.personalInfo.phone}</div>
          <div>{cvData.personalInfo.location}</div>
          {cvData.personalInfo.website && (
            <div>{cvData.personalInfo.website}</div>
          )}
        </div>
      </header>

      {/* Content */}
      <div className="flex flex-1 p-8">
        <div className="w-full">
          {/* Summary */}
          <section className="mb-8">
            <h3 className="text-xl font-bold uppercase tracking-wider mb-4 border-b-2 border-gray-300 pb-1">
              Executive Summary
            </h3>
            <p className="text-gray-700">{cvData.personalInfo.summary}</p>
          </section>

          {/* Experience */}
          <section className="mb-8">
            <h3 className="text-xl font-bold uppercase tracking-wider mb-6 border-b-2 border-gray-300 pb-1">
              Professional Experience
            </h3>

            <div className="space-y-6">
              {cvData.experience.map((exp) => (
                <div key={exp.id}>
                  <div className="flex justify-between items-center">
                    <h4 className="text-lg font-bold">{exp.position}</h4>
                    <div className="text-sm font-medium">
                      {exp.startDate} - {exp.current ? "Present" : exp.endDate}
                    </div>
                  </div>
                  <div
                    className={`text-base font-medium text-gradient-to-r ${colorClass} bg-clip-text text-transparent`}
                  >
                    {exp.company}, {exp.location}
                  </div>
                  <p className="mt-2 text-gray-700">{exp.description}</p>

                  {exp.achievements.length > 0 && (
                    <ul className="mt-3 space-y-1">
                      {exp.achievements.map((achievement, index) => (
                        <li key={index} className="flex items-start">
                          <span className="mr-2 text-gray-500">•</span>
                          <span>{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </section>

          <div className="flex gap-8">
            <div className="w-1/2">
              {/* Education */}
              <section className="mb-8">
                <h3 className="text-xl font-bold uppercase tracking-wider mb-4 border-b-2 border-gray-300 pb-1">
                  Education
                </h3>

                <div className="space-y-4">
                  {cvData.education.map((edu) => (
                    <div key={edu.id}>
                      <h4 className="font-bold">{edu.degree}</h4>
                      <div className="text-sm font-medium">
                        {edu.institution}, {edu.location}
                      </div>
                      <div className="text-sm text-gray-600">
                        {edu.startDate} - {edu.endDate}
                      </div>
                      {edu.description && (
                        <p className="mt-1 text-sm text-gray-700">
                          {edu.description}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </section>

              {/* Certifications */}
              {cvData.certifications.length > 0 && (
                <section className="mb-8">
                  <h3 className="text-xl font-bold uppercase tracking-wider mb-4 border-b-2 border-gray-300 pb-1">
                    Certifications
                  </h3>

                  <ul className="space-y-2">
                    {cvData.certifications.map((cert) => (
                      <li key={cert.id}>
                        <div className="font-medium">{cert.name}</div>
                        <div className="text-sm text-gray-600">
                          {cert.issuer}, {cert.date}
                        </div>
                      </li>
                    ))}
                  </ul>
                </section>
              )}
            </div>

            <div className="w-1/2">
              {/* Skills */}
              <section className="mb-8">
                <h3 className="text-xl font-bold uppercase tracking-wider mb-4 border-b-2 border-gray-300 pb-1">
                  Core Competencies
                </h3>

                <div className="grid grid-cols-2 gap-2">
                  {cvData.skills.map((skill, index) => (
                    <div key={index} className="flex items-center">
                      <span
                        className={`mr-2 text-gradient-to-r ${colorClass} bg-clip-text text-transparent`}
                      >
                        •
                      </span>
                      <span>{skill}</span>
                    </div>
                  ))}
                </div>
              </section>

              {/* Languages */}
              {cvData.languages.length > 0 && (
                <section className="mb-8">
                  <h3 className="text-xl font-bold uppercase tracking-wider mb-4 border-b-2 border-gray-300 pb-1">
                    Languages
                  </h3>

                  <ul className="space-y-1">
                    {cvData.languages.map((lang, index) => (
                      <li key={index} className="flex justify-between">
                        <span>{lang.language}</span>
                        <span className="text-gray-600">
                          {lang.proficiency}
                        </span>
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              {/* Projects */}
              {cvData.projects.length > 0 && (
                <section className="mb-8">
                  <h3 className="text-xl font-bold uppercase tracking-wider mb-4 border-b-2 border-gray-300 pb-1">
                    Key Projects
                  </h3>

                  <div className="space-y-3">
                    {cvData.projects.map((project) => (
                      <div key={project.id}>
                        <h4 className="font-bold">{project.title}</h4>
                        <p className="mt-1 text-sm text-gray-700">
                          {project.description}
                        </p>

                        {project.technologies.length > 0 && (
                          <div className="mt-1 text-sm text-gray-600 italic">
                            Technologies: {project.technologies.join(", ")}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </section>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
