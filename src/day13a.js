import { data } from './day13.data'

const ticket = data.split('\n')
const earliest = parseInt(ticket[0], 10)
const schedule = ticket[1].split(',')

const chatchEarliest = (schedule, earliest) =>
    schedule.filter(route => route !== 'x').map(route => parseInt(route, 10)).reduce((acc, route) => {
        const waitTime = (Math.ceil(earliest / route) * route) % earliest
        return waitTime < acc[1] ? [route, waitTime] : acc
    }, [0, Infinity])

const earliestBus = chatchEarliest(schedule, earliest)

console.log(earliest, schedule)
console.log(earliestBus, earliestBus[0] * earliestBus[1])

// == 2215
