import { Briefcase, Building, Globe, Check, Users } from "lucide-react";

export function CareerPreferencesForm({ step, formData, handleChange }) {
  // Define options for each step
  const jobRoles = [
    "Software Engineer",
    "Data Analyst",
    "Product Manager",
    "UX/UI Designer",
    "DevOps Engineer",
    "Project Manager",
    "Marketing Specialist",
    "Sales Representative",
    "Customer Support",
    "HR Specialist",
    "Financial Analyst",
    "Content Writer",
  ];

  const industries = [
    "Aerospace",
    "Automation",
    "Banking",
    "Healthcare",
    "IT",
    "Education",
    "E-commerce",
    "Entertainment",
    "Manufacturing",
    "Retail",
    "Telecommunications",
    "Transportation",
  ];

  const locations = [
    "Indonesia",
    "Australia",
    "United States",
    "Singapore",
    "Japan",
    "United Kingdom",
    "Canada",
    "Germany",
    "India",
    "Remote (Worldwide)",
  ];

  const handleMultiSelect = (field, value) => {
    const currentValues = [...formData[field]];
    if (currentValues.includes(value)) {
      handleChange(
        field,
        currentValues.filter((v) => v !== value)
      );
    } else {
      handleChange(field, [...currentValues, value]);
    }
  };

  // Add validation to each step
  const isStepValid = () => {
    switch (step) {
      case 1: // Job Role Preferences
        return formData.jobRolePreferences.length > 0;
      case 2: // Job Search Status
        return formData.jobSearchStatus !== "";
      case 3: // Role Level
        return formData.roleLevel !== "";
      case 4: // Work Mode
        return formData.workMode !== "";
      case 5: // Company Size
        return formData.companySize !== "";
      case 6: // Industries of Interest
        return formData.industriesOfInterest.length > 0;
      case 7: // Expected Location
        return formData.expectedLocation !== "";
      default:
        return false;
    }
  };

  // Render different form based on step
  switch (step) {
    case 1: // Job Role Preferences
      return (
        <div className="space-y-6">
          <h3 className="text-lg font-medium">Job Role Preferences</h3>
          <p className="text-sm text-gray-400">
            Select the job roles you're interested in (select multiple if
            applicable)
          </p>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {jobRoles.map((role) => (
              <button
                key={role}
                type="button"
                onClick={() => handleMultiSelect("jobRolePreferences", role)}
                className={`flex items-center justify-between rounded-lg border p-3 text-left text-sm transition-colors ${
                  formData.jobRolePreferences.includes(role)
                    ? "border-cyan-400 bg-cyan-950/20 text-cyan-400"
                    : "border-white/10 bg-white/5 text-gray-300 hover:border-white/30"
                }`}
              >
                <span>{role}</span>
                {formData.jobRolePreferences.includes(role) && (
                  <Check className="h-4 w-4 text-cyan-400" />
                )}
              </button>
            ))}
          </div>

          {formData.jobRolePreferences.length === 0 && (
            <div className="rounded-lg border border-amber-400/20 bg-amber-950/20 p-3">
              <p className="text-sm text-amber-400">
                Please select at least one job role to continue
              </p>
            </div>
          )}
        </div>
      );

    case 2: // Job Search Status
      return (
        <div className="space-y-6">
          <h3 className="text-lg font-medium">Job Search Status</h3>
          <p className="text-sm text-gray-400">
            Where are you in your job search?
          </p>

          <div className="space-y-3">
            {[
              {
                value: "active",
                label:
                  "Active Job Seeker (Currently looking for new opportunities)",
              },
              {
                value: "passive",
                label:
                  "Passive Job Seeker (Open to opportunities but not actively looking)",
              },
              {
                value: "not-seeking",
                label: "Not A Job Seeker (Just exploring the platform)",
              },
            ].map((option) => (
              <label
                key={option.value}
                className={`flex cursor-pointer items-center justify-between rounded-lg border p-3 transition-colors ${
                  formData.jobSearchStatus === option.value
                    ? "border-cyan-400 bg-cyan-950/20"
                    : "border-white/10 bg-white/5 hover:border-white/30"
                }`}
              >
                <span
                  className={
                    formData.jobSearchStatus === option.value
                      ? "text-cyan-400"
                      : "text-gray-300"
                  }
                >
                  {option.label}
                </span>
                <input
                  type="radio"
                  name="jobSearchStatus"
                  value={option.value}
                  checked={formData.jobSearchStatus === option.value}
                  onChange={(e) =>
                    handleChange("jobSearchStatus", e.target.value)
                  }
                  className="sr-only"
                />
                <div
                  className={`flex h-5 w-5 items-center justify-center rounded-full border ${
                    formData.jobSearchStatus === option.value
                      ? "border-cyan-400 bg-cyan-400/20"
                      : "border-white/30 bg-transparent"
                  }`}
                >
                  {formData.jobSearchStatus === option.value && (
                    <div className="h-2.5 w-2.5 rounded-full bg-cyan-400"></div>
                  )}
                </div>
              </label>
            ))}
          </div>
          {formData.jobSearchStatus === "" && (
            <div className="rounded-lg border border-amber-400/20 bg-amber-950/20 p-3">
              <p className="text-sm text-amber-400">
                Please select your job search status to continue
              </p>
            </div>
          )}
        </div>
      );

    case 3: // Role Level
      return (
        <div className="space-y-6">
          <h3 className="text-lg font-medium">Role Level</h3>
          <p className="text-sm text-gray-400">
            What level of role are you looking for?
          </p>

          <div className="space-y-3">
            {[
              { value: "intern", label: "Intern" },
              { value: "entry", label: "Entry Level" },
              { value: "junior", label: "Junior" },
              { value: "mid", label: "Mid-Level" },
              { value: "senior", label: "Senior" },
              { value: "lead", label: "Lead/Managerial" },
            ].map((option) => (
              <label
                key={option.value}
                className={`flex cursor-pointer items-center justify-between rounded-lg border p-3 transition-colors ${
                  formData.roleLevel === option.value
                    ? "border-violet-400 bg-violet-950/20"
                    : "border-white/10 bg-white/5 hover:border-white/30"
                }`}
              >
                <span
                  className={
                    formData.roleLevel === option.value
                      ? "text-violet-400"
                      : "text-gray-300"
                  }
                >
                  {option.label}
                </span>
                <input
                  type="radio"
                  name="roleLevel"
                  value={option.value}
                  checked={formData.roleLevel === option.value}
                  onChange={(e) => handleChange("roleLevel", e.target.value)}
                  className="sr-only"
                />
                <div
                  className={`flex h-5 w-5 items-center justify-center rounded-full border ${
                    formData.roleLevel === option.value
                      ? "border-violet-400 bg-violet-400/20"
                      : "border-white/30 bg-transparent"
                  }`}
                >
                  {formData.roleLevel === option.value && (
                    <div className="h-2.5 w-2.5 rounded-full bg-violet-400"></div>
                  )}
                </div>
              </label>
            ))}
          </div>
          {formData.roleLevel === "" && (
            <div className="rounded-lg border border-amber-400/20 bg-amber-950/20 p-3">
              <p className="text-sm text-amber-400">
                Please select your desired role level to continue
              </p>
            </div>
          )}
        </div>
      );

    case 4: // Work Mode
      return (
        <div className="space-y-6">
          <h3 className="text-lg font-medium">Preferred Work Mode</h3>
          <p className="text-sm text-gray-400">
            What type of work environment do you prefer?
          </p>

          <div className="space-y-3">
            {[
              { value: "remote", label: "Remote (Work from anywhere)" },
              { value: "hybrid", label: "Hybrid (Mix of remote and on-site)" },
              { value: "onsite", label: "On-site (Work at the office)" },
            ].map((option) => (
              <label
                key={option.value}
                className={`flex cursor-pointer items-center justify-between rounded-lg border p-3 transition-colors ${
                  formData.workMode === option.value
                    ? "border-cyan-400 bg-cyan-950/20"
                    : "border-white/10 bg-white/5 hover:border-white/30"
                }`}
              >
                <div className="flex items-center gap-3">
                  {option.value === "remote" && (
                    <Globe className="h-5 w-5 text-gray-400" />
                  )}
                  {option.value === "hybrid" && (
                    <Building className="h-5 w-5 text-gray-400" />
                  )}
                  {option.value === "onsite" && (
                    <Briefcase className="h-5 w-5 text-gray-400" />
                  )}
                  <span
                    className={
                      formData.workMode === option.value
                        ? "text-cyan-400"
                        : "text-gray-300"
                    }
                  >
                    {option.label}
                  </span>
                </div>
                <input
                  type="radio"
                  name="workMode"
                  value={option.value}
                  checked={formData.workMode === option.value}
                  onChange={(e) => handleChange("workMode", e.target.value)}
                  className="sr-only"
                />
                <div
                  className={`flex h-5 w-5 items-center justify-center rounded-full border ${
                    formData.workMode === option.value
                      ? "border-cyan-400 bg-cyan-400/20"
                      : "border-white/30 bg-transparent"
                  }`}
                >
                  {formData.workMode === option.value && (
                    <div className="h-2.5 w-2.5 rounded-full bg-cyan-400"></div>
                  )}
                </div>
              </label>
            ))}
          </div>
          {formData.workMode === "" && (
            <div className="rounded-lg border border-amber-400/20 bg-amber-950/20 p-3">
              <p className="text-sm text-amber-400">
                Please select your preferred work mode to continue
              </p>
            </div>
          )}
        </div>
      );

    case 5: // Company Size
      return (
        <div className="space-y-6">
          <h3 className="text-lg font-medium">Preferred Company Size</h3>
          <p className="text-sm text-gray-400">
            What size of company would you prefer to work for?
          </p>

          <div className="space-y-3">
            {[
              {
                value: "startup",
                label: "Startup (1-10 employees)",
                icon: <Users className="h-5 w-5 text-gray-400" />,
              },
              {
                value: "small",
                label: "Small (11-50 employees)",
                icon: <Users className="h-5 w-5 text-gray-400" />,
              },
              {
                value: "medium",
                label: "Medium (51-200 employees)",
                icon: <Users className="h-5 w-5 text-gray-400" />,
              },
              {
                value: "large",
                label: "Large (201+ employees)",
                icon: <Building className="h-5 w-5 text-gray-400" />,
              },
            ].map((option) => (
              <label
                key={option.value}
                className={`flex cursor-pointer items-center justify-between rounded-lg border p-3 transition-colors ${
                  formData.companySize === option.value
                    ? "border-violet-400 bg-violet-950/20"
                    : "border-white/10 bg-white/5 hover:border-white/30"
                }`}
              >
                <div className="flex items-center gap-3">
                  {option.icon}
                  <span
                    className={
                      formData.companySize === option.value
                        ? "text-violet-400"
                        : "text-gray-300"
                    }
                  >
                    {option.label}
                  </span>
                </div>
                <input
                  type="radio"
                  name="companySize"
                  value={option.value}
                  checked={formData.companySize === option.value}
                  onChange={(e) => handleChange("companySize", e.target.value)}
                  className="sr-only"
                />
                <div
                  className={`flex h-5 w-5 items-center justify-center rounded-full border ${
                    formData.companySize === option.value
                      ? "border-violet-400 bg-violet-400/20"
                      : "border-white/30 bg-transparent"
                  }`}
                >
                  {formData.companySize === option.value && (
                    <div className="h-2.5 w-2.5 rounded-full bg-violet-400"></div>
                  )}
                </div>
              </label>
            ))}
          </div>
          {formData.companySize === "" && (
            <div className="rounded-lg border border-amber-400/20 bg-amber-950/20 p-3">
              <p className="text-sm text-amber-400">
                Please select your preferred company size to continue
              </p>
            </div>
          )}
        </div>
      );

    case 6: // Industries of Interest
      return (
        <div className="space-y-6">
          <h3 className="text-lg font-medium">Industries of Interest</h3>
          <p className="text-sm text-gray-400">
            Select the industries you're interested in working in (select
            multiple if applicable)
          </p>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {industries.map((industry) => (
              <button
                key={industry}
                type="button"
                onClick={() =>
                  handleMultiSelect("industriesOfInterest", industry)
                }
                className={`flex items-center justify-between rounded-lg border p-3 text-left text-sm transition-colors ${
                  formData.industriesOfInterest.includes(industry)
                    ? "border-cyan-400 bg-cyan-950/20 text-cyan-400"
                    : "border-white/10 bg-white/5 text-gray-300 hover:border-white/30"
                }`}
              >
                <span>{industry}</span>
                {formData.industriesOfInterest.includes(industry) && (
                  <Check className="h-4 w-4 text-cyan-400" />
                )}
              </button>
            ))}
          </div>
          {formData.industriesOfInterest.length === 0 && (
            <div className="rounded-lg border border-amber-400/20 bg-amber-950/20 p-3">
              <p className="text-sm text-amber-400">
                Please select at least one industry to continue
              </p>
            </div>
          )}
        </div>
      );

    case 7: // Expected Location
      return (
        <div className="space-y-6">
          <h3 className="text-lg font-medium">Expected Location</h3>
          <p className="text-sm text-gray-400">
            Where would you prefer to work?
          </p>

          <div className="space-y-3">
            {locations.map((location) => (
              <label
                key={location}
                className={`flex cursor-pointer items-center justify-between rounded-lg border p-3 transition-colors ${
                  formData.expectedLocation === location
                    ? "border-cyan-400 bg-cyan-950/20"
                    : "border-white/10 bg-white/5 hover:border-white/30"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Globe className="h-5 w-5 text-gray-400" />
                  <span
                    className={
                      formData.expectedLocation === location
                        ? "text-cyan-400"
                        : "text-gray-300"
                    }
                  >
                    {location}
                  </span>
                </div>
                <input
                  type="radio"
                  name="expectedLocation"
                  value={location}
                  checked={formData.expectedLocation === location}
                  onChange={(e) =>
                    handleChange("expectedLocation", e.target.value)
                  }
                  className="sr-only"
                />
                <div
                  className={`flex h-5 w-5 items-center justify-center rounded-full border ${
                    formData.expectedLocation === location
                      ? "border-cyan-400 bg-cyan-400/20"
                      : "border-white/30 bg-transparent"
                  }`}
                >
                  {formData.expectedLocation === location && (
                    <div className="h-2.5 w-2.5 rounded-full bg-cyan-400"></div>
                  )}
                </div>
              </label>
            ))}
          </div>
          {formData.expectedLocation === "" && (
            <div className="rounded-lg border border-amber-400/20 bg-amber-950/20 p-3">
              <p className="text-sm text-amber-400">
                Please select your expected location to continue
              </p>
            </div>
          )}
        </div>
      );

    default:
      return <div>Unknown step</div>;
  }
}
