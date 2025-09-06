import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navigation from '../components/Navigation.jsx';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, MapPin, Clock, Users } from 'lucide-react';
import { museums } from '../data/museums.js';
import heroImage from '../assets/hero-museum.jpg';

const Home = () => {
  const [selectedMuseum, setSelectedMuseum] = useState('');
  const navigate = useNavigate();

  const handleSearch = () => {
    if (selectedMuseum) {
      navigate(`/dashboard/${selectedMuseum}`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${heroImage})`,
            filter: 'brightness(0.7)'
          }}
        />
        <div className="absolute inset-0 bg-primary/30" />
        
        <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 animate-fade-in">
            Discover India's
            <span className="text-gold block">Cultural Heritage</span>
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-12 animate-fade-in">
            Book your museum visits and explore centuries of art, history, and culture
          </p>
          
          {/* Search Section */}
          <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-8 shadow-museum animate-slide-up">
            <h2 className="text-2xl font-semibold text-foreground mb-6">Find Your Next Cultural Adventure</h2>
            <div className="flex flex-col md:flex-row gap-4 items-end">
              <div className="flex-1">
                <label className="text-sm font-medium text-muted-foreground mb-2 block">
                  Select Museum
                </label>
                <Select value={selectedMuseum} onValueChange={setSelectedMuseum}>
                  <SelectTrigger className="h-12 text-left">
                    <SelectValue placeholder="Choose a museum to visit..." />
                  </SelectTrigger>
                  <SelectContent>
                    {museums.map((museum) => (
                      <SelectItem key={museum.id} value={museum.id}>
                        <div>
                          <div className="font-medium">{museum.name}</div>
                          <div className="text-sm text-muted-foreground">{museum.location}</div>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <Button 
                onClick={handleSearch}
                disabled={!selectedMuseum}
                className="h-12 px-8 bg-gradient-gold text-accent-foreground hover:shadow-gold"
              >
                <Search className="mr-2 h-5 w-5" />
                Explore Museum
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16 text-foreground">
            Why Choose Museums Now?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-gradient-gold rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="h-8 w-8 text-accent-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-foreground">Easy Discovery</h3>
              <p className="text-muted-foreground">Find and explore India's finest museums with detailed information and beautiful galleries.</p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-gradient-gold rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="h-8 w-8 text-accent-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-foreground">Quick Booking</h3>
              <p className="text-muted-foreground">Book your visits in advance with flexible time slots and secure payment options.</p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-gradient-gold rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-accent-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-foreground">Group Friendly</h3>
              <p className="text-muted-foreground">Bring family and friends with easy group booking and member management.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;