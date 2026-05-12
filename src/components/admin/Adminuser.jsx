import axios from "axios";
import React, { useEffect, useState } from "react";

const Adminuser = () => {
  const [users, setUsers] = useState([]);

  const newMember = {
    name: "",
    email: "",
    password: "",
    userRole: "",
  };

  const [newAdmin, setNewAdmin] = useState();

  // const inputHandler = (e) => {
  //   const { name, value } = e.target;
  //   setNewAdmin({ ...newAdmin, [name]: value });
  // };

  const getAllUsers = async () => {
    try {
      const userData = await axios.get(
        "http://localhost:3000/admin-user/getAdminUsers",
      );
      setUsers(userData.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const createAdmin = async (e) => {
    e.preventDefault();
    try {
      const newAdmin = await axios.post(
        "http://localhost:3000/admin-user/create",
        users,
      );
      alert("New user created successfully!");
      setNewAdmin(newMember);
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  return (
    <div className="p-10">
      {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
       */}
      <h1 className="mb-8 font-extrabold text-3xl">Register New User</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:grid-cols-1">
        <form onSubmit={createAdmin} className="w-full">
          <div>
            <label className="block font-semibold" htmlFor="name">
              Name
            </label>
            <input
              className="w-full shadow-inner bg-gray-100 rounded-lg placeholder-black text-2xl p-4 border-none block mt-1"
              id="name"
              type="text"
              name="name"
              required="required"
              autofocus="autofocus"
            />
          </div>
          <div className="mt-4">
            <label className="block font-semibold" htmlFor="email">
              Email
            </label>
            <input
              className="w-full shadow-inner bg-gray-100 rounded-lg placeholder-black text-2xl p-4 border-none block mt-1"
              id="email"
              type="email"
              name="email"
              required="required"
            />
          </div>
          <div className="mt-4">
            <label className="block font-semibold" htmlFor="password">
              Password
            </label>
            <input
              className="w-full shadow-inner bg-gray-100 rounded-lg placeholder-black text-2xl p-4 border-none block mt-1"
              id="password"
              type="password"
              name="password"
              required="required"
              autoComplete="new-password"
            />
          </div>

          <div className="mt-4">
            <label className="block font-semibold" htmlFor="profilePicture">
              Profile Picture
            </label>
            <input
              type="file"
              accept="image/*"
              class="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100
"
            />
          </div>

          <div className="mt-4">
            <label className="block font-semibold" htmlFor="userRole">
              Select Role
            </label>
            <select
              className="w-7/9 shadow-inner bg-gray-100 rounded-lg placeholder-black text-2xl p-4 border-none block mt-1"
              id="userRole"
              name="userRole"
              required="required"
            >
              <option value="admin">Admin</option>
              <option value="manager">Manager</option>
              <option value="accountant">Accountant</option>
            </select>
          </div>
          <div className="flex items-center justify-between mt-8">
            <button
              type="submit"
              className="w-fit flex items-center justify-center px-5 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10 hover:cursor-pointer"
            >
              Add New User
            </button>
          </div>
        </form>

        <div className="w-full md:border-l-2 col-span-2 border-gray-300 md:pl-5 pl-0">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
            <h1 className="text-3xl font-bold text-center mb-8">
              User Listing
            </h1>

            {/* User Table */}
            <div className="overflow-x-auto bg-white rounded-lg shadow">
              <table className="w-full table-auto">
                <thead>
                  <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                    <th className="py-3 px-6 text-left">ID</th>
                    <th className="py-3 px-6 text-left">Name</th>
                    <th className="py-3 px-6 text-left">Email</th>
                    <th className="py-3 px-6 text-left">Role</th>
                    <th className="py-3 px-6 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="text-gray-600 text-sm">
                  {users.map((item, index) => (
                    <tr className="border-b border-gray-200 hover:bg-gray-100">
                      <td className="py-3 px-6 text-left">{index + 1}</td>
                      <td className="py-3 px-6 text-left">{item.name}</td>
                      <td className="py-3 px-6 text-left">{item.email}</td>
                      <td className="py-3 px-6 text-left">{item.role}</td>
                      <td className="py-3 px-6 text-center">
                        <button className="hover:underline p-2 text-blue-600 cursor-pointer">
                          View
                        </button>
                        <button className="hover:underline p-2 text-green-600 cursor-pointer">
                          Edit
                        </button>
                        <button className="text-red-600 p-2 hover:underline hover:cursor-pointer">
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
      </div>
    </div>
  );
};

export default Adminuser;
