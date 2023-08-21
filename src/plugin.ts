import type { Spacetime } from "spacetime";
import spacetime from "spacetime";
import type { Style } from "./";
import { spacetimeToDiscord } from "./index.js";

declare module "spacetime" {
  interface Spacetime {
    toDiscord: (style?: Style) => string;
  }
}

spacetime.extend({
  toDiscord: function toDiscord(this: Spacetime, style?: Style) {
    return spacetimeToDiscord(this, style);
  }
});
