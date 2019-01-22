import { getLogger } from "../../utils/logger";

const { trace, error } = getLogger("components:Analytics:");
const { trace: traceDev } = getLogger("components:Analytics(Inactive):");

export const validateEvent = ({ category, action, value }) => {
  if (!category) throw new Error("Category is required");
  if (!action) throw new Error("Action is required");
  if (value && typeof value !== "number")
    throw new Error("Value must be a number");
};

export const stringifyEvent = ({ category, action, label, value }) =>
  `Category*: ${category}, Action*: ${action}, Label: ${label}, Value: ${value}`;

export const analyticsEvent = (window, evt) => {
  try {
    validateEvent(evt);
  } catch (e) {
    error(e);
    return;
  }
  if (typeof window !== "undefined" && typeof window.ga !== "undefined") {
    const { category, action, label, value } = evt;
    window.ga("send", "event", category, action, label, value);
    trace(stringifyEvent(evt));
  } else {
    traceDev(stringifyEvent(evt));
  }
};

export default analyticsEvent;
