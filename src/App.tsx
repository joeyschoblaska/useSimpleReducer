import AddTask from "./AddTask.jsx";
import TaskList from "./TaskList.jsx";
import useSimpleReducer from "./useSimpleReducer";

interface TaskType {
  id: number;
  text: string;
  done: boolean;
}

export default function TaskApp() {
  const {
    items: tasks,
    added,
    changed,
    deleted,
  } = useSimpleReducer(initialTasks);

  function handleAddTask(text: string) {
    added({
      id: nextId++,
      text: text,
      done: false,
    });
  }

  function handleChangeTask(task: TaskType) {
    changed(task.id, task);
  }

  function handleDeleteTask(taskId: number) {
    deleted(taskId);
  }

  return (
    <>
      <h1>Prague itinerary</h1>
      <AddTask onAddTask={handleAddTask} />
      <TaskList
        tasks={tasks}
        onChangeTask={handleChangeTask}
        onDeleteTask={handleDeleteTask}
      />
    </>
  );
}

let nextId = 3;
const initialTasks = [
  { id: 0, text: "Visit Kafka Museum", done: true },
  { id: 1, text: "Watch a puppet show", done: false },
  { id: 2, text: "Lennon Wall pic", done: false },
];
