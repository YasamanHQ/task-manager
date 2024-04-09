import { useEffect, useRef, useState } from "react";
import { usePlatform } from "../features/platform/PlatformContext";
import Spinner from "../ui/Spinner";
import { HiOutlineDotsVertical } from "react-icons/hi";

function TaskDetailModal() {
  const {
    onShowTask,
    isLoading,
    onIsLoading,
    selectedTask,
    onGetSelectedTask,
    indexArray,
    onAllTask,
    selectedStatus,
    onSelectedStatus,
  } = usePlatform();

  const [selectedSubtask, setSelectedSubtask] = useState([]);
  const [showTheOption, setShowTheOption] = useState(false);
  const initialRender = useRef(false);

  useEffect(() => {
    if (initialRender.current) {
      const changeTaskStatus = async (id) => {
        try {
          onIsLoading(true);

          const newSelectedStatus = await fetch(
            `https://660424af2393662c31d0b94c.mockapi.io/list/${id}`,
            {
              method: "PUT",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                ...selectedTask,
                taskStatus: selectedStatus,
              }),
            },
          );
          const updatedSelectedStatus = await newSelectedStatus.json();
          console.log(updatedSelectedStatus);
          // onGetSelectedTask(updatedSelectedStatus);
          onIsLoading(false);
        } catch (err) {
          console.error(err);
        }
      };
      // console.log(selectedStatus);

      changeTaskStatus(selectedTask.id);
    }

    initialRender.current = true;
  }, [selectedStatus]);

  useEffect(() => {
    selectedTask.subtasks?.map((element, index) => {
      if (selectedTask.finishedSubtasks?.includes(element)) {
        indexArray.push(index);
      }
    });
    setSelectedSubtask(indexArray);
  }, [selectedTask]);

  const handleSelectedStatus = (e) => {
    onSelectedStatus(e.target.value);
  };

  const handleCloseModal = (e) => {
    if (e.target) {
      onShowTask((showTask) => !showTask);

      const updateAllTasks = async () => {
        const getUpdatedTasks = await fetch(
          "https://660424af2393662c31d0b94c.mockapi.io/list",
        );
        const updatedTasks = await getUpdatedTasks.json();
        onAllTask(updatedTasks);
      };
      updateAllTasks();
    }
  };

  const handleCheckbox = (e) => {
    let isSelected = e.target.checked;
    let selectedValue = parseInt(e.target.value);
    if (isSelected) {
      setSelectedSubtask([...selectedSubtask, selectedValue]);

      const addFinishedSubtask = async (id) => {
        try {
          onIsLoading(true);

          const finishedSubtask = await fetch(
            `https://660424af2393662c31d0b94c.mockapi.io/list/${id}`,
            {
              method: "PUT",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                ...selectedTask,
                finishedSubtasks: [
                  ...selectedTask.finishedSubtasks,
                  selectedTask.subtasks[selectedValue],
                ],
              }),
            },
          );
          const updatedSelectedTask = await finishedSubtask.json();
          onGetSelectedTask(updatedSelectedTask);
          onIsLoading(false);
        } catch (err) {
          console.error(err);
        }
      };

      addFinishedSubtask(selectedTask.id);
    } else {
      setSelectedSubtask((prevFinishedSubtasks) =>
        prevFinishedSubtasks.filter((subIndex) => subIndex !== selectedValue),
      );

      const unfinishedSubtask = selectedTask.finishedSubtasks.filter(
        (finishedSubtask) =>
          finishedSubtask !== selectedTask.subtasks[selectedValue],
      );

      const removeFinishedSubtask = async (id) => {
        onIsLoading(true);

        const finishedSubtask = await fetch(
          `https://660424af2393662c31d0b94c.mockapi.io/list/${id}`,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              ...selectedTask,
              finishedSubtasks: unfinishedSubtask,
            }),
          },
        );

        const updatedSelectedTask = await finishedSubtask.json();
        onGetSelectedTask(updatedSelectedTask);
        onIsLoading(false);
      };

      removeFinishedSubtask(selectedTask.id);
    }
  };

  const handleOptions = () => {
    setShowTheOption((showTheOption) => !showTheOption);
  };

  const handleDeleteTask = () => {
    const removeFinishedSubtask = async (id) => {
      onIsLoading(true);
      const finishedSubtask = await fetch(
        `https://660424af2393662c31d0b94c.mockapi.io/list/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-type": "application/json",
          },
        },
      );
      const updatedSelectedTask = await finishedSubtask.json();
      onGetSelectedTask(updatedSelectedTask);
      onShowTask((showTask) => !showTask);
      onIsLoading(false);

      const getUpdatedTasks = await fetch(
        "https://660424af2393662c31d0b94c.mockapi.io/list",
      );
      const updatedTasks = await getUpdatedTasks.json();
      onAllTask(updatedTasks);
    };

    removeFinishedSubtask(selectedTask.id);
  };

  return (
    <>
      <div
        className="absolute bottom-0 left-0 right-0 top-0 z-10 bg-[--add-item-modal-bg-color]"
        onClick={handleCloseModal}
      ></div>

      <div className="fixed left-[50%] top-[50%] z-20 w-[500px] -translate-x-1/2 -translate-y-1/2 transform overflow-auto rounded-md bg-[--bg-color] p-8 text-[--light-title-font-color] dark:bg-[--dark-bg-color] dark:text-[--font-color]">
        <div className="relative flex h-full w-full flex-col justify-between">
          {isLoading ? (
            <Spinner />
          ) : (
            <>
              <div className="relative flex justify-between">
                <h3 className="text-lg font-bold tracking-wide text-[--light-title-font-color] dark:text-[--font-color]">
                  {selectedTask.title}
                </h3>
                <span
                  onClick={handleOptions}
                  className="cursor-pointer self-center text-2xl text-[--sidebar-font-color] transition-all duration-300 hover:text-[--purple-color]"
                >
                  <HiOutlineDotsVertical />
                </span>
                {showTheOption && (
                  <div className="absolute right-0 top-6 flex w-[150px] flex-col gap-y-3 rounded-md bg-white p-4 text-sm font-semibold shadow-xl shadow-[--dark-shadow-color]">
                    <span className="cursor-pointer text-[--light-title-font-color]">
                      Edit task
                    </span>
                    <span
                      onClick={handleDeleteTask}
                      className="cursor-pointer text-[--delete-color]"
                    >
                      Delete task
                    </span>
                  </div>
                )}
              </div>

              <p className="mt-3 text-sm font-semibold text-[--sidebar-font-color]">
                {selectedTask.description}
              </p>

              <span className="mb-3 mt-6 inline-block text-sm font-semibold tracking-wide text-[--sidebar-font-color] dark:text-[--font-color]">
                Subtasks ({`${selectedTask.finishedSubtasks.length} `} of
                {` ${selectedTask.subtasks.length}`})
              </span>

              {selectedTask.subtasks.map((selectedTasksubtask, index) => (
                <div
                  key={index}
                  className="mb-3 rounded-md bg-[--app-bg-color] px-4 py-2 dark:bg-[--dark-app-bg-color]"
                >
                  <input
                    type="checkbox"
                    className="h-4 w-4 bg-slate-500 align-middle accent-[--purple-color]"
                    value={index}
                    checked={selectedSubtask?.includes(index)}
                    onChange={handleCheckbox}
                  />
                  <span
                    className={`ml-5 text-sm font-semibold ${selectedSubtask?.includes(index) && "text-[--sidebar-font-color] line-through dark:text-[--sidebar-font-color]"} dark:font-medium dark:text-[--font-color]`}
                  >
                    {selectedTasksubtask}
                  </span>
                </div>
              ))}

              <label
                htmlFor="status"
                className="mt-6 inline-block text-sm font-semibold tracking-wide text-[--sidebar-font-color] dark:text-[--font-color]"
              >
                Status
              </label>
              <select
                id="status"
                name="status"
                type="text"
                className="input text-sm dark:valid:bg-[--dark-bg-color]"
                value={selectedStatus}
                onChange={handleSelectedStatus}
              >
                <option className="dark:bg-[--dark-bg-app-color]" value="Todo">
                  Todo
                </option>
                <option className="dark:bg-[--dark-app-bg-color]" value="Doing">
                  Doing
                </option>
                <option className="dark:bg-[--dark-app-bg-color]" value="Done">
                  Done
                </option>
              </select>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default TaskDetailModal;
