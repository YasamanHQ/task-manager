import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

const PlatformContext = createContext();

function PlatformProvider({ children }) {
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showTask, setShowTask] = useState(false);
  const [getSelectedTask, setGetSelectedTask] = useState([]);

  useEffect(() => {
    try {
      const getList = async () => {
        setIsLoading(true);
        const res = await fetch(
          "https://660424af2393662c31d0b94c.mockapi.io/list",
        );
        const data = await res.json();
        setTasks(data);

        setIsLoading(false);
      };

      getList();
    } catch (err) {
      console.error(new Error("Oops! Fetching Data failed!"));
    }
  }, []);

  // const getData = useCallback(async () => {
  //   const res = await fetch("https://660424af2393662c31d0b94c.mockapi.io/list");
  //   const data = await res.json();
  //   setTasks(data);
  // }, []);

  // useEffect(() => {
  //   getData();
  // }, [getData]);

  const todoList = tasks.filter((todoTask) => todoTask.taskStatus === "Todo");
  const doingList = tasks.filter(
    (doingTask) => doingTask.taskStatus === "Doing",
  );
  const doneList = tasks.filter((doneTask) => doneTask.taskStatus === "Done");

  const handleAddNewTask = (createdTask) => {
    console.log(createdTask);
    setTasks((tasks) => [...tasks, createdTask]);
  };

  const handleShowTask = () => {
    setShowTask((showTask) => !showTask);
  };

  const handleShowTaskDetails = async (id) => {
    setIsLoading(true);
    const getSelectedTask = await fetch(
      `https://660424af2393662c31d0b94c.mockapi.io/list/${id}`,
    );
    const selectedTask = await getSelectedTask.json();
    setGetSelectedTask(selectedTask);
    setIsLoading(false);
  };

  console.log(getSelectedTask.subtasks);

  return (
    <PlatformContext.Provider
      value={{
        todoList,
        doingList,
        doneList,
        onAllTask: setTasks,
        isLoading,
        onAddNewTask: handleAddNewTask,
        showTask,
        onShowTask: handleShowTask,
        onTaskDetails: handleShowTaskDetails,
        selectedtask: getSelectedTask,
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
