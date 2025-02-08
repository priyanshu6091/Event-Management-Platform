import { Link } from "react-router-dom";
import { IoMdArrowBack } from "react-icons/io";
import { RiDeleteBinLine } from "react-icons/ri";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { UserContext } from "../UserContext";
import { motion } from "framer-motion";

export default function TicketPage() {
  const { user } = useContext(UserContext);
  const [userTickets, setUserTickets] = useState([]);

  useEffect(() => {
    if (user) {
      fetchTickets();
    }
  }, [user]);

  const fetchTickets = async () => {
    axios
      .get(`/tickets/user/${user._id}`)
      .then((response) => {
        setUserTickets(response.data);
      })
      .catch((error) => {
        console.error("Error fetching user tickets:", error);
      });
  };

  const deleteTicket = async (ticketId) => {
    try {
      await axios.delete(`/tickets/${ticketId}`);
      fetchTickets();
      alert("Ticket Deleted");
    } catch (error) {
      console.error("Error deleting ticket:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8 flex justify-between items-center">
          <Link to="/">
            <motion.button
              whileTap={{ scale: 0.9 }}
              className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-700 transition"
            >
              <IoMdArrowBack className="w-5 h-5 mr-2" />
              Back
            </motion.button>
          </Link>
          <div className="hidden xl:block text-gray-700">
            <RiDeleteBinLine className="h-7 w-7 text-red-600" />
          </div>
        </div>

        {/* Ticket List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {userTickets.map((ticket) => (
            <motion.div
              key={ticket._id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="relative bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all"
            >
              {/* Delete Button */}
              <button
                onClick={() => deleteTicket(ticket._id)}
                className="absolute top-3 right-3 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition"
              >
                <RiDeleteBinLine className="h-5 w-5" />
              </button>

              {/* QR Code & Event Info */}
              <div className="flex flex-col items-center text-center">
                <img
                  src={ticket.ticketDetails.qr}
                  alt="QR Code"
                  className="w-32 h-32 object-cover rounded-md shadow-md"
                />
                <h2 className="text-xl font-bold text-gray-800 mt-4">{ticket.ticketDetails.eventname.toUpperCase()}</h2>
                <p className="text-sm text-gray-600 mt-1">
                  📅 {ticket.ticketDetails.eventdate.split("T")[0]} | ⏰ {ticket.ticketDetails.eventtime}
                </p>
              </div>

              {/* Ticket Details */}
              <div className="mt-4 text-sm text-gray-700">
                <p>
                  <span className="font-semibold">Name:</span> {ticket.ticketDetails.name.toUpperCase()}
                </p>
                <p>
                  <span className="font-semibold">Price:</span>{" "}
                  {ticket.ticketDetails.ticketprice === 0 ? "Free" : `Rs. ${ticket.ticketDetails.ticketprice}`}
                </p>
                <p>
                  <span className="font-semibold">Email:</span> {ticket.ticketDetails.email}
                </p>
                <p>
                  <span className="font-semibold">Ticket ID:</span> {ticket.ticketDetails._id}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* No Tickets Message */}
        {userTickets.length === 0 && (
          <p className="text-center text-gray-600 mt-10">You have no tickets yet.</p>
        )}
      </div>
    </div>
  );
}
