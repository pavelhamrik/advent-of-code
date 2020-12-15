import { data } from './day12.data';

const instructions = data.split('\n').map(
    instruction => [instruction.substring(0, 1), parseInt(instruction.substring(1), 10)]
);

const DIRECTIONS = ['N', 'E', 'S', 'W'];
const ANGLE = 90;

// Action N means to move north by the given value.
// Action S means to move south by the given value.
// Action E means to move east by the given value.
// Action W means to move west by the given value.

// Action L means to turn left the given number of degrees.
// Action R means to turn right the given number of degrees.

// Action F means to move forward by the given value in the direction the ship is currently facing.

const increments = {
    N: [-1,  0],
    E: [ 0,  1],
    S: [ 1,  0],
    W: [ 0, -1],
}

const directionToDegrees = (direction) => DIRECTIONS.indexOf(direction) * ANGLE;
const degreesToDirection = (degrees) => 
    DIRECTIONS[(((ANGLE * DIRECTIONS.length ) + degrees) / ANGLE) % DIRECTIONS.length];
// test result: N E S W N E S W N W S E N undefined
// console.log(
//     degreesToDirection(0),
//     degreesToDirection(90),
//     degreesToDirection(180),
//     degreesToDirection(270),
//     degreesToDirection(360),
//     degreesToDirection(450),
//     degreesToDirection(540), 
//     degreesToDirection(630),
//     degreesToDirection(720),
//     degreesToDirection(-90),
//     degreesToDirection(-180),
//     degreesToDirection(-270),
//     degreesToDirection(-360),
//     degreesToDirection(-450),
// )

const turn = (direction, instruction) => {
    const degrees = directionToDegrees(direction)
    console.log(direction, instruction.toString())
    return instruction[0] === 'L'
        ? degreesToDirection(degrees - instruction[1])
        : degreesToDirection(degrees + instruction[1])
}
// test result: E E W W E W W
// console.log(
//     turn('N', ['R', 90]),
//     turn('N', ['L', -90]),
//     turn('N', ['L', 90]),
//     turn('N', ['R', -90]),
//     turn('S', ['R', 270]),
//     turn('S', ['L', 270]),
//     turn('E', ['L', 180]),
// )

const calculateStep = (direction, instruction) => {
    const step = increments[direction]
    return [direction, step[0] * instruction[1], step[1] * instruction[1]]
}

const move = (direction, instruction) => {
    if (instruction[0] === 'L' || instruction[0] === 'R') return [turn(direction, instruction), 0, 0]
    if (instruction[0] === 'F') return calculateStep(direction, instruction)

    const step = calculateStep(instruction[0], instruction);
    return [direction, step[1], step[2]]
}

const sail = (instructions) => 
    instructions.reduce((acc, instruction) => {
        const movement = move(acc[0], instruction);
        const accumulation = [movement[0], acc[1] + movement[1], acc[2] + movement[2]]
        console.log(instruction.toString(), movement.toString(), accumulation.toString());
        return accumulation;
    }, ['E', 0, 0])


const calcManhattanDistance = (coords) => Math.abs(coords[1]) + Math.abs(coords[2])

const sailCoords = sail(instructions)
console.log(sailCoords, calcManhattanDistance(sailCoords));
