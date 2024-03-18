import { useState, useEffect } from 'react';
import { parse } from 'react-native-rss-parser';
import axios from 'axios';

import feed from '../config/feed';

const useFetchNews = () => {
    const [mergedFeed, setMergedFeed] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const fetchRequests = feed.news.map(async (url) => {
                    const response = await axios.get(url);
                    const parsed = await parse(response.data);
                    return parsed.items;
                });

                const results = await Promise.all(fetchRequests);
                const mergedResults = results.flat(); // Flatten the array of arrays
                const sortedFeed = mergedResults.sort(
                    (a, b) =>
                        new Date(b.published).getTime() -
                        new Date(a.published).getTime()
                );
                setMergedFeed(sortedFeed);
            } catch (err) {
                console.error('Error fetching or parsing RSS feeds:', err);
            }
        };

        fetchData();

        return () => {};
    }, []);

    return mergedFeed;
};

export default useFetchNews;
