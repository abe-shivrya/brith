/**
 * ValidateCertificateForm.tsx
 *
 * Data entry form for the Validate Certificate page.
 * - English fields auto-fill Marathi via transliteration
 * - Marathi fields are independently editable (one-way sync)
 * - On submit, populates the certificate table
 * - In dev mode, starts pre-filled with template data
 */

import { useState, useCallback } from "react";
import { transliterate } from "../../utils/transliterate";
import {
  getInitialCertificateFormData,
  emptyCertificateFormData,
} from "../../types";
import "./ValidateCertificateForm.css";

/* Re-export the shared type for convenience */
export type { CertificateFormData } from "../../types";

type Props = {
  initialData?: import("../../types").CertificateFormData;
  onSubmit: (data: import("../../types").CertificateFormData) => void;
};

export default function ValidateCertificateForm({ initialData, onSubmit }: Props) {
  const [form, setForm] = useState(() => initialData || getInitialCertificateFormData());

  /* ── Track which Marathi fields have been manually edited ── */
  const [mrTouched, setMrTouched] = useState<Record<string, boolean>>({});

  /* ── Generic change handler ── */
  const handleChange = useCallback(
    (field: keyof import("../../types").CertificateFormData, value: string) => {
      setForm((prev) => {
        const next = { ...prev, [field]: value };

        /* One-way sync: English → Marathi (only if Marathi not manually edited) */
        const syncMap: Partial<
          Record<
            keyof import("../../types").CertificateFormData,
            keyof import("../../types").CertificateFormData
          >
        > = {
          nameEn: "nameMr",
          gender: "genderMr",
          motherNameEn: "motherNameMr",
          fatherNameEn: "fatherNameMr",
          placeOfBirthEn: "placeOfBirthMr",
          unitNameEn: "unitNameMr",
        };

        const mrField = syncMap[field];
        if (mrField && !mrTouched[mrField]) {
          next[mrField] = transliterate(value.trim());
        }

        return next;
      });
    },
    [mrTouched],
  );

  /* ── Marathi field manually edited → mark as touched ── */
  const handleMrChange = useCallback(
    (mrField: keyof import("../../types").CertificateFormData, value: string) => {
      setMrTouched((prev) => ({ ...prev, [mrField]: true }));
      setForm((prev) => ({ ...prev, [mrField]: value }));
    },
    [],
  );

  /* ── Submit ── */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(form);
  };

  /* ── Reset ── */
  const handleReset = () => {
    setForm({ ...emptyCertificateFormData });
    setMrTouched({});
  };

  /* ── Dev-mode clear button ── */
  const isDev = import.meta.env.DEV;

  return (
    <form className="vc-form" onSubmit={handleSubmit}>
      <h3 className="vc-form-title">Enter Certificate Details</h3>

      {/* Registration Number */}
      <div className="vc-field">
        <label className="vc-label" htmlFor="vc-regNo">
          Registration Number
        </label>
        <input
          id="vc-regNo"
          type="text"
          className="vc-input"
          placeholder="B-2022: 27-90217-009309"
          value={form.registrationNumber}
          onChange={(e) => handleChange("registrationNumber", e.target.value)}
        />
      </div>

      {/* Name (English) */}
      <div className="vc-field">
        <label className="vc-label" htmlFor="vc-nameEn">NAME (English)</label>
        <input
          id="vc-nameEn"
          type="text"
          className="vc-input"
          placeholder="ADEEBANAAZ AZARODDIN ATTAR"
          value={form.nameEn}
          onChange={(e) => handleChange("nameEn", e.target.value)}
        />
      </div>

      {/* Name (Marathi) — auto-filled, editable */}
      <div className="vc-field">
        <label className="vc-label" htmlFor="vc-nameMr">NAME (मराठी)</label>
        <input
          id="vc-nameMr"
          type="text"
          className="vc-input vc-input-mr"
          placeholder="अदीबानाज अझरोद्दीन अत्तार"
          value={form.nameMr}
          onChange={(e) => handleMrChange("nameMr", e.target.value)}
        />
        <span className="vc-hint">
          Auto-filled from English. Edit to correct.
        </span>
      </div>

      {/* Gender */}
      <div className="vc-field">
        <label className="vc-label" htmlFor="vc-gender">GENDER</label>
        <select
          id="vc-gender"
          className="vc-input"
          value={form.gender}
          onChange={(e) => handleChange("gender", e.target.value)}
        >
          <option value="">Select…</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
      </div>

      {/* Gender (Marathi) — auto-filled */}
      <div className="vc-field">
        <label className="vc-label" htmlFor="vc-genderMr">GENDER (मराठी)</label>
        <input
          id="vc-genderMr"
          type="text"
          className="vc-input vc-input-mr"
          placeholder="स्त्री"
          value={form.genderMr}
          onChange={(e) => handleMrChange("genderMr", e.target.value)}
        />
      </div>

      {/* DOB */}
      <div className="vc-field">
        <label className="vc-label" htmlFor="vc-dob">DOB</label>
        <input
          id="vc-dob"
          type="date"
          className="vc-input"
          value={form.dob}
          onChange={(e) => handleChange("dob", e.target.value)}
        />
      </div>

      {/* Mother Name (English) */}
      <div className="vc-field">
        <label className="vc-label" htmlFor="vc-motherEn">Name Of Mother (English)</label>
        <input
          id="vc-motherEn"
          type="text"
          className="vc-input"
          placeholder="FARHAT JHAN AZARODDIN ATTAR"
          value={form.motherNameEn}
          onChange={(e) => handleChange("motherNameEn", e.target.value)}
        />
      </div>

      {/* Mother Name (Marathi) — auto-filled */}
      <div className="vc-field">
        <label className="vc-label" htmlFor="vc-motherMr">Name Of Mother (मराठी)</label>
        <input
          id="vc-motherMr"
          type="text"
          className="vc-input vc-input-mr"
          placeholder="फरहत जहाँ अझरोद्दींन अत्तार"
          value={form.motherNameMr}
          onChange={(e) => handleMrChange("motherNameMr", e.target.value)}
        />
        <span className="vc-hint">
          Auto-filled from English. Edit to correct.
        </span>
      </div>

      {/* Father Name (English) */}
      <div className="vc-field">
        <label className="vc-label" htmlFor="vc-fatherEn">Name Of Father (English)</label>
        <input
          id="vc-fatherEn"
          type="text"
          className="vc-input"
          placeholder="AZARODDIN KHUTBODDIN ATTAR"
          value={form.fatherNameEn}
          onChange={(e) => handleChange("fatherNameEn", e.target.value)}
        />
      </div>

      {/* Father Name (Marathi) — auto-filled */}
      <div className="vc-field">
        <label className="vc-label" htmlFor="vc-fatherMr">Name Of Father (मराठी)</label>
        <input
          id="vc-fatherMr"
          type="text"
          className="vc-input vc-input-mr"
          placeholder="अझरोद्दींन खुतबोद्दीन अत्तार"
          value={form.fatherNameMr}
          onChange={(e) => handleMrChange("fatherNameMr", e.target.value)}
        />
        <span className="vc-hint">
          Auto-filled from English. Edit to correct.
        </span>
      </div>

      {/* Place of Birth (English) */}
      <div className="vc-field">
        <label className="vc-label" htmlFor="vc-placeEn">Place of Birth (English)</label>
        <input
          id="vc-placeEn"
          type="text"
          className="vc-input"
          placeholder="SUYASH NURSING HOME SOLAPUR, SOLAPUR"
          value={form.placeOfBirthEn}
          onChange={(e) => handleChange("placeOfBirthEn", e.target.value)}
        />
      </div>

      {/* Place of Birth (Marathi) — auto-filled */}
      <div className="vc-field">
        <label className="vc-label" htmlFor="vc-placeMr">Place of Birth (मराठी)</label>
        <input
          id="vc-placeMr"
          type="text"
          className="vc-input vc-input-mr"
          placeholder="सोलापूर, सोलापूर उत्तर, सोलापूर, महाराष्ट्र"
          value={form.placeOfBirthMr}
          onChange={(e) => handleMrChange("placeOfBirthMr", e.target.value)}
        />
        <span className="vc-hint">
          Auto-filled from English. Edit to correct.
        </span>
      </div>

      {/* Registration Date */}
      <div className="vc-field">
        <label className="vc-label" htmlFor="vc-regDate">Registration Date</label>
        <input
          id="vc-regDate"
          type="date"
          className="vc-input"
          value={form.registrationDate}
          onChange={(e) => handleChange("registrationDate", e.target.value)}
        />
      </div>

      {/* Unit Name (English) */}
      <div className="vc-field">
        <label className="vc-label" htmlFor="vc-unitEn">Registration Unit Name (English)</label>
        <input
          id="vc-unitEn"
          type="text"
          className="vc-input"
          placeholder="MUNICIPAL CORPORATION SOLAPUR"
          value={form.unitNameEn}
          onChange={(e) => handleChange("unitNameEn", e.target.value)}
        />
      </div>

      {/* Unit Name (Marathi) — auto-filled */}
      <div className="vc-field">
        <label className="vc-label" htmlFor="vc-unitMr">Registration Unit Name (मराठी)</label>
        <input
          id="vc-unitMr"
          type="text"
          className="vc-input vc-input-mr"
          placeholder="नगर निगम सोलापूर"
          value={form.unitNameMr}
          onChange={(e) => handleMrChange("unitNameMr", e.target.value)}
        />
        <span className="vc-hint">
          Auto-filled from English. Edit to correct.
        </span>
      </div>

      {/* Unit Code */}
      <div className="vc-field">
        <label className="vc-label" htmlFor="vc-unitCode">Registration Unit Code</label>
        <input
          id="vc-unitCode"
          type="text"
          className="vc-input"
          placeholder="90217"
          value={form.unitCode}
          onChange={(e) => handleChange("unitCode", e.target.value)}
        />
      </div>

      {/* Actions */}
      <div className="vc-form-actions">
        <button type="submit" className="vc-btn vc-btn-submit">
          Submit
        </button>
        {isDev && (
          <button
            type="button"
            className="vc-btn vc-btn-reset"
            onClick={handleReset}
          >
            Clear
          </button>
        )}
      </div>
    </form>
  );
}
