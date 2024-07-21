#!/usr/bin/env node

function fizzBuzz(max) {
    let i = 1
    while (max >= i) {
        if (i % 15 === 0) {
            console.log('FizzBuzz');
        } else if (i % 3 === 0) {
            console.log('Fizz');
        } else if (i % 5 === 0) {
            console.log('Buzz');
        } else {
            console.log(i.toString());
        }
        i += 1;
    }
}

let maxValue = 20;
fizzBuzz(maxValue);
