import { useCV } from "@/core/components/cv-generator/cv-context";

export function MinimalTemplate() {
  const { cvData, getColorClass } = useCV();
  const colorClass = getColorClass();
  const accentColor = colorClass.includes("from-")
    ? colorClass.replace("from-", "text-")
    : "text-gray-800";

  return (
    <div className="flex flex-col h-full p-8 bg-white text-gray-800">
      {/* Header */}
      <header className="mb-8 pb-4 border-b border-gray-200">
        <h1 className="text-3xl font-bold">{cvData.personalInfo.name}</h1>
        <h2 className={`text-xl mt-1 ${accentColor}`}>
          {cvData.personalInfo.title}
        </h2>

        <div className="mt-4 flex flex-wrap gap-4 text-sm text-gray-600">
          <div>{cvData.personalInfo.email}</div>
          <div>{cvData.personalInfo.phone}</div>
          <div>{cvData.personalInfo.location}</div>
          {cvData.personalInfo.website && (
            <div>{cvData.personalInfo.website}</div>
          )}
        </div>
      </header>

      {/* Content */}
      <div className="flex-1">
        {/* Summary */}
        <section className="mb-6">
          <h3 className={`text-lg font-bold mb-2 ${accentColor}`}>Profile</h3>
          <p className="text-gray-700">{cvData.personalInfo.summary}</p>
        </section>

        {/* Experience */}
        <section className="mb-6">
          <h3 className={`text-lg font-bold mb-4 ${accentColor}`}>
            Experience
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
                <p className="mt-2 text-sm text-gray-700">{exp.description}</p>

                {exp.achievements.length > 0 && (
                  <ul className="mt-2 list-disc pl-5 text-sm text-gray-700">
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
          <h3 className={`text-lg font-bold mb-4 ${accentColor}`}>Education</h3>

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
                  <p className="mt-2 text-sm text-gray-700">
                    {edu.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>

        <div className="flex gap-6">
          <div className="w-1/2">
            {/* Skills */}
            <section className="mb-6">
              <h3 className={`text-lg font-bold mb-4 ${accentColor}`}>
                Skills
              </h3>

              <ul className="list-disc pl-5 text-sm text-gray-700 space-y-1">
                {cvData.skills.map((skill, index) => (
                  <li key={index}>{skill}</li>
                ))}
              </ul>
            </section>

            {/* Languages */}
            {cvData.languages.length > 0 && (
              <section className="mb-6">
                <h3 className={`text-lg font-bold mb-4 ${accentColor}`}>
                  Languages
                </h3>

                <ul className="list-disc pl-5 text-sm text-gray-700 space-y-1">
                  {cvData.languages.map((lang, index) => (
                    <li key={index}>
                      {lang.language} ({lang.proficiency})
                    </li>
                  ))}
                </ul>
              </section>
            )}
          </div>

          <div className="w-1/2">
            {/* Projects */}
            {cvData.projects.length > 0 && (
              <section className="mb-6">
                <h3 className={`text-lg font-bold mb-4 ${accentColor}`}>
                  Projects
                </h3>

                <div className="space-y-3">
                  {cvData.projects.map((project) => (
                    <div key={project.id}>
                      <h4 className="font-bold">{project.title}</h4>
                      <p className="mt-1 text-sm text-gray-700">
                        {project.description}
                      </p>

                      {project.technologies.length > 0 && (
                        <div className="mt-1 text-sm text-gray-600">
                          Technologies: {project.technologies.join(", ")}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Certifications */}
            {cvData.certifications.length > 0 && (
              <section className="mb-6">
                <h3 className={`text-lg font-bold mb-4 ${accentColor}`}>
                  Certifications
                </h3>

                <ul className="list-disc pl-5 text-sm text-gray-700 space-y-1">
                  {cvData.certifications.map((cert) => (
                    <li key={cert.id}>
                      {cert.name} - {cert.issuer}, {cert.date}
                    </li>
                  ))}
                </ul>
              </section>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
