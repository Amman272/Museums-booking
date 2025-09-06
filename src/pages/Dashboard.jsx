import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin, Clock, Users, Star, Calendar, AlertTriangle } from 'lucide-react';
import Navigation from '../components/Navigation.jsx';
import { museums } from '../data/museums.js';
import { useAuth } from '../context/AuthContext.jsx';
import { toast } from '@/hooks/use-toast';

const Dashboard = () => {
  const { museumId } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  
  const museum = museums.find(m => m.id === museumId);

  if (!museum) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="flex items-center justify-center min-h-[calc(100vh-64px)]">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4 text-foreground">Museum Not Found</h1>
            <p className="text-muted-foreground mb-8">The museum you're looking for doesn't exist.</p>
            <Button onClick={() => navigate('/')} variant="default">
              Return Home
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const handleBookNow = () => {
    if (!isAuthenticated) {
      toast({
        title: "Authentication Required",
        description: "Please login to book museum visits.",
        variant: "destructive"
      });
      navigate('/auth');
      return;
    }
    navigate(`/booking/${museumId}`);
  };

  const availabilityColor = museum.availableSlots < 20 ? 'destructive' : 
                           museum.availableSlots < 50 ? 'warning' : 'success';

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Museum Header */}
        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          <div>
            <img 
              src={museum.image}
              alt={museum.name}
              className="w-full h-96 object-cover rounded-2xl shadow-museum"
            />
          </div>
          <div className="flex flex-col justify-center">
            <h1 className="text-4xl font-bold mb-4 text-foreground">{museum.name}</h1>
            <div className="flex items-center text-muted-foreground mb-4">
              <MapPin className="mr-2 h-5 w-5" />
              <span>{museum.location}</span>
            </div>
            <p className="text-lg mb-6 text-muted-foreground leading-relaxed">
              {museum.description}
            </p>
            
            {/* Availability Status */}
            <Card className="mb-6">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center">
                  <Users className="mr-2 h-5 w-5" />
                  Current Availability
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between mb-3">
                  <span>Available Slots Today:</span>
                  <Badge variant={availabilityColor === 'destructive' ? 'destructive' : 'default'}>
                    {museum.availableSlots} / {museum.totalSlots}
                  </Badge>
                </div>
                {museum.availableSlots < 20 && (
                  <div className="flex items-center text-destructive text-sm">
                    <AlertTriangle className="mr-2 h-4 w-4" />
                    Almost full - Book now to secure your spot!
                  </div>
                )}
              </CardContent>
            </Card>

            <Button 
              onClick={handleBookNow}
              className="bg-gradient-gold text-accent-foreground hover:shadow-gold text-lg py-6"
              size="lg"
            >
              <Calendar className="mr-2 h-5 w-5" />
              Book Now - ₹{museum.ticketPrice}
            </Button>
          </div>
        </div>

        {/* Museum Details */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Time Slots */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Clock className="mr-2 h-5 w-5" />
                Available Time Slots
              </CardTitle>
              <CardDescription>Choose your preferred visiting time</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-3">
                {museum.timings.map((time, index) => (
                  <div key={index} className="p-3 border border-border rounded-lg text-center">
                    <span className="font-medium">{time}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Features */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Star className="mr-2 h-5 w-5" />
                Museum Highlights
              </CardTitle>
              <CardDescription>What makes this museum special</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {museum.features.map((feature, index) => (
                  <div key={index} className="flex items-center">
                    <div className="w-2 h-2 bg-gold rounded-full mr-3" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;