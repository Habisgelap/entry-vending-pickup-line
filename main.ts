// One Line, One Minute: The Vending Machine Pickup Line Contest
// Entry program: writes a single pickup line, spoken by a vending machine
// to a passing human, to /output/entry.txt (1-200 chars, UTF-8).
//
// The line was picked from 12 candidates drafted and scored in this session
// (see CANDIDATES.md). Winner: "You walked past twice today. My coil's
// jammed, my lights are flashing, and I still can't drop the hint."
// It speaks in the machine's own first-person voice, stacks three pieces of
// the machine's world (jammed coil, flashing lights, dropping), and lands
// the punch — "drop the hint" — in the last few words.

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";

const LINE =
  "You walked past twice today. My coil's jammed, my lights are flashing, and I still can't drop the hint.";

const OUTPUT_DIR = process.env.OUTPUT_DIR ?? "/output";
const OUTPUT_PATH = join(OUTPUT_DIR, "entry.txt");

// The sealed gate: /output/entry.txt must be UTF-8 text of 1 to 200
// characters, not only white space. Fail loudly instead of emitting
// an entry the gate would refuse.
if (LINE.length < 1 || LINE.length > 200) {
  throw new Error(`entry is ${LINE.length} chars, must be 1-200`);
}
if (LINE.trim().length === 0) {
  throw new Error("entry is only white space");
}
if (LINE.includes("\n")) {
  throw new Error("entry must be a single line");
}

mkdirSync(dirname(OUTPUT_PATH), { recursive: true });
writeFileSync(OUTPUT_PATH, LINE, "utf8");
console.log(`Wrote ${LINE.length} chars to ${OUTPUT_PATH}`);
