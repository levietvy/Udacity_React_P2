import { connect } from "react-redux";
import { Navigate } from "react-router-dom";
import { useState } from "react";
import { handleLogin } from "../actions/authedUser";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

const Login = ({ dispatch, loggedIn }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  if (loggedIn) {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const redirectToUrl = urlSearchParams.get("redirectTo");
    return <Navigate to={redirectToUrl ? redirectToUrl : "/"} />;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(handleLogin(username, password));
    setUsername("");
    setPassword("");
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col xs={12} md={6}>
          <div className="shadow p-4 rounded">
            <h1 className="text-center mb-4" data-testid="login-heading">
              Login
            </h1>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="username">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  data-testid="username"
                  placeholder="Enter your username"
                />
              </Form.Group>
              <Form.Group controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  data-testid="password"
                  placeholder="Enter your password"
                />
              </Form.Group>
              <div className="text-center mt-4">
                <Button variant="primary" type="submit" data-testid="submit">
                  Login
                </Button>
              </div>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

const mapStateToProps = ({ authedUser }) => ({
  loggedIn: Boolean(authedUser),
});

export default connect(mapStateToProps)(Login);
