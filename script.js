const symbols = {

EURUSD:"EUR/USD",
GBPUSD:"GBP/USD",
USDJPY:"USD/JPY",
AUDUSD:"AUD/USD",
NZDUSD:"NZD/USD",
USDCAD:"USD/CAD",
USDCHF:"USD/CHF",

EURJPY:"EUR/JPY",
GBPJPY:"GBP/JPY",
AUDJPY:"AUD/JPY",

XAUUSD:"XAU/USD",
XAGUSD:"XAG/USD",

BTCUSD:"BTC/USD",
ETHUSD:"ETH/USD",
SOLUSD:"SOL/USD",
XRPUSD:"XRP/USD"

};

const cryptoSymbols = {

BTCUSD:"BTCUSDT",
ETHUSD:"ETHUSDT",
SOLUSD:"SOLUSDT",
XRPUSD:"XRPUSDT"

};

const heatmapRows =
document.getElementById(
"heatmapRows"
);

const pairCards =
document.querySelectorAll(
".pair-card"
);

let activePair =
"EURUSD";

const apiKey =
"2e17930862544ff2a98735e8bac44bdf";

const clickSound =
new Audio(
"https://assets.mixkit.co/active_storage/sfx/2568/2568-preview.mp3"
);

function playClick(){

clickSound.currentTime = 0;

clickSound.volume = 0.4;

clickSound.play();

}

async function getForexPrice(pair){

try{

const response =
await fetch(

`https://api.twelvedata.com/price?symbol=${pair}&apikey=${apiKey}`

);

const data =
await response.json();

return Number(data.price);

}catch(error){

console.log(error);

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

}catch(error){

console.log(error);

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

function generateHeatmap(price){

const rows = [];

let step;

if(price > 1000){

step = price * 0.002;

}else{

step = price * 0.001;

}

for(let i=-4;i<=4;i++){

const strike =
price + (i * step);

rows.push({

strike:
price > 1000
? strike.toFixed(2)
: strike.toFixed(4),

call:
Math.floor(
Math.random()*90+10
),

put:
Math.floor(
Math.random()*90+10
)

});

}

return rows;

}

async function renderMarket(){

const price =
await getLivePrice();

if(!price) return;

const rows =
generateHeatmap(price);

heatmapRows.innerHTML = "";

let totalCall = 0;
let totalPut = 0;

rows.forEach(level => {

totalCall += level.call;
totalPut += level.put;

const row =
document.createElement("div");

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
style="width:${level.call}%">
</div>

</div>

<div class="bar">

<div
class="fill-put"
style="width:${level.put}%">
</div>

</div>

`;

heatmapRows.appendChild(row);

});

document.getElementById(
"callVolume"
).innerText =
totalCall + "K";

document.getElementById(
"putVolume"
).innerText =
totalPut + "K";

if(price > 1000){

document.getElementById(
"livePrice"
).innerText =
price.toFixed(2);

}else{

document.getElementById(
"livePrice"
).innerText =
price.toFixed(4);

}

const sentiment =
totalCall > totalPut
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

playClick();

renderMarket();

});

});

document.getElementById(
"analyzeBtn"
).addEventListener(
"click",
() => {

playClick();

const price =
Number(
document.getElementById(
"manualPrice"
).value
);

if(!price) return;

const callArea =
price + (price * 0.003);

const putArea =
price - (price * 0.003);

document.getElementById(
"callArea"
).innerText =
callArea.toFixed(2);

document.getElementById(
"putArea"
).innerText =
putArea.toFixed(2);

}
);

const menuBtn =
document.getElementById(
"menuBtn"
);

const dropdownMenu =
document.querySelector(
".dropdown-menu"
);

menuBtn.addEventListener(
"click",
() => {

playClick();

if(
dropdownMenu.style.display
=== "flex"
){

dropdownMenu.style.display =
"none";

}else{

dropdownMenu.style.display =
"flex";

}

}
);

window.addEventListener(
"click",
(e) => {

if(
!menuBtn.contains(e.target)
&&
!dropdownMenu.contains(e.target)
){

dropdownMenu.style.display =
"none";

}

});

renderMarket();

setInterval(() => {

renderMarket();

},5000);
