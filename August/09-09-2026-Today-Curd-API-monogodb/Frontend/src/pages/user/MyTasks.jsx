import { useEffect, useState } from "react";

import {
  getTasks,
  updateTask,
} from "../../services/taskService";

function MyTasks() {

  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");


  // ======================================
  // LOAD MY TASKS
  // ======================================

  const loadTasks = async () => {
    try {

      setLoading(true);
      setError("");

      const response = await getTasks();

      console.log(
        "My Tasks API Response:",
        response
      );

      setTasks(response.tasks || []);

    } catch (error) {

      console.error(
        "Get My Tasks Error:",
        error
      );

      setError(
        error.response?.data?.message ||
        "Failed to load tasks"
      );

    } finally {

      setLoading(false);

    }
  };


  // ======================================
  // UPDATE TASK STATUS
  // ======================================

  const handleStatusChange = async (
    taskId,
    newStatus
  ) => {

    try {

      console.log(
        "Updating Task:",
        taskId
      );

      console.log(
        "New Status:",
        newStatus
      );

      const response = await updateTask(
        taskId,
        {
          status: newStatus,
        }
      );

      console.log(
        "Updated Task:",
        response
      );

      // Get latest tasks from database
      await loadTasks();

    } catch (error) {

      console.error(
        "Update Status Error:",
        error
      );

      alert(
        error.response?.data?.message ||
        "Failed to update task status"
      );
    }
  };


  // ======================================
  // LOAD TASKS ON PAGE LOAD
  // ======================================

  useEffect(() => {
    loadTasks();
  }, []);


  // ======================================
  // FORMAT DATE
  // ======================================

  const formatDate = (date) => {

    if (!date) {
      return "-";
    }

    return new Date(date).toLocaleDateString(
      "en-IN",
      {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }
    );
  };


  return (

    <div>

      <h2 className="mb-4">
        My Tasks
      </h2>


      <div className="card shadow-sm">

        <div className="card-body">


          {/* ==================================
              ERROR
          ================================== */}

          {error && (
            <div className="alert alert-danger">
              {error}
            </div>
          )}


          {/* ==================================
              LOADING
          ================================== */}

          {loading ? (

            <div className="text-center py-4">
              Loading tasks...
            </div>

          ) : tasks.length === 0 ? (

            <div className="text-center py-4 text-muted">
              No tasks assigned to you.
            </div>

          ) : (

            <table className="table">

              <thead>

                <tr>

                  <th>Task</th>

                  <th>Priority</th>

                  <th>Status</th>

                  <th>Due Date</th>

                </tr>

              </thead>


              <tbody>

                {tasks.map((task) => (

                  <tr key={task._id}>


                    {/* ==================================
                        TASK
                    ================================== */}

                    <td>
                      {task.title}
                    </td>


                    {/* ==================================
                        PRIORITY
                    ================================== */}

                    <td>

                      <span
                        className={`badge ${
                          task.priority === "High"
                            ? "bg-danger"
                            : task.priority === "Medium"
                            ? "bg-secondary"
                            : "bg-success"
                        }`}
                      >
                        {task.priority}
                      </span>

                    </td>


                    {/* ==================================
                        STATUS
                    ================================== */}

                    <td>

                      <select
                        className="form-select form-select-sm"
                        value={task.status}
                        onChange={(e) =>
                          handleStatusChange(
                            task._id,
                            e.target.value
                          )
                        }
                        style={{
                          width: "150px",
                        }}
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

                    </td>


                    {/* ==================================
                        DUE DATE
                    ================================== */}

                    <td>
                      {formatDate(task.dueDate)}
                    </td>


                  </tr>

                ))}

              </tbody>

            </table>

          )}

        </div>

      </div>

    </div>
  );
}

export default MyTasks;