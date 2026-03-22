import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { IoArrowBack } from 'react-icons/io5'
import { Link, useNavigate, useParams } from 'react-router'

const Updatemenu = () => {
    const {menuId} = useParams()
    const [category, setCategory] = useState([])

    const navigate = useNavigate()

    const [menuData, setMenuData] = useState({
        title: '',
        image: '',
        description: '',
        category: '',
        price: ''
    })

    const getAllCategory = async()=> {
        const categoryResult = await axios.get("http://localhost:3000/category/getCategory");
        setCategory(categoryResult.data)
    }

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setMenuData({...menuData, [name]: value})
    }

    const handleFormSubmit = async(e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`http://localhost:3000/menu/update/${menuId}`, menuData);
            console.log(response.data);
            setMenuData({
                title: '',
                image: '',
                description: '',
                category: '',
                price: ''
                })
            navigate('/dashboard/food-items')
        }
        catch(error)
        {
            console.log(error)
        }
    }


  useEffect(() => {
    axios.get(`http://localhost:3000/menu/get/${menuId}`)
      .then((response) => {
        setMenuData({
            ...menuData,
            title: response.data.title,
            image: response.data.image,
            description: response.data.description,
            category: response.data.category?._id,
            // category: response.data.category,
            price: response.data.price  
        })
      })
      .catch((error) => {
        console.error('Error fetching menu item:', error);
      });
      getAllCategory()
  },[])

  return (
    <div className='pt-20'>
        <h1 className='text-2xl text-center'>Update Food Items</h1>

        <form className='w-fit border-1 flex flex-col gap-5 p-10 mx-auto mt-5 rounded-xl'>
            <div className='flex items-center justify-around gap-10'>
                <div className='text-lg font-normal'>
                    <label htmlFor="">Food Title</label>
                </div>
                <div><input type="text" value={menuData.title} name='title' onChange={handleInputChange} placeholder='Enter food title' /></div>
            </div>

            <div className='flex items-center justify-around gap-10'>
                <div className='text-lg font-normal'>
                    <label htmlFor="">Image URL</label>
                </div>
                <div><input type="text" value={menuData.image} name='image' onChange={handleInputChange} placeholder='Enter food title' /></div>
            </div>

            <div className='flex items-center justify-around gap-10'>
                <div className='text-lg font-normal'>
                    <label htmlFor="">Description</label>
                </div>
                <div><input type="text" value={menuData.description} name='description' onChange={handleInputChange} placeholder='Enter food title' /></div>
            </div>

            <div className='flex items-center justify-between gap-2'>
                <div className='text-lg font-normal'>
                    <label htmlFor="">Category</label>
                </div>
                <div className='flex justify-start items-start'>
                    <select className='w-75 border rounded px-3 py-2' name='category' value={menuData.category} onChange={handleInputChange}>
                        <option value="">Select Category</option>
                        {category.map((item, index) => (
                            <option key={index} value={item._id}>{item.name}</option>
                        ))}
                    </select>   
                </div>
                    
            </div>

            <div className='flex items-center justify-around gap-20'>
                <div className='text-lg font-normal'>
                    <label htmlFor="">Price</label>
                </div>
                <div><input type="text" value={menuData.price} name='price' onChange={handleInputChange} placeholder='Enter food title' /></div>
            </div>
            <div className='flex justify-center text-xl'>
                <button onClick={handleFormSubmit} className='bg-green-500 text-white px-20 py-4 rounded-md hover:bg-green-600 transition duration-300 hover:cursor-pointer'>Update</button>
            </div>
            
        </form>
            <div className='flex justify-center pt-2'>
                 <Link to='/dashboard/food-items' className='bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300'>
                    <div className='flex gap-2 justify-center items-center'>
                       <div className='text-xl'><IoArrowBack /></div> 
                       <div>Go Back</div>
                    </div>
                 </Link>
            </div>
    </div>
  )
}

export default Updatemenu
