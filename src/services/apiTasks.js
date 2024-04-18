const LIST_URL = "https://660424af2393662c31d0b94c.mockapi.io/list";

export const getList = async () => {
  const res = await fetch(`${LIST_URL}`);

  if (!res.ok) throw new Error("Getting the list of tasks failed!");

  const data = await res.json();
  return data;
};

export const getSelectedTaskData = async (id) => {
  const getSelectedTask = await fetch(`${LIST_URL}/${id}`);

  if (!getSelectedTask.ok) throw new Error("Getting selected task failed!");

  const selectedTask = await getSelectedTask.json();
  return selectedTask;
};

export const createNewTask = async (newTask) => {
  try {
    const postTask = await fetch(`${LIST_URL}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newTask),
    });
    const data = await postTask.json();
  } catch (err) {
    console.error(err.message);
  }
};

export const addFinishedSubtask = async (id, checkedList) => {
  try {
    const finishedSubtask = await fetch(`${LIST_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(checkedList),
    });
    const updatedSelectedTask = await finishedSubtask.json();
    return updatedSelectedTask;
  } catch (err) {
    console.error(err.message);
  }
};

export const removeFinishedSubtask = async (id, finishedSubtasksList) => {
  try {
    const finishedSubtask = await fetch(`${LIST_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(finishedSubtasksList),
    });

    const updatedSelectedTask = await finishedSubtask.json();
    return updatedSelectedTask;
  } catch (err) {
    console.error(err.message);
  }
};

export const changeTaskStatus = async (id, updatedTaskObject) => {
  try {
    const newSelectedStatus = await fetch(`${LIST_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedTaskObject),
    });
    const updatedSelectedStatus = await newSelectedStatus.json();
  } catch (err) {
    console.error(err.message);
  }
};

export const deleteSelectedTask = async (id) => {
  try {
    const finishedSubtask = await fetch(`${LIST_URL}/${id}`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
      },
    });
  } catch (err) {
    console.error(err.message);
  }
};

export const editSelectedTask = async (id, editedTask) => {
  try {
    const editTask = await fetch(`${LIST_URL}/${id}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(editedTask),
    });
  } catch (err) {
    console.error(err.message);
  }
};
