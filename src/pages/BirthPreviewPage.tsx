/**
 * BirthPreviewPage.tsx
 *
 * Print-ready birth record document preview.
 * Data comes from localStorage (via id query param) or AppContext.
 * Back button navigates to /#/birth via router.
 *
 * Route: /#/birth/preview?id=<id>
 */

import { Link } from "react-router-dom";
import BirthRecordDocument from "../components/BirthRecordDocument/BirthRecordDocument";
import { useAppContext } from "../context/AppContext";
import "../components/PrintPreview/PrintPreview.css";

export default function BirthPreviewPage() {
  const { birthRecordData } = useAppContext();

  const data = birthRecordData;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="print-preview-wrapper">
      {/* ─── toolbar (hidden on print) ─── */}
      <div className="preview-toolbar no-print">
        <Link to="/birth" className="btn btn-secondary">
          ← Back / Edit
        </Link>
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
