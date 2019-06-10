import { Selector } from "testcafe";

fixture("Registry page").page`http://localhost:3000/registry`;

const Govtech = Selector("#govtech");

const validateTextContent = async (t, component, texts) =>
  texts.reduce(
    async (_prev, curr) => t.expect(component.textContent).contains(curr),
    Promise.resolve()
  );

test("Govtech Registry is rendered correctly", async t => {
  // Validate content of Govtech registry
  await validateTextContent(t, Govtech, [
    "0x007d40224f6562461633ccfbaffd359ebb2fc9ba",
    "https://www.tech.gov.sg",
    "info@tech.gov.sg",
    "+65 6211 2100"
  ]);
});
