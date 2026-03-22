import React, { useEffect, useState } from "react";
import Adminmenu from "./Adminmenu";
import { Button, Modal, NumberInput, Select, Table, TextInput } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Link, Outlet } from "react-router";
import { useForm } from "@mantine/form";
import axios from "axios";


const Fooditems = () => {
    const [opened, { open, close }] = useDisclosure(false);
    const [categories, setCategories] = useState([])
    const [menus, setMenus] = useState([])

    const form = useForm({
      initialValues: {
        title: '',
        image: '',
        description: '',
        category: '',
        price: ''
      },
      validate: {
        title: (value) =>(value.length>2 ? null: "Title too short"),
        description: (value) => (value.length>5 ? null: "Description too short"),
        // category: (value) => (value.length>5 ? null: "Enter valid category"),
        // price: (value) => (value.length>2 ? null: "Enter valid price")
      },
    })


    const getAllCategory = async()=> {
        const categoryResult = await axios.get("http://localhost:3000/category/getCategory");
        // const categoryResult = await axios.get("https://restaurant-server-tee7.onrender.com/category/getCategory")
        setCategories(categoryResult.data)
    }

    const getAllItems = async()=> {
      
        const menuResult = await axios.get("http://localhost:3000/menu/getItems");
          //  const menuResult = await axios.get("https://restaurant-server-tee7.onrender.com/menu/getItems")
           setMenus(menuResult.data)
    }


  const handleSubmit = async (e) => {
  e.preventDefault();

  const validation = form.validate();
  if (validation.hasErrors) return;

  try {
    const res = await axios.post(
      // "https://restaurant-server-tee7.onrender.com/menu/add",
      "http://localhost:3000/menu/add",
      form.values
    );

    console.log(res.data);
    form.reset();
    getAllItems(); // refresh table after adding
    close();       // close modal
  } catch (error) {
    console.error("Axios error:", error.response?.data || error.message);
  }
};


    useEffect(()=>{
      getAllCategory()
      getAllItems()
    },[])

    
 const handleDelete = async (id) => {
  const confirmDelete = window.confirm("Are you sure you want to delete this item?");
  if (!confirmDelete) return;

  try {
    await axios.delete(`http://localhost:3000/menu/${id}`);
    setMenus((prev) => prev.filter((item) => item._id !== id));  // Updates datas from UI without page refresh
  } catch (error) {
    console.error(error);
  }
};

  return (
    <>
      <div className="py-5 px-5 w-full h-dvh bg-gray-100">
        <h1 className="text-2xl font-medium">Food Items</h1>
        <div className="py-5 flex flex-col">
          <div className="flex justify-end px-10">
            {" "}
            <Button variant="filled" onClick={open} size="md">
              Add Food Items
            </Button>
          </div>
          <div className="py-5">
            <h1 className="text-3xl text-center font-medium">Food Items</h1>
          </div>
          <div>
            {/* MANTINE TABLE */}

            <Table striped withColumnBorders>
              <Table.Tr className="text-xl font-medium">
                <Table.Td>Item Name</Table.Td>
                <Table.Td>Description</Table.Td>
                <Table.Td>Category</Table.Td>
                <Table.Td>Price</Table.Td>
                {/* <Table.Td>Status</Table.Td> */}
                <Table.Td>Actions</Table.Td>
              </Table.Tr>

              {menus.map((item, index) => (
                <Table.Tr>
                  <Table.Td>{item.title}</Table.Td>
                  <Table.Td>{item.description}</Table.Td>

                  <Table.Td>{item.category?.name}</Table.Td>

                  <Table.Td>{item.price}</Table.Td>
                  <Table.Td>
                    {/* <Link to={`../updateMenu/${item._id}`} className="hover:underline p-3">
                      Edit
                    </Link> */}
                    <Link
                      to={`/dashboard/updateMenu/${item._id}`}
                      className="hover:underline p-3"
                    >
                      Update
                    </Link>

                    <button
                      onClick={() => handleDelete(item._id)}
                      className="text-red-600 hover:underline hover:cursor-pointer"
                    >
                      Delete
                    </button>
                  </Table.Td>
                </Table.Tr>
              ))}
            </Table>

            <Modal
              opened={opened}
              onClose={close}
              title="Add Food Items"
              centered
            >
              <form onSubmit={(e) => handleSubmit(e)}>
                <TextInput
                  label="Food Title"
                  placeholder="Enter Food Title"
                  {...form.getInputProps("title")}
                />

                <TextInput
                  label="Image Url"
                  placeholder="Enter image url"
                  {...form.getInputProps("image")}
                />
                <TextInput
                  label="Description"
                  placeholder="Enter food description"
                  {...form.getInputProps("description")}
                />

                {/* <select className="w-75 border rounded px-3 py-2">
                    <option value="">Select category</option>

                    {categories.map((item, index) => (
                      <option value={item._id}>{item.name}</option>
                    ))}
          </select> */}

                <select
                  className="w-75 border rounded px-3 py-2"
                  {...form.getInputProps("category")}
                >
                  <option value="">Select category</option>

                  {categories.map((item) => (
                    <option key={item._id} value={item._id}>
                      {item.name}
                    </option>
                  ))}
                </select>

                {/* <TextInput label="Category" placeholder="Enter food category" {...form.getInputProps('category')}/> */}
                <NumberInput
                  label="Price"
                  placeholder="Enter price"
                  {...form.getInputProps("price")}
                />

                {/* <Select
                  label="Status"
                  placeholder="Status"
                  data={['On Process', 'Packaging', 'Completed', 'Cancelled']}
                  {...form.getInputProps('status')}      
                  /> */}

                <Button type="submit">Add Food Item</Button>
              </form>
            </Modal>
          </div>
        </div>
      </div>
      {/* </div> */}
    </>
  );
};

export default Fooditems;
