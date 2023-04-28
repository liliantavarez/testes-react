import { useState } from "react";
import Button from "./components/Button";

function App() {
  const [message, setMessage] = useState(
    "Let's learn more about testing in React"
  );
  return (
    <div>
      <h1>Hello world!</h1>
      <p>{message}</p>
      <button onClick={() => setMessage("New Message")}>Change message</button>
      <Button
        disabled={false}
        onClick={() => {
          setMessage("New Message 2.0");
        }}
      >
        Click me
      </Button>
    </div>
  );
}

export default App;
