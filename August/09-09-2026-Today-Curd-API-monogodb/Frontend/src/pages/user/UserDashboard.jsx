import { useEffect, useState } from "react";
import { getTasks } from "../../services/taskService";

function UserDashboard() {

  // ======================================
  // DASHBOARD STATS
  // ======================================

  const [stats, setStats] = useState({
    myTasks: 0,
    pending: 0,
    completed: 0,
  });

  // ======================================
  // LOADING
  // ======================================

  const [loading, setLoading] = useState(true);


  // ======================================
  // LOAD MY TASKS
  // ======================================

  const loadDashboardData = async () => {
    try {

      setLoading(true);

      const response = await getTasks();

      console.log(
        "My Tasks Dashboard Response:",
        response
      );

      const tasks = response.tasks || [];


      // ==================================
      // CALCULATE PENDING
      // ==================================

      const pendingTasks = tasks.filter(
        (task) => task.status === "Pending"
      );


      // ==================================
      // CALCULATE COMPLETED
      // ==================================

      const completedTasks = tasks.filter(
        (task) => task.status === "Completed"
      );


      // ==================================
      // SET STATS
      // ==================================

      setStats({
        myTasks: tasks.length,
        pending: pendingTasks.length,
        completed: completedTasks.length,
      });

    } catch (error) {

      console.error(
        "User Dashboard Error:",
        error
      );

    } finally {

      setLoading(false);

    }
  };


  // ======================================
  // LOAD WHEN DASHBOARD OPENS
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
        My Dashboard
      </h2>


      <div className="row g-4">


        {/* =================================
            MY TASKS
        ================================= */}

        <div className="col-md-4">

          <div className="card shadow-sm">

            <div className="card-body">

              <h6>
                My Tasks
              </h6>

              <h2>

                {loading
                  ? "..."
                  : stats.myTasks}

              </h2>

            </div>

          </div>

        </div>


        {/* =================================
            PENDING
        ================================= */}

        <div className="col-md-4">

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


        {/* =================================
            COMPLETED
        ================================= */}

        <div className="col-md-4">

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

export default UserDashboard;