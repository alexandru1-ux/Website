import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > window.innerHeight * 0.6);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    }
    setIsOpen(false);
  };

  const goToCommissions = () => {
    navigate('/commissions');
    setIsOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const isCommissions = location.pathname === '/commissions';

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 bg-black border-b border-[#FFE000]/20 transition-all duration-500 ${
        scrolled ? 'navbar-electric-glow' : ''
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="text-2xl font-bold text-[#FFE000] hover:text-[#FFE000]/80 transition-colors">
            GoldenFX
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            <button
              onClick={() => scrollToSection('about')}
              className="text-white hover:text-[#FFE000] transition-colors font-medium"
            >
              About
            </button>
            <button
              onClick={() => scrollToSection('portfolio')}
              className="text-white hover:text-[#FFE000] transition-colors font-medium"
            >
              Portfolio
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="text-white hover:text-[#FFE000] transition-colors font-medium"
            >
              Contact
            </button>
            <button
              onClick={goToCommissions}
              className={`transition-colors font-medium ${
                isCommissions ? 'text-[#FFE000]' : 'text-white hover:text-[#FFE000]'
              }`}
            >
              Commissions
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-[#FFE000] hover:text-[#FFE000]/80 transition-colors"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden bg-black border-t border-[#FFE000]/20">
          <div className="px-4 py-4 space-y-3">
            <button
              onClick={() => scrollToSection('about')}
              className="block w-full text-left text-white hover:text-[#FFE000] transition-colors font-medium py-2"
            >
              About
            </button>
            <button
              onClick={() => scrollToSection('portfolio')}
              className="block w-full text-left text-white hover:text-[#FFE000] transition-colors font-medium py-2"
            >
              Portfolio
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="block w-full text-left text-white hover:text-[#FFE000] transition-colors font-medium py-2"
            >
              Contact
            </button>
            <button
              onClick={goToCommissions}
              className={`block w-full text-left transition-colors font-medium py-2 ${
                isCommissions ? 'text-[#FFE000]' : 'text-white hover:text-[#FFE000]'
              }`}
            >
              Commissions
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};
