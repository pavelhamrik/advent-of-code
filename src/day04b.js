import { input as rawInput } from "./day04.data.js";

const passports = rawInput.split("\n\n").map((passport) =>
  Object.fromEntries(
    passport
      .replaceAll("\n", " ")
      .split(" ")
      .map((passport) => passport.split(":"))
  )
);

// byr (Birth Year) - four digits; at least 1920 and at most 2002.
const validByr = (value = 0) => {
  const parsed = parseInt(value, 10);
  return parsed >= 1920 && parsed <= 2002;
};

// iyr (Issue Year) - four digits; at least 2010 and at most 2020.
const validIyr = (value = 0) => {
  const parsed = parseInt(value, 10);
  return parsed >= 2010 && parsed <= 2020;
};

// eyr (Expiration Year) - four digits; at least 2020 and at most 2030.
const validEyr = (value = 0) => {
  const parsed = parseInt(value, 10);
  return parsed >= 2020 && parsed <= 2030;
};

// hgt (Height) - a number followed by either cm or in:
// If cm, the number must be at least 150 and at most 193.
// If in, the number must be at least 59 and at most 76.
const validHgt = (value = "") => {
  const parsed = parseInt(value.replace(/cm|in/, ""), 10);
  if (value.search("cm") >= 0 && parsed >= 150 && parsed <= 193) return true;
  if (value.search("in") >= 0 && parsed >= 59 && parsed <= 76) return true;
  return false;
};

// hcl (Hair Color) - a # followed by exactly six characters 0-9 or a-f.
const validHcl = (value = "") => value.search(/#[0-9a-f]{6}/) >= 0;

// ecl (Eye Color) - exactly one of: amb blu brn gry grn hzl oth.
const validEcl = (value = "") =>
  value.search(/^(amb|blu|brn|gry|grn|hzl|oth)$/) >= 0;

// pid (Passport ID) - a nine-digit number, including leading zeroes.
const validPid = (value = "") => value.search(/^[0-9]{9}$/) >= 0;

const validPassports = passports.filter(
  (passport) =>
    validByr(passport.byr) &&
    validIyr(passport.iyr) &&
    validEyr(passport.eyr) &&
    validHgt(passport.hgt) &&
    validHcl(passport.hcl) &&
    validEcl(passport.ecl) &&
    validPid(passport.pid)
);

const validCount = validPassports.length;

document.getElementById("app").innerHTML = `${validCount}`;
