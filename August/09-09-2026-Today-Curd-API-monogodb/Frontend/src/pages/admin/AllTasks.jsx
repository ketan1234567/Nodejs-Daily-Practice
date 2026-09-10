import { useState } from "react";

function AllTasks() {
  const [showModal, setShowModal] = useState(false);

  const [task, setTask] = useState({
    title: "",
    description: "",
    assignedTo: "",
    priority: "Medium",
    status: "Pending",
    dueDate: "",
  });

  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: "Build Login Page",
      assignedTo: "Rahul",
      priority: "High",
      status: "In Progress",
    },
  ]);

  const handleChange = (e) => {
    setTask({
      ...task,
      [e.target.name]: e.target.value,
    });
  };

  const handleCreateTask = (e) => {
    e.preventDefault();

    const newTask = {
      id: Date.now(),
      title: task.title,
      assignedTo: task.assignedTo,
      priority: task.priority,
      status: task.status,
    };

    setTasks([...tasks, newTask]);

    setTask({
      title: "",
      description: "",
      assignedTo: "",
      priority: "Medium",
      status: "Pending",
      dueDate: "",
    });

    setShowModal(false);
  };

  return (
    <div className="container-fluid">

      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>All Tasks</h1>

        <button
          className="btn btn-primary"
          onClick={() => setShowModal(true)}
        >
          + Create Task
        </button>
      </div>

      {/* Task Table */}
      <div className="card shadow-sm">
        <div className="card-body">

          <div className="table-responsive">
            <table className="table align-middle">
              <thead>
                <tr>
                  <th>Task</th>
                  <th>Assigned To</th>
                  <th>Priority</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {tasks.map((item) => (
                  <tr key={item.id}>

                    <td>{item.title}</td>

                    <td>{item.assignedTo}</td>

                    <td>
                      <span
                        className={`badge ${
                          item.priority === "High"
                            ? "bg-danger"
                            : item.priority === "Medium"
                            ? "bg-warning text-dark"
                            : "bg-success"
                        }`}
                      >
                        {item.priority}
                      </span>
                    </td>

                    <td>
                      <span className="badge bg-warning text-dark">
                        {item.status}
                      </span>
                    </td>

                    <td>
                      <button className="btn btn-warning btn-sm me-2">
                        Edit
                      </button>

                      <button className="btn btn-danger btn-sm">
                        Delete
                      </button>
                    </td>

                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>
      </div>

      {/* Create Task Modal */}
      {showModal && (
        <div
          className="modal d-block"
          tabIndex="-1"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog modal-lg modal-dialog-centered">
            <div className="modal-content">

              {/* Modal Header */}
              <div className="modal-header">
                <h5 className="modal-title">
                  Create New Task
                </h5>

                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowModal(false)}
                ></button>
              </div>

              {/* Form */}
              <form onSubmit={handleCreateTask}>

                <div className="modal-body">

                  {/* Task Title */}
                  <div className="mb-3">
                    <label className="form-label">
                      Task Title
                    </label>

                    <input
                      type="text"
                      name="title"
                      className="form-control"
                      placeholder="Enter task title"
                      value={task.title}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  {/* Description */}
                  <div className="mb-3">
                    <label className="form-label">
                      Description
                    </label>

                    <textarea
                      name="description"
                      className="form-control"
                      rows="3"
                      placeholder="Enter task description"
                      value={task.description}
                      onChange={handleChange}
                    ></textarea>
                  </div>

                  <div className="row">

                    {/* Assign User */}
                    <div className="col-md-6 mb-3">
                      <label className="form-label">
                        Assign To
                      </label>

                      <select
                        name="assignedTo"
                        className="form-select"
                        value={task.assignedTo}
                        onChange={handleChange}
                        required
                      >
                        <option value="">
                          Select User
                        </option>

                        <option value="Rahul">
                          Rahul
                        </option>

                        <option value="Amit">
                          Amit
                        </option>

                        <option value="Priya">
                          Priya
                        </option>
                      </select>
                    </div>

                    {/* Priority */}
                    <div className="col-md-6 mb-3">
                      <label className="form-label">
                        Priority
                      </label>

                      <select
                        name="priority"
                        className="form-select"
                        value={task.priority}
                        onChange={handleChange}
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

                  </div>

                  <div className="row">

                    {/* Status */}
                    <div className="col-md-6 mb-3">
                      <label className="form-label">
                        Status
                      </label>

                      <select
                        name="status"
                        className="form-select"
                        value={task.status}
                        onChange={handleChange}
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

                    {/* Due Date */}
                    <div className="col-md-6 mb-3">
                      <label className="form-label">
                        Due Date
                      </label>

                      <input
                        type="date"
                        name="dueDate"
                        className="form-control"
                        value={task.dueDate}
                        onChange={handleChange}
                      />
                    </div>

                  </div>

                </div>

                {/* Modal Footer */}
                <div className="modal-footer">

                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => setShowModal(false)}
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    className="btn btn-primary"
                  >
                    Create Task
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