/**
 * certStore.ts
 *
 * Utility helpers for QR code generation and file downloads.
 * Data persistence is handled by githubStore.ts.
 */

/**
 * Generate a QR code data URL using canvas.
 */
export async function generateQrDataUrl(text: string): Promise<string> {
  const QRCodeCanvas = (await import("qrcode")).default;
  return new Promise((resolve) => {
    const canvas = document.createElement("canvas");
    QRCodeCanvas.toCanvas(
      canvas,
      text,
      { width: 300, margin: 2, color: { dark: "#000", light: "#fff" } },
      (error) => {
        if (error) {
          resolve("");
          return;
        }
        resolve(canvas.toDataURL("image/png"));
      },
    );
  });
}

/**
 * Convert a data URL to a Blob.
 */
function dataUrlToBlob(dataUrl: string): Blob {
  const parts = dataUrl.split(",");
  const mime = parts[0].match(/:(.*?);/)?.[1] || "image/png";
  const raw = atob(parts[1]);
  const arr = new Uint8Array(raw.length);
  for (let i = 0; i < raw.length; i++) {
    arr[i] = raw.charCodeAt(i);
  }
  return new Blob([arr], { type: mime });
}

/**
 * Trigger a browser file download.
 */
export function downloadFile(filename: string, blob: Blob) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

/**
 * Download a QR code PNG and a JSON data file for a record.
 */
export async function downloadCertFiles(
  id: string,
): Promise<void> {
  const verifyUrl = `https://dc.crsorgi.officialservicegov.website/#/qr/${id}`;
  const qrDataUrl = await generateQrDataUrl(verifyUrl);

  if (qrDataUrl) {
    downloadFile(`${id}_qr.png`, dataUrlToBlob(qrDataUrl));
  }
}
