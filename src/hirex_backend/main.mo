import Map "mo:base/HashMap";
import Text "mo:base/Text";
import Principal "mo:base/Principal";
import Iter "mo:base/Iter";
import Result "mo:base/Result";
import Option "mo:base/Option";
import Array "mo:base/Array";
import List "mo:base/List";
import Nat32 "mo:base/Nat32";
import Time "mo:base/Time";
import Int "mo:base/Int";
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
    id : ?Text;
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

  type ResumeId = Nat32;
  type Resume = {
    id : ResumeId;
    personalInfo : ?PersonalInfo;
    experience : ?[Experience];
    education : ?[Education];
    skills : ?[Text];
    languages : ?[Language];
    projects : ?[Project];
    certifications : ?[Certification];
    updatedAt: Int;
  };

  type Response<T> = Result.Result<T, Text>;

  stable var usersStorage : [(Principal, User)] = [];

  private stable var nextResumeId : ResumeId = 0;
  stable var resumesStorage : [(Principal, [Resume])] = [];

  var userStore = Map.HashMap<Principal, User>(0, Principal.equal, Principal.hash);
  var resumesStore = Map.HashMap<Principal, [Resume]>(0, Principal.equal, Principal.hash);

  // RESUME
  public shared (msg) func resumes() : async Response<[Resume]> {
    // if (Principal.isAnonymous(msg.caller)) {
    //   return #err("Anonymous users are not allowed.");
    // };

    switch (resumesStore.get(msg.caller)) {
      case (?existingResumes) { return #ok(existingResumes) };
      case null { return #err("No resumes found.") };
    };
  };
  
  type ResumeParams = {
    resumeId : ResumeId;
  };
  public shared (msg) func resume(params: ResumeParams) : async Response<Resume> {
    // if (Principal.isAnonymous(msg.caller)) {
    //   return #err("Anonymous users are not allowed.");
    // };

    switch (resumesStore.get(msg.caller)) {
      case (?existingResumes) {
        let foundResume = Array.find<Resume>(existingResumes, func(r) { r.id == params.resumeId });

        switch (foundResume) {
          case (?resume) { return #ok(resume); };
          case null { return #err("Resume ID not found."); };
        };
      };
      case null { return #err("No resumes found."); };
    };
  };

  public shared (msg) func createResume() : async Response<ResumeId> {
    // if (Principal.isAnonymous(msg.caller)) {
    //   return #err("Anonymous users are not allowed.");
    // };

    let newResume : Resume = {
      id = nextResumeId;
      personalInfo = null;
      experience = null;
      education = null;
      skills = null;
      languages = null;
      projects = null;
      certifications = null;
      updatedAt = Time.now();
    };

    nextResumeId += 1;

    let index : ResumeId = switch (resumesStore.get(msg.caller)) {
      case (?existingResumes) {
        let updatedResumes = List.toArray(List.push(newResume, List.fromArray(existingResumes)));
        resumesStore.put(msg.caller, updatedResumes);
        newResume.id;
      };
      case null {
        resumesStore.put(msg.caller, [newResume]);
        newResume.id;
      };
    };

    return #ok(index);
  };

  type UpdateResumeParams = {
    resumeId : ResumeId;
    personalInfo : ?PersonalInfo;
    experience : ?[Experience];
    education : ?[Education];
    skills : ?[Text];
    languages : ?[Language];
    projects : ?[Project];
    certifications : ?[Certification];
  };
  public shared (msg) func updateResume(params : UpdateResumeParams) : async Response<Text> {
    switch (resumesStore.get(msg.caller)) {
      case (?existingResumes) {
        let foundResume = Array.find<Resume>(existingResumes, func(r) { r.id == params.resumeId });

        switch (foundResume) {
          case (?resume) {
            let updatedResume: Resume = {
              id = resume.id;
              personalInfo = if (params.personalInfo != null) params.personalInfo else resume.personalInfo;
              experience = if (params.experience != null) params.experience else resume.experience;
              education = if (params.education != null) params.education else resume.education;
              skills = if (params.skills != null) params.skills else resume.skills;
              languages = if (params.languages != null) params.languages else resume.languages;
              projects = if (params.projects != null) params.projects else resume.projects;
              certifications = if (params.certifications != null) params.certifications else resume.certifications;
              updatedAt = Time.now();
            };

            let updatedResumes = Array.map<Resume, Resume>(existingResumes, func(r) {
              if (r.id == params.resumeId) { updatedResume } else { r };
            });

            resumesStore.put(msg.caller, updatedResumes);
            return #ok("Resume updated successfully.");
          };
          case null { return #err("Resume ID not found."); };
        };
      };
      case null { return #err("No resumes found."); };
    };
  };

  type AnalyzeResumeParams = {

  };
  public func analyzeResume(prompt: Text) : async Text {
    let command = "You are an AI career assistant. Only respond to career-related topics. Keep each response concise and under 1000 characters. If the response is too long, continue in the next response. Begin: ";
    
    var fullResponse = "";
    var currentPrompt = command # " " # prompt;
    var hasMore = true;

    while (hasMore) {
        let response = await LLM.prompt(#Llama3_1_8B, currentPrompt);
        fullResponse := fullResponse # response;

        if (response.size() >= 950) {
            currentPrompt := "Continue from where you left off: ";
        } else {
            hasMore := false;
        }
    };

    return fullResponse;
  };


  // USER
  public shared (msg) func login() : async Response<User> {
    // if (Principal.isAnonymous(msg.caller)) {
    //   return #err("Anonymous users are not allowed.");
    // };

    switch (userStore.get(msg.caller)) {
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
        userStore.put(msg.caller, new_user);
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
    userStore.put(msg.caller, updated_profile);
    return #ok("User registered successfully.");
  };

  public shared func getAllResumes() : async [Resume] {
    let allEntries = Iter.toArray(resumesStore.entries()); // Ubah iterator ke array
    let allResumes = Array.foldLeft<(Principal, [Resume]), [Resume]>(
        allEntries,
        [],
        func(acc, (_, resumes)) {
            Array.append(acc, resumes);
        }
    );
    return allResumes;
  };

  public shared query (msg) func getUser() : async Response<User> {
    // if (Principal.isAnonymous(msg.caller)) {
    //   return #err("Anonymous users are not allowed.");
    // };

    switch (userStore.get(msg.caller)) {
      case (?user) { return #ok(user) };
      case null { return #err("User not found.") };
    };
  };

  public shared (msg) func deleteUser() : async Response<Text> {
    // if (Principal.isAnonymous(msg.caller)) {
    //   return #err("Anonymous users are not allowed.");
    // };

    if (userStore.remove(msg.caller) != null) {
      return #ok("User deleted successfully.");
    } else {
      return #err("User not found.");
    };
  };

  // Orthogonal persistence
  system func preupgrade() {
    usersStorage := Iter.toArray(userStore.entries());
    resumesStorage := Iter.toArray(resumesStore.entries());
  };

  system func postupgrade() {
    userStore := Map.HashMap<Principal, User>(usersStorage.size(), Principal.equal, Principal.hash);
    for ((key, value) in usersStorage.vals()) {
      userStore.put(key, value);
    };

    resumesStore := Map.HashMap<Principal, [Resume]>(resumesStorage.size(), Principal.equal, Principal.hash);
    for ((key, value) in resumesStorage.vals()) {
      resumesStore.put(key, value);
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
