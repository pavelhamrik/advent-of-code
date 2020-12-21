import { data } from './day20.data'

const tiles = data.split('\n\n').map(tile => {
    const parts = tile.split(':\n')
    const image = parts[1].split('\n').map(row => row.split(''))
    return [image, parts[0]]
})

console.log(tiles)

// 12 x 12