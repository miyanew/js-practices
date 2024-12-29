#!/usr/bin/env node

import minimist from "minimist";

const isSaturday = (weekday) => weekday === 6;

const main = (args) => {
  const year = args.year;
  const month = args.month;

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

  const initialSpaces = getInitialSpaces(firstDayOfMonth);
  const daysWithPaddingAndLinebreaks = addSpacingAndLinebreaks(lastDayOfMonth);
  const daysWithNewline = ensureTrailingNewline(
    daysWithPaddingAndLinebreaks,
    lastDayOfMonth,
  );

  return [...initialSpaces, ...daysWithNewline].join("");
};

const getInitialSpaces = (firstDayOfMonth) => {
  const firstDayWeekday = firstDayOfMonth.getDay();
  return Array(firstDayWeekday).fill(" ".repeat(3));
};

const addSpacingAndLinebreaks = (lastDayOfMonth) => {
  const days = Array.from(
    { length: lastDayOfMonth.getDate() },
    (_, i) => i + 1,
  );

  return days.map((day, index) => {
    const formattedDay = day.toString().padStart(2, " ");

    const currentWeekday = new Date(
      lastDayOfMonth.getFullYear(),
      lastDayOfMonth.getMonth(),
      index + 1,
    ).getDay();

    return isSaturday(currentWeekday)
      ? `${formattedDay}\n`
      : `${formattedDay} `;
  });
};

const ensureTrailingNewline = (formattedDays, lastDayOfMonth) => {
  const lastDayWeekday = lastDayOfMonth.getDay();
  if (!isSaturday(lastDayWeekday)) {
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
  let year, month;
  if (argv.m !== undefined && argv._.length > 0) {
    year = parseInt(argv._[0]);
    month = parseInt(argv.m);
  } else if (argv.m !== undefined) {
    year = today.getFullYear();
    month = parseInt(argv.m);
  } else {
    year = today.getFullYear();
    month = today.getMonth() + 1;
  }

  return { year: year, month: month };
};

const args = parseArgs();
main(args);
