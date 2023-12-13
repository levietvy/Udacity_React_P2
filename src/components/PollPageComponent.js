import { connect } from "react-redux";
import { handleAddAnswer } from "../actions/questions";
import Error404 from "./NotFound404";
import { useParams } from "react-router-dom";

const PollPage = ({ dispatch, authedUser, questions, users }) => {
  const questionId = useParams().question_id;

  const question = questions[questionId];

  const author = Object.values(users).find(
    (user) => user.id === question?.author
  );

  if (!authedUser || question === undefined || author === undefined) {
    return <Error404 />;
  }

  const selectedOptionOne = question.optionOne.votes.includes(authedUser.id);
  const selectedOptionTwo = question.optionTwo.votes.includes(authedUser.id);
  const hasSelected = selectedOptionOne || selectedOptionTwo;

  const onClickOptionOne = (e) => {
    e.preventDefault();
    dispatch(handleAddAnswer(question.id, "optionOne"));
  };

  const onClickOptionTwo = (e) => {
    e.preventDefault();
    dispatch(handleAddAnswer(question.id, "optionTwo"));
  };

  const getPercentage = (option, question) => {
    const totalVotes =
      question.optionOne.votes.length + question.optionTwo.votes.length;

    return `${Math.trunc(
      (question[option].votes.length / totalVotes) * 100
    )} %`;
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="border p-4 rounded text-center">
            <h1 className="text-3xl font-bold mt-9">Poll by {author.id}</h1>
            <div className="flex justify-center">
              <img
                src={author.avatarURL}
                alt="Profile"
                className="h-24 w-24 mb-4 rounded-circle"
              />
            </div>
            <h2 className="text-2xl font-bold mt-6">Would you rather?</h2>
            <div className="grid grid-cols-2 gap-4 mt-4">
              <button
                onClick={onClickOptionOne}
                disabled={hasSelected}
                className={`p-2 rounded-xl hover:shadow-xl transition ${
                  selectedOptionOne
                    ? "bg-success border bg-opacity-50"
                    : "bg-zinc-100"
                }`}
              >
                <div className={selectedOptionOne ? "chosen" : ""}>
                  <div className="border border-black">
                    <p className="font-bold mb-2">{question.optionOne.text}</p>
                    {!hasSelected && (
                      <p className="underline underline-offset-4 mb-3 text-green-500">
                        Click
                      </p>
                    )}
                  </div>
                  {hasSelected && (
                    <p className="text-xs">
                      Votes: {question.optionOne.votes.length} (
                      {getPercentage("optionOne", question)})
                    </p>
                  )}
                </div>
              </button>

              <button
                onClick={onClickOptionTwo}
                disabled={hasSelected}
                className={`p-2 rounded-xl hover:shadow-xl transition ${
                  selectedOptionTwo
                    ? "bg-success border bg-opacity-50"
                    : "bg-zinc-100"
                }`}
              >
                <div className={selectedOptionTwo ? "chosen" : ""}>
                  <div className="border border-black">
                    <p className="font-bold mb-2">{question.optionTwo.text}</p>
                    {!hasSelected && (
                      <p className="underline underline-offset-4 mb-3 text-green-500">
                        Click
                      </p>
                    )}
                  </div>
                  {hasSelected && (
                    <p className="text-xs">
                      Votes: {question.optionTwo.votes.length} (
                      {getPercentage("optionTwo", question)})
                    </p>
                  )}
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = ({ authedUser, users, questions }) => {
  return { authedUser, questions, users };
};

export default connect(mapStateToProps)(PollPage);
