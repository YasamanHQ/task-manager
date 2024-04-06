import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { useState } from "react";
import NewTaskModal from "../pages/NewTaskModal";
import Spinner from "./Spinner";
import { usePlatform } from "../features/platform/PlatformContext";
import TaskDetailModal from "../pages/TaskDetailModal";

function AppLayout() {
  const [boards, setBoards] = useState([
    "Platform Launch",
    "Marketing Plan",
    "Roadmap",
  ]);

  const [isHidden, setIsHidden] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const { isLoading, showTask } = usePlatform();

  const handleSidebar = () => {
    setIsHidden((isHidden) => !isHidden);
  };

  return (
    <div
      className={`relative grid h-[100vh] w-[100vw] grid-cols-[18rem_1fr] grid-rows-[auto_1fr] overflow-hidden bg-[--app-bg-color] font-sans transition-all duration-300 dark:bg-[--dark-app-bg-color] ${isHidden ? `grid-cols-[0.01rem_1fr]` : ``}`}
    >
      <Header isHidden={isHidden} onOpen={setIsOpen} />
      <Sidebar isHidden={isHidden} onHide={handleSidebar} boards={boards} />

      {isOpen && <NewTaskModal onOpen={setIsOpen} />}
      {showTask && <TaskDetailModal />}

      <main className="relative h-[84vh] overflow-auto">
        {isLoading ? (
          <Spinner />
        ) : (
          // <Outlet context={[tasks]} />
          <Outlet />
        )}
      </main>
    </div>
  );
}

export default AppLayout;
