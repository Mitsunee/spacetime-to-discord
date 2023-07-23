# spacetime-to-discord

Utility to create Discord timestamp strings from [Spacetime](https://github.com/spencermountain/spacetime/) instances.

## Installation

Install the package using the package manager used by your project:

```sh
npm install spacetime-to-discord
pnpm add spacetime-to-discord
yarn add spacetime-to-discord
```

## Usage

```ts
import spacetime from "spacetime";
import { spacetimeToDiscord } from "spacetime-to-discord";

const s = spacetime.now();
const str = spacetimeToDiscord(s, "nice"); // "<t:1690139640:f>"
```

If you'd prefer a shorter function name `s2d` is available as an alias.

### Available styles

The style parameter can be optionally set to use any of the following styles:

- Date
  - `"date"` / `"d"`: 23/07/2023
  - `"date-nice"` / `"D"`: 23 July 2023
- Time
  - `"time"` / `"t"`: 21:14
  - `"time-nice"` / `"T"`: 21:14:57
- Datetime
  - `"nice"` / `"f"`: 23 July 2023 21:14
  - `"nice-full"` / `"F"`: Sunday, 23 July 2023 21:14
- Relative
  - `"rel"` / `"R"`: 5 minutes ago

If omitted the `nice-full` style is used.
