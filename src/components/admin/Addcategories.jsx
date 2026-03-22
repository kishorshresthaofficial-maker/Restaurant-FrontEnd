import React, { useEffect, useState } from "react";
import Adminmenu from "./Adminmenu";
import { Button, Group, Modal, Select, Switch, Table, TextInput } from "@mantine/core";
import { Form, useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { Link } from "react-router";
import axios from "axios";

const Addcategories = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const [category, setCategory]= useState([])

  
  const newCategory ={
    name: ""
  }
  
  const [cate, setCate]= useState(newCategory)

  const inputHandler = (e) => {
    const {name, value} = e.target;
  setCate({ ...cate, [name]: value });
    // console.log(cate)
  }

  const categoryHandle = async(e) => {
    e.preventDefault();
    try {
      const categoryResult = await axios.post("http://localhost:3000/category/create", cate);
      setCategory((prev) => [...prev, categoryResult.data])
      close()
    }
    catch(error)
    {
      console.log(error)
    }
  }

  const getCategoryList = async()=>{
    // const categoryListResult = await axios.get("https://restaurant-server-tee7.onrender.com/category/getCategory");
    const categoryListResult = await axios.get("http://localhost:3000/category/getCategory");
    setCategory(categoryListResult.data)

  }


  const categoryDelete = async(id) => {
    const confirmDelete = window.confirm("Are you sure to delete this category?");
    if (!confirmDelete)
      return;

    try {
      await axios.delete(`http://localhost:3000/category/${id}`);
      setCategory((prev) => prev.filter((item)=> item._id !==id));
    }
    catch(error)
    {
      console.log(error)
    }
  }

useEffect(()=>{
  getCategoryList()
},[])

  return (
    <>
      <div className="py-5 px-5 w-full h-dvh bg-gray-100">
        <h1 className="text-2xl font-medium">Categories</h1>
        <div className="py-5 flex flex-col">
          <div className="flex justify-end px-10">
            {" "}
            <Button variant="filled" onClick={open} size="md">
              Add Category
            </Button>
          </div>
          <div className="py-5">
            <h1 className="text-3xl text-center font-medium">Categories</h1>
          </div>

 <Table striped withColumnBorders>
              <Table.Tr className="text-xl font-medium">
                <Table.Td>Category Name</Table.Td>
                {/* <Table.Td>Status</Table.Td> */}
                <Table.Td>Actions</Table.Td>
              </Table.Tr>

              {category.map((item, index) => (
                <Table.Tr>
                  <Table.Td>{item.name}</Table.Td>
                  {/* <Table.Td> */}
                    {/* <Group justify="center">
                      <Switch size="lg" onLabel="Available" offLabel="Not Available"></Switch>
                    </Group> */}
                  {/* </Table.Td> */}
                  <Table.Td>
                    <Link to="/editItem" className="hover:underline p-3">
                      Edit
                    </Link>
                    <Link onClick={() => categoryDelete(item._id)} className="text-red-600 hover:underline hover:cursor-pointer">Delete</Link>
                  </Table.Td>
                </Table.Tr>
              ))}
            </Table>



          <div>

            <Modal
              opened={opened}
              onClose={close}
              title="Add New Category"
              centered
            >
            <form onSubmit={categoryHandle}>
                  <label className="text-xl text-blue-800 font-bold">Category Name</label>
                  <input type="text" onChange={inputHandler} name="name" placeholder="Enter Category Name" />
                  
                  <div>
                    <button type="submit" className="bg-blue-700 p-3 text-2xl text-white rounded-sxl hover: cursor-pointer hover:underline"> Add Category</button>
                  </div>

            </form>

              
            </Modal>
          </div>
        </div>
      </div>
    </>
  );
};

export default Addcategories
