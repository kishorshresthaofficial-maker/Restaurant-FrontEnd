import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
// import { set } from "react-datepicker/dist/dist/date_utils.js";
import { BiArrowBack } from "react-icons/bi";
import { Link, useNavigate, useParams } from "react-router";

const UpdateBlogs = () => {
  const fileInputRef = useRef(null);
  const { blogId } = useParams();
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    image: "",
    description: "",
    status: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);

    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleUpdate = async (e) => {
  e.preventDefault();

  try {
    const updatedData = new FormData();
    updatedData.append("title", formData.title);
    updatedData.append("description", formData.description);
    updatedData.append("status", formData.status);

    if (image) {
      updatedData.append("image", image);
    }

    await axios.put(
      `http://localhost:3000/blog/update/${blogId}`,
      updatedData
    );

    alert("Blog updated successfully!");
    navigate("/dashboard/blogs");

    setFormData({
      title: "",
      image: "",
      description: "",
      status: "",
    });

    setImage(null);
    setPreview(null);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }

  } catch (error) {
    console.log(error);
  }
};

  useEffect(() => {
    const fetchBlogDetails = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/blog/${blogId}`);
        setFormData({
          title: res.data.title,
          status: res.data.status,
          image: res.data.image,
          description: res.data.description,
        });
      } catch (error) {
        console.log(error);
      }
    };

    fetchBlogDetails();
  }, [blogId]);

  return (
    <div className="bg-white border border-1 rounded-lg shadow relative m-10">
      <div className="flex items-start justify-between p-5 border-b rounded-t">
        <h3 className="text-xl font-semibold">Edit Blog</h3>
      </div>

      <div className="p-6 space-y-6">
        <form>
          <div className="grid grid-cols-6 gap-6">
            <div className="col-span-6 sm:col-span-3">
              <label
                htmlFor="product-name"
                className="text-sm font-medium text-gray-900 block mb-2"
              >
                Blog Title
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
              />
            </div>

            <div className="col-span-6 sm:col-span-3">
              <label
                htmlFor="category"
                className="text-sm font-medium text-gray-900 block mb-2"
              >
                Status
              </label>
              <select
                className="w-75 border rounded px-3 py-2"
                name="status"
                value={formData.status}
                onChange={handleChange}
              >
                <option value="">Select Status</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>

            <div className="col-span-6 sm:col-span-3">
              <label
                htmlFor="brand"
                className="text-sm font-medium text-gray-900 block mb-2"
              >
                Blog Image
              </label>
              <input
                type="file"
                accept="image"
                ref={fileInputRef}
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

            <div className="col-span-6 sm:col-span-3">
              <label
                htmlFor="price"
                className="text-sm font-medium text-gray-900 block mb-2"
              ></label>
              <img
                src={
                  preview
                    ? preview // newly selected image
                    : formData.image
                      ? `http://localhost:3000/${formData.image}` // image from DB
                      : ""
                }
                alt="Blog"
                className="h-40 w-auto object-cover"
              />
            </div>

            <div className="col-span-full">
              <label
                htmlFor="product-details"
                className="text-sm font-medium text-gray-900 block mb-2"
              >
                Description
              </label>
              <textarea
  id="product-details"
  name="description"
  rows="6"
  value={formData.description}
  onChange={handleChange}
  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-4"
/>
            </div>
          </div>
        </form>
      </div>

      <div className="p-6 border-t border-gray-200 rounded-b">
        <button onClick={handleUpdate}
          className="text-white bg-cyan-600 hover:bg-cyan-700 focus:ring-4 focus:ring-cyan-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          type="submit"
        >
          Update Blog
        </button>
        <div className="py-2">
          <Link
            to="/dashboard/blogs"
            className="flex items-center text-black mb-4"
          >
            <BiArrowBack size={20} className="mr-1" />
            <span className="font-semibold hover:underline">Back to Blogs</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UpdateBlogs;
