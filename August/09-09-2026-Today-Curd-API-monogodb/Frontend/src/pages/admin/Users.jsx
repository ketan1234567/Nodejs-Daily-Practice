function Users() {
  return (
    <div>
      <div className="d-flex justify-content-between mb-4">
        <h2>Users</h2>

        <button className="btn btn-primary">
          + Create User
        </button>
      </div>

      <div className="card shadow-sm">
        <div className="card-body">

          <table className="table table-hover">
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td>1</td>
                <td>Rahul</td>
                <td>rahul@gmail.com</td>
                <td>
                  <span className="badge bg-primary">
                    User
                  </span>
                </td>
                <td>
                  <span className="badge bg-success">
                    Active
                  </span>
                </td>
                <td>
                  <button className="btn btn-sm btn-warning me-2">
                    Edit
                  </button>

                  <button className="btn btn-sm btn-danger">
                    Delete
                  </button>
                </td>
              </tr>
            </tbody>
          </table>

        </div>
      </div>
    </div>
  );
}

export default Users;