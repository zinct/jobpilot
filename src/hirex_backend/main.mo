import Map "mo:base/HashMap";
import Text "mo:base/Text";
import Principal "mo:base/Principal";
import Iter "mo:base/Iter";
import Result "mo:base/Result";
import LLM "mo:llm";

actor HireX {
  type JobType = { #Remote; #Hybrid; #Onsite };

  type User = {
    name : ?Text;
    email : ?Text;
    phone : ?Text;
    job_interest : ?Text;
    gender : ?Text;
    job_type : ?JobType;
    expected_salary : ?Text;
    career_goal : ?Text;
    learning_interests : ?Text;
    is_registered : Nat8;
  };

  type Response<T> = Result.Result<T, Text>;

  stable var usersStorage : [(Text, User)] = [];

  var users = Map.HashMap<Text, User>(0, Text.equal, Text.hash);

  system func preupgrade() {
    usersStorage := Iter.toArray(users.entries());
  };

  system func postupgrade() {
    users := Map.HashMap<Text, User>(usersStorage.size(), Text.equal, Text.hash);
    for ((key, value) in usersStorage.vals()) {
      users.put(key, value);
    };
  };

  public func prompt(prompt : Text) : async Text {
    await LLM.prompt(#Llama3_1_8B, prompt);
  };

  public func chat(messages : [LLM.ChatMessage]) : async Text {
    await LLM.chat(#Llama3_1_8B, messages);
  };

  public shared query (msg) func whoami() : async Principal {
    return msg.caller;
  };

  public shared func login(msg : Principal) : async Response<User> {
    let principalId = Principal.toText(msg);

    switch (users.get(principalId)) {
      case (?user) {
        return #ok(user);
      };
      case null {
        let newUser : User = {
          name = null;
          email = null;
          phone = null;
          job_interest = null;
          gender = null;
          job_type = null;
          expected_salary = null;
          career_goal = null;
          learning_interests = null;
          is_registered = 0;
        };

        users.put(principalId, newUser);
        return #ok(newUser);
      };
    };
  };

  public shared func register(
    msg : Principal,
    name : Text,
    email : Text,
    phone : Text,
    job_interest : Text,
    gender : Text,
    job_type : JobType,
    expected_salary : Text,
    career_goal : Text,
    learning_interests : Text,
  ) : async Response<Text> {
    let principalId = Principal.toText(msg);

    switch (users.get(principalId)) {
      case (?_) {
        let updatedProfile : User = {
          name = ?name;
          email = ?email;
          phone = ?phone;
          job_interest = ?job_interest;
          gender = ?gender;
          job_type = ?job_type;
          expected_salary = ?expected_salary;
          career_goal = ?career_goal;
          learning_interests = ?learning_interests;
          is_registered = 1;
        };
        users.put(principalId, updatedProfile);
        return #ok("User updated successfully.");
      };
      case null { return #err("User not found.") };
    };
  };

  public shared query func getUser(msg : Principal) : async Response<User> {
    let principalId = Principal.toText(msg);
    switch (users.get(principalId)) {
      case (?user) { return #ok(user) };
      case null { return #err("User not found.") };
    };
  };

  public shared func deleteUser(msg : Principal) : async Response<Text> {
    let principalId = Principal.toText(msg);
    if (users.remove(principalId) != null) {
      return #ok("User deleted successfully.");
    } else {
      return #err("User not found.");
    };
  };
};
