*{
margin:0;
padding:0;
box-sizing:border-box;
}

body{

background:
linear-gradient(
rgba(0,0,0,0.75),
rgba(0,0,0,0.82)
),
url("1000031163.jpg");

background-size:cover;
background-position:center;
background-attachment:fixed;

color:white;
font-family:'Inter',sans-serif;
padding:30px;
overflow-x:hidden;

}

.overlay{

position:fixed;
inset:0;

background:
radial-gradient(
circle at top left,
rgba(0,255,150,0.15),
transparent 40%
),

radial-gradient(
circle at bottom right,
rgba(255,0,80,0.15),
transparent 40%
);

z-index:-1;

}

header{

display:flex;
justify-content:space-between;
align-items:center;
margin-bottom:30px;

}

.logo-box{

display:flex;
align-items:center;
gap:15px;

}

.logo{

width:60px;
height:60px;

border-radius:18px;

background:
linear-gradient(
135deg,
#00ff95,
#00bfff
);

display:flex;
justify-content:center;
align-items:center;

font-weight:800;
color:black;

}

.market-open{

background:
rgba(255,255,255,0.05);

border:
1px solid rgba(255,255,255,0.08);

padding:14px 20px;

border-radius:16px;

display:flex;
align-items:center;
gap:10px;

backdrop-filter:blur(10px);

}

.dot{

width:10px;
height:10px;

border-radius:50%;

background:#00ff95;

}

.top-bar{

display:flex;
gap:14px;

overflow-x:auto;

padding-bottom:10px;

margin-bottom:25px;

}

.top-bar::-webkit-scrollbar{
display:none;
}

.pair-card{

min-width:120px;

background:
rgba(255,255,255,0.05);

border:
1px solid rgba(255,255,255,0.08);

padding:14px 18px;

border-radius:16px;

cursor:pointer;

text-align:center;

transition:0.3s;

backdrop-filter:blur(10px);

}

.pair-card:hover{

transform:translateY(-4px);

}

.active{

background:
linear-gradient(
135deg,
#00ff95,
#00bfff
);

color:black;
font-weight:700;

}

.timeframe-box{

display:flex;
gap:12px;

margin-bottom:25px;

}

.tf-btn{

padding:12px 22px;

background:
rgba(255,255,255,0.05);

border:
1px solid rgba(255,255,255,0.08);

border-radius:14px;

cursor:pointer;

transition:0.3s;

backdrop-filter:blur(10px);

}

.tf-btn:hover{

transform:translateY(-4px);

}

.active-tf{

background:
linear-gradient(
135deg,
#00ff95,
#00bfff
);

color:black;
font-weight:700;

}

.stats-grid{

display:grid;

grid-template-columns:
repeat(auto-fit,minmax(220px,1fr));

gap:20px;

margin-bottom:25px;

}

.stat-box{

background:
rgba(255,255,255,0.04);

border:
1px solid rgba(255,255,255,0.08);

border-radius:24px;

padding:24px;

backdrop-filter:blur(10px);

}

.stat-box h3{

color:#9ca3af;

margin-bottom:10px;

}

.stat-box h2{

font-size:34px;
font-weight:800;

}

.bullish{
color:#00ff95;
}

.analysis-box{

display:flex;
gap:16px;

margin-bottom:20px;

}

.analysis-box input{

flex:1;

background:
rgba(255,255,255,0.05);

border:none;

outline:none;

padding:18px;

border-radius:18px;

color:white;

font-size:16px;

backdrop-filter:blur(10px);

}

.analysis-box button{

background:
linear-gradient(
135deg,
#00ff95,
#00bfff
);

border:none;

padding:18px 28px;

border-radius:18px;

font-weight:700;

cursor:pointer;

transition:0.3s;

}

.analysis-box button:hover{

transform:scale(1.03);

}

.result-box{

display:grid;

grid-template-columns:
repeat(auto-fit,minmax(240px,1fr));

gap:20px;

margin-bottom:25px;

}

.result-card{

background:
rgba(255,255,255,0.04);

border:
1px solid rgba(255,255,255,0.08);

border-radius:22px;

padding:24px;

backdrop-filter:blur(10px);

}

.result-card h3{

color:#9ca3af;
margin-bottom:12px;

}

.result-card h2{

font-size:34px;
font-weight:800;

}

.heatmap-box{

background:
rgba(255,255,255,0.04);

border:
1px solid rgba(255,255,255,0.08);

border-radius:24px;

overflow:hidden;

backdrop-filter:blur(10px);

}

.heatmap-header{

display:grid;

grid-template-columns:
1fr 2fr 2fr;

padding:20px;

background:
rgba(255,255,255,0.05);

font-weight:700;

}

.heatmap-row{

display:grid;

grid-template-columns:
1fr 2fr 2fr;

align-items:center;

padding:18px 20px;

border-top:
1px solid rgba(255,255,255,0.05);

}

.bar{

height:22px;

background:
rgba(255,255,255,0.05);

border-radius:999px;

overflow:hidden;

}

.fill-call{

height:100%;

background:
linear-gradient(
90deg,
#00ff95,
#00c3ff
);

}

.fill-put{

height:100%;

background:
linear-gradient(
90deg,
#ff3366,
#ff0033
);

}

@media(max-width:768px){

body{
padding:20px;
}

header{

flex-direction:column;
align-items:flex-start;
gap:20px;

}

.analysis-box{

flex-direction:column;

}

.heatmap-header,
.heatmap-row{

grid-template-columns:1fr;
gap:14px;

}

}
