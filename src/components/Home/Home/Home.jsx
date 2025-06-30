// Remove <Navbar /> from the top
import React, { useState, useEffect } from 'react';
import { Calendar, MapPin, Users, Star, ArrowRight, Search, Filter, Clock, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';
import EventCard from '../../EventCard';
import Navbar from '../../Navbar/Navba';
// import EventCard from '../components/EventCard';

const Homepage = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    const slideInterval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % 3);
    }, 5000);
    return () => clearInterval(slideInterval);
  }, []);

  const heroSlides = [
    {
      title: 'Discover Amazing Events',
      subtitle: 'Connect with like-minded people and create unforgettable memories',
      image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1200&h=600&fit=crop',
    },
    {
      title: 'Create Your Own Events',
      subtitle: 'Share your passion and bring people together around what you love',
      image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=1200&h=600&fit=crop',
    },
    {
      title: 'Build Communities',
      subtitle: 'Foster connections and grow networks through meaningful experiences',
      image: 'https://images.unsplash.com/photo-1505236858219-8359eb29e329?w=1200&h=600&fit=crop',
    },
  ];

  const features = [
    {
      icon: <Calendar className="w-8 h-8 text-blue-600" />,
      title: 'Easy Event Creation',
      description: 'Create and manage events effortlessly with our intuitive interface',
    },
    {
      icon: <Search className="w-8 h-8 text-green-600" />,
      title: 'Smart Search & Filter',
      description: 'Find exactly what you’re looking for with advanced search capabilities',
    },
    {
      icon: <Users className="w-8 h-8 text-purple-600" />,
      title: 'Community Building',
      description: 'Connect with people who share your interests and passions',
    },
    {
      icon: <Globe className="w-8 h-8 text-orange-600" />,
      title: 'Global Reach',
      description: 'Discover events happening around the world or in your neighborhood',
    },
  ];

  const stats = [
    { number: '50K+', label: 'Events Created' },
    { number: '200K+', label: 'Happy Users' },
    { number: '150+', label: 'Cities Covered' },
    { number: '98%', label: 'Satisfaction Rate' },
  ];

  const upcomingEvents = [
    {
      _id: '1',
      title: 'Tech Innovation Summit 2025',
      date: '2025-07-15',
      time: '09:00',
      location: 'San Francisco, CA',
      postedByName: 'John Doe',
      description: 'A summit for tech enthusiasts to explore the latest innovations.',
      attendeeCount: 234,
      attendees: [],
    },
    {
      _id: '2',
      title: 'Art & Culture Festival',
      date: '2025-07-20',
      time: '14:00',
      location: 'New York, NY',
      postedByName: 'Jane Smith',
      description: 'Celebrate art and culture with live performances and exhibits.',
      attendeeCount: 156,
      attendees: [],
    },
    {
      _id: '3',
      title: 'Startup Networking Night',
      date: '2025-07-25',
      time: '18:00',
      location: 'Austin, TX',
      postedByName: 'Alex Johnson',
      description: 'Connect with entrepreneurs and investors in a vibrant networking event.',
      attendeeCount: 89,
      attendees: [],
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Navbar />
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-purple-900/80 z-10"></div>
        {heroSlides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
            style={{
              backgroundImage: `url(${slide.image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
        ))}
        <div
          className={`relative z-20 text-center text-white max-w-4xl mx-auto px-4 transform transition-all duration-1000 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            {heroSlides[currentSlide].title}
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-200">
            {heroSlides[currentSlide].subtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/events"
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:shadow-2xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-2"
            >
              <span>Explore Events</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              to="/add-event"
              className="border-2 border-white text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-white hover:text-gray-900 transition-all duration-300"
            >
              Create Event
            </Link>
          </div>
        </div>
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex space-x-3">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide ? 'bg-white' : 'bg-white/50'
              }`}
            />
          ))}
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-r from-blue-50 to-indigo-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Why Choose EventHub?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Everything you need to create, discover, and manage amazing events in one powerful platform
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300"
              >
                <div className="mb-6">{feature.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Trending Events</h2>
            <p className="text-xl text-gray-600">Don’t miss out on these popular upcoming events</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {upcomingEvents.map((event) => (
              <EventCard
                key={event._id}
                event={event}
                onJoin={() => {}}
                userId={null}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Ready to Get Started?</h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of event organizers and attendees who trust EventHub
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/add-event"
              className="bg-white text-blue-600 px-8 py-4 rounded-full text-lg font-semibold hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
            >
              Create Your First Event
            </Link>
            <Link
              to="/events"
              className="border-2 border-white text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-white hover:text-blue-600 transition-all duration-300"
            >
              Browse Events
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Homepage;