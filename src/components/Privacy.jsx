import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Shield, Lock, Eye, Database } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

const Privacy = () => {
  return (
    <div className="min-h-screen py-20">
      {/* Header */}
      <section className="bg-gradient-to-br from-muted to-secondary/20 py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link to="/" className="inline-flex items-center text-primary hover:text-primary/80 mb-6">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Privacy <span className="text-primary">Policy</span>
          </h1>
          <p className="text-xl text-gray-600">
            Last updated: {new Date().toLocaleDateString('en-AU', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>
      </section>

      {/* Privacy Highlights */}
      <section className="py-20 bg-card">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Your Privacy Matters</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              We're committed to protecting your personal information and being transparent about how we collect, use, and share your data.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            <Card className="text-center">
              <CardHeader>
                <Shield className="w-12 h-12 text-primary mx-auto mb-4" />
                <CardTitle className="text-lg">Data Protection</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">
                  Enterprise-grade encryption and security measures protect your sensitive health and financial data.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <Lock className="w-12 h-12 text-primary mx-auto mb-4" />
                <CardTitle className="text-lg">Secure Storage</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">
                  Your data is stored securely using industry-standard encryption and access controls.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <Eye className="w-12 h-12 text-primary mx-auto mb-4" />
                <CardTitle className="text-lg">Transparency</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">
                  We're clear about what data we collect, how we use it, and who we share it with.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <Database className="w-12 h-12 text-primary mx-auto mb-4" />
                <CardTitle className="text-lg">Your Control</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">
                  You have full control over your data with options to view, export, or delete your information.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Detailed Policy */}
      <section className="py-20 bg-muted">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none">
            <h2>1. Information We Collect</h2>
            
            <h3>Personal Information</h3>
            <p>When you create an account or use our services, we may collect:</p>
            <ul>
              <li>Name and email address</li>
              <li>Age and demographic information</li>
              <li>Location data (city/state for cost predictions)</li>
              <li>Payment information (processed securely through Stripe)</li>
            </ul>

            <h3>Health and Financial Data</h3>
            <p>To provide accurate predictions and recommendations, we collect:</p>
            <ul>
              <li>Pre-existing medical conditions (anonymized)</li>
              <li>Lifestyle factors (exercise, diet, smoking status)</li>
              <li>Income range (for insurance recommendations)</li>
              <li>Healthcare spending history (optional)</li>
              <li>Insurance information (optional)</li>
            </ul>

            <h3>Usage Data</h3>
            <p>We automatically collect information about how you use our service:</p>
            <ul>
              <li>Pages visited and features used</li>
              <li>Time spent on the platform</li>
              <li>Device and browser information</li>
              <li>IP address and general location</li>
            </ul>

            <h2>2. How We Use Your Information</h2>
            
            <h3>Service Provision</h3>
            <ul>
              <li>Generate personalized healthcare cost predictions</li>
              <li>Recommend suitable insurance plans</li>
              <li>Provide BNPL options for healthcare expenses</li>
              <li>Deliver personalized nutrition suggestions</li>
            </ul>

            <h3>Service Improvement</h3>
            <ul>
              <li>Improve our AI algorithms and prediction accuracy</li>
              <li>Develop new features and services</li>
              <li>Analyze usage patterns to enhance user experience</li>
              <li>Conduct research and analytics (anonymized data only)</li>
            </ul>

            <h3>Communication</h3>
            <ul>
              <li>Send service updates and important notifications</li>
              <li>Provide customer support</li>
              <li>Send marketing communications (with your consent)</li>
              <li>Respond to your inquiries and requests</li>
            </ul>

            <h2>3. Information Sharing and Disclosure</h2>
            
            <p className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
              <strong>We never sell your personal data.</strong> We only share your information in the limited circumstances described below.
            </p>

            <h3>Service Providers</h3>
            <p>We may share your information with trusted third-party service providers who help us operate our service:</p>
            <ul>
              <li>Supabase (database and authentication)</li>
              <li>Stripe (payment processing)</li>
              <li>Cloud hosting providers (data storage)</li>
              <li>Analytics providers (anonymized data only)</li>
            </ul>

            <h3>Legal Requirements</h3>
            <p>We may disclose your information if required by law or in response to:</p>
            <ul>
              <li>Court orders or legal processes</li>
              <li>Government requests or investigations</li>
              <li>Protection of our rights, property, or safety</li>
              <li>Prevention of fraud or illegal activities</li>
            </ul>

            <h2>4. Data Security</h2>
            
            <p>We implement comprehensive security measures to protect your data:</p>
            <ul>
              <li><strong>Encryption:</strong> All data is encrypted in transit and at rest</li>
              <li><strong>Access Controls:</strong> Strict access controls limit who can view your data</li>
              <li><strong>Regular Audits:</strong> We conduct regular security audits and assessments</li>
              <li><strong>Secure Infrastructure:</strong> We use enterprise-grade cloud infrastructure</li>
              <li><strong>Data Minimization:</strong> We only collect data necessary for our services</li>
            </ul>

            <h2>5. Your Rights and Choices</h2>
            
            <h3>Access and Control</h3>
            <p>You have the right to:</p>
            <ul>
              <li>Access your personal information</li>
              <li>Update or correct your data</li>
              <li>Delete your account and data</li>
              <li>Export your data</li>
              <li>Opt-out of marketing communications</li>
            </ul>

            <h3>Data Retention</h3>
            <p>We retain your data for as long as necessary to provide our services or as required by law. You can request deletion of your data at any time.</p>

            <h2>6. Cookies and Tracking</h2>
            
            <p>We use cookies and similar technologies to:</p>
            <ul>
              <li>Remember your preferences and settings</li>
              <li>Analyze website traffic and usage patterns</li>
              <li>Improve our services and user experience</li>
              <li>Provide personalized content and recommendations</li>
            </ul>

            <p>You can control cookies through your browser settings.</p>

            <h2>7. International Data Transfers</h2>
            
            <p>
              Your data may be transferred to and processed in countries other than your own. We ensure appropriate safeguards are in place 
              to protect your data in accordance with applicable privacy laws.
            </p>

            <h2>8. Children's Privacy</h2>
            
            <p>
              Our service is not intended for children under 18. We do not knowingly collect personal information from children under 18. 
              If we become aware that we have collected such information, we will take steps to delete it.
            </p>

            <h2>9. Changes to This Policy</h2>
            
            <p>
              We may update this Privacy Policy from time to time. We will notify you of any material changes by posting the new policy 
              on this page and updating the "Last updated" date.
            </p>

            <h2>10. Contact Us</h2>
            
            <p>If you have any questions about this Privacy Policy or our data practices, please contact us:</p>
            <ul>
              <li>Email: privacy@healyz.com</li>
              <li>Phone: +61 (406) 602 570</li>
              <li>Address: Sydney, NSW, Australia</li>
            </ul>

            <div className="mt-12 p-6 bg-primary/5 rounded-lg border border-primary/20">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Questions about your privacy?</h3>
              <p className="text-gray-600 mb-4">
                Our privacy team is here to help you understand how we protect your data and answer any questions you may have.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/contact">
                  <Button className="bg-primary hover:bg-primary/90">
                    Contact Privacy Team
                  </Button>
                </Link>
                <Link to="/my-account">
                  <Button variant="outline">
                    Manage Your Data
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Privacy;

