const Cryptopia = require('../index')();

(async function () {
    try {
        //Public
        await
            Cryptopia.getCurrencies(function (err, data) {
                if (err) throw new Error(err);
                console.log("Number of available Currencies:", data.length); //Array of available Currencies from API
            });
    } catch (err) {
        console.error(err);
    }
})();