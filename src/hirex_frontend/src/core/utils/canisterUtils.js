export function getInternetIdentityNetwork() {
  const canisterId = process.env.CANISTER_ID_INTERNET_IDENTITY;
  const network = process.env.DFX_NETWORK;

  if (!canisterId) {
    console.warn("CANISTER_ID_INTERNET_IDENTITY is not set.");
    return null;
  }

  if (network === "local") {
    return `http://${canisterId}.localhost:4943`;
  } else if (network === "playground") {
    return `https://${canisterId}.dfinity.network`;
  } else {
    return `https://identity.ic0.app`;
  }
}

export function mapOptionalToFormattedJSON(data) {
  if (!data || typeof data !== "object") return data;

  return Object.fromEntries(
    Object.entries(data).map(([key, value]) => {
      if (Array.isArray(value)) {
        if (value.length === 0) return [key, null]; // Array kosong -> null
        if (value.length === 1) return [key, mapOptionalToFormattedJSON(value[0])]; // Array satu elemen -> ambil elemen pertama (bisa object)
        return [key, value.map((item) => mapOptionalToFormattedJSON(item))]; // Array banyak elemen -> rekurensif
      }

      if (typeof value === "object" && value !== null) {
        return [key, mapOptionalToFormattedJSON(value)]; // Rekursi untuk nested object
      }

      return [key, value];
    })
  );
}

export function unixToDateString(unix) {
  return new Date(Number(unix) * 1000).toISOString().split("T")[0];
}

export function toUnixTimestamps(dateString) {
  return dateString === null ? null : Math.floor(new Date(dateString).getTime() / 1000);
}

export function prepareArg(value) {
  if (value === null || value === "" || (Array.isArray(value) && value.length === 0) || Number.isNaN(value) || (typeof value === "object" && Object.keys(value).length === 0)) {
    return [];
  }

  if (Array.isArray(value)) {
    return value.map((item) => (typeof item === "object" ? prepareArg(item) : [item]));
  }

  if (typeof value === "object") {
    const transformedObject = Object.fromEntries(Object.entries(value).map(([key, val]) => [key, prepareArg(val)]));
    return [transformedObject]; // Pastikan objek tetap dalam array
  }

  return [value]; // Pastikan semua value dikonversi menjadi array
}
