import { data } from "./day06.data.js";

// const questions = Array.from("abcdefghijklmnopqrstuvwxyz");

const groups = data
  .split("\n\n")
  .map((group) => group.split("\n").map((answers) => Array.from(answers)));

const intersect = (array1, array2) =>
  array1.filter((item) => array2.includes(item));

const union = (array1, array2) => {
  const unionSet = new Set(array1);
  array2.forEach((item) => unionSet.add(item));
  return Array.from(unionSet);
};

const intersectGroup = (group) =>
  group.reduce((acc, item) => {
    if (group.length === 1) return acc;
    return intersect(acc, item);
  }, group[0]);

const unionGroup = (group) =>
  group.reduce((acc, item) => {
    if (group.length === 1) return acc;
    return union(acc, item);
  }, group[0]);

const sumGroups = (groups) =>
  groups.reduce((acc, group) => acc + intersectGroup(group).length, 0);

const unionGroups = (groups) =>
  groups.reduce((acc, group) => acc + unionGroup(group).length, 0);

console.log(groups);
console.log(sumGroups(groups));
console.log(unionGroups(groups));

// document.getElementById("app").innerHTML = `${groups[1]}`;
