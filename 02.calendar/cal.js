import minimist from "minimist";

const argv = minimist(process.argv.slice(2));

const today = new Date();
const year = argv.y !== undefined ? argv.y : today.getFullYear();
const month = argv.m !== undefined ? argv.m : today.getMonth() + 1;

console.log(`-y: ${year}`);
console.log(`-m: ${month}`);
