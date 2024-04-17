function TaskOptionBox({ onDeleteTask, onEditTask }) {
  return (
    <div className="shadow-dark-shadow-color absolute right-0 top-6 flex w-[150px] flex-col gap-y-3 rounded-md bg-white p-4 text-sm font-semibold shadow-xl">
      <span
        onClick={onEditTask}
        className="text-light-title-font-color cursor-pointer"
      >
        Edit task
      </span>
      <span onClick={onDeleteTask} className="text-red-color cursor-pointer">
        Delete task
      </span>
    </div>
  );
}

export default TaskOptionBox;
