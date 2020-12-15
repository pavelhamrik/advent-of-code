const data = `16,11,15,0,1,7`
// const data = `0,3,6`
const starter = data.split(',').map(number => parseInt(number, 10))
const STOPPER = 2020

const sayNumber = (numbers) => {
    const last = numbers[numbers.length - 1]
    const lastIndexOFLast = numbers.lastIndexOf(last, numbers.length - 2)
    if (lastIndexOFLast === -1) return 0
    return numbers.length - (lastIndexOFLast + 1)
}

const play = (starter) => {
    let numbers = [...starter]
    for (let i = 0; i < STOPPER - starter.length; i += 1) {
        const newNumber = sayNumber(numbers)
        numbers.push(newNumber)
    }
    return numbers[numbers.length - 1]
}

console.log(play(starter))
