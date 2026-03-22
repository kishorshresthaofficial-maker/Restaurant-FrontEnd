import React, { useEffect, useState } from "react";
import Adminmenu from "./Adminmenu";
import { Button, Modal, Select, Table } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Link, Outlet } from "react-router";
import axios from "axios";


const Fooditems = () => {
    const [opened, { open, close }] = useDisclosure(false);
    const [categories, setCategories] = useState([])
    const [menus, setMenus] = useState([])

    const addMenu=(e)=> {
      e.preventDefault();
      const res= axios.post("http://localhost:3000/menu/add", form.values)
      form.reset();
    }

    const getAllCategory = async()=> {
        const categoryResult = await axios.get("http://localhost:3000/category/getCategory");
        setCategories(categoryResult.data)
    }

    const getAllItems = async()=> {
        const menuResult = await axios.get("http://localhost:3000/menu/getItems");
        setMenus(menuResult.data)
    }

    useEffect(()=>{
      getAllCategory()
      getAllItems()
    },[])

    // console.log(categories)

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
                  <Table.Td>Category</Table.Td>
                 {/* {categories.map((item, index) => (
                  <Table.Td>{item.name}</Table.Td>
                  ))} */}
                  <Table.Td>{item.price}</Table.Td>
                  {/* <Table.Td>
                    <Select
                      placeholder="Select Status"
                      data={["In Process", "Delivered", "Completed", "Cancelled"]}
                    />
                  </Table.Td> */}
                  <Table.Td>
                    <Link to="/editItem" className="hover:underline p-3">
                      Edit
                    </Link>{" "}
                    <Link to="/deleteItem" className="hover:underline">
                      Delete
                    </Link>
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
              <form onSubmit={(e)=>addMenu(e)} className="flex flex-col gap-4 w-full">
                {/* Food Title */}
                <div className="flex items-center gap-4 w-full">
                  <label className="w-32 font-medium">Food Title</label>
                  <input
                    type="text"
                    placeholder="Enter food item title"
                    className="w-full border rounded px-3 py-2"
                  />
                </div>

                {/* Image URL */}
                <div className="flex items-center gap-4 w-full">
                  <label className="w-32 font-medium">Image URL</label>
                  <input
                    type="text"
                    placeholder="Enter image URL"
                    className="w-full border rounded px-3 py-2"
                  />
                </div>

                {/* Category */}
                <div className="flex items-center gap-4 w-full">
                  <label className="w-32 font-medium">Category</label>
                  <select className="w-75 border rounded px-3 py-2">
                    <option value="">Select category</option>

                    {categories.map((item, index) => (
                      <option value={item._id}>{item.name}</option>
                    ))}
                  </select>
                </div>

                <div className="flex items-center gap-4 w-full">
                  <label className="w-32 font-medium">Price</label>
                  <input
                    type="number"
                    placeholder="Enter Price"
                    className="w-full border rounded px-3 py-2"
                  />
                </div>

                <div className="flex items-center gap-4 w-full">
                  <label className="w-32 font-medium">Description</label>
                  <textarea
                    name="description"
                    id=""
                    className="w-75 border rounded"
                  ></textarea>
                  {/* <input
        type="text"
        placeholder="Enter image URL"
        className="w-full border rounded px-3 py-2"
      /> */}
                </div>

                {/* Submit Button */}
                <div className="flex justify-end pt-3">
                  <Button type="submit">Add Item</Button>
                </div>
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
