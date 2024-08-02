export const validateTextContent = async (t, component, texts) => {
  t.expect(component.exists).ok();
  return Promise.all(texts.map(async (text) => await t.expect(component.textContent).contains(text)));
};
