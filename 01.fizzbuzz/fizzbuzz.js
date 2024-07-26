#!/usr/bin/env node

function fizzBuzz(maxCount) {
  for (let i = 1; i <= maxCount; i++) {
    if (i % 3 === 0 && i % 5 === 0) {
      console.log("FizzBuzz");
    } else if (i % 3 === 0) {
      console.log("Fizz");
    } else if (i % 5 === 0) {
      console.log("Buzz");
    } else {
      console.log(i.toString());
    }
  }
}

const maxCount = 20;
fizzBuzz(maxCount);
