import React from "react";
import { render } from "@testing-library/react";
import { store } from "../store";
import App from "../App";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { setAuthedUser } from "../actions/authedUser";
import { screen } from "@testing-library/react";

describe("App", () => {
  it("should render the component", () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    );
    expect(screen).toBeDefined();
    expect(screen).toMatchSnapshot();
  });

  it("should show Login page when not logged in", () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    );
    const heading = screen.getByTestId("login-heading");
    expect(heading).toBeInTheDocument();
  });

  it("should show Dashboard page when logged in", () => {
    store.dispatch(setAuthedUser({ id: "zoshikanlu", password: "pass246" }));

    render(
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    );

    const heading = screen.getByTestId("heading");
    expect(heading).toBeInTheDocument();
  });
});
