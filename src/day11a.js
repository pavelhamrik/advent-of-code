import { data } from './day11.data'

const EMPTY_SEAT = 'L';
const OCCUPIED_SEAT = '#';
const FLOOR = '.';

const DEPTH_LIMIT = 1000;

const plan = data.split('\n').map(row => Array.from(row));

// If a seat is empty (L) and there are no occupied seats adjacent to it, the seat becomes occupied (#).
// If a seat is occupied (#) and four or more seats adjacent to it are also occupied, the seat becomes empty (L).
// Otherwise, the seat's state does not change.
// Rules are applied to every seat simultaneously.

const comparePlans = (plan1, plan2) => JSON.stringify(plan1) === JSON.stringify(plan2)

const countSeatsInRow = row => row.reduce((acc, seat) => seat === OCCUPIED_SEAT ? acc + 1 : acc, 0)

const countSeats = (plan) => plan.reduce((acc, row) => acc + countSeatsInRow(row), 0)

// const printSeatMap = (plan) => console.log(plan.map((x) => x.join("")).join("\n"));

// const clone2dArray = (array) => array.slice().map(row => row.slice());


const countNeighbors = (plan, x, y) => {
    const N  =  plan[y - 1]                       ? plan[y - 1][x]     : FLOOR;
    const NE =  plan[y - 1] && plan[y - 1][x + 1] ? plan[y - 1][x + 1] : FLOOR;
    const E  =                 plan[y][x + 1]     ? plan[y][x + 1]     : FLOOR;
    const SE =  plan[y + 1] && plan[y +1][x + 1]  ? plan[y + 1][x + 1] : FLOOR;
    const S  =  plan[y + 1]                       ? plan[y + 1][x]     : FLOOR;
    const SW =  plan[y + 1] && plan[y + 1][x - 1] ? plan[y + 1][x - 1] : FLOOR;
    const W  =                 plan[y][x - 1]     ? plan[y][x - 1]     : FLOOR;
    const NW =  plan[y - 1] && plan[y - 1][x - 1] ? plan[y - 1][x - 1] : FLOOR;

    return countSeatsInRow([N, NE, E, SE, S, SW, W, NW]);
}

const determineShift = (plan, seat, x, y) => {
    const neighborsCount = countNeighbors(plan, x, y);
    if ((seat === EMPTY_SEAT) && (neighborsCount === 0)) return OCCUPIED_SEAT;
    if ((seat === OCCUPIED_SEAT) && (neighborsCount >= 4)) return EMPTY_SEAT;
    return seat;
}
const shiftPeople = (plan) => plan.map((row, y) => row.map((seat, x) => determineShift(plan, seat, x, y)))

const runShifts = (plan) => {
    var previousPlan = plan;

    for (let i = 0; i < DEPTH_LIMIT; i++) {
        const newPlan = shiftPeople(previousPlan);
        if (comparePlans(newPlan, previousPlan)) return countSeats(newPlan);
        previousPlan = newPlan;
    }
    
    return -1;
}

console.log(runShifts(plan))