import { data } from './day12.data';

const instructions = data.split('\n').map(
    instruction => [instruction.substring(0, 1), parseInt(instruction.substring(1), 10)]
);

const DIRECTIONS = ['N', 'E', 'S', 'W'];
const ANGLE = 90;

const INCREMENTS = {
    N: [-1,  0],
    E: [ 0,  1],
    S: [ 1,  0],
    W: [ 0, -1],
}

// Action N means to move the waypoint north by the given value.
// Action S means to move the waypoint south by the given value.
// Action E means to move the waypoint east by the given value.
// Action W means to move the waypoint west by the given value.

// Action L means to rotate the waypoint around the ship left (counter-clockwise) the given number of degrees.
// Action R means to rotate the waypoint around the ship right (clockwise) the given number of degrees.

// Action F means to move forward to the waypoint a number of times equal to the given value.

const turnLeft = (location) => [location[1] * -1, location[0]]
const turnRight = (location) => [location[1], location[0] * -1]

const turn = (location, instruction) => {
    const numberOfTurns = instruction[1] / ANGLE
    if (instruction[0] === 'L') {
        var postTurn = location;
        for (let i = 0; i < numberOfTurns; i++) {
            postTurn = turnLeft(postTurn)
        }
        return postTurn
    }
    if (instruction[0] === 'R') {
        var postTurn = location;
        for (let i = 0; i < numberOfTurns; i++) {
            postTurn = turnRight(postTurn)
        }
        return postTurn
    }
}
// console.log(
//     'test turn:',
//     turn([2, 2], ['L', 90]).toString() === '2,-2' &&
//     turn([2, -2], ['L', 90]).toString() === '-2,-2' &&
//     turn([-2, -2], ['L', 90]).toString() === '-2,2' &&
//     turn([-2, 2], ['L', 90]).toString() === '2,2' &&
    
//     turn([2, 2], ['L', 180]).toString() === '-2,-2' &&
//     turn([2, 2], ['L', 270]).toString() === '-2,2' &&
    
//     turn([2, 2], ['R', 90]).toString() === '-2,2' &&
//     turn([-2, 2], ['R', 90]).toString() === '-2,-2' &&
//     turn([-2, -2], ['R', 90]).toString() === '2,-2' &&
//     turn([2, -2], ['R', 90]).toString() === '2,2' &&
    
//     turn([2, 2], ['R', 180]).toString() === '-2,-2' &&
//     turn([2, 2], ['R', 270]).toString() === '2,-2' &&
    
//     turn([0, 3], ['L', 90]).toString() === '3,0' &&
//     turn([3, 0], ['L', 90]).toString() === '0,-3' &&
//     turn([0, -3], ['L', 90]).toString() === '-3,0' &&
    
//     turn([0, 3], ['R', 90]).toString() === '-3,0' &&
//     turn([-3, 0], ['R', 90]).toString() === '0,-3' &&
//     turn([3, 0], ['R', 90]).toString() === '0,3'
// )

const moveShip = (instruction, waypoint) => [
    [
        waypoint[0] * instruction[1],
        waypoint[1] * instruction[1],
    ],
    waypoint
];

const moveWaypoint = (instruction, waypoint) => {
    const step = INCREMENTS[instruction[0]]
    return [[0, 0], [
        waypoint[0] + (step[0] * instruction[1]),
        waypoint[1] + (step[1] * instruction[1])
    ]]
}

const move = (instruction, ship, waypoint) => {
    if (instruction[0] === 'L' || instruction[0] === 'R') {
        return [[0, 0], turn(waypoint, instruction)]
    }    
    if (instruction[0] === 'F') return moveShip(instruction, waypoint)
    return moveWaypoint(instruction, waypoint);
}

// [[ship Y, X], [waypoint Y, X]]
const sail = (instructions) => 
    instructions.reduce((acc, instruction) => {
        const movement = move(instruction, acc[0], acc[1]);
        const accumulation = [
            [
                acc[0][0] + movement[0][0],
                acc[0][1] + movement[0][1]
            ],
            [
                movement[1][0],
                movement[1][1]
            ]
        ]

        console.log(`${instruction.toString()} = ${movement.toString()} : ${acc.toString()} → ${accumulation.toString()}`);

        return accumulation;
    }, [[0, 0], [-1, 10]])

const calcManhattanDistance = (coords) => Math.abs(coords[0][0]) + Math.abs(coords[0][1])

const sailCoords = sail(instructions)
console.log(sailCoords, calcManhattanDistance(sailCoords));

// 156735 is it
