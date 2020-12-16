import { ranges, yourTicket, nearbyTickets } from './day16.data'

console.time('Run')

const rules = ranges.split('\n').map(range => {
    const match = range.match(/^([a-z\s]+):\s([0-9]+)-([0-9]+)[a-z\s]+([0-9]+)-([0-9]+)$/)
    return [
        [parseInt(match[2]), parseInt(match[3])],
        [parseInt(match[4]), parseInt(match[5])],
        match[1]
    ]
})

const tickets = nearbyTickets.split('\n').map(ticket => ticket.split(',').map(field => parseInt(field, 10)))
const ideyedTickets = tickets.map(ticket => ticket.map((value, index) => [value, index]))

const validateTicket =  (value, rules) => (
    rules.filter(rule => 
        rule.slice(0, 2).filter(range => 
            value >= range[0] && value <= range[1]
        ).length > 0
    ).length > 0
)

const filterValidTickets = (tickets, rules) => {
    const validRemainder = tickets.map(ticket => 
        ticket.filter(value => validateTicket(value[0], rules))
    ).filter(ticket => ticket.length === tickets[0].length)

    return validRemainder
}

// rule e.g. arrival track: 34-458 or 466-962
const validateValue = (value, rule) => (
    rule.slice(0, 2).filter(range => 
        value >= range[0] && value <= range[1]
    ).length > 0
)

const validFieldsMem = new Map()
const validateFieldOfTickets = (tickets, index, rule, attempt) => {
    if (validFieldsMem.has(attempt)) return validFieldsMem.get(attempt)
    for (let i = 0; i < tickets.length; i += 1) {
        if (!validateValue(tickets[i][index][0], rule)) {
            validFieldsMem.set(attempt, false)
            return false
        }
    }
    validFieldsMem.set(attempt, true)
    return true
}

const mem = new Set()
const determineFields = (tickets, rules, triedRules = []) => {
    if (rules.length === 0) {
        console.log('Happy:', triedRules)
        return triedRules
    }

    if (mem.size % 1000 === 0) {console.log(mem); console.timeLog('Run');}

    // take a rule
    // take a column
    // validate the column against the rule
    // if valid, RECURSION, remove the column from the set and the rule too
    // if invalid, continue with another column

    rules.forEach((rule, ruleIndex) => {
        tickets[0].forEach(((col, colIndex) => {
            const attempt = [rule[2], col[1]].toString()
            const memCandidate = triedRules.concat([attempt]).sort().toString()
            
            if (mem.has(memCandidate)) return
            
            // debug
            if (mem.size > 300000) return 'Limit reached'

            mem.add(memCandidate)

            if (validateFieldOfTickets(tickets, colIndex, rule, attempt)) {
                const filteredRules = rules.filter((rule, i) => i !== ruleIndex)
                const filteredTickets = tickets.map(ticket => ticket.filter((value, i) => i !== colIndex))

                // mem.add(memCandidate)

                return determineFields(filteredTickets, filteredRules, triedRules.concat(attempt))
            }
        }))
    })
}

const validTickets = filterValidTickets(ideyedTickets, rules.slice(0, 5))

console.log(determineFields(validTickets, rules))
console.timeEnd('Run')
