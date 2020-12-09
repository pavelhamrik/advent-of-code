import { data } from "./day09.data.js";

const target = 1492208709;

const parseData = (data) => {
  return data.split("\n").map((number) => parseInt(number, 10));
};

const addUp = (numbers, target) =>
  numbers.reduce(
    (acc, number) =>
      acc[0] < target ? [acc[0] + number, acc[1].concat([number])] : acc,
    [0, []]
  );

const validate = (numbers, target) => {
  return numbers.reduce((acc, number, index) => {
    const total = addUp(numbers.slice(index), target);
    if (total[0] === target) return acc.concat(total[1]);
    return acc;
  }, []);
};

const parsedNumbers = parseData(data);
const considerableNumbers = parsedNumbers.slice(
  0,
  parsedNumbers.indexOf(target)
);

const list = validate(considerableNumbers, target);
const checksum = list.reduce((acc, item) => acc + item, 0);

const calcAnswer = (list) => {
  const sortedList = list.sort((a, b) => a - b);
  return sortedList[0] + sortedList[list.length - 1];
};

console.log(list);
console.info(checksum, checksum === target, calcAnswer(list));
