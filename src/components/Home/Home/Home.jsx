import React, { useState, useEffect } from 'react';
import { Calendar, MapPin, Users, Star, ArrowRight, Search, Filter, Clock, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';

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
      title: "Discover Amazing Events",
      subtitle: "Connect with like-minded people and create unforgettable memories",
      image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1200&h=600&fit=crop"
    },
    {
      title: "Create Your Own Events",
      subtitle: "Share your passion and bring people together around what you love",
      image: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=1200&h=600&fit=crop"
    },
    {
      title: "Build Communities",
      subtitle: "Foster connections and grow networks through meaningful experiences",
      image: "https://images.unsplash.com/photo-1505236858219-8359eb29e329?w=1200&h=600&fit=crop"
    }
  ];

  const features = [
    {
      icon: <Calendar className="w-8 h-8 text-blue-600" />,
      title: "Easy Event Creation",
      description: "Create and manage events effortlessly with our intuitive interface"
    },
    {
      icon: <Search className="w-8 h-8 text-green-600" />,
      title: "Smart Search & Filter",
      description: "Find exactly what you're looking for with advanced search capabilities"
    },
    {
      icon: <Users className="w-8 h-8 text-purple-600" />,
      title: "Community Building",
      description: "Connect with people who share your interests and passions"
    },
    {
      icon: <Globe className="w-8 h-8 text-orange-600" />,
      title: "Global Reach",
      description: "Discover events happening around the world or in your neighborhood"
    }
  ];

  const stats = [
    { number: "50K+", label: "Events Created" },
    { number: "200K+", label: "Happy Users" },
    { number: "150+", label: "Cities Covered" },
    { number: "98%", label: "Satisfaction Rate" }
  ];

  const upcomingEvents = [
    {
      title: "Tech Innovation Summit 2025",
      date: "July 15, 2025",
      time: "9:00 AM",
      location: "San Francisco, CA",
      attendees: 234,
      category: "Technology",
      image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=300&h=200&fit=crop"
    },
    {
      title: "Art & Culture Festival",
      date: "July 20, 2025",
      time: "2:00 PM",
      location: "New York, NY",
      attendees: 156,
      category: "Arts",
      image: "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=300&h=200&fit=crop"
    },
    {
      title: "Startup Networking Night",
      date: "July 25, 2025",
      time: "6:00 PM",
      location: "Austin, TX",
      attendees: 89,
      category: "Business",
      image: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=300&h=200&fit=crop"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Navigation */}
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
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
              backgroundPosition: 'center'
            }}
          />
        ))}
        
        <div className={`relative z-20 text-center text-white max-w-4xl mx-auto px-4 transform transition-all duration-1000 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            {heroSlides[currentSlide].title}
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-200">
            {heroSlides[currentSlide].subtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:shadow-2xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-2">
              <span>Explore Events</span>
              <ArrowRight className="w-5 h-5" />
            </button>
            <button className="border-2 border-white text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-white hover:text-gray-900 transition-all duration-300">
              Create Event
            </button>
          </div>
        </div>

        {/* Slide Indicators */}
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

      {/* Stats Section */}
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

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-r from-blue-50 to-indigo-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Why Choose EventHub?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Everything you need to create, discover, and manage amazing events in one powerful platform
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300">
                <div className="mb-6">{feature.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Trending Events
            </h2>
            <p className="text-xl text-gray-600">
              Don't miss out on these popular upcoming events
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {upcomingEvents.map((event, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
                <div className="relative">
                  <img src={event.image} alt={event.title} className="w-full h-48 object-cover" />
                  <div className="absolute top-4 left-4">
                    <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                      {event.category}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{event.title}</h3>
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-gray-600">
                      <Calendar className="w-4 h-4 mr-2" />
                      <span>{event.date}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Clock className="w-4 h-4 mr-2" />
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <MapPin className="w-4 h-4 mr-2" />
                      <span>{event.location}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Users className="w-4 h-4 mr-2" />
                      <span>{event.attendees} attending</span>
                    </div>
                  </div>
                  <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-200">
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of event organizers and attendees who trust EventHub
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-blue-600 px-8 py-4 rounded-full text-lg font-semibold hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
              Create Your First Event
            </button>
            <button className="border-2 border-white text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-white hover:text-blue-600 transition-all duration-300">
              Browse Events
            </button>
          </div>
        </div>
      </section>


    </div>
  );
};

export default Homepage;