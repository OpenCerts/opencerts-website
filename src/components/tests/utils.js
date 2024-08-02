export const validateTextContent = async (t, component, texts) => {
  await t.expect(component.exists).ok();
  await Promise.all(texts.map(async (text) => await t.expect(component.textContent).contains(text)));
};
