import type { Spacetime } from "spacetime";

// prettier-ignore
export type Style =
  | "date"      | "d"  // 23/07/2023
  | "date-nice" | "D"  // 23 July 2023
  | "time"      | "t"  // 21:14
  | "time-nice" | "T"  // 21:14:57
  | "nice"      | "f"  // 23 July 2023 21:14
  | "nice-full" | "F"  // Sunday, 23 July 2023 21:14
  | "rel"       | "R"; // 5 minutes ago

/**
 * Creates Discord timestamp string from spacetime instance.
 *
 * @param s Your Spacetime instance
 * @param style optional style parameter. See README for full list
 * @returns Discord timestamp string
 */
export function spacetimeToDiscord(s: Spacetime, style?: Style) {
  const ts = Math.trunc(s.epoch / 1000);

  switch (style) {
    case "date":
    case "d":
      return `<t:${ts}:d>`;

    case "date-nice":
    case "D":
      return `<t:${ts}:D>`;

    case "time":
    case "t":
      return `<t:${ts}:t>`;

    case "time-nice":
    case "T":
      return `<t:${ts}:T>`;

    case "nice":
    case "f":
      return `<t:${ts}:f>`;

    case "rel":
    case "R":
      return `<t:${ts}:R>`;

    case "nice-full":
    case "F":
    default:
      return `<t:${ts}:F>`;
  }
}

export { spacetimeToDiscord as s2d };
