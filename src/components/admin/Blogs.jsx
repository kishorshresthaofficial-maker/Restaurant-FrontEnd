import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router";

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  const fileInputRef = useRef(null)

  const getBlogs = async () => {
    try {
      const blogResult = await axios.get("http://localhost:3000/blog/getBlogs");
      setBlogs(blogResult.data);
    } catch (error) {
      console.log(error);
    }
  };

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "active",
    postedDate: Date.now(),
  });

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleDelete = async (id) => {
   const confirmDelete = window.confirm("Are you sure you want to delete this blog?");
      if(!confirmDelete) return;

      try {
        await axios.delete(`http://localhost:3000/blog/${id}`);
        getBlogs(); // Refresh the list after deletion

      }
      catch (error) {
        console.log(error);
      }
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);

    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  

  useEffect(() => {
    getBlogs();
  }, []);

  const handleSubmit = async () => {
    try {
      const formdata = new FormData();

      formdata.append("title", formData.title);
      formdata.append("description", formData.description);
      formdata.append("status", formData.status);
      formdata.append("postedDate", formData.postedDate);
      formdata.append("image", image);

      await axios.post("http://localhost:3000/blog/create", formdata);

      getBlogs();

      // Reset form
      setFormData({
        title: "",
        description: "",
        status: "active",
        postedDate: "",
        image: "",
      });
      setImage(null);
      setPreview(null);

      if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }

    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h1 className="font-bold text-2xl">Add Blogs</h1>
      <div className="mt-4 w-full pr-5">
        <div className="flex flex-col gap-4 mt-4">
          <div className="flex gap-5">
            <input
              type="text"
              name="title"
              value={formData.title}
              placeholder="Enter Blog Title"
              onChange={inputHandler}
              className="border border-gray-300 rounded-md p-2"
              required
            />
            <input
              type="file"
              accept="image" ref={fileInputRef}
              onChange={handleImageChange}
              class="block w-full text-sm text-gray-500
  file:mr-4 file:py-2 file:px-4
  file:rounded file:border-0
  file:text-sm file:font-semibold
  file:bg-blue-50 file:text-blue-700
  hover:file:bg-blue-100 
"
            />
          </div>
          <div className="w-50 h-auto bg-amber-400">
            {preview && <img src={preview} className="h-auto" />}
          </div>
          <textarea
            name="description"
            value={formData.description}
            onChange={inputHandler}
            placeholder="Content"
            className="border border-gray-300 rounded-md p-2"
            rows={3}
            required
          />
          <button
            onClick={handleSubmit}
            className="bg-blue-500 w-1/4 text-white px-4 py-2 rounded-md cursor-pointer"
          >
            Add Blog
          </button>
        </div>
      </div>

      <div className="flex flex-col">
        <h2 className="font-bold text-xl mt-8">Blog Lists</h2>
        <div className="w-full pr-5">
          <table className="w-full border-collapse border border-gray-300 mt-4">
            <thead>
              <tr className="text-center">
                <th className="border border-gray-300 px-4 py-2">S.N</th>
                <th className="border border-gray-300 px-4 py-2">Title</th>
                <th className="border border-gray-300 px-4 py-2">Image</th>
                <th className="border border-gray-300 px-4 py-2">
                  Description
                </th>
                <th className="border border-gray-300 px-4 py-2">Status</th>
                <th className="border border-gray-300 px-4 py-2">
                  Posted Date
                </th>
                <th className="border border-gray-300 px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {/* Example blog entry */}
              {blogs.map((item, index) => (
                <tr key={index}>
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    {index + 1}
                  </td>

                  <td className="border border-gray-300 px-4 py-2">
                    {item.title}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {/* {item.image} */}
                    <img
                      src={`http://localhost:3000/${item.image}`}
                      alt="Blog"
                      className="w-20 h-20 object-cover"
                    />
                  </td>
                  <td className="border border-gray-300 px-4 py-2 w-1/3">
                    {item.description.substring(0, 150)}{" "}
                    <Link to={`/dashboard/bloglisting/${item._id}`} className="font-semibold hover:cursor-pointer hover:underline"> Read More..</Link>
                    {/* <span className="font-semibold hover:cursor-pointer hover:underline"> Read More..</span> */}
                  </td>

                  <td className="border border-gray-300 px-4 py-2">
                    <span
                      className={`px-3 py-3 rounded text-white text-sm ${
                        item.status === "Active"
                          ? "bg-green-500"
                          : "bg-red-500"
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {new Date(item.postedDate).toLocaleDateString("en-CA")}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    <Link to={`/dashboard/bloglisting/${item._id}`} className="bg-blue-500 text-white px-2 py-2 rounded-md mr-2 cursor:pointer">View</Link>
                   
                    <Link to={`/dashboard/updateBlogs/${item._id}`} className="bg-yellow-500 text-white px-2 py-2 rounded-md mr-2 cursor:pointer">Update</Link>

                    {/* <button className="bg-yellow-500 text-white px-2 py-1 rounded-md mr-2 cursor-pointer">
                      Edit
                    </button> */}
                    <button onClick={()=> handleDelete(item._id)} className="bg-red-500 text-white px-2 py-1 rounded-md cursor-pointer">
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
  );
};

export default Blogs;
