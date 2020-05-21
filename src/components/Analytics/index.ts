import { getLogger } from "../../utils/logger";

const { trace } = getLogger("components:Analytics:");
const { trace: traceDev } = getLogger("components:Analytics(Inactive):");

interface Event {
  category: string;
  action: string;
  value: string | number;
  label: string;
}

export const validateEvent = ({ category, action, value }: Event): void => {
  if (!category) throw new Error("Category is required");
  if (!action) throw new Error("Action is required");
  if (value && typeof value !== "number") throw new Error("Value must be a number");
};

export const stringifyEvent = ({ category, action, label, value }: Event): string =>
  `Category*: ${category}, Action*: ${action}, Label: ${label}, Value: ${value}`;

export const analyticsEvent = (window: Window, event: Event): void => {
  validateEvent(event);
  if (typeof window !== "undefined" && typeof window.ga !== "undefined") {
    const { category, action, label, value } = event;
    trace(stringifyEvent(event));
    return window.ga("send", "event", category, action, label, value);
  }
  traceDev(stringifyEvent(event));
};

export default analyticsEvent;
