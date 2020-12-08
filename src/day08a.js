import { data } from "./day08.data.js";

const program = data
  .split("\n")
  .map((line) => line.split(" "))
  .map((line) => {
    const sign = line[1].slice(0, 1) === "-" ? -1 : 1;
    const jumpSize = parseInt(line[1].slice(1, line[1].length), 10);
    return [line[0], sign, jumpSize];
  });

const calculateJump = (instruction, currentLineNumber) => {
  return instruction[0] === "jmp"
    ? currentLineNumber + instruction[1] * instruction[2]
    : currentLineNumber + 1;
};

const pastLines = [];
var nextJumpLineNumber = 0;
var acc = 0;

var count = 0;

while (!pastLines.includes(nextJumpLineNumber)) {
  const instruction = program[nextJumpLineNumber];

  pastLines.push(nextJumpLineNumber);
  nextJumpLineNumber = calculateJump(instruction, nextJumpLineNumber);
  if (instruction[0] === "acc") acc = acc + instruction[1] * instruction[2];

  count += 1;
  if (count > 200) break;
}

console.log(acc, pastLines, program.length);

// document.getElementById("app").innerHTML = `${validOuterBags.length}`;
