export const inIframe = () => window.location !== window.parent.location;

export const formatTemplate = template =>
  template ? template.map(o => ({ label: o.label, id: o.id })) : null;
