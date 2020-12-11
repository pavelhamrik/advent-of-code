import { data } from './day11.data'

const EMPTY_SEAT = 'L';
const OCCUPIED_SEAT = '#';
const FLOOR = '.';

const DEPTH_LIMIT = 100;

const TOLERANCE = 5;

const plan = data.split('\n').map(row => Array.from(row));

// If a seat is empty (L) and there are no occupied seats adjacent to it, the seat becomes occupied (#).
// If a seat is occupied (#) and FIVE or more seats adjacent to it are also occupied, the seat becomes empty (L).
// Otherwise, the seat's state does not change.
// Rules are applied to every seat simultaneously.

const comparePlans = (plan1, plan2) => JSON.stringify(plan1) === JSON.stringify(plan2)

const countSeatsInRow = row => row.reduce((acc, seat) => seat === OCCUPIED_SEAT ? acc + 1 : acc, 0)

const countSeats = (plan) => plan.reduce((acc, row) => acc + countSeatsInRow(row), 0)

// const printSeatMap = (plan) => console.log(plan.map((x) => x.join("")).join("\n"));

const firstInDirection = (plan, x, y, lat, long) => {
    // console.log(y, x, lat, long)

    if (!plan[y + lat]) return 0;
    if (!plan[y + lat][x + long]) return 0;

    if (plan[y + lat][x + long] === OCCUPIED_SEAT) return 1;
    if (plan[y + lat][x + long] === EMPTY_SEAT) return 0;

    return firstInDirection(plan, x + long, y + lat, lat, long)
}

const countVisible = (plan, x, y) => {
    // i only need to change this, but it'll be a massive change

    const N  = firstInDirection(plan, x, y, -1,  0);
    const NE = firstInDirection(plan, x, y, -1,  1);
    const E  = firstInDirection(plan, x, y,  0,  1);
    const SE = firstInDirection(plan, x, y,  1,  1);
    const S  = firstInDirection(plan, x, y,  1,  0);
    const SW = firstInDirection(plan, x, y,  1, -1);
    const W  = firstInDirection(plan, x, y,  0, -1);
    const NW = firstInDirection(plan, x, y, -1, -1);

    // console.log(N, NE, E, SE, S, SW, W, NW)
    return N + NE + E + SE + S + SW + W + NW;
}


const test1data = `.......#.
...#.....
.#.......
.........
..#L....#
....#....
.........
#........
...#.....`;
const test1 = test1data.split('\n').map(row => Array.from(row));
// console.log(countVisible(test1, 3, 4))




const determineShift = (plan, seat, x, y) => {
    const neighborsCount = countVisible(plan, x, y);
    if ((seat === EMPTY_SEAT) && (neighborsCount === 0)) return OCCUPIED_SEAT;
    if ((seat === OCCUPIED_SEAT) && (neighborsCount >= TOLERANCE)) return EMPTY_SEAT;
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