import WebSocket from 'ws';
import { BBO } from './variables';
// Defina a estrutura para armazenar o ticker (Best Bid and Offer - BBO)

// Mapa para armazenar os BBOS
const bbos: Record<string, BBO> = {};

// Função para conectar ao WebSocket da Binance e receber atualizações de tickers
function connectToWebSocket(): void {
    const ws = new WebSocket('wss://stream.binance.com:9443/ws/!ticker@arr');

    ws.on('message', (data: string) => {
        handleTickerUpdate(JSON.parse(data));
    });

    ws.on('error', (error: any) => {
        console.error('Erro na conexão WebSocket:', error);
    });

    ws.on('close', () => {
        console.log('Conexão WebSocket fechada');
        // Reconnect or handle closure as needed
    });
}

// Função para lidar com a atualização de ticker recebida via WebSocket
function handleTickerUpdate(tickers: any[]): void {
    for (const ticker of tickers) {
        const symbol = ticker.s;
        const bidPrice = parseFloat(ticker.b);
        const askPrice = parseFloat(ticker.a);

        const bbo: BBO = {
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
