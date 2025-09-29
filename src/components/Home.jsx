import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Shield, Brain, Smartphone, TrendingUp, Users, Star } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import heroImage from '../assets/home_hero_banner.png';
import finHealthImage from '../assets/finhealth_product.png';
import kitchenAIImage from '../assets/kitchen_product.png';

const Home = () => {
  const features = [
    {
      icon: <TrendingUp className="w-8 h-8 text-primary" />,
      title: "Save Healthcare Costs",
      description: "AI analyzes personal data to predict and optimize medical costs, helping you save up to 30% annually."
    },
    {
      icon: <Shield className="w-8 h-8 text-secondary" />,
      title: "Smart Financial Management",
      description: "Split medical payments with BNPL, eliminating immediate financial burden when healthcare is needed."
    },
    {
      icon: <Brain className="w-8 h-8 text-accent" />,
      title: "Personalized Health",
      description: "Combine health and financial data to provide personalized nutrition and lifestyle advice."
    }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      age: "34 years old",
      content: "Healyz helped me save 40% on my health insurance costs and manage my healthcare finances more effectively.",
      rating: 5
    },
    {
      name: "Michael Chen",
      age: "28 years old",
      content: "The BNPL feature for healthcare was truly helpful when I needed emergency surgery.",
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-muted to-secondary/20 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
                Optimize{' '}
                <span className="text-primary">Healthcare Finance</span>{' '}
                and{' '}
                <span className="text-secondary">Nutrition</span>{' '}
                with <span className="ai-text">AI</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Healyz offers a comprehensive AI solution to help you intelligently manage healthcare costs, 
                optimize insurance, and personalize nutrition for a healthier life.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-primary hover:bg-primary/90">
                  Get Started Free
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
                <Button size="lg" variant="outline">
                  View Demo
                </Button>
              </div>
            </div>
            <div className="relative">
              <img 
                src={heroImage} 
                alt="Healyz AI Healthcare Technology" 
                className="w-full h-auto rounded-lg shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-20 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Products
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Two advanced AI solutions to help you intelligently manage healthcare finance and nutrition
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* FinHealth AI */}
            <Card className="overflow-hidden">
              <CardContent className="p-8">
                <div className="mb-6">
                  <img 
                    src={finHealthImage} 
                    alt="FinHealth AI Dashboard" 
                    className="w-full h-64 object-cover rounded-lg"
                  />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  FinHealth <span className="ai-text">AI</span> - Smart Healthcare Finance
                </h3>
                <p className="text-gray-600 mb-6">
                  Predict medical costs, optimize insurance, and flexibly manage healthcare payments 
                  with advanced AI technology.
                </p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center text-gray-600">
                    <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                    Personalized medical cost prediction
                  </li>
                  <li className="flex items-center text-gray-600">
                    <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                    Optimized insurance plans
                  </li>
                  <li className="flex items-center text-gray-600">
                    <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                    BNPL for healthcare - Split payments
                  </li>
                  <li className="flex items-center text-gray-600">
                    <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                    Wearable device and electronic health record integration
                  </li>
                </ul>
                <Link to="/finhealth-ai">
                  <Button className="w-full bg-primary hover:bg-primary/90">
                    Learn More
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Kitchen AI */}
            <Card className="overflow-hidden">
              <CardContent className="p-8">
                <div className="mb-6 relative">
                  <img 
                    src={kitchenAIImage} 
                    alt="Kitchen AI Mockup" 
                    className="w-full h-64 object-cover rounded-lg"
                  />
                  <div className="absolute top-4 right-4 bg-accent text-white px-3 py-1 rounded-full text-sm font-medium">
                    Coming Soon
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Kitchen <span className="ai-text">AI</span> - Personalized Nutrition
                </h3>
                <p className="text-gray-600 mb-6">
                  <span className="ai-text">AI</span>-powered personalized nutrition based on health profiles and optimized smart kitchen.
                </p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center text-gray-600">
                    <div className="w-2 h-2 bg-secondary rounded-full mr-3"></div>
                    Food suggestions based on health conditions
                  </li>
                  <li className="flex items-center text-gray-600">
                    <div className="w-2 h-2 bg-secondary rounded-full mr-3"></div>
                    Reduce food waste
                  </li>
                  <li className="flex items-center text-gray-600">
                    <div className="w-2 h-2 bg-secondary rounded-full mr-3"></div>
                    Smart kitchen integration
                  </li>
                  <li className="flex items-center text-gray-600">
                    <div className="w-2 h-2 bg-secondary rounded-full mr-3"></div>
                    Smart meal planning
                  </li>
                </ul>
                <Link to="/kitchen-ai">
                  <Button className="w-full bg-secondary hover:bg-secondary/90">
                    Get Notified
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Key Benefits
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Healyz brings practical benefits to your life and finances
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center">
                <CardContent className="p-8">
                  <div className="flex justify-center mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              What Our Customers Say
            </h2>
            <p className="text-xl text-gray-600">
              Positive feedback from Healyz users
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index}>
                <CardContent className="p-8">
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-600 mb-6 italic">
                    "{testimonial.content}"
                  </p>
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mr-4">
                      <Users className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                      <p className="text-gray-600">{testimonial.age}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* App Download Section */}
      <section className="py-20 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Get the Healyz App</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Take your healthcare financial planning on the go with our mobile app. Available for Android devices.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Why Download the App?</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center mt-1">
                    <Smartphone className="w-3 h-3 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">On-the-Go Access</h4>
                    <p className="text-gray-600">Access your healthcare predictions and financial planning anywhere, anytime.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-secondary/10 rounded-full flex items-center justify-center mt-1">
                    <Brain className="w-3 h-3 text-secondary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Real-time Notifications</h4>
                    <p className="text-gray-600">Get instant alerts about insurance opportunities and cost-saving tips.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-accent/10 rounded-full flex items-center justify-center mt-1">
                    <Shield className="w-3 h-3 text-accent" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Secure & Private</h4>
                    <p className="text-gray-600">Your health and financial data is encrypted and protected with enterprise-grade security.</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 space-y-4">
                <div className="flex items-center space-x-4">
                  <a 
                    href="/downloads/healyz-app.apk" 
                    className="inline-flex items-center px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
                    download
                  >
                    <Smartphone className="w-5 h-5 mr-2" />
                    Download for Android
                  </a>
                  <span className="text-sm text-gray-500">v1.0.0 • 15MB</span>
                </div>
                <p className="text-sm text-gray-500">
                  📱 iOS version coming soon • 🔒 Requires Android 8.0 or higher
                </p>
              </div>
            </div>

            <div className="text-center">
              <div className="bg-gradient-to-br from-primary/10 to-secondary/10 rounded-2xl p-8">
                <div className="w-32 h-32 bg-white rounded-2xl shadow-lg mx-auto mb-6 flex items-center justify-center">
                  <div className="text-4xl font-bold text-primary">Hz</div>
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-2">Healyz Mobile</h4>
                <p className="text-gray-600 mb-4">Healthcare Finance AI in Your Pocket</p>
                <div className="flex justify-center space-x-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                  ))}
                  <span className="text-sm text-gray-600 ml-2">4.8 (1,200+ reviews)</span>
                </div>
                <div className="text-sm text-gray-500">
                  Join 50,000+ users saving on healthcare costs
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Start Your Smart Health Journey?
          </h2>
          <p className="text-xl text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
            Join thousands of users who trust Healyz to manage their healthcare finances and nutrition.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-card text-primary hover:bg-card/90">
              Get Started Free Now
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button size="lg" variant="outline" className="border-card text-card hover:bg-card hover:text-primary">
              Contact for Consultation
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;


