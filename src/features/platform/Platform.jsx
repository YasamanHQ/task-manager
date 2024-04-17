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
        <span className="text-sidebar-font-color text-sm font-semibold uppercase tracking-widest">
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
        <span className="text-sidebar-font-color text-sm font-semibold uppercase tracking-widest">
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
        <span className="text-sidebar-font-color text-sm font-semibold uppercase tracking-widest">
          Done ({doneList.length})
        </span>

        <ul className="mt-5">
          {doneList.map((done) => (
            <DoneTasks done={done} key={done.id} />
          ))}
        </ul>
      </div>

      {/* New Column */}
      <div className="bg-add-item-bg-color dark:bg-dark-add-item-bg-color group mb-6 mt-11 flex min-w-[300px] cursor-pointer items-center justify-center rounded-md transition-all duration-300">
        <span className="text-sidebar-font-color group-hover:text-purple-color text-2xl font-bold transition-all duration-300">
          +New Column
        </span>
      </div>
    </div>
  );
}

export default Platform;
