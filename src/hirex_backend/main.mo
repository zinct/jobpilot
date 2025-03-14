import Map "mo:base/HashMap";
import Text "mo:base/Text";
import Principal "mo:base/Principal";
import Iter "mo:base/Iter";
import Result "mo:base/Result";
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

  type Response<T> = Result.Result<T, Text>;

  stable var users_storage : [(Text, User)] = [];

  var users = Map.HashMap<Text, User>(0, Text.equal, Text.hash);

  system func preupgrade() {
    users_storage := Iter.toArray(users.entries());
  };

  system func postupgrade() {
    users := Map.HashMap<Text, User>(users_storage.size(), Text.equal, Text.hash);
    for ((key, value) in users_storage.vals()) {
      users.put(key, value);
    };
  };

  public shared (msg) func login() : async Response<User> {
    if (Principal.isAnonymous(msg.caller)) {
      return #err("Anonymous users are not allowed.");
    };

    let principal_id = Principal.toText(msg.caller);
    switch (users.get(principal_id)) {
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
        users.put(principal_id, new_user);
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
    if (Principal.isAnonymous(msg.caller)) {
      return #err("Anonymous users are not allowed.");
    };

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
    users.put(principal_id, updated_profile);
    return #ok("User registered successfully.");
  };

  public shared query (msg) func get_user() : async Response<User> {
    if (Principal.isAnonymous(msg.caller)) {
      return #err("Anonymous users are not allowed.");
    };

    let principal_id = Principal.toText(msg.caller);
    switch (users.get(principal_id)) {
      case (?user) { return #ok(user) };
      case null { return #err("User not found.") };
    };
  };

  public shared (msg) func delete_user() : async Response<Text> {
    if (Principal.isAnonymous(msg.caller)) {
      return #err("Anonymous users are not allowed.");
    };

    let principal_id = Principal.toText(msg.caller);
    if (users.remove(principal_id) != null) {
      return #ok("User deleted successfully.");
    } else {
      return #err("User not found.");
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
