import axios from "axios";
import React, { useState } from "react";

const Booking = () => {
  const newBooking = {
    name: "",
    email: "",
    phone: "",
    bookingDate: "",
    bookingTime: "",
    numberOfGuests: "",
    message: "",
  };

  const [booking, setBooking] = useState(newBooking);

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setBooking({ ...booking, [name]: value });
    console.log(booking);
  };

  const bookingHandle = async (e) => {
    e.preventDefault();
    try {
      const bookingResult = await axios.post(
        "http://localhost:3000/booking/create",
        booking,
      );

      alert("Your booking has been submitted successfully!");

      setBooking(newBooking);
    } catch (error) {
      console.log(error);
    }
  };

  return (
  
    <div className="max-w-md mx-auto mt-10 bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="text-2xl py-4 px-6 bg-red-700 text-white text-center font-bold uppercase">
        Online Booking Form
      </div>
      <form className="py-4 px-6" onSubmit={bookingHandle}>
        <div className="mb-2">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="name">
            Full Name
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="name"
            value={booking.name}
            type="text"
            name="name"
            placeholder="Enter your name"
            onChange={inputHandler}
          />
        </div>
        <div className="mb-2">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="email">
            Email
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            value={booking.email}
            type="email"
            name="email"
            placeholder="Enter your email"
            onChange={inputHandler}
          />
        </div>
        <div className="mb-2">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="phone">
            Phone Number
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="phone"
            value={booking.phone}
            type="tel"
            name="phone"
            placeholder="Enter your phone number"
            onChange={inputHandler}
          />
        </div>
        <div className="mb-2">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="date">
            Booking Date
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="date"
            value={booking.bookingDate}
            type="date"
            name="bookingDate"
            placeholder="Select a date"
            onChange={inputHandler}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="time">
            Booking Time
          </label>
          <input
            className="border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="time"
            name="bookingTime"
            type="time"
            value={booking.bookingTime}
            onChange={inputHandler}
          />
        </div>
        <div className="mb-2">
          <label
            className="block text-gray-700 font-bold mb-2"
            htmlFor="service"
          >
            Number of Guests
          </label>
          <select
            className="border rounded w-2/3 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="service"
            name="numberOfGuests"
            value={booking.numberOfGuests}
            onChange={inputHandler}
          >
            <option value="">Select Number of Guests</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
          </select>
        </div>
        <div className="mb-2">
          <label
            className="block text-gray-700 font-bold mb-2"
            htmlFor="message"
          >
            Message
          </label>
          <textarea
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="message"
            rows={4}
            value={booking.message}
            name="message"
            placeholder="Enter any additional information"
            defaultValue={""}
            onChange={inputHandler}
          />
        </div>
        <div className="flex items-center justify-center mb-4">
          <button
            className="w-full bg-red-700 text-white py-2 px-4 rounded hover:bg-red-800 hover:cursor-pointer focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Book Your Table
          </button>
        </div>
      </form>
    </div>
  );
};

export default Booking;
