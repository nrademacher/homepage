---
title: Closure
date: "2020-11-29"
description: "Brief summary of closure in JavaScript"
---

In JavaScript, closure refers to a function "remembering" the variables outside of it.

This behavior is **exclusive** to functions:

```javascript
function whatDay(weekDay) {
  return function saveDay() {
    console.log(weekDay);
  }
}

let today = whatDay("Saturday")

today() // Saturday
```

What's happened here?

1. `whatDay` is a function that returns a function `saveDay`
2. We assign `today` a function call of `whatDay` with `"Saturday"` as the argument for `whatDay`'s `weekDay` parameter
3. `saveDay` now *closes over* the outer variable `weekDay` (whose value is `"Saturday"`)
4. `today` is now permanently linked to the variable, even after it has "expired" in the outer `whatDay` function after its life cycle completes within the function's block

This allows us to use the "remembered" variables at appropriate places in our code:

```javascript
function today(weekDay) {
  return function is(adjective) {
    console.log(`${weekDay} is ${adjective}`);
  }
}

const saturdayIs = today("Saturday")
const sundayIs = today("Sunday")

saturdayIs("great") // Saturday is great
sundayIs("better") // Sunday is better
```

Another example, this time without parameters:

```javascript
function outer() {
  let counter = 0;
  function incrementCounter() {
    counter++;
    console.log(counter);
  }
  return incrementCounter;
}

const returnedIncrementCounter = outer();
returnedIncrementCounter(); // 1
returnedIncrementCounter(); // 2
```

Calls of `returnedIncrementCounter` seem to increment `counter`, even though the variable was not declared in `incrementCounter`s block. If we didn't know about closure, we might assume that calling it outside of `outer`'s execution context would throw an error, because `counter` would be undefined.

But what happens is that the returned function (`returnedIncrementCounter` in this case) *closes over* its own *private copy* of `counter`—entirely disconnected from the original in `outer`—which it will now reference.

Pretty neat.

