export const validateTextContent = async (t, component, texts) =>
  Promise.all(texts.map(async (text) => await t.expect(component.textContent).contains(text)));
