# MyCicero.js

MyCicero.js is an npm package that you can use to get Italian Transport Solutions, their pricing, and other data powered by the MyCicero Service and its private API.

## Installation

Open your terminal and run the following npm command to install the package in your project.

```sh
npm install mycicero.js
```

## Usage

After installing the package, you can begin using its features in your project. Below you can find some examples.

```js
const { MyCicero } = require('mycicero.js');
const myCicero = new MyCicero();

// Returns object with solutions.
myCicero.getSolutions({
    locations: {
        departure: {
            lat: 41.90249000000006,
            lon: 12.496060000000057,
        },
        arrival: {
            lat: 42.44785999527568,
            lon: 14.208839989364549,
        }
    },
    dates: {
        departure: new Date(),
    }
});
```
