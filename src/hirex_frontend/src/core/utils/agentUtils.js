import { HttpAgent, Actor } from "@dfinity/agent";
import { idlFactory as backendIDL } from "declarations/hirex_backend";
import { idlFactory as llmIDL } from "declarations/llm";
import { idlFactory as iiIDL } from "declarations/internet_identity";

const backendAgent = new HttpAgent({ host: "https://icp0.io" }); // Playground
const localAgent = new HttpAgent({ host: "http://127.0.0.1:4943" }); // Lokal
console.log(
  "process.env.CANISTER_ID_HIREX_BACKEND",
  process.env.CANISTER_ID_HIREX_BACKEND
);
const hirex_backend = Actor.createActor(backendIDL, {
  agent: backendAgent,
  canisterId: process.env.CANISTER_ID_HIREX_BACKEND,
});

const llm = Actor.createActor(llmIDL, {
  agent: backendAgent,
  canisterId: process.env.CANISTER_ID_LLM,
});

const internet_identity = Actor.createActor(iiIDL, {
  agent: localAgent,
  canisterId: process.env.CANISTER_ID_INTERNET_IDENTITY,
});

export { hirex_backend, llm, internet_identity };
