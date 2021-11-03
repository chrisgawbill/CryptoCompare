const express = require('express');
const request = require('request');
const app = express();

const port = process.env.PORT || 8000;

app.use(express.static(__dirname));
app.get('/', function(req, res){
    res.sendFile(__dirname + '/src/home.html');
});
app.get('/Home.html', function(req, res){
    res.sendFile(__dirname + '/src/home.html')
});
//Gets the price of the requested coin from the Kraken exchange API
app.get('/getKrakenPricing/:coin', function(req, res){
    let coin = req.params.coin;

    request("https://api.kraken.com/0/public/Ticker?pair=" + coin +  "USD", function(err, response, body){
        if(!err && response.statusCode == 200){
            let info = JSON.parse(body);
            //Kraken has some unique lettering for different coins in the JSON body object. 
            //Ethereum is XETHZUSD and Bitcoin is XXBTZUSD
            if(coin === "ETH"){
                res.send((Math.round(info.result.XETHZUSD.a[0]*10)/10).toFixed(2) + "," + (Math.round(info.result.XETHZUSD.b[0]*10)/10).toFixed(2));
            }else{
                res.send((Math.round(info.result.XXBTZUSD.a[0]*10)/10).toFixed(2) + "," + (Math.round(info.result.XXBTZUSD.b[0]*10)/10).toFixed(2));
            }
        }else{
            res.send("Error");
        }
    });
});
// Gets the price of the requested coin from the Binance exchange API
app.get('/getBinancePricing/:coin', function(req, res){
    let coin = req.params.coin;

    request("https://api.binance.com/api/v3/ticker/bookTicker?symbol=" + coin + "USDT", function(err, response, body){
        if(!err && response.statusCode == 200){
            let info = JSON.parse(body);
            let secondExchangeAskPrice = info.askPrice;
            let secondExchangeBidPrice = info.bidPrice;
            //The requested coins were recieved with the value to USDT not USD. So now we convert the value of the coin to USD.
            convertToUSD(secondExchangeAskPrice, secondExchangeBidPrice, function(data){
                res.send((Math.round(data[0]*10)/10).toFixed(2) + "," + (Math.round(data[1]*10)/10).toFixed(2));
            });
        }
    });
});
//Gets the current buying and selling price of the USDT from the Kraken exchange
const getUSDTPrices = (callback) =>{
    request("https://api.kraken.com/0/public/Ticker?pair=USDTUSD", function(err, response, body){
        if(!err && response.statusCode == 200){
            let info = JSON.parse(body);
                let usdtprices = info.result.USDTZUSD.a[0] + "," + info.result.USDTZUSD.b[0];
                callback(usdtprices)
        }else{
            res.send("Error");
        }
    });
}
//Converts the value of the coin from USDT to USD
const convertToUSD = (askPrice, bidPrice, callback) => {
    getUSDTPrices(function(data){
        let usdtArray = data.split(",");
        let convertedAsk = askPrice/usdtArray[0];
        let convertedBid = bidPrice/usdtArray[1];
        let convertedPricesArray = [];
        convertedPricesArray.push(convertedAsk);
        convertedPricesArray.push(convertedBid);
        callback(convertedPricesArray);
    });


}
app.listen(port);