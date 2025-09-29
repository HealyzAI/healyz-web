import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Crown, Check, Star, Zap, Shield, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { useAuth } from '../../contexts/AuthContext';
import { loadStripe } from '@stripe/stripe-js';

// Initialize Stripe (in production, use environment variable)
const stripePromise = loadStripe('pk_test_51234567890abcdef'); // Demo key

const UpgradePage = () => {
  const { currentUser, userProfile } = useAuth();
  const [loading, setLoading] = useState(false);

  const plans = [
    {
      id: 'starter',
      name: 'Starter',
      price: 0,
      period: 'forever',
      description: 'Basic healthcare cost estimates',
      features: [
        'Basic health tracking',
        'Basic medical cost prediction',
        'Basic nutrition suggestions',
        'Email support (business hours)',
        'Access to community forum',
        'Monthly health tips newsletter'
      ],
      limitations: [
        'No detailed cost breakdown',
        'No insurance recommendations',
        'No BNPL options',
        'No advanced features'
      ],
      buttonText: 'Current Plan',
      popular: false,
      current: userProfile?.plan === 'starter' || userProfile?.plan === 'free' || !userProfile?.plan
    },
    {
      id: 'plus',
      name: 'Plus',
      price: 18.99,
      period: 'month',
      description: 'Enhanced healthcare financial planning',
      features: [
        'All Starter features',
        'Detailed medical cost prediction',
        'Insurance optimization',
        'BNPL for healthcare',
        'Priority email support',
        'Access to webinars',
        'Health app integration',
        'Basic data export (CSV)'
      ],
      limitations: [],
      buttonText: userProfile?.plan === 'plus' ? 'Current Plan' : 'Upgrade to Plus',
      popular: true,
      current: userProfile?.plan === 'plus'
    },
    {
      id: 'premium',
      name: 'Premium',
      price: 34.99,
      period: 'month',
      description: 'Complete AI-powered healthcare management',
      features: [
        'All Plus features',
        'Personalized AI nutrition',
        'Wearable device integration',
        'Advanced health dashboard',
        '24/7 support',
        'Custom reminders & alerts',
        'Unlimited data export & backup',
        'Early access to new features'
      ],
      limitations: [],
      buttonText: userProfile?.plan === 'premium' ? 'Current Plan' : 'Upgrade to Premium',
      popular: false,
      current: userProfile?.plan === 'premium'
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      price: 99.99,
      period: 'month',
      description: 'Advanced features for healthcare organizations',
      features: [
        'All Premium features',
        'API access & system integration',
        'Advanced analytics & custom reports',
        'Dedicated account manager',
        'Role-based access control',
        'SLA & onboarding support'
      ],
      limitations: [],
      buttonText: userProfile?.plan === 'enterprise' ? 'Current Plan' : 'Contact Sales',
      popular: false,
      current: userProfile?.plan === 'enterprise'
    }
  ];

  const handleUpgrade = async (planId) => {
    if (!currentUser) {
      alert('Please sign in to upgrade your plan');
      return;
    }

    if (planId === 'enterprise') {
      // Redirect to contact form for enterprise
      window.location.href = '/contact';
      return;
    }

    if (planId === userProfile?.plan) {
      return; // Already on this plan
    }

    setLoading(true);

    try {
      // In a real implementation, you would:
      // 1. Create a checkout session on your backend
      // 2. Redirect to Stripe Checkout
      // 3. Handle success/cancel redirects
      // 4. Update user plan in Firestore after successful payment

      // Demo implementation - simulate Stripe checkout
      const stripe = await stripePromise;
      
      // This would normally be a call to your backend to create a checkout session
      const mockCheckoutSession = {
        id: 'cs_demo_' + Date.now(),
        url: `https://checkout.stripe.com/pay/cs_demo_${planId}_${Date.now()}`
      };

      // For demo purposes, we'll just show an alert
      alert(`Demo: Redirecting to Stripe Checkout for ${planId} plan. In production, this would redirect to: ${mockCheckoutSession.url}`);
      
      // In production, you would redirect like this:
      // const { error } = await stripe.redirectToCheckout({
      //   sessionId: mockCheckoutSession.id,
      // });
      
      // if (error) {
      //   console.error('Stripe checkout error:', error);
      // }

    } catch (error) {
      console.error('Upgrade error:', error);
      alert('Failed to process upgrade. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen py-20">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-muted to-secondary/20 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Upgrade Your <span className="text-primary">Healthcare Finance</span> Experience
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Unlock detailed predictions, personalized recommendations, and advanced features to optimize your healthcare costs
          </p>
          
          {currentUser && (
            <div className="inline-flex items-center space-x-2 bg-white px-4 py-2 rounded-full shadow-sm">
              <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                <Crown className="w-4 h-4 text-primary" />
              </div>
              <span className="text-sm font-medium text-gray-700">
                Current Plan: {userProfile?.plan ? userProfile.plan.charAt(0).toUpperCase() + userProfile.plan.slice(1) : 'Free'}
              </span>
            </div>
          )}
        </div>
      </section>

      {/* Pricing Plans */}
      <section className="py-20 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Choose Your Plan</h2>
            <p className="text-lg text-gray-600">
              Select the plan that best fits your healthcare financial planning needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {plans.map((plan) => (
              <Card key={plan.id} className={`relative ${
                plan.popular ? 'border-primary shadow-lg scale-105' : 'border-gray-200'
              } ${plan.current ? 'bg-primary/5' : ''}`}>
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="bg-primary text-white px-4 py-1 rounded-full text-sm font-medium flex items-center space-x-1">
                      <Star className="w-4 h-4" />
                      <span>Most Popular</span>
                    </div>
                  </div>
                )}
                
                {plan.current && (
                  <div className="absolute -top-4 right-4">
                    <div className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                      Current
                    </div>
                  </div>
                )}

                <CardHeader className="text-center pb-8">
                  <CardTitle className="text-2xl font-bold text-gray-900">{plan.name}</CardTitle>
                  <div className="mt-4">
                    <span className="text-4xl font-bold text-gray-900">${plan.price}</span>
                    <span className="text-gray-600">/{plan.period}</span>
                  </div>
                  <p className="text-gray-600 mt-2">{plan.description}</p>
                </CardHeader>

                <CardContent className="space-y-6">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3 flex items-center space-x-2">
                      <Check className="w-4 h-4 text-green-500" />
                      <span>Included Features</span>
                    </h4>
                    <ul className="space-y-2">
                      {plan.features.map((feature, index) => (
                        <li key={index} className="flex items-start space-x-2">
                          <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-gray-600">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {plan.limitations.length > 0 && (
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3 flex items-center space-x-2">
                        <Shield className="w-4 h-4 text-gray-400" />
                        <span>Limitations</span>
                      </h4>
                      <ul className="space-y-2">
                        {plan.limitations.map((limitation, index) => (
                          <li key={index} className="flex items-start space-x-2">
                            <div className="w-4 h-4 mt-0.5 flex-shrink-0">
                              <div className="w-2 h-2 bg-gray-400 rounded-full mx-auto mt-1"></div>
                            </div>
                            <span className="text-sm text-gray-500">{limitation}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <Button
                    className={`w-full ${
                      plan.current 
                        ? 'bg-gray-100 text-gray-500 cursor-not-allowed' 
                        : plan.popular 
                        ? 'bg-primary hover:bg-primary/90' 
                        : 'bg-secondary hover:bg-secondary/90'
                    }`}
                    onClick={() => handleUpgrade(plan.id)}
                    disabled={loading || plan.current || !currentUser}
                  >
                    {loading ? 'Processing...' : plan.buttonText}
                  </Button>

                  {!currentUser && (
                    <p className="text-xs text-gray-500 text-center">
                      <Link to="/login" className="text-primary hover:underline">
                        Sign in
                      </Link> to upgrade
                    </p>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Upgrade to Premium?</h2>
            <p className="text-lg text-gray-600">
              Unlock the full potential of AI-powered healthcare financial planning
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <TrendingUp className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Detailed Cost Analysis</h3>
              <p className="text-gray-600">
                Get comprehensive breakdowns of your healthcare costs by category, helping you understand where your money goes
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Shield className="w-8 h-8 text-secondary" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Smart Insurance Matching</h3>
              <p className="text-gray-600">
                Receive personalized insurance recommendations based on your health profile and financial situation
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Zap className="w-8 h-8 text-accent" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Flexible Payment Options</h3>
              <p className="text-gray-600">
                Access BNPL solutions to manage large healthcare expenses with convenient payment plans
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-card">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
          </div>

          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Can I cancel my subscription anytime?</h3>
              <p className="text-gray-600">
                Yes, you can cancel your Premium subscription at any time. You'll continue to have access to Premium features until the end of your current billing period.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">What payment methods do you accept?</h3>
              <p className="text-gray-600">
                We accept all major credit cards (Visa, MasterCard, American Express) and PayPal through our secure Stripe payment processing.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Is my data secure?</h3>
              <p className="text-gray-600">
                Absolutely. We use enterprise-grade encryption and security measures to protect your personal and financial information. We never share your data with third parties.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Can I upgrade or downgrade my plan?</h3>
              <p className="text-gray-600">
                Yes, you can change your plan at any time. Upgrades take effect immediately, while downgrades take effect at the end of your current billing period.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default UpgradePage;

