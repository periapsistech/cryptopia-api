const Cryptopia = require('./index')();
const options = {
    API_KEY: 'YourKey',
    API_SECRET: 'YourSecret'
};
Cryptopia.setOptions(options);

(async function () {
    try {
        //Public
        const currencies = await Cryptopia.getCurrencies();
        console.log(currencies); //Array of available Currencies from API

        const tradePairs = await Cryptopia.getTradePairs();
        console.log(tradePairs); //Array of available Trade Pairs from API

        const markets = await Cryptopia.getMarkets({Market: 'ETH', Hours: 12});
        console.log(markets); //Array of Markets for 24hrs OR specific Market within 1-24 Hours from API

        const market = await Cryptopia.getMarket({Market: 'ETH_BTC', Hours: 4});
        console.log(market); //Array of a specific Market's data for 24hrs OR within 1-24 Hours from API

        const marketHistory = await Cryptopia.getMarketHistory({Market: 'ETH_BTC', Hours: 72});
        console.log(marketHistory); //Array of a specific Market's data for 24hrs OR within 1-168 (7 days) Hours from API

        const marketOrders = await Cryptopia.getMarketOrders({Market: 'LTC_BTC', Count: 69});
        console.log(marketOrders); //Object with 'Buy' and 'Sell' as arrays with specified Count limit from API

        const marketOrderGroups = await Cryptopia.getMarketOrderGroups({Market: ['ETH_BTC', 'ETH_USDT'], Count: 100});
        console.log(marketOrderGroups); //Array of objects for each Market listed from API

        // Private
        const balance = await Cryptopia.getBalance({Currency: 'BTC'});
        console.log(balance); //Array of available Balances from API

        const depositAddress = await Cryptopia.getDepositAddress({Currency: 'BTC'});
        console.log(depositAddress); //Object with Deposit Address data from API

        const tradeHistory = await Cryptopia.getTradeHistory({Market: 'ETH/BTC'});
        console.log(tradeHistory); //Array of available Trade History for Market from API

        const transactions = await Cryptopia.getTransactions({Type: 'Withdraw'});
        console.log(transactions); //Array of available Transactions with Type from API

        const openOrders = await Cryptopia.getOpenOrders({Market: 'ETH/BTC', Count: 10});
        console.log(openOrders); //Array of available Open Orders in Market from API

        const submitTrade = await Cryptopia.submitTrade({Market: 'ETH/BTC', Type: 'Buy', Rate: 0.00050000, Amount: 123.000000000});
        console.log(submitTrade); //Object with OrderId and FilledOrders array from API

        const cancelTrade = await Cryptopia.cancelTrade({Type: 'Trade', OrderId: 12354});
        console.log(cancelTrade); //Array of Cancelled OrderIds from API

        const submitTip = await Cryptopia.submitTip({Currency: 'LTC', ActiveUsers: 23, Amount: 123.000000000});
        console.log(submitTip); //String with results of the Tip request from API

        const submitWithdraw = await Cryptopia.submitWithdraw({Currency: 'DOGE', Address: 'Inset Cryptopia Address!', PaymentId: 'Monies4U-12345-78', Amount: 123.000000000});
        console.log(submitWithdraw); //Integer as the OrderId from API

        const submitTransfer = await Cryptopia.submitTransfer({Currency: 'DOGE', UserName: 'bigdaddy234', Amount: 123.000000000});
        console.log(submitTransfer); //String with results of the Transfer from API
    } catch (err) {
        console.error(err);
    }
})();
