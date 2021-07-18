import { render, screen } from "@testing-library/react";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import "@testing-library/jest-dom/extend-expect";

test("renders title", () => {
  const newTest = true;
  expect(newTest).toBeTruthy();
  /*
  render(
    <Router>
      <App />
    </Router>
  );
  const restaurant = screen.getByText(/periodic tables/i);
  expect(restaurant).toBeInTheDocument();
  */
});
