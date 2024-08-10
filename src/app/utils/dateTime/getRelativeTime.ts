import { DateTime } from "luxon";

const getRelativeTime = (
  date: number | string,
  baseDate?: number
): string | null => {
  if (!date) {
    throw new Error("Invalid date provided.");
  }

  const inputDate =
    typeof date === "number"
      ? DateTime.fromMillis(date)
      : DateTime.fromISO(date);
  const now = baseDate ? DateTime.fromMillis(baseDate) : DateTime.now();

  if (!inputDate.isValid) {
    return null;
  }

  const relativeDate = inputDate.toRelative({ base: now });

  return relativeDate;
};

export { getRelativeTime };
