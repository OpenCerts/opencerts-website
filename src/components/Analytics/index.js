import { getLogger } from "../../utils/logger";

const { trace: traceDev } = getLogger("components:Analytics(DEV):");
const { trace } = getLogger("components:Analytics:");

export const stringifyEvent = ({ category, action, label, value }) =>
  `Category*: ${category}, Action*: ${action}, Label: ${label}, Value: ${value}`;

export const event = (window, evt) => {
  if (typeof window !== "undefined" && typeof window.ga !== "undefined") {
    const { category, action, label, value } = evt;
    window.ga("send", "event", category, action, label, value);
    trace(stringifyEvent(evt));
  } else {
    traceDev(stringifyEvent(evt));
  }
};

export default event;
