import { data } from "./day10.data";

const rawJoltages = data.split("\n").map((joltage) => parseInt(joltage, 10));
const joltages = new Set(rawJoltages.concat([0]))
const maxJoltage = Array.from(joltages.values()).reduce((acc, joltage) => acc < joltage ? joltage : acc, 0)

const mem = new Map();

const jump = (joltages, target) => {
    if (!joltages.has(target)) return 0
    if (target <= 0) return 1

    let bets = 0;
    for (let i = 1; i <= 3; i += 1) {    
        if (!mem.has(target - i)) {
            mem.set(target - i, jump(joltages, target - i))
        }
        bets += mem.get(target - i)
    }

    return bets
}

// console.log(joltages.toString())
console.log(jump(joltages, maxJoltage))
