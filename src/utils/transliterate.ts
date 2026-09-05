/**
 * transliterate.ts — English → Devanagari (Marathi) transliteration.
 *
 * One-way: typing English auto-fills Marathi.
 * Manual Marathi edits are independent (English won't revert).
 */

/* ─── Character map ─── */
const VOWELS: Record<string, string> = {
  a: "अ", aa: "आ", i: "इ", ii: "ई", u: "उ", uu: "ऊ",
  e: "ए", ai: "ऐ", o: "ओ", au: "औ", am: "अं", ah: "अः",
};

const MATRAS: Record<string, string> = {
  a: "", aa: "ा", i: "ि", ii: "ी", u: "ु", uu: "ू",
  e: "े", ai: "ै", o: "ो", au: "ौ", am: "ं", ah: "ः",
};

const CONSONANTS: Record<string, string> = {
  k: "क", kh: "ख", g: "ग", gh: "घ", ng: "ङ",
  ch: "च", j: "ज", jh: "झ", ny: "ञ",
  t: "त", th: "थ", d: "द", dh: "ध", n: "न",
  p: "प", ph: "फ", b: "ब", bh: "भ", m: "म",
  y: "य", r: "र", l: "ल", v: "व", w: "व",
  sh: "श", shr: "ष", s: "स", h: "ह",
  ksh: "क्ष", tr: "त्र", gy: "ज्ञ",
};

/* ─── Known word map (common Marathi/Gov terms) ─── */
const WORD_MAP: Record<string, string> = {
  // Place / administrative terms
  solapur: "सोलापूर",
  maharashtra: "महाराष्ट्र",
  nagar: "नगर",
  nigam: "निगम",
  municipal: "म्युनिसिपल",
  corporation: "कॉर्पोरेशन",
  "municipal corporation": "नगर निगम",
  north: "उत्तर",
  south: "दक्षिण",
  east: "पूर्व",
  west: "पश्चिम",
  nursing: "नर्सिंग",
  home: "होम",
  "nursing home": "नर्सिंग होम",
  hospital: "हॉस्पिटल",

  // Gender
  male: "पुरुष",
  female: "स्त्री",
  man: "पुरुष",
  woman: "स्त्री",

  // Common names (from the sample data)
  adeebanaaz: "अदीबानाज",
  azaroddin: "अझरोद्दीन",
  attar: "अत्तार",
  farhat: "फरहत",
  jhan: "जहाँ",
  khutboddin: "खुतबोद्दीन",
  manjiri: "मंजिरी",
  kulkarni: "कुलकर्णी",

  // Document terms
  registration: "नोंदणी",
  date: "तारीख",
  name: "नाव",
  birth: "जन्म",
  death: "मृत्यू",
  address: "पत्ता",
  number: "क्रमांक",
  unit: "विभाग",
  code: "कोड",
  place: "स्थाळ",
};

/* ─── Main transliterate function ─── */

/**
 * Transliterate an English word/phrase to Devanagari (Marathi).
 * First checks the known-word map, then falls back to character-level mapping.
 */
export function transliterate(input: string): string {
  if (!input) return "";

  const lower = input.toLowerCase().trim();

  // Check full phrase in word map
  if (WORD_MAP[lower]) return WORD_MAP[lower];

  // Check multi-word: transliterate each word separately
  const words = input.split(/\s+/);
  if (words.length > 1) {
    return words.map((w) => transliterateWord(w)).join(" ");
  }

  return transliterateWord(lower);
}

function transliterateWord(word: string): string {
  if (!word) return "";

  // Check word map first
  const lower = word.toLowerCase();
  if (WORD_MAP[lower]) return WORD_MAP[lower];

  let result = "";
  let i = 0;

  while (i < word.length) {
    const remaining = word.slice(i);

    // Check 3-letter combos first
    if (remaining.startsWith("ksh")) { result += "क्ष"; i += 3; continue; }
    if (remaining.startsWith("shr")) { result += "ष"; i += 3; continue; }
    if (remaining.startsWith("gy")) { result += "ज्ञ"; i += 2; continue; }

    // Check 2-letter combos
    const two = remaining.slice(0, 2);
    if (CONSONANTS[two]) { result += CONSONANTS[two]; i += 2; continue; }

    // Vowel matras (after a consonant)
    if (MATRAS[two] !== undefined && result.length > 0 && !isVowelChar(result.slice(-1))) {
      result += MATRAS[two]; i += 2; continue;
    }

    // Standalone vowels (at start or after another vowel)
    const one = remaining[0];

    if (CONSONANTS[one]) {
      result += CONSONANTS[one];
      // Check if next char is a vowel matra
      if (i + 1 < word.length) {
        const nextMatra = MATRAS[word[i + 1]];
        if (nextMatra !== undefined) {
          result += nextMatra;
          i += 2;
          continue;
        }
      }
      result += "्"; // halant for conjunct
      i += 1;
      continue;
    }

    if (VOWELS[one]) {
      if (result.length === 0 || isVowelChar(result.slice(-1))) {
        result += VOWELS[one] || "";
      } else {
        result += MATRAS[one] || "";
      }
      i += 1;
      continue;
    }

    // Unknown char — pass through
    result += one;
    i += 1;
  }

  return result;
}

function isVowelChar(ch: string): boolean {
  return "अआइईउऊएऐओऔ".includes(ch);
}

/**
 * Build the combined "English / Marathi" string for a field.
 * If marathiOverride is provided (user manually edited Marathi), use it.
 */
export function buildBilingualValue(
  english: string,
  marathiOverride?: string,
): string {
  if (!english) return "";
  const marathi = marathiOverride || transliterate(english);
  return `${english} / ${marathi}`;
}
