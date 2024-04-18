import { createContext, useContext, useEffect, useState } from "react";
import { getList, getSelectedTaskData } from "../../services/apiTasks";

const PlatformContext = createContext();

function PlatformProvider({ children }) {
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [tasksLoading, setTasksLoading] = useState(false);
  const [showTask, setShowTask] = useState(false);
  const [selectedTaskData, setSelectedTaskData] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState("");
  const [editIsOpen, setEditIsOpen] = useState(false);

  let indexArray = [];

  useEffect(() => {
    const tasks = async () => {
      setTasksLoading(true);
      const getTasks = await getList();
      setTasks(getTasks);
      setTasksLoading(false);
    };
    tasks();
  }, []);

  const todoList = tasks.filter((todoTask) => todoTask.taskStatus === "Todo");
  const doingList = tasks.filter(
    (doingTask) => doingTask.taskStatus === "Doing",
  );
  const doneList = tasks.filter((doneTask) => doneTask.taskStatus === "Done");

  const handleShowTask = () => {
    setShowTask((showTask) => !showTask);
  };

  const handleShowTaskDetails = async (id) => {
    setIsLoading(true);
    const selectedTask = await getSelectedTaskData(id);
    setSelectedTaskData(selectedTask);
    setSelectedStatus(selectedTask.taskStatus);
    setIsLoading(false);
  };

  return (
    <PlatformContext.Provider
      value={{
        todoList,
        doingList,
        doneList,
        onAllTask: setTasks,
        isLoading,
        tasksLoading,
        onTasksLoading: setTasksLoading,
        onIsLoading: setIsLoading,
        showTask,
        onShowTask: handleShowTask,
        onTaskDetails: handleShowTaskDetails,
        selectedTask: selectedTaskData,
        onSelectedTaskData: setSelectedTaskData,
        indexArray,
        selectedStatus,
        onSelectedStatus: setSelectedStatus,
        editIsOpen,
        onEditOpen: setEditIsOpen,
      }}
    >
      {children}
    </PlatformContext.Provider>
  );
}

function usePlatform() {
  const context = useContext(PlatformContext);
  if (context === undefined)
    throw new Error(
      "PlatformContext was used outside of the PlatformProvider!",
    );
  return context;
}

export { PlatformProvider, usePlatform };
