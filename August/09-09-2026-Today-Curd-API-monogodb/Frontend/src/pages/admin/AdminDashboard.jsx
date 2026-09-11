import { useEffect, useState } from "react";

import { getUsers } from "../../services/userService";
import { getTasks } from "../../services/taskService";

function AdminDashboard() {

  // ======================================
  // DASHBOARD STATS
  // ======================================

  const [stats, setStats] = useState({
    totalUsers: 0,
    totalTasks: 0,
    pending: 0,
    completed: 0,
  });

  // ======================================
  // LOADING
  // ======================================

  const [loading, setLoading] = useState(true);


  // ======================================
  // LOAD DASHBOARD DATA
  // ======================================

  const loadDashboardData = async () => {

    try {

      setLoading(true);

      // Get users and tasks together
      const [usersResponse, tasksResponse] =
        await Promise.all([
          getUsers(),
          getTasks(),
        ]);

      console.log(
        "Users Dashboard Response:",
        usersResponse
      );

      console.log(
        "Tasks Dashboard Response:",
        tasksResponse
      );


      // ==================================
      // GET DATA
      // ==================================

      const users =
        usersResponse.users || [];

      const tasks =
        tasksResponse.tasks || [];


      // ==================================
      // CALCULATE TASK STATUS
      // ==================================

      const pendingTasks =
        tasks.filter(
          (task) =>
            task.status === "Pending"
        );

      const completedTasks =
        tasks.filter(
          (task) =>
            task.status === "Completed"
        );


      // ==================================
      // SET STATS
      // ==================================

      setStats({

        totalUsers:
          users.length,

        totalTasks:
          tasks.length,

        pending:
          pendingTasks.length,

        completed:
          completedTasks.length,

      });

    } catch (error) {

      console.error(
        "Dashboard Error:",
        error
      );

    } finally {

      setLoading(false);

    }
  };


  // ======================================
  // LOAD DATA WHEN PAGE OPENS
  // ======================================

  useEffect(() => {

    loadDashboardData();

  }, []);


  return (

    <div>

      {/* ==================================
          PAGE TITLE
      ================================== */}

      <h2 className="mb-4">
        Admin Dashboard
      </h2>


      {/* ==================================
          STAT CARDS
      ================================== */}

      <div className="row g-4">


        {/* ================================
            TOTAL USERS
        ================================= */}

        <div className="col-md-3">

          <div className="card shadow-sm">

            <div className="card-body">

              <h6>
                Total Users
              </h6>

              <h2>

                {loading
                  ? "..."
                  : stats.totalUsers}

              </h2>

            </div>

          </div>

        </div>


        {/* ================================
            TOTAL TASKS
        ================================= */}

        <div className="col-md-3">

          <div className="card shadow-sm">

            <div className="card-body">

              <h6>
                Total Tasks
              </h6>

              <h2>

                {loading
                  ? "..."
                  : stats.totalTasks}

              </h2>

            </div>

          </div>

        </div>


        {/* ================================
            PENDING
        ================================= */}

        <div className="col-md-3">

          <div className="card shadow-sm">

            <div className="card-body">

              <h6>
                Pending
              </h6>

              <h2>

                {loading
                  ? "..."
                  : stats.pending}

              </h2>

            </div>

          </div>

        </div>


        {/* ================================
            COMPLETED
        ================================= */}

        <div className="col-md-3">

          <div className="card shadow-sm">

            <div className="card-body">

              <h6>
                Completed
              </h6>

              <h2>

                {loading
                  ? "..."
                  : stats.completed}

              </h2>

            </div>

          </div>

        </div>


      </div>

    </div>
  );
}

export default AdminDashboard;