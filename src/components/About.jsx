import React from 'react';
import { Target, Eye, Heart, Users, Award, Lightbulb } from 'lucide-react';
import { Card, CardContent } from './ui/card';

const About = () => {
  const values = [
    {
      icon: <Lightbulb className="w-8 h-8 text-accent" />,
      title: "Innovation",
      description: "Always at the forefront of applying the latest AI technology to solve real-world problems in healthcare."
    },
    {
      icon: <Award className="w-8 h-8 text-primary" />,
      title: "Trustworthiness",
      description: "User data security and privacy are top priorities in all our products and services."
    },
    {
      icon: <Users className="w-8 h-8 text-secondary" />,
      title: "Personalization",
      description: "Every user has unique needs; we create solutions tailored to each individual."
    },
    {
      icon: <Heart className="w-8 h-8 text-red-500" />,
      title: "Accessibility",
      description: "Making complex technology simple and easy to use, ensuring everyone can access it."
    }
  ];

  return (
    <div className="min-h-screen py-20">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-muted to-secondary/20 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            About <span className="text-primary">Healyz</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We believe that AI technology can revolutionize how people manage their healthcare finances and nutrition, 
            creating a world where high-quality healthcare is accessible to all.
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Our Story
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                Healyz was founded with the mission to make healthcare accessible and financially manageable for everyone. 
                We recognized that many people struggle with managing medical costs and making informed decisions about health insurance.              </p>
              <p className="text-lg text-gray-600 mb-6">
                With the advancement of AI and machine learning, we saw a tremendous opportunity to create intelligent solutions 
                that empower people to make better decisions about their health and finances.
              </p>
              <p className="text-lg text-gray-600">
               Thus, Healyz was born with the vision to become the leading AI platform in optimizing healthcare finance and personalized nutrition.
              </p>
            </div>
            <div className="bg-gradient-to-br from-primary/10 to-secondary/10 rounded-lg p-8">
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">10K+</div>
                  <div className="text-gray-600">Trusted Users</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-secondary mb-2">30%</div>
                  <div className="text-gray-600">Healthcare Cost Savings</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-accent mb-2">24/7</div>
                  <div className="text-gray-600">Customer Support</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-red-500 mb-2">99.9%</div>
                  <div className="text-gray-600">Uptime</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <Card>
              <CardContent className="p-8 text-center">
                <div className="flex justify-center mb-6">
                  <Eye className="w-12 h-12 text-primary" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Vision</h3>
                <p className="text-gray-600 text-lg">
                  To become the world's leading AI platform in optimizing healthcare finance and personalized nutrition, 
                  helping everyone live healthier and happier lives.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-8 text-center">
                <div className="flex justify-center mb-6">
                  <Target className="w-12 h-12 text-secondary" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Mission</h3>
                <p className="text-gray-600 text-lg">
                  To use AI to help people make smart decisions about their health and finances, 
                  creating a world where high-quality healthcare is accessible to all.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Core Values
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The values that guide all our operations and decisions
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex justify-center mb-4">
                    {value.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {value.title}
                  </h3>
                  <p className="text-gray-600">
                    {value.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Team
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Talented experts building the future of smart healthcare together
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Dr. Sarah Johnson",
                role: "CEO & Co-founder",
                description: "Physician with 15 years of experience in healthcare and health technology."
              },
              {
                name: "Michael Chen",
                role: "CTO & Co-founder",
                description: "AI expert with experience developing large-scale machine learning systems."
              },
              {
                name: "Emily Rodriguez",
                role: "Head of Product",
                description: "UX/UI specialist passionate about creating user-friendly technology products."
              }
            ].map((member, index) => (
              <Card key={index} className="text-center">
                <CardContent className="p-8">
                  <div className="w-24 h-24 bg-gradient-to-br from-primary to-secondary rounded-full mx-auto mb-4 flex items-center justify-center">
                    <Users className="w-12 h-12 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {member.name}
                  </h3>
                  <p className="text-primary font-medium mb-3">
                    {member.role}
                  </p>
                  <p className="text-gray-600">
                    {member.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;


