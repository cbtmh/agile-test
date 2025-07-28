import Header from '../layout/Header';
import Footer from '../layout/Footer';
import Aos from 'aos';
import 'aos/dist/aos.css'; 
import React, { useEffect } from 'react';

interface DefaultLayoutProps {
  children: React.ReactNode;}

  
const DefaultLayout = ({ children } : DefaultLayoutProps) => {
  useEffect(() => {
    Aos.init({
      duration: 800, 
      once: false, 
      mirror: true, 
    });
  }, []);
    return (
      <>
        <Header />
        <main>{children}</main>
        <Footer />
      </>
    );
  };
  
  export default DefaultLayout;