import { Table } from '@mantine/core'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router';

const Bookinglist = () => {

    const [bookings, setBookings] = useState([]);



    const getBookings = async ()=> {
        try {
            const bookingResult = await axios.get("http://localhost:3000/booking/getBookings")
            setBookings(bookingResult.data)
        }
        catch(error){
            console.log(error)
        }
    }

    useEffect(() => {
  getBookings();
}, []);

  return (
    <div className='py-5 px-5 max-w-4xl mx-auto'>
      <h1 className='text-center text-2xl font-bold mb-4'>
        Booking Lists
      </h1>

      <Table highlightOnHover withBorder>
        <Table.Tr className='text-lg font-medium'>
          <Table.Th>Booking Number.</Table.Th>
          <Table.Th>Customer Name</Table.Th>
          <Table.Th>Email</Table.Th>
          <Table.Th>Contact</Table.Th>
          <Table.Th>Status</Table.Th>
          <Table.Th>Action</Table.Th>
        </Table.Tr>

       <Table.Tbody>
    {bookings.map((item, index) => (
      <Table.Tr key={index}>
      <Table.Td style={{ textAlign: 'center' }}>{index + 1}</Table.Td>
        <Table.Td>{item.name}</Table.Td>
        <Table.Td>{item.email}</Table.Td>
        <Table.Td>{item.phone}</Table.Td>
        <Table.Td>{item.status}

        </Table.Td>
        <Table.Td>
            <Link to={`/dashboard/viewBooking/${item._id}`} className="text-green-600 font-semi-bold hover:underline hover:cursor-pointer">View Details</Link>
          
        </Table.Td>
      </Table.Tr>
    ))}
  </Table.Tbody>

      </Table>
    </div>
  )
}

export default Bookinglist