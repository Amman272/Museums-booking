import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Star, 
  Send, 
  Heart, 
  MessageSquare, 
  Building2,
  ThumbsUp,
  Award
} from 'lucide-react';
import Navigation from '../components/Navigation.jsx';
import { museums } from '../data/museums.js';
import { toast } from '@/hooks/use-toast';

const Feedback = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    museumId: '',
    rating: 0,
    visitDate: '',
    feedbackType: '',
    title: '',
    message: '',
    wouldRecommend: ''
  });

  const [hoveredRating, setHoveredRating] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (formData.rating === 0) {
      toast({
        title: "Rating Required",
        description: "Please provide a rating for your experience.",
        variant: "destructive"
      });
      return;
    }
    
    // Simulate form submission
    toast({
      title: "Thank You!",
      description: "Your feedback has been submitted. We appreciate your input!"
    });
    
    // Reset form
    setFormData({
      name: '',
      email: '',
      museumId: '',
      rating: 0,
      visitDate: '',
      feedbackType: '',
      title: '',
      message: '',
      wouldRecommend: ''
    });
    setHoveredRating(0);
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleRatingClick = (rating) => {
    setFormData(prev => ({
      ...prev,
      rating
    }));
  };

  const getRatingText = (rating) => {
    switch (rating) {
      case 1: return 'Poor';
      case 2: return 'Fair';
      case 3: return 'Good';
      case 4: return 'Very Good';
      case 5: return 'Excellent';
      default: return '';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <Navigation />
      
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Heart className="h-8 w-8 text-gold mr-2" />
            <h1 className="text-4xl font-bold text-foreground">Share Your Experience</h1>
          </div>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Your feedback helps us improve and helps other visitors discover amazing cultural experiences.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Feedback Stats */}
          <div className="lg:col-span-1">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Award className="mr-2 h-5 w-5 text-gold" />
                    Why Your Feedback Matters
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <ThumbsUp className="h-5 w-5 text-gold mt-1" />
                    <div>
                      <p className="font-medium text-sm">Improve Services</p>
                      <p className="text-xs text-muted-foreground">Help museums enhance visitor experience</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <Building2 className="h-5 w-5 text-gold mt-1" />
                    <div>
                      <p className="font-medium text-sm">Guide Others</p>
                      <p className="text-xs text-muted-foreground">Help fellow culture enthusiasts choose</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <Star className="h-5 w-5 text-gold mt-1" />
                    <div>
                      <p className="font-medium text-sm">Recognition</p>
                      <p className="text-xs text-muted-foreground">Outstanding museums get featured</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Quick Tips</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm text-muted-foreground">
                  <p>• Be specific about your experience</p>
                  <p>• Mention staff helpfulness</p>
                  <p>• Share what you loved most</p>
                  <p>• Suggest improvements if any</p>
                  <p>• Include details about accessibility</p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Feedback Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MessageSquare className="mr-2 h-5 w-5" />
                  Tell Us About Your Visit
                </CardTitle>
                <CardDescription>
                  Share your museum experience to help us serve you better
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Basic Information */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Your Name</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        placeholder="Enter your name"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        placeholder="Enter your email"
                        required
                      />
                    </div>
                  </div>

                  {/* Museum and Visit Details */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="museum">Which Museum?</Label>
                      <Select value={formData.museumId} onValueChange={(value) => handleInputChange('museumId', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select museum" />
                        </SelectTrigger>
                        <SelectContent>
                          {museums.map((museum) => (
                            <SelectItem key={museum.id} value={museum.id}>
                              {museum.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="visitDate">Visit Date</Label>
                      <Input
                        id="visitDate"
                        type="date"
                        value={formData.visitDate}
                        onChange={(e) => handleInputChange('visitDate', e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  {/* Rating */}
                  <div>
                    <Label>Overall Rating *</Label>
                    <div className="flex items-center space-x-2 mt-2">
                      {[1, 2, 3, 4, 5].map((rating) => (
                        <button
                          key={rating}
                          type="button"
                          className="focus:outline-none"
                          onMouseEnter={() => setHoveredRating(rating)}
                          onMouseLeave={() => setHoveredRating(0)}
                          onClick={() => handleRatingClick(rating)}
                        >
                          <Star
                            className={`h-8 w-8 ${
                              rating <= (hoveredRating || formData.rating)
                                ? 'fill-gold text-gold'
                                : 'text-muted-foreground'
                            } transition-colors`}
                          />
                        </button>
                      ))}
                      {(hoveredRating || formData.rating) > 0 && (
                        <span className="ml-4 text-sm font-medium">
                          {getRatingText(hoveredRating || formData.rating)}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Feedback Type */}
                  <div>
                    <Label htmlFor="feedbackType">Feedback Type</Label>
                    <Select value={formData.feedbackType} onValueChange={(value) => handleInputChange('feedbackType', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="What type of feedback?" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="general">General Experience</SelectItem>
                        <SelectItem value="booking">Booking Process</SelectItem>
                        <SelectItem value="staff">Staff Service</SelectItem>
                        <SelectItem value="facilities">Facilities</SelectItem>
                        <SelectItem value="exhibits">Exhibits & Collections</SelectItem>
                        <SelectItem value="suggestion">Suggestion</SelectItem>
                        <SelectItem value="complaint">Complaint</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Feedback Title */}
                  <div>
                    <Label htmlFor="title">Feedback Title</Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) => handleInputChange('title', e.target.value)}
                      placeholder="Summarize your experience in one line"
                      required
                    />
                  </div>

                  {/* Detailed Message */}
                  <div>
                    <Label htmlFor="message">Your Experience</Label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => handleInputChange('message', e.target.value)}
                      placeholder="Tell us about your visit in detail. What did you love? What could be improved?"
                      className="min-h-[120px]"
                      required
                    />
                  </div>

                  {/* Recommendation */}
                  <div>
                    <Label htmlFor="recommend">Would you recommend this museum?</Label>
                    <Select value={formData.wouldRecommend} onValueChange={(value) => handleInputChange('wouldRecommend', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Would you recommend?" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="definitely">Definitely!</SelectItem>
                        <SelectItem value="probably">Probably</SelectItem>
                        <SelectItem value="maybe">Maybe</SelectItem>
                        <SelectItem value="probably-not">Probably not</SelectItem>
                        <SelectItem value="definitely-not">Definitely not</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full bg-gradient-gold text-accent-foreground hover:shadow-gold"
                  >
                    <Send className="mr-2 h-4 w-4" />
                    Submit Feedback
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Feedback;