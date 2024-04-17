import { usePlatform } from "./PlatformContext";

function TodoTasks({ todo }) {
  const { onShowTask, onTaskDetails } = usePlatform();

  return (
    <li
      onClick={() => {
        onTaskDetails(todo.id);
        onShowTask();
      }}
      className="bg-bkg-color dark:bg-items-bg-color dark:shadow-dark-shadow-color group mb-6 cursor-pointer rounded-md p-4 shadow-md transition-all duration-300"
    >
      <h4 className="text-light-title-font-color group-hover:text-purple-color dark:text-font-color font-semibold transition-all duration-300">
        {todo.title}
      </h4>
      <span className="text-sidebar-font-color text-sm font-semibold">
        {todo.finishedSubtasks.length} of
        {todo.subtasks.length ? ` ${todo.subtasks.length}` : " 0"} subtasks
      </span>
    </li>
  );
}

export default TodoTasks;
