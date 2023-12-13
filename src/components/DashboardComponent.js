import { connect } from "react-redux";
import Card from "./CardQuestionComponent";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const Dashboard = ({ authedUser, questions, users }) => {
  const questionUnanswered = (question) =>
    !question.optionOne.votes.includes(authedUser.id) &&
    !question.optionTwo.votes.includes(authedUser.id);

  const questionAnswered = (question) =>
    question.optionOne.votes.includes(authedUser.id) ||
    question.optionTwo.votes.includes(authedUser.id);

  return (
    <Container className="mt-6" data-testid="heading">
      <h2 className="text-center font-bold text-2xl">New Questions</h2>
      <Row className="grid gap-4">
        {questions.filter(questionUnanswered).map((question) => (
          <Col key={question.id} md={3}>
            <Card question={question} author={users[question.author]} />
          </Col>
        ))}
      </Row>
      <h2 className="text-center font-bold text-2xl mt-6">
        Answered Questions
      </h2>
      <Row className="grid gap-4">
        {questions.filter(questionAnswered).map((question) => (
          <Col key={question.id} md={3}>
            <Card question={question} author={users[question.author]} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

const mapStateToProps = ({ authedUser, questions, users }) => ({
  authedUser,
  questions: Object.values(questions).sort((a, b) => b.timestamp - a.timestamp),
  users,
});

export default connect(mapStateToProps)(Dashboard);
