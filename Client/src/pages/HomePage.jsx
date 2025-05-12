import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';

import Testimonials from '../components/Testimonials';
import ImageCarousel from '../components/ImageCarousel';
import Footer from '../components/Footer';




const HomePage = ({ onLogin, isLoggedIn }) => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-midnight-400 to-midnight-600 text-white">
      <Navbar onLogin={onLogin} isLoggedIn={isLoggedIn} />
      <Hero onLogin={onLogin} />

      <Testimonials />
      {/* want to change to to something usefull otherwise remove in the end  -- priya*/}
      {/* <ImageCarousel /> */}
      <Footer />
    </div>
  );
};

export default HomePage;