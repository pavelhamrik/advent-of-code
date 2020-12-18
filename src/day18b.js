import { data as data } from './day18.data'

const test1 = `1 + (2 * 3) + (4 * (5 + 6))` // 51
const test2 = `2 * 3 + (4 * 5)` // 46
const test3 = `5 + (8 * 3 + 9 + 3 * 4 * 3)` // 1445
const test4 = `5 * 9 * (7 * 3 * 3 + 9 * 3 + (8 + 6 * 4))` // 669060
const test5 = `((2 + 4 * 9) * (6 + 9 * 8 + 6) + 6) + 2 + 4 * 2` // 23340

const ADD = '+'
const MULTIPLY = '*'

const applyOperators = (expression) => {
    console.log(expression)
    return expression.split(' ').reduce((acc, value) => {
        if (value === ADD || value === MULTIPLY) return [acc[0], value]
        if (acc[1] === '') return [parseInt(value), acc[1]]
        
        if (acc[1] === ADD) return [parseInt(value) + acc[0], acc[1]]
        if (acc[1] === MULTIPLY) return [parseInt(value) * acc[0], acc[1]]
    }, [0, ''])[0]
}

const replaceFirst = (string, regex, replacement) => {
    const opening = string.search(regex)
    if (opening < 0) return string

    const head = string.slice(0, opening)
    const tail = string.slice(string.search(/\)/) + 1)

    return head + replacement + tail
}

const chunkOperators = (expression) => {
    const regex = /([0-9]+\s\+\s[0-9]+)/g
    const match = expression.match(regex)
    return (match) 
        ? chunkOperators(expression.replace(regex, (match) => applyOperators(match).toString()))
        : applyOperators(expression)
}

const evaluate = (expression) => {
    console.log(expression)

    const regex = /\(([0-9\*\+\s]+)\)/
    const chunks = expression.match(regex)
    
    return (chunks && chunks.length > 1) 
        ? evaluate(replaceFirst(expression, regex, chunkOperators(chunks[1]).toString()))
        : chunkOperators(expression).toString()
}

const sumData = data => data.split('\n').reduce((acc, expression) => acc + parseInt(evaluate(expression)), 0)

console.log(sumData(data))
