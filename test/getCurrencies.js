const Cryptopia = require('../index')();

(async function () {
    try {
        //Public
        const currencies = await Cryptopia.getCurrencies();
        console.log("Number of Available Currencies:", currencies.Data.length); //Length of Array for available Currencies from API
    } catch (err) {
        console.error(err);
    }
})();