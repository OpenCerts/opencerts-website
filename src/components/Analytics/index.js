import { getLogger } from "../../utils/logger";

const { trace } = getLogger("components:Analytics:");
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
  validateEvent(evt);
  if (typeof window !== "undefined" && typeof window.ga !== "undefined") {
    const { category, action, label, value } = evt;
    trace(stringifyEvent(evt));
    return window.ga("send", "event", category, action, label, value);
  }
  traceDev(stringifyEvent(evt));
  return null;
};

export default analyticsEvent;
