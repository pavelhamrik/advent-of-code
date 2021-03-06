import { data as data } from './day17.data'

const ACTIVE = '#'
const INACTIVE = '.'

const seed = data.split('\n').map(row => row.split(''))

const space = new Map()
seed.forEach((y, yi) => y.forEach((x, xi) => {
    if (x === ACTIVE) space.set(`${0},${yi},${xi}`, x)
}))

const pushActiveToAdjacent = (key, metaSpace) => {
    const pivot = key.split(',').map(coord => parseInt(coord, 10))
    for (let z = pivot[0] - 1; z <= pivot[0] + 1; z += 1) {
        for (let y = pivot[1] - 1; y <= pivot[1] + 1; y += 1) {
            for (let x = pivot[2] - 1; x <= pivot[2] + 1; x += 1) {
                if (z === pivot[0] && y === pivot[1] && x === pivot[2]) continue

                const current = metaSpace.get(`${z},${y},${x}`)
                metaSpace.set(`${z},${y},${x}`, current ? [current[0], current[1] + 1] : [INACTIVE, 1])
            }
        }
    }
    return metaSpace
}

const evalAdjacencies = (space) => {
    const metaSpace = new Map(space)
    
    space.forEach((value, key) => metaSpace.set(key, [value, 0]))
    
    space.forEach((value, key) => {
        if (value[0] === ACTIVE) pushActiveToAdjacent(key, metaSpace)
    })

    metaSpace.forEach((value, key) => {
        if (value[0] === ACTIVE) {
            if (value[1] !== 2 && value[1] !== 3) metaSpace.delete(key)
            else metaSpace.set(key, value[0])
        }
        
        if (value[0] === INACTIVE) {
            if (value[1] === 3) metaSpace.set(key, ACTIVE)
            else metaSpace.delete(key)
        }
    })

    return metaSpace
}

const cycle = (space, count = 6) => {
    let workSpace = new Map(space)
    for (let i = 0; i < count; i += 1) {
        workSpace = evalAdjacencies(workSpace)
    }
    return workSpace
}

console.log(cycle(space).size)

// = 336
