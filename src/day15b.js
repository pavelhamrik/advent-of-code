const data = `16,11,15,0,1,7`
const starter = data.split(',').map(number => parseInt(number, 10))
// const STOPPER = 2020
const STOPPER = 30000000

console.time('Run')

const play = (starter) => {
    const numbers = new Map()
    starter.slice(0, starter.length - 1).forEach((number, index) => numbers.set(number, index + 1))
    let curr = starter[starter.length - 1]

    for (let i = starter.length + 1; i <= STOPPER; i += 1) {
        const next = numbers.has(curr) ? i - 1 - numbers.get(curr) : 0
        numbers.set(curr, i - 1)
        curr = next
    }
    return curr
}

console.log(play(starter))
console.timeEnd('Run')

// = 37312
