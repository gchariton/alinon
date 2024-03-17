import { useState, useEffect } from 'react';
import axios from 'axios';
import { parse } from 'react-native-rss-parser';

const useFetchNews = (url) => {
    const [rssFeed, setRssFeed] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(url);
                const parsed = await parse(response.data);
                setRssFeed(parsed.items);
            } catch (err) {
                console.error('Error fetching or parsing RSS feed:', err);
            }
        };
        fetchData();

        return () => {
            // Any cleanup code here
        };
    }, [url]);

    return rssFeed;
};

export default useFetchNews;
