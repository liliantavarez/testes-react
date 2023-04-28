import { fireEvent, render, screen } from "@testing-library/react";
import App from "./App";

const sum = (x: number, y: number) => {
  return x + y;
};

describe("App component", () => {
  it("should sum correctly", () => {
    expect(sum(4, 4)).toBe(8);
  });

  it("Should render App with hello message", () => {
    render(<App />);

    screen.getByText("Hello world!");
  });

  it("should change message on bottom click", () => {
    render(<App />);
    screen.getByText(/let's learn more about testing in react/i);
    const btn = screen.getByText(/change message/i);
    fireEvent.click(btn);
    screen.getByText(/new Message/i);

    //Query quando nao encontra não falha o teste, diferente do get by text
    const oldMessage = screen.queryByText(
      /let's learn more about testing in react/i
    );
    expect(oldMessage).toBeNull();
    expect(oldMessage).not.toBeInTheDocument();
  });
});

export default {};
