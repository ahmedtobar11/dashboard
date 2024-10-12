import { useState } from "react";
import { createAdmin } from '/src/services/apiRequests/createAdmins.js';
import { useNavigate } from "react-router-dom";

export default function CreateNewAdmin() {
  const navigate = useNavigate();

  const branches = [
    "Portsaid",
    "Ismailia",
    "Smart Village",
    "New Capital",
    "Cairo University",
  ];

  const [formData, setFormData] = useState({
    fullName: "",
    branch: "",
    email: "",
    password: "",
  });

  const [validationErrors, setValidationErrors] = useState({});
  const [responseMessage, setResponseMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateField = (field, value) => {
    const errors = { ...validationErrors };

    if (value === "") {
      errors[field] = `${field.charAt(0).toUpperCase() + field.slice(1)} is required`;
    } else {
      delete errors[field];
    }

    setValidationErrors(errors);
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    validateField(name, value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      const response = await createAdmin(formData);
      setResponseMessage(response.success);
         setErrorMessage("");
      navigate("/view-admins");

    } catch (error) {
      const errorMsg = error.message || "Failed to create admin";
      setErrorMessage(errorMsg);
      setResponseMessage("");
    }
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.fullName) errors.fullName = "Full name is required";
    if (!formData.branch) errors.branch = "Branch is required";
    if (!formData.email) errors.email = "Email is required";
    if (!formData.password) errors.password = "Password is required";

    setValidationErrors(errors);

    return Object.keys(errors).length === 0;
  };

  return (
    <div className="mt-10 p-8 flex flex-col rounded-xl space-y-8 border border-main bg-main-light shadow-md max-w-2xl mx-auto">
      <h1 className="text-center text-3xl font-semibold text-main">Create New Admin</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <label className="block">
          <span className="text-gray-700">Full Name</span>
          <input
            type="text"
            name="fullName"
            className={`input input-bordered w-full mt-2 p-2 text-gray-900 ${validationErrors.fullName ? 'border-red-500' : ''}`}
            placeholder="Enter admin's full name"
            value={formData.fullName}
            onChange={handleInputChange}
            onBlur={handleBlur}
          />
          {validationErrors.fullName && <p className="text-red-500">{validationErrors.fullName}</p>}
        </label>

        <label className="block">
          <span className="text-gray-700">Admin Branch</span>
          <select
            name="branch"
            className={`select select-bordered w-full mt-2 p-2 text-gray-900 ${validationErrors.branch ? 'border-red-500' : ''}`}
            value={formData.branch}
            onChange={handleInputChange}
            onBlur={handleBlur}
          >
            <option value="" disabled>
              Select an admin branch
            </option>
            {branches.map((branch, index) => (
              <option key={index} value={branch}>
                {branch}
              </option>
            ))}
          </select>
          {validationErrors.branch && <p className="text-red-500">{validationErrors.branch}</p>}
        </label>

        <div className="flex flex-col lg:flex-row lg:space-x-4 space-y-6 lg:space-y-0">
          <label className="w-full">
            <span className="text-gray-700">Email</span>
            <input
              type="email"
              name="email"
              className={`input input-bordered w-full mt-2 p-2 text-gray-900 ${validationErrors.email ? 'border-red-500' : ''}`}
              placeholder="admin@example.com"
              value={formData.email}
              onChange={handleInputChange}
              onBlur={handleBlur}
            />
            {validationErrors.email && <p className="text-red-500">{validationErrors.email}</p>}
          </label>

          <label className="w-full">
            <span className="text-gray-700">Password</span>
            <input
              type="password"
              name="password"
              className={`input input-bordered w-full mt-2 p-2 text-gray-900 ${validationErrors.password ? 'border-red-500' : ''}`}
              placeholder="Enter a secure password"
              value={formData.password}
              onChange={handleInputChange}
              onBlur={handleBlur}
            />
            {validationErrors.password && <p className="text-red-500">{validationErrors.password}</p>}
          </label>
        </div>

        <div className="text-center mt-6">
          <button
            type="submit"
            className="w-full lg:w-1/2 mx-auto p-3 text-white bg-main hover:bg-main-dark rounded-lg"
          >
            Create Admin
          </button>
        </div>
      </form>

      {responseMessage && <p className="text-green-500 text-center mt-4 text-2xl">{responseMessage}</p>}
      {errorMessage && <p className="text-red-500 text-center mt-4">{errorMessage}</p>}
    </div>
  );
}
