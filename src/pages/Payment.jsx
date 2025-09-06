import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { 
  CreditCard, 
  Smartphone, 
  Shield, 
  CheckCircle, 
  Clock,
  MapPin,
  Users
} from 'lucide-react';
import Navigation from '../components/Navigation.jsx';
import { museums } from '../data/museums.js';
import { toast } from '@/hooks/use-toast';

const Payment = () => {
  const { museumId } = useParams();
  const navigate = useNavigate();
  const [bookingData, setBookingData] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [cardData, setCardData] = useState({
    cardNumber: '',
    expiryMonth: '',
    expiryYear: '',
    cvv: '',
    holderName: ''
  });

  const museum = museums.find(m => m.id === museumId);

  useEffect(() => {
    const storedBooking = localStorage.getItem('currentBooking');
    if (storedBooking) {
      setBookingData(JSON.parse(storedBooking));
    } else {
      toast({
        title: "No Booking Found",
        description: "Please start the booking process again.",
        variant: "destructive"
      });
      navigate('/');
    }
  }, [navigate]);

  if (!museum || !bookingData) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="flex items-center justify-center min-h-[calc(100vh-64px)]">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Loading...</h1>
          </div>
        </div>
      </div>
    );
  }

  const handlePayment = async () => {
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      localStorage.removeItem('currentBooking');
      toast({
        title: "Payment Successful!",
        description: "Your booking has been confirmed. Check your email for details."
      });
      setIsProcessing(false);
      navigate(`/dashboard/${museumId}`);
    }, 3000);
  };

  const handleUPIPayment = () => {
    toast({
      title: "UPI Payment",
      description: "This would redirect to your UPI app in a real implementation."
    });
    handlePayment();
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <Navigation />
      
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2 text-foreground">Complete Your Payment</h1>
          <p className="text-muted-foreground">Secure booking for {bookingData.museumName}</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Booking Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-8">
              <CardHeader>
                <CardTitle>Booking Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold text-lg">{bookingData.museumName}</h3>
                  <div className="flex items-center text-sm text-muted-foreground mt-1">
                    <MapPin className="mr-1 h-4 w-4" />
                    {museum.location}
                  </div>
                </div>
                
                <Separator />
                
                <div className="space-y-2">
                  <div className="flex items-center text-sm">
                    <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                    <span>{bookingData.date instanceof Date ? bookingData.date.toDateString() : bookingData.date}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                    <span>{bookingData.timeSlot}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Users className="mr-2 h-4 w-4 text-muted-foreground" />
                    <span>{bookingData.totalMembers} {bookingData.totalMembers === 1 ? 'Person' : 'People'}</span>
                  </div>
                </div>
                
                <Separator />
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Tickets ({bookingData.totalMembers}x)</span>
                    <span>₹{bookingData.totalAmount}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Booking Fee</span>
                    <span>₹0</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-semibold text-lg">
                    <span>Total</span>
                    <span>₹{bookingData.totalAmount}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Payment Options */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Shield className="mr-2 h-5 w-5" />
                  Secure Payment
                </CardTitle>
                <CardDescription>
                  Choose your preferred payment method
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="upi" className="w-full">
                  <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="upi">UPI</TabsTrigger>
                    <TabsTrigger value="card">Card</TabsTrigger>
                    <TabsTrigger value="wallet">Wallet</TabsTrigger>
                    <TabsTrigger value="netbanking">Net Banking</TabsTrigger>
                  </TabsList>

                  {/* UPI Payment */}
                  <TabsContent value="upi" className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <Button 
                        variant="outline" 
                        className="h-16 flex-col"
                        onClick={handleUPIPayment}
                        disabled={isProcessing}
                      >
                        <Smartphone className="mb-2 h-6 w-6" />
                        Google Pay
                      </Button>
                      <Button 
                        variant="outline" 
                        className="h-16 flex-col"
                        onClick={handleUPIPayment}
                        disabled={isProcessing}
                      >
                        <Smartphone className="mb-2 h-6 w-6" />
                        PhonePe
                      </Button>
                      <Button 
                        variant="outline" 
                        className="h-16 flex-col"
                        onClick={handleUPIPayment}
                        disabled={isProcessing}
                      >
                        <Smartphone className="mb-2 h-6 w-6" />
                        Paytm
                      </Button>
                      <Button 
                        variant="outline" 
                        className="h-16 flex-col"
                        onClick={handleUPIPayment}
                        disabled={isProcessing}
                      >
                        <Smartphone className="mb-2 h-6 w-6" />
                        Other UPI
                      </Button>
                    </div>
                  </TabsContent>

                  {/* Card Payment */}
                  <TabsContent value="card" className="space-y-4">
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="cardNumber">Card Number</Label>
                        <div className="relative">
                          <CreditCard className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="cardNumber"
                            placeholder="1234 5678 9012 3456"
                            className="pl-10"
                            value={cardData.cardNumber}
                            onChange={(e) => setCardData({...cardData, cardNumber: e.target.value})}
                          />
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-3 gap-4">
                        <div>
                          <Label htmlFor="expiryMonth">Month</Label>
                          <Input
                            id="expiryMonth"
                            placeholder="MM"
                            maxLength={2}
                            value={cardData.expiryMonth}
                            onChange={(e) => setCardData({...cardData, expiryMonth: e.target.value})}
                          />
                        </div>
                        <div>
                          <Label htmlFor="expiryYear">Year</Label>
                          <Input
                            id="expiryYear"
                            placeholder="YY"
                            maxLength={2}
                            value={cardData.expiryYear}
                            onChange={(e) => setCardData({...cardData, expiryYear: e.target.value})}
                          />
                        </div>
                        <div>
                          <Label htmlFor="cvv">CVV</Label>
                          <Input
                            id="cvv"
                            placeholder="123"
                            maxLength={3}
                            value={cardData.cvv}
                            onChange={(e) => setCardData({...cardData, cvv: e.target.value})}
                          />
                        </div>
                      </div>
                      
                      <div>
                        <Label htmlFor="holderName">Cardholder Name</Label>
                        <Input
                          id="holderName"
                          placeholder="Name on card"
                          value={cardData.holderName}
                          onChange={(e) => setCardData({...cardData, holderName: e.target.value})}
                        />
                      </div>
                      
                      <Button 
                        onClick={handlePayment}
                        className="w-full bg-gradient-gold text-accent-foreground hover:shadow-gold"
                        disabled={isProcessing}
                      >
                        {isProcessing ? (
                          <>
                            <Clock className="mr-2 h-4 w-4 animate-spin" />
                            Processing Payment...
                          </>
                        ) : (
                          <>
                            <CreditCard className="mr-2 h-4 w-4" />
                            Pay ₹{bookingData.totalAmount}
                          </>
                        )}
                      </Button>
                    </div>
                  </TabsContent>

                  {/* Wallet Payment */}
                  <TabsContent value="wallet" className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <Button 
                        variant="outline" 
                        className="h-16 flex-col"
                        onClick={handlePayment}
                        disabled={isProcessing}
                      >
                        <Smartphone className="mb-2 h-6 w-6" />
                        Paytm Wallet
                      </Button>
                      <Button 
                        variant="outline" 
                        className="h-16 flex-col"
                        onClick={handlePayment}
                        disabled={isProcessing}
                      >
                        <Smartphone className="mb-2 h-6 w-6" />
                        Amazon Pay
                      </Button>
                    </div>
                  </TabsContent>

                  {/* Net Banking */}
                  <TabsContent value="netbanking" className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <Button 
                        variant="outline" 
                        className="h-16 flex-col"
                        onClick={handlePayment}
                        disabled={isProcessing}
                      >
                        SBI
                      </Button>
                      <Button 
                        variant="outline" 
                        className="h-16 flex-col"
                        onClick={handlePayment}
                        disabled={isProcessing}
                      >
                        HDFC Bank
                      </Button>
                      <Button 
                        variant="outline" 
                        className="h-16 flex-col"
                        onClick={handlePayment}
                        disabled={isProcessing}
                      >
                        ICICI Bank
                      </Button>
                      <Button 
                        variant="outline" 
                        className="h-16 flex-col"
                        onClick={handlePayment}
                        disabled={isProcessing}
                      >
                        Other Banks
                      </Button>
                    </div>
                  </TabsContent>
                </Tabs>

                <div className="mt-6 p-4 bg-muted rounded-lg">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Shield className="mr-2 h-4 w-4" />
                    <span>Your payment information is encrypted and secure</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;