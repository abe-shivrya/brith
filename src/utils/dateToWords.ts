/**
 * Convert a numeric date to its English-word representation.
 * Accepts DD-MM-YYYY or YYYY-MM-DD; outputs e.g.
 * "SEVENTEENTH-MAY-TWO THOUSAND TWENTY TWO"
 */

const ONES = [
  "",
  "ONE",
  "TWO",
  "THREE",
  "FOUR",
  "FIVE",
  "SIX",
  "SEVEN",
  "EIGHT",
  "NINE",
  "TEN",
  "ELEVEN",
  "TWELVE",
  "THIRTEEN",
  "FOURTEEN",
  "FIFTEEN",
  "SIXTEEN",
  "SEVENTEENTH",
  "EIGHTEENTH",
  "NINETEENTH",
];

// Note: for days 21-31 we need special handling, so let's use a full mapping
const DAYS: Record<number, string> = {
  1: "FIRST",
  2: "SECOND",
  3: "THIRD",
  4: "FOURTH",
  5: "FIFTH",
  6: "SIXTH",
  7: "SEVENTH",
  8: "EIGHTH",
  9: "NINTH",
  10: "TENTH",
  11: "ELEVENTH",
  12: "TWELFTH",
  13: "THIRTEENTH",
  14: "FOURTEENTH",
  15: "FIFTEENTH",
  16: "SIXTEENTH",
  17: "SEVENTEENTH",
  18: "EIGHTEENTH",
  19: "NINETEENTH",
  20: "TWENTIETH",
  21: "TWENTY-FIRST",
  22: "TWENTY-SECOND",
  23: "TWENTY-THIRD",
  24: "TWENTY-FOURTH",
  25: "TWENTY-FIFTH",
  26: "TWENTY-SIXTH",
  27: "TWENTY-SEVENTH",
  28: "TWENTY-EIGHTH",
  29: "TWENTY-NINTH",
  30: "THIRTIETH",
  31: "THIRTY-FIRST",
};

const MONTHS: Record<number, string> = {
  1: "JANUARY",
  2: "FEBRUARY",
  3: "MARCH",
  4: "APRIL",
  5: "MAY",
  6: "JUNE",
  7: "JULY",
  8: "AUGUST",
  9: "SEPTEMBER",
  10: "OCTOBER",
  11: "NOVEMBER",
  12: "DECEMBER",
};

function yearToWords(year: number): string {
  if (year < 1000 || year > 9999) return String(year);

  const thousands = Math.floor(year / 1000);
  const hundreds = Math.floor((year % 1000) / 100);
  const tens = Math.floor((year % 100) / 10);
  const ones = year % 10;

  let result = "";
  if (thousands > 0) result += ONES[thousands] + " THOUSAND";
  if (hundreds > 0) {
    result += (result ? " " : "") + ONES[hundreds] + " HUNDRED";
  }
  if (tens === 1) {
    // 10-19
    result +=
      (result ? " " : "") +
      ["TEN", "ELEVEN", "TWELVE", "THIRTEEN", "FOURTEEN", "FIFTEEN", "SIXTEEN", "SEVENTEENTH", "EIGHTEENTH", "NINETEEN"][ones];
  } else {
    const tensWord = ["", "", "TWENTY", "THIRTY", "FORTY", "FIFTY", "SIXTY", "SEVENTY", "EIGHTY", "NINETY"][tens];
    if (tensWord) result += (result ? " " : "") + tensWord;
    if (ones > 0) result += (tensWord ? "-" : " ") + ONES[ones];
  }

  return result;
}

export function dateToWords(dateStr: string): string {
  if (!dateStr) return "";

  let day: number;
  let month: number;
  let year: number;

  // Handle DD-MM-YYYY
  if (/^\d{2}-\d{2}-\d{4}$/.test(dateStr)) {
    const [d, m, y] = dateStr.split("-").map(Number);
    day = d;
    month = m;
    year = y;
  }
  // Handle YYYY-MM-DD
  else if (/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
    const [y, m, d] = dateStr.split("-").map(Number);
    day = d;
    month = m;
    year = y;
  }
  else {
    return "";
  }

  const dayWord = DAYS[day] || String(day);
  const monthWord = MONTHS[month] || String(month);
  const yearWord = yearToWords(year);

  return `${dayWord}-${monthWord}-${yearWord}`;
}
