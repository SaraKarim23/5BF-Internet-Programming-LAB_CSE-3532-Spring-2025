import React from 'react';
import { Facebook, Instagram, Twitter, Linkedin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-[#184E68] to-[#57CA85] dark:from-[#0f2c3a] dark:to-[#3e9c6c] text-white px-6 py-16 transition-colors duration-300">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Column 1: Brand */}
        <div>
          <h2 className="text-2xl font-bold mb-4">E-learning</h2>
          <p className="text-white/80 text-sm leading-relaxed">
            Empowering your learning journey with top-notch courses and personalized guidance.
          </p>
        </div>

        {/* Column 2: Explore */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Explore</h3>
          <ul className="space-y-2 text-white/80 text-sm">
            <li><a href="#">Courses</a></li>
            <li><a href="#">Instructors</a></li>
            <li><a href="#">Pricing</a></li>
            <li><a href="#">Testimonials</a></li>
          </ul>
        </div>

        {/* Column 3: Support */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Support</h3>
          <ul className="space-y-2 text-white/80 text-sm">
            <li><a href="#">Help Center</a></li>
            <li><a href="#">Terms of Service</a></li>
            <li><a href="#">Privacy Policy</a></li>
            <li><a href="#">Contact Us</a></li>
          </ul>
        </div>

        {/* Column 4: Social Media */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
          <div className="flex space-x-4 text-white/90">
            <a href="#"><Facebook /></a>
            <a href="#"><Instagram /></a>
            <a href="#"><Twitter /></a>
            <a href="#"><Linkedin /></a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="mt-16 border-t border-white/20 pt-6 text-center text-white/70 text-sm">
        &copy; {new Date().getFullYear()} E-learning. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
