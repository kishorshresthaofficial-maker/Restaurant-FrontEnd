import axios from 'axios'
import React, { use, useEffect, useState } from 'react'
import { IoArrowBack } from 'react-icons/io5'
import { Link, useNavigate, useParams } from 'react-router'

const Updatecategory = () => {
    const {categoryId} = useParams()
    const navigate = useNavigate()

    const [categoryData, setCategoryData] = useState({
        name: ''
    })

    const handleInputChange = (e) => {
      const {name, value} = e.target;
      setCategoryData({...categoryData, [name]: value})
    }

    const handleFormSubmit = async(e) => {
      e.preventDefault();
      try {
        const response = await axios.put(`http://localhost:3000/category/update/${categoryId}`, categoryData);
        console.log(response.data);
        setCategoryData({
          name: ''
        })
        navigate('/dashboard/categories')
      } catch (error) {
        console.error('Error updating category:', error);
      }
    }


useEffect(() => {
  axios.get(`http://localhost:3000/category/${categoryId}`)
      .then((response) => {
        setCategoryData({
            ...categoryData,
            name: response.data.name,
          
        })
      })
      .catch((error) => {
        console.error('Error fetching menu item:', error);
      });
      // getAllCategory()
  },[])



  return (

    <div className="w-full h-3/4 flex justify-center items-center">
      <form className="w-96 border p-5 rounded-md bg-white shadow">
        <div className="flex flex-col items-center">
          <label className="text-lg mb-2">Category Name</label>
          <input
            type="text"
            className="border p-2 w-full rounded"
            placeholder="Enter category name" name="name" value={categoryData.name} onChange={handleInputChange}
          />
        </div>
        <div className='flex justify-center items-center'>
            <button onClick={handleFormSubmit} className='w-fit rounded-md bg-green-500 text-white px-20 py-2 hover:bg-green-600 transition duration-300 hover:cursor-pointer'>Update Category</button>
        </div>
        <div className='flex justify-center items-center gap-3 pt-5'>
           <Link to='/dashboard/categories' className='hover:underline text-lg'>Go Back
           
           </Link>
        </div>
      </form>
     
    </div>
  );
}

export default Updatecategory
