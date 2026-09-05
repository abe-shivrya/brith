/**
 * All editable fields from the authorized birth-record PDF template.
 * Derived by inspecting "adiba SignedDoc_BDMS_1.pdf" – the form at
 * Municipal Corporation Solapur (Form 5).
 */
export type BirthRecordData = {
  /** Child's name in English */
  childName: string;
  /** Child's name in Marathi/Devanagari */
  childNameMarathi: string;

  /** Sex in English */
  sex: string;
  /** Sex in Marathi/Devanagari */
  sexMarathi: string;

  /** Child's Aadhaar number */
  aadharNumber: string;

  /** Date of birth as DD-MM-YYYY */
  dateOfBirth: string;
  /** Date of birth written out in English words */
  dateOfBirthWords: string;

  /** Place of birth in English */
  placeOfBirth: string;
  /** Place of birth in Marathi/Devanagari */
  placeOfBirthMarathi: string;

  /** Mother's name in English */
  motherName: string;
  /** Mother's name in Marathi/Devanagari */
  motherNameMarathi: string;

  /** Father's name in English */
  fatherName: string;
  /** Father's name in Marathi/Devanagari */
  fatherNameMarathi: string;

  /** Mother's Aadhaar number */
  motherAadhar: string;

  /** Father's Aadhaar number */
  fatherAadhar: string;

  /** Address of parents at time of birth – English */
  parentsAddressAtBirth: string;
  /** Address of parents at time of birth – Marathi/Devanagari */
  parentsAddressAtBirthMarathi: string;

  /** Permanent address of parents – English */
  permanentAddress: string;
  /** Permanent address of parents – Marathi/Devanagari */
  permanentAddressMarathi: string;

  /** Registration number */
  registrationNumber: string;

  /** Date of registration as DD-MM-YYYY */
  dateOfRegistration: string;

  /** Remarks (if any) */
  remarks: string;

  /** Date of issue as DD-MM-YYYY */
  dateOfIssue: string;

  /**
   * Serial number – normally "1" for Form 5.
   * Kept configurable so the template stays reusable.
   */
  serialNumber: string;
};

/**
 * Empty / blank values – used in production so the form starts clean.
 */
export const emptyBirthRecordData: BirthRecordData = {
  childName: "",
  childNameMarathi: "",
  sex: "",
  sexMarathi: "",
  aadharNumber: "",
  dateOfBirth: "",
  dateOfBirthWords: "",
  placeOfBirth: "",
  placeOfBirthMarathi: "",
  motherName: "",
  motherNameMarathi: "",
  fatherName: "",
  fatherNameMarathi: "",
  motherAadhar: "",
  fatherAadhar: "",
  parentsAddressAtBirth: "",
  parentsAddressAtBirthMarathi: "",
  permanentAddress: "",
  permanentAddressMarathi: "",
  registrationNumber: "",
  dateOfRegistration: "",
  remarks: "",
  dateOfIssue: "",
  serialNumber: "1",
};

/**
 * Pre-filled sample data extracted from the supplied PDF template
 * (adiba SignedDoc_BDMS_1.pdf) — used only in development mode
 * so designers can preview the layout without manual data entry.
 *
 * Dates are stored in YYYY-MM-DD to match <input type="date">.
 */
export const templateBirthRecordData: BirthRecordData = {
  childName: "ADEEBANAAZ AZARODDIN ATTAR",
  childNameMarathi: "\u0905\u0926\u0940\u092C\u093E\u0928\u093E\u091C \u0905\u091D\u0930\u094B\u0926\u094D\u0926\u0940\u0928 \u0905\u091F\u094D\u091F\u093E\u0930",
  sex: "FEMALE",
  sexMarathi: "\u092E\u0941\u0932\u0917\u0940",
  aadharNumber: "",
  dateOfBirth: "2022-05-17",
  dateOfBirthWords: "",
  placeOfBirth:
    "SUYASH NURSING HOME SOLAPUR, SOLAPUR, SOLAPUR NORTH, SOLAPUR, MAHARASHTRA",
  placeOfBirthMarathi:
    "\u0938\u094B\u0932\u093E\u092A\u0942\u0930, \u0938\u094B\u0932\u093E\u092A\u0942\u0930 \u0909\u0924\u094D\u0924\u0930, \u0938\u094B\u0932\u093E\u092A\u0942\u0930, \u092E\u0939\u093E\u0930\u093E\u0937\u094D\u0924\u094D\u0930",
  motherName: "FARHAT JHAN AZARODDIN ATTAR",
  motherNameMarathi:
    "\u092B\u0930\u0939\u0924 \u091C\u0939\u093E\u0901 \u0905\u091D\u0930\u094B\u0926\u094D\u0926\u0940\u0928 \u0905\u091F\u094D\u091F\u093E\u0930",
  fatherName: "AZARODDIN KHUTBODDIN ATTAR",
  fatherNameMarathi:
    "\u0905\u091D\u0930\u094B\u0926\u094D\u0926\u0940\u0928 \u0916\u0941\u0924\u092C\u094B\u0926\u094D\u0926\u0940\u0928 \u0905\u091F\u094D\u091F\u093E\u0930",
  motherAadhar: "XXXX-XXXX-2993",
  fatherAadhar: "",
  parentsAddressAtBirth:
    "PLOT NO 15/B 1 ST FLOOR BILAL NAGAR JULE SOLAPUR, SOLAPUR, SOLAPUR NORTH, SOLAPUR, MAHARASHTRA, 413004",
  parentsAddressAtBirthMarathi:
    "\u092A\u094D\u0932\u0949\u091F \u0928\u0902 15 /\u092C\u0940 1ST \u092B\u094D\u0932\u094B\u0930 \u0938\u093F\u092C\u0932\u093E\u0932 \u0928\u0917\u0930 \u091C\u0941\u0933\u0947 \u0938\u094B\u0932\u093E\u092A\u0942\u0930, \u0938\u094B\u0932\u093E\u092A\u0942\u0930, \u0938\u094B\u0932\u093E\u092A\u0942\u0930 \u0909\u0924\u094D\u0924\u0930, \u0938\u094B\u0932\u093E\u092A\u0942\u0930, \u092E\u0939\u093E\u0930\u093E\u0937\u094D\u0924\u094D\u0930, 413004",
  permanentAddress:
    "PLOT NO 15/B 1 ST FLOOR BILAL NAGAR JULE SOLAPUR, SOLAPUR, SOLAPUR NORTH, SOLAPUR, MAHARASHTRA, 413004",
  permanentAddressMarathi:
    "\u092A\u094D\u0932\u0949\u091F \u0928\u0902 15 /\u092C\u0940 1ST \u092B\u094D\u0932\u094B\u0930 \u0938\u093F\u092C\u0932\u093E\u0932 \u0928\u0917\u0930 \u091C\u0941\u0933\u0947 \u0938\u094B\u0932\u093E\u092A\u0942\u0930, \u0938\u094B\u0932\u093E\u092A\u0942\u0930, \u0938\u094B\u0932\u093E\u092A\u0942\u0930 \u0909\u0924\u094D\u0924\u0930, \u0938\u094B\u0932\u093E\u092A\u0942\u0930, \u092E\u0939\u093E\u0930\u093E\u0937\u094D\u0924\u094D\u0930, 413004",
  registrationNumber: "B-2022: 27-90217-009309",
  dateOfRegistration: "2022-05-19",
  remarks: "BCE252628281 C",
  dateOfIssue: "2026-01-21",
  serialNumber: "1",
};

/**
 * Returns the correct initial data based on the current environment.
 *
 * – Development (npm run dev): pre-filled template data so the
 *   layout can be previewed without manual entry. A "Clear Form"
 *   button is also shown to blank everything out.
 * – Production / preview build: empty form for real data entry.
 */
export function getInitialBirthRecordData(): BirthRecordData {
  if (import.meta.env.DEV) {
    return { ...templateBirthRecordData };
  }
  return { ...emptyBirthRecordData };
}

/* ═══════════════════════════════════════════════════════════
   Validate Certificate form data
   ═══════════════════════════════════════════════════════════ */

export type CertificateFormData = {
  registrationNumber: string;
  nameEn: string;
  nameMr: string;
  gender: string;
  genderMr: string;
  dob: string;
  motherNameEn: string;
  motherNameMr: string;
  fatherNameEn: string;
  fatherNameMr: string;
  placeOfBirthEn: string;
  placeOfBirthMr: string;
  registrationDate: string;
  unitNameEn: string;
  unitNameMr: string;
  unitCode: string;
};

export const emptyCertificateFormData: CertificateFormData = {
  registrationNumber: "",
  nameEn: "",
  nameMr: "",
  gender: "",
  genderMr: "",
  dob: "",
  motherNameEn: "",
  motherNameMr: "",
  fatherNameEn: "",
  fatherNameMr: "",
  placeOfBirthEn: "",
  placeOfBirthMr: "",
  registrationDate: "",
  unitNameEn: "",
  unitNameMr: "",
  unitCode: "",
};

/**
 * Pre-filled certificate data from the supplied PDF template.
 * Used only in dev mode so the validation form can be
 * previewed without manual data entry.
 */
export const templateCertificateFormData: CertificateFormData = {
  registrationNumber: "B-2022: 27-90217-009309",
  nameEn: "ADEEBANAAZ AZARODDIN ATTAR",
  nameMr: "\u0905\u0926\u0940\u092C\u093E\u0928\u093E\u091C \u0905\u091D\u0930\u094B\u0926\u094D\u0926\u0940\u0928 \u0905\u091F\u094D\u091F\u093E\u0930",
  gender: "Female",
  genderMr: "\u0938\u094D\u0924\u094D\u0930\u0940",
  dob: "2022-05-17",
  motherNameEn: "FARHAT JHAN AZARODDIN ATTAR",
  motherNameMr:
    "\u092B\u0930\u0939\u0924 \u091C\u0939\u093E\u0901 \u0905\u091D\u0930\u094B\u0926\u094D\u0926\u0940\u0928 \u0905\u091F\u094D\u091F\u093E\u0930",
  fatherNameEn: "AZARODDIN KHUTBODDIN ATTAR",
  fatherNameMr:
    "\u0905\u091D\u0930\u094B\u0926\u094D\u0926\u0940\u0928 \u0916\u0941\u0924\u092C\u094B\u0926\u094D\u0926\u0940\u0928 \u0905\u091F\u094D\u091F\u093E\u0930",
  placeOfBirthEn:
    "SUYASH NURSING HOME SOLAPUR, SOLAPUR, SOLAPUR NORTH, SOLAPUR, MAHARASHTRA",
  placeOfBirthMr:
    "\u0938\u094B\u0932\u093E\u092A\u0942\u0930, \u0938\u094B\u0932\u093E\u092A\u0942\u0930 \u0909\u0924\u094D\u0924\u0930, \u0938\u094B\u0932\u093E\u092A\u0942\u0930, \u092E\u0939\u093E\u0930\u093E\u0937\u094D\u0924\u094D\u0930",
  registrationDate: "2022-05-19",
  unitNameEn: "MUNICIPAL CORPORATION SOLAPUR",
  unitNameMr: "\u0928\u0917\u0930 \u0928\u093F\u0917\u092E \u0938\u094B\u0932\u093E\u092A\u0942\u0930",
  unitCode: "90217",
};

export function getInitialCertificateFormData(): CertificateFormData {
  if (import.meta.env.DEV) {
    return { ...templateCertificateFormData };
  }
  return { ...emptyCertificateFormData };
}
