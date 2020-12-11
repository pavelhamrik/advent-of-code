import { data } from "./day10.data";

const joltages = data.split("\n").map((joltage) => parseInt(joltage, 10));
const sortedJoltages = joltages.sort((a, b) => a - b);

const validate = (joltages, target) => {
  // if (typeof target === "undefined") console.warn("Target cannot be empty");

  if (joltages[0] > 3) return false;
  if (target - joltages[joltages.length - 1] > 3) return false;

  for (let i = 1; i < joltages.length; i++) {
    if (joltages[i] - joltages[i - 1] > 3) {
      return false;
    }
  }

  return true;

  // return joltages.reduce(
  //   (acc, joltage) =>
  //     joltage - acc[1] > 3
  //       ? [acc[0] && false, joltage]
  //       : [acc[0] && true, joltage],
  //   [true, 0]
  // )[0];
};

const countVariations = (joltages, upperTarget, depth = 0) => {
  return joltages.reduce((acc, joltage, index, arr) => {
    const experiment = arr.slice(0, index).concat(arr.slice(index + 1));
    const isValid = validate(experiment, upperTarget);

    const subexperiment =
      isValid && depth < 3
        ? countVariations(experiment, upperTarget, depth + 1)
        : 0;
    // const subexperiment = 0;

    if (isValid) return acc + 1 + subexperiment;
    return acc;
  }, 0);
};

// todo: remember to check for difference between 0 and the first,
// and 158 and the last

const variations = countVariations(
  sortedJoltages,
  sortedJoltages[sortedJoltages.length - 1] + 3
);

// console.log(validate(sortedJoltages.slice(0, 6).concat(sortedJoltages.slice(10)), 158));

console.log(variations);
