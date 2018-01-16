const Cryptopia = require('./index')();
const options = {
    API_KEY: 'YourKey',
    API_SECRET: 'YourSecret'
};
Cryptopia.setOptions(options);

(async function () {
    try {
        //Public
        await Cryptopia.getCurrencies(function (err, data) {
            if (err) throw new Error(err);
            console.log(data); //Array of available Currencies from API
        });
        await Cryptopia.getTradePairs(function (err, data) {
            if (err) throw new Error(err);
            console.log(data); //Array of available Trade Pairs from API
        });
        await Cryptopia.getMarkets({Market: 'ETH', Hours: 12},function (err, data) {
            if (err) throw new Error(err);
            console.log(data); //Array of Markets for 24hrs OR specific Market within 1-24 Hours from API
        });
        await Cryptopia.getMarket({Market: 'ETH_BTC', Hours: 4}, function (err, data) {
            if (err) throw new Error(err);
            console.log(data); //Array of a specific Market's data for 24hrs OR within 1-24 Hours from API
        });
        await Cryptopia.getMarketHistory({Market: 'ETH_BTC', Hours: 72}, function (err, data) {
            if (err) throw new Error(err);
            console.log(data); //Array of a specific Market's data for 24hrs OR within 1-168 (7 days) Hours from API
        });
        await Cryptopia.getMarketOrders({Market: 'LTC_BTC', Count: 69}, function (err, data) {
            if (err) throw new Error(err);
            console.log(data); //Object with 'Buy' and 'Sell' as arrays with specified Count limit from API
        });
        await Cryptopia.getMarketOrderGroups({Market: ['ETH_BTC', 'ETH_USDT'], Count: 100}, function (err, data) {
            if (err) throw new Error(err);
            console.log(data); //Array of objects for each Market listed from API
        });
        //Private
        await Cryptopia.getBalance({}, function (err, data) {
            if (err) throw new Error(err);
            console.log(data); //Array of available Balances from API
        });
        await Cryptopia.getDepositAddress({Currency: 'BTC'}, function (err, data) {
            if (err) throw new Error(err);
            console.log(data); //Object with Deposit Address data from API
        });
        await Cryptopia.getTradeHistory({Market: 'ETH/BTC'}, function (err, data) {
            if (err) throw new Error(err);
            console.log(data); //Array of available Trade History for Market from API
        });
        await Cryptopia.getTransactions({Type: 'Withdraw'}, function (err, data) {
            if (err) throw new Error(err);
            console.log(data); //Array of available Transactions with Type from API
        });
        await Cryptopia.getOpenOrders({Market: 'ETH/BTC', Count: 10}, function (err, data) {
            if (err) throw new Error(err);
            console.log(data); //Array of available Open Orders in Market from API
        });
        await Cryptopia.submitTrade({Market: 'ETH/BTC', Type: 'Buy', Rate: 0.000000034, Amount: 123.000000000}, function (err, data) {
            if (err) throw new Error(err);
            console.log(data); //Object with OrderId and FilledOrders array from API
        });
        await Cryptopia.cancelTrade({Type: 'Trade', OrderId: 12354}, function (err, data) {
            if (err) throw new Error(err);
            console.log(data); //Array of Cancelled OrderIds from API
        });
        await Cryptopia.submitTip({Currency: 'LTC', ActiveUsers: 23, Amount: 123.000000000}, function (err, data) {
            if (err) throw new Error(err);
            console.log(data); //String with results of the Tip request from API
        });
        await Cryptopia.submitWithdraw({Currency: 'DOGE', Address: 'Inset Cryptopia Address!', PaymentId: 'Monies4U-12345-78', Amount: 123.000000000}, function (err, data) {
            if (err) throw new Error(err);
            console.log(data); //Integer as the OrderId from API
        });
        await Cryptopia.submitTransfer({Currency: 'DOGE', Username: 'bigdaddy234', Amount: 123.000000000}, function (err, data) {
            if (err) throw new Error(err);
            console.log(data); //String with results of the Transfer from API
        });
    } catch (err){
        console.error(err);
    }
})();
