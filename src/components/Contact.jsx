import React from 'react';
import { Mail, Phone, MapPin, Facebook, Twitter, Linkedin } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';

const Contact = () => {
  return (
    <div className="min-h-screen py-20">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-muted to-secondary/20 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Contact <span className="text-primary">Us</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We'd love to hear from you! Reach out to us for any inquiries or support.
          </p>
        </div>
      </section>

      {/* Contact Details & Form */}
      <section className="py-20 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Details */}
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Get in Touch
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Feel free to contact us through any of the following methods, or fill out the form and we'll get back to you shortly.
              </p>
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <Mail className="w-6 h-6 text-primary" />
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">Email Us</h3>
                    <p className="text-gray-600">hello@healyz.com</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <Phone className="w-6 h-6 text-primary" />
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">Call Us</h3>
                    <p className="text-gray-600">+61 (406) 602 570</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <MapPin className="w-6 h-6 text-primary" />
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">Visit Us</h3>
                    <p className="text-gray-600">Sydney, New South Wales, Australia</p>
                  </div>
                </div>
              </div>
              <div className="mt-10">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Connect with Us</h3>
                <div className="flex space-x-6">
                  <a href="#" className="text-gray-600 hover:text-primary transition-colors">
                    <Facebook className="w-7 h-7" />
                  </a>
                  <a href="#" className="text-gray-600 hover:text-primary transition-colors">
                    <Twitter className="w-7 h-7" />
                  </a>
                  <a href="#" className="text-gray-600 hover:text-primary transition-colors">
                    <Linkedin className="w-7 h-7" />
                  </a>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Send Us a Message
              </h2>
              <form className="space-y-6">
                <div>
                  <Label htmlFor="name" className="text-lg">Your Name</Label>
                  <Input type="text" id="name" placeholder="John Doe" className="mt-2 p-3 text-lg" />
                </div>
                <div>
                  <Label htmlFor="email" className="text-lg">Your Email</Label>
                  <Input type="email" id="email" placeholder="john.doe@example.com" className="mt-2 p-3 text-lg" />
                </div>
                <div>
                  <Label htmlFor="subject" className="text-lg">Subject</Label>
                  <Input type="text" id="subject" placeholder="Inquiry about Healyz" className="mt-2 p-3 text-lg" />
                </div>
                <div>
                  <Label htmlFor="message" className="text-lg">Your Message</Label>
                  <Textarea id="message" placeholder="Type your message here..." rows="6" className="mt-2 p-3 text-lg" />
                </div>
                <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-lg py-3">
                  Send Message
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;

