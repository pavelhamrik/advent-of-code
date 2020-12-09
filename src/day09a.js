import { data } from "./day09.data.js";

const preambleLenght = 25;

const parseData = (data) => {
  return data.split("\n").map((number) => parseInt(number, 10));
};

const calculateValidSums = (preamble) => {
  return preamble.reduce((acc, item, index) => {
    const withoutItem = preamble.slice(index + 1, preamble.length);
    const sums = withoutItem.map((item2) => item2 + item);
    return acc.concat(sums);
  }, []);
};

const validate = (preamble, tail) =>
  calculateValidSums(preamble).includes(tail);

const findFirstInvalid = (numbers, preambleLenght) => {
  const tail = numbers.slice(preambleLenght, numbers.length);

  return tail.reduce((acc, number, index) => {
    const preamble = numbers.slice(index, preambleLenght + index);
    if (!validate(preamble, number)) return acc.concat([number]);
    return acc;
  }, []);
};

const parsedNumbers = parseData(data);

console.log(findFirstInvalid(parsedNumbers, preambleLenght));
