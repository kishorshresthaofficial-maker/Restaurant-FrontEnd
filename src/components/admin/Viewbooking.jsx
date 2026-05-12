import axios from "axios";
import React, { use, useEffect, useState } from "react";
// import { set } from "react-datepicker/dist/dist/date_utils.js";
import { useNavigate, useParams } from "react-router";

const Viewbooking = () => {
  const { bookingId } = useParams();
  const [userData, setUserData] = useState(null);
  // const [selectedStatus, setSelectedStatus] = useState();
  const navigate = useNavigate();

  const [selectedStatus, setSelectedStatus] = useState("");

  {
    userData && new Date(userData.bookingDate).toLocaleDateString();
  }

  const getUserData = async () => {
    try {
      const res = await axios.get(`http://localhost:3000/booking/${bookingId}`);
      setUserData(res.data);

      // ✅ set initial selected value
      setSelectedStatus(res.data.status);
      // setSelectedStatus(res.data.status?.toLowerCase());
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setSelectedStatus(e.target.value);
    // console.log("Selected:", e.target.value);
  };

  const handleFormStatus = async () => { 
  try {
    const response = await axios.put(
      `http://localhost:3000/booking/updateStatus/${bookingId}`,
      { status: selectedStatus }
    );

    // navigate("/booking-list");
    navigate("/dashboard/booking-list");
  } catch (error) {
    console.log(error);
  } 
}

  useEffect(() => {
    getUserData();
  }, [bookingId]);

  return (
    <div className="h-dvh flex items-center justify-center bg-gray-100">
      <div className="bg-white overflow-hidden shadow rounded-lg border">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900 text-center">
            Booking Details
          </h3>
        </div>
        {userData && (
          <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
            <dl className="sm:divide-y sm:divide-gray-200">
              <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Full Name</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {userData.name}
                </dd>
              </div>
              <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">
                  Email Address
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {userData.email}
                </dd>
              </div>
              <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">
                  Phone Number
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {userData.phone}
                </dd>
              </div>
              <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">
                  Booking Date
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {userData?.bookingDate &&
                    new Date(userData.bookingDate).toLocaleDateString("en-GB", {
                      year: "numeric",
                      month: "long",
                      day: "2-digit",
                    })}
                </dd>
              </div>

              <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">
                  Booking Time
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {userData.bookingTime}
                </dd>
              </div>
              <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">
                  Number of Guests
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {userData.numberOfGuests}
                </dd>
              </div>
              <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Message</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {userData.message}
                </dd>
              </div>
              <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Status</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  <select
                    value={selectedStatus || ""}
                    onChange={handleChange}
                    className="border p-2 rounded w-50"
                  >
                    <option value="">Select Status</option>
                    <option value="Pending">Pending</option>
                    <option value="Confirmed">Confirmed</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </dd>
              </div>
            </dl>
          </div>
        )}
      <div className="flex justify-center p-4">
        <button
          type="button" onClick={handleFormStatus}
          className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          Update Status
        </button> 
      </div>
    </div>
    </div>
  );
};

export default Viewbooking;
