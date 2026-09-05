/**
 * ValidateTablePage.tsx
 *
 * Displays submitted certificate data in a table.
 * Data comes from AppContext (set by ValidateFormPage).
 * Back button navigates to /#/validate via router.
 *
 * Route: /#/validate/table
 */

import { useAppContext } from "../context/AppContext";
import "../pages/ValidateCertificate/ValidateCertificate.css";

type CertificateField = {
  label: string;
  value: string;
};

/** Format YYYY-MM-DD → DD-MM-YYYY */
function fmtDate(iso: string): string {
  if (!iso) return "";
  const [y, m, d] = iso.split("-");
  return `${d}-${m}-${y}`;
}

/** Build combined "English / Marathi" value */
function merge(en: string, mr: string): string {
  if (!en && !mr) return "";
  if (!mr) return en;
  if (!en) return mr;
  return `${en} / ${mr}`;
}

export default function ValidateTablePage() {
  const { certData } = useAppContext();

  const tableData: CertificateField[] = [
    { label: "Registration Number", value: certData.registrationNumber },
    { label: "NAME", value: merge(certData.nameEn, certData.nameMr) },
    { label: "GENDER", value: merge(certData.gender, certData.genderMr) },
    { label: "DOB", value: fmtDate(certData.dob) },
    { label: "Name Of Mother", value: merge(certData.motherNameEn, certData.motherNameMr) },
    { label: "Name Of Father", value: merge(certData.fatherNameEn, certData.fatherNameMr) },
    { label: "Place  of Birth", value: merge(certData.placeOfBirthEn, certData.placeOfBirthMr) },
    { label: "Registration Date", value: fmtDate(certData.registrationDate) },
    { label: "Registration Unit Name", value: merge(certData.unitNameEn, certData.unitNameMr) },
    { label: "Registration Unit Code", value: certData.unitCode },
  ];

  return (
    <div className="workflow-container">
      {/* <h2 className="workflow-title">Validate Certificate</h2> */}

      <div className="cert-table-wrapper">
        {/* <div className="cert-table-actions">
          <Link to="/validate" className="vc-btn vc-btn-reset">
            ← Back to Edit
          </Link>
        </div> */}
        <div className="validate-content">
          <div className="validate-container">
            <div className="validate-card">
              {/* <h3 className="validate-table-title">Certificate Details</h3> */}
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
