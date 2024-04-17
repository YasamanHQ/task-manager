import { useEffect, useRef, useState } from "react";
import { usePlatform } from "../features/platform/PlatformContext";
import Spinner from "../ui/Spinner";
import { HiOutlineDotsVertical } from "react-icons/hi";
import {
  addFinishedSubtask,
  changeTaskStatus,
  deleteSelectedTask,
  getList,
  removeFinishedSubtask,
} from "../services/apiTasks";
import SelectStatus from "../ui/SelectStatus";
import TaskOptionBox from "../ui/TaskOptionBox";

function TaskDetailModal() {
  const {
    onTasksLoading,
    onShowTask,
    isLoading,
    onIsLoading,
    selectedTask,
    onSelectedTaskData,
    indexArray,
    onAllTask,
    selectedStatus,
    onSelectedStatus,
    onEditOpen,
  } = usePlatform();

  const [selectedSubtask, setSelectedSubtask] = useState([]);
  const [showTheOption, setShowTheOption] = useState(false);
  const initialRender = useRef(false);

  // ----------------------------
  // Updating task status:
  useEffect(() => {
    const updatedTaskObject = { ...selectedTask, taskStatus: selectedStatus };

    if (initialRender.current) {
      const updateTaskStatus = async (id, updatedTaskObject) => {
        onIsLoading(true);
        const getNewStatus = await changeTaskStatus(id, updatedTaskObject);
        onIsLoading(false);
      };

      updateTaskStatus(selectedTask.id, updatedTaskObject);
    }

    initialRender.current = true;
  }, [selectedStatus]);

  // ----------------------------
  // Checking the finished subtasks on initial render:
  useEffect(() => {
    selectedTask.subtasks?.map((element, index) => {
      if (selectedTask.finishedSubtasks?.includes(element)) {
        indexArray.push(index);
      }
    });
    setSelectedSubtask(indexArray);
  }, [selectedTask]);

  // ----------------------------
  // Closing TaskDetailModal:
  const handleCloseModal = (e) => {
    if (e.target) {
      onShowTask((showTask) => !showTask);

      const updateAllTasks = async () => {
        const getTasks = await getList();
        onAllTask(getTasks);
      };
      updateAllTasks();
    }
  };

  // ----------------------------
  // Checking and unchecking the checkboxes:
  const handleCheckbox = (e) => {
    let isSelected = e.target.checked;
    let selectedValue = parseInt(e.target.value);
    if (isSelected) {
      setSelectedSubtask([...selectedSubtask, selectedValue]);

      const checkedList = {
        ...selectedTask,
        finishedSubtasks: [
          ...selectedTask.finishedSubtasks,
          selectedTask.subtasks[selectedValue],
        ],
      };
      const addToFinishedSubtaskList = async (id, checkedList) => {
        onIsLoading(true);
        const updatedSelectedTask = await addFinishedSubtask(id, checkedList);
        onSelectedTaskData(updatedSelectedTask);
        onIsLoading(false);
      };

      addToFinishedSubtaskList(selectedTask.id, checkedList);
    } else {
      setSelectedSubtask((prevFinishedSubtasks) =>
        prevFinishedSubtasks.filter((subIndex) => subIndex !== selectedValue),
      );

      const unfinishedSubtask = selectedTask.finishedSubtasks.filter(
        (finishedSubtask) =>
          finishedSubtask !== selectedTask.subtasks[selectedValue],
      );

      const finishedSubtasksList = {
        ...selectedTask,
        finishedSubtasks: unfinishedSubtask,
      };

      const removeFromFinishedSubtasks = async (id, finishedSubtasksList) => {
        onIsLoading(true);
        const updatedSelectedTask = await removeFinishedSubtask(
          id,
          finishedSubtasksList,
        );
        onSelectedTaskData(updatedSelectedTask);
        onIsLoading(false);
      };

      removeFromFinishedSubtasks(selectedTask.id, finishedSubtasksList);
    }
  };

  // ----------------------------
  // Deleting task:
  const handleDeleteTask = () => {
    if (
      confirm(
        `Are you sure that you want to delete task "${selectedTask.title}"`,
      )
    ) {
      const deleteTask = async (id) => {
        const deleteTask = await deleteSelectedTask(id);
        onShowTask((showTask) => !showTask);

        onTasksLoading(true);
        const getTasks = await getList();
        onAllTask(getTasks);
        onTasksLoading(false);
      };

      deleteTask(selectedTask.id);
    }
  };

  // ----------------------------
  // Display editing modal:
  const handleEditTask = () => {
    onEditOpen((editIsOpen) => !editIsOpen);
    onShowTask((showTask) => !showTask);
  };

  return (
    <>
      <div
        className="bg-add-item-modal-bg-color absolute bottom-0 left-0 right-0 top-0 z-10"
        onClick={handleCloseModal}
      ></div>

      <div className="bg-bkg-color text-light-title-font-color dark:text-font-color dark:bg-dark-bg-color fixed left-[50%] top-[50%] z-20 w-[500px] -translate-x-1/2 -translate-y-1/2 transform overflow-auto rounded-md p-8">
        <div className="relative flex h-full w-full flex-col justify-between">
          {isLoading ? (
            <Spinner />
          ) : (
            <>
              <div className="relative flex justify-between">
                <h3 className="text-light-title-font-color dark:text-font-color text-lg font-bold tracking-wide">
                  {selectedTask.title}
                </h3>
                <span
                  onClick={() =>
                    setShowTheOption((showTheOption) => !showTheOption)
                  }
                  className="text-sidebar-font-color hover:text-purple-color cursor-pointer self-center text-2xl transition-all duration-300"
                >
                  <HiOutlineDotsVertical />
                </span>
                {showTheOption && (
                  <TaskOptionBox
                    onEditTask={handleEditTask}
                    onDeleteTask={handleDeleteTask}
                  />
                )}
              </div>

              <p className="text-sidebar-font-color mt-3 text-sm font-semibold">
                {selectedTask.description}
              </p>

              <span className="text-sidebar-font-color dark:text-font-color mb-3 mt-6 inline-block text-sm font-semibold tracking-wide">
                Subtasks ({`${selectedTask.finishedSubtasks.length} `} of
                {` ${selectedTask.subtasks.length}`})
              </span>

              {selectedTask.subtasks.map((selectedTasksubtask, index) => (
                <div
                  key={index}
                  className="bg-app-bg-color dark:bg-dark-border-color mb-3 rounded-md px-4 py-2"
                >
                  <input
                    type="checkbox"
                    className="accent-purple-color h-4 w-4 bg-slate-500 align-middle"
                    value={index}
                    checked={selectedSubtask?.includes(index)}
                    onChange={handleCheckbox}
                  />
                  <span
                    className={`ml-5 text-sm font-semibold ${selectedSubtask?.includes(index) && "text-sidebar-font-color dark:text-sidebar-font-color line-through"} dark:text-font-color dark:font-medium`}
                  >
                    {selectedTasksubtask}
                  </span>
                </div>
              ))}

              <label
                htmlFor="selctedTask-status"
                className="text-sidebar-font-color dark:text-font-color mt-6 inline-block text-sm font-semibold tracking-wide"
              >
                Status
              </label>
              <SelectStatus
                id="selctedTask-status"
                value={selectedStatus}
                onChange={(e) => onSelectedStatus(e.target.value)}
              />
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default TaskDetailModal;
