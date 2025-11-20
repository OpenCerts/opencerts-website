export const validateTextContent = async (t, component, texts, timeout = 30000) => {
  await t.expect(component.exists).ok({ timeout });
  await Promise.all(texts.map(async (text) => await t.expect(component.textContent).contains(text, { timeout })));
};
