import { useEffect, useState } from "react";

import {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
} from "../../services/userService";

function Users() {

  // ======================================
  // USERS STATE
  // ======================================
  const [users, setUsers] = useState([]);

  // ======================================
  // MODAL STATE
  // ======================================
  const [showModal, setShowModal] = useState(false);

  // ======================================
  // EDIT MODE
  // ======================================
  const [editMode, setEditMode] = useState(false);

  // ======================================
  // SELECTED USER ID
  // ======================================
  const [selectedUserId, setSelectedUserId] = useState(null);

  // ======================================
  // FORM DATA
  // ======================================
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
    status: "Active",
  });

  // ======================================
  // LOADING
  // ======================================
  const [loading, setLoading] = useState(false);


  // ======================================
  // LOAD USERS
  // ======================================
  const loadUsers = async () => {
    try {

      const response = await getUsers();

      console.log("Users API Response:", response);

      setUsers(response.users || []);

    } catch (error) {

      console.error("Get Users Error:", error);

      alert(
        error.response?.data?.message ||
        "Failed to load users"
      );
    }
  };


  // ======================================
  // LOAD USERS ON PAGE LOAD
  // ======================================
  useEffect(() => {
    loadUsers();
  }, []);


  // ======================================
  // INPUT CHANGE
  // ======================================
  const handleChange = (e) => {

    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };


  // ======================================
  // RESET FORM
  // ======================================
  const resetForm = () => {

    setFormData({
      name: "",
      email: "",
      password: "",
      role: "user",
      status: "Active",
    });

    setSelectedUserId(null);

    setEditMode(false);
  };


  // ======================================
  // OPEN CREATE MODAL
  // ======================================
  const handleOpenCreateModal = () => {

    resetForm();

    setShowModal(true);
  };


  // ======================================
  // OPEN EDIT MODAL
  // ======================================
  const handleOpenEditModal = (user) => {

    console.log("Editing User:", user);

    setEditMode(true);

    setSelectedUserId(user._id);

    setFormData({
      name: user.name || "",
      email: user.email || "",
      password: "",
      role: user.role || "user",
      status: user.status || "Active",
    });

    setShowModal(true);
  };


  // ======================================
  // CLOSE MODAL
  // ======================================
  const handleCloseModal = () => {

    setShowModal(false);

    resetForm();
  };


  // ======================================
  // CREATE USER
  // ======================================
  const handleCreateUser = async (e) => {

    e.preventDefault();

    try {

      setLoading(true);

      console.log("Creating User:", formData);

      const response = await createUser(formData);

      console.log(
        "Create User Response:",
        response
      );

      alert(
        response.message ||
        "User created successfully"
      );

      // Close modal
      setShowModal(false);

      // Reset form
      resetForm();

      // Reload users
      await loadUsers();

    } catch (error) {

      console.error(
        "Create User Error:",
        error
      );

      console.log(
        "Backend Error:",
        error.response?.data
      );

      alert(
        error.response?.data?.message ||
        "Failed to create user"
      );

    } finally {

      setLoading(false);
    }
  };


  // ======================================
  // UPDATE USER
  // ======================================
  const handleUpdateUser = async (e) => {

    e.preventDefault();

    try {

      setLoading(true);

      console.log(
        "Updating User:",
        selectedUserId,
        formData
      );

      // ----------------------------------
      // Password empty असेल तर password
      // request मध्ये पाठवायचा नाही
      // ----------------------------------
      const updateData = {
        name: formData.name,
        email: formData.email,
        role: formData.role,
        status: formData.status,
      };

      // Password दिला असेल तरच पाठवा
      if (formData.password.trim()) {

        updateData.password =
          formData.password;
      }

      console.log(
        "Update User Data:",
        updateData
      );

      const response = await updateUser(
        selectedUserId,
        updateData
      );

      console.log(
        "Update User Response:",
        response
      );

      alert(
        response.message ||
        "User updated successfully"
      );

      // Close modal
      setShowModal(false);

      // Reset form
      resetForm();

      // Reload users
      await loadUsers();

    } catch (error) {

      console.error(
        "Update User Error:",
        error
      );

      console.log(
        "Backend Error:",
        error.response?.data
      );

      alert(
        error.response?.data?.message ||
        "Failed to update user"
      );

    } finally {

      setLoading(false);
    }
  };


  // ======================================
  // DELETE USER
  // ======================================
  const handleDeleteUser = async (id) => {

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user?"
    );

    if (!confirmDelete) {
      return;
    }

    try {

      console.log(
        "Deleting User:",
        id
      );

      const response = await deleteUser(id);

      console.log(
        "Delete User Response:",
        response
      );

      alert(
        response.message ||
        "User deleted successfully"
      );

      // Reload users
      await loadUsers();

    } catch (error) {

      console.error(
        "Delete User Error:",
        error
      );

      alert(
        error.response?.data?.message ||
        "Failed to delete user"
      );
    }
  };


  return (
    <div>

      {/* ==================================
          HEADER
      ================================== */}

      <div className="d-flex justify-content-between mb-4">

        <h2>Users</h2>

        <button
          className="btn btn-primary"
          onClick={handleOpenCreateModal}
        >
          + Create User
        </button>

      </div>


      {/* ==================================
          USERS TABLE
      ================================== */}

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

              {users.length === 0 ? (

                <tr>

                  <td
                    colSpan="6"
                    className="text-center"
                  >
                    No users found
                  </td>

                </tr>

              ) : (

                users.map((user, index) => (

                  <tr key={user._id}>

                    {/* NUMBER */}

                    <td>
                      {index + 1}
                    </td>


                    {/* NAME */}

                    <td>
                      {user.name}
                    </td>


                    {/* EMAIL */}

                    <td>
                      {user.email}
                    </td>


                    {/* ROLE */}

                    <td>

                      <span className="badge bg-primary">

                        {user.role}

                      </span>

                    </td>


                    {/* STATUS */}

                    <td>

                      <span
                        className={`badge ${
                          user.status === "Active"
                            ? "bg-success"
                            : "bg-secondary"
                        }`}
                      >

                        {user.status}

                      </span>

                    </td>


                    {/* ACTION */}

                    <td>

                      {/* EDIT */}

                      <button
                        className="btn btn-sm btn-warning me-2"
                        onClick={() =>
                          handleOpenEditModal(user)
                        }
                      >
                        Edit
                      </button>


                      {/* DELETE */}

                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() =>
                          handleDeleteUser(
                            user._id
                          )
                        }
                      >
                        Delete
                      </button>

                    </td>

                  </tr>

                ))

              )}

            </tbody>

          </table>

        </div>

      </div>


      {/* ==================================
          CREATE / EDIT USER MODAL
      ================================== */}

      {showModal && (

        <div
          className="modal d-block"
          tabIndex="-1"
          style={{
            backgroundColor:
              "rgba(0,0,0,0.5)",
          }}
        >

          <div className="modal-dialog">

            <div className="modal-content">


              {/* ==========================
                  MODAL HEADER
              ========================== */}

              <div className="modal-header">

                <h5 className="modal-title">

                  {editMode
                    ? "Edit User"
                    : "Create User"}

                </h5>


                <button
                  type="button"
                  className="btn-close"
                  onClick={
                    handleCloseModal
                  }
                ></button>

              </div>


              {/* ==========================
                  FORM
              ========================== */}

              <form
                onSubmit={
                  editMode
                    ? handleUpdateUser
                    : handleCreateUser
                }
              >

                <div className="modal-body">


                  {/* ======================
                      NAME
                  ====================== */}

                  <div className="mb-3">

                    <label className="form-label">
                      Name
                    </label>

                    <input
                      type="text"
                      name="name"
                      className="form-control"
                      placeholder="Enter name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />

                  </div>


                  {/* ======================
                      EMAIL
                  ====================== */}

                  <div className="mb-3">

                    <label className="form-label">
                      Email
                    </label>

                    <input
                      type="email"
                      name="email"
                      className="form-control"
                      placeholder="Enter email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />

                  </div>


                  {/* ======================
                      PASSWORD
                  ====================== */}

                  <div className="mb-3">

                    <label className="form-label">

                      Password

                      {editMode && (
                        <small className="text-muted ms-2">
                          Leave blank to keep current password
                        </small>
                      )}

                    </label>

                    <input
                      type="password"
                      name="password"
                      className="form-control"
                      placeholder={
                        editMode
                          ? "Enter new password (optional)"
                          : "Enter password"
                      }
                      value={formData.password}
                      onChange={handleChange}
                      required={!editMode}
                    />

                  </div>


                  {/* ======================
                      ROLE
                  ====================== */}

                  <div className="mb-3">

                    <label className="form-label">
                      Role
                    </label>

                    <select
                      name="role"
                      className="form-select"
                      value={formData.role}
                      onChange={handleChange}
                    >

                      <option value="user">
                        User
                      </option>

                      <option value="admin">
                        Admin
                      </option>

                    </select>

                  </div>


                  {/* ======================
                      STATUS
                  ====================== */}

                  <div className="mb-3">

                    <label className="form-label">
                      Status
                    </label>

                    <select
                      name="status"
                      className="form-select"
                      value={formData.status}
                      onChange={handleChange}
                    >

                      <option value="Active">
                        Active
                      </option>

                      <option value="Inactive">
                        Inactive
                      </option>

                    </select>

                  </div>


                </div>


                {/* ==========================
                    MODAL FOOTER
                ========================== */}

                <div className="modal-footer">

                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={
                      handleCloseModal
                    }
                  >
                    Cancel
                  </button>


                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={loading}
                  >

                    {loading
                      ? editMode
                        ? "Updating..."
                        : "Creating..."
                      : editMode
                        ? "Update User"
                        : "Create User"}

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

export default Users;