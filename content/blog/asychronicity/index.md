---
title: Asynchronicity
date: "2021-01-19"
description: "Overview of the asynchronous relationship between JavaScript and the web"
---

The modern world works by delegation.

Delegation is a response to the recognition that a given person might be very good at a given thing, such as playing football, but bad at most other things, such as management.

A football player might try to be their own manager. But they would have to split their time and energy between their training regimen and management, making it impossible or very difficult to perform well at either. He would quickly fall behind other players who are able to concentrate fully on their learned profession by having a partner with the needed talent and capacities for management duties.

So, instead, a talented football player and a capable manager together should form a business unit to effectively and efficiently _interface_ with the rest of the world. If we look at the world today, we can see that virtually all enterprise is made up of such business units of various and variied people, such as companies and governments, who compensate for individual weaknesses and amplify individual strengths by delegation.

The relationship between JavaScript and the browser follows this delegation principle.

JavaScript is a powerful programming language with various useful paradigms, such as manipulating the DOM, that are well-suited for interacting with client data. However, it can obviously only work with data that has already been received from a web server. If the required data has not yet been loaded, it must first be requested and then awaited before it can be used. In the modern web, where data is dynamically delivered through networks of varying speeds, this is more often the case than not.

Here is where JavaScript runs into the same problem as the average professional football player: It is very good at one thing—working with data that's already present by _synchronously_ executing code instructions on it line by line—but very bad at another—handling code involving data that must first be requested and received before performing code actions on it.

Because JavaScript executes code strictly line by line, because it is by design _single-threaded_, it would naturally "hang" on any line of time-deferred, or _asynchronous_, code until the requested data has been received from the server before it can move on to the next line. In other words, JavaScript's single _thread of execution_ is _blocked_ until then.

On a website or web app, this would mean that no subsequent JavaScript-dependent interaction could be made by the user in the meantime, which, depending on their connection, could last several seconds. Obviously, this would not be a good experience for the user:

```javascript
function displaySomeData(data) {
  console.log(data);
}

const dataFromServer = fetchTheData("https://someapi.com/api/things");

// ... user must wait for server response
// ... meanwhile, user can't interact with anything JavaScript-relatd
// ... might mean several seconds of non-responsiveness
// ... user might get frustrated and leave the website
// ... until finally ...

displaySomeData(dataFromServer);

console.log("This line has to wait until displaySomeData is done");
console.log("And so does the rest of the code");
```

Because of its single-threaded nature, JavaScript cannot circumvent this problem natively on its own. Like the football player, it needs a suitable partner to eliminate its weaknesses, such as asynchronous code blocking subsequent code, that it can shine with its strengths, such as the predictability and intuitiveness of its single-threadedness.

This is where the browser comes in. The browser is an intutive choice for a partner, since JavaScript already runs in it. For our purposes (solving the asynchronicity problem), it is a convenient and rich piece of software with many useful features/technologies (JavaScript being one of them).

Intuitively, what we need from the browser to handle asynchronicity would be additional threads to delegate asychronous code to. Consider this simple example:

```javascript
function deferMe() {
  console.log("This needs to be deferred");
}

setTimeout(deferMe, 1000);

console.log("I'm synchronous");
```

On running this bit of code, `"I'm synchronous"` would immediately be printed to the console, followed by a call of `deferMe` after being timed out for one second. You might think now that JavaScript can handle asychronicity by itself after all, but that's not the case.

In fact, the timer that's set with the `setTimeout` function is a feature of the browser's Web API, not JavaScript. `setTimeout` is merely an interface for interacting with that timer functionality. When the timer has expired, the function call will be released (or pushed) to the JavaScript engine's call stack to execute. And so, in the meantime, the thread of execution is free to execute any subsequent synchronous code while the timed-out function is held by the Web API.

Now I said that the deferred functionality will be returned to the call stack once the timer has expired. But there are some further, strict rules that determine when, once the functionality is in JavaScript's callback queue, it allowed into the callstack. Consider this example first:

```javascript
function deferMe() {
  console.log("This needs to be deferred");
}

function someBigFunction() {
  // will sit in callstack for about 2 seconds
}

setTimeout(deferMe, 0);

someBigFunction();

console.log("When will I run?");
```

One might assume that the order of the three function calls above would be the timed-out `deferMe` (because the timer is set to 0), followed by `someHugeFunction`, whose execution takes about two seconds, and then finally the `console.log`. But, in fact, `deferMe` will be executed last. That's because these two conditions determine whether `deferMe`, after it's been delegated to the Web API, will be allowed into the call stack from the callback queue:

1. The call stack must be empty
2. All synchronous global code has been run

After `deferMe` has been deferred using the browser's timer, `someBigFunction()` is next on the call stack. While it's there for about two seconds, `deferMe` may not be pushed to the call stack, because, as the first condition says, it's not empty. After `someBigFunction` has finished, `deferMe` is still being held in the callback queue, because, in line with the second condition, all synchronous global code needs to be run first. Only after the `console.log` was executed are both conditions met and `deferMe` can finally enter the call stack and be executed.
