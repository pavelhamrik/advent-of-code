import { ranges, yourTicket, nearbyTickets } from './day16.data'

const rules = ranges.split('\n').map(range => {
    const match = range.match(/^([a-z\s]+):\s([0-9]+)-([0-9]+)[a-z\s]+([0-9]+)-([0-9]+)$/)
    return [
        [parseInt(match[2]), parseInt(match[3])],
        [parseInt(match[4]), parseInt(match[5])],
        match[1]
    ]
})

const tickets = nearbyTickets.split('\n').map(ticket => ticket.split(',').map(field => parseInt(field, 10)))

const validate =  (value, rules) => (
    rules.filter(rule => 
        rule.slice(0, 2).filter(range => 
            value >= range[0] && value <= range[1]
        ).length > 0
    ).length > 0
)

const checkTickets = (tickets, rules) => {
    const validRemainder = tickets.map(ticket => 
        ticket.filter(value => !validate(value, rules))
    ).filter(ticket => ticket.length > 0)

    const errorRate = validRemainder.reduce((acc, error) => acc += error[0], 0)

    return errorRate
}

console.log(tickets.length, checkTickets(tickets, rules))