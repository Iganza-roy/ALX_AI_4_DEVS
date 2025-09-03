import { createPoll, getPolls, getPollById, votePoll } from './actions';
import { supabase } from './supabase';
import { redirect } from 'next/navigation';

// Mock next/navigation
jest.mock('next/navigation', () => ({
  redirect: jest.fn(),
}));

// Mock the entire supabase client to handle chaining
const supabaseMock = {
  from: jest.fn(() => supabaseMock),
  select: jest.fn(() => supabaseMock),
  insert: jest.fn(() => supabaseMock),
  eq: jest.fn(() => supabaseMock),
  maybeSingle: jest.fn(),
  rpc: jest.fn(),
  storage: {
    from: jest.fn(() => supabaseMock.storage),
    upload: jest.fn(),
  },
};

jest.mock('./supabase', () => ({
  supabase: supabaseMock,
}));

describe('Server Actions', () => {
  beforeEach(() => {
    // Clears the history of all mocks, but not their implementation
    jest.clearAllMocks();
  });

  describe('createPoll', () => {
    it('should create a poll and redirect', async () => {
      const formData = new FormData();
      formData.append('title', 'Test Poll');
      formData.append('option1', 'Option A');
      formData.append('option2', 'Option B');
      formData.append('image', new File([], 'test.png'));

      // Mock the chained calls for poll insertion
      supabaseMock.insert.mockReturnValueOnce({
        select: jest.fn().mockResolvedValueOnce({
          data: [{ id: 'test-poll-id' }],
          error: null,
        }),
      });

      // Mock the options insertion
      supabaseMock.insert.mockResolvedValueOnce({
        error: null,
      });

      await createPoll(formData);

      expect(supabaseMock.from).toHaveBeenCalledWith('polls');
      expect(supabaseMock.insert).toHaveBeenCalledWith([
        { title: 'Test Poll', image_url: null },
      ]);
      expect(supabaseMock.from).toHaveBeenCalledWith('poll_options');
      expect(supabaseMock.insert).toHaveBeenCalledWith([
        { poll_id: 'test-poll-id', option_text: 'Option A' },
        { poll_id: 'test-poll-id', option_text: 'Option B' },
      ]);
      expect(redirect).toHaveBeenCalledWith('/polls');
    });
  });

  describe('getPolls', () => {
    it('should fetch all polls', async () => {
      const mockPolls = [{ id: '1', title: 'Poll 1' }];
      // Mock the specific implementation for this test
      supabaseMock.select.mockResolvedValueOnce({
        data: mockPolls,
        error: null,
      });

      const polls = await getPolls();

      expect(supabaseMock.from).toHaveBeenCalledWith('polls');
      expect(polls).toEqual(mockPolls);
    });

    it('should return an empty array on error', async () => {
      // Mock the specific implementation for this test
      supabaseMock.select.mockResolvedValueOnce({
        data: null,
        error: new Error('Fetch error'),
      });

      const polls = await getPolls();
      expect(polls).toEqual([]);
    });
  });

  describe('getPollById', () => {
    it('should fetch a single poll by its ID', async () => {
      const mockPoll = { id: 'test-id', title: 'Specific Poll' };
      // Mock the specific implementation for this test
      supabaseMock.maybeSingle.mockResolvedValueOnce({
        data: mockPoll,
        error: null,
      });

      const poll = await getPollById('test-id');

      expect(supabaseMock.from).toHaveBeenCalledWith('polls');
      expect(supabaseMock.eq).toHaveBeenCalledWith('id', 'test-id');
      expect(poll).toEqual(mockPoll);
    });
  });

  describe('votePoll', () => {
    it('should successfully call the RPC to increment a vote', async () => {
      // Mock the specific implementation for this test
      supabaseMock.rpc.mockResolvedValueOnce({ error: null });

      const result = await votePoll('option-id-123');

      expect(supabaseMock.rpc).toHaveBeenCalledWith('increment_vote', {
        option_id: 'option-id-123',
      });
      expect(result).toEqual({ success: true });
    });
  });
});
