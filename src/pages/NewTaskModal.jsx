import { useState } from "react";
import { IoClose } from "react-icons/io5";
import { usePlatform } from "../features/platform/PlatformContext";

function NewTaskModal({ onOpen }) {
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [newSubtasks, setNewSubtasks] = useState([""]);
  const [newStatus, setNewStatus] = useState("Todo");

  const { onAddNewTask } = usePlatform();

  const handleCloseModal = (e) => {
    if (e.target) {
      onOpen((isOpen) => !isOpen);
    }
  };

  const handleAddSubtask = (e) => {
    e.preventDefault();

    setNewSubtasks([...newSubtasks, ""]);
  };

  const handleSubmitNewTask = (e) => {
    e.preventDefault();

    if (!newTitle || newSubtasks.includes(""))
      throw new Error("Field is empty!");

    const createNewTask = async () => {
      try {
        const postTask = await fetch(
          "https://660424af2393662c31d0b94c.mockapi.io/list",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              title: newTitle,
              description: newDescription,
              subtasks: newSubtasks,
              finishedSubtasks: [],
              taskStatus: newStatus,
            }),
          },
        );
        const data = await postTask.json();
        console.log(data);
      } catch (err) {
        console.error(new Error("Something went wrong!"));
      }
    };

    const newTask = {
      title: newTitle,
      description: newDescription,
      subtasks: newSubtasks,
      finishedSubtasks: [],
      taskStatus: newStatus,
      id: new Date(),
    };

    createNewTask();

    onAddNewTask(newTask);

    onOpen((isOpen) => !isOpen);
  };

  return (
    <>
      <div
        className="absolute bottom-0 left-0 right-0 top-0 z-10 bg-[--add-item-modal-bg-color]"
        onClick={handleCloseModal}
      ></div>

      <div className="fixed left-[50%] top-[5%] z-20 h-[580px] w-[500px] -translate-x-1/2 transform overflow-auto rounded-md bg-[--bg-color] p-8 text-[--light-title-font-color] dark:bg-[--dark-bg-color] dark:text-[--font-color]">
        <h3 className="text-lg font-semibold tracking-wide"> Add New Task </h3>

        <form onSubmit={handleSubmitNewTask}>
          <label
            htmlFor="title"
            className="mt-6 inline-block text-sm font-semibold"
          >
            Title
          </label>
          <input
            id="title"
            type="text"
            className="input"
            placeholder="e.g. Take coffee break"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
          />

          <label
            htmlFor="description"
            className="mt-6 inline-block text-sm font-semibold"
          >
            Description
          </label>
          <textarea
            id="description"
            type="text"
            className="input h-[120px] resize-none"
            placeholder="e.g. It's always good to take a break. This 15 minute break will recharge the batteries a little."
            value={newDescription}
            onChange={(e) => setNewDescription(e.target.value)}
          />

          <label
            htmlFor="subtask1"
            className="mt-6 inline-block text-sm font-semibold"
          >
            Subtasks
          </label>

          {newSubtasks.map((input, index) => (
            <div key={index} className="mb-2 flex items-center gap-3">
              <input
                type="text"
                className="input"
                value={input}
                onChange={(e) => {
                  const newInputs = [...newSubtasks];
                  newInputs[index] = e.target.value;
                  setNewSubtasks(newInputs);
                }}
              />

              <button
                className="mt-2 cursor-pointer text-3xl text-[--sidebar-font-color] transition-all duration-300 hover:text-[--purple-color]"
                onClick={() => {
                  const newInputs = newSubtasks.filter((_, i) => i !== index);
                  setNewSubtasks(newInputs);
                }}
              >
                <IoClose />
              </button>
            </div>
          ))}

          <button
            className="mt-2 h-10 w-full rounded-full bg-[--purple-color] text-sm font-semibold text-[--font-color] transition-all duration-300 hover:bg-[--hover-button-purple-color] dark:bg-[--font-color] dark:text-[--purple-color] dark:hover:bg-[--purple-color] dark:hover:text-[--font-color]"
            onClick={handleAddSubtask}
          >
            +Add New Subtask
          </button>

          <label
            htmlFor="status"
            className="mt-6 inline-block text-sm font-semibold"
          >
            Status
          </label>
          <select
            id="status"
            type="text"
            className="input text-sm dark:valid:bg-[--dark-bg-color]"
            value={newStatus}
            onChange={(e) => setNewStatus(e.target.value)}
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

          <button className="mt-8 h-10 w-full rounded-full bg-[--purple-color] text-sm font-semibold text-[--font-color] transition-all duration-300 hover:bg-[--hover-button-purple-color] dark:bg-[--purple-color] dark:text-[--font-color] dark:hover:bg-[--font-color] dark:hover:text-[--purple-color]">
            Create Task
          </button>
        </form>
      </div>
    </>
  );
}

export default NewTaskModal;
