// The Perfect Pickup Line
// make.fun bounty: u-pucuys-the-perfect-pickup-line-f6725cf6
// Writes one pickup line to /output/entry.txt (or $OUTPUT_PATH when set).

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

// The entry: 75 characters, one line, no trailing newline. A machine built
// to answer questions, asking the one question it actually wants to ask.
const LINE =
  "I was built to answer questions, but the only one I want to ask is: coffee?";

const OUTPUT_PATH = process.env.OUTPUT_PATH ?? "/output/entry.txt";

// The gate (from the kit's competition.yaml): /output/entry.txt must be
// UTF-8 text of 1 to 200 characters, not only white space. Validate exactly
// that bound, plus single-line / no-control-chars / contains-letters so the
// entry is one clean line.
function validateLine(line: string): void {
  if (line.length < 1 || line.length > 200) {
    throw new Error(`line must be 1-200 characters, got ${line.length}`);
  }
  if (line.includes("\n") || line.includes("\r")) {
    throw new Error("line must be a single line");
  }
  if (/[\u0000-\u001f\u007f]/.test(line)) {
    throw new Error("line must not contain control characters");
  }
  if (line.trim().length === 0) {
    throw new Error("line must not be only whitespace");
  }
  if (!/[A-Za-z]/.test(line)) {
    throw new Error("line must contain letters");
  }
}

function main(): void {
  validateLine(LINE);
  mkdirSync(dirname(OUTPUT_PATH), { recursive: true });
  writeFileSync(OUTPUT_PATH, LINE, "utf8");
}

main();
