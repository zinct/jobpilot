import { HttpAgent, Actor } from "@dfinity/agent";
import { idlFactory as backendIDL } from "declarations/hirex_backend";
import { idlFactory as llmIDL } from "declarations/llm";
import { idlFactory as iiIDL } from "declarations/internet_identity";

const host = process.env.DFX_NETWORK === "local" ? "http://127.0.0.1:4943" : "http://127.0.0.1:4943";

export function createBackendActor(identity) {
  const agent = new HttpAgent({ host, identity });
  return Actor.createActor(backendIDL, {
    agent,
    canisterId: process.env.CANISTER_ID_HIREX_BACKEND,
  });
}

export function createLLMActor(identity) {
  const agent = new HttpAgent({ host, identity });
  return Actor.createActor(llmIDL, {
    agent,
    canisterId: process.env.CANISTER_ID_LLM,
  });
}

export function createIIActor(identity) {
  const agent = new HttpAgent({ host, identity });
  return Actor.createActor(iiIDL, {
    agent,
    canisterId: process.env.CANISTER_ID_INTERNET_IDENTITY,
  });
}
