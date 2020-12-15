import { data } from './day14.data'

const BIN_LENGTH = 36

const parseMem = (command) => {
    if (command[0].substr(0,3) !== 'mem') return command
    return [parseInt(command[0].match(/\[([0-9]+)\]/)[1], 10), parseInt(command[1], 10)]
}

const commands = data.split('\n').map(command => parseMem(command.split(' = ')))

const pad = (number, length = BIG_LENGTH) => {
    while (number.length < length) number = '0' + number
    return number
}

const toBin = (number) => pad(number.toString(2), BIN_LENGTH)

String.prototype.replaceAt = function(index, replacement) {
    return this.substr(0, index) + replacement + this.substr(index + replacement.length);
}

const applyMask = (number, mask) => {
    const binNumber = toBin(number)
    let output = ''
    for (let i = 0; i < mask.length; i += 1) {
        if(mask.charAt(i) === '0') output += binNumber.charAt(i)
        if(mask.charAt(i) === '1') output += '1'
        if(mask.charAt(i) === 'X') output += 'X'
    }
    return output
}

const variate = (input) => {
    const floats = []
    for (let i = 0; i < input.length; i += 1) {
        if(input.charAt(i) === 'X') floats.push(i)
    }
    
    const variations = []
    for (let i = 0; i < Math.pow(2, floats.length); i += 1) {
        variations.push(pad(i.toString(2), floats.length))
    }

    return variations.map((variation) => {
        return floats.reduce((acc, float, index) => acc.replaceAt(float, variation.charAt(index)), input)
    })
}

const floatAddress = (address, mask) => {
    const masked = applyMask(address, mask)
    return variate(masked)
}

const sumMemory = (memory) => Object.values(memory).reduce((acc, entry) => acc + entry, 0)

const run = (commands) => {
    const memory = {}
    let mask = 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX'
    commands.forEach(command => {
        if (command[0] === 'mask') {
            mask = command[1]
            return;
        }
        
        floatAddress(command[0], mask).forEach(address => {
            memory[address] = command[1]
        })
    })

    return sumMemory(memory)
}

console.log('=', run(commands), '🌟🌟')

// = 3618217244644
