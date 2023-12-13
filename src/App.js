import React, { useEffect } from "react";
import "./App.css";
import TopNav from "./components/TopNavComponent";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./components/DashboardComponent";
import NewPoll from "./components/NewPollComponent";
import PollPage from "./components/PollPageComponent";
import { connect } from "react-redux";
import Login from "./components/LoginComponent";
import { handleInitialData } from "./actions/shared";
import Leaderboard from "./components/LeaderboardComponent";
import Error404 from "./components/NotFound404";
import PrivateRoute from "./components/PrivateRoute";

function App({ dispatch, loggedIn }) {
  useEffect(() => {
    dispatch(handleInitialData());
  });

  return (
    <div className="container mx-auto py-4 ">
      {loggedIn && <TopNav />}
      <Routes>
        <Route path="*" element={<Error404 />} />
        <Route path="/login" exact element={<Login />} />
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/leaderboard"
          exact
          element={
            <PrivateRoute>
              <Leaderboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/questions/:question_id"
          element={
            <PrivateRoute>
              <PollPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/add"
          exact
          element={
            <PrivateRoute>
              <NewPoll />
            </PrivateRoute>
          }
        />
      </Routes>
    </div>
  );
}

const mapStateToProps = ({ authedUser }) => ({
  loggedIn: Boolean(authedUser),
});

export default connect(mapStateToProps)(App);
