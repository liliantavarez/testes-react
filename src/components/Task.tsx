import { useState } from "react";
import axios from "axios";
import Button from "./Button";

interface Task {
  id: string;
  title: string;
}

const Tasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [erroMessage, setErroMessage] = useState<null | string>(null);
  const handleClick = async () => {
    try {
      const { data } = await axios.get(
        "https://jsonplaceholder.typicode.com/todos?_limit=10"
      );

      setTasks(data);
      setErroMessage(null);
    } catch (error: any) {
      setErroMessage(error?.message);
    }
  };
  return (
    <>
      <h1>Task from api</h1>

      <Button disabled={false} onClick={handleClick}>
        Get Tasks from API
      </Button>

      {tasks?.length > 0 &&
        tasks.map((task, index) => <p key={task.id}>{task.title}</p>)}
      {erroMessage}
    </>
  );
};

export default Tasks;
