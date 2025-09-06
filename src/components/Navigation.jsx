import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { Button } from './ui/button';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { museums } from '../data/museums.js';
import { ChevronDown, User, LogOut, MapPin, MessageCircle, Phone } from 'lucide-react';

const Navigation = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleMuseumSelect = (museumId) => {
    navigate(`/dashboard/${museumId}`);
  };

  return (
    <nav className="heritage-nav">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold text-heritage-primary hover:text-heritage-gold transition-colors">
          Museums Now
        </Link>
        
        <div className="flex items-center gap-6">
          {/* View All Museums Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="text-heritage-text hover:text-heritage-gold">
                <MapPin className="w-4 h-4 mr-2" />
                View All Museums
                <ChevronDown className="w-4 h-4 ml-2" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-64 bg-heritage-cream/95 backdrop-blur-sm border border-heritage-gold/20">
              {museums.map((museum) => (
                <DropdownMenuItem 
                  key={museum.id}
                  onClick={() => handleMuseumSelect(museum.id)}
                  className="hover:bg-heritage-gold/10 cursor-pointer"
                >
                  <div>
                    <div className="font-semibold text-heritage-primary">{museum.name}</div>
                    <div className="text-sm text-heritage-text/70">{museum.location}</div>
                  </div>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Contact Us */}
          <Link to="/contact">
            <Button variant="ghost" className="text-heritage-text hover:text-heritage-gold">
              <Phone className="w-4 h-4 mr-2" />
              Contact Us
            </Button>
          </Link>

          {/* Feedback */}
          <Link to="/feedback">
            <Button variant="ghost" className="text-heritage-text hover:text-heritage-gold">
              <MessageCircle className="w-4 h-4 mr-2" />
              Feedback
            </Button>
          </Link>

          {/* User Authentication */}
          {isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="border-heritage-gold text-heritage-primary hover:bg-heritage-gold/10">
                  <User className="w-4 h-4 mr-2" />
                  {user.name}
                  <ChevronDown className="w-4 h-4 ml-2" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-heritage-cream/95 backdrop-blur-sm border border-heritage-gold/20">
                <DropdownMenuItem onClick={() => navigate('/profile')} className="hover:bg-heritage-gold/10 cursor-pointer">
                  <User className="w-4 h-4 mr-2" />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleLogout} className="hover:bg-heritage-gold/10 cursor-pointer">
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link to="/auth">
              <Button className="bg-heritage-gold hover:bg-heritage-gold/90 text-heritage-primary font-semibold">
                Login / Sign Up
              </Button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;