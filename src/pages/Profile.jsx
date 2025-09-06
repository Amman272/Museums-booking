import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { 
  User, 
  Mail, 
  Calendar, 
  MapPin, 
  Clock, 
  Users, 
  CheckCircle, 
  AlertCircle,
  Building2
} from 'lucide-react';
import Navigation from '../components/Navigation.jsx';
import { useAuth } from '../context/AuthContext.jsx';

const Profile = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  if (!isAuthenticated || !user) {
    navigate('/auth');
    return null;
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'confirmed':
        return <CheckCircle className="h-4 w-4 text-success" />;
      case 'pending':
        return <Clock className="h-4 w-4 text-warning" />;
      case 'cancelled':
        return <AlertCircle className="h-4 w-4 text-destructive" />;
      default:
        return <Clock className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const getStatusVariant = (status) => {
    switch (status) {
      case 'confirmed':
        return 'default';
      case 'cancelled':
        return 'destructive';
      default:
        return 'secondary';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <Navigation />
      
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Profile Header */}
        <div className="mb-8">
          <Card className="bg-gradient-heritage text-primary-foreground">
            <CardContent className="p-8">
              <div className="flex items-center space-x-6">
                <Avatar className="h-24 w-24">
                  <AvatarFallback className="text-2xl bg-gold text-accent-foreground">
                    {user.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h1 className="text-3xl font-bold mb-2">Welcome back, {user.name}!</h1>
                  <div className="flex items-center text-primary-foreground/80 mb-2">
                    <Mail className="mr-2 h-4 w-4" />
                    <span>{user.email}</span>
                  </div>
                  <div className="flex items-center text-primary-foreground/80">
                    <Building2 className="mr-2 h-4 w-4" />
                    <span>Museums Now Member</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Statistics */}
          <div className="lg:col-span-1">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Your Stats</CardTitle>
                  <CardDescription>Your museum journey so far</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Total Bookings</span>
                    <span className="font-semibold text-2xl">{user.bookings.length}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Museums Visited</span>
                    <span className="font-semibold text-2xl">
                      {new Set(user.bookings.map(b => b.museumId)).size}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Total Spent</span>
                    <span className="font-semibold text-2xl">
                      ₹{user.bookings.reduce((sum, booking) => sum + booking.totalAmount, 0)}
                    </span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button 
                    onClick={() => navigate('/')}
                    className="w-full bg-gradient-gold text-accent-foreground hover:shadow-gold"
                  >
                    <Building2 className="mr-2 h-4 w-4" />
                    Explore Museums
                  </Button>
                  <Button 
                    variant="outline"
                    onClick={() => navigate('/feedback')}
                    className="w-full"
                  >
                    Share Feedback
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Booking History */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calendar className="mr-2 h-5 w-5" />
                  Booking History
                </CardTitle>
                <CardDescription>Your past and upcoming museum visits</CardDescription>
              </CardHeader>
              <CardContent>
                {user.bookings.length === 0 ? (
                  <div className="text-center py-8">
                    <Building2 className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground mb-4">No bookings yet</p>
                    <Button 
                      onClick={() => navigate('/')}
                      className="bg-gradient-gold text-accent-foreground hover:shadow-gold"
                    >
                      Book Your First Visit
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {user.bookings.map((booking) => (
                      <Card key={booking.id} className="border-l-4 border-l-gold">
                        <CardContent className="p-6">
                          <div className="flex justify-between items-start mb-4">
                            <div>
                              <h3 className="font-semibold text-lg">{booking.museumName}</h3>
                              <div className="flex items-center space-x-4 mt-2 text-sm text-muted-foreground">
                                <div className="flex items-center">
                                  <Calendar className="mr-1 h-4 w-4" />
                                  <span>{booking.date}</span>
                                </div>
                                <div className="flex items-center">
                                  <Clock className="mr-1 h-4 w-4" />
                                  <span>{booking.timeSlot}</span>
                                </div>
                                <div className="flex items-center">
                                  <Users className="mr-1 h-4 w-4" />
                                  <span>{booking.members.length + 1} people</span>
                                </div>
                              </div>
                            </div>
                            <div className="text-right">
                              <Badge variant={getStatusVariant(booking.status)} className="mb-2">
                                <div className="flex items-center">
                                  {getStatusIcon(booking.status)}
                                  <span className="ml-1 capitalize">{booking.status}</span>
                                </div>
                              </Badge>
                              <p className="font-semibold">₹{booking.totalAmount}</p>
                            </div>
                          </div>

                          {booking.members.length > 0 && (
                            <div>
                              <p className="text-sm font-medium mb-2">Members:</p>
                              <div className="flex flex-wrap gap-2">
                                {booking.members.map((member, index) => (
                                  <Badge key={index} variant="outline" className="text-xs">
                                    {member.name} ({member.age}y)
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          )}

                          <div className="flex justify-end mt-4">
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => navigate(`/dashboard/${booking.museumId}`)}
                            >
                              <Building2 className="mr-1 h-3 w-3" />
                              View Museum
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;