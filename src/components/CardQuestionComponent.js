import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

const CardQuestion = ({ question, author }) => {
  const hrefRoute = `/questions/${question.id}`;
  const questionDate = new Date(question.timestamp).toDateString();

  return (
    <Link
      to={hrefRoute}
      className="m-3 p-2 rounded-xl shadow-md hover:shadow-xl transition bg-zinc-100 max-w-sm mx-auto flex items-center space-x-4"
    >
      <div className="shrink-0">
        {/* Add a class to the image and set maxWidth and maxHeight */}
        <img
          className="rounded-md h-12 w-12"
          src={author?.avatarURL}
          alt={`Avatar of ${author?.name}`}
        />
      </div>
      <div>
        <div className="text-xl font-medium text-black">{author?.name}</div>
        <p className="text-xs italic">{questionDate}</p>
        <p className="underline underline-offset-4 text-sm text-green-500">
          Click to show
        </p>
      </div>
    </Link>
  );
};

export default connect()(CardQuestion);
