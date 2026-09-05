/**
 * VerifyPage.tsx
 *
 * Scanned QR code lands here.
 * Fetches the certificate record from GitHub repo by ID
 * and displays the details table.
 *
 * Route: /#/verify/:id
 */

import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { getCertRecord } from "../utils/githubStore";
import type { CertRecord } from "../utils/githubStore";
import "../pages/ValidateCertificate/ValidateCertificate.css";

type CertificateField = {
  label: string;
  value: string;
};

function fmtDate(iso: string): string {
  if (!iso) return "";
  const [y, m, d] = iso.split("-");
  return `${d}-${m}-${y}`;
}

function merge(en: string, mr: string): string {
  if (!en && !mr) return "";
  if (!mr) return en;
  if (!en) return mr;
  return `${en} / ${mr}`;
}

export default function VerifyPage() {
  const { id } = useParams<{ id: string }>();
  const [record, setRecord] = useState<CertRecord | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!id) {
      setLoading(false);
      setError(true);
      return;
    }
    getCertRecord(id).then((r) => {
      if (r) {
        setRecord(r);
      } else {
        setError(true);
      }
      setLoading(false);
    });
  }, [id]);

  if (!id || error) {
    return (
      <div className="workflow-container">
        <h2 className="workflow-title">{!id ? "Invalid Link" : "Record Not Found"}</h2>
        <p style={{ textAlign: "center" }}>
          {!id
            ? "No record ID provided."
            : <>No certificate record found for ID: <strong>{id}</strong></>}
        </p>
        <p style={{ textAlign: "center", color: "#888", fontSize: 13 }}>
          This QR code may be invalid or the record was not saved.
        </p>
        <div style={{ textAlign: "center", marginTop: 20 }}>
          <Link to="/" className="vc-btn vc-btn-reset">
            ← Go to Home
          </Link>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="workflow-container">
        <h2 className="workflow-title">Loading…</h2>
        <p style={{ textAlign: "center" }}>Verifying certificate…</p>
      </div>
    );
  }

  const { data } = record!;

  const tableData: CertificateField[] = [
    { label: "Registration Number", value: data.registrationNumber },
    { label: "NAME", value: merge(data.nameEn, data.nameMr) },
    { label: "GENDER", value: merge(data.gender, data.genderMr) },
    { label: "DOB", value: fmtDate(data.dob) },
    { label: "Name Of Mother", value: merge(data.motherNameEn, data.motherNameMr) },
    { label: "Name Of Father", value: merge(data.fatherNameEn, data.fatherNameMr) },
    { label: "Place  of Birth", value: merge(data.placeOfBirthEn, data.placeOfBirthMr) },
    { label: "Registration Date", value: fmtDate(data.registrationDate) },
    { label: "Registration Unit Name", value: merge(data.unitNameEn, data.unitNameMr) },
    { label: "Registration Unit Code", value: data.unitCode },
  ];

  return (
    <div className="workflow-container">
      <h2 className="workflow-title">Certificate Verification</h2>

      <div className="cert-table-wrapper">
        <div className="validate-content">
          <div className="validate-container">
            <div className="validate-card">
              <h3 className="validate-table-title">Certificate Details</h3>
              <table className="validate-table">
                <tbody>
                  {tableData.map((field) => (
                    <tr key={field.label}>
                      <td className="validate-td-label text-left">
                        {field.label}
                      </td>
                      <td className="validate-td-value text-left">
                        {field.value || (
                          <span className="validate-empty">—</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div style={{ textAlign: "center", marginTop: 20 }}>
          <Link to="/" className="vc-btn vc-btn-reset">
            ← Go to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
