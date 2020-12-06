import { data as rawPasses } from "./day05.data.js";

const passes = rawPasses.split("\n");

const rowMagnitudes = [64, 32, 16, 8, 4, 2, 1];
const seatMagnitudes = [4, 2, 1];

const ratePasses = (passes) =>
  passes.map((pass) => {
    const passLetters = Array.from(pass);
    const passFB = passLetters
      .slice(0, 7)
      .map((letter) => (letter === "F" ? 0 : 1));
    const passLR = passLetters
      .slice(7)
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

const sortPasses = (passes) => Array.from(passes).sort((a, b) => a - b);

const sortedPasses = sortPasses(ratePasses(passes));

const allSeats = Array.from(
  new Array(sortedPasses[sortedPasses.length - 1] + 1)
).map((item, index) => index);

const myPass = allSeats.filter(
  (seat) =>
    sortedPasses.includes(seat - 1) &&
    !sortedPasses.includes(seat) &&
    sortedPasses.includes(seat + 1)
);

document.getElementById("app").innerHTML = `${myPass}`;
