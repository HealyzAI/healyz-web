import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Check, X, Crown, Star, Info, MessageCircle, Phone, Users } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { useAuth } from '../contexts/AuthContext';

const Pricing = () => {
  const { currentUser, userProfile } = useAuth();
  const [activeTooltip, setActiveTooltip] = useState(null);

  const pricingPlans = [
    {
      id: 'starter',
      name: 'Starter Plan',
      price: '$0',
      period: 'month',
      description: 'Perfect for getting started with basic healthcare insights',
      color: 'bg-green-500',
      features: [
        'Basic health tracking',
        'Basic medical cost prediction',
        'Basic nutrition suggestions',
        'Email support (business hours)',
        'Access to community forum',
        'Monthly health tips newsletter'
      ],
      detailedFeatures: {
        'Basic health tracking': 'Track BMI, blood pressure, and basic sleep patterns.',
        'Basic medical cost prediction': 'Estimate healthcare costs based on basic personal data.',
        'Basic nutrition suggestions': 'Basic meal suggestions based on age and lifestyle.',
        'Email support (business hours)': 'Email support during business hours.',
        'Access to community forum': 'Join our user community for tips and discussions.',
        'Monthly health tips newsletter': 'Receive monthly health and wellness tips.'
      },
      limitations: [],
      isPremium: false,
      popular: false,
      current: userProfile?.plan === 'starter' || userProfile?.plan === 'free' || !userProfile?.plan
    },
    {
      id: 'plus',
      name: 'Plus Plan',
      price: '$18.99',
      period: 'month',
      description: 'Enhanced features for better healthcare financial planning',
      color: 'bg-yellow-500',
      features: [
        'All Starter features',
        'Detailed medical cost prediction',
        'Insurance optimization',
        'BNPL for healthcare',
        'Priority email support',
        'Access to webinars',
        'Integration with Google Fit / Apple Health',
        'Basic data export (CSV)'
      ],
      detailedFeatures: {
        'All Starter features': 'Includes everything from the Starter plan.',
        'Detailed medical cost prediction': 'Detailed cost analysis based on medical history and location.',
        'Insurance optimization': 'AI-powered insurance plan recommendations.',
        'BNPL for healthcare': 'Split healthcare payments into 3/6/12 month installments.',
        'Priority email support': 'Faster response times for support requests.',
        'Access to webinars': 'Join educational webinars and tutorials.',
        'Integration with Google Fit / Apple Health': 'Sync data with popular health apps.',
        'Basic data export (CSV)': 'Export your data in CSV format.'
      },
      limitations: [],
      isPremium: true,
      popular: true,
      current: userProfile?.plan === 'plus'
    },
    {
      id: 'premium',
      name: 'Premium Plan',
      price: '$34.99',
      period: 'month',
      description: 'Complete AI-powered healthcare and nutrition management',
      color: 'bg-orange-500',
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
      detailedFeatures: {
        'All Plus features': 'Includes everything from the Plus plan.',
        'Personalized AI nutrition': 'Custom meal plans based on your medical profile.',
        'Wearable device integration': 'Connect smartwatches and fitness trackers.',
        'Advanced health dashboard': 'Visual dashboard with health and financial trends.',
        '24/7 support': 'Round-the-clock multi-channel support.',
        'Custom reminders & alerts': 'Medication reminders and appointment alerts.',
        'Unlimited data export & backup': 'Export all your data without limits.',
        'Early access to new features': 'Be the first to try new features and beta releases.'
      },
      limitations: [],
      isPremium: true,
      popular: false,
      current: userProfile?.plan === 'premium'
    },
    {
      id: 'enterprise',
      name: 'Enterprise Plan',
      price: 'Contact Us',
      period: '',
      description: 'Advanced features for healthcare organizations and businesses',
      color: 'bg-red-500',
      features: [
        'All Premium features',
        'API access & system integration',
        'Advanced analytics & custom reports',
        'Dedicated account manager',
        'Role-based access control',
        'SLA & onboarding support'
      ],
      detailedFeatures: {
        'All Premium features': 'Includes everything from the Premium plan.',
        'API access & system integration': 'Direct integration with your internal systems via API.',
        'Advanced analytics & custom reports': 'Deep analytics and business intelligence reports.',
        'Dedicated account manager': 'Personal account manager for your organization.',
        'Role-based access control': 'User role management and access control.',
        'SLA & onboarding support': 'Service level agreements and team onboarding.'
      },
      limitations: [],
      isPremium: false,
      popular: false,
      current: userProfile?.plan === 'enterprise'
    },
  ];

  const toggleTooltip = (planId) => {
    setActiveTooltip(activeTooltip === planId ? null : planId);
  };

  const closeTooltip = () => {
    setActiveTooltip(null);
  };

  return (
    <div className="min-h-screen py-20">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-muted to-secondary/20 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Simple, Transparent <span className="text-primary">Pricing</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Choose the plan that fits your healthcare financial planning needs. Upgrade or downgrade at any time.
          </p>
          
          {currentUser && (
            <div className="mt-8 inline-flex items-center space-x-2 bg-white px-4 py-2 rounded-full shadow-sm">
              <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                <Crown className="w-4 h-4 text-primary" />
              </div>
              <span className="text-sm font-medium text-gray-700">
                Current Plan: {userProfile?.plan ? userProfile.plan.charAt(0).toUpperCase() + userProfile.plan.slice(1) : 'Starter'}
              </span>
            </div>
          )}
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-20 bg-card relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {pricingPlans.map((plan) => (
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
                      Current Plan
                    </div>
                  </div>
                )}

                <CardHeader className="text-center pb-6">
                  <CardTitle className="text-xl font-bold text-gray-900">{plan.name}</CardTitle>
                  <div className="mt-4">
                    <span className="text-3xl font-bold text-gray-900">{plan.price}</span>
                    {plan.period && <span className="text-gray-600">/{plan.period}</span>}
                  </div>
                  <p className="text-gray-600 mt-2 text-sm">{plan.description}</p>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-semibold text-gray-900 text-sm">Features</h4>
                      <button
                        onClick={() => toggleTooltip(plan.id)}
                        className="flex items-center space-x-1 text-primary hover:text-primary/80 transition-colors"
                      >
                        <Star className="w-4 h-4" />
                        <span className="text-xs">Details</span>
                      </button>
                    </div>
                    <ul className="space-y-2">
                      {plan.features.slice(0, 4).map((feature, index) => (
                        <li key={index} className="flex items-start space-x-2">
                          <Check className="w-3 h-3 text-green-500 mt-1 flex-shrink-0" />
                          <span className="text-xs text-gray-600">{feature}</span>
                        </li>
                      ))}
                      {plan.features.length > 4 && (
                        <li className="text-xs text-gray-500 italic">
                          +{plan.features.length - 4} more features
                        </li>
                      )}
                    </ul>
                  </div>

                  <div className="pt-4">
                    {plan.current ? (
                      <Button className="w-full bg-gray-100 text-gray-500 cursor-not-allowed text-sm" disabled>
                        Current Plan
                      </Button>
                    ) : plan.id === 'enterprise' ? (
                      <Link to="/contact">
                        <Button className="w-full bg-secondary hover:bg-secondary/90 text-sm">
                          Contact Sales
                        </Button>
                      </Link>
                    ) : (
                      <Link to="/upgrade">
                        <Button className={`w-full text-sm ${
                          plan.popular 
                            ? 'bg-primary hover:bg-primary/90' 
                            : 'bg-secondary hover:bg-secondary/90'
                        }`}>
                          {plan.id === 'starter' ? 'Get Started Free' : 'Upgrade Now'}
                        </Button>
                      </Link>
                    )}
                  </div>

                  {!currentUser && (
                    <p className="text-xs text-gray-500 text-center">
                      <Link to="/register" className="text-primary hover:underline">
                        Create account
                      </Link> to get started
                    </p>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Tooltip/Popup */}
        {activeTooltip && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg max-w-2xl w-full max-h-[80vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-2xl font-bold text-gray-900">
                    {pricingPlans.find(p => p.id === activeTooltip)?.name} - Detailed Features
                  </h3>
                  <button
                    onClick={closeTooltip}
                    className="text-gray-400 hover:text-gray-600 text-2xl"
                  >
                    ×
                  </button>
                </div>
                
                <div className="space-y-4">
                  {Object.entries(pricingPlans.find(p => p.id === activeTooltip)?.detailedFeatures || {}).map(([feature, description], index) => (
                    <div key={index} className="border-b border-gray-100 pb-3">
                      <h4 className="font-semibold text-gray-900 mb-1">{feature}</h4>
                      <p className="text-gray-600 text-sm">{description}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-6 flex justify-end space-x-3">
                  <Button variant="outline" onClick={closeTooltip}>
                    Close
                  </Button>
                  {activeTooltip !== 'enterprise' && (
                    <Link to="/upgrade">
                      <Button className="bg-primary hover:bg-primary/90">
                        Choose This Plan
                      </Button>
                    </Link>
                  )}
                  {activeTooltip === 'enterprise' && (
                    <Link to="/contact">
                      <Button className="bg-secondary hover:bg-secondary/90">
                        Contact Sales
                      </Button>
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Support Section */}
      <section className="py-20 bg-muted">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Support Levels</h2>
            <p className="text-lg text-gray-600">
              Different support options for each plan
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageCircle className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Starter</h3>
              <p className="text-gray-600 text-sm">Email support during business hours</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageCircle className="w-8 h-8 text-yellow-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Plus</h3>
              <p className="text-gray-600 text-sm">Priority email support + webinars</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Premium</h3>
              <p className="text-gray-600 text-sm">24/7 multi-channel support</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Enterprise</h3>
              <p className="text-gray-600 text-sm">Dedicated account manager + SLA</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-card">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-lg text-gray-600">
              Everything you need to know about our pricing and plans
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Is there a free plan?</h3>
              <p className="text-gray-600">
                Yes! Our Starter plan is completely free and gives you access to basic features forever. You can upgrade anytime to unlock advanced features.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Can I cancel anytime?</h3>
              <p className="text-gray-600">
                Absolutely. You can cancel your subscription at any time. You'll continue to have access until the end of your billing period.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">What payment methods do you accept?</h3>
              <p className="text-gray-600">
                We accept all major credit cards and PayPal through our secure Stripe payment processing.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Do you offer refunds?</h3>
              <p className="text-gray-600">
                We offer a 30-day money-back guarantee for paid subscriptions. Contact support for assistance.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Can I change plans later?</h3>
              <p className="text-gray-600">
                Yes, you can upgrade or downgrade your plan at any time from your account settings.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Is my data secure?</h3>
              <p className="text-gray-600">
                We use enterprise-grade security and encryption to protect your data. We never share your information with third parties.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Optimize Your Healthcare Costs?</h2>
          <p className="text-xl text-primary-foreground/80 mb-8">
            Join thousands of users who are already saving money on healthcare with Healyz AI
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/register">
              <Button size="lg" className="bg-white text-primary hover:bg-gray-100">
                Start Free Today
              </Button>
            </Link>
            <Link to="/upgrade">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary">
                View All Plans
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Pricing;

