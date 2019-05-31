import { tz } from "moment-timezone";

export const TIMEZONE = "Asia/Singapore";

export const formatDate = dateString => {
  if (!dateString) return null;
  const date = new Date(dateString);
  return tz(date, TIMEZONE)
    .format("MMM YYYY")
    .toUpperCase();
};

export const formatDateFullMonth = dateString => {
  if (!dateString) return null;
  const date = new Date(dateString);
  return tz(date, TIMEZONE)
    .format("MMMM YYYY")
    .toUpperCase();
};
