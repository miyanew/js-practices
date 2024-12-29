#!/usr/bin/env node

import minimist from "minimist";

// 引数を解析
const argv = minimist(process.argv.slice(2));

const today = new Date();
const year = argv.y !== undefined ? parseInt(argv.y) : today.getFullYear();
const month = argv.m !== undefined ? parseInt(argv.m) : today.getMonth() + 1;

const lastDayOfMonth = new Date(year, month, 0);

// 初週の冒頭の空白埋め
const firstDayOfMonth = new Date(
    lastDayOfMonth.getFullYear(),
    lastDayOfMonth.getMonth(),
    1,
);
const firstDayWeekday = firstDayOfMonth.getDay();
const initialSpaces = Array(firstDayWeekday).fill(" ".repeat(3));

// 日付ごとの空白埋め + 土曜の改行
const isSaturday = (weekday) => weekday === 6;
const days = Array.from({length: lastDayOfMonth.getDate()}, (_, i) => i + 1);
const formattedDays = days.map((day, index) => {
  const formattedDay = day.toString().padStart(2, " ");
  const currentWeekday = (firstDayWeekday + index) % 7;
  return isSaturday(currentWeekday) ? `${formattedDay}\n` : `${formattedDay} `;
});

// 最終行は空白行にする
const lastDayWeekday = lastDayOfMonth.getDay();
if (!isSaturday(lastDayWeekday)) {
  formattedDays[formattedDays.length - 1] += "\n";
}

// 結果出力
const monthName = lastDayOfMonth.toLocaleString("en-US", { month: "long" });
console.log(`   ${monthName} ${year}`);
console.log("Su Mo Tu We Th Fr Sa");
console.log([...initialSpaces, ...formattedDays].join(""));
