
import React, { useState, useEffect, useContext } from 'react';
import { Calendar, MapPin, Users, Clock, FileText, Edit, Trash } from 'lucide-react';
import axios from 'axios';
import { AuthContext } from './Provider/Authproviders';
import { format } from 'date-fns';

const MyEvents = () => {
  const { user } = useContext(AuthContext);
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [currentEvent, setCurrentEvent] = useState(null);
  const [formData, setFormData] = useState({ title: '', date: '', time: '', location: '', description: '' });
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  // Fetch user's events
  useEffect(() => {
    const fetchMyEvents = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/events/my-events', {
          headers: { Authorization: `Bearer ${await user.getIdToken()}` },
        });
        setEvents(response.data);
      } catch (err) {
        setError('Failed to fetch your events. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };
    if (user) fetchMyEvents();
  }, [user]);

  const openUpdateModal = (event) => {
    setCurrentEvent(event);
    setFormData({
      title: event.title,
      date: event.date.split('T')[0],
      time: event.time,
      location: event.location,
      description: event.description,
    });
    setModalOpen(true);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await axios.put(
        `http://localhost:5000/api/events/${currentEvent._id}`,
        { ...formData, postedBy: user.uid, postedByName: user.displayName || 'User' },
        { headers: { Authorization: `Bearer ${await user.getIdToken()}` } }
      );
      setEvents((prev) =>
        prev.map((event) =>
          event._id === currentEvent._id ? { ...event, ...formData } : event
        )
      );
      setModalOpen(false);
    } catch (err) {
      setError('Failed to update event. Please try again.');
    }
  };

  const handleDelete = async (eventId) => {
    try {
      await axios.delete(`http://localhost:5000/api/events/${eventId}`, {
        headers: { Authorization: `Bearer ${await user.getIdToken()}` },
      });
      setEvents((prev) => prev.filter((event) => event._id !== eventId));
      setDeleteConfirm(null);
    } catch (err) {
      setError('Failed to delete event. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-gray-900 mb-8 text-center">My Events</h2>

        {error && (
          <div className="mb-4 p-3 bg-red-500/20 border border-red-500/50 text-red-700 rounded-xl text-center">
            {error}
          </div>
        )}

        {isLoading ? (
          <div className="text-center text-gray-600">Loading events...</div>
        ) : events.length === 0 ? (
          <div className="text-center text-gray-600">You haven't created any events yet.</div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {events.map((event) => (
              <div
                key={event._id}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
              >
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
                  <div className="flex gap-4">
                    <button
                      onClick={() => openUpdateModal(event)}
                      className="flex-1 bg-blue-600 text-white py-2 rounded-xl font-semibold hover:shadow-lg transition-all duration-200"
                    >
                      <Edit className="w-4 h-4 inline mr-2" />
                      Update
                    </button>
                    <button
                      onClick={() => setDeleteConfirm(event._id)}
                      className="flex-1 bg-red-600 text-white py-2 rounded-xl font-semibold hover:shadow-lg transition-all duration-200"
                    >
                      <Trash className="w-4 h-4 inline mr-2" />
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Update Modal */}
        {modalOpen && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl p-8 max-w-md w-full">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Update Event</h3>
              <form onSubmit={handleUpdate} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Event Title</label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Date</label>
                  <input
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Time</label>
                  <input
                    type="time"
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Location</label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Description</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows="4"
                    required
                  />
                </div>
                <div className="flex gap-4">
                  <button
                    type="submit"
                    className="flex-1 bg-blue-600 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-200"
                  >
                    Update Event
                  </button>
                  <button
                    type="button"
                    onClick={() => setModalOpen(false)}
                    className="flex-1 bg-gray-600 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-200"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Delete Confirmation */}
        {deleteConfirm && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl p-8 max-w-md w-full text-center">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Confirm Delete</h3>
              <p className="text-gray-600 mb-6">Are you sure you want to delete this event?</p>
              <div className="flex gap-4">
                <button
                  onClick={() => handleDelete(deleteConfirm)}
                  className="flex-1 bg-red-600 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-200"
                >
                  Delete
                </button>
                <button
                  onClick={() => setDeleteConfirm(null)}
                  className="flex-1 bg-gray-600 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-200"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyEvents;
