import { input as rawInput } from "./day04.data.js";

const fields = [
  "byr", // (Birth Year)
  "iyr", // (Issue Year)
  "eyr", // (Expiration Year)
  "hgt", // (Height)
  "hcl", // (Hair Color)
  "ecl", // (Eye Color)
  "pid" // (Passport ID)
  // "cid" // (Country ID)
];

const passports = rawInput.split("\n\n").map((passport) =>
  passport
    .replaceAll("\n", " ")
    .split(" ")
    .map((passport) => passport.split(":")[0])
);

const validCount = passports.filter((passport) =>
  fields.reduce((acc, field) => passport.includes(field) && acc, true)
).length;

document.getElementById("app").innerHTML = `${validCount}`;
