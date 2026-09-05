/**
 * PrintPreview
 *
 * Wraps BirthRecordDocument and provides:
 *   – Print button (uses window.print())
 *   – Back / Edit button
 *   – @media print is handled in the CSS
 */

import BirthRecordDocument from "../BirthRecordDocument/BirthRecordDocument";
import type { BirthRecordData } from "../../types";
import "./PrintPreview.css";

type Props = {
  data: BirthRecordData;
  onBack: () => void;
};

export default function PrintPreview({ data, onBack }: Props) {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="print-preview-wrapper">
      {/* ─── toolbar (hidden on print) ─── */}
      <div className="preview-toolbar no-print">
        <button className="btn btn-secondary" onClick={onBack}>
          ← Back / Edit
        </button>
        <h2 className="preview-heading">
          <span className="marathi">पूर्वावलोकन</span> — Document Preview
        </h2>
        <button className="btn btn-primary" onClick={handlePrint}>
          🖨 Print
        </button>
      </div>

      {/* ─── the actual document ─── */}
      <div className="preview-document">
        <BirthRecordDocument data={data} />
      </div>
    </div>
  );
}
