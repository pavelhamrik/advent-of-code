import { data } from "./day10.data";

// const DEPTH_LIMIT = 3; // 8 is borderline

const rawJoltages = data.split("\n").map((joltage) => parseInt(joltage, 10));
const joltages = rawJoltages.sort((a, b) => a - b);

const maxJoltage = joltages[joltages.length - 1] + 3;

console.log(joltages.toString())
