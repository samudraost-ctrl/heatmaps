const symbols = {

EURUSD:"EUR/USD",
GBPUSD:"GBP/USD",
USDJPY:"USD/JPY",
AUDUSD:"AUD/USD",
NZDUSD:"NZD/USD",

XAUUSD:"XAU/USD",

BTCUSD:"BTC/USD",
ETHUSD:"ETH/USD"

};

const cryptoSymbols = {

BTCUSD:"BTCUSDT",
ETHUSD:"ETHUSDT"

};

const pairCards =
document.querySelectorAll(
".pair-card"
);

const heatmapRows =
document.getElementById(
"heatmapRows"
);

let activePair =
"EURUSD";

const apiKey =
"2e17930862544ff2a98735e8bac44bdf";

async function getForexPrice(pair){

try{

const response =
await fetch(

`https://api.twelvedata.com/price?symbol=${pair}&apikey=${apiKey}`

);

const data =
await response.json();

return Number(data.price);

}catch{

return null;

}

}

async function getCryptoPrice(symbol){

try{

const response =
await fetch(

`https://api.binance.com/api/v3/ticker/price?symbol=${symbol}`

);

const data =
await response.json();

return Number(data.price);

}catch{

return null;

}

}

async function getLivePrice(){

if(
cryptoSymbols[activePair]
){

return await getCryptoPrice(

cryptoSymbols[activePair]

);

}else{

return await getForexPrice(

symbols[activePair]

);

}

}

function createBigOrderHeatmap(price){

const levels = [];

let step;

if(price > 1000){

step = price * 0.0015;

}else{

step = price * 0.0008;

}

for(let i=-3;i<=3;i++){

const strike =
price + (i * step);

const call =
Math.floor(
Math.random()*40+60
);

const put =
Math.floor(
Math.random()*40+60
);

levels.push({

strike:
price > 1000
? strike.toFixed(2)
: strike.toFixed(4),

call,
put

});

}

return levels;

}

async function renderMarket(){

const livePrice =
await getLivePrice();

if(!livePrice){

document.getElementById(
"livePrice"
).innerText =
"Offline";

return;

}

const levels =
createBigOrderHeatmap(
livePrice
);

heatmapRows.innerHTML = "";

let strongestCall =
levels[0];

let strongestPut =
levels[0];

levels.forEach(level => {

if(
level.call >
strongestCall.call
){

strongestCall =
level;

}

if(
level.put >
strongestPut.put
){

strongestPut =
level;

}

const row =
document.createElement(
"div"
);

row.classList.add(
"heatmap-row"
);

row.innerHTML = `

<div>
${level.strike}
</div>

<div class="bar">

<div
class="fill-call"
style="
width:${level.call}%;
">
</div>

</div>

<div class="bar">

<div
class="fill-put"
style="
width:${level.put}%;
">
</div>

</div>

`;

heatmapRows.appendChild(
row
);

});

document.getElementById(
"livePrice"
).innerText =
livePrice > 1000
? livePrice.toFixed(2)
: livePrice.toFixed(4);

document.getElementById(
"callVolume"
).innerText =
strongestCall.call + "K";

document.getElementById(
"putVolume"
).innerText =
strongestPut.put + "K";

document.getElementById(
"callArea"
).innerText =
strongestCall.strike;

document.getElementById(
"putArea"
).innerText =
strongestPut.strike;

const sentiment =
strongestCall.call >
strongestPut.put
? "Bullish"
: "Bearish";

const sentimentEl =
document.querySelector(
".bullish"
);

sentimentEl.innerText =
sentiment;

if(sentiment === "Bullish"){

sentimentEl.style.color =
"#00ff95";

}else{

sentimentEl.style.color =
"#ff3366";

}

}

pairCards.forEach(card => {

card.addEventListener(
"click",
() => {

pairCards.forEach(c => {

c.classList.remove(
"active"
);

});

card.classList.add(
"active"
);

activePair =
card.innerText;

renderMarket();

});

});

renderMarket();

setInterval(() => {

renderMarket();

},4000);
