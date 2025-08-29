'use client';

import { useState, useEffect } from 'react';
import { fetchPolls, createPoll } from '../lib/database';

export const usePolls = () => {
  const [polls, setPolls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadPolls = async () => {
      try {
        const fetchedPolls = await fetchPolls();
        setPolls(fetchedPolls);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    loadPolls();
  }, []);

  const addPoll = async (pollData) => {
    try {
      const newPoll = await createPoll(pollData);
      setPolls((prevPolls) => [...prevPolls, newPoll]);
    } catch (err) {
      setError(err);
    }
  };

  return { polls, loading, error, addPoll };
};
