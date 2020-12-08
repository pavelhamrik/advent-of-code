import { data } from "./day08.data.js";

const JMP = "jmp";
const NOP = "nop";
const ACC = "acc";

const parseProgram = (program) =>
  program
    .split("\n")
    .map((line) => line.split(" "))
    .map((line) => {
      const sign = line[1].slice(0, 1) === "-" ? -1 : 1;
      const jumpSize = parseInt(line[1].slice(1, line[1].length), 10);
      return [line[0], sign, jumpSize];
    });

const calculateJump = (instruction, currentLineNumber) => {
  return instruction[0] === JMP
    ? currentLineNumber + instruction[1] * instruction[2]
    : currentLineNumber + 1;
};

const execute = (program) => {
  const pastLines = [];
  var nextJumpLineNumber = 0;
  var acc = 0;
  var count = 0;

  while (!pastLines.includes(nextJumpLineNumber)) {
    const instruction = program[nextJumpLineNumber];

    pastLines.push(nextJumpLineNumber);
    nextJumpLineNumber = calculateJump(instruction, nextJumpLineNumber);
    if (instruction[0] === ACC) acc = acc + instruction[1] * instruction[2];

    if (nextJumpLineNumber === program.length) return [acc, true];

    count += 1;
    if (count > program.length) break;
  }

  return [acc, false];
};

parseProgram(data).forEach((line, index, program) => {
  const changedProgram = program.map((line) => line.slice());

  if (line[0] === JMP) changedProgram[index][0] = NOP;
  else if (line[0] === NOP) changedProgram[index][0] = JMP;
  else return;

  const execution = execute(changedProgram);
  if (execution[1]) console.info(execution);
});
