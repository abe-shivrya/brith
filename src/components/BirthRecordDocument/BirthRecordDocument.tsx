/**
 * BirthRecordDocument
 *
 * Renders the authorised birth-certificate layout as a pure HTML/CSS document.
 * All editable data arrives via props so the component can be reused for
 * preview, print, or PDF export.
 *
 * Layout reference: adiba SignedDoc_BDMS_1.pdf (Form 5 – Municipal Corporation Solapur).
 * Page size: A4 portrait (210 × 297 mm).
 *
 * Coordinate notes:
 *   – The PDF was generated at 2× A4 scale (1191 × 1684 pt).
 *   – All positions below are expressed in CSS px at 96 DPI (794 × 1123 px),
 *     which maps 1:1 when printed at A4 via @page.
 */

import type { BirthRecordData } from "../../types";
import leftLogo from "../../assets/left_logo.svg";
import rightLogo from "../../assets/right_logo.png";
import signImg from "../../assets/signpng.png";
import "./BirthRecordDocument.css";

type Props = {
  data: BirthRecordData;
};

/* ───────────────────────── helpers ──────────────────────── */
const lbl = (marathi: string, english: string) => (
  <>
    <span className="marathi">{marathi}</span> / {english}:
  </>
);

/** Convert YYYY-MM-DD (from <input type="date">) → DD-MM-YYYY for display. */
function fmtDate(iso: string): string {
  if (!iso) return "";
  const [y, m, d] = iso.split("-");
  if (!y || !m || !d) return iso; // already in another format
  return `${d}-${m}-${y}`;
}

/* ───────────────────────── component ───────────────────── */
export default function BirthRecordDocument({ data }: Props) {
  const d = data;

  return (
    <div className="birth-doc" id="birth-record-document">
    <div className="birth-doc-border">
      {/* ───── header ───── */}
      <header className="doc-header">
        {/* Left: serial number text + government emblem */}
        <div className="logo-group logo-group-left">
          <span className="logo-label">
            अनु. क्र. {d.serialNumber || "1"}
            <br />
            S.No.1
          </span>
          <img src={leftLogo} alt="Government Emblem" className="logo-img" />
        </div>

        {/* Center: government headings */}
        <div className="govt-heading">
          <div className="marathi heading-line">महाराष्ट्र शासन</div>
          <div className="english heading-line bold">
            GOVERNMENT OF MAHARASHTRA
          </div>
          <div className="marathi heading-line">सार्वजनिक आरोग्य विभाग</div>
          <div className="english heading-line bold">
            DEPARTMENT OF PUBLIC HEALTH
          </div>
          <div className="marathi heading-line">नगर निगम सोलापूर</div>
          <div className="english heading-line bold">
            MUNICIPAL CORPORATION SOLAPUR
          </div>
        </div>

        {/* Right: form number text + right logo */}
        <div className="logo-group logo-group-right">
          <span className="logo-label">
            फॉम. 5
            <br />
            <small>FORM5</small>
          </span>
          <img src={rightLogo} alt="Right Logo" className="logo-img" />
        </div>
      </header>

      {/* ───── title ───── */}
      <div className="doc-title">
        <div className="marathi title-main">जन्म प्रमाणपत्र</div>
        <div className="english title-sub bold">BIRTH CERTIFICATE</div>
        <br/>
      </div>

      {/* ───── legal notice (Marathi + English) ───── */}
      <section className="legal-notice">
        <p className="marathi legal-text">
          (जन्म आणि मृत्यू नोंदणी अधिनियम, 1969 या कलम 12/17 आणि
          महाराष्ट्र जन्म आणि मृत्यू नियम 2000 चे नियम 8/13 अन्वये
          देयात आले आहे)
        </p>
        <p className="english legal-text-small">
          (ISSUED UNDER SECTION 12/17 OF THE REGISTRATION OF BIRTHS
          AND DEATHS ACT, 1969 AND RULE 8/13 OF THE MAHARASHTRA
          REGISTRATION OF BIRTHS &amp; DEATHS RULES 2000)
        </p>
      </section>

      {/* ───── certification ───── */}
      <section className="certification">
        <p className="marathi cert-text">
          प्रमाणित करण्यात येत आहे की खालील माहिती जन्म नोंदवहींच्या
          मूळ अभिलेखावरून घेण्यात आली आहे. जी नगर निगम सोलापूर
          तहसील / (लॉकल) सोलापूर उत्तर जिल्हा, सोलापूर राज्य /
          केंद्रशासित प्रदेश, भारत यांच्या नोंदवहीत उपलब्ध आहे.
        </p>
        <p className="english cert-text-small">
          THIS IS TO CERTIFY THAT THE FOLLOWING INFORMATION HAS BEEN
          TAKEN FROM THE ORIGINAL RECORD OF BIRTH WHICH IS THE
          REGISTER FOR MUNICIPAL CORPORATION SOLAPUR OF TAHSIL/BLOCK
          SOLAPUR NORTH OF DISTRICT SOLAPUR OF STATE/UNION TERRITORY
          OF MAHARASHTRA, INDIA
        </p>
      </section>

      {/* ───── data fields ───── */}
      <section className="data-fields">
        {/* Row 1: Name + Sex */}
        <div className="field-row two-col">
          <div className="field-cell">
            <label className="field-label bold">
              {lbl("नाव", "NAME")}
            </label>
            <span className="field-value">
              {d.childName}
              {d.childNameMarathi && (
                <> / <span className="marathi">{d.childNameMarathi}</span></>
              )}
            </span>
          </div>
          <div className="field-cell">
            <label className="field-label bold">
              {lbl("लिंग", "SEX")}
            </label>
            <span className="field-value">
              {d.sex}
              {d.sexMarathi && (
                <> / <span className="marathi">{d.sexMarathi}</span></>
              )}
            </span>
          </div>
        </div>

        {/* Row 2: Aadhaar Number */}
        <div className="field-row">
          <div className="field-cell">
            <label className="field-label bold">
              {lbl("आधार क्रमांक", "AADHAAR NUMBER")}
            </label>
            <span className="field-value">{d.aadharNumber}</span>
          </div>
        </div>

        {/* Row 3: Date of Birth + Place of Birth */}
        <div className="field-row two-col">
          <div className="field-cell">
            <label className="field-label bold">
              {lbl("जन्म दिनांक", "DATE OF BIRTH")}
            </label>
            <div className="field-value-block">
              <span className="field-value">{fmtDate(d.dateOfBirth)}</span>
              {d.dateOfBirthWords && (
                <span className="field-value-words">
                  {d.dateOfBirthWords}
                </span>
              )}
            </div>
          </div>
          <div className="field-cell">
            <label className="field-label bold">
              {lbl("जन्म ठिकाण", "PLACE OF BIRTH")}
            </label>
            <div className="field-value-block">
              <span className="field-value">{d.placeOfBirth}</span>
              {d.placeOfBirthMarathi && (
                <span className="field-value marathi">
                  {" "}
                  / {d.placeOfBirthMarathi}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Row 4: Mother's Name + Father's Name */}
        <div className="field-row two-col">
          <div className="field-cell">
            <label className="field-label bold">
              {lbl("आईचे नाव", "NAME OF MOTHER")}
            </label>
            <span className="field-value">
              {d.motherName}
              {d.motherNameMarathi && (
                <> / <span className="marathi">{d.motherNameMarathi}</span></>
              )}
            </span>
          </div>
          <div className="field-cell">
            <label className="field-label bold">
              {lbl("वडिलांचे नाव", "NAME OF FATHER")}
            </label>
            <span className="field-value">
              {d.fatherName}
              {d.fatherNameMarathi && (
                <> / <span className="marathi">{d.fatherNameMarathi}</span></>
              )}
            </span>
          </div>
        </div>

        {/* Row 5: Mother's Aadhaar + Father's Aadhaar */}
        <div className="field-row two-col">
          <div className="field-cell">
            <label className="field-label bold">
              {lbl("आईचा आधार क्र", "AADHAAR NUMBER OF MOTHER")}
            </label>
            <span className="field-value">{d.motherAadhar}</span>
          </div>
          <div className="field-cell">
            <label className="field-label bold">
              {lbl("वडिलांचा आधार क्र", "AADHAAR NUMBER OF FATHER")}
            </label>
            <span className="field-value">{d.fatherAadhar}</span>
          </div>
        </div>

        {/* Row 6: Address at time of birth (full width) */}
        <div className="field-row">
          <div className="field-cell full-width">
            <label className="field-label bold">
              {lbl(
                "मुलाच्या जन्माच्या वेळी पालकांचा पत्ता",
                "ADDRESS OF PARENTS AT THE TIME OF BIRTH OF THE CHILD"
              )}
            </label>
            <div className="field-value-block">
              <span className="field-value">
                {d.parentsAddressAtBirth}
              </span>
              {d.parentsAddressAtBirthMarathi && (
                <span className="field-value marathi">
                  {" "}
                  / {d.parentsAddressAtBirthMarathi}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Row 7: Permanent address (full width) */}
        <div className="field-row">
          <div className="field-cell full-width">
            <label className="field-label bold">
              {lbl(
                "पालकांचा कायमचा पत्ता",
                "PERMANENT ADDRESS OF PARENTS"
              )}
            </label>
            <div className="field-value-block">
              <span className="field-value">
                {d.permanentAddress}
              </span>
              {d.permanentAddressMarathi && (
                <span className="field-value marathi">
                  {" "}
                  / {d.permanentAddressMarathi}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Row 8: Registration Number + Date of Registration */}
        <div className="field-row two-col">
          <div className="field-cell">
            <label className="field-label bold">
              {lbl("नोंदणी क्रमांक", "REGISTRATION NUMBER")}
            </label>
            <span className="field-value">{d.registrationNumber}</span>
          </div>
          <div className="field-cell">
            <label className="field-label bold">
              {lbl("नोंदणी दिनांक", "DATE OF REGISTRATION")}
            </label>
            <span className="field-value">{fmtDate(d.dateOfRegistration)}</span>
          </div>
        </div>

        {/* Row 9: Remarks */}
        <div className="field-row">
          <div className="field-cell">
            <label className="field-label bold">
              {lbl("शेरा (असल्यास)", "REMARKS (IF ANY)")}
            </label>
            <span className="field-value">{d.remarks}</span>
          </div>
        </div>

        {/* Row 10: Date of Issue */}
        <div className="field-row">
          <div className="field-cell">
            <label className="field-label bold">
              {lbl(
                "प्रमाणपत्र दिल्याचा दिनांक",
                "DATE OF ISSUE"
              )}
            </label>
            <span className="field-value">{fmtDate(d.dateOfIssue)}</span>
          </div>
        </div>
      </section>

      {/* ───── updated-on ───── */}
      <div className="updated-on">
        Updated On : {fmtDate(d.dateOfIssue) || "—"}
      </div>

      {/* ───── footer ───── */}
      <footer className="doc-footer">
        <div className="footer-left">
          <img
            src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' fill='%23000'/%3E%3Ctext x='50' y='55' text-anchor='middle' fill='%23fff' font-size='12'%3EQR%3C/text%3E%3C/svg%3E"
            alt="QR Code"
            className="qr-code"
          />
          <p className="qr-text bold">
            'This QR code can be used to check the authenticity of the
            certificate'
          </p>
        </div>

        <div className="footer-right">
          <img src={signImg} alt="Signature" className="signature-img" />
          <div className="signature-label">
            नियंत्रित करणाऱ्या अधिकाऱ्याची सही / SIGNATURE OF ISSUING
            AUTHORITY :
          </div>
          <div className="signature-title">
            <span className="marathi">उपनिबंधक (जन्म आणि मृत्यू)</span>
            <br />
            Sub-Registrar (BIRTH &amp; DEATH)
          </div>
          <div className="signature-org">
            <span className="marathi">नगर निगम सोलापूर</span>
            <br />
            MUNICIPAL CORPORATION SOLAPUR
          </div>
        </div>
      </footer>

      {/* ───── digital signature ───── */}
      <div className="digital-signature">
        <p>Digitally signed by DS SOLAPUR MUNICIPAL CORPORATION</p>
        <p>Date: {d.dateOfIssue ? fmtDate(d.dateOfIssue).replace(/-/g, ".") + " 18:26:10 +05:30" : "—"}</p>
        <p>Reason: Issued By Dr. Manjiri Kulkarni</p>
        <p>Location: Birth &amp; Death Department, Solapur Municipal Corporation, Solapur</p>
      </div>

      {/* ───── bottom tagline ───── */}
      <div className="bottom-tagline bold marathi">
        प्रत्येक जन्म आणि मृत्यूची नोंदणी सुनिश्चित करा / ENSURE
        REGISTRATION OF EVERY BIRTH AND DEATH
      </div>
    </div>{/* /.birth-doc-border */}
    </div>
  );
}
