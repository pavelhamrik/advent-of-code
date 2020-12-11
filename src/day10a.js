import { data } from "./day10.data";

const joltages = data.split("\n").map((joltage) => parseInt(joltage, 10));

const sortedJoltages = joltages.sort((a, b) => a - b);

const countDifferences = (joltages) =>
  joltages.reduce(
    (acc, joltage) => {
      if (joltage - acc[2] === 1) return [acc[0] + 1, acc[1], joltage];
      if (joltage - acc[2] === 3) return [acc[0], acc[1] + 1, joltage];

      if (joltage - acc[2] > 3) console.warn("That's too much difference!");
      return [acc[0], acc[1], joltage];
    },
    [0, 0, 0]
  );

const calculateAnswer = (differences) => differences[0] * (differences[1] + 1);

const differences = countDifferences(sortedJoltages);
const answer = calculateAnswer(differences);

console.log(differences, answer);
