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

// Returns object with an array of solutions. 
// The array can be empty if no solutions with the specified parameters were found.
await myCicero.getSolutions({
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
        // Optional: specify an arrival date.
        arrival: new Date(/* Timestamp specified by you. */),
    },
    // Optional: specify number of passengers. Defaults to one adult. 
    passengers: {
        adults: 2,
        children: 1
    }
    // Optional: specify a particular mean of transport. 
    // Defaults to 'bus', and the only accepted values are 'bus', 'train', and 'underground'.
    meanOfTransport: 'train'
});

await myCicero.getNearesStops({
    location: {
        lat: 42.4477,
        lon: 14.2080,
    },
    // Optional: specify a radius - in meters - where to look for stops.
    radius: 500
});
```

## Contributing

Wish to contribute? You're welcome to join, even if you don't know how to code.

Contributing to open source consists in helping, no matter what we can do. For example, even if you don't know how to code, you may be able to write documentation, create graphical assets, and more. For more information, [read here](https://opensource.guide/how-to-contribute/).

### Project Structure
* [`src`](src): Contains the source code;
* [`tests`](tests): Contains test useful for testing the source code of the project.

### Community Standards
Please remember to follow our [Code of Conduct](https://github.com/Bavuett/.github/blob/main/CODE_OF_CONDUCT.md) when interacting with the community. 
Happy coding, and thank you for your contribution!

## Disclaimer

[MyCicero](https://mycicero.it) is a trademark of MyCicero srl, and this project is user-made and not associated with the company in any way.