/**
 * BirthFormPage.tsx
 *
 * Birth record data entry form.
 * On submit → saves to localStorage + navigates to /#/birth/preview?id=<id>
 *
 * Route: /#/birth
 */

import { useNavigate } from "react-router-dom";
import BirthRecordForm from "../components/BirthRecordForm/BirthRecordForm";
import { useAppContext } from "../context/AppContext";

export default function BirthFormPage() {
  const navigate = useNavigate();
  const { birthRecordData, setBirthRecordData } = useAppContext();

  return (
    <div className="workflow-container">
      <h2 className="workflow-title">Birth Record Entry</h2>
      <BirthRecordForm
        onSubmit={(data) => {
          setBirthRecordData(data);
          navigate("/birth/preview");
        }}
        initialData={birthRecordData}
      />
    </div>
  );
}
