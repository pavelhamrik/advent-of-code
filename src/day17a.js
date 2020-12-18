import { data } from './day17.data'

const ACTIVE = '#'
const INACTIVE = '.'

const seed = data.split('\n').map(row => row.split(''))

// z, y, x
const space = [seed]


// pivot: [z, y, x]
const countAdjacent = (pivot, space) => {
    let count = 0
    for (let z = pivot[0] - 1; z <= pivot[0] + 1; z += 1) {
        if (!space[z]) continue
        for (let y = pivot[1] - 1; y <= pivot[1] + 1; y += 1) {
            if (!space[z][y]) continue
            for (let x = pivot[2] - 1; x <= pivot[2] + 1; x += 1) {
                if (!space[z][y][x]) continue
                if (z === pivot[0] && y === pivot[1] && x === pivot[2]) continue

                if (space[z][y][x] === ACTIVE) count += 1
            }
        }
    }
    return count
}

// wrap the space by another layer each step, so that new items can populate the boundary
const expandSpace = (space) => {
    const expanded = cloneSpace(space)
    for (let z = 0; z <= space; z += 1) {
        for (let y = pivot[1] - 1; y <= pivot[1] + 1; y += 1) {
            for (let x = pivot[2] - 1; x <= pivot[2] + 1; x += 1) {
                space[z][y][x].unshift(INACTIVE)
                space[z][y][x].push(INACTIVE)
            }
        }
    }
    return space
}

const cloneSpace = (space) => {
    space.map(z => z.map(y => y.slice()))
}

// optionally, unwrap the space by cutting off empty layers on the edges to keep it small

const cycle = (space) => {
    console.log(countAdjacent([0, 0, 0], space))
}

cycle(space)

console.log(space, expandSpace(space))

