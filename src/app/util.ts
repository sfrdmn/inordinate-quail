/**
 * Yield date string in YYYY-MM-DD format.
 */
export function getDateString(date: Date): string {
  return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`
}

/**
 * Assumes YYYY-MM-DD date format and local timezone.
 */
export function isToday(date: string): boolean {
  return date === getDateString(new Date())
}

/**
 * Yield a date range for the last N months
 */
export function rangeForMonths(
  n: number,
  {
    upper: upperRaw = new Date,
    cushion = 0
  } = {}
) {
  const days = n * 31
  let upper = new Date(upperRaw)
  let lower = new Date(upper)

  lower.setDate(upper.getDate() - days - cushion)
  upper.setDate(upper.getDate() + cushion)

  return [lower, upper] as const
}
