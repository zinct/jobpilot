export function getInternetIdentityNetwork() {
  const canisterId = process.env.CANISTER_ID_INTERNET_IDENTITY;
  const network = process.env.DFX_NETWORK;

  if (!canisterId) {
    console.warn("CANISTER_ID_INTERNET_IDENTITY is not set.");
    return null;
  }

  if (network === "local") {
    return `http://${canisterId}.localhost:4943`;
  } else if (network === "ic") {
    return `https://${canisterId}.ic0.app`;
  } else {
    return `https://${canisterId}.dfinity.network`;
  }
}
