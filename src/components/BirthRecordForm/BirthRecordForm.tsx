/**
 * BirthRecordForm
 *
 * Data-entry form for all editable fields in the birth-record document.
 * Supports Marathi/Devanagari input via browser IME; no extra library needed.
 *
 * The form holds its own local state and calls onSubmit with validated data.
 */

import { useState, useCallback, type FormEvent } from "react";
import type { BirthRecordData } from "../../types";
import {
  getInitialBirthRecordData,
  emptyBirthRecordData,
} from "../../types";
import { dateToWords } from "../../utils/dateToWords";
import "./BirthRecordForm.css";

type Props = {
  onSubmit: (data: BirthRecordData) => void;
  initialData?: BirthRecordData;
};

/* ────────────────────── validation ─────────────────────── */
type Errors = Partial<Record<keyof BirthRecordData, string>>;

function validate(d: BirthRecordData): Errors {
  const e: Errors = {};
  if (!d.childName.trim()) e.childName = "Required";
  if (!d.childNameMarathi.trim()) e.childNameMarathi = "Required";
  if (!d.sex.trim()) e.sex = "Required";
  if (!d.dateOfBirth.trim()) e.dateOfBirth = "Required";
  if (!d.placeOfBirth.trim()) e.placeOfBirth = "Required";
  if (!d.motherName.trim()) e.motherName = "Required";
  if (!d.fatherName.trim()) e.fatherName = "Required";
  if (!d.registrationNumber.trim()) e.registrationNumber = "Required";
  if (!d.dateOfRegistration.trim()) e.dateOfRegistration = "Required";
  if (!d.dateOfIssue.trim()) e.dateOfIssue = "Required";
  return e;
}

/* ────────────────────── field config ───────────────────── */
type FieldDef = {
  key: keyof BirthRecordData;
  label: string;
  labelMarathi: string;
  type?: "text" | "date" | "textarea";
  required?: boolean;
  lang?: "en" | "mr";
  placeholder?: string;
};

const FIELDS: FieldDef[] = [
  {
    key: "childName",
    label: "Child's Full Name",
    labelMarathi: "मुलाचे पूर्ण नाव",
    required: true,
    placeholder: "e.g. ADEEBANAAZ AZARODDIN ATTAR",
  },
  {
    key: "childNameMarathi",
    label: "Name in Marathi",
    labelMarathi: "मराठीतील नाव",
    required: true,
    lang: "mr",
    placeholder: "e.g. अदीबानाज अझरोद्दीन अट्टार",
  },
  {
    key: "sex",
    label: "Sex",
    labelMarathi: "लिंग",
    required: true,
    placeholder: "e.g. MALE / FEMALE",
  },
  {
    key: "sexMarathi",
    label: "Sex in Marathi",
    labelMarathi: "मराठीतील लिंग",
    lang: "mr",
    placeholder: "e.g. मुलगा / मुलगी",
  },
  {
    key: "aadharNumber",
    label: "Aadhaar Number",
    labelMarathi: "आधार क्रमांक",
    placeholder: "XXXX-XXXX-XXXX",
  },
  {
    key: "dateOfBirth",
    label: "Date of Birth",
    labelMarathi: "जन्म दिनांक",
    type: "date",
    required: true,
  },
  {
    key: "placeOfBirth",
    label: "Place of Birth",
    labelMarathi: "जन्म ठिकाण",
    required: true,
    placeholder: "Hospital, City, District, State",
  },
  {
    key: "placeOfBirthMarathi",
    label: "Place of Birth in Marathi",
    labelMarathi: "मराठीतील जन्म ठिकाण",
    lang: "mr",
    placeholder: "मराठीतील ठिकाण",
  },
  {
    key: "motherName",
    label: "Mother's Name",
    labelMarathi: "आईचे नाव",
    required: true,
  },
  {
    key: "motherNameMarathi",
    label: "Mother's Name in Marathi",
    labelMarathi: "मराठीतील आईचे नाव",
    lang: "mr",
  },
  {
    key: "fatherName",
    label: "Father's Name",
    labelMarathi: "वडिलांचे नाव",
    required: true,
  },
  {
    key: "fatherNameMarathi",
    label: "Father's Name in Marathi",
    labelMarathi: "मराठीतील वडिलांचे नाव",
    lang: "mr",
  },
  {
    key: "motherAadhar",
    label: "Mother's Aadhaar Number",
    labelMarathi: "आईचा आधार क्रमांक",
  },
  {
    key: "fatherAadhar",
    label: "Father's Aadhaar Number",
    labelMarathi: "वडिलांचा आधार क्रमांक",
  },
  {
    key: "parentsAddressAtBirth",
    label: "Parents' Address at Time of Birth",
    labelMarathi: "मुलाच्या जन्माच्या वेळी पालकांचा पत्ता",
    type: "textarea",
  },
  {
    key: "parentsAddressAtBirthMarathi",
    label: "Address at Birth in Marathi",
    labelMarathi: "मराठीतील पत्ता (जन्माच्या वेळी)",
    type: "textarea",
    lang: "mr",
  },
  {
    key: "permanentAddress",
    label: "Permanent Address",
    labelMarathi: "पालकांचा कायमचा पत्ता",
    type: "textarea",
  },
  {
    key: "permanentAddressMarathi",
    label: "Permanent Address in Marathi",
    labelMarathi: "मराठीतील कायमचा पत्ता",
    type: "textarea",
    lang: "mr",
  },
  {
    key: "registrationNumber",
    label: "Registration Number",
    labelMarathi: "नोंदणी क्रमांक",
    required: true,
    placeholder: "e.g. B-2022: 27-90217-009309",
  },
  {
    key: "dateOfRegistration",
    label: "Date of Registration",
    labelMarathi: "नोंदणी दिनांक",
    type: "date",
    required: true,
  },
  {
    key: "remarks",
    label: "Remarks (if any)",
    labelMarathi: "शेरा (असल्यास)",
    type: "textarea",
  },
  {
    key: "dateOfIssue",
    label: "Date of Issue",
    labelMarathi: "प्रमाणपत्र दिल्याचा दिनांक",
    type: "date",
    required: true,
  },
];

/* ────────────────────── component ──────────────────────── */
export default function BirthRecordForm({ onSubmit, initialData }: Props) {
  const [data, setData] = useState<BirthRecordData>(
    initialData || getInitialBirthRecordData()
  );
  const [errors, setErrors] = useState<Errors>({});
  const [showErrors, setShowErrors] = useState(false);

  /** Only show "Clear Form" in dev when template data is pre-filled */
  const isDev = import.meta.env.DEV;

  const handleChange = useCallback(
    (key: keyof BirthRecordData, value: string) => {
      setData((prev) => ({ ...prev, [key]: value }));
      // Clear error on edit
      if (errors[key]) {
        setErrors((prev) => {
          const next = { ...prev };
          delete next[key];
          return next;
        });
      }
    },
    [errors]
  );

  const handleClear = useCallback(() => {
    setData({ ...emptyBirthRecordData });
    setErrors({});
    setShowErrors(false);
  }, []);

  const handleSubmit = useCallback(
    (e: FormEvent) => {
      e.preventDefault();
      const errs = validate(data);
      setErrors(errs);
      if (Object.keys(errs).length > 0) {
        setShowErrors(true);
        // Scroll to first error
        const firstErrKey = Object.keys(errs)[0];
        const el = document.querySelector(`[data-field="${firstErrKey}"]`);
        el?.scrollIntoView({ behavior: "smooth", block: "center" });
        return;
      }
      // Auto-generate date-of-birth in words
      const finalData: BirthRecordData = {
        ...data,
        dateOfBirthWords: dateToWords(data.dateOfBirth),
      };
      onSubmit(finalData);
    },
    [data, onSubmit]
  );

  const errorCount = Object.keys(errors).length;

  return (
    <form className="birth-form" onSubmit={handleSubmit} noValidate>
      <div className="form-header">
        <h1 className="form-title">
          <span className="marathi">जन्म प्रमाणपत्र</span> — Birth Record
          Entry
        </h1>
        <p className="form-subtitle">
          Fill in the fields below. Fields marked with * are required.
        </p>
      </div>

      <div className="form-fields">
        {FIELDS.map((f) => {
          const val = data[f.key] as string;
          const err = showErrors ? errors[f.key] : undefined;
          const inputId = `field-${f.key}`;

          return (
            <div
              key={f.key}
              className={`form-group ${err ? "has-error" : ""}`}
              data-field={f.key}
            >
              <label htmlFor={inputId} className="form-label">
                <span className={f.lang === "mr" ? "marathi" : ""}>
                  {f.labelMarathi}
                </span>
                <span className="form-label-en">{f.label}</span>
                {f.required && <span className="required-star">*</span>}
              </label>

              {f.type === "textarea" ? (
                <textarea
                  id={inputId}
                  className={`form-input form-textarea ${err ? "input-error" : ""}`}
                  value={val}
                  lang={f.lang === "mr" ? "mr" : undefined}
                  dir={f.lang === "mr" ? "ltr" : undefined}
                  placeholder={f.placeholder}
                  rows={3}
                  onChange={(e) => handleChange(f.key, e.target.value)}
                />
              ) : f.type === "date" ? (
                <input
                  id={inputId}
                  type="date"
                  className={`form-input ${err ? "input-error" : ""}`}
                  value={val}
                  onChange={(e) => handleChange(f.key, e.target.value)}
                />
              ) : (
                <input
                  id={inputId}
                  type="text"
                  className={`form-input ${err ? "input-error" : ""}`}
                  value={val}
                  lang={f.lang === "mr" ? "mr" : undefined}
                  placeholder={f.placeholder}
                  onChange={(e) => handleChange(f.key, e.target.value)}
                />
              )}

              {err && <span className="form-error">{err}</span>}
            </div>
          );
        })}
      </div>

      {showErrors && errorCount > 0 && (
        <div className="form-error-summary">
          Please fix {errorCount} error{errorCount > 1 ? "s" : ""} above before
          generating the preview.
        </div>
      )}

      <div className="form-actions">
        {isDev && (
          <button
            type="button"
            className="btn btn-secondary"
            onClick={handleClear}
          >
            Clear Form
          </button>
        )}
        <button type="submit" className="btn btn-primary">
          Submit / Generate Preview
        </button>
      </div>
    </form>
  );
}
