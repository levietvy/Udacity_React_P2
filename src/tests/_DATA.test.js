import { _saveQuestion, _saveQuestionAnswer } from '../util/_DATA';

jest.useFakeTimers();

describe('_saveQuestionAnswer', () => {
  afterEach(() => {
    jest.clearAllTimers();
  });

  it('should return true for correct parameters', async () => {
    const responsePromise = _saveQuestionAnswer({
      authedUser: 'zoshikanlu',
      qid: '8xf0y6ziyjabvozdd253nd',
      answer: 'optionTwo',
    });
    jest.runAllTimers();
    const response = await responsePromise;

    expect(response).toBe(true);
  });

  it('should return error for false parameters', async () => {
    const responsePromise = await _saveQuestionAnswer({
      authedUser: 'zoshikanlu',
      qid: undefined,
      answer: 'optionTwo',
    }).catch((e) => e);


    expect(responsePromise).toBe('Please provide authedUser, qid, and answer');
  });
});

describe('_saveQuestion', () => {
  afterEach(() => {
    jest.clearAllTimers(); // Clear all pending timers after each test
  });

  it('should save the question and return the formatted question', async () => {
    const validQuestion = {
      optionOneText: 'Option One',
      optionTwoText: 'Option Two',
      author: {
        id: 'zoshikanlu',
      },
    };

    const resultPromise = _saveQuestion(validQuestion);
    jest.runAllTimers(); // Run all pending timers
    const result = await resultPromise;

    expect(result).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        timestamp: expect.any(Number),
        optionOne: expect.objectContaining({
          text: 'Option One',
          votes: [],
        }),
        optionTwo: expect.objectContaining({
          text: 'Option Two',
          votes: [],
        }),
        author: 'zoshikanlu',
      })
    );
  });

  it('should reject with an error if incorrect data is provided', async () => {
    // Missing optionOneText, optionTwoText, and author intentionally to trigger an error
    const incorrectData = {};

    const responsePromise = _saveQuestion(incorrectData).catch((e) => e);
    jest.runAllTimers(); // Run all pending timers
    const response = await responsePromise;

    expect(response).toBe(
      'Please provide optionOneText, optionTwoText, and author'
    );
  });
});