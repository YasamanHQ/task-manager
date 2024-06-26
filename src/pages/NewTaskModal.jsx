import { useState } from "react";
import { IoClose } from "react-icons/io5";
import { usePlatform } from "../features/platform/PlatformContext";
import { useForm } from "react-hook-form";
import Input from "../ui/Input";
import Button from "../ui/Button";
import SelectStatus from "../ui/SelectStatus";
import { createNewTask, editSelectedTask, getList } from "../services/apiTasks";
import Error from "../ui/Error";

function NewTaskModal({ isOpen, onOpen }) {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const {
    onAllTask,
    onTasksLoading,
    editIsOpen,
    onEditOpen,
    selectedTask,
    selectedStatus,
    onSelectedStatus,
  } = usePlatform();

  // New task states:
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [newSubtasks, setNewSubtasks] = useState([""]);
  const [newStatus, setNewStatus] = useState("Todo");

  // edit task states:
  const [selectedTitle, setSelectedTitle] = useState(selectedTask.title);
  const [selectedDescription, setSelectedDescription] = useState(
    selectedTask.description,
  );
  const [selectedSubtasks, setSelectedSubtasks] = useState(
    selectedTask.subtasks,
  );

  const handleCloseModal = (e) => {
    if (e.target) {
      if (isOpen) {
        onOpen((isOpen) => !isOpen);
      }
      if (editIsOpen) {
        onEditOpen((editIsOpen) => !editIsOpen);
      }
    }
  };

  const handleAddSubtask = (e) => {
    e.preventDefault();
    if (editIsOpen) {
      setSelectedSubtasks([...selectedSubtasks, ""]);
    } else {
      setNewSubtasks([...newSubtasks, ""]);
    }
  };

  const handleSubmitNewTask = async (e) => {
    if (!newTitle || newSubtasks.includes("") || !newDescription)
      throw new Error("Field is empty!");

    onOpen((isOpen) => !isOpen);

    const newTask = {
      title: newTitle,
      description: newDescription,
      subtasks: newSubtasks,
      finishedSubtasks: [],
      taskStatus: newStatus,
      id: new Date(),
    };

    onTasksLoading(true);
    const createNewTak = await createNewTask(newTask);
    const updatedTasks = await getList();
    onAllTask(updatedTasks);
    onTasksLoading(false);
  };

  const handleEditTask = async (id) => {
    const editedTask = {
      title: selectedTitle,
      description: selectedDescription,
      subtasks: selectedSubtasks,
      finishedSubtasks: selectedTask.finishedSubtasks,
      taskStatus: selectedStatus,
      id: selectedTask.id,
    };

    onTasksLoading(true);
    const createNewTak = await editSelectedTask(id, editedTask);
    onEditOpen((editIsOpen) => !editIsOpen);

    const updatedTasks = await getList();
    onAllTask(updatedTasks);
    onTasksLoading(false);
  };

  return (
    <>
      <div
        className="bg-add-item-modal-bg-color absolute bottom-0 left-0 right-0 top-0 z-10"
        onClick={handleCloseModal}
      ></div>

      <div className="bg-bkg-color text-light-title-font-color dark:text-font-color dark:bg-dark-bg-color fixed left-[50%] top-[5%] z-20 h-[580px] w-[500px] -translate-x-1/2 transform overflow-auto rounded-md p-8">
        <h3 className="text-lg font-semibold tracking-wide"> Add New Task </h3>

        <form>
          <label htmlFor="title" className="input-label">
            Title
          </label>
          {errors.title && <Error />}
          <Input
            id="title"
            placeholder="e.g. Take coffee break"
            value={editIsOpen ? selectedTitle : newTitle}
            onChange={(e) =>
              editIsOpen
                ? setSelectedTitle(e.target.value)
                : setNewTitle(e.target.value)
            }
            register={register}
          />

          <label htmlFor="description" className="input-label">
            Description
          </label>
          {errors.description && <Error />}
          <Input
            id="description"
            className="description-textarea"
            placeholder="e.g. It's always good to take a break. This 15 minute break will recharge the batteries a little."
            value={editIsOpen ? selectedDescription : newDescription}
            onChange={(e) =>
              editIsOpen
                ? setSelectedDescription(e.target.value)
                : setNewDescription(e.target.value)
            }
            register={register}
          />

          <label htmlFor="subtask" className="input-label">
            Subtasks
          </label>
          {editIsOpen
            ? selectedSubtasks.map((input, index) => (
                <div key={index} className="mb-2">
                  {errors[index] && <Error />}

                  <div className="flex items-center gap-3">
                    <Input
                      id={index}
                      value={input}
                      onChange={(e) => {
                        const newInputs = [...selectedSubtasks];
                        newInputs[index] = e.target.value;
                        setSelectedSubtasks(newInputs);
                      }}
                      register={register}
                    />

                    <span
                      className="text-sidebar-font-color hover:text-red-color mt-2 cursor-pointer text-3xl transition-all duration-300 hover:opacity-80"
                      onClick={() => {
                        const newInputs = selectedSubtasks.filter(
                          (_, i) => i !== index,
                        );
                        setSelectedSubtasks(newInputs);
                      }}
                    >
                      <IoClose />
                    </span>
                  </div>
                </div>
              ))
            : newSubtasks.map((input, index) => (
                <div key={index} className="mb-2">
                  {errors[index] && <Error />}

                  <div className="flex items-center gap-3">
                    <Input
                      id={index}
                      value={input}
                      onChange={(e) => {
                        const newInputs = [...newSubtasks];
                        newInputs[index] = e.target.value;
                        setNewSubtasks(newInputs);
                      }}
                      register={register}
                    />

                    <span
                      className="text-sidebar-font-color hover:text-red-color mt-2 cursor-pointer text-3xl transition-all duration-300 hover:opacity-80"
                      onClick={() => {
                        const newInputs = newSubtasks.filter(
                          (_, i) => i !== index,
                        );
                        setNewSubtasks(newInputs);
                      }}
                    >
                      <IoClose />
                    </span>
                  </div>
                </div>
              ))}

          <Button
            className="hover:bg-hover-button-purple-color bg-purple-color dark:text-purple-color dark:hover:bg-purple-color text-font-color dark:bg-font-color dark:hover:text-font-color mt-2"
            onClick={handleAddSubtask}
          >
            +Add New Subtask
          </Button>

          <label htmlFor="status" className="input-label">
            Status
          </label>
          <SelectStatus
            id="status"
            value={editIsOpen ? selectedStatus : newStatus}
            onChange={(e) =>
              editIsOpen
                ? onSelectedStatus(e.target.value)
                : setNewStatus(e.target.value)
            }
          />

          {editIsOpen ? (
            <Button
              type="submit"
              onClick={handleSubmit(() => handleEditTask(selectedTask.id))}
              className="hover:bg-hover-button-purple-color dark:hover:text-purple-color dark:hover:bg-font-color mt-8"
            >
              Edit Task
            </Button>
          ) : (
            <Button
              type="submit"
              onClick={handleSubmit(handleSubmitNewTask)}
              className="hover:bg-hover-button-purple-color dark:hover:text-purple-color dark:hover:bg-font-color mt-8"
            >
              Create Task
            </Button>
          )}
        </form>
      </div>
    </>
  );
}

export default NewTaskModal;
