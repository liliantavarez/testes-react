import { fireEvent, render, screen } from "@testing-library/react";
import Button from "./Button";

describe("Button Component", () => {
  it("should render with red background if disable", () => {
    render(
      <Button onClick={() => {}} disabled>
        Click me
      </Button>
    );

    const button = screen.getByRole("button", { name: /Click me/i });

    expect(button).toHaveStyle({ backgroundColor: "red" });
  });

  it("should render with blue background if enable", () => {
    render(
      <Button onClick={() => {}} disabled={false}>
        Click me
      </Button>
    );

    const buttonBlue = screen.getByRole("button", { name: /Click me/i });

    expect(buttonBlue).toHaveStyle({ backgroundColor: "blue" });
  });

  it("should call onClick prop on click", () => {
    const onClick = jest.fn();
    render(
      <Button disabled onClick={onClick}>
        Click me
      </Button>
    );

    const button = screen.getByText(/click me/i);
    fireEvent.click(button);
    expect(onClick).toHaveBeenCalled();
    expect(onClick).toHaveBeenCalledWith(10);
  });
});

export default {};
