window.onload = () => {
    let cryptoDropDown = document.getElementById("ddl_crypto");

    //Makes sure that the Ehtereum information is loaded in when the page loads
    setUp("ETH");

    //Monitors change in selection from the #ddl_crypto select
    cryptoDropDown.onchange = () => {
        setUp(cryptoDropDown.value);
    }
}
//Calls other methods to help get the information from the APIs from the backend and display that information
const setUp = (coinName) => {
    let coinExchangeOne;
    let coinExchangeTwo;

    //Calls the method that will clear the div #content_div by manipulating the DOM
    wipeInformmation();
    //Calls the method that will call the backend to fetch the price of the requseted coin from the Kraken exchange
    callKrakenAPI(coinName, function (dataOne) {
        coinExchangeOne = dataOne;
        //Calls the method that will call the backend to fetch the price of the requested coin from the Binance exchange
        callBinanceAPI(coinName, function (dataTwo) {
            coinExchangeTwo = dataTwo;
            //Calls the method that will manipulate the DOM to dynamically display the information
            loadCoinInformation(coinExchangeOne, coinExchangeTwo);
            //Calls the method that will manipulate the styling to highlight the best price
            stylePreferredPrice(coinExchangeOne, coinExchangeTwo);
        });
    });
}
//Calls the backend to fetch the price of the requested coin from the Kraken exchange
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
                let exchangeOneArray = res.split(",");
                callback(exchangeOneArray);
            } else {
                alert("An Error has occured");
            }
        }
    });
}
//Calls the backend to fetch the price of the requested coin from the Binance exchange
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
                let exchangeTwoArray = res.split(",");
                callback(exchangeTwoArray);
            } else {
                console.log("Error");
                alert("An Error has occured");
            }
        }
    });
}
//Manipulates the DOM to dynamically display the pricing information
const loadCoinInformation = (coinInfoOne, coinInfoTwo) => {
    let coinExchangeOneAsk = coinInfoOne[0];
    let coinExchangeOneBid = coinInfoOne[1];

    let coinExchangeTwoAsk = coinInfoTwo[0];
    let coinExchangeTwoBid = coinInfoTwo[1];

    let display = document.getElementById("content_div");

    let holdingDiv = document.createElement("div");
    holdingDiv.id = "holding_div";
    holdingDiv.className = "container"

    let exchangeInfoOneDiv = document.createElement("div");
    exchangeInfoOneDiv.id = "exchange_info_one";
    exchangeInfoOneDiv.className = "card col-2 row-1";

    let exchangeInfoTwoDiv = document.createElement("div");
    exchangeInfoTwoDiv.id = "exchange_info_two";
    exchangeInfoTwoDiv.className = "card col-2 row-1";

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
    exchangeOneHeader.id = "exchange_one_header";
    exchangeOneHeader.className = "card-title";

    let exchangeTwoHeader = document.createElement("h2");
    exchangeTwoHeader.id = "exchange_two_header";
    exchangeTwoHeader.className = "card-title";

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
//Clears the div #content_div by manipulating the DOM
const wipeInformmation = () =>{
    let display = document.getElementById("content_div");
    while (display.hasChildNodes()) {
        display.removeChild(display.firstChild);
    }
}
//Highlights the best pricing by color coding the prices red and green
const stylePreferredPrice = (coinExchangeOne, coinExchangeTwo) => {
    let exchangeOneAskLabel = document.getElementById("exchange_one_ask_label");
    let exchangeOneAsk = document.getElementById("exchange_one_ask");

    let exchangeTwoAskLabel = document.getElementById("exchange_two_ask_label");
    let exchangeTwoAsk = document.getElementById("exchange_two_ask");

    let exchangeOneBidLabel = document.getElementById("exchange_one_bid_label");
    let exchangeOneBid = document.getElementById("exchange_one_bid");

    let exchangeTwoBidLabel = document.getElementById("exchange_two_bid_label");
    let exchangeTwoBid = document.getElementById("exchange_two_bid");

    //If coinExchangeOne Buying price is better than coinExchangeTwo then it will color code coinExchangeOne Buying price green and the other red
    if (coinExchangeOne[0] < coinExchangeTwo[0]) {

        exchangeOneAskLabel.style.color = "green";
        exchangeOneAskLabel.style.fontWeight = "bold";

        exchangeOneAsk.style.color = "green";
        exchangeOneAsk.style.fontWeight = "bold";

        exchangeTwoAskLabel.style.color = "red";
        exchangeTwoAskLabel.style.fontWeight = "bold";

        exchangeTwoAsk.style.color = "red";
        exchangeTwoAsk.style.fontWeight = "bold";
    // If coinExchangeTwo Buying price is better than coinExchangeOne then it will color code coinExchangeTwo Buying price green and the other red
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
    //If coinExchangeOne Selling price is better than coinExchangeTwo then it will color code coinExchangeOne Selling price green and the other red
    if (coinExchangeOne[1] > coinExchangeTwo[1]) {

        exchangeOneBidLabel.style.color = "green";
        exchangeOneBidLabel.style.fontWeight = "bold";

        exchangeOneBid.style.color = "green";
        exchangeOneBid.style.fontWeight = "bold";

        exchangeTwoBidLabel.style.color = "red";
        exchangeTwoBidLabel.style.fontWeight = "bold";

        exchangeTwoBid.style.color = "red";
        exchangeTwoBid.style.fontWeight = "bold";
    // If coinExchangeTwo Selling price is better than coinExchangeOne then it will color code coinExchangeTwo Selling price green and the other red
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