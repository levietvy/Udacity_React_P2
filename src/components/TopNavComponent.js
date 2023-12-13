import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { handleLogout } from "../actions/authedUser";
import Nav from "react-bootstrap/Nav";
import NavBar from "react-bootstrap/Navbar";

const TopNav = ({ dispatch, authedUserId, authedUserAvatarURL }) => {
  const logout = (e) => {
    e.preventDefault();
    dispatch(handleLogout());
  };

  return (
    <NavBar bg="dark" variant="dark" expand="lg">
      <NavBar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link to="/" as={Link}>
            Home
          </Nav.Link>
          <Nav.Link to="/leaderboard" as={Link}>
            Leaderboard
          </Nav.Link>
          <Nav.Link to="/add" as={Link}>
            New
          </Nav.Link>
        </Nav>
      </NavBar.Collapse>
      <div className="m-1 mr-2 w-6 h-6 relative flex justify-center items-center rounded-full bg-gray-500">
        <img
          src={authedUserAvatarURL}
          className="position-relative img-fluid w-5 h-5 rounded-full"
          alt=""
        ></img>
        <div className="absolute right-0 bottom-0 w-1.5 h-1.5 rounded-full bg-green-500"></div>
      </div>

      <span
        className="font-medium px-1 py-2 text-slate-700"
        data-testid="user-information"
      >
        {authedUserId}
      </span>
      <button
        onClick={logout}
        className="font-medium px-3 py-2 text-slate-700 rounded-lg hover:bg-slate-100 hover:text-slate-900"
      >
        Logout
      </button>
    </NavBar>
  );
};

const mapStateToProps = ({ authedUser }) => ({
  authedUserId: authedUser.id,
  authedUserAvatarURL: authedUser.avatarURL,
});

export default connect(mapStateToProps)(TopNav);
