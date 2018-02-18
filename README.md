# cryptopia-api
Asynchronous Node.js Module for [Cryptopia](https://www.cryptopia.co.nz) Public and Private APIs


[![npm version](https://badge.fury.io/js/cryptopia-api.svg)](https://badge.fury.io/js/cryptopia-api)
[![Build Status](https://travis-ci.org/periapsistech/cryptopia-api.svg?branch=master)](https://travis-ci.org/periapsistech/cryptopia-api)

## Installation

    npm install cryptopia-api

## Usage

```js
const Cryptopia = require('cryptopia-api')();
const options = {
  API_KEY: 'Your Key',
  API_SECRET: 'Your Secret',
  HOST_URL: 'https://www.cryptopia.co.nz/api' //Optional, this is the default value
};
Cryptopia.setOptions(options);

//Get All Currencies
(async function () {
    try {
        const currencies = await Cryptopia.getCurrencies();
        console.log(currencies); //Array of available Currencies from API
    } catch (err){
        console.error(err);
    }
})();
```

See  `examples.js` for the implemented methods of both Private and Public API calls. If you are having trouble, please review the appropriate API Reference below.

## Cryptopia API Reference
- [Public Api](https://www.cryptopia.co.nz/Forum/Thread/255)
- [Private Api](https://www.cryptopia.co.nz/Forum/Thread/256)
