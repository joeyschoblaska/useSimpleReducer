import AddTask from "./AddTask.jsx";
import TaskList from "./TaskList.jsx";
import useSimpleReducer, { ActionKind } from "./useSimpleReducer";

interface TaskType {
  id: number;
  text: string;
  done: boolean;
}

export default function TaskApp() {
  const { items: tasks, dispatch } = useSimpleReducer(initialTasks);

  function handleAddTask(text: string) {
    dispatch({
      type: ActionKind.ADDED,
      item: {
        id: nextId++,
        text: text,
        done: false,
      },
    });
  }

  function handleChangeTask(task: TaskType) {
    dispatch({
      type: ActionKind.CHANGED,
      id: task.id,
      item: task,
    });
  }

  function handleDeleteTask(taskId: number) {
    dispatch({
      type: ActionKind.DELETED,
      id: taskId,
    });
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
