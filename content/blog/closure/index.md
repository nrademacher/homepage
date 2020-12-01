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

Closure has many practical applications in JavaScript, such as limiting the way or number of times a function can be called:

```javascript
function authenticate() {
  this.username = 'johndoe';
  this.password = 'hashedAndSalted';
  let loginAttempts = 0;
  function login(username, password) {
    if (loginAttempts >= 3) {
      console.log('Sorry, too many attempts. Please contact support.');
      return;
    }
    if (username !== this.username || password !== this.password) {
      console.log('Sorry, incorrect username or password. Please try again.');
      loginAttempts += 1;
    } else {
      console.log(`Login successful! Welcome, ${this.username}.`);
    }
  }
  return login;
}

const userTriesToLogIn = authenticate();
userTriesToLogIn('janedoe', 'secret'); // Sorry, incorrect username or password. Please try again.
userTriesToLogIn('jamesdoe', 'verysecret'); // Sorry, incorrect username or password. Please try again.
userTriesToLogIn('johndoe', '1234567'); // Sorry, incorrect username or password. Please try again.
userTriesToLogIn('johndoe', 'hashed'); // Sorry, too many attempts. Please contact support.

const anotherUserTriesToLogIn = authenticate();
anotherUserTriesToLogIn('johndoe', 'hashed'); // Sorry, incorrect username or password. Please try again.
anotherUserTriesToLogIn('johndoe', 'hashedAndSalted'); // Login successful! Welcome, johndoe.
```

As we can see, each instance of `login` starts fresh with its own persisted private copies of the relevant variables.

In summary, closure is a useful thing to know as a JavaScript developer. For instance, I can use it to play Blackjack against myself in Corona times:

```javascript
function blackjack(deck) {
  let deckIndex = 0;
  let numSum = 0;
  return function dealer(dealt1, dealt2) {
    let playerIsOut = false;
    let timesPlayerDealt = 0;
    return function player() {
      if (timesPlayerDealt < 1) {
        timesPlayerDealt += 1;
        numSum = dealt1 + dealt2;
        return numSum;
      } else if (timesPlayerDealt < 2) {
        timesPlayerDealt += 1;
        numSum = deck[deckIndex] + dealt1 + dealt2;
        if (numSum <= 21) {
          return numSum;
        } else {
          playerIsOut = true;
          deckIndex += 1;
          return 'Bust!';
        }
      } else if (playerIsOut) {
        return "You're out!";
      } else {
        deckIndex += 1;
        numSum = numSum + deck[deckIndex];
        if (numSum <= 21) {
          return numSum;
        } else {
          playerIsOut = true;
          deckIndex += 1;
          return 'Bust!';
        }
      }
    };
  };
}

const deal = blackjack(
  Array(22)
    .fill(1)
    .map(() => Math.ceil(Math.random() * 11))
);

const playerOne = deal(
  Math.ceil(Math.random() * 11),
  Math.ceil(Math.random() * 11)
);
const playerTwo = deal(
  Math.ceil(Math.random() * 11),
  Math.ceil(Math.random() * 11)
);
const playerThree = deal(
  Math.ceil(Math.random() * 11),
  Math.ceil(Math.random() * 11)
);

playerOne(); // ...
```

Pretty neat.

