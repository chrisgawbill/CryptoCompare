window.onload = () => {
    let cryptoDropDown = document.getElementById("ddl_crypto");

    setUp("ETH");

    cryptoDropDown.onchange = () => {
        setUp(cryptoDropDown.value);
    }
}
const setUp = (coinName) => {
    let coinExchangeOne;
    let coinExchangeTwo;

    wipeInformmation();
    callKrakenAPI(coinName, function (dataOne) {
        coinExchangeOne = dataOne;
        callBinanceAPI(coinName, function (dataTwo) {
            coinExchangeTwo = dataTwo;
            loadCoinInformation(coinExchangeOne, coinExchangeTwo);
            stylePreferredPrice(coinExchangeOne, coinExchangeTwo);
        });
    });
}
const callKrakenAPI = (coin, callback) => {
    let apiAddress;
    if (coin === "Ethereum") {
        apiAddress = "getKrakenPricing/ETH";
    } else {
        apiAddress = "getKrakenPricing/BTC";
    }
    $.ajax({
        url: apiAddress, async: true, success: function (res) {
            if (!(res === 'error')) {
                console.log("Success");
                let exchangeOneArray = res.split(",");
                callback(exchangeOneArray);
            } else {
                console.log("Error");
            }
        }
    });
}
const callBinanceAPI = (coin, callback) => {
    let apiAddress;
    if (coin === "Ethereum") {
        apiAddress = "getBinancePricing/ETH";
    } else {
        apiAddress = "getBinancePricing/BTC";
    }
    $.ajax({
        url: apiAddress, async: true, success: function (res) {
            if (!(res === 'error')) {
                console.log("Success");
                let exchangeTwoArray = res.split(",");
                console.log(exchangeTwoArray);
                callback(exchangeTwoArray);
            } else {
                console.log("Error");
                alert("An Error has occured");
            }
        }
    });
}
const loadCoinInformation = (coinInfoOne, coinInfoTwo) => {
    let coinExchangeOneAsk = coinInfoOne[0];
    let coinExchangeOneBid = coinInfoOne[1];

    let coinExchangeTwoAsk = coinInfoTwo[0];
    let coinExchangeTwoBid = coinInfoTwo[1];

    let display = document.getElementById("content_div");

    let holdingDiv = document.createElement("div");
    holdingDiv.className = "holding_div";

    let exchangeInfoOneDiv = document.createElement("div");
    exchangeInfoOneDiv.className = "exchange_info_one";

    let exchangeInfoTwoDiv = document.createElement("div");
    exchangeInfoTwoDiv.className = "exchange_info_two";

    let exchangeOneAskDiv = document.createElement("div");
    exchangeOneAskDiv.id = "exchange_one_ask";

    let exchangeOneBidDiv = document.createElement("div");
    exchangeOneBidDiv.id = "exchange_one_bid";


    let exchangeTwoAskDiv = document.createElement("div");
    exchangeTwoAskDiv.id = "exchange_two_ask";

    let exchangeTwoBidDiv = document.createElement("div");
    exchangeTwoBidDiv.id = "exchange_two_bid";

    let clearDiv = document.createElement("div");
    clearDiv.className = "clear";

    let exchangeOneHeader = document.createElement("h2");
    exchangeOneHeader.className = "exchange_one_header";

    let exchangeTwoHeader = document.createElement("h2");
    exchangeTwoHeader.className = "exchange_two_header";

    let exchangeOneHeaderText = document.createTextNode("Kraken");
    exchangeOneHeader.append(exchangeOneHeaderText);

    let exchangeTwoHeaderText = document.createTextNode("Binance");
    exchangeTwoHeader.append(exchangeTwoHeaderText);

    let exchangeOneAskLabel = document.createElement("p");
    exchangeOneAskLabel.id = "exchange_one_ask_label";

    let exchangeOneAsk = document.createElement("p");
    exchangeOneAsk.id = "exchange_one_ask";

    let exchangeOneBidLabel = document.createElement("p");
    exchangeOneBidLabel.id = "exchange_one_bid_label";
    
    let exchangeOneBid = document.createElement("p");
    exchangeOneBid.id = "exchange_one_bid"

    let exchangeOneAskLabelText = document.createTextNode("Buying Price: ");
    exchangeOneAskLabel.append(exchangeOneAskLabelText);

    let exchangeOneAskText = document.createTextNode("$" + coinExchangeOneAsk);
    exchangeOneAsk.append(exchangeOneAskText);

    let exchangeOneBidLabelText = document.createTextNode("Selling Price: ");
    exchangeOneBidLabel.append(exchangeOneBidLabelText);

    let exchangeOneBidText = document.createTextNode("$" + coinExchangeOneBid);
    exchangeOneBid.append(exchangeOneBidText);


    let exchangeTwoAskLabel = document.createElement("p");
    exchangeTwoAskLabel.id = "exchange_two_ask_label";

    let exchangeTwoAsk = document.createElement("p");
    exchangeTwoAsk.id = "exchange_two_ask";

    let exchangeTwoBidLabel = document.createElement("p");
    exchangeTwoBidLabel.id = "exchange_two_bid_label";
    
    let exchangeTwoBid = document.createElement("p");
    exchangeTwoBid.id = "exchange_two_bid";

    let exchangeTwoAskLabelText = document.createTextNode("Buying Price: ");
    exchangeTwoAskLabel.append(exchangeTwoAskLabelText);

    let exchangeTwoAskText = document.createTextNode("$" + coinExchangeTwoAsk);
    exchangeTwoAsk.append(exchangeTwoAskText);

    let exchangeTwoBidLabelText = document.createTextNode("Selling Price: ");
    exchangeTwoBidLabel.append(exchangeTwoBidLabelText);

    let exchangeTwoBidText = document.createTextNode("$" + coinExchangeTwoBid);
    exchangeTwoBid.append(exchangeTwoBidText);

    exchangeOneAskDiv.append(exchangeOneAskLabel);
    exchangeOneAskDiv.append(exchangeOneAsk);

    exchangeOneBidDiv.append(exchangeOneBidLabel);
    exchangeOneBidDiv.append(exchangeOneBid);


    exchangeTwoAskDiv.append(exchangeTwoAskLabel);
    exchangeTwoAskDiv.append(exchangeTwoAsk);

    exchangeTwoBidDiv.append(exchangeTwoBidLabel);
    exchangeTwoBidDiv.append(exchangeTwoBid);

    exchangeInfoOneDiv.append(exchangeOneHeader);
    exchangeInfoOneDiv.append(exchangeOneAskDiv);
    exchangeInfoOneDiv.append(exchangeOneBidDiv);

    exchangeInfoTwoDiv.append(exchangeTwoHeader);
    exchangeInfoTwoDiv.append(exchangeTwoAskDiv);
    exchangeInfoTwoDiv.append(exchangeTwoBidDiv);

    
    holdingDiv.append(exchangeInfoOneDiv);


    holdingDiv.append(exchangeInfoTwoDiv);

    
    display.append(holdingDiv);
    display.append(clearDiv);


}
const wipeInformmation = () =>{
    let display = document.getElementById("content_div");
    while (display.hasChildNodes()) {
        display.removeChild(display.firstChild);
    }
}
const stylePreferredPrice = (coinExchangeOne, coinExchangeTwo) => {
    let exchangeOneAskLabel = document.getElementById("exchange_one_ask_label");
    let exchangeOneAsk = document.getElementById("exchange_one_ask");

    let exchangeTwoAskLabel = document.getElementById("exchange_two_ask_label");
    let exchangeTwoAsk = document.getElementById("exchange_two_ask");

    let exchangeOneBidLabel = document.getElementById("exchange_one_bid_label");
    let exchangeOneBid = document.getElementById("exchange_one_bid");

    let exchangeTwoBidLabel = document.getElementById("exchange_two_bid_label");
    let exchangeTwoBid = document.getElementById("exchange_two_bid");

    if (coinExchangeOne[0] < coinExchangeTwo[0]) {

        exchangeOneAskLabel.style.color = "green";
        exchangeOneAskLabel.style.fontWeight = "bold";

        exchangeOneAsk.style.color = "green";
        exchangeOneAsk.style.fontWeight = "bold";

        exchangeTwoAskLabel.style.color = "red";
        exchangeTwoAskLabel.style.fontWeight = "bold";

        exchangeTwoAsk.style.color = "red";
        exchangeTwoAsk.style.fontWeight = "bold";
    } else {

        exchangeTwoAskLabel.style.color = "green";
        exchangeTwoAskLabel.style.fontWeight = "bold";

        exchangeTwoAsk.style.color = "green";
        exchangeTwoAsk.style.fontWeight = "bold";

        exchangeOneAskLabel.style.color = "red";
        exchangeOneAskLabel.style.fontWeight = "bold";

        exchangeOneAsk.style.color = "red";
        exchangeOneAsk.style.fontWeight = "bold";
    }
    if (coinExchangeOne[1] > coinExchangeTwo[1]) {

        exchangeOneBidLabel.style.color = "green";
        exchangeOneBidLabel.style.fontWeight = "bold";

        exchangeOneBid.style.color = "green";
        exchangeOneBid.style.fontWeight = "bold";

        exchangeTwoBidLabel.style.color = "red";
        exchangeTwoBidLabel.style.fontWeight = "bold";

        exchangeTwoBid.style.color = "red";
        exchangeTwoBid.style.fontWeight = "bold";
    } else {

        exchangeTwoBidLabel.style.color = "green";
        exchangeTwoBidLabel.style.fontWeight = "bold";

        exchangeTwoBid.style.color = "green";
        exchangeTwoBid.style.fontWeight = "bold";

        
        exchangeOneBidLabel.style.color = "red";
        exchangeOneBidLabel.style.fontWeight = "bold";

        exchangeOneBid.style.color = "red";
        exchangeOneBid.style.fontWeight = "bold";
    }
}