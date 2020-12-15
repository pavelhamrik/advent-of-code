import { create, all } from 'mathjs'
import { test1 as data } from './day13.data'

const math = create(all)
const schedule = data.split('\n')[1].split(',')

console.time('Run')

const pimpUpSchedule = (schedule) => schedule.reduce((acc, route, index) => {
    if (route === 'x') return acc
    return acc.concat([[math.bignumber(parseInt(route, 10)), math.bignumber(index)]])
}, [])

const calcCongruence = (a1, a2, n1, n2) => {
    console.log(a1.d, a2.d, n1.d, n2.d)
    const bezouts = math.xgcd(n1, n2)
    return math.add(math.multiply(a1, bezouts._data[2], n2), math.multiply(a2, bezouts._data[1], n1))
}

const getProductUntil = (factors, limit) => {
    let result = math.bignumber(1)
    for (let i = 0; i < limit; i += 1) {
        result = math.multiply(result, factors[i])
    }
    return result
} 

const calcTimestamp = (schedule) => {
    let solution = math.bignumber(1)
    for (let i = 0; i < schedule.length -1; i += 1) {
        const congruence = calcCongruence(
            math.bignumber(schedule[i][1]), 
            math.bignumber(schedule[i + 1][1]),
            // math.multiply(math.bignumber(schedule[i][0]), solution),
            math.bignumber(schedule[i][0]),
            // math.bignumber(schedule[i + 1][0]),
            math.multiply(math.bignumber(schedule[i + 1][0]), solution),
            
        )
        const product = getProductUntil(schedule.map(route => route[0]), i)
        solution = math.add(congruence, product)
        console.log(solution.d)
    }
    
    // a1 = 0 // line IDs
    // a2 = 1
    // n1 = 27 // line periods
    // n2 = 19
    // x = a1 * m2 * n2 + a2 * m1 * n1

    return solution
}

console.log(calcTimestamp(pimpUpSchedule(schedule)).d[0])
console.timeEnd('Run')

// 1549033645149020 product of line cycles

// 100000000000000  expected min
// 490590248452237  from WolframAlpha is too low
// 1058443396696792 from alt solution

// 9007199254740991 Number.MAX_SAFE_INTEGER

// WolframAlpha: ChineseRemainder[{0, 9, 19, 27, 36, 48, 50, 56, 63}, {19, 41, 823, 23, 17, 29, 443, 37, 13}]