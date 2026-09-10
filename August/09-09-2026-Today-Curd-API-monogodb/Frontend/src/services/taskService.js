const TASK_STORAGE_KEY = "tasks";

// Get all tasks
export const getTasks = () => {
  const tasks = localStorage.getItem(TASK_STORAGE_KEY);

  return tasks ? JSON.parse(tasks) : [];
};

// Create a new task
export const createTask = (taskData) => {
  const tasks = getTasks();

  const newTask = {
    id: Date.now(),
    title: taskData.title,
    description: taskData.description,
    assignedTo: taskData.assignedTo,
    priority: taskData.priority,
    status: taskData.status,
    dueDate: taskData.dueDate,
    createdAt: new Date().toISOString(),
  };

  tasks.push(newTask);

  localStorage.setItem(
    TASK_STORAGE_KEY,
    JSON.stringify(tasks)
  );

  return newTask;
};

// Get single task
export const getTaskById = (id) => {
  const tasks = getTasks();

  return tasks.find(
    (task) => task.id === Number(id)
  );
};

// Update task
export const updateTask = (id, updatedData) => {
  const tasks = getTasks();

  const updatedTasks = tasks.map((task) =>
    task.id === Number(id)
      ? {
          ...task,
          ...updatedData,
        }
      : task
  );

  localStorage.setItem(
    TASK_STORAGE_KEY,
    JSON.stringify(updatedTasks)
  );

  return updatedTasks.find(
    (task) => task.id === Number(id)
  );
};

// Delete task
export const deleteTask = (id) => {
  const tasks = getTasks();

  const filteredTasks = tasks.filter(
    (task) => task.id !== Number(id)
  );

  localStorage.setItem(
    TASK_STORAGE_KEY,
    JSON.stringify(filteredTasks)
  );

  return true;
};