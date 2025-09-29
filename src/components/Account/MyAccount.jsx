import React from 'react';
import { Link } from 'react-router-dom';
import { User, Crown, Calendar, Mail, LogOut, CreditCard } from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { useAuth } from '../../contexts/AuthContext';

const MyAccount = () => {
  const { currentUser, userProfile, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Failed to log out:', error);
    }
  };

  const getPlanBadge = (plan) => {
    const badges = {
      free: { color: 'bg-gray-100 text-gray-800', text: 'Free Plan' },
      premium: { color: 'bg-primary/10 text-primary', text: 'Premium Plan' },
      enterprise: { color: 'bg-purple-100 text-purple-800', text: 'Enterprise Plan' }
    };
    
    return badges[plan] || badges.free;
  };

  const getPlanFeatures = (plan) => {
    const features = {
      free: [
        'Basic healthcare cost estimates',
        'General insurance recommendations',
        'Limited predictions per month'
      ],
      premium: [
        'Detailed healthcare cost breakdown',
        'Personalized insurance recommendations',
        'Unlimited predictions',
        'BNPL payment options',
        'PDF report downloads',
        'Prediction history'
      ],
      enterprise: [
        'All Premium features',
        'API access',
        'Custom integrations',
        'Priority support',
        'Advanced analytics'
      ]
    };
    
    return features[plan] || features.free;
  };

  if (!currentUser || !userProfile) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Please log in to view your account</h2>
          <Link to="/login">
            <Button>Sign In</Button>
          </Link>
        </div>
      </div>
    );
  }

  const planBadge = getPlanBadge(userProfile.plan);
  const planFeatures = getPlanFeatures(userProfile.plan);

  return (
    <div className="min-h-screen py-20 bg-muted">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">My Account</h1>
          <p className="text-lg text-gray-600">Manage your Healyz account and subscription</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Information */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <User className="w-5 h-5" />
                  <span>Profile Information</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                    <User className="w-8 h-8 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">
                      {userProfile.displayName || currentUser.displayName || 'User'}
                    </h3>
                    <p className="text-gray-600">{currentUser.email}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center space-x-3">
                    <Mail className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-500">Email</p>
                      <p className="font-medium">{currentUser.email}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <Calendar className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-500">Member Since</p>
                      <p className="font-medium">
                        {userProfile.createdAt?.toDate?.()?.toLocaleDateString() || 'Recently'}
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="pt-4 border-t">
                  <Button variant="outline" onClick={handleLogout} className="flex items-center space-x-2">
                    <LogOut className="w-4 h-4" />
                    <span>Sign Out</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Subscription Plan */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Crown className="w-5 h-5" />
                  <span>Current Plan</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center mb-6">
                  <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${planBadge.color} mb-4`}>
                    {planBadge.text}
                  </div>
                  
                  {userProfile.plan === 'free' && (
                    <div className="mb-4">
                      <p className="text-2xl font-bold text-gray-900 mb-2">$0</p>
                      <p className="text-gray-600">per month</p>
                    </div>
                  )}
                  
                  {userProfile.plan === 'premium' && (
                    <div className="mb-4">
                      <p className="text-2xl font-bold text-primary mb-2">$19.99</p>
                      <p className="text-gray-600">per month</p>
                    </div>
                  )}
                  
                  {userProfile.plan === 'enterprise' && (
                    <div className="mb-4">
                      <p className="text-2xl font-bold text-purple-600 mb-2">Custom</p>
                      <p className="text-gray-600">Contact us for pricing</p>
                    </div>
                  )}
                </div>
                
                <div className="space-y-3 mb-6">
                  <h4 className="font-semibold text-gray-900">Plan Features:</h4>
                  <ul className="space-y-2">
                    {planFeatures.map((feature, index) => (
                      <li key={index} className="flex items-center space-x-2 text-sm">
                        <div className="w-2 h-2 bg-primary rounded-full"></div>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                {userProfile.plan === 'free' && (
                  <Link to="/pricing">
                    <Button className="w-full flex items-center space-x-2">
                      <CreditCard className="w-4 h-4" />
                      <span>Upgrade to Premium</span>
                    </Button>
                  </Link>
                )}
                
                {userProfile.plan === 'premium' && (
                  <div className="space-y-3">
                    <Link to="/pricing">
                      <Button variant="outline" className="w-full">
                        View All Plans
                      </Button>
                    </Link>
                    <p className="text-xs text-gray-500 text-center">
                      Need to cancel? Contact support
                    </p>
                  </div>
                )}
                
                {userProfile.plan === 'enterprise' && (
                  <Link to="/contact">
                    <Button variant="outline" className="w-full">
                      Contact Support
                    </Button>
                  </Link>
                )}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link to="/finhealth-ai">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <CreditCard className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Get Prediction</h3>
                  <p className="text-sm text-gray-600">Analyze your healthcare costs</p>
                </CardContent>
              </Card>
            </Link>
            
            <Link to="/pricing">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Crown className="w-6 h-6 text-secondary" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">View Plans</h3>
                  <p className="text-sm text-gray-600">Compare subscription options</p>
                </CardContent>
              </Card>
            </Link>
            
            <Link to="/contact">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Mail className="w-6 h-6 text-accent" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Get Support</h3>
                  <p className="text-sm text-gray-600">Contact our team</p>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyAccount;

