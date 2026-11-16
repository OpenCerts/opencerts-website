import { DropEvent } from "react-dropzone";

const isDragEvent = (event: DropEvent): event is DragEvent => (event as DragEvent).dataTransfer !== undefined;

const isInputEvent = (event: DropEvent): event is Event => (event as Event).target !== undefined;

/**
 * Files from a drop or file picker.
 * A demo drag also carries the dragged image. Returning that image together with the
 * certificate makes one FileReader start a second read and throw InvalidStateError.
 * The demo certificate is the only file that drop should verify.
 */
export async function collectCertificateFiles(event: DropEvent, demoPath: string): Promise<File[]> {
  if (isDragEvent(event) && event.dataTransfer && event.dataTransfer.getData(demoPath)) {
    const response = await window.fetch(demoPath);
    const fileBlob = await response.blob();
    return [new File([fileBlob], "demo.opencert")];
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

/**
 * Read one certificate. FileReader rejects a second readAsText while the first is
 * still running, so a drop of several files must not share one reader.
 */
export function readFirstCertificateText(files: readonly File[]): Promise<string> {
  const file = files[0];
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
