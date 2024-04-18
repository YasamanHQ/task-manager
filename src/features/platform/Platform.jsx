import { usePlatform } from "./PlatformContext";
import Column from "../../ui/Column";

function Platform() {
  const { todoList, doingList, doneList } = usePlatform();

  return (
    <div className="flex gap-8">
      <Column title="Todo" tasksList={todoList} />

      <Column title="Doing" tasksList={doingList} />

      <Column title="Done" tasksList={doneList} />

      {/* New Column */}
      <div className="group mb-6 mt-11 flex min-w-[300px] cursor-pointer items-center justify-center rounded-md bg-add-item-bg-color transition-all duration-300 dark:bg-dark-add-item-bg-color">
        <span className="text-2xl font-bold text-sidebar-font-color transition-all duration-300 group-hover:text-purple-color">
          +New Column
        </span>
      </div>
    </div>
  );
}

export default Platform;
