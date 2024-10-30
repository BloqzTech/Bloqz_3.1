import { useState } from 'react';
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import AuthModal from '../components/AuthModal';

const LandingPage = () => {
  const [authMode, setAuthMode] = useState(null);

  const handleLoginClick = () => setAuthMode('login');
  const handleSignupClick = () => setAuthMode('signup');
  const handleCloseModal = () => setAuthMode(null);

  return (
    <div className="min-h-screen">
      <Navbar 
        onLoginClick={handleLoginClick}
        onSignupClick={handleSignupClick}
      />
      <HeroSection />
      <AuthModal
        isOpen={!!authMode}
        onClose={handleCloseModal}
        mode={authMode}
      />
    </div>
  );
};

export default LandingPage;