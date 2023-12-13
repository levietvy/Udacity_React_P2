import { connect } from "react-redux";

const Leaderboard = ({ users, questions }) => {
  return (
    <div className="container mt-5">
      <h1 className="text-3xl text-center font-bold mb-6">Leaderboard</h1>
      <table className="table table-bordered table-striped">
        <thead>
          <tr>
            <th className="font-medium text-left">User</th>
            <th className="font-medium text-left">Answered</th>
            <th className="font-medium text-left">Created</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td className="border px-4 py-2">
                <span className="font-bold">{user.name}</span>
                <br />
                {user.id}
              </td>
              <td className="border px-4 py-2">
                {Object.keys(user.answers).length}
              </td>
              <td className="border px-4 py-2">
                {
                  questions.filter((question) => question.author === user.id)
                    .length
                }
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const mapStateToProps = ({ users, questions }) => ({
  users: Object.values(users).sort(
    (a, b) =>
      Object.keys(b.questions).length +
      Object.keys(b.answers).length -
      (Object.keys(a.questions).length + Object.keys(a.answers).length)
  ),
  questions: Object.values(questions),
});

export default connect(mapStateToProps)(Leaderboard);
