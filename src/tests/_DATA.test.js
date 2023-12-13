const { _saveQuestionAnswer } = require("../util/_DATA");
describe("_saveQuestionAnswer", () => {
  it("should return true for correct parameters", async () => {
    const response = await _saveQuestionAnswer({
      authedUser: "zoshikanlu",
      qid: "8xf0y6ziyjabvozdd253nd",
      answer: "optionTwo",
    });

    expect(response).toBe(true);
  });

  it("should return error for false parameters", async () => {
    const response = await _saveQuestionAnswer({
      authedUser: "zoshikanlu",
      qid: undefined,
      answer: "optionTwo",
    }).catch((e) => e);

    expect(response).toBe("Please provide authedUser, qid, and answer");
  });
});
