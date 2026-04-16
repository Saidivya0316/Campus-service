import React from 'react';
import Hero from '../Components/Hero';
import Categories from '../Components/Categories';
import Marketplace from '../Components/Marketplace';
import HowItWorks from '../Components/HowItWorks';
import WhySection from '../Components/WhySection';


const Home = () => {
  return (
    <div>
      <Hero />
      <Categories />
      <Marketplace />
      <HowItWorks />
       <WhySection />

    </div>
  );
};

export default Home;