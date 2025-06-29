
import React, { useState, useEffect, useContext } from 'react';
import { Calendar, MapPin, Users, Search, Filter, Clock } from 'lucide-react';
import axios from 'axios';
import { AuthContext } from './Provider/Authproviders';
import { format, startOfToday, startOfWeek, endOfWeek, startOfMonth, endOfMonth, subWeeks, subMonths } from 'date-fns';

const Events = () => {
  const { user } = useContext(AuthContext);
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch events from backend
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/events', {
          headers: { Authorization: `Bearer ${await user.getIdToken()}` },
        });
        setEvents(response.data);
        setFilteredEvents(response.data);
      } catch (err) {
        setError('Failed to fetch events. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };
    if (user) fetchEvents();
  }, [user]);

  // Handle search and filter
  useEffect(() => {
    let filtered = [...events];

    // Search by title
    if (searchTerm) {
      filtered = filtered.filter((event) =>
        event.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by date
    const today = startOfToday();
    if (filter === 'today') {
      filtered = filtered.filter((event) => format(new Date(event.date), 'yyyy-MM-dd') === format(today, 'yyyy-MM-dd'));
    } else if (filter === 'currentWeek') {
      const weekStart = startOfWeek(today);
      const weekEnd = endOfWeek(today);
      filtered = filtered.filter(
        (event) =>
          new Date(event.date) >= weekStart && new Date(event.date) <= weekEnd
      );
    } else if (filter === 'lastWeek') {
      const lastWeekStart = startOfWeek(subWeeks(today, 1));
      const lastWeekEnd = endOfWeek(subWeeks(today, 1));
      filtered = filtered.filter(
        (event) =>
          new Date(event.date) >= lastWeekStart && new Date(event.date) <= lastWeekEnd
      );
    } else if (filter === 'currentMonth') {
      const monthStart = startOfMonth(today);
      const monthEnd = endOfMonth(today);
      filtered = filtered.filter(
        (event) =>
          new Date(event.date) >= monthStart && new Date(event.date) <= monthEnd
      );
    } else if (filter === 'lastMonth') {
      const lastMonthStart = startOfMonth(subMonths(today, 1));
      const lastMonthEnd = endOfMonth(subMonths(today, 1));
      filtered = filtered.filter(
        (event) =>
          new Date(event.date) >= lastMonthStart && new Date(event.date) <= lastMonthEnd
      );
    }

    // Sort by date and time (descending)
    filtered.sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return dateB - dateA || new Date(`1970-01-01T${b.time}`) - new Date(`1970-01-01T${a.time}`);
    });

    setFilteredEvents(filtered);
  }, [searchTerm, filter, events]);

  const handleJoinEvent = async (eventId) => {
    try {
      const response = await axios.post(
        `http://localhost:5000/api/events/${eventId}/join`,
        {},
        { headers: { Authorization: `Bearer ${await user.getIdToken()}` } }
      );
      setEvents((prev) =>
        prev.map((event) =>
          event._id === eventId
            ? { ...event, attendeeCount: response.data.attendeeCount, attendees: response.data.attendees }
            : event
        )
      );
    } catch (err) {
      setError('Failed to join event. You may have already joined.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-gray-900 mb-8 text-center">All Events</h2>

        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search events by title..."
              className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-gray-600" />
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="py-3 px-4 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Events</option>
              <option value="today">Today</option>
              <option value="currentWeek">This Week</option>
              <option value="lastWeek">Last Week</option>
              <option value="currentMonth">This Month</option>
              <option value="lastMonth">Last Month</option>
            </select>
          </div>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-500/20 border border-red-500/50 text-red-700 rounded-xl text-center">
            {error}
          </div>
        )}

        {isLoading ? (
          <div className="text-center text-gray-600">Loading events...</div>
        ) : filteredEvents.length === 0 ? (
          <div className="text-center text-gray-600">No events found.</div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredEvents.map((event) => (
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
                  <button
                    onClick={() => handleJoinEvent(event._id)}
                    disabled={event.attendees.includes(user.uid)}
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {event.attendees.includes(user.uid) ? 'Joined' : 'Join Event'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Events;
