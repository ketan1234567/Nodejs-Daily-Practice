function MyTasks() {
  return (
    <div>
      <h2 className="mb-4">My Tasks</h2>

      <div className="card shadow-sm">

        <div className="card-body">

          <table className="table">

            <thead>
              <tr>
                <th>Task</th>
                <th>Priority</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>

              <tr>
                <td>Build Login</td>

                <td>
                  <span className="badge bg-danger">
                    High
                  </span>
                </td>

                <td>
                  <span className="badge bg-warning text-dark">
                    In Progress
                  </span>
                </td>
              </tr>

              <tr>
                <td>Fix API</td>

                <td>
                  <span className="badge bg-secondary">
                    Medium
                  </span>
                </td>

                <td>
                  <span className="badge bg-success">
                    Completed
                  </span>
                </td>
              </tr>

            </tbody>

          </table>

        </div>

      </div>
    </div>
  );
}

export default MyTasks;