import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { BiArrowBack } from 'react-icons/bi';
import { Link, useParams } from 'react-router';

const Bloglisting = () => {
  const { blogId } = useParams();
  const [blogData, setBlogData] = useState(null);

  const getBlogData = async () => {
    try {
      const res = await axios.get(`http://localhost:3000/blog/${blogId}`);
      setBlogData(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getBlogData();
  }, [blogId]);

  return (
    <div>
      <div>
        <Link to="/dashboard/blogs" className="flex items-center text-black mb-4">
          <BiArrowBack size={20} className="mr-1" />
          <span className='font-bold'>Back to Blogs</span>
        </Link>

      </div>
      {blogData && (
        <div className="px-5 py-7">
          <img
            src={`http://localhost:3000/${blogData.image}`}
            alt="blog"
            className="w-full h-full object-cover mb-4"
          />

          <div className="text-2xl font-bold mb-2">
            {blogData.title}
          </div>

          <div className="text-gray-500 text-sm mb-4">
            Posted on: {new Date(blogData.postedDate).toLocaleDateString()}
          </div>

          <div className="text-gray-700">
            {blogData.description}
          </div>
        </div>
      )}
    </div>
  );
};

export default Bloglisting;