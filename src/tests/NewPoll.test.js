import { fireEvent, render, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { store } from "../store";
import NewPoll from "../components/NewPollComponent";
import { screen } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import { handleAddQuestion } from "../actions/questions";

// Mock the useNavigate hook
const mockNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

// Mock the handleAddQuestion action
jest.mock("../actions/questions", () => ({
  handleAddQuestion: jest.fn(),
}));

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

  it("should submit a new poll successfully", async () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <NewPoll />
        </BrowserRouter>
      </Provider>
    );

    const firstOptionInputElement = screen.getByTestId("firstOption");
    const secondOptionInputElement = screen.getByTestId("secondOption");
    const submitButtonElement = screen.getByTestId("submit-poll");

    fireEvent.change(firstOptionInputElement, {
      target: { value: "Option X" },
    });
    fireEvent.change(secondOptionInputElement, {
      target: { value: "Option Y" },
    });

    fireEvent.click(submitButtonElement);

    await waitFor(() => {
      expect(handleAddQuestion).toHaveBeenCalledWith("Option X", "Option Y");
    });
  });

  it("should handle errors when submitting a new poll", async () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <NewPoll />
        </BrowserRouter>
      </Provider>
    );

    const firstOptionInputElement = screen.getByTestId("firstOption");
    const secondOptionInputElement = screen.getByTestId("secondOption");
    const submitButtonElement = screen.getByTestId("submit-poll");

    fireEvent.change(firstOptionInputElement, {
      target: { value: "Invalid Option" },
    });
    fireEvent.change(secondOptionInputElement, { target: { value: "" } });

    fireEvent.click(submitButtonElement);

    await waitFor(() => {
      const invalid = screen.getByTestId("invalid");
      expect(invalid).toBeInTheDocument();
    });
  });
});
