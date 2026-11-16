import { DropEvent } from "react-dropzone";
import { collectCertificateFiles, readFirstFileText } from "./collectCertificateFiles";

const DEMO_PATH = "/static/demo/sepolia.opencert";

describe("collectCertificateFiles", () => {
  it("returns only the demo certificate when the drag also contains the dragged image", async () => {
    const fetchMock = jest.fn().mockResolvedValue({
      ok: true,
      blob: () => Promise.resolve(new Blob(["{}"], { type: "application/json" })),
    });
    const originalFetch = window.fetch;
    window.fetch = fetchMock as typeof fetch;

    try {
      const event = {
        dataTransfer: {
          getData: (format: string) => (format === DEMO_PATH ? "true" : ""),
          files: [new File(["img"], "cert.png", { type: "image/png" })],
        },
      } as unknown as DropEvent;

      const files = await collectCertificateFiles(event, DEMO_PATH);

      expect(files).toHaveLength(1);
      expect(files[0].name).toBe("demo.opencert");
      expect(fetchMock).toHaveBeenCalledTimes(1);
      expect(fetchMock).toHaveBeenCalledWith(DEMO_PATH);
    } finally {
      window.fetch = originalFetch;
    }
  });

  it("keeps every file from an ordinary drop", async () => {
    const first = new File(["one"], "first.opencert", { type: "application/json" });
    const second = new File(["two"], "second.opencert", { type: "application/json" });
    const event = {
      target: { files: [first, second] },
    } as unknown as DropEvent;

    await expect(collectCertificateFiles(event, DEMO_PATH)).resolves.toStrictEqual([first, second]);
  });
});

describe("readFirstFileText", () => {
  const readAs = (name: string) => `read:${name}`;

  const mockReader = () =>
    jest.spyOn(FileReader.prototype, "readAsText").mockImplementation(function (this: FileReader, file: Blob) {
      Object.defineProperty(this, "result", {
        configurable: true,
        value: readAs((file as File).name),
      });
      this.onload?.(new ProgressEvent("load") as ProgressEvent<FileReader>);
    });

  it("reads the first file and does not start a second read", async () => {
    const readAsText = mockReader();

    try {
      const first = new File(["one"], "first.opencert", { type: "application/json" });
      const second = new File(["two"], "second.opencert", { type: "application/json" });

      await expect(readFirstFileText([first, second])).resolves.toBe(readAs("first.opencert"));
      expect(readAsText).toHaveBeenCalledTimes(1);
      expect(readAsText).toHaveBeenCalledWith(first);
    } finally {
      readAsText.mockRestore();
    }
  });

  it("skips a leading PDF and reads the certificate behind it", async () => {
    const readAsText = mockReader();

    try {
      const pdf = new File(["%PDF"], "notes.pdf", { type: "application/pdf" });
      const certificate = new File(["{}"], "degree.opencert", { type: "application/json" });

      await expect(readFirstFileText([pdf, certificate])).resolves.toBe(readAs("degree.opencert"));
      expect(readAsText).toHaveBeenCalledTimes(1);
      expect(readAsText).toHaveBeenCalledWith(certificate);
    } finally {
      readAsText.mockRestore();
    }
  });

  it("falls back to the first file when none is a certificate", async () => {
    const readAsText = mockReader();

    try {
      const pdf = new File(["%PDF"], "notes.pdf", { type: "application/pdf" });
      const image = new File(["img"], "photo.png", { type: "image/png" });

      await expect(readFirstFileText([pdf, image])).resolves.toBe(readAs("notes.pdf"));
      expect(readAsText).toHaveBeenCalledWith(pdf);
    } finally {
      readAsText.mockRestore();
    }
  });

  it("rejects when no file was dropped", async () => {
    await expect(readFirstFileText([])).rejects.toThrow("No certificate file was provided");
  });
});
