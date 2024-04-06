import { useState } from "react";
import { usePlatform } from "../features/platform/PlatformContext";
import Spinner from "../ui/Spinner";
import { HiOutlineDotsVertical } from "react-icons/hi";

function TaskDetailModal() {
  const { onShowTask, isLoading, selectedtask } = usePlatform();
  // const [checkedState, setCheckedState] = useState(
  //   new Array(selectedtask.subtasks.length).fill(false),
  // );
  // console.log(selectedtask.subtasks);
  const [isChecked, setIsChecked] = useState(false);

  const handleCloseModal = (e) => {
    if (e.target) {
      onShowTask((showTask) => !showTask);
    }
  };

  function handleToggleTask(selectedTasksubtask, index) {
    setIsChecked((isChecked) => !isChecked);
    // setIsChecked(
    //   (isChecked) =>
    //     selectedTasksubtask === selectedtask.subtasks[index] && !isChecked,
    // );
    // if (isChecked) {
    //   selectedtask.finishedSubtasks.push(selectedtask.subtasks[index]);
    // }
    // console.log(selectedtask.finishedSubtasks);
  }

  // const handleOnChange = (position) => {
  //   const updatedCheckedState = checkedState.map((item, index) =>
  //     index === position ? !item : item,
  //   );

  //   setCheckedState(updatedCheckedState);
  // };

  return (
    <>
      <div
        className="absolute bottom-0 left-0 right-0 top-0 z-10 bg-[--add-item-modal-bg-color]"
        onClick={handleCloseModal}
      ></div>

      <div className="fixed left-[50%] top-[50%] z-20 h-[400px] w-[500px] -translate-x-1/2 -translate-y-1/2 transform overflow-auto rounded-md bg-[--bg-color] p-8 text-[--light-title-font-color] dark:bg-[--dark-bg-color] dark:text-[--font-color]">
        <div className="relative h-full w-full">
          {isLoading ? (
            <Spinner />
          ) : (
            <>
              <div className="flex justify-between">
                <h3 className="text-lg font-bold tracking-wide">
                  {selectedtask.title}
                </h3>
                <span className="cursor-pointer self-center text-2xl text-[--sidebar-font-color] transition-all duration-300 hover:text-[--purple-color]">
                  <HiOutlineDotsVertical />
                </span>
              </div>
              <span className="mt-6 inline-block text-xs font-bold tracking-[3px] text-[--sidebar-font-color]">
                Subtasks ({`${selectedtask.finishedSubtasks.length} `} of
                {` ${selectedtask.subtasks.length}`})
              </span>

              {selectedtask.subtasks.map((selectedTasksubtask, index) => (
                <div key={index}>
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() =>
                      handleToggleTask(selectedTasksubtask, index)
                    }
                    // checked={checkedState[index]}
                    // onChange={() => handleOnChange(index)}
                  />
                  <span> {selectedTasksubtask} </span>
                </div>
              ))}
              {/* <p> There is no subtask! </p> */}
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default TaskDetailModal;
