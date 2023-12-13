import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "../store";
import { BrowserRouter } from "react-router-dom";
import React from "react";
import TopNav from "../components/TopNavComponent";
import { setAuthedUser } from "../actions/authedUser";
import { screen } from "@testing-library/react";

describe("TopNav", () => {
  it("should render the component", () => {
    store.dispatch(setAuthedUser({ id: "sarahedo", password: "" }));

    render(
      <Provider store={store}>
        <BrowserRouter>
          <TopNav />
        </BrowserRouter>
      </Provider>
    );
    expect(screen).toBeDefined();
    expect(screen).toMatchSnapshot();
  });

  it("should display username of logged in user", () => {
    store.dispatch(setAuthedUser({ id: "sarahedo", password: "password123" }));

    render(
      <Provider store={store}>
        <BrowserRouter>
          <TopNav />
        </BrowserRouter>
      </Provider>
    );

    const userSpanElement = screen.getByTestId("user-information");
    expect(userSpanElement.textContent).toBe("sarahedo");
  });
});
