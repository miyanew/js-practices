#!/usr/bin/env node

import minimist from "minimist";

const main = (args) => {
  const { year, month } = args;

  const formattedDays = formatDays(year, month);
  showCalendar(year, month, formattedDays);
};

const formatDays = (year, month) => {
  const lastDayOfMonth = new Date(year, month, 0);
  const firstDayOfMonth = new Date(
    lastDayOfMonth.getFullYear(),
    lastDayOfMonth.getMonth(),
    1,
  );

  const initialSpace = getInitialSpace(firstDayOfMonth);
  const daysWithPaddingAndLinebreaks = addSpacingAndLinebreaks(lastDayOfMonth);
  const daysWithNewline = ensureTrailingNewline(
    daysWithPaddingAndLinebreaks,
    lastDayOfMonth,
  );

  return initialSpace + [...daysWithNewline].join("");
};

const getInitialSpace = (firstDayOfMonth) =>
  " ".repeat(3 * firstDayOfMonth.getDay());

const addSpacingAndLinebreaks = (lastDayOfMonth) => {
  const days = Array.from(
    { length: lastDayOfMonth.getDate() },
    (_, i) => i + 1,
  );

  return days.map((day) => {
    const formattedDay = day.toString().padStart(2, " ");

    const currentDay = new Date(
      lastDayOfMonth.getFullYear(),
      lastDayOfMonth.getMonth(),
      day,
    );

    return isSaturday(currentDay) ? `${formattedDay}\n` : `${formattedDay} `;
  });
};

const isSaturday = (targetDay) => targetDay.getDay() === 6;

const ensureTrailingNewline = (formattedDays, lastDayOfMonth) => {
  if (!isSaturday(lastDayOfMonth)) {
    formattedDays[formattedDays.length - 1] += "\n";
  }

  return formattedDays;
};

const showCalendar = (year, month, formattedDays) => {
  const monthName = new Date(year, month, 0).toLocaleString("en-US", {
    month: "long",
  });
  console.log(`   ${monthName} ${year}`);
  console.log("Su Mo Tu We Th Fr Sa");
  console.log(formattedDays);
};

const parseArgs = () => {
  const argv = minimist(process.argv.slice(2));
  const today = new Date();

  const year = argv._.length > 0 ? parseInt(argv._[0]) : today.getFullYear();
  const month = argv.m !== undefined ? parseInt(argv.m) : today.getMonth() + 1;

  return { year, month };
};

const args = parseArgs();
main(args);
