import { fireEvent, render } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "../store";
import { BrowserRouter } from "react-router-dom";
import React from "react";
import NewPoll from "../components/NewPollComponent";
import { screen } from "@testing-library/react";

describe("NewPoll", () => {
  it("should render the component", () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <NewPoll />
        </BrowserRouter>
      </Provider>
    );
    expect(screen).toBeDefined();
    expect(screen).toMatchSnapshot();
  });

  it("should display all elements", () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <NewPoll />
        </BrowserRouter>
      </Provider>
    );

    const firstOptionLabelElement = screen.getByTestId("firstOptionLabel");
    const firstOptionInputElement = screen.getByTestId("firstOption");
    const secondOptionLabelElement = screen.getByTestId("secondOptionLabel");
    const secondOptionInputElement = screen.getByTestId("secondOption");
    const submitButtonElement = screen.getByTestId("submit-poll");

    expect(firstOptionLabelElement.textContent).toBe("First Option");
    expect(secondOptionLabelElement.textContent).toBe("Second Option");
    expect(submitButtonElement.textContent).toBe("Submit");

    fireEvent.change(firstOptionInputElement, { target: { value: "X" } });
    fireEvent.change(secondOptionInputElement, {
      target: { value: "Y" },
    });
    expect(firstOptionInputElement.value).toBe("X");
    expect(secondOptionInputElement.value).toBe("Y");
  });
});
