import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "./store.js";
import App from "./App.js";
import { BrowserRouter } from "react-router-dom";

test("renders learn react link", () => {
  render(
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  );
  const linkElement = screen.getByTestId("login-heading");
  expect(linkElement).toBeInTheDocument();
});
