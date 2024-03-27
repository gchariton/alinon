import axios from 'axios';
import constants from '../config/constants';

const fetchMission = async () => {
    try {
        const response = await axios.get(constants.MISSION.API_URL);

        const { data } = response;
        return data;
    } catch (error) {
        console.error('[fetchMission.js] Error fetching data:', error);
        throw error;
    }
};

export default fetchMission;
