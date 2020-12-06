import { data as rawPasses } from "./day05.data.js";

const passes = rawPasses.split("\n");

const rowMagnitudes = [64, 32, 16, 8, 4, 2, 1];
const seatMagnitudes = [4, 2, 1];

const ratedPasses = passes.map((pass) => {
  const passLetters = Array.from(pass);
  const passFB = passLetters
    .slice(0, 7)
    .map((letter) => (letter === "F" ? 0 : 1));
  const passLR = passLetters
    .slice(7, 10)
    .map((letter) => (letter === "L" ? 0 : 1));

  const rowScore = passFB.reduce(
    (acc, multiplier, index) => acc + multiplier * rowMagnitudes[index],
    0
  );

  const seatScore = passLR.reduce(
    (acc, multiplier, index) => acc + multiplier * seatMagnitudes[index],
    0
  );

  return rowScore * 8 + seatScore;
});

const highestPass = ratedPasses.sort((a, b) => a - b)[ratedPasses.length - 1];

document.getElementById("app").innerHTML = `${highestPass}`;
