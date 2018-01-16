# node-crpytopia
Asynchronous Node.js Module for [Cryptopia](https://www.cryptopia.co.nz) Public and Private APIs


[![npm version](https://badge.fury.io/js/cryptopia-api.svg)](https://badge.fury.io/js/cryptopia-api)
[![Build Status](https://travis-ci.org/Coac/cryptopia.js.svg?branch=master)](https://travis-ci.org/Coac/cryptopia.js)
[![Standard - JavaScript Style Guide](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)

## Installation

    npm install cryptopia-api

## Usage

```js
const Cryptopia = require('cryptopia-api');
const options = {
  API_KEY: 'Your Key',
  API_SECRET: 'Your Secret',
  HOST_URL: 'https://www.cryptopia.co.nz/api' //Optional, this is the default value
};
Cryptopia.setOptions(options);

//Get Account Balances
Cryptopia.getBalance({}, function(err, data) {
  if(err) throw new Error(err);
  console.log(data); //Array of data from API
});

//Get All Currencies
(async function () {
    try {
        await Cryptopia.getCurrencies(function (err, data) {
            if (err) throw new Error(err);
            console.log(data); //Array of available Currencies from API
        });
    } catch (err){
        console.error(err);
    }
})();
```

See  `examples.js` for the implemented methods of both Private and Public API calls. If you are having trouble, please review the appropriate API Reference below.

## Cryptopia API Reference
- [Public Api](https://www.cryptopia.co.nz/Forum/Thread/255)
- [Private Api](https://www.cryptopia.co.nz/Forum/Thread/256)
