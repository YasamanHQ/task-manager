import { usePlatform } from "./PlatformContext";

function DoingTasks({ doing }) {
  const { onShowTask, onTaskDetails } = usePlatform();

  return (
    <li
      onClick={() => {
        onTaskDetails(doing.id);
        onShowTask();
      }}
      className="bg-bkg-color dark:bg-items-bg-color dark:shadow-dark-shadow-color group mb-6 cursor-pointer rounded-md p-4 shadow-md transition-all duration-300"
    >
      <h4 className="text-light-title-font-color group-hover:text-purple-color dark:text-font-color font-semibold transition-all duration-300">
        {doing.title}
      </h4>
      <span className="text-sidebar-font-color text-sm font-semibold">
        {doing.finishedSubtasks.length} of
        {doing.subtasks.length ? ` ${doing.subtasks.length}` : " 0"} subtasks
      </span>
    </li>
  );
}

export default DoingTasks;
