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
app.get('/getKrakenPricing/:coin', function(req, res){
    let coin = req.params.coin;

    request("https://api.kraken.com/0/public/Ticker?pair=" + coin +  "USD", function(err, response, body){
        if(!err && response.statusCode == 200){
            let info = JSON.parse(body);
            if(coin === "ETH"){
                res.send(info.result.XETHZUSD.a[0] + "," + info.result.XETHZUSD.b[0]);
            }else{
                res.send(info.result.XXBTZUSD.a[0] + "," + info.result.XXBTZUSD.b[0]);
            }
        }else{
            res.send("Error");
        }
    });
});
app.get('/getBinancePricing/:coin', function(req, res){
    let coin = req.params.coin;

    request("https://api.binance.com/api/v3/ticker/bookTicker?symbol=" + coin + "USDT", function(err, response, body){
        if(!err && response.statusCode == 200){
            let info = JSON.parse(body);
            let secondExchangeAskPrice = info.askPrice;
            let secondExchangeBidPrice = info.bidPrice;
            convertToUSD(secondExchangeAskPrice, secondExchangeBidPrice, function(data){
                res.send(data[0] + "," + data[1]);
            });
        }
    });
});
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