import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BsArrowRightShort } from "react-icons/bs";
import { BiLike } from "react-icons/bi";
import { motion } from "framer-motion";

export default function IndexPage() {
  const [events, setEvents] = useState([]);

  // Fetch events from the server
  useEffect(() => {
    axios
      .get("/createEvent")
      .then((response) => {
        setEvents(response.data);
      })
      .catch((error) => {
        console.error("Error fetching events:", error);
      });
  }, []);

  // Like Functionality
  const handleLike = (eventId) => {
    axios
      .post(`/event/${eventId}`)
      .then((response) => {
        setEvents((prevEvents) =>
          prevEvents.map((event) =>
            event._id === eventId
              ? { ...event, likes: event.likes + 1 }
              : event
          )
        );
        console.log("Like Added:", response);
      })
      .catch((error) => {
        console.error("Error liking event:", error);
      });
  };

  return (
    <div className="mt-1 flex flex-col">
      {/* Hero Section */}
      <div className="hidden sm:block">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
          <img src="../src/assets/hero.jpg" alt="Event Banner" className="w-full h-[400px] object-cover rounded-md shadow-lg" />
        </motion.div>
      </div>

      {/* Event Grid */}
      <div className="mx-10 my-10 grid gap-x-6 gap-y-10 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 sm:mx-5">
        {events.length > 0 &&
          events.map((event) => {
            const eventDate = new Date(event.eventDate);
            const currentDate = new Date();

            if (eventDate > currentDate || eventDate.toDateString() === currentDate.toDateString()) {
              return (
                <motion.div
                  key={event._id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="relative bg-white rounded-xl shadow-md hover:shadow-xl transition-all overflow-hidden"
                >
                  {/* Event Image */}
                  <div className="relative w-full h-52">
                    {event.image && (
                      <img
                        src={`https://event-management-platform-ics5.onrender.com/api/${event.image}`}
                        alt={event.title}
                        className="w-full h-full object-cover rounded-t-xl"
                      />
                    )}
                    {/* Like Button */}
                    <button onClick={() => handleLike(event._id)} className="absolute top-3 right-3 bg-white rounded-full p-2 shadow-md hover:bg-gray-200 transition">
                      <BiLike className="text-xl text-gray-600 hover:text-red-500 transition" />
                    </button>
                  </div>

                  {/* Event Details */}
                  <div className="p-5">
                    <h1 className="text-lg font-bold text-gray-800 truncate">{event.title.toUpperCase()}</h1>

                    {/* Event Info */}
                    <div className="flex justify-between items-center text-gray-600 mt-2">
                      <span className="text-sm font-semibold">{event.eventDate.split("T")[0]}, {event.eventTime}</span>
                      <span className="text-sm font-semibold text-blue-600">
                        {event.ticketPrice === 0 ? "Free" : `Rs. ${event.ticketPrice}`}
                      </span>
                    </div>

                    {/* Organizer & Creator */}
                    <div className="mt-3 text-sm text-gray-600">
                      <p>
                        <span className="font-semibold">Organized By:</span> {event.organizedBy}
                      </p>
                      <p>
                        <span className="font-semibold">Created By:</span> {event.owner.toUpperCase()}
                      </p>
                    </div>

                    {/* Like Count */}
                    <div className="flex items-center gap-2 mt-2 text-gray-700">
                      <BiLike className="text-lg" />
                      <span>{event.likes} Likes</span>
                    </div>

                    {/* Book Ticket Button */}
                    <Link to={`/event/${event._id}`} className="mt-4 flex justify-center">
                      <button className="bg-blue-600 text-white py-2 px-6 w-full rounded-lg shadow-md hover:bg-blue-700 transition flex items-center justify-center gap-2">
                        Book Ticket <BsArrowRightShort className="w-6 h-6" />
                      </button>
                    </Link>
                  </div>
                </motion.div>
              );
            }
            return null;
          })}
      </div>
    </div>
  );
}
