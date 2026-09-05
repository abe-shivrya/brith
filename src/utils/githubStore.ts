/**
 * githubStore.ts
 *
 * Reads and writes certificate records to a single JSON file
 * (data/validate_cert.json) in the GitHub repo using the Contents API.
 *
 * Environment variables (set in .env):
 *   VITE_GITHUB_TOKEN   — Personal Access Token with Contents: Read & Write
 *   VITE_GITHUB_OWNER   — Repo owner (user or org)
 *   VITE_GITHUB_REPO    — Repo name
 *   VITE_GITHUB_BRANCH  — Branch to read/write (default: "main")
 *   VITE_DATA_DIR       — Directory inside repo (default: "data")
 */

import type { CertificateFormData } from "../types";

const GITHUB_API = "https://api.github.com";

/** Route through Vite dev proxy for API calls */
function apiUrl(path: string): string {
  const isDev = import.meta.env.DEV;
  if (isDev) return `/github-api${path}`;
  return `${GITHUB_API}${path}`;
}
const FILE_NAME = "validate_cert.json";

function getConfig() {
  const token = import.meta.env.VITE_GITHUB_TOKEN as string;
  const owner = import.meta.env.VITE_GITHUB_OWNER as string;
  const repo = import.meta.env.VITE_GITHUB_REPO as string;
  const branch = (import.meta.env.VITE_GITHUB_BRANCH as string) || "main";
  const dataDir = (import.meta.env.VITE_DATA_DIR as string) || "data";

  if (!token || !owner || !repo) {
    throw new Error(
      "Missing GitHub config. Set VITE_GITHUB_TOKEN, VITE_GITHUB_OWNER, VITE_GITHUB_REPO in .env",
    );
  }

  return { token, owner, repo, branch, filePath: `${dataDir}/${FILE_NAME}` };
}

function authHeaders(token: string) {
  return {
    Authorization: `Bearer ${token}`,
    Accept: "application/vnd.github+json",
    "Content-Type": "application/json",
  };
}

/** Encode a string to base64, handling UTF-8 (Marathi/Devanagari) */
function toBase64(str: string): string {
  return btoa(unescape(encodeURIComponent(str)));
}

/** Decode a base64 string to UTF-8 */
function fromBase64(b64: string): string {
  return decodeURIComponent(escape(atob(b64)));
}

/**
 * Generate a deterministic ID from Registration Unit Code + Registration Number + DOB.
 * Same inputs always produce the same ID.
 */
function generateId(data: CertificateFormData): string {
  const raw = `${data.unitCode}|${data.registrationNumber}|${data.dob}`;
  // Simple hash → hex string, then take first 12 chars
  let hash = 0;
  for (let i = 0; i < raw.length; i++) {
    const ch = raw.charCodeAt(i);
    hash = ((hash << 5) - hash + ch) | 0;
  }
  // Convert to positive hex and pad
  const hex = Math.abs(hash).toString(16).padStart(8, "0");
  return hex.slice(0, 12);
}

export type CertRecord = {
  id: string;
  data: CertificateFormData;
  createdAt: string;
};

/**
 * Read the entire validate_cert.json from GitHub.
 * Returns the array of records (empty array if file doesn't exist).
 * Also returns the SHA needed for updates.
 */
/**
 * Read records from raw.githubusercontent.com (fast, CORS-friendly).
 * Falls back to GitHub Contents API if raw URL fails (e.g. private repo).
 */
async function readAll(): Promise<{ records: CertRecord[]; sha?: string }> {
  const { token, owner, repo, branch, filePath } = getConfig();

  try {
    const res = await fetch(
      apiUrl(`/repos/${owner}/${repo}/contents/${filePath}?ref=${branch}&_t=${Date.now()}`),
      { headers: authHeaders(token) },
    );

    if (res.status === 404) return { records: [], sha: undefined };
    if (!res.ok) return { records: [], sha: undefined };

    const json = await res.json();
    const decoded = fromBase64(json.content);
    const records = JSON.parse(decoded) as CertRecord[];
    return { records, sha: json.sha };
  } catch {
    return { records: [], sha: undefined };
  }
}



/**
 * Write the full records array to validate_cert.json on GitHub.
 */
async function writeAll(records: CertRecord[], sha?: string): Promise<void> {
  const { token, owner, repo, branch, filePath } = getConfig();

  const content = toBase64(JSON.stringify(records, null, 2));

  const body: Record<string, unknown> = {
    message: sha
      ? `Update certificate records`
      : `Create certificate records file`,
    content,
    branch,
  };
  if (sha) body.sha = sha;

  const res = await fetch(
    apiUrl(`/repos/${owner}/${repo}/contents/${filePath}`),
    {
      method: "PUT",
      headers: authHeaders(token),
      body: JSON.stringify(body),
    },
  );

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Failed to save to GitHub: ${res.status} ${err}`);
  }
}

/**
 * Get a single certificate record by ID.
 */
export async function getCertRecord(id: string): Promise<CertRecord | null> {
  const { records } = await readAll();
  return records.find((r) => r.id === id) || null;
}

/**
 * Save a certificate record.
 * ID is generated from Registration Unit Code + Registration Number + DOB.
 * If a record with the same ID already exists, returns the existing ID.
 * Returns the record ID.
 */
export async function saveCertRecord(
  data: CertificateFormData,
): Promise<string> {
  const { records, sha } = await readAll();

  // Generate deterministic ID from registration fields
  const id = generateId(data);

  // Check if a record with this ID already exists
  const existing = records.find((r) => r.id === id);
  if (existing) {
    // Already exists — return it, don't create duplicate
    return id;
  }

  // New record — add it
  records.push({ id, data, createdAt: new Date().toISOString() });

  await writeAll(records, sha);
  return id;
}
