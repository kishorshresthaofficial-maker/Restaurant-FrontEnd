import React, { useEffect, useState } from "react";
import Adminmenu from "./Adminmenu";
import { Button, Group, Modal, Select, Switch, Table } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Link } from "react-router";
import axios from "axios";

const Addcategories = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const [category, setCategory]= useState([])

  const getCategoryList = async()=>{
    const categoryListResult = await axios.get("http://localhost:3000/category/getCategory");
    setCategory(categoryListResult.data)


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
                <Table.Td>Status</Table.Td>
                <Table.Td>Actions</Table.Td>
              </Table.Tr>

              {category.map((item, index) => (
                <Table.Tr>
                  <Table.Td>{item.name}</Table.Td>
                  <Table.Td>
                    <Group justify="center">
                      <Switch size="lg" onLabel="Available" offLabel="Not Available"></Switch>
                    </Group>
                  </Table.Td>
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



          <div>

            <Modal
              opened={opened}
              onClose={close}
              title="Add New Category"
              centered
            >
              <form className="flex flex-col gap-4 w-full">
                {/* Food Title */}
                <div className="flex items-center gap-4 w-full">
                  <label className="w-32 font-medium">Category Name</label>
                  <input
                    type="text"
                    placeholder="Enter food item title"
                    className="w-full border rounded px-3 py-2"
                  />
                </div>

                {/* Submit Button */}
                <div className="flex justify-end pt-3">
                  <Button type="submit">Add Category</Button>
                </div>
              </form>
            </Modal>
          </div>
        </div>
      </div>
    </>
  );
};

export default Addcategories;
