import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Search, Filter } from 'lucide-react';
import axios from 'axios';
// import { AuthContext } from '../Provider/Authproviders';
import { format, startOfToday, startOfWeek, endOfWeek, startOfMonth, endOfMonth, subWeeks, subMonths } from 'date-fns';
import EventCard from '../components/EventCard';
// import Navbar from '../components/Navbar';
import { AuthContext } from './Provider/Authproviders';
import Navbar from './Navbar/Navba';

const Events = () => {
  const { user, loading } = useContext(AuthContext);
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      navigate('/login');
    }
  }, [user, loading, navigate]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/events', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
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

  useEffect(() => {
    let filtered = [...events];

    if (searchTerm) {
      filtered = filtered.filter((event) =>
        event.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    const today = startOfToday();
    if (filter === 'today') {
      filtered = filtered.filter((event) => format(new Date(event.date), 'yyyy-MM-dd') === format(today, 'yyyy-MM-dd'));
    } else if (filter === 'currentWeek') {
      const weekStart = startOfWeek(today);
      const weekEnd = endOfWeek(today);
      filtered = filtered.filter(
        (event) => new Date(event.date) >= weekStart && new Date(event.date) <= weekEnd
      );
    } else if (filter === 'lastWeek') {
      const lastWeekStart = startOfWeek(subWeeks(today, 1));
      const lastWeekEnd = endOfWeek(subWeeks(today, 1));
      filtered = filtered.filter(
        (event) => new Date(event.date) >= lastWeekStart && new Date(event.date) <= lastWeekEnd
      );
    } else if (filter === 'currentMonth') {
      const monthStart = startOfMonth(today);
      const monthEnd = endOfMonth(today);
      filtered = filtered.filter(
        (event) => new Date(event.date) >= monthStart && new Date(event.date) <= monthEnd
      );
    } else if (filter === 'lastMonth') {
      const lastMonthStart = startOfMonth(subMonths(today, 1));
      const lastMonthEnd = endOfMonth(subMonths(today, 1));
      filtered = filtered.filter(
        (event) => new Date(event.date) >= lastMonthStart && new Date(event.date) <= lastMonthEnd
      );
    }

    filtered.sort((a, b) => {
      const dateA = new Date(`${a.date.split('T')[0]}T${a.time}`);
      const dateB = new Date(`${b.date.split('T')[0]}T${b.time}`);
      return dateB - dateA;
    });

    setFilteredEvents(filtered);
  }, [searchTerm, filter, events]);

  const handleJoinEvent = async (eventId) => {
    try {
      const response = await axios.post(
        `http://localhost:5000/api/events/${eventId}/join`,
        {},
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
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

  if (loading) return <div className="text-center py-20">Loading...</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
        <h2 className="text-4xl font-bold text-gray-900 mb-8 text-center">All Events</h2>

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
              <EventCard
                key={event._id}
                event={event}
                onJoin={handleJoinEvent}
                userId={user?.uid}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Events;