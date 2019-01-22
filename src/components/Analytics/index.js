import { getLogger } from "../../utils/logger";

const NAMESPACE_GA_ACTIVE = "components:Analytics:";
const NAMESPACE_GA_INACTIVE = "components:Analytics(Inactive):";

export const validateEvent = ({ category, action, value }) => {
  if (!category) throw new Error("Category is required");
  if (!action) throw new Error("Action is required");
  if (value && typeof value !== "number")
    throw new Error("Value must be a number");
};

export const stringifyEvent = ({ category, action, label, value }) =>
  `Category*: ${category}, Action*: ${action}, Label: ${label}, Value: ${value}`;

export const event = (window, evt) => {
  try {
    validateEvent(evt);
  } catch (e) {
    getLogger(NAMESPACE_GA_ACTIVE).error(e);
    return;
  }
  if (typeof window !== "undefined" && typeof window.ga !== "undefined") {
    const { category, action, label, value } = evt;
    window.ga("send", "event", category, action, label, value);
    getLogger(NAMESPACE_GA_ACTIVE).trace(stringifyEvent(evt));
  } else {
    getLogger(NAMESPACE_GA_INACTIVE).trace(stringifyEvent(evt));
  }
};

export default event;
