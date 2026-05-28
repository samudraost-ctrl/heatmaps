new TradingView.widget({
    "container_id": "tradingview_chart",
    "width": "100%",
    "height": "100%",
    "symbol": "BINANCE:BTCUSDT",
    "interval": "15",
    "timezone": "Asia/Jakarta",
    "theme": "dark",
    "style": "1",
    "locale": "en",
    "toolbar_bg": "#060816",
    "enable_publishing": false,
    "allow_symbol_change": true,
    "save_image": false,
    "hide_side_toolbar": false
});

const pairCards = document.querySelectorAll('.pair-card');

pairCards.forEach(card => {

    card.addEventListener('click', () => {

        document.querySelector('.active')
            .classList.remove('active');

        card.classList.add('active');

    });

});
