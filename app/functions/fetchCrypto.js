import axios from 'axios';
import constants from '../config/constants';

const fetchCrypto = async (cryptosymbol, setCoinData) => {
    try {
        const response = await axios.get(constants.CRYPTO.API_URL, {
            headers: {
                'X-CMC_PRO_API_KEY': constants.CRYPTO.API_KEY,
            },
        });

        const { data } = response.data;
        const selectedCoin = data.find((item) => item.symbol === cryptosymbol);

        setCoinData(selectedCoin);
    } catch (error) {
        console.log(error);
        // Handle error
    }
};

export default fetchCrypto;
