import { fireEvent, render } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "../store";
import { BrowserRouter } from "react-router-dom";
import React from "react";
import Login from "../components/LoginComponent";
import { handleInitialData } from "../actions/shared";
import { screen } from "@testing-library/react";

describe("Login", () => {
  it("should render the component", () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Login />
        </BrowserRouter>
      </Provider>
    );
    expect(screen).toBeDefined();
    expect(screen).toMatchSnapshot();
  });

  it("should clear input elements after clicking submit button", async () => {
    await store.dispatch(handleInitialData());

    render(
      <Provider store={store}>
        <BrowserRouter>
          <Login />
        </BrowserRouter>
      </Provider>
    );

    const testIds = ["login-heading", "username", "password", "submit"];

    testIds.forEach((testId) => {
      expect(screen.getByTestId(testId)).toBeInTheDocument();
    });

    const username = screen.getByTestId("username");
    const password = screen.getByTestId("password");
    const submit = screen.getByTestId("submit");
    const loginHeading = screen.getByTestId("login-heading");

    fireEvent.change(username, { target: { value: "zoshikanlu" } });
    fireEvent.change(password, {
      target: { value: "wrongpassword" },
    });
    expect(username.value).toBe("zoshikanlu");
    expect(password.value).toBe("wrongpassword");
    fireEvent.click(submit); // User stays on page
    expect(loginHeading).toBeInTheDocument();
    expect(username.value).toBe("");
    expect(password.value).toBe("");
  });
});
