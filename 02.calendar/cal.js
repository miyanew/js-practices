#!/usr/bin/env node

import minimist from "minimist";

const argv = minimist(process.argv.slice(2));
const today = new Date();
const year = argv.y !== undefined ? parseInt(argv.y) : today.getFullYear();
const month = argv.m !== undefined ? parseInt(argv.m) : today.getMonth() + 1;

const lastDayOfMonth = new Date(year, month, 0);

const monthName = lastDayOfMonth.toLocaleString('en-US', { month: 'long' })
const weekdays = "Su Mo Tu We Th Fr Sa"
const days = [];
for (let day = 1; day <= lastDayOfMonth.getDate(); day++) {
    days.push(day);
}

console.log(monthName, year);
console.log(weekdays);
console.log(days);

const firstDayOfMonth = new Date(year, month - 1, 1);
const firstDayOfWeek = firstDayOfMonth.getDay();
console.log(firstDayOfWeek);
