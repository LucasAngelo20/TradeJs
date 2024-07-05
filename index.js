"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = __importDefault(require("ws"));
// Defina a estrutura para armazenar o ticker (Best Bid and Offer - BBO)
// Mapa para armazenar os BBOS
const bbos = {};
// Função para conectar ao WebSocket da Binance e receber atualizações de tickers
function connectToWebSocket() {
    const ws = new ws_1.default('wss://stream.binance.com:9443/ws/!ticker@arr');
    ws.on('message', (data) => {
        handleTickerUpdate(JSON.parse(data));
    });
    ws.on('error', (error) => {
        console.error('Erro na conexão WebSocket:', error);
    });
    ws.on('close', () => {
        console.log('Conexão WebSocket fechada');
        // Reconnect or handle closure as needed
    });
}
// Função para lidar com a atualização de ticker recebida via WebSocket
function handleTickerUpdate(tickers) {
    for (const ticker of tickers) {
        const symbol = ticker.s;
        const bidPrice = parseFloat(ticker.b);
        const askPrice = parseFloat(ticker.a);
        const bbo = {
            symbol: symbol,
            bidPrice: bidPrice,
            askPrice: askPrice
        };
        bbos[symbol] = bbo;
        console.log(`Ticker ${symbol}: Bid Price: ${bbo.bidPrice}, Ask Price: ${bbo.askPrice}`);
    }
}
// Inicia a conexão ao WebSocket da Binance
connectToWebSocket();
