import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, DollarSign, FileText, Download, Lock, Crown } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { useAuth } from '../contexts/AuthContext';

const History = () => {
  const { currentUser, userProfile, getUserPredictions, hasPremiumAccess } = useAuth();
  const [predictions, setPredictions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPredictions = async () => {
      if (currentUser) {
        try {
          const { data } = await getUserPredictions();
          setPredictions(data || []);
        } catch (error) {
          console.error('Error loading predictions:', error);
        }
      }
      setLoading(false);
    };

    loadPredictions();
  }, [currentUser, getUserPredictions]);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-AU', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-AU', {
      style: 'currency',
      currency: 'AUD'
    }).format(amount);
  };

  if (!currentUser) {
    return (
      <div className="min-h-screen py-20">
        <section className="bg-gradient-to-br from-muted to-secondary/20 py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Prediction <span className="text-primary">History</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Please sign in to view your prediction history
            </p>
            <Link to="/login">
              <Button size="lg" className="bg-primary hover:bg-primary/90">
                Sign In
              </Button>
            </Link>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-20">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-muted to-secondary/20 py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Your Prediction <span className="text-primary">History</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            View and manage your healthcare cost predictions
          </p>
          
          {userProfile && (
            <div className="inline-flex items-center space-x-2 bg-white px-4 py-2 rounded-full shadow-sm">
              <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                <Crown className="w-4 h-4 text-primary" />
              </div>
              <span className="text-sm font-medium text-gray-700">
                Current Plan: {userProfile.plan ? userProfile.plan.charAt(0).toUpperCase() + userProfile.plan.slice(1) : 'Starter'}
              </span>
            </div>
          )}
        </div>
      </section>

      {/* History Content */}
      <section className="py-20 bg-card">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
              <p className="mt-4 text-gray-600">Loading your prediction history...</p>
            </div>
          ) : predictions.length === 0 ? (
            <div className="text-center">
              <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No Predictions Yet</h3>
              <p className="text-gray-600 mb-6">
                You haven't made any healthcare cost predictions yet. Start by using our FinHealth AI tool.
              </p>
              <Link to="/finhealth-ai">
                <Button className="bg-primary hover:bg-primary/90">
                  Make Your First Prediction
                </Button>
              </Link>
            </div>
          ) : (
            <div>
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold text-gray-900">
                  Your Predictions ({predictions.length})
                </h2>
                {!hasPremiumAccess() && (
                  <div className="text-right">
                    <p className="text-sm text-gray-600 mb-2">
                      Upgrade to view unlimited history
                    </p>
                    <Link to="/pricing">
                      <Button size="sm" className="bg-primary hover:bg-primary/90">
                        Upgrade Now
                      </Button>
                    </Link>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {predictions.slice(0, hasPremiumAccess() ? predictions.length : 3).map((prediction, index) => (
                  <Card key={index} className="hover:shadow-lg transition-shadow">
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">
                          {prediction.type === 'basic' ? 'Basic' : 
                           prediction.type === 'plus' ? 'Plus' : 'Premium'} Prediction
                        </CardTitle>
                        <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                          prediction.type === 'basic' ? 'bg-green-100 text-green-800' :
                          prediction.type === 'plus' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-purple-100 text-purple-800'
                        }`}>
                          {prediction.type === 'basic' ? 'Starter' : 
                           prediction.type === 'plus' ? 'Plus' : 'Premium'}
                        </div>
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Calendar className="w-4 h-4 mr-1" />
                        {formatDate(prediction.timestamp)}
                      </div>
                    </CardHeader>
                    
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Predicted Cost</span>
                        <span className="font-semibold text-lg text-primary">
                          {formatCurrency(prediction.results.predictedCost)}
                        </span>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Age</span>
                          <span className="font-medium">{prediction.formData.age}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Location</span>
                          <span className="font-medium">{prediction.formData.location}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Risk Level</span>
                          <span className={`font-medium ${
                            prediction.results.riskAssessment?.level === 'Low' ? 'text-green-600' :
                            prediction.results.riskAssessment?.level === 'Medium' ? 'text-yellow-600' :
                            'text-red-600'
                          }`}>
                            {prediction.results.riskAssessment?.level || 'N/A'}
                          </span>
                        </div>
                      </div>

                      <div className="pt-4 border-t">
                        <div className="flex space-x-2">
                          <Link to="/finhealth-ai" className="flex-1">
                            <Button size="sm" variant="outline" className="w-full">
                              View Details
                            </Button>
                          </Link>
                          {hasPremiumAccess() && (
                            <Button size="sm" variant="outline" className="px-3">
                              <Download className="w-4 h-4" />
                            </Button>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Upgrade Prompt for Free Users */}
              {!hasPremiumAccess() && predictions.length > 3 && (
                <Card className="mt-8 border-primary/20 bg-primary/5">
                  <CardContent className="p-6 text-center">
                    <Lock className="w-12 h-12 text-primary mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      View All Your Predictions
                    </h3>
                    <p className="text-gray-600 mb-4">
                      You have {predictions.length - 3} more predictions. Upgrade to Plus or Premium to view unlimited history.
                    </p>
                    <Link to="/pricing">
                      <Button className="bg-primary hover:bg-primary/90">
                        Upgrade Now
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              )}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready for Another Prediction?</h2>
          <p className="text-xl text-primary-foreground/80 mb-8">
            Get updated healthcare cost predictions with our AI-powered tool
          </p>
          <Link to="/finhealth-ai">
            <Button size="lg" className="bg-white text-primary hover:bg-gray-100">
              Make New Prediction
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default History;

