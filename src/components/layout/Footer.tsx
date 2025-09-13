import { Phone, Mail, MapPin, Instagram, Facebook, Linkedin, MessageCircle } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground pb-nav">
      <div className="px-4 py-12">
        <div className="max-w-6xl mx-auto">
          {/* Brand Section */}
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold mb-2">Smart Cleaners</h3>
            <p className="text-primary-foreground/80 max-w-md mx-auto">
              Premium housekeeping chemicals for hotels, restaurants, and commercial establishments. 
              Quality you trust, service you depend on.
            </p>
          </div>

          {/* Contact Info */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-accent rounded-lg flex items-center justify-center mx-auto mb-3">
                <Phone className="w-6 h-6 text-accent-foreground" />
              </div>
              <h4 className="font-semibold mb-1">Call Us</h4>
              <p className="text-primary-foreground/80 text-sm">
                +91 98765 43210<br/>
                +91 87654 32109
              </p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-accent rounded-lg flex items-center justify-center mx-auto mb-3">
                <Mail className="w-6 h-6 text-accent-foreground" />
              </div>
              <h4 className="font-semibold mb-1">Email Us</h4>
              <p className="text-primary-foreground/80 text-sm">
                orders@smartcleaners.in<br/>
                support@smartcleaners.in
              </p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-accent rounded-lg flex items-center justify-center mx-auto mb-3">
                <MapPin className="w-6 h-6 text-accent-foreground" />
              </div>
              <h4 className="font-semibold mb-1">Visit Us</h4>
              <p className="text-primary-foreground/80 text-sm">
                123 Industrial Area,<br/>
                Mumbai, Maharashtra 400001
              </p>
            </div>
          </div>

          {/* Quick Links */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 text-sm">
            <div>
              <h5 className="font-semibold mb-3">Products</h5>
              <ul className="space-y-2 text-primary-foreground/80">
                <li><a href="#" className="hover:text-accent-light">Room Fresheners</a></li>
                <li><a href="#" className="hover:text-accent-light">Bathroom Cleaners</a></li>
                <li><a href="#" className="hover:text-accent-light">Floor Cleaners</a></li>
                <li><a href="#" className="hover:text-accent-light">Kitchen Chemicals</a></li>
              </ul>
            </div>

            <div>
              <h5 className="font-semibold mb-3">Services</h5>
              <ul className="space-y-2 text-primary-foreground/80">
                <li><a href="#" className="hover:text-accent-light">Bulk Orders</a></li>
                <li><a href="#" className="hover:text-accent-light">Custom Solutions</a></li>
                <li><a href="#" className="hover:text-accent-light">Technical Support</a></li>
                <li><a href="#" className="hover:text-accent-light">Training</a></li>
              </ul>
            </div>

            <div>
              <h5 className="font-semibold mb-3">Company</h5>
              <ul className="space-y-2 text-primary-foreground/80">
                <li><a href="#" className="hover:text-accent-light">About Us</a></li>
                <li><a href="#" className="hover:text-accent-light">Certifications</a></li>
                <li><a href="#" className="hover:text-accent-light">Careers</a></li>
                <li><a href="#" className="hover:text-accent-light">Contact</a></li>
              </ul>
            </div>

            <div>
              <h5 className="font-semibold mb-3">Support</h5>
              <ul className="space-y-2 text-primary-foreground/80">
                <li><a href="#" className="hover:text-accent-light">Help Center</a></li>
                <li><a href="#" className="hover:text-accent-light">Order Tracking</a></li>
                <li><a href="#" className="hover:text-accent-light">Returns</a></li>
                <li><a href="#" className="hover:text-accent-light">Bulk Inquiry</a></li>
              </ul>
            </div>
          </div>

          {/* Social Links */}
          <div className="flex justify-center space-x-6 mb-6">
            <a href="#" className="w-10 h-10 bg-accent hover:bg-accent-hover rounded-lg flex items-center justify-center transition-colors">
              <Instagram className="w-5 h-5 text-accent-foreground" />
            </a>
            <a href="#" className="w-10 h-10 bg-accent hover:bg-accent-hover rounded-lg flex items-center justify-center transition-colors">
              <Facebook className="w-5 h-5 text-accent-foreground" />
            </a>
            <a href="#" className="w-10 h-10 bg-accent hover:bg-accent-hover rounded-lg flex items-center justify-center transition-colors">
              <Linkedin className="w-5 h-5 text-accent-foreground" />
            </a>
            <a href="#" className="w-10 h-10 bg-accent hover:bg-accent-hover rounded-lg flex items-center justify-center transition-colors">
              <MessageCircle className="w-5 h-5 text-accent-foreground" />
            </a>
          </div>

          {/* Certifications */}
          <div className="text-center mb-6">
            <p className="text-sm text-primary-foreground/80 mb-2">Certified & Trusted</p>
            <div className="flex justify-center items-center space-x-4 text-xs text-primary-foreground/60">
              <span>ISO 9001:2015</span>
              <span>•</span>
              <span>Eco-Friendly</span>
              <span>•</span>
              <span>BIS Approved</span>
            </div>
          </div>

          {/* Copyright */}
          <div className="text-center pt-6 border-t border-primary-light/20">
            <p className="text-sm text-primary-foreground/60">
              © 2024 Smart Cleaners. All rights reserved. | 
              <a href="#" className="hover:text-accent-light ml-1">Privacy Policy</a> | 
              <a href="#" className="hover:text-accent-light ml-1">Terms of Service</a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;