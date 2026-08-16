// Security & Cryptographic Hashing Utilities for HCM202 Quiz
// Prevents inspecting client-side JS / React state / DOM to view answers via F12

const QUIZ_SALT = "HCM202_KIENTHUC_CHUONG5_SECURE_SALT_2024";

// Deterministic 64-bit non-invertible salted hash
export const hashChoice = (qId, optionIndex) => {
  const payload = `${QUIZ_SALT}_qid_${qId}_choice_${optionIndex}_ans`;
  let h1 = 0x811c9dc5;
  let h2 = 0x5a17c09e;
  for (let i = 0; i < payload.length; i++) {
    const code = payload.charCodeAt(i);
    h1 = Math.imul(h1 ^ code, 0x01000193);
    h2 = Math.imul(h2 ^ code, 0x01000193) ^ h1;
  }
  return ((h1 >>> 0).toString(16) + (h2 >>> 0).toString(16)).padStart(16, "0");
};

// Deterministic hash for matching question pairs (Left ID <-> Right ID)
export const hashPair = (qId, leftId, rightId) => {
  const payload = `${QUIZ_SALT}_qid_${qId}_match_${leftId}_to_${rightId}`;
  let h1 = 0x811c9dc5;
  let h2 = 0x5a17c09e;
  for (let i = 0; i < payload.length; i++) {
    const code = payload.charCodeAt(i);
    h1 = Math.imul(h1 ^ code, 0x01000193);
    h2 = Math.imul(h2 ^ code, 0x01000193) ^ h1;
  }
  return ((h1 >>> 0).toString(16) + (h2 >>> 0).toString(16)).padStart(16, "0");
};

// Verify if the clicked option matches the question's targetHash
export const verifyOption = (qId, optionIndex, targetHash) => {
  if (!targetHash) return false;
  return hashChoice(qId, optionIndex) === targetHash;
};

// Verify if a left-right pair matches any valid pair hash in the matching question
export const verifyMatchingPair = (qId, leftId, rightId, validPairHashes = []) => {
  const currentPairHash = hashPair(qId, leftId, rightId);
  return validPairHashes.includes(currentPairHash);
};

// Simple reversible XOR encryption for explanation text so answers aren't searchable in plain text bundle
export const encodeExplanation = (text, keyString = QUIZ_SALT) => {
  const encoder = new TextEncoder();
  const bytes = encoder.encode(text);
  const keyBytes = encoder.encode(keyString);
  const encoded = [];
  for (let i = 0; i < bytes.length; i++) {
    encoded.push(bytes[i] ^ keyBytes[i % keyBytes.length]);
  }
  return btoa(String.fromCharCode.apply(null, encoded));
};

export const decodeExplanation = (base64Cipher, keyString = QUIZ_SALT) => {
  if (!base64Cipher) return "";
  try {
    const raw = atob(base64Cipher);
    const bytes = new Uint8Array(raw.length);
    for (let i = 0; i < raw.length; i++) {
      bytes[i] = raw.charCodeAt(i);
    }
    const encoder = new TextEncoder();
    const keyBytes = encoder.encode(keyString);
    const decoded = new Uint8Array(bytes.length);
    for (let i = 0; i < bytes.length; i++) {
      decoded[i] = bytes[i] ^ keyBytes[i % keyBytes.length];
    }
    const decoder = new TextDecoder();
    return decoder.decode(decoded);
  } catch (e) {
    return "";
  }
};
