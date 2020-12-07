import { data } from "./day07.data.js";

const yourBag = "shiny gold";
const noBag = "no other";

const rules = data.split("\n").map((rule) =>
  rule
    .replace(" contain ", ", ")
    .replaceAll(/(\s?bag(s)?\s?)|(\.)/gi, "")
    .split(/,\s?/gi)
    .map((subrule, index) => {
      if (index === 0) return subrule;
      if (subrule === noBag) return [0];
      const splitSubrule = subrule.replace(" ", "-").split("-");
      return [parseInt(splitSubrule[0], 10), splitSubrule[1]];
    })
);

const findWrapperForBag = (bag, rules) => {
  const filteredRules = rules.filter((rule, index) => {
    const contents = rule
      .slice(1, rule.length)
      .filter((bag) => bag[0] !== 0)
      .map((bag) => bag[1]);
    return contents.includes(bag);
  });

  const mappedRules = filteredRules.map((rule) => rule[0]);
  return mappedRules;
};

const outerBags = new Set([yourBag]);
var lastCycleBags = new Set();

while (outerBags.size > lastCycleBags.size) {
  lastCycleBags = new Set(outerBags);
  lastCycleBags.forEach((bag) => {
    const wrappers = findWrapperForBag(bag, rules);
    wrappers.forEach((bag) => outerBags.add(bag));
  });
}

const validOuterBags = Array.from(outerBags).filter((bag) => bag !== yourBag);

document.getElementById("app").innerHTML = `${validOuterBags.length}`;
