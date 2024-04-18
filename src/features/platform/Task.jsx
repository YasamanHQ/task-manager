import { usePlatform } from "./PlatformContext";

function Task({ task }) {
  const { onShowTask, onTaskDetails } = usePlatform();

  return (
    <li
      onClick={() => {
        onTaskDetails(task.id);
        onShowTask();
      }}
      className="group mb-6 cursor-pointer rounded-md bg-bkg-color p-4 shadow-md transition-all duration-300 dark:bg-items-bg-color dark:shadow-[--dark-shadow-color]"
    >
      <h4 className="font-semibold text-light-title-font-color transition-all duration-300 group-hover:text-purple-color dark:text-font-color">
        {task.title}
      </h4>
      <span className="text-sm font-semibold text-sidebar-font-color">
        {task.finishedSubtasks.length} of
        {task.subtasks.length ? ` ${task.subtasks.length}` : " 0"} subtasks
      </span>
    </li>
  );
}

export default Task;
