CRYPTO = {
    API_KEY: 'b0a5949f-b36c-479d-8cae-633c92223b01',
    API_URL:
        'https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?limit=200',

    COININFO: 'https://www.coingecko.com/en/coins/',
};

MISSION = {
    API_URL: 'https://www.boredapi.com/api/activity',
};

SOCCER = {
    API_URL: 'https://v3.football.api-sports.io/teams?league=197&season=2023',

    OPTIONS: {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'fe1358836efa86e4a36af1a429a16456',
            'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com',
        },
    },
};

WEATHER = {
    API_URL: 'https://api.open-meteo.com/v1/forecast?',
};

export default {
    CRYPTO,
    MISSION,
    SOCCER,
    WEATHER,
};
