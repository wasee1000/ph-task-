import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, MapPin, Users, Clock, FileText, Edit, Trash } from 'lucide-react';
import axios from 'axios';
// import { AuthContext } from '../Provider/Authproviders';
import { toast } from 'react-toastify';
import EventCard from '../components/EventCard';
import { AuthContext } from './Provider/Authproviders';

const MyEvents = () => {
  const { user, loading } = useContext(AuthContext);
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [currentEvent, setCurrentEvent] = useState(null);
  const [formData, setFormData] = useState({ title: '', date: '', time: '', location: '', description: '' });
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      navigate('/login');
    }
  }, [user, loading, navigate]);

  useEffect(() => {
    const fetchMyEvents = async () => {
      if (!user) return;
      setIsLoading(true);
      try {
        const token = await user.getIdToken();
        const response = await axios.get('http://localhost:5000/api/events/my-events', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setEvents(response.data);
      } catch (err) {
        setError('Failed to fetch your events. Please try again.');
        toast.error('Failed to fetch your events.');
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
    if (!formData.title || !formData.date || !formData.time || !formData.location || !formData.description) {
      setError('All fields are required');
      toast.error('All fields are required');
      return;
    }
    setIsUpdating(true);
    try {
      const token = await user.getIdToken();
      await axios.put(
        `http://localhost:5000/api/events/${currentEvent._id}`,
        { ...formData, postedByName: user.name || 'User' },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setEvents((prev) =>
        prev.map((event) =>
          event._id === currentEvent._id ? { ...event, ...formData } : event
        )
      );
      setModalOpen(false);
      toast.success('Event updated successfully');
    } catch (err) {
      setError('Failed to update event. Please try again.');
      toast.error('Failed to update event.');
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDelete = async (eventId) => {
    setIsDeleting(true);
    try {
      const token = await user.getIdToken();
      await axios.delete(`http://localhost:5000/api/events/${eventId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setEvents((prev) => prev.filter((event) => event._id !== eventId));
      setDeleteConfirm(null);
      toast.success('Event deleted successfully');
    } catch (err) {
      setError('Failed to delete event. Please try again.');
      toast.error('Failed to delete event.');
    } finally {
      setIsDeleting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-gray-900 mb-8 text-center">My Events</h2>

        {error && (
          <div className="mb-4 p-3 bg-red-500/20 border border-red-500/50 text-red-700 rounded-xl text-center">
            {error}
          </div>
        )}

        {isLoading ? (
          <div className="text-center text-gray-600 flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-t-4 border-blue-600 mr-2"></div>
            Loading events...
          </div>
        ) : events.length === 0 ? (
          <div className="text-center text-gray-600">You haven't created any events yet.</div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {events.map((event) => (
              <EventCard
                key={event._id}
                event={event}
                onUpdate={openUpdateModal}
                onDelete={setDeleteConfirm}
                isMyEvent={true}
                userId={user.uid}
              />
            ))}
          </div>
        )}

        {modalOpen && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl p-8 max-w-md w-full">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Update Event</h3>
              {error && (
                <div className="mb-4 p-3 bg-red-500/20 border border-red-500/50 text-red-700 rounded-xl text-center">
                  {error}
                </div>
              )}
              <form onSubmit={handleUpdate} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700" htmlFor="title">
                    Event Title
                  </label>
                  <input
                    id="title"
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                    aria-required="true"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700" htmlFor="date">
                    Date
                  </label>
                  <input
                    id="date"
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                    aria-required="true"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700" htmlFor="time">
                    Time
                  </label>
                  <input
                    id="time"
                    type="time"
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                    aria-required="true"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700" htmlFor="location">
                    Location
                  </label>
                  <input
                    id="location"
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                    aria-required="true"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700" htmlFor="description">
                    Description
                  </label>
                  <textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows="4"
                    required
                    aria-required="true"
                  />
                </div>
                <div className="flex gap-4">
                  <button
                    type="submit"
                    disabled={isUpdating}
                    className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    aria-label="Update Event"
                  >
                    {isUpdating ? 'Updating...' : 'Update Event'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setModalOpen(false)}
                    className="flex-1 bg-gradient-to-r from-gray-600 to-gray-800 text-white py-3 rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-200"
                    aria-label="Cancel"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {deleteConfirm && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl p-8 max-w-md w-full text-center">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Confirm Delete</h3>
              <p className="text-gray-600 mb-6">Are you sure you want to delete this event?</p>
              <div className="flex gap-4">
                <button
                  onClick={() => handleDelete(deleteConfirm)}
                  disabled={isDeleting}
                  className="flex-1 bg-gradient-to-r from-red-600 to-pink-600 text-white py-3 rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  aria-label="Confirm Delete"
                >
                  {isDeleting ? 'Deleting...' : 'Delete'}
                </button>
                <button
                  onClick={() => setDeleteConfirm(null)}
                  className="flex-1 bg-gradient-to-r from-gray-600 to-gray-800 text-white py-3 rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-200"
                  aria-label="Cancel"
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