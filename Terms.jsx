import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from './ui/button';

const Terms = () => {
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
            Terms of <span className="text-primary">Service</span>
          </h1>
          <p className="text-xl text-gray-600">
            Last updated: {new Date().toLocaleDateString('en-AU', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-20 bg-card">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none">
            <h2>1. Acceptance of Terms</h2>
            <p>
              By accessing and using Healyz ("the Service"), you accept and agree to be bound by the terms and provision of this agreement. 
              If you do not agree to abide by the above, please do not use this service.
            </p>

            <h2>2. Description of Service</h2>
            <p>
              Healyz is an AI-powered healthcare financial planning platform that provides:
            </p>
            <ul>
              <li>Healthcare cost predictions using artificial intelligence</li>
              <li>Insurance optimization recommendations</li>
              <li>Buy Now, Pay Later (BNPL) options for healthcare expenses</li>
              <li>Personalized nutrition suggestions (Kitchen AI)</li>
              <li>Health and financial data integration</li>
            </ul>

            <h2>3. User Accounts</h2>
            <p>
              To access certain features of the Service, you must register for an account. You agree to:
            </p>
            <ul>
              <li>Provide accurate, current, and complete information during registration</li>
              <li>Maintain and update your information to keep it accurate and current</li>
              <li>Maintain the security of your password and account</li>
              <li>Accept responsibility for all activities under your account</li>
            </ul>

            <h2>4. Subscription Plans</h2>
            <p>
              Healyz offers multiple subscription tiers:
            </p>
            <ul>
              <li><strong>Starter Plan:</strong> Free tier with basic features</li>
              <li><strong>Plus Plan:</strong> $18.99 AUD/month with enhanced features</li>
              <li><strong>Premium Plan:</strong> $34.99 AUD/month with comprehensive features</li>
              <li><strong>Enterprise Plan:</strong> Custom pricing for organizations</li>
            </ul>
            <p>
              Subscription fees are billed in advance on a monthly basis. You may cancel your subscription at any time.
            </p>

            <h2>5. Medical Disclaimer</h2>
            <p className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
              <strong>Important:</strong> Healyz provides healthcare cost predictions and financial planning tools for informational purposes only. 
              Our AI predictions are estimates based on available data and should not be considered as medical advice, diagnosis, or treatment recommendations. 
              Always consult with qualified healthcare professionals for medical decisions.
            </p>

            <h2>6. Data Privacy and Security</h2>
            <p>
              We take your privacy seriously. Our collection and use of personal information is governed by our Privacy Policy. 
              By using the Service, you consent to the collection and use of your information as outlined in our Privacy Policy.
            </p>

            <h2>7. Intellectual Property</h2>
            <p>
              The Service and its original content, features, and functionality are owned by Healyz and are protected by international copyright, 
              trademark, patent, trade secret, and other intellectual property laws.
            </p>

            <h2>8. Prohibited Uses</h2>
            <p>You may not use the Service:</p>
            <ul>
              <li>For any unlawful purpose or to solicit others to perform unlawful acts</li>
              <li>To violate any international, federal, provincial, or state regulations, rules, laws, or local ordinances</li>
              <li>To infringe upon or violate our intellectual property rights or the intellectual property rights of others</li>
              <li>To harass, abuse, insult, harm, defame, slander, disparage, intimidate, or discriminate</li>
              <li>To submit false or misleading information</li>
            </ul>

            <h2>9. Limitation of Liability</h2>
            <p>
              In no event shall Healyz, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, 
              incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, 
              or other intangible losses, resulting from your use of the Service.
            </p>

            <h2>10. Termination</h2>
            <p>
              We may terminate or suspend your account and bar access to the Service immediately, without prior notice or liability, 
              under our sole discretion, for any reason whatsoever and without limitation, including but not limited to a breach of the Terms.
            </p>

            <h2>11. Changes to Terms</h2>
            <p>
              We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, 
              we will provide at least 30 days notice prior to any new terms taking effect.
            </p>

            <h2>12. Contact Information</h2>
            <p>
              If you have any questions about these Terms of Service, please contact us at:
            </p>
            <ul>
              <li>Email: legal@healyz.com</li>
              <li>Phone: +61 (406) 602 570</li>
              <li>Address: Sydney, NSW, Australia</li>
            </ul>

            <div className="mt-12 p-6 bg-primary/5 rounded-lg border border-primary/20">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Questions about our Terms?</h3>
              <p className="text-gray-600 mb-4">
                Our team is here to help you understand our terms and how they apply to your use of Healyz.
              </p>
              <Link to="/contact">
                <Button className="bg-primary hover:bg-primary/90">
                  Contact Support
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Terms;

