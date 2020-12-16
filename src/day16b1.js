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

const validateTicket =  (value, rules) => (
    rules.filter(rule => 
        rule.slice(0, 2).filter(range => 
            value >= range[0] && value <= range[1]
        ).length > 0
    ).length > 0
)

const filterValidTickets = (tickets, rules) => {
    const validRemainder = tickets.map(ticket => 
        ticket.filter(value => validateTicket(value, rules))
    ).filter(ticket => ticket.length === tickets[0].length)
    return validRemainder
}

const validateValue = (value, rule) => (
    rule.slice(0, 2).filter(range => 
        value >= range[0] && value <= range[1]
    ).length > 0
)

const validateFieldOfTickets = (tickets, index, rule) => {
    for (let i = 0; i < tickets.length; i += 1) {
        if (!validateValue(tickets[i][index], rule)) return false
    }
    return true
}

const validTickets = filterValidTickets(tickets, rules)

const counts = rules.map((rule) => [
    rule[2],
    validTickets[0].reduce((acc, t, index) => {
        const isValid = validateFieldOfTickets(validTickets, index, rule)
        return isValid ? acc + 1 : acc
    }, 0),
    validTickets[0].map((t, index) => {
        const isValid = validateFieldOfTickets(validTickets, index, rule)
        return isValid ? index : -1
    }, 0).filter(match => match > -1)
])

console.log(counts)

console.timeEnd('Run')

// too lazy to code this, easy to do by hand :)

// wagon                = 15 (of 15)
// arrival platform     = 7  (of 7, 15)
// duration             = 8  (of 7, 8, 15)
// row                  = 2  (of 2, 7, 8, 15)
// price                = 4  (of 2, 4, 7, 8, 15)
// arrival location     = 0  (of 0, 2, 4, 7, 8, 15)
// zone                 = 18 (of 0, 2, 4, 7, 8, 15, 18)

// departure location   = 19 (of 0, 2, 4, 7, 8, 15, 18, 19)
// departure time       = 16 (of 0, 2, 4, 7, 8, 15, 16, 18, 19)
// departure station    = 10 (of 0, 2, 4, 7, 8, 10, 15, 16, 18, 19)
// departure platform   = 5  (of 0, 2, 4, 5, 7, 8, 10, 15, 16, 18, 19)
// departure track      = 11 (of 0, 2, 4, 5, 7, 8, 10, 11, 15, 16, 18, 19)
// departure date       = 6  (of 0, 2, 4, 5, 6, 7, 8, 10, 11, 15, 16, 18, 19)

const goldenTicket = yourTicket.split(',').map(field => parseInt(field, 10))

console.log(goldenTicket)
console.log(goldenTicket[19] * goldenTicket[16] * goldenTicket[10] * goldenTicket[5] * goldenTicket[11] * goldenTicket[6])

// = 5311123569883
