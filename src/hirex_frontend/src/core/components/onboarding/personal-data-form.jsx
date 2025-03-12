import {
  User,
  Calendar,
  MapPin,
  Briefcase,
  Clock,
  GraduationCap,
  Brain,
  BookOpen,
  Check,
} from "lucide-react";

export function PersonalDataForm({ formData, handleChange }) {
  const personalityTraits = [
    "Analytical",
    "Creative",
    "Detail-oriented",
    "Leadership",
    "Collaborative",
    "Independent",
    "Innovative",
    "Adaptable",
    "Organized",
    "Problem-solver",
    "Communication",
    "Strategic",
  ];

  const handleTraitToggle = (trait) => {
    const currentTraits = [...formData.personalityTraits];
    if (currentTraits.includes(trait)) {
      handleChange(
        "personalityTraits",
        currentTraits.filter((t) => t !== trait)
      );
    } else {
      handleChange("personalityTraits", [...currentTraits, trait]);
    }
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium">Personal Information</h3>
      <p className="text-sm text-gray-400">
        Tell us about yourself to help us personalize your experience
      </p>

      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-300">
            <div className="flex items-center gap-1.5">
              <User className="h-4 w-4 text-cyan-400" />
              <span>Full Name</span>
            </div>
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => handleChange("name", e.target.value)}
            className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-white placeholder-gray-500 focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400"
            placeholder="Enter your full name"
            required
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-gray-300">
            <div className="flex items-center gap-1.5">
              <Calendar className="h-4 w-4 text-cyan-400" />
              <span>Date of Birth</span>
            </div>
          </label>
          <input
            type="date"
            value={formData.dateOfBirth}
            onChange={(e) => handleChange("dateOfBirth", e.target.value)}
            className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-white placeholder-gray-500 focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400"
            required
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-gray-300">
            <div className="flex items-center gap-1.5">
              <MapPin className="h-4 w-4 text-cyan-400" />
              <span>Location</span>
            </div>
          </label>
          <input
            type="text"
            value={formData.location}
            onChange={(e) => handleChange("location", e.target.value)}
            className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-white placeholder-gray-500 focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400"
            placeholder="City, Country"
            required
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-gray-300">
            <div className="flex items-center gap-1.5">
              <Briefcase className="h-4 w-4 text-cyan-400" />
              <span>Career Field</span>
            </div>
          </label>
          <select
            value={formData.careerField}
            onChange={(e) => handleChange("careerField", e.target.value)}
            className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-white focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400"
            required
          >
            <option value="" disabled>
              Select your field
            </option>
            <option value="technology">Technology</option>
            <option value="design">Design</option>
            <option value="marketing">Marketing</option>
            <option value="finance">Finance</option>
            <option value="healthcare">Healthcare</option>
            <option value="education">Education</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-gray-300">
            <div className="flex items-center gap-1.5">
              <Clock className="h-4 w-4 text-cyan-400" />
              <span>Years of Experience</span>
            </div>
          </label>
          <select
            value={formData.yearsOfExperience}
            onChange={(e) => handleChange("yearsOfExperience", e.target.value)}
            className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-white focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400"
            required
          >
            <option value="" disabled>
              Select experience
            </option>
            <option value="0-1">0-1 years</option>
            <option value="2-3">2-3 years</option>
            <option value="4-6">4-6 years</option>
            <option value="7+">7+ years</option>
          </select>
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-gray-300">
            <div className="flex items-center gap-1.5">
              <GraduationCap className="h-4 w-4 text-cyan-400" />
              <span>Education Level</span>
            </div>
          </label>
          <select
            value={formData.educationLevel}
            onChange={(e) => handleChange("educationLevel", e.target.value)}
            className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-white focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400"
            required
          >
            <option value="" disabled>
              Select education
            </option>
            <option value="high-school">High School</option>
            <option value="diploma">Diploma</option>
            <option value="bachelor">Bachelor's Degree</option>
            <option value="master">Master's Degree</option>
            <option value="phd">PhD</option>
          </select>
        </div>
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-gray-300">
          <div className="flex items-center gap-1.5">
            <Brain className="h-4 w-4 text-cyan-400" />
            <span>Personality Traits (Select 3-5)</span>
          </div>
        </label>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {personalityTraits.map((trait) => (
            <button
              key={trait}
              type="button"
              onClick={() => handleTraitToggle(trait)}
              className={`flex items-center justify-between rounded-lg border p-3 text-left text-sm transition-colors ${
                formData.personalityTraits.includes(trait)
                  ? "border-cyan-400 bg-cyan-950/20 text-cyan-400"
                  : "border-white/10 bg-white/5 text-gray-300 hover:border-white/30"
              }`}
            >
              <span>{trait}</span>
              {formData.personalityTraits.includes(trait) && (
                <Check className="h-4 w-4 text-cyan-400" />
              )}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-gray-300">
          <div className="flex items-center gap-1.5">
            <BookOpen className="h-4 w-4 text-cyan-400" />
            <span>Learning Style</span>
          </div>
        </label>
        <div className="space-y-2">
          {[
            {
              value: "visual",
              label: "Visual Learning (videos, diagrams, demonstrations)",
            },
            {
              value: "practical",
              label: "Practical Learning (hands-on, projects, experimentation)",
            },
            {
              value: "theoretical",
              label: "Theoretical Learning (reading, research, concepts)",
            },
            {
              value: "social",
              label: "Social Learning (discussion, group work, mentorship)",
            },
          ].map((option) => (
            <label
              key={option.value}
              className={`flex cursor-pointer items-center justify-between rounded-lg border p-3 transition-colors ${
                formData.learningStyle === option.value
                  ? "border-violet-400 bg-violet-950/20"
                  : "border-white/10 bg-white/5 hover:border-white/30"
              }`}
            >
              <span
                className={
                  formData.learningStyle === option.value
                    ? "text-violet-400"
                    : "text-gray-300"
                }
              >
                {option.label}
              </span>
              <input
                type="radio"
                name="learningStyle"
                value={option.value}
                checked={formData.learningStyle === option.value}
                onChange={(e) => handleChange("learningStyle", e.target.value)}
                className="sr-only"
              />
              <div
                className={`flex h-5 w-5 items-center justify-center rounded-full border ${
                  formData.learningStyle === option.value
                    ? "border-violet-400 bg-violet-400/20"
                    : "border-white/30 bg-transparent"
                }`}
              >
                {formData.learningStyle === option.value && (
                  <div className="h-2.5 w-2.5 rounded-full bg-violet-400"></div>
                )}
              </div>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}
