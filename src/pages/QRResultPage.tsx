/**
 * QRResultPage.tsx
 *
 * Shown after the validate form is submitted.
 * Fetches the certificate record from GitHub repo by ID
 * and displays the details table.
 *
 * Route: /#/qr/:id
 */

import { useParams, Link, useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { getCertRecord } from "../utils/githubStore";
import { downloadCertFiles } from "../utils/certStore";
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

export default function QRResultPage() {
  const { id } = useParams<{ id: string }>();
  const [record, setRecord] = useState<CertRecord | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const [searchParams] = useSearchParams();
  const shouldDownload = searchParams.get("download") === "1";

  useEffect(() => {
    if (!id) {
      setLoading(false);
      setError(true);
      return;
    }
    getCertRecord(id).then((r) => {
      if (r) {
        setRecord(r);
        // Auto-download QR only when coming from form submission
        if (shouldDownload) {
          downloadCertFiles(id);
        }
      } else {
        setError(true);
      }
      setLoading(false);
    });
  }, [id, shouldDownload]);

  if (!id || error) {
    return (
      <div className="workflow-container">
        <h2 className="workflow-title">{!id ? "Invalid Link" : "Record Not Found"}</h2>
        <p style={{ textAlign: "center" }}>
          {!id
            ? "No record ID provided."
            : <>No certificate record found for ID: <strong>{id}</strong></>}
        </p>
        <div style={{ textAlign: "center", marginTop: 20 }}>
          <Link to="/validate" className="vc-btn vc-btn-reset">
            ← Go to Validate Form
          </Link>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="workflow-container">
        <h2 className="workflow-title">Loading…</h2>
        <p style={{ textAlign: "center" }}>Fetching record from server…</p>
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
      <div className="cert-table-wrapper">
        <div className="validate-content">
          <div className="validate-container">
            <div className="validate-card">
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
      </div>
    </div>
  );
}