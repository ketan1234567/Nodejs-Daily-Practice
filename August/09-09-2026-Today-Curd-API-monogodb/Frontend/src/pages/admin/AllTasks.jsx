import { useEffect, useState } from "react";

import {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
} from "../../services/taskService";

import { getUsers } from "../../services/userService";


function AllTasks() {

  // ======================================
  // STATE
  // ======================================

  const [tasks, setTasks] = useState([]);
  const [users, setUsers] = useState([]);

  const [loading, setLoading] = useState(true);

  const [showCreateModal, setShowCreateModal] =
    useState(false);

  const [showEditModal, setShowEditModal] =
    useState(false);

  const [creating, setCreating] =
    useState(false);

  const [updating, setUpdating] =
    useState(false);


  // ======================================
  // CREATE FORM STATE
  // ======================================

  const [formData, setFormData] = useState({

    title: "",
    description: "",
    assignedTo: "",
    priority: "Medium",
    status: "Pending",
    dueDate: "",

  });


  // ======================================
  // EDIT TASK ID
  // ======================================

  const [editingTaskId, setEditingTaskId] =
    useState(null);


  // ======================================
  // GET ALL TASKS
  // ======================================

  const loadTasks = async () => {

    try {

      setLoading(true);

      const data = await getTasks();

      console.log(
        "Tasks API Response:",
        data
      );

      setTasks(data.tasks || []);

    } catch (error) {

      console.error(
        "Get Tasks Error:",
        error
      );

      alert(
        error.response?.data?.message ||
        "Failed to load tasks"
      );

    } finally {

      setLoading(false);

    }
  };


  // ======================================
  // GET USERS
  // ======================================

  const loadUsers = async () => {

    try {

      const data = await getUsers();

      console.log(
        "Users API Response:",
        data
      );

      // Only normal users
      const normalUsers =
        (data.users || []).filter(
          (user) => user.role === "user"
        );

      setUsers(normalUsers);

    } catch (error) {

      console.error(
        "Get Users Error:",
        error
      );

      alert(
        error.response?.data?.message ||
        "Failed to load users"
      );

    }
  };


  // ======================================
  // PAGE LOAD
  // ======================================

  useEffect(() => {

    loadTasks();
    loadUsers();

  }, []);


  // ======================================
  // FORM INPUT CHANGE
  // ======================================

  const handleInputChange = (e) => {

    const {
      name,
      value,
    } = e.target;

    setFormData((prev) => ({

      ...prev,

      [name]: value,

    }));

  };


  // ======================================
  // OPEN CREATE MODAL
  // ======================================

  const handleOpenCreateModal = () => {

    setFormData({

      title: "",
      description: "",
      assignedTo: "",
      priority: "Medium",
      status: "Pending",
      dueDate: "",

    });

    setShowCreateModal(true);

  };


  // ======================================
  // CLOSE CREATE MODAL
  // ======================================

  const handleCloseCreateModal = () => {

    if (creating) {
      return;
    }

    setShowCreateModal(false);

  };


  // ======================================
  // CREATE TASK
  // ======================================

  const handleCreateTask = async (e) => {

    e.preventDefault();


    // Basic validation

    if (!formData.title.trim()) {

      alert("Task title is required");

      return;

    }


    if (!formData.assignedTo) {

      alert("Please select a user");

      return;

    }


    try {

      setCreating(true);


      const taskData = {

        title: formData.title,

        description: formData.description,

        assignedTo: formData.assignedTo,

        priority: formData.priority,

        status: formData.status,

        dueDate:
          formData.dueDate || undefined,

      };


      console.log(
        "Creating Task:",
        taskData
      );


      const response =
        await createTask(taskData);


      console.log(
        "Create Task Response:",
        response
      );


      alert(
        "Task created successfully"
      );


      // Close modal

      setShowCreateModal(false);


      // Reset form

      setFormData({

        title: "",
        description: "",
        assignedTo: "",
        priority: "Medium",
        status: "Pending",
        dueDate: "",

      });


      // Reload tasks

      await loadTasks();


    } catch (error) {

      console.error(
        "Create Task Error:",
        error
      );

      alert(
        error.response?.data?.message ||
        "Failed to create task"
      );

    } finally {

      setCreating(false);

    }

  };


  // ======================================
  // OPEN EDIT MODAL
  // ======================================

  const handleEdit = (task) => {

    console.log(
      "Editing Task:",
      task
    );


    setEditingTaskId(task._id);


    setFormData({

      title: task.title || "",

      description:
        task.description || "",

      assignedTo:
        task.assignedTo?._id ||
        task.assignedTo ||
        "",

      priority:
        task.priority || "Medium",

      status:
        task.status || "Pending",

      dueDate: task.dueDate
        ? new Date(task.dueDate)
            .toISOString()
            .split("T")[0]
        : "",

    });


    setShowEditModal(true);

  };


  // ======================================
  // CLOSE EDIT MODAL
  // ======================================

  const handleCloseEditModal = () => {

    if (updating) {
      return;
    }

    setShowEditModal(false);

    setEditingTaskId(null);

  };


  // ======================================
  // UPDATE TASK
  // ======================================

  const handleUpdateTask = async (e) => {

    e.preventDefault();


    // Basic validation

    if (!formData.title.trim()) {

      alert("Task title is required");

      return;

    }


    if (!formData.assignedTo) {

      alert("Please select a user");

      return;

    }


    try {

      setUpdating(true);


      const taskData = {

        title: formData.title,

        description: formData.description,

        assignedTo: formData.assignedTo,

        priority: formData.priority,

        status: formData.status,

        dueDate:
          formData.dueDate || undefined,

      };


      console.log(
        "Updating Task:",
        editingTaskId
      );

      console.log(
        "Update Task Data:",
        taskData
      );


      const response =
        await updateTask(
          editingTaskId,
          taskData
        );


      console.log(
        "Update Task Response:",
        response
      );


      alert(
        "Task updated successfully"
      );


      // Close modal

      setShowEditModal(false);

      setEditingTaskId(null);


      // Reset form

      setFormData({

        title: "",
        description: "",
        assignedTo: "",
        priority: "Medium",
        status: "Pending",
        dueDate: "",

      });


      // Reload tasks

      await loadTasks();


    } catch (error) {

      console.error(
        "Update Task Error:",
        error
      );

      console.log(
        "Status:",
        error.response?.status
      );

      console.log(
        "Backend Response:",
        error.response?.data
      );


      alert(
        error.response?.data?.message ||
        "Failed to update task"
      );

    } finally {

      setUpdating(false);

    }

  };


  // ======================================
  // DELETE TASK
  // ======================================

  const handleDelete = async (id) => {

    const confirmDelete =
      window.confirm(
        "Are you sure you want to delete this task?"
      );


    if (!confirmDelete) {

      return;

    }


    try {

      await deleteTask(id);


      setTasks((prevTasks) =>
        prevTasks.filter(
          (task) => task._id !== id
        )
      );


      alert(
        "Task deleted successfully"
      );


    } catch (error) {

      console.error(
        "Delete Task Error:",
        error
      );


      alert(
        error.response?.data?.message ||
        "Failed to delete task"
      );

    }

  };


  // ======================================
  // LOADING
  // ======================================

  if (loading) {

    return (

      <div className="text-center mt-5">

        <h5>
          Loading tasks...
        </h5>

      </div>

    );

  }


  // ======================================
  // UI
  // ======================================

  return (

    <div>


      {/* ==================================
          HEADER
      ================================== */}

      <div className="d-flex justify-content-between align-items-center mb-4">

        <h2>
          All Tasks
        </h2>


        <button
          className="btn btn-primary"
          onClick={
            handleOpenCreateModal
          }
        >
          + Create Task
        </button>

      </div>


      {/* ==================================
          TASK TABLE
      ================================== */}

      <div className="card shadow-sm">

        <div className="card-body">

          <div className="table-responsive">

            <table className="table table-hover">

              <thead>

                <tr>

                  <th>#</th>

                  <th>Task</th>

                  <th>Assigned To</th>

                  <th>Priority</th>

                  <th>Status</th>

                  <th>Due Date</th>

                  <th>Action</th>

                </tr>

              </thead>


              <tbody>

                {tasks.length === 0 ? (

                  <tr>

                    <td
                      colSpan="7"
                      className="text-center"
                    >
                      No tasks found
                    </td>

                  </tr>

                ) : (

                  tasks.map(
                    (task, index) => (

                      <tr
                        key={task._id}
                      >


                        {/* NUMBER */}

                        <td>
                          {index + 1}
                        </td>


                        {/* TASK */}

                        <td>

                          <strong>
                            {task.title}
                          </strong>


                          {task.description && (

                            <div className="text-muted small">

                              {task.description}

                            </div>

                          )}

                        </td>


                        {/* ASSIGNED TO */}

                        <td>

                          {task.assignedTo?.name ||
                            "N/A"}

                        </td>


                        {/* PRIORITY */}

                        <td>

                          <span
                            className={`badge ${
                              task.priority ===
                              "High"
                                ? "bg-danger"
                                : task.priority ===
                                  "Medium"
                                ? "bg-warning text-dark"
                                : "bg-success"
                            }`}
                          >

                            {task.priority}

                          </span>

                        </td>


                        {/* STATUS */}

                        <td>

                          <span
                            className={`badge ${
                              task.status ===
                              "Completed"
                                ? "bg-success"
                                : task.status ===
                                  "In Progress"
                                ? "bg-warning text-dark"
                                : "bg-secondary"
                            }`}
                          >

                            {task.status}

                          </span>

                        </td>


                        {/* DUE DATE */}

                        <td>

                          {task.dueDate

                            ? new Date(
                                task.dueDate
                              ).toLocaleDateString(
                                "en-IN",
                                {
                                  day: "2-digit",
                                  month: "short",
                                  year: "numeric",
                                }
                              )

                            : "N/A"}

                        </td>


                        {/* ACTIONS */}

                        <td>

                          <button
                            className="btn btn-sm btn-warning me-2"
                            onClick={() =>
                              handleEdit(
                                task
                              )
                            }
                          >
                            Edit
                          </button>


                          <button
                            className="btn btn-sm btn-danger"
                            onClick={() =>
                              handleDelete(
                                task._id
                              )
                            }
                          >
                            Delete
                          </button>

                        </td>


                      </tr>

                    )
                  )

                )}

              </tbody>

            </table>

          </div>

        </div>

      </div>


      {/* ==================================
          CREATE TASK MODAL
      ================================== */}

      {showCreateModal && (

        <div
          className="modal fade show d-block"
          tabIndex="-1"
          style={{
            backgroundColor:
              "rgba(0,0,0,0.5)",
          }}
        >

          <div className="modal-dialog modal-lg">

            <div className="modal-content">


              {/* HEADER */}

              <div className="modal-header">

                <h5 className="modal-title">
                  Create Task
                </h5>


                <button
                  type="button"
                  className="btn-close"
                  onClick={
                    handleCloseCreateModal
                  }
                ></button>

              </div>


              {/* FORM */}

              <form
                onSubmit={
                  handleCreateTask
                }
              >

                <div className="modal-body">


                  {/* TITLE */}

                  <div className="mb-3">

                    <label className="form-label">
                      Task Title
                    </label>

                    <input
                      type="text"
                      name="title"
                      className="form-control"
                      placeholder="Enter task title"
                      value={
                        formData.title
                      }
                      onChange={
                        handleInputChange
                      }
                      required
                    />

                  </div>


                  {/* DESCRIPTION */}

                  <div className="mb-3">

                    <label className="form-label">
                      Description
                    </label>

                    <textarea
                      name="description"
                      className="form-control"
                      rows="3"
                      placeholder="Enter task description"
                      value={
                        formData.description
                      }
                      onChange={
                        handleInputChange
                      }
                    ></textarea>

                  </div>


                  {/* ASSIGNED TO */}

                  <div className="mb-3">

                    <label className="form-label">
                      Assign To
                    </label>

                    <select
                      name="assignedTo"
                      className="form-select"
                      value={
                        formData.assignedTo
                      }
                      onChange={
                        handleInputChange
                      }
                      required
                    >

                      <option value="">
                        Select User
                      </option>


                      {users.map(
                        (user) => (

                          <option
                            key={user._id}
                            value={user._id}
                          >

                            {user.name} (
                            {user.email})

                          </option>

                        )
                      )}

                    </select>


                    {users.length ===
                      0 && (

                      <small className="text-danger">

                        No normal users
                        found. Create a
                        user first.

                      </small>

                    )}

                  </div>


                  {/* PRIORITY */}

                  <div className="mb-3">

                    <label className="form-label">
                      Priority
                    </label>

                    <select
                      name="priority"
                      className="form-select"
                      value={
                        formData.priority
                      }
                      onChange={
                        handleInputChange
                      }
                    >

                      <option value="Low">
                        Low
                      </option>

                      <option value="Medium">
                        Medium
                      </option>

                      <option value="High">
                        High
                      </option>

                    </select>

                  </div>


                  {/* STATUS */}

                  <div className="mb-3">

                    <label className="form-label">
                      Status
                    </label>

                    <select
                      name="status"
                      className="form-select"
                      value={
                        formData.status
                      }
                      onChange={
                        handleInputChange
                      }
                    >

                      <option value="Pending">
                        Pending
                      </option>

                      <option value="In Progress">
                        In Progress
                      </option>

                      <option value="Completed">
                        Completed
                      </option>

                    </select>

                  </div>


                  {/* DUE DATE */}

                  <div className="mb-3">

                    <label className="form-label">
                      Due Date
                    </label>

                    <input
                      type="date"
                      name="dueDate"
                      className="form-control"
                      value={
                        formData.dueDate
                      }
                      onChange={
                        handleInputChange
                      }
                    />

                  </div>


                </div>


                {/* FOOTER */}

                <div className="modal-footer">

                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={
                      handleCloseCreateModal
                    }
                    disabled={creating}
                  >
                    Cancel
                  </button>


                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={creating}
                  >

                    {creating
                      ? "Creating..."
                      : "Create Task"}

                  </button>

                </div>


              </form>

            </div>

          </div>

        </div>

      )}


      {/* ==================================
          EDIT TASK MODAL
      ================================== */}

      {showEditModal && (

        <div
          className="modal fade show d-block"
          tabIndex="-1"
          style={{
            backgroundColor:
              "rgba(0,0,0,0.5)",
          }}
        >

          <div className="modal-dialog modal-lg">

            <div className="modal-content">


              {/* HEADER */}

              <div className="modal-header">

                <h5 className="modal-title">
                  Edit Task
                </h5>


                <button
                  type="button"
                  className="btn-close"
                  onClick={
                    handleCloseEditModal
                  }
                  disabled={updating}
                ></button>

              </div>


              {/* FORM */}

              <form
                onSubmit={
                  handleUpdateTask
                }
              >

                <div className="modal-body">


                  {/* TITLE */}

                  <div className="mb-3">

                    <label className="form-label">
                      Task Title
                    </label>

                    <input
                      type="text"
                      name="title"
                      className="form-control"
                      placeholder="Enter task title"
                      value={
                        formData.title
                      }
                      onChange={
                        handleInputChange
                      }
                      required
                    />

                  </div>


                  {/* DESCRIPTION */}

                  <div className="mb-3">

                    <label className="form-label">
                      Description
                    </label>

                    <textarea
                      name="description"
                      className="form-control"
                      rows="3"
                      placeholder="Enter task description"
                      value={
                        formData.description
                      }
                      onChange={
                        handleInputChange
                      }
                    ></textarea>

                  </div>


                  {/* ASSIGNED TO */}

                  <div className="mb-3">

                    <label className="form-label">
                      Assign To
                    </label>

                    <select
                      name="assignedTo"
                      className="form-select"
                      value={
                        formData.assignedTo
                      }
                      onChange={
                        handleInputChange
                      }
                      required
                    >

                      <option value="">
                        Select User
                      </option>


                      {users.map(
                        (user) => (

                          <option
                            key={user._id}
                            value={user._id}
                          >

                            {user.name} (
                            {user.email})

                          </option>

                        )
                      )}

                    </select>

                  </div>


                  {/* PRIORITY */}

                  <div className="mb-3">

                    <label className="form-label">
                      Priority
                    </label>

                    <select
                      name="priority"
                      className="form-select"
                      value={
                        formData.priority
                      }
                      onChange={
                        handleInputChange
                      }
                    >

                      <option value="Low">
                        Low
                      </option>

                      <option value="Medium">
                        Medium
                      </option>

                      <option value="High">
                        High
                      </option>

                    </select>

                  </div>


                  {/* STATUS */}

                  <div className="mb-3">

                    <label className="form-label">
                      Status
                    </label>

                    <select
                      name="status"
                      className="form-select"
                      value={
                        formData.status
                      }
                      onChange={
                        handleInputChange
                      }
                    >

                      <option value="Pending">
                        Pending
                      </option>

                      <option value="In Progress">
                        In Progress
                      </option>

                      <option value="Completed">
                        Completed
                      </option>

                    </select>

                  </div>


                  {/* DUE DATE */}

                  <div className="mb-3">

                    <label className="form-label">
                      Due Date
                    </label>

                    <input
                      type="date"
                      name="dueDate"
                      className="form-control"
                      value={
                        formData.dueDate
                      }
                      onChange={
                        handleInputChange
                      }
                    />

                  </div>


                </div>


                {/* FOOTER */}

                <div className="modal-footer">

                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={
                      handleCloseEditModal
                    }
                    disabled={updating}
                  >
                    Cancel
                  </button>


                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={updating}
                  >

                    {updating
                      ? "Updating..."
                      : "Save Changes"}

                  </button>

                </div>


              </form>

            </div>

          </div>

        </div>

      )}

    </div>

  );

}

export default AllTasks;