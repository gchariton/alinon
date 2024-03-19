import axios from 'axios';

export default async function fetchCrypto(coin) {
    try {
        const response = await axios.get(
            'https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest',
            {
                headers: {
                    'X-CMC_PRO_API_KEY': 'b0a5949f-b36c-479d-8cae-633c92223b01',
                },
            }
        );

        const json = response.data;
        console.log(json);
        const coinData = json.data.find((item) => item.symbol === coin);
        return coinData;
    } catch (error) {
        console.log(error);
        throw error;
    }
}
