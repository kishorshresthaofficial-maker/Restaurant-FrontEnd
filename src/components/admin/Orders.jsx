import { Button, Modal, NumberInput, Select, Table, TextInput } from '@mantine/core'
import { useForm } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router';


const Orders = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const [orders, setOrders] = useState([])


    const form = useForm({
    initialValues: {
      name: '',
      customer: '',
      contact: '',
      price: '',
      status: ''
    },

    validate: {
      name: (value) => (value.length >2 ? null : "Name too short"),
      customer: (value) => (value.length >2 ? null : "Name too short"),
      contact: (value) => (value.length <8 ?"Enter Valid Contact Number": null) 
      // price: (value) => (value.length >1 ? null : "Enter Valid Price"),
      // status: (value) => (value.length === "" ? null : "Enter Order Status")

      // title: (value) => (value.length > 3 ? null : "Title is too short")
    },
  });

  const getOrders = async () => {
  const orderList = await axios.get("http://localhost:3000/orders/getOrders");
  // const orderList = await axios.get("https://restaurant-server-tee7.onrender.com/orders/getOrders");
  setOrders(orderList.data);
};

const handleSubmit = async (e) => {
  e.preventDefault();

  const validation = form.validate();
  if (validation.hasErrors) return;

  try {
    await axios.post(
      "http://localhost:3000/orders/add",
      form.values
    );

    form.reset();
    await getOrders();   // wait until updated list comes
    close();
  } catch (error) {
    console.error("Error adding order:", error.response?.data || error.message);
  }
};


const orderDelete = async(id) => {
  const confirmDelete = window.confirm("Are you sure to delete this order?");
  if(!confirmDelete)
    return;
  try{
    await axios.delete(`http://localhost:3000/orders/${id}`);
    setOrders((prev) => prev.filter((item)=> item._id !==id));
  }
  catch(error)
  {
    console.log(error)
  }
}

useEffect(() => {
  getOrders();
}, []);


  return (
    <div className="py-5 px-5 w-full h-dvh bg-gray-100">
      <h1 className="text-2xl font-medium">Orders</h1>
      <div className="py-5 flex flex-col">
        <div className="flex justify-end px-10">
          {" "}
          <Button variant="filled" onClick={open} size="md">
            Add Orders
          </Button>


        </div>
        <div className="py-5">
          <h1 className="text-3xl text-center font-medium">Orders</h1>
        </div>
        <div>
          {/* MANTINE TABLE */}

          <Table>
      <Table.Thead>
        <Table.Tr className="text-xl font-medium">
          <Table.Th>S.N</Table.Th>
          <Table.Th>Item Name</Table.Th>
          <Table.Th>Customer Name</Table.Th>
          <Table.Th>Contact Number</Table.Th>
          <Table.Th>Price</Table.Th>
          <Table.Th>Status</Table.Th>
          <Table.Th>Action</Table.Th>
        </Table.Tr>
      </Table.Thead>

{orders.map((item, index) => (
  // console.log(item)
      <Table.Tr>
           <Table.Td>{index+1}</Table.Td>
           <Table.Td>{item.name}</Table.Td>
          <Table.Td>{item.customer}</Table.Td>
          <Table.Td>{item.contact}</Table.Td>
          <Table.Td>{item.price}</Table.Td>
          <Table.Td>{item.status}</Table.Td>
          <Table.Td>
            <Link onClick={()=> orderDelete(item._id)} className='text-red-600 hover:underline hover:cursor-pointer'>Delete</Link>
          </Table.Td>
      </Table.Tr>
))}
    </Table>
          
        </div>

         <Modal opened={opened} onClose={close} title="Add Orders">
<form onSubmit={(e)=>handleSubmit(e)}>
       <TextInput
        withAsterisk
        label="Item Name"
        placeholder="Enter Item Name"
        {...form.getInputProps('name')}
      />
      <TextInput
        withAsterisk
        label="Customer Name"
        placeholder="Enter Your Name"
        {...form.getInputProps('customer')}
      />
      <NumberInput
        withAsterisk
        label="Contact Number"
        placeholder="Enter Contact Number"
        {...form.getInputProps('contact')}
      />
      <NumberInput
        withAsterisk
        label="Price"
        placeholder="Enter Item Price"
        {...form.getInputProps('price')}
      />

      <Select
      label="Status"
      placeholder="Status"
      data={['On Process', 'Packaging', 'Completed', 'Cancelled']}
      {...form.getInputProps('status')}      
      />
    <Button type='submit' >Add Order</Button>

</form>

         </Modal>
      </div>
    </div>
  );
}

export default Orders
