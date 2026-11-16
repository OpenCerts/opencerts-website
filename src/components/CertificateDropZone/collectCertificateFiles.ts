import { DropEvent } from "react-dropzone";

export class DemoCertificateLoadError extends Error {
  readonly cause: unknown;

  constructor(cause: unknown) {
    super("The demo certificate could not be loaded");
    this.name = "DemoCertificateLoadError";
    this.cause = cause;
  }
}

const CERTIFICATE_EXTENSION = /\.(opencert|json)$/i;

const isDragEvent = (event: DropEvent): event is DragEvent => (event as DragEvent).dataTransfer !== undefined;

const isInputEvent = (event: DropEvent): event is Event => (event as Event).target !== undefined;

/**
 * Files from a drop or file picker.
 * The homepage demo drag is handled only here: it also carries the dragged image, and
 * returning that image with the certificate used to start a second FileReader read.
 */
export async function collectCertificateFiles(event: DropEvent, demoPath: string): Promise<File[]> {
  if (isDragEvent(event) && event.dataTransfer && event.dataTransfer.getData(demoPath)) {
    try {
      const response = await window.fetch(demoPath);
      if (!response.ok) {
        throw new Error(`Demo certificate request failed (${response.status})`);
      }
      const fileBlob = await response.blob();
      return [new File([fileBlob], "demo.opencert")];
    } catch (error) {
      throw new DemoCertificateLoadError(error);
    }
  }

  const fileList =
    isDragEvent(event) && event.dataTransfer
      ? event.dataTransfer.files
      : isInputEvent(event)
      ? (event.target as HTMLInputElement).files
      : null;

  const files: File[] = [];
  if (fileList) {
    Array.prototype.forEach.call(fileList, (file: File) => {
      files.push(file);
    });
  }
  return files;
}

/** Prefer a certificate file. Pickers and drops do not guarantee that file is first. */
export function selectCertificateFile(files: readonly File[]): File | undefined {
  return files.find((file) => CERTIFICATE_EXTENSION.test(file.name)) ?? files[0];
}

/**
 * Read one file. FileReader rejects a second readAsText while the first is still
 * running, so a drop of several files must not share one reader.
 */
export function readFirstFileText(files: readonly File[]): Promise<string> {
  const file = selectCertificateFile(files);
  if (!file) {
    return Promise.reject(new Error("No certificate file was provided"));
  }

  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        resolve(reader.result);
        return;
      }
      reject(new Error("Certificate file could not be read as text"));
    };
    reader.onerror = () => {
      reject(reader.error ?? new Error("Certificate file could not be read"));
    };
    reader.readAsText(file);
  });
}
