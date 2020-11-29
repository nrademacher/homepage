---
title: Closure
date: "2020-11-29"
description: "Closure in JavaScript summarized"
---

In JavaScript, closure refers to a function "remembering" the variables outside of it. This behavior is exclusive to functions.

```javascript
function whatDay(weekDay) {
  return function saveDay() {
    console.log(weekDay);
  }
}

let today = whatDay("Saturday")

today() // Saturday
```

What happened here?
- `whatDay` is a function that returns a function `saveDay`
- We assign `today` a function call of `whatDay` with `"Saturday"` as the argument for `whatDay`'s `weekDay` parameter
- `saveDay` now *closes over* the outer variable `weekDay` (whose value is `"Saturday"`)
- `today` is now permanently linked to the variable, even after it has "perished" in the outer `whatDay` function after its life cycle completes