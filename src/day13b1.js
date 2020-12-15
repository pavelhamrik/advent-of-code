import { create, all } from 'mathjs'
import { data as data } from './day13.data'

const math = create(all)
const schedule = data.split('\n')[1].split(',')

console.time('Run')

const pimpUpSchedule = (schedule) => schedule.reduce((acc, route, index) => {
    if (route === 'x') return acc
    return acc.concat([[math.bignumber(parseInt(route, 10)), math.bignumber(index)]])
}, [])

const calcCongruence = (a1, n1, a2, n2) => {
    const bezouts = math.xgcd(n1, n2)
    return math.add(math.multiply(a1, bezouts._data[2], n2), math.multiply(a2, bezouts._data[1], n1))
}

const calcTimestamp = (schedule) => {
    let curr = schedule[0]

    // For more than two moduli, the method for two moduli allows the replacement of
    // any two congruences by a single congruence modulo the product of the moduli.
    // https://en.wikipedia.org/wiki/Chinese_remainder_theorem#Using_the_existence_construction

    for (let i = 1; i < schedule.length; i += 1) {
        const congruence = calcCongruence(
            curr[1], 
            curr[0],
            schedule[i][1],
            schedule[i][0]
        )
        
        const product = math.multiply(curr[0], schedule[i][0])
        curr = [product, math.mod(congruence, product)]
    }

    return math.number(math.subtract(curr[0], curr[1]))
}

console.log(calcTimestamp(pimpUpSchedule(schedule)))
console.timeEnd('Run')

// = 1058443396696792

// 100000000000000  expected min
// 9007199254740991 Number.MAX_SAFE_INTEGER
