import React, { useEffect, useState } from 'react'
import Adminmenu from './Adminmenu'
import { Button, Modal, Table, TextInput } from '@mantine/core'
import axios from 'axios'
import { useDisclosure } from '@mantine/hooks'

const Reservations = () => {
  const [reservations, setReservations] = useState([])

  const [opened, { open, close}]= useDisclosure(false);

  const getReservations = async () => {
    try{
      const reservationResult = await axios.get(
        "http://localhost:3000/reservations/getReservations"
        // "https://restaurant-server-tee7.onrender.com/reservations/getReservations"
      )
      setReservations(reservationResult.data)
    }
    catch(error){
      console.log(error)
    }
  }

  useEffect(()=>{
    getReservations()
  })

  return (
    <div className="py-5 px-5 w-full h-dvh bg-gray-100">
           <h1 className="text-2xl font-medium">Orders</h1>
           <div className="py-5 flex flex-col">
             <div className="flex justify-end px-10">
               {" "}
               <Button variant="filled" onClick={open} size="md">
                 Add Reservation
               </Button>
     
     
             </div>
             <div className="py-5">
               <h1 className="text-3xl text-center font-medium">Reservations</h1>
             </div>
           </div>

        {/* Table Starts */}

        <div>
            <Table>
                <Table.Tr className='text-lg font-medium'>
                    <Table.Th>Customer Name</Table.Th>
                    <Table.Th>Contact</Table.Th>
                    <Table.Th>Total Guests</Table.Th>
                    <Table.Th>Date</Table.Th>
                    <Table.Th>Time</Table.Th>
                    <Table.Th>Status</Table.Th>
                    <Table.Th>Action</Table.Th>
                </Table.Tr>

              {reservations.map((item,index)=> (
                  <Table.Tr>
                    <Table.Td>{item.fullname}</Table.Td>
                    <Table.Td>{item.contact}</Table.Td>
                    <Table.Td>{item.guests}</Table.Td>
                    <Table.Td>{item.reservation_date}</Table.Td>
                    <Table.Td>{item.reservation_time}</Table.Td>
                    <Table.Td>{item.status}</Table.Td>
                    <Table.Td>Edit | Delete</Table.Td>

                </Table.Tr>
              ))}  
              
            </Table>
        </div>

        <Modal opened={opened} onClose={close} title="Add Reservation">
              <form>
                <label>Customer Name</label>
                <input type="text" name='name' placeholder='Enter Customer Name' />

                <label>Reservation Date</label>
                <input type="time" />
              </form>
        </Modal>

    </div>
  )
}

export default Reservations
