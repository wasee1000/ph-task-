import React from 'react';
import { Calendar, MapPin, Users, Clock } from 'lucide-react';
import { format } from 'date-fns';

const EventCard = ({ event, onJoin, onUpdate, onDelete, isMyEvent = false, userId }) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-3">{event.title}</h3>
        <div className="space-y-2 mb-4">
          <div className="flex items-center text-gray-600">
            <Users className="w-4 h-4 mr-2" />
            <span>Posted by: {event.postedByName}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <Calendar className="w-4 h-4 mr-2" />
            <span>{format(new Date(event.date), 'MMMM d, yyyy')}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <Clock className="w-4 h-4 mr-2" />
            <span>{event.time}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <MapPin className="w-4 h-4 mr-2" />
            <span>{event.location}</span>
          </div>
          <div className="text-gray-600">{event.description.slice(0, 100)}...</div>
          <div className="flex items-center text-gray-600">
            <Users className="w-4 h-4 mr-2" />
            <span>{event.attendeeCount} attending</span>
          </div>
        </div>
        {isMyEvent ? (
          <div className="flex gap-4">
            <button
              onClick={() => onUpdate(event)}
              className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2 rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-200"
            >
              Update
            </button>
            <button
              onClick={() => onDelete(event._id)}
              className="flex-1 bg-gradient-to-r from-red-600 to-pink-600 text-white py-2 rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-200"
            >
              Delete
            </button>
          </div>
        ) : (
          <button
            onClick={() => onJoin(event._id)}
            disabled={event.attendees.includes(userId)}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {event.attendees.includes(userId) ? 'Joined' : 'Join Event'}
          </button>
        )}
      </div>
    </div>
  );
};

export default EventCard;