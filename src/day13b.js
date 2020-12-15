import { data as data } from './day13.data'

// const INCREMENT = 5926404n
const INCREMENT = 19n
// const LOWER_LIMIT = 0n
const LOWER_LIMIT = (100000000000000n / INCREMENT) * INCREMENT
const MAX_CYCLES = BigInt(100 * Number.MAX_SAFE_INTEGER)
// const MAX_CYCLES = 10000000000n

console.log('LOWER_LIMIT', LOWER_LIMIT)

const ticket = data.split('\n')
const schedule = ticket[1].split(',')

console.time('Run');

// const calcLastRun = (period, timestamp) => Math.floor(timestamp / period) * period
const calcNextRun = (period, timestamp) => {
    const division = (timestamp / period)
    const product = division * period
    return product < timestamp ? product + period : product
}

const pimpUpSchedule = (schedule) => schedule.reduce((acc, route, index) => {
    if (route === 'x') return acc
    return acc.concat([[BigInt(parseInt(route, 10)), BigInt(index)]])
}, [])

const calcTimestamp = (schedule) => {
    for (let tick = LOWER_LIMIT; tick <= MAX_CYCLES; tick += INCREMENT) {
        const run = schedule.reduce((acc, route)  => {
            return acc && (calcNextRun(route[0], tick) - route[1] === tick)
        }, true)
        if (run) return tick
    }
    return -1n
}

// console.log(pimpUpSchedule(schedule))

const timestamp = calcTimestamp(pimpUpSchedule(schedule))
console.log(timestamp)
console.timeEnd('Run')

// answer > 100,000,000,000,000 (== 100 quadrillions)
//        9,007,199,254,740,991 (max safe integer)
//        >       1,202,161,486
