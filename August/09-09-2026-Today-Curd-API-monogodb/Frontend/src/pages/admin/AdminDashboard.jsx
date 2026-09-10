function AdminDashboard() {
  return (
    <div>
      <h2 className="mb-4">Admin Dashboard</h2>

      <div className="row g-4">

        <div className="col-md-3">
          <div className="card shadow-sm">
            <div className="card-body">
              <h6>Total Users</h6>
              <h2>10</h2>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card shadow-sm">
            <div className="card-body">
              <h6>Total Tasks</h6>
              <h2>50</h2>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card shadow-sm">
            <div className="card-body">
              <h6>Pending</h6>
              <h2>20</h2>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card shadow-sm">
            <div className="card-body">
              <h6>Completed</h6>
              <h2>30</h2>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default AdminDashboard;