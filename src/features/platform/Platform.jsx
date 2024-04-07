import TodoTasks from "./TodoTasks";
import DoingTasks from "./DoingTasks";
import DoneTasks from "./DoneTasks";
import { usePlatform } from "./PlatformContext";

function Platform() {
  const { todoList, doingList, doneList } = usePlatform();

  return (
    <div className="flex gap-8">
      {/* Todo */}
      <div className="min-w-[260px] max-w-[300px]">
        <span className="text-sm font-semibold uppercase tracking-widest text-[--sidebar-font-color]">
          Todo ({todoList.length})
        </span>

        <ul className="mt-5">
          {todoList.map((todo) => (
            <TodoTasks todo={todo} key={todo.id} />
          ))}
        </ul>
      </div>

      {/* Doing */}
      <div className="min-w-[260px] max-w-[300px]">
        <span className="text-sm font-semibold uppercase tracking-widest text-[--sidebar-font-color]">
          Doing ({doingList.length})
        </span>

        <ul className="mt-5">
          {doingList.map((doing) => (
            <DoingTasks doing={doing} key={doing.id} />
          ))}
        </ul>
      </div>

      {/* Done */}
      <div className="min-w-[260px] max-w-[300px]">
        <span className="text-sm font-semibold uppercase tracking-widest text-[--sidebar-font-color]">
          Done ({doneList.length})
        </span>

        <ul className="mt-5">
          {doneList.map((done) => (
            <DoneTasks done={done} key={done.id} />
          ))}
        </ul>
      </div>

      {/* New Column */}
      <div className="group mb-6 mt-11 flex min-w-[300px] cursor-pointer items-center justify-center rounded-md bg-[--add-item-bg-color] transition-all duration-300 dark:bg-[--dark-add-item-bg-color]">
        <span className="text-2xl font-bold text-[--sidebar-font-color] transition-all duration-300 group-hover:text-[--purple-color]">
          +New Column
        </span>
      </div>
    </div>
  );
}

export default Platform;
