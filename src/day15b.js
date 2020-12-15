// const data = `16,11,15,0,1,7`
const data = `0,3,6`
const starter = data.split(',').map(number => parseInt(number, 10))
const STOPPER = 10

// const STOPPER = 30 // 0.339 ms
// const STOPPER = 300 // 0.802 ms
// const STOPPER = 3000 // 3.666 ms
// const STOPPER = 30000 // 171.042 ms
// const STOPPER = 300000 // 14379.704 ms
// const STOPPER = 3000000 // 14379.704 ms

console.time('Run')

const play = (starter) => {
    const numbers = new Map()
    starter.slice(0, starter.length - 1).forEach((number, index) => numbers.set(number, index + 1))
    let curr = starter[starter.length - 1]

    // console.log(curr, numbers)

    for (let i = starter.length; i <= STOPPER; i += 1) {
        const next = numbers.has(curr) ? i - 1 - numbers.get(curr) : 0
        
        numbers.set(curr, i)

        console.log(`turn ${i}, curr ${curr}, next ${next}`, numbers)

        curr = next
    }
    return curr
}

console.log(play(starter))
console.timeEnd('Run')