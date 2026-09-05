/**
 * ValidateFormPage.tsx
 *
 * Validate certificate data entry form.
 * On submit → saves record to GitHub repo + navigates to /#/qr/:id
 * Supports ?id=<id> query param to load existing record.
 *
 * Route: /#/validate?id=<id> (optional)
 */

import { useNavigate, useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";
import ValidateCertificateForm from "./ValidateCertificate/ValidateCertificateForm";
import { saveCertRecord, getCertRecord } from "../utils/githubStore";

export default function ValidateFormPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const existingId = searchParams.get("id") || undefined;

  const [initialData, setInitialData] = useState<
    import("../types").CertificateFormData
  | undefined
  >(undefined);
  const [loading, setLoading] = useState(!!existingId);

  useEffect(() => {
    if (!existingId) return;
    getCertRecord(existingId).then((record) => {
      if (record) setInitialData(record.data);
      setLoading(false);
    });
  }, [existingId]);

  if (loading) {
    return (
      <div className="workflow-container">
        <h2 className="workflow-title">Loading record…</h2>
        <p style={{ textAlign: "center" }}>Fetching data from server…</p>
      </div>
    );
  }

  return (
    <div className="workflow-container">
      <h2 className="workflow-title">Validate Certificate</h2>
      <ValidateCertificateForm
        initialData={initialData}
        onSubmit={async (data) => {
          const id = await saveCertRecord(data);
          navigate(`/qr/${id}?download=1`);
        }}
      />
    </div>
  );
}
