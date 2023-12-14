import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { handleAddQuestion } from "../actions/questions";

const NewPoll = ({ dispatch }) => {
  const navigate = useNavigate();
  const [firstOption, setFirstOption] = useState("");
  const [secondOption, setSecondOption] = useState("");
  const [isValid, setIsValid] = useState(true);

  const onChangeFirstOption = (e) => {
    const value = e.target.value;
    setFirstOption(value);
  };

  const onChangeSecondOption = (e) => {
    const value = e.target.value;
    setSecondOption(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(handleAddQuestion(firstOption, secondOption));
      navigate("/");
    } catch (error) {
      setIsValid(false);
    }
  };

  return (
    <div>
      <h1 className="text-3xl text-center font-bold mt-9">Would You Rather</h1>
      <h5 className="text-center text-slate-700">Create Your Own Poll</h5>
      <form onSubmit={handleSubmit}>
        <div className="mt-3">
          <label
            htmlFor="firstOption"
            data-testid="firstOptionLabel"
            className="block text-sm text-center font-medium"
          >
            First Option
          </label>
          <div className="mt-1">
            <input
              value={firstOption}
              onChange={onChangeFirstOption}
              type="text"
              name="firstOption"
              id="firstOption"
              data-testid="firstOption"
              className="px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400  disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
            />
          </div>
        </div>

        <div className="mt-3">
          <label
            htmlFor="secondOption"
            data-testid="secondOptionLabel"
            className="block text-sm text-center font-medium"
          >
            Second Option
          </label>
          <div className="mt-1">
            <input
              value={secondOption}
              onChange={onChangeSecondOption}
              type="text"
              name="secondOption"
              id="secondOption"
              data-testid="secondOption"
              className="px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400  disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
            />
          </div>
        </div>

        <div className="mt-6 text-center">
          <button
            type="submit"
            data-testid="submit-poll"
            className="bg-sky-500 hover:bg-sky-700 px-5 py-2.5 al text-sm leading-5 rounded-md font-semibold text-white"
          >
            Submit
          </button>
        </div>
      </form>
      {isValid ? (
        <p></p>
      ) : (
        <p data-testid="invalid">Please update your Option 1 & Option 2</p>
      )}
    </div>
  );
};

export default connect()(NewPoll);
