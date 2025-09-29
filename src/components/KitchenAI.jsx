import React from 'react';
import { Utensils, Leaf, ShoppingBag, Clock, Bell } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import kitchenAIImage from '../assets/kitchen_personalized_nutrition.png';
import foodWasteImage from '../assets/kitchen_food_waste.png';

const KitchenAI = () => {
  return (
    <div className="min-h-screen py-20">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-muted to-secondary/20 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            <span className="text-secondary">Kitchen <span className="ai-text">AI</span></span> - Personalized Nutrition & Smart Kitchen
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            <span className="ai-text">AI</span>-powered personalized nutrition based on your health profile and optimized smart kitchen processes.
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Personalized Nutrition
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                Based on your medical records and health data, our AI will suggest suitable foods and recipes tailored to your specific health conditions.
              </p>
              <div className="space-y-4">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 bg-secondary/10 p-3 rounded-full">
                    <Leaf className="w-6 h-6 text-secondary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-1">Health-Tailored Recipes</h3>
                    <p className="text-gray-600">Discover meals that align with your dietary needs and health goals.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 bg-secondary/10 p-3 rounded-full">
                    <Utensils className="w-6 h-6 text-secondary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-1">Smart Kitchen Integration</h3>
                    <p className="text-gray-600">Connect with smart kitchen appliances to optimize cooking processes and ensure optimal nutrition.</p>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <img 
                src={kitchenAIImage} 
                alt="Kitchen AI Mockup" 
                className="w-full h-auto rounded-lg shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Food Waste Reduction Section */}
      <section className="py-20 bg-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <img 
                src={foodWasteImage} 
                alt="Food Waste Reduction" 
                className="w-full h-auto rounded-lg shadow-2xl"
              />
            </div>
            <div className="order-1 lg:order-2">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Reduce Food Waste & Optimize Ingredients
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                Our AI suggests dishes based on ingredients available in your fridge and warns you about expiring food, helping you avoid waste.
              </p>
              <div className="space-y-4">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 bg-primary/10 p-3 rounded-full">
                    <ShoppingBag className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-1">Smart Grocery Lists</h3>
                    <p className="text-gray-600">AI suggests ingredients to buy from partner supermarkets to complete your meals.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 bg-primary/10 p-3 rounded-full">
                    <Clock className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-1">Expiration Alerts</h3>
                    <p className="text-gray-600">Get timely notifications for food items nearing their expiration date.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Coming Soon & Notification Section */}
      <section className="py-20 bg-card text-center">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Kitchen <span className="ai-text">AI</span> is Coming Soon!
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            We are working hard to bring you the full power of Kitchen <span className="ai-text">AI</span>. Stay tuned for updates!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Input 
              type="email" 
              placeholder="Enter your email to get notified" 
              className="max-w-sm w-full"
            />
            <Button className="bg-secondary hover:bg-secondary/90">
              Notify Me <Bell className="ml-2 w-5 h-5" />
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default KitchenAI;


