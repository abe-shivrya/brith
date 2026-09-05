/**
 * AppContext.tsx
 *
 * Shared React context to pass form data between routes
 * without prop drilling or state-lifting through App.tsx.
 *
 *   /#/birth          → writes birthRecordData
 *   /#/birth/preview  → reads birthRecordData
 *   /#/validate       → writes certificateData
 *   /#/validate/table → reads certificateData
 */

import { createContext, useContext, useState, useCallback, type ReactNode } from "react";
import type { BirthRecordData, CertificateFormData } from "../types";
import { getInitialBirthRecordData, getInitialCertificateFormData } from "../types";

/* ─── Context shape ─── */
type AppContextValue = {
  /* Birth Record */
  birthRecordData: BirthRecordData;
  setBirthRecordData: (d: BirthRecordData) => void;

  /* Validate Certificate */
  certData: CertificateFormData;
  setCertData: (d: CertificateFormData) => void;
};

const AppContext = createContext<AppContextValue | null>(null);

/* ─── Provider ─── */
export function AppProvider({ children }: { children: ReactNode }) {
  const [birthRecordData, setBirthRecordData] = useState<BirthRecordData>(
    getInitialBirthRecordData(),
  );

  const [certData, setCertData] = useState<CertificateFormData>(
    getInitialCertificateFormData(),
  );

  const handleSetBirth = useCallback((d: BirthRecordData) => {
    setBirthRecordData(d);
  }, []);

  const handleSetCert = useCallback((d: CertificateFormData) => {
    setCertData(d);
  }, []);

  return (
    <AppContext.Provider
      value={{
        birthRecordData,
        setBirthRecordData: handleSetBirth,
        certData,
        setCertData: handleSetCert,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

/* ─── Hook ─── */
export function useAppContext(): AppContextValue {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useAppContext must be used within <AppProvider>");
  return ctx;
}
