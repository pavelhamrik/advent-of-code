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

const findBagContents = (bag, rules) => {
  const bagRule = rules.filter((rule) => rule[0] === bag)[0];
  const subbags = bagRule.slice(1, bagRule.length);

  if (subbags[0][0] === 0) return 1;

  return subbags.reduce((acc, subbag) => {
    console.log(subbag, subbag[1], subbag[0]);
    const subbagContents = findBagContents(subbag[1], rules);
    return acc + subbag[0] * subbagContents;
  }, 1);
};

console.log(`\n`);
console.info(findBagContents(yourBag, rules) - 1);

// document.getElementById("app").innerHTML = `${validOuterBags.length}`;
