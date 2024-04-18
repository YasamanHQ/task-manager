import Task from "../features/platform/Task";

function Column({ title, tasksList }) {
  return (
    <div className="min-w-[260px] max-w-[300px]">
      <span className="text-sm font-semibold uppercase tracking-widest text-sidebar-font-color">
        {title} ({tasksList.length})
      </span>

      <ul className="mt-5">
        {tasksList.map((task) => (
          <Task task={task} key={task.id} />
        ))}
      </ul>
    </div>
  );
}

export default Column;
