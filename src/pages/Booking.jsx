import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon, Plus, Trash2, Users, CreditCard } from 'lucide-react';
import { format } from 'date-fns';
import Navigation from '../components/Navigation.jsx';
import { museums } from '../data/museums.js';
import { cn } from '@/lib/utils';
import { toast } from '@/hooks/use-toast';

const Booking = () => {
  const { museumId } = useParams();
  const navigate = useNavigate();
  const museum = museums.find(m => m.id === museumId);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    age: '',
    email: '',
    phone: '+91',
    date: undefined,
    timeSlot: '',
    members: [],
    termsAccepted: false
  });

  if (!museum) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="flex items-center justify-center min-h-[calc(100vh-64px)]">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Museum Not Found</h1>
            <Button onClick={() => navigate('/')} variant="default">Return Home</Button>
          </div>
        </div>
      </div>
    );
  }

  const addMember = () => {
    if (formData.members.length < 5) {
      setFormData({
        ...formData,
        members: [...formData.members, { name: '', age: 0 }]
      });
    }
  };

  const removeMember = (index) => {
    setFormData({
      ...formData,
      members: formData.members.filter((_, i) => i !== index)
    });
  };

  const updateMember = (index, field, value) => {
    const updatedMembers = [...formData.members];
    updatedMembers[index] = { ...updatedMembers[index], [field]: value };
    setFormData({ ...formData, members: updatedMembers });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.termsAccepted) {
      toast({
        title: "Terms Required",
        description: "Please accept the terms and conditions to proceed.",
        variant: "destructive"
      });
      return;
    }

    if (!formData.date || !formData.timeSlot) {
      toast({
        title: "Missing Information",
        description: "Please select both date and time slot.",
        variant: "destructive"
      });
      return;
    }

    // Store booking data in localStorage for payment page
    const bookingData = {
      ...formData,
      museumId: museum.id,
      museumName: museum.name,
      totalMembers: formData.members.length + 1,
      totalAmount: (formData.members.length + 1) * museum.ticketPrice
    };
    
    localStorage.setItem('currentBooking', JSON.stringify(bookingData));
    navigate(`/payment/${museumId}`);
  };

  const totalMembers = formData.members.length + 1;
  const totalAmount = totalMembers * museum.ticketPrice;

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <Navigation />
      
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2 text-foreground">Book Your Visit</h1>
          <p className="text-muted-foreground">{museum.name} - {museum.location}</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Personal Information */}
            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
                <CardDescription>Your booking details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      value={formData.firstName}
                      onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      value={formData.lastName}
                      onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="age">Age</Label>
                  <Input
                    id="age"
                    type="number"
                    min="1"
                    max="120"
                    value={formData.age}
                    onChange={(e) => setFormData({...formData, age: e.target.value})}
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    required
                  />
                </div>
              </CardContent>
            </Card>

            {/* Visit Details */}
            <Card>
              <CardHeader>
                <CardTitle>Visit Details</CardTitle>
                <CardDescription>When would you like to visit?</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Booking Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !formData.date && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {formData.date ? format(formData.date, "PPP") : <span>Pick a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={formData.date}
                        onSelect={(date) => setFormData({...formData, date})}
                        disabled={(date) => date < new Date()}
                        initialFocus
                        className="pointer-events-auto"
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                
                <div>
                  <Label>Time Slot</Label>
                  <Select value={formData.timeSlot} onValueChange={(value) => setFormData({...formData, timeSlot: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select time slot" />
                    </SelectTrigger>
                    <SelectContent>
                      {museum.timings.map((time) => (
                        <SelectItem key={time} value={time}>
                          {time}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Additional Members */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="mr-2 h-5 w-5" />
                Additional Members
              </CardTitle>
              <CardDescription>
                Add up to 5 additional members (optional)
              </CardDescription>
            </CardHeader>
            <CardContent>
              {formData.members.map((member, index) => (
                <div key={index} className="flex gap-4 mb-4 p-4 border border-border rounded-lg">
                  <div className="flex-1">
                    <Label>Member Name</Label>
                    <Input
                      value={member.name}
                      onChange={(e) => updateMember(index, 'name', e.target.value)}
                      placeholder="Enter member name"
                      required
                    />
                  </div>
                  <div className="w-24">
                    <Label>Age</Label>
                    <Input
                      type="number"
                      min="1"
                      max="120"
                      value={member.age || ''}
                      onChange={(e) => updateMember(index, 'age', parseInt(e.target.value) || 0)}
                      required
                    />
                  </div>
                  <div className="w-32">
                    <Label>ID (Optional)</Label>
                    <Input
                      value={member.id || ''}
                      onChange={(e) => updateMember(index, 'id', e.target.value)}
                      placeholder="ID Number"
                    />
                  </div>
                  <Button
                    type="button"
                    variant="destructive"
                    size="icon"
                    onClick={() => removeMember(index)}
                    className="mt-6"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              
              {formData.members.length < 5 && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={addMember}
                  className="w-full"
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Add Member
                </Button>
              )}
            </CardContent>
          </Card>

          {/* Summary and Terms */}
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Booking Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Total Members:</span>
                    <span>{totalMembers}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Price per person:</span>
                    <span>₹{museum.ticketPrice}</span>
                  </div>
                  <div className="border-t pt-2 flex justify-between font-semibold">
                    <span>Total Amount:</span>
                    <span>₹{totalAmount}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Terms & Conditions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-sm text-muted-foreground space-y-2">
                    <p>• Tickets are non-refundable</p>
                    <p>• Please arrive 15 minutes before your slot</p>
                    <p>• Carry valid ID for verification</p>
                    <p>• Photography rules apply as per museum policy</p>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="terms"
                      checked={formData.termsAccepted}
                      onCheckedChange={(checked) => 
                        setFormData({...formData, termsAccepted: !!checked})
                      }
                    />
                    <Label htmlFor="terms" className="text-sm">
                      I agree to the terms and conditions
                    </Label>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Button 
            type="submit"
            className="w-full bg-gradient-gold text-accent-foreground hover:shadow-gold text-lg py-6"
            size="lg"
          >
            <CreditCard className="mr-2 h-5 w-5" />
            Proceed to Payment - ₹{totalAmount}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Booking;