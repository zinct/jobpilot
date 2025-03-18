import Map "mo:base/HashMap";
import Text "mo:base/Text";
import Principal "mo:base/Principal";
import Iter "mo:base/Iter";
import Result "mo:base/Result";
import Option "mo:base/Option";
import Array "mo:base/Array";
import List "mo:base/List";
import LLM "mo:llm";

actor HireX {
  type User = {
    full_name : ?Text;
    date_of_birth : ?Nat;
    years_of_experience : ?Text;
    education_level : ?Text;
    personality_traits : ?[Text];
    learning_style : ?Text;
    job_roles : ?[Text];
    job_search_status : ?Text;
    job_level : ?Text;
    work_mode : ?Text;
    company_size : ?Text;
    industries_of_interest : ?[Text];
    expected_location : ?Text;
    is_registered : ?Nat8;
  };

  // Resume
  type PersonalInfo = {
    name : ?Text;
    title : ?Text;
    email : ?Text;
    phone : ?Text;
    location : ?Text;
    website : ?Text;
    summary : ?Text;
  };

  type Experience = {
    id : ?Text;
    company : ?Text;
    position : ?Text;
    location : ?Text;
    startDate : ?Text;
    endDate : ?Text;
    current : ?Bool;
    description : ?Text;
    achievements : ?[Text];
  };

  type Education = {
    id : ?Text;
    institution : ?Text;
    degree : ?Text;
    location : ?Text;
    startDate : ?Text;
    endDate : ?Text;
    description : ?Text;
  };

  type Language = {
    language : ?Text;
    proficiency : ?Text;
  };

  type Project = {
    id : ?Text;
    title : ?Text;
    description : ?Text;
    technologies : ?[Text];
    link : ?Text;
  };

  type Certification = {
    id : ?Text;
    name : ?Text;
    issuer : ?Text;
    date : ?Text;
    link : ?Text;
  };

  type Resume = {
    personalInfo : ?PersonalInfo;
    experience : ?[Experience];
    education : ?[Education];
    skills : ?[Text];
    languages : ?[Language];
    projects : ?[Project];
    certifications : ?[Certification];
  };

  type Response<T> = Result.Result<T, Text>;

  stable var users_storage : [(Text, User)] = [];
  stable var resume_storage : [(Text, [Resume])] = [];

  var userStore = Map.HashMap<Text, User>(0, Text.equal, Text.hash);
  var resumesStore = Map.HashMap<Text, [Resume]>(0, Text.equal, Text.hash);

  // RESUME
  public shared (msg) func resumes() : async Response<[Resume]> {
    // if (Principal.isAnonymous(msg.caller)) {
    //   return #err("Anonymous users are not allowed.");
    // };

    let principal_id = Principal.toText(msg.caller);
    switch (resumesStore.get(principal_id)) {
      case (?existingResumes) { return #ok(existingResumes) };
      case null { return #err("No resumes found.") };
    };
  };
  
  type ResumeParams = {
    index : Nat;
  };

  public shared (msg) func resume(params: ResumeParams) : async Response<Resume> {
    if (Principal.isAnonymous(msg.caller)) {
      return #err("Anonymous users are not allowed.");
    };

    let principal_id = Principal.toText(msg.caller);

    switch (resumesStore.get(principal_id)) {
      case (?existingResumes) {
        if (params.index >= Array.size(existingResumes)) {
          return #err("Invalid index. Resume not found.");
        };
        return #ok(existingResumes[params.index]);
      };
      case null { return #err("No resumes found.") };
    };
  };

  public shared (msg) func createResume() : async Response<Nat> {
    // if (Principal.isAnonymous(msg.caller)) {
    //   return #err("Anonymous users are not allowed.");
    // };

    let principal_id = Principal.toText(msg.caller);
    let new_resume : Resume = {
      personalInfo = null;
      experience = null;
      education = null;
      skills = null;
      languages = null;
      projects = null;
      certifications = null;
    };

    let index : Nat = switch (resumesStore.get(principal_id)) {
      case (?existingResumes) {
        let updatedResumes = List.toArray(List.push(new_resume, List.fromArray(existingResumes)));
        resumesStore.put(principal_id, updatedResumes);
        Array.size(existingResumes);
      };
      case null {
        resumesStore.put(principal_id, [new_resume]);
        0;
      };
    };

    return #ok(index);
  };

  type UpdateResumeParams = {
    index : Nat;
    personalInfo : ?PersonalInfo;
    experience : ?[Experience];
    education : ?[Education];
    skills : ?[Text];
    languages : ?[Language];
    projects : ?[Project];
    certifications : ?[Certification];
  };
  public shared (msg) func updateResume(params : UpdateResumeParams) : async Response<Text> {
    // if (Principal.isAnonymous(msg.caller)) {
    //   return #err("Anonymous users are not allowed.");
    // };

    let principal_id = Principal.toText(msg.caller);

    switch (resumesStore.get(principal_id)) {
      case (?existingResumes) {
        if (params.index >= Array.size(existingResumes)) {
          return #err("Invalid resume index.");
        };

        let updatedResumes = Array.tabulate(
          Array.size(existingResumes),
          func(i : Nat) : Resume {
            if (i == params.index) {
              let existingResume = existingResumes[i];
              return {
                personalInfo = if (params.personalInfo != null) params.personalInfo else existingResume.personalInfo;
                experience = if (params.experience != null) params.experience else existingResume.experience;
                education = if (params.education != null) params.education else existingResume.education;
                skills = if (params.skills != null) params.skills else existingResume.skills;
                languages = if (params.languages != null) params.languages else existingResume.languages;
                projects = if (params.projects != null) params.projects else existingResume.projects;
                certifications = if (params.certifications != null) params.certifications else existingResume.certifications;
              };
            } else {
              existingResumes[i];
            };
          },
        );

        resumesStore.put(principal_id, updatedResumes);
        return #ok("Resume updated successfully.");
      };
      case null {
        return #err("No resumes found for this user.");
      };
    };
  };

  // USER
  public shared (msg) func login() : async Response<User> {
    // if (Principal.isAnonymous(msg.caller)) {
    //   return #err("Anonymous users are not allowed.");
    // };

    let principal_id = Principal.toText(msg.caller);
    switch (userStore.get(principal_id)) {
      case (?user) { return #ok(user) };
      case null {
        let new_user : User = {
          full_name = null;
          date_of_birth = null;
          years_of_experience = null;
          education_level = null;
          personality_traits = null;
          learning_style = null;
          job_roles = null;
          job_search_status = null;
          job_level = null;
          work_mode = null;
          company_size = null;
          industries_of_interest = null;
          expected_location = null;
          is_registered = ?0;
        };
        userStore.put(principal_id, new_user);
        return #ok(new_user);
      };
    };
  };

  public shared (msg) func register(
    full_name : ?Text,
    date_of_birth : ?Nat,
    years_of_experience : ?Text,
    education_level : ?Text,
    personality_traits : ?[Text],
    learning_style : ?Text,
    job_roles : ?[Text],
    job_search_status : ?Text,
    job_level : ?Text,
    work_mode : ?Text,
    company_size : ?Text,
    industries_of_interest : ?[Text],
    expected_location : ?Text,
    is_registered : ?Nat8,
  ) : async Response<Text> {
    // if (Principal.isAnonymous(msg.caller)) {
    //   return #err("Anonymous users are not allowed.");
    // };

    let principal_id = Principal.toText(msg.caller);
    let updated_profile : User = {
      full_name = full_name;
      date_of_birth = date_of_birth;
      years_of_experience = years_of_experience;
      education_level = education_level;
      personality_traits = personality_traits;
      learning_style = learning_style;
      job_roles = job_roles;
      job_search_status = job_search_status;
      job_level = job_level;
      work_mode = work_mode;
      company_size = company_size;
      industries_of_interest = industries_of_interest;
      expected_location = expected_location;
      is_registered = is_registered;
    };
    userStore.put(principal_id, updated_profile);
    return #ok("User registered successfully.");
  };

  public shared query (msg) func getUser() : async Response<User> {
    // if (Principal.isAnonymous(msg.caller)) {
    //   return #err("Anonymous users are not allowed.");
    // };

    let principal_id = Principal.toText(msg.caller);
    switch (userStore.get(principal_id)) {
      case (?user) { return #ok(user) };
      case null { return #err("User not found.") };
    };
  };

  public shared (msg) func deleteUser() : async Response<Text> {
    // if (Principal.isAnonymous(msg.caller)) {
    //   return #err("Anonymous users are not allowed.");
    // };

    let principal_id = Principal.toText(msg.caller);
    if (userStore.remove(principal_id) != null) {
      return #ok("User deleted successfully.");
    } else {
      return #err("User not found.");
    };
  };

  // Orthogonal persistence
  system func preupgrade() {
    users_storage := Iter.toArray(userStore.entries());
  };

  system func postupgrade() {
    userStore := Map.HashMap<Text, User>(users_storage.size(), Text.equal, Text.hash);
    for ((key, value) in users_storage.vals()) {
      userStore.put(key, value);
    };
  };

  // Helper
  public shared query (msg) func whoami() : async Principal {
    return msg.caller;
  };

  // AI
  public func prompt(prompt : Text) : async Text {
    let command = "You are an AI career assistant. Only respond to questions about career, CV making, job recommendations, or related courses. If the question is unrelated, say: 'Sorry, I can only assist with career-related topics.' Keep the response concise and under 1000 characters.";
    await LLM.prompt(#Llama3_1_8B, command # " " # prompt);
  };
};
