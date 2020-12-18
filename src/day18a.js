import { data as data } from './day18.data'

const test1 = `2 * 3 + (4 * 5)`
const test2 = `5 + (8 * 3 + 9 + 3 * 4 * 3)`
const test3 = `5 * 9 * (7 * 3 * 3 + 9 * 3 + (8 + 6 * 4))`
const test4 = `((2 + 4 * 9) * (6 + 9 * 8 + 6) + 6) + 2 + 4 * 2`

const ADD = '+'
const MULTIPLY = '*'

const applyOperators = (expression) => 
    expression.split(' ').reduce((acc, value) => {
        if (value === ADD || value === MULTIPLY) return [acc[0], value]
        if (acc[1] === '') return [parseInt(value), acc[1]]
        
        if (acc[1] === ADD) return [parseInt(value) + acc[0], acc[1]]
        if (acc[1] === MULTIPLY) return [parseInt(value) * acc[0], acc[1]]
    }, [0, ''])[0]

const replaceFirst = (string, regex, replacement) => {
    const opening = string.search(regex)
    if (opening < 0) return string

    const head = string.slice(0, opening)
    const tail = string.slice(string.search(/\)/) + 1)

    return head + replacement + tail
}

const evaluate = (expression) => {
    console.log(expression)
    // const chunks = expression.match(/\(([0-9\*\+\s]+)\)/)
    const regex = /\(([0-9\*\+\s]+)\)/
    const chunks = expression.match(regex)
    
    return (chunks && chunks.length > 1) 
        ? evaluate(replaceFirst(expression, regex, applyOperators(chunks[1]).toString()))
        : applyOperators(expression).toString()
}

const sumData = data => data.split('\n').reduce((acc, expression) => acc + parseInt(evaluate(expression)), 0)

console.log(sumData(data))
