import { useCV } from "@/core/components/cv-generator/cv-context";

export function ProfessionalTemplate() {
  const { cvData, getColorClass } = useCV();
  const colorClass = getColorClass();

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <header className="p-8 text-center border-b-4 border-gray-200">
        <h1
          className={`text-3xl font-bold text-gradient-to-r ${colorClass} bg-clip-text text-transparent`}
        >
          {cvData.personalInfo.name}
        </h1>
        <h2 className="text-xl mt-1 text-gray-600">
          {cvData.personalInfo.title}
        </h2>

        <div className="mt-4 flex flex-wrap justify-center gap-4 text-sm text-gray-600">
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
        <div className="w-full">
          {/* Summary */}
          <section className="mb-6">
            <h3
              className={`text-lg font-bold mb-2 border-b-2 pb-1 ${
                colorClass.includes("from-")
                  ? colorClass.replace("from-", "border-")
                  : "border-gray-300"
              }`}
            >
              Professional Summary
            </h3>
            <p>{cvData.personalInfo.summary}</p>
          </section>

          {/* Experience */}
          <section className="mb-6">
            <h3
              className={`text-lg font-bold mb-4 border-b-2 pb-1 ${
                colorClass.includes("from-")
                  ? colorClass.replace("from-", "border-")
                  : "border-gray-300"
              }`}
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
              className={`text-lg font-bold mb-4 border-b-2 pb-1 ${
                colorClass.includes("from-")
                  ? colorClass.replace("from-", "border-")
                  : "border-gray-300"
              }`}
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

          {/* Skills */}
          <section className="mb-6">
            <h3
              className={`text-lg font-bold mb-4 border-b-2 pb-1 ${
                colorClass.includes("from-")
                  ? colorClass.replace("from-", "border-")
                  : "border-gray-300"
              }`}
            >
              Skills
            </h3>

            <div className="flex flex-wrap gap-2">
              {cvData.skills.map((skill, index) => (
                <span
                  key={index}
                  className="inline-block rounded border border-gray-300 px-3 py-1 text-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
          </section>

          <div className="flex gap-6">
            <div className="w-1/2">
              {/* Languages */}
              {cvData.languages.length > 0 && (
                <section className="mb-6">
                  <h3
                    className={`text-lg font-bold mb-4 border-b-2 pb-1 ${
                      colorClass.includes("from-")
                        ? colorClass.replace("from-", "border-")
                        : "border-gray-300"
                    }`}
                  >
                    Languages
                  </h3>

                  <ul className="space-y-2">
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
            </div>

            <div className="w-1/2">
              {/* Certifications */}
              {cvData.certifications.length > 0 && (
                <section className="mb-6">
                  <h3
                    className={`text-lg font-bold mb-4 border-b-2 pb-1 ${
                      colorClass.includes("from-")
                        ? colorClass.replace("from-", "border-")
                        : "border-gray-300"
                    }`}
                  >
                    Certifications
                  </h3>

                  <ul className="space-y-3">
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
          </div>

          {/* Projects */}
          {cvData.projects.length > 0 && (
            <section className="mb-6">
              <h3
                className={`text-lg font-bold mb-4 border-b-2 pb-1 ${
                  colorClass.includes("from-")
                    ? colorClass.replace("from-", "border-")
                    : "border-gray-300"
                }`}
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
                        <span className="text-sm text-gray-600">
                          Technologies:{" "}
                        </span>
                        <span className="text-sm">
                          {project.technologies.join(", ")}
                        </span>
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
  );
}
