import { ImageIcon, Mail, MessageSquare, Clock, Send, MapPin, Phone, Globe } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { toast } from "sonner";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast.success("Message sent successfully!", {
      description: "We'll get back to you within 24-48 hours."
    });
    
    setFormData({ name: "", email: "", subject: "", message: "" });
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-xl border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-primary rounded-xl flex items-center justify-center shadow-glow">
                <ImageIcon className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                  WallPixel
                </h1>
                <p className="text-sm text-muted-foreground">Premium Wallpapers</p>
              </div>
            </Link>
            <nav className="flex gap-4">
              <Link to="/">
                <Button variant="ghost">Home</Button>
              </Link>
              <Link to="/about">
                <Button variant="ghost">About</Button>
              </Link>
              <Link to="/privacy">
                <Button variant="ghost">Privacy</Button>
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-primary bg-clip-text text-transparent">
            Contact Us
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Have questions, suggestions, or feedback? We'd love to hear from you. Our team is here to help!
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-card rounded-3xl p-8 border border-border shadow-card">
            <h2 className="text-2xl font-bold mb-6 text-foreground">Send us a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                  Your Name
                </label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  className="bg-background"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                  Email Address
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email address"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  className="bg-background"
                />
              </div>
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-foreground mb-2">
                  Subject
                </label>
                <Input
                  id="subject"
                  type="text"
                  placeholder="What is this regarding?"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  required
                  className="bg-background"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                  Message
                </label>
                <Textarea
                  id="message"
                  placeholder="Write your message here..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                  rows={6}
                  className="bg-background resize-none"
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-gradient-primary hover:opacity-90 text-primary-foreground font-semibold"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  "Sending..."
                ) : (
                  <>
                    <Send className="w-5 h-5 mr-2" />
                    Send Message
                  </>
                )}
              </Button>
            </form>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            {/* Contact Cards */}
            <div className="bg-card rounded-2xl p-6 border border-border shadow-card">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                  <Mail className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Email Us</h3>
                  <p className="text-muted-foreground">support@wallpixel.com</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                For general inquiries, partnership opportunities, or technical support.
              </p>
            </div>

            <div className="bg-card rounded-2xl p-6 border border-border shadow-card">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                  <MessageSquare className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Live Chat</h3>
                  <p className="text-muted-foreground">Available Mon-Fri</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                Get instant help during business hours for quick questions and support.
              </p>
            </div>

            <div className="bg-card rounded-2xl p-6 border border-border shadow-card">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                  <Clock className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Response Time</h3>
                  <p className="text-muted-foreground">24-48 hours</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                We aim to respond to all inquiries within 1-2 business days.
              </p>
            </div>

            <div className="bg-card rounded-2xl p-6 border border-border shadow-card">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                  <Globe className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Social Media</h3>
                  <p className="text-muted-foreground">@WallPixelApp</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                Follow us on social media for updates, new wallpapers, and community features.
              </p>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <section className="mt-16">
          <h2 className="text-3xl font-bold text-center mb-10 text-foreground">Frequently Asked Questions</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-card rounded-2xl p-6 border border-border shadow-card">
              <h3 className="font-semibold text-foreground mb-2">Is WallPixel free to use?</h3>
              <p className="text-muted-foreground">
                Yes! WallPixel is completely free. We are supported by advertisements which help us maintain and improve the service while keeping it accessible to everyone.
              </p>
            </div>
            <div className="bg-card rounded-2xl p-6 border border-border shadow-card">
              <h3 className="font-semibold text-foreground mb-2">How do I set a wallpaper on my phone?</h3>
              <p className="text-muted-foreground">
                After downloading, go to your phone's Gallery, find the image, tap on it, select "Set as wallpaper" and choose Home screen, Lock screen, or Both.
              </p>
            </div>
            <div className="bg-card rounded-2xl p-6 border border-border shadow-card">
              <h3 className="font-semibold text-foreground mb-2">Can I use wallpapers for commercial purposes?</h3>
              <p className="text-muted-foreground">
                Our wallpapers are intended for personal use only. For commercial licensing inquiries, please contact us directly.
              </p>
            </div>
            <div className="bg-card rounded-2xl p-6 border border-border shadow-card">
              <h3 className="font-semibold text-foreground mb-2">How does the AI generator work?</h3>
              <p className="text-muted-foreground">
                Simply describe the wallpaper you want, and our AI will create a unique, high-quality image tailored to your specifications. It's like having a personal artist!
              </p>
            </div>
            <div className="bg-card rounded-2xl p-6 border border-border shadow-card">
              <h3 className="font-semibold text-foreground mb-2">What image quality can I expect?</h3>
              <p className="text-muted-foreground">
                All our wallpapers are optimized for mobile devices with resolutions up to 4K, ensuring crisp and vibrant display on any screen size.
              </p>
            </div>
            <div className="bg-card rounded-2xl p-6 border border-border shadow-card">
              <h3 className="font-semibold text-foreground mb-2">How often is new content added?</h3>
              <p className="text-muted-foreground">
                We regularly update our collection with fresh wallpapers. Plus, you can create unlimited unique wallpapers using our AI generator anytime!
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border mt-16 py-8">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} WallPixel. All rights reserved.</p>
          <div className="flex justify-center gap-6 mt-4">
            <Link to="/about" className="hover:text-primary transition-colors">About</Link>
            <Link to="/contact" className="hover:text-primary transition-colors">Contact</Link>
            <Link to="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ContactUs;
