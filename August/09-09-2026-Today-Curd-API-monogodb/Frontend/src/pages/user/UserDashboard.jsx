function UserDashboard() {
  return (
    <div>
      <h2 className="mb-4">My Dashboard</h2>

      <div className="row g-4">

        <div className="col-md-4">
          <div className="card shadow-sm">
            <div className="card-body">
              <h6>My Tasks</h6>
              <h2>8</h2>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card shadow-sm">
            <div className="card-body">
              <h6>Pending</h6>
              <h2>3</h2>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card shadow-sm">
            <div className="card-body">
              <h6>Completed</h6>
              <h2>5</h2>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default UserDashboard;