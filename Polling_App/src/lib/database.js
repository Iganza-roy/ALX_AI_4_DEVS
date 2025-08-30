// Mock database functions - replace with actual database implementation later

export const fetchPolls = async () => {
  // Mock data - replace with actual API call or database query
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: 1,
          title: "What's your favorite programming language?",
          options: [
            { id: 1, text: 'JavaScript', votes: 45 },
            { id: 2, text: 'Python', votes: 32 },
            { id: 3, text: 'Java', votes: 28 },
          ],
          createdAt: new Date().toISOString(),
        },
        {
          id: 2,
          title: 'Best web framework?',
          options: [
            { id: 1, text: 'React', votes: 67 },
            { id: 2, text: 'Vue', votes: 23 },
            { id: 3, text: 'Angular', votes: 19 },
          ],
          createdAt: new Date().toISOString(),
        },
      ]);
    }, 1000);
  });
};

export const createPoll = async (pollData) => {
  // Mock creation - replace with actual API call or database insertion
  return new Promise((resolve) => {
    setTimeout(() => {
      const newPoll = {
        id: Date.now(),
        ...pollData,
        options: pollData.options.map((option, index) => ({
          id: index + 1,
          text: option,
          votes: 0,
        })),
        createdAt: new Date().toISOString(),
      };
      resolve(newPoll);
    }, 500);
  });
};

export const votePoll = async (pollId, optionId) => {
  // Mock voting - replace with actual API call or database update
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ success: true, pollId, optionId });
    }, 300);
  });
};
