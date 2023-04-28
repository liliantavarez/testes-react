import { rest } from "msw";
import { setupServer } from "msw/node";
import Tasks from "./Task";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";

describe("Task Component", () => {
  const worker = setupServer(
    rest.get(
      "https://jsonplaceholder.typicode.com/todos",
      async (req, res, ctx) => {
        return res(
          ctx.json([
            {
              userID: 1,
              id: 1,
              title: "delectus aut autem",
              completed: false,
            },
          ])
        );
      }
    )
  );

  beforeAll(() => {
    worker.listen();
  });

  beforeEach(() => {
    worker.resetHandlers();
  });

  it("should fetch and show tasks on button click", async () => {
    render(<Tasks />);

    const button = screen.getByText(/get tasks from api/i);
    fireEvent.click(button);
    await screen.findByText("delectus aut autem");
  });

  it("should show error message on fetch error", async () => {
    worker.use(
      rest.get(
        "https://jsonplaceholder.typicode.com/todos",
        async (req, res, ctx) => {
          return res(ctx.status(500), ctx.json({ message: "error happened" }));
        }
      )
    );
    render(<Tasks />);
    const button = screen.getByText(/get tasks from api/i);
    fireEvent.click(button);
    await screen.findByText("Request failed with status code 500");
  });
});
