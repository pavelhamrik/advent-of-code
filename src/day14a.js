import { data } from './day14.data'

const BIN_LENGTH = 36

const parseMem = (command) => {
    if (command[0].substr(0,3) !== 'mem') return command
    return [parseInt(command[0].match(/\[([0-9]+)\]/)[1], 10), parseInt(command[1], 10)]
}

const calcMemorySize = (commands) => commands.reduce((acc, command) => command[0] > acc ? command[0] : acc, 0)

const commands = data.split('\n').map(command => parseMem(command.split(' = ')))

const initMemory = (commands) => Array.from(new Array(calcMemorySize(commands))).map(location => 0)

const pad = (number) => {
    while (number.length < BIN_LENGTH) number = '0' + number
    return number
}

const toBin = (number) => pad(number.toString(2))

const applyMask = (number, mask) => {
    const binNumber = toBin(number)
    let output = ''
    for (let i = 0; i < mask.length; i += 1) {
        mask.charAt(i) === 'X' ? output += binNumber.charAt(i) : output += mask.charAt(i)
    }
    return output
}
// console.log(applyMask(2, 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXX11XXXXX'))

const sumMemory = (memory) => memory.reduce((acc, entry) => acc + parseInt(entry, 2), 0)

const run = (commands) => {
    const memory = initMemory(commands)
    let mask = 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX'
    commands.forEach(command => {
        if (command[0] === 'mask') {
            mask = command[1]
            return;
        }

        memory[command[0]] = applyMask(command[1], mask)
    })

    console.log(memory)

    return sumMemory(memory)
}

// console.log(toBin(2))
console.log(run(commands))

console.log(toBin(2343), parseInt(toBin(2343), 2))