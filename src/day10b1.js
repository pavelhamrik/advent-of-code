import { data } from "./day10.data";

const DEPTH_LIMIT = 3; // 8 is borderline

const rawJoltages = data.split("\n").map((joltage) => parseInt(joltage, 10));
const joltages = rawJoltages.sort((a, b) => a - b);

const highestJoltage = joltages[joltages.length - 1];
const shortestChain = Math.ceil(highestJoltage / 3);

const validate = (joltages) => {
  if (joltages[0] > 3) return false;
  if (joltages[joltages.length - 1] !== highestJoltage) return false;
  if (joltages.length < shortestChain) {
    console.log("short");
    return false;
  } // the chain will never be long enough

  for (let i = 1; i < joltages.length; i++) {
    if (joltages[i] - joltages[i - 1] > 3) return false;
  }

  return true;
};

const countVariations = (joltages, lowerLimit = 0, depth = 0) => {
  if (depth >= DEPTH_LIMIT) return 0; // safety break

  if (!validate(joltages)) return 0;

  var acc = 1;

  for (let i = lowerLimit; i < joltages.length; i++) {
    const experiment = joltages.slice(0, i).concat(joltages.slice(i + 1));
    acc = acc + countVariations(experiment, i, depth + 1);
  }

  return acc;
};

const variations = countVariations(joltages);

console.log(variations);

// 0: 0
// 1: 1
// 2: 43
// 3: 904
// 4: 12374
// 5: 123913
// 6: 967171
// 7: 6121612
// 8: 32279050
// 9: 144580016
