const crypto = require('crypto');
const request = require('request-promise');

const HOST_URL = "https://www.cryptopia.co.nz/api";

let Cryptopia = () => {
    let options = {
        API_KEY: null,
        API_SECRET: null,
        HOST_URL: HOST_URL,
        API_PATH: null
    };

    //HTTPS Private Request
    async function privateRequest(opts) {
        try {
            let response = await request.post(opts);
            response = JSON.parse(response);

            return response.Success ? response : Promise.reject(response.Error);
        } catch (err) {
            return Promise.reject('privateRequest(), Error on privateRequest: ' + err)
        }
    }

    //HTTPS Public Request
    async function publicRequest(opts) {
        opts.headers = {
            'Content-Type': 'application/json; charset=utf-8'
        };
        opts.json = true;

        try {
            const response = await request.get(opts);

            return response.Success ? response : Promise.reject(response.Error);
        } catch (err) {
            return Promise.reject('publicRequest(), Error on publicRequest: ' + err)
        }
    }

    //Authorization Builder
    function buildAuth(params, opts) {
        let nonce = crypto.randomBytes(64).toString('hex');
        let md5 = crypto.createHash('md5').update(JSON.stringify(params)).digest();
        let requestContentBase64String = md5.toString('base64');
        let signature = opts.API_KEY + "POST" + encodeURIComponent(opts.HOST_URL + "/" + opts.API_PATH).toLowerCase() + nonce + requestContentBase64String;
        let hmacsignature = crypto.createHmac('sha256', new Buffer(opts.API_SECRET, "base64")).update(signature).digest().toString('base64');
        return "amx " + opts.API_KEY + ":" + hmacsignature + ":" + nonce;
    }

    //Client Functions
    return {
        //Private APIs
        getBalance: async (params = {}) => {
            options.API_PATH = "GetBalance";

            let reqOpts = {
                url: options.HOST_URL + "/" + options.API_PATH,
                headers: {
                    'Authorization': buildAuth(params, options),
                    'Content-Type': 'application/json; charset=utf-8'
                },
                body: JSON.stringify(params)
            };
            return privateRequest(reqOpts);
        },
        getDepositAddress: async (params = {}) => {
            if (!params.Currency && !params.CurrencyId) {
                return Promise.reject("getDepositAddress(), You must supply a valid Currency, e.g. 'BTC' OR you must supply a valid Currency ID, e.g. '2'!");
            } else if (params.CurrencyId && typeof params.CurrencyId !== 'number') {
                return Promise.reject("getDepositAddress(), You must supply a valid Currency ID, e.g. '2'!");
            } else if (params.Currency && typeof params.Currency !== 'string') {
                return Promise.reject("getDepositAddress(), You must supply a valid Currency, e.g. 'BTC'!");
            }

            options.API_PATH = "GetDepositAddress";

            let reqOpts = {
                url: options.HOST_URL + "/" + options.API_PATH,
                headers: {
                    'Authorization': buildAuth(params, options),
                    'Content-Type': 'application/json; charset=utf-8'
                },
                body: JSON.stringify(params)
            };

            return privateRequest(reqOpts);
        },
        getOpenOrders: async (params = {}) => {
            if (!params.Market && !params.TradePairId) {
                return Promise.reject("getOpenOrders(), You must supply a valid Market, e.g. 'BTC/USDT' OR you must supply a valid Trade Pair ID, e.g. '100'!");
            } else if (params.TradePairId && typeof params.TradePairId !== 'number') {
                return Promise.reject("getOpenOrders(), You must supply a valid Trade Pair ID, e.g. '100'!");
            } else if (params.Market && typeof params.Market !== 'string') {
                return Promise.reject("getOpenOrders(), You must supply a valid Market, e.g. 'DOT/BTC'!");
            } else if (params.Count && typeof params.Count !== 'number') {
                return Promise.reject("getOpenOrders(), You must supply a valid Count, e.g. between '1' and '100' !");
            }

            options.API_PATH = "GetOpenOrders";

            let reqOpts = {
                url: options.HOST_URL + "/" + options.API_PATH,
                headers: {
                    'Authorization': buildAuth(params, options),
                    'Content-Type': 'application/json; charset=utf-8'
                },
                body: JSON.stringify(params)
            };

            return privateRequest(reqOpts);
        },
        getTradeHistory: async (params = {}) => {
            if (params.TradePairId && typeof params.TradePairId !== 'number') {
                return Promise.reject("getTradeHistory(), You must supply a valid Trade Pair ID, e.g. '100'!");
            } else if (params.Market && typeof params.Market !== 'string') {
                return Promise.reject("getTradeHistory(), You must supply a valid Market, e.g. 'DOT/BTC'!");
            } else if (params.Count && typeof params.Count !== 'number') {
                return Promise.reject("getTradeHistory(), You must supply a valid Count, e.g. between '1' and '100' !");
            }

            options.API_PATH = "GetTradeHistory";

            let reqOpts = {
                url: options.HOST_URL + "/" + options.API_PATH,
                headers: {
                    'Authorization': buildAuth(params, options),
                    'Content-Type': 'application/json; charset=utf-8'
                },
                body: JSON.stringify(params)
            };

            return privateRequest(reqOpts);
        },
        getTransactions: async (params = {}) => {
            if (!params.Type) {
                return Promise.reject("getTransactions(), You must supply a valid Type, e.g. 'Deposit' or 'Withdraw'!");
            } else if (params.Type && params.Type !== 'Deposit' && params.Type !== 'Withdraw') {
                return Promise.reject("getTransactions(), You must supply a valid Type, e.g. 'Deposit' or 'Withdraw'!");
            } else if (params.Count && typeof params.Count !== 'number') {
                return Promise.reject("getTransactions(), You must supply a valid Count, e.g. between '1' and '100'!");
            }

            options.API_PATH = "GetTransactions";

            let reqOpts = {
                url: options.HOST_URL + "/" + options.API_PATH,
                headers: {
                    'Authorization': buildAuth(params, options),
                    'Content-Type': 'application/json; charset=utf-8'
                },
                body: JSON.stringify(params)
            };

            return privateRequest(reqOpts);
        },
        submitTrade: async (params = {}) => {
            if (!params.Market && !params.TradePairId) {
                return Promise.reject("submitTrade(), You must supply a valid Market, e.g. 'BTC/USDT' OR you must supply a valid Trade Pair ID, e.g. '100'!");
            } else if (params.TradePairId && typeof params.TradePairId !== 'number') {
                return Promise.reject("submitTrade(), You must supply a valid Trade Pair ID, e.g. '100'!");
            } else if (params.Market && typeof params.Market !== 'string') {
                return Promise.reject("submitTrade(), You must supply a valid Market, e.g. 'DOT/BTC'!");
            } else if (!params.Type) {
                return Promise.reject("submitTrade(), You must supply a valid Type, e.g. 'Buy' or 'Sell'!");
            } else if (params.Type && params.Type !== 'Buy' && params.Type !== 'Sell') {
                return Promise.reject("submitTrade(), You must supply a valid Type, e.g. 'Buy' or 'Sell'!");
            } else if (!params.Rate || !params.Amount) {
                return Promise.reject("submitTrade(), You must supply a valid Rate and Amount, e.g. Rate: '0.00000034' or Amount: '123.00000000'!");
            } else if (typeof params.Rate !== 'number' || typeof params.Amount !== 'number') {
                return Promise.reject("submitTrade(), You must supply a valid Rate and Amount, e.g. Rate: '0.00000034' or Amount: '123.00000000'!");
            }

            options.API_PATH = "SubmitTrade";

            let reqOpts = {
                url: options.HOST_URL + "/" + options.API_PATH,
                headers: {
                    'Authorization': buildAuth(params, options),
                    'Content-Type': 'application/json; charset=utf-8'
                },
                body: JSON.stringify(params)
            };

            return privateRequest(reqOpts);
        },
        cancelTrade: async (params = {}) => {
            if (!params.Type) {
                return Promise.reject("cancelTrade(), You must supply a valid Type, e.g. 'All', 'Trade', or 'TradePair'!");
            } else if (params.Type && params.Type !== 'All' && params.Type !== 'Trade' && params.Type !== 'TradePair') {
                return Promise.reject("cancelTrade(), You must supply a valid Type, e.g. 'All', 'Trade', or 'TradePair'!");
            } else if (params.Type === 'Trade' && typeof params.OrderId !== 'number') {
                return Promise.reject("cancelTrade(), You must supply a valid OrderId, e.g. '19523'!");
            } else if (params.Type === 'TradePair' && typeof params.TradePairId !== 'number') {
                return Promise.reject("cancelTrade(), You must supply a valid TradePairId, e.g. '100'!");
            }

            options.API_PATH = "CancelTrade";

            let reqOpts = {
                url: options.HOST_URL + "/" + options.API_PATH,
                headers: {
                    'Authorization': buildAuth(params, options),
                    'Content-Type': 'application/json; charset=utf-8'
                },
                body: JSON.stringify(params)
            };

            return privateRequest(reqOpts);
        },
        submitTip: async (params = {}) => {
            if (!params.Currency && !params.CurrencyId) {
                return Promise.reject("submitTip(), You must supply a valid Currency, e.g. 'BTC' OR you must supply a valid Currency ID, e.g. '2'!");
            } else if (params.CurrencyId && typeof params.CurrencyId !== 'number') {
                return Promise.reject("submitTip(), You must supply a valid Currency ID, e.g. '2'!");
            } else if (params.Currency && typeof params.Currency !== 'string') {
                return Promise.reject("submitTip(), You must supply a valid Currency, e.g. 'BTC'!");
            } else if (!params.ActiveUsers) {
                return Promise.reject("submitTip(), You must supply a valid Active User count, e.g. between '2' and '100'!");
            } else if (params.ActiveUsers && (typeof params.ActiveUsers !== 'number' || params.ActiveUsers < 2 || params.ActiveUsers > 100)) {
                return Promise.reject("submitTip(), You must supply a valid Active User count, e.g. between '2' and '100'!");
            } else if (!params.Amount) {
                return Promise.reject("submitTip(), You must supply a valid Amount, e.g. Amount: '123.00000000'!");
            } else if (typeof params.Amount !== 'number') {
                return Promise.reject("submitTip(), You must supply a valid Rate and Amount, e.g. Amount: '123.00000000'!");
            }

            options.API_PATH = "SubmitTip";

            let reqOpts = {
                url: options.HOST_URL + "/" + options.API_PATH,
                headers: {
                    'Authorization': buildAuth(params, options),
                    'Content-Type': 'application/json; charset=utf-8'
                },
                body: JSON.stringify(params)
            };

            return privateRequest(reqOpts);
        },
        submitWithdraw: async (params = {}) => {
            if (!params.Currency && !params.CurrencyId) {
                return Promise.reject("submitWithdraw(), You must supply a valid Currency, e.g. 'BTC' OR you must supply a valid Currency ID, e.g. '2'!");
            } else if (params.CurrencyId && typeof params.CurrencyId !== 'number') {
                return Promise.reject("submitWithdraw(), You must supply a valid Currency ID, e.g. '2'!");
            } else if (params.Currency && typeof params.Currency !== 'string') {
                return Promise.reject("submitWithdraw(), You must supply a valid Currency, e.g. 'BTC'!");
            } else if (!params.Address) {
                return Promise.reject("submitWithdraw(), You must supply a valid Address that exists within your AddressBook!");
            } else if (!params.PaymentId) {
                return Promise.reject("submitWithdraw(), You must supply a valid Payment ID! *The unique paymentid to identify the payment. (PaymentId for CryptoNote coins.)!");
            } else if (!params.Amount || typeof params.Amount !== 'number') {
                return Promise.reject("submitWithdraw(), You must supply a valid Amount, e.g. Amount: '123.00000000'!");
            }

            options.API_PATH = "SubmitWithdraw";

            let reqOpts = {
                url: options.HOST_URL + "/" + options.API_PATH,
                headers: {
                    'Authorization': buildAuth(params, options),
                    'Content-Type': 'application/json; charset=utf-8'
                },
                body: JSON.stringify(params)
            };

            return privateRequest(reqOpts);
        },
        submitTransfer: async (params = {}) => {
            if (!params.Currency && !params.CurrencyId) {
                return Promise.reject("submitTransfer(), You must supply a valid Currency, e.g. 'BTC' OR you must supply a valid Currency ID, e.g. '2'!");
            } else if (params.CurrencyId && typeof params.CurrencyId !== 'number') {
                return Promise.reject("submitTransfer(), You must supply a valid Currency ID, e.g. '2'!");
            } else if (params.Currency && typeof params.Currency !== 'string') {
                return Promise.reject("submitTransfer(), You must supply a valid Currency, e.g. 'BTC'!");
            } else if (!params.UserName) {
                return Promise.reject("submitTransfer(), You must supply a valid Cryptopia UserName, e.g. 'bigdaddy438'!");
            } else if (!params.Amount || typeof params.Amount !== 'number') {
                return Promise.reject("submitTransfer(), You must supply a valid Amount, e.g. Amount: '123.00000000'!");
            }

            options.API_PATH = "SubmitTransfer";

            let reqOpts = {
                url: options.HOST_URL + "/" + options.API_PATH,
                headers: {
                    'Authorization': buildAuth(params, options),
                    'Content-Type': 'application/json; charset=utf-8'
                },
                body: JSON.stringify(params)
            };

            return privateRequest(reqOpts);
        },
        //Public APIs
        getCurrencies: async () => {
            options.API_PATH = "GetCurrencies";

            let reqOpts = {
                url: options.HOST_URL + "/" + options.API_PATH,
                headers: {
                    'Content-Type': 'application/json; charset=utf-8'
                }
            };

            return publicRequest(reqOpts);
        },
        getTradePairs: async () => {
            options.API_PATH = "GetTradePairs";

            let reqOpts = {
                url: options.HOST_URL + "/" + options.API_PATH,
                headers: {
                    'Content-Type': 'application/json; charset=utf-8'
                }
            };

            return publicRequest(reqOpts);
        },
        getMarkets: async (params = {}) => {
            let urlParams = "";
            if (params.BaseMarket && params.Hours) {
                urlParams = "/" + params.BaseMarket + "/" + params.Hours;
            } else if (params.Hours) {
                urlParams = "/" + params.Hours;
            } else if (params.BaseMarket) {
                urlParams = "/" + params.BaseMarket;
            }
            options.API_PATH = "GetMarkets";

            let reqOpts = {
                url: options.HOST_URL + "/" + options.API_PATH + urlParams
            };

            return publicRequest(reqOpts);
        },
        getMarket: async (params = {}) => {
            let urlParams = "";
            if (params.Market && params.Hours) {
                urlParams = "/" + params.Market + "/" + params.Hours;
            } else {
                urlParams = "/" + params.Market;
            }
            options.API_PATH = "GetMarket";

            let reqOpts = {
                url: options.HOST_URL + "/" + options.API_PATH + urlParams
            };

            return publicRequest(reqOpts);
        },
        getMarketHistory: async (params = {}) => {
            if (!params.Market) {
                return Promise.reject("You must supply a valid Market or Trade Pair Id");
            }

            let urlParams = "";

            if (params.Market && params.Hours) {
                urlParams = "/" + params.Market + "/" + params.Hours;
            } else {
                urlParams = "/" + params.Market;
            }

            options.API_PATH = "GetMarketHistory";

            let reqOpts = {
                url: options.HOST_URL + "/" + options.API_PATH + urlParams
            };

            return publicRequest(reqOpts);
        },
        getMarketOrders: async (params = {}) => {
            if (!params.Market) {
                return Promise.reject("getMarketOrders(), You must supply a valid Market or Trade Pair Id, e.g. 'BTC_LTC' or '100'!");
            }

            let urlParams = "";

            if (params.Market && params.Count) {
                urlParams = "/" + params.Market + "/" + params.Count;
            } else {
                urlParams = "/" + params.Market;
            }

            options.API_PATH = "GetMarketOrders";

            let reqOpts = {
                url: options.HOST_URL + "/" + options.API_PATH + urlParams
            };

            return publicRequest(reqOpts);
        },
        getMarketOrderGroups: async (params = {}) => {
            if (!params.Market || Array.isArray(params.Market) === false) {
                return Promise.reject("getMarketOrderGroups(), You must supply a valid Market or Trade Pair Id as an array, e.g. ['BTC_LTC', 'DOGE_USDT']!");
            }

            let urlParams = "";

            for (let i = 0; i < params.Market.length; i++) {
                urlParams += params.Market[i];
                if (i !== params.Market.length - 1) {
                    urlParams += "-";
                }
            }

            if (params.Count) {
                urlParams = "/" + params.Count;
            }

            options.API_PATH = "GetMarketOrderGroups";

            let reqOpts = {
                url: options.HOST_URL + "/" + options.API_PATH + urlParams
            };

            return publicRequest(reqOpts);
        },
        //Set Options for API
        setOptions: (opts) => {
            if (opts.API_KEY && opts.API_SECRET) {
                options.API_KEY = opts.API_KEY;
                options.API_SECRET = opts.API_SECRET;
            } else {
                return Promise.reject("setOptions(), You must supply a valid Options object including API_KEY and API_SECRET!");
            }
            if (opts.HOST_URL) {
                options.HOST_URL = opts.HOST_URL;
            }
        }
    }
};

module.exports = exports = Cryptopia;
