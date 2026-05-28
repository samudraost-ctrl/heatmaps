const marketData = {

EURUSD:{price:1.0874},
GBPUSD:{price:1.2740},
USDJPY:{price:156.40},
AUDUSD:{price:0.6612},
NZDUSD:{price:0.6124},
USDCAD:{price:1.3710},
USDCHF:{price:0.9030},
EURJPY:{price:170.10},
GBPJPY:{price:199.42},
AUDJPY:{price:103.20},
XAUUSD:{price:4376},
XAGUSD:{price:32.44},
BTCUSD:{price:68420},
ETHUSD:{price:3820},
SOLUSD:{price:172},
XRPUSD:{price:0.52},
NAS100:{price:19422},
US30:{price:39210},
SPX500:{price:5322}

};

const heatmapRows =
document.getElementById(
"heatmapRows"
);

const pairCards =
document.querySelectorAll(
".pair-card"
);

const tfButtons =
document.querySelectorAll(
".tf-btn"
);

let activePair =
"EURUSD";

const clickSound =
new Audio(
"https://assets.mixkit.co/active_storage/sfx/2568/2568-preview.mp3"
);

function playClick(){

clickSound.currentTime = 0;

clickSound.volume = 0.4;

clickSound.play();

}

window.addEventListener(
"click",
() => {

const music =
document.getElementById(
"bgMusic"
);

music.volume = 0.35;

music.play();

},
{ once:true }
);

function generateHeatmap(price){

const rows = [];

let step;

if(price > 50000){

step = price * 0.003;

}else if(price > 1000){

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
? strike.toFixed(0)
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

function renderMarket(){

const price =
marketData[
activePair
].price;

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

function updateRealtime(){

const current =
marketData[
activePair
];

let move;

if(activePair.includes(
"BTC"
)){

move =
(Math.random()-0.5)
* 300;

}else if(activePair.includes(
"XAU"
)){

move =
(Math.random()-0.5)
* 10;

}else if(
activePair.includes(
"NAS"
)
||
activePair.includes(
"US30"
)
||
activePair.includes(
"SPX"
)
){

move =
(Math.random()-0.5)
* 50;

}else{

move =
(Math.random()-0.5)
* 0.01;

}

current.price += move;

renderMarket();

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

tfButtons.forEach(btn => {

btn.addEventListener(
"click",
() => {

tfButtons.forEach(b => {

b.classList.remove(
"active-tf"
);

});

btn.classList.add(
"active-tf"
);

playClick();

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

renderMarket();

setInterval(() => {

updateRealtime();

},2500);
