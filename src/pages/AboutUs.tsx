import { ImageIcon, Heart, Users, Sparkles, Target, Award, Globe } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const AboutUs = () => {
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
              <Link to="/contact">
                <Button variant="ghost">Contact</Button>
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
            About WallPixel
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Your ultimate destination for stunning, high-quality wallpapers that transform your device into a work of art.
          </p>
        </div>

        {/* Mission Section */}
        <section className="mb-16">
          <div className="bg-card rounded-3xl p-8 md:p-12 border border-border shadow-card">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 bg-gradient-primary rounded-2xl flex items-center justify-center">
                <Target className="w-7 h-7 text-primary-foreground" />
              </div>
              <h2 className="text-3xl font-bold text-foreground">Our Mission</h2>
            </div>
            <p className="text-lg text-muted-foreground leading-relaxed">
              At WallPixel, we believe that everyone deserves access to beautiful, high-quality wallpapers without any cost. Our mission is to curate and deliver the most stunning visual content from around the world, making it easy for you to personalize your devices with artwork that inspires you every day. We are committed to providing a seamless, ad-supported experience that keeps our service free for all users while supporting the creative community.
            </p>
          </div>
        </section>

        {/* Values Grid */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-10 text-foreground">What We Stand For</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-card rounded-2xl p-6 border border-border shadow-card hover:shadow-glow transition-shadow">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                <Heart className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-foreground">Quality First</h3>
              <p className="text-muted-foreground">
                Every wallpaper in our collection is hand-picked for its artistic quality, resolution, and visual appeal. We only feature content that meets our high standards.
              </p>
            </div>
            <div className="bg-card rounded-2xl p-6 border border-border shadow-card hover:shadow-glow transition-shadow">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-foreground">Community Driven</h3>
              <p className="text-muted-foreground">
                We listen to our users and continuously improve based on your feedback. Your satisfaction drives our innovation and content curation.
              </p>
            </div>
            <div className="bg-card rounded-2xl p-6 border border-border shadow-card hover:shadow-glow transition-shadow">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                <Sparkles className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-foreground">AI Innovation</h3>
              <p className="text-muted-foreground">
                Our cutting-edge AI wallpaper generator lets you create unique, personalized wallpapers that match your exact vision and style preferences.
              </p>
            </div>
          </div>
        </section>

        {/* Story Section */}
        <section className="mb-16">
          <div className="bg-card rounded-3xl p-8 md:p-12 border border-border shadow-card">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 bg-gradient-primary rounded-2xl flex items-center justify-center">
                <Award className="w-7 h-7 text-primary-foreground" />
              </div>
              <h2 className="text-3xl font-bold text-foreground">Our Story</h2>
            </div>
            <div className="space-y-4 text-lg text-muted-foreground leading-relaxed">
              <p>
                WallPixel was born from a simple observation: finding the perfect wallpaper shouldn't be a frustrating experience. We noticed that many wallpaper apps were either cluttered with low-quality images, filled with intrusive ads, or required expensive subscriptions for decent content.
              </p>
              <p>
                We set out to change that. Our team of designers, developers, and art enthusiasts came together to create a platform that celebrates visual beauty while respecting user experience. We carefully curate every collection, ensuring that each category offers diverse, high-resolution options.
              </p>
              <p>
                Today, WallPixel serves millions of users worldwide, helping them discover and download wallpapers that bring joy to their daily digital interactions. We continue to expand our collection, integrate new technologies like AI generation, and improve our platform based on user feedback.
              </p>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-10 text-foreground">WallPixel by Numbers</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="bg-card rounded-2xl p-6 border border-border text-center shadow-card">
              <div className="text-4xl font-bold text-primary mb-2">100+</div>
              <p className="text-muted-foreground">Premium Wallpapers</p>
            </div>
            <div className="bg-card rounded-2xl p-6 border border-border text-center shadow-card">
              <div className="text-4xl font-bold text-primary mb-2">5</div>
              <p className="text-muted-foreground">Categories</p>
            </div>
            <div className="bg-card rounded-2xl p-6 border border-border text-center shadow-card">
              <div className="text-4xl font-bold text-primary mb-2">∞</div>
              <p className="text-muted-foreground">AI Generated</p>
            </div>
            <div className="bg-card rounded-2xl p-6 border border-border text-center shadow-card">
              <div className="text-4xl font-bold text-primary mb-2">Free</div>
              <p className="text-muted-foreground">Always Free</p>
            </div>
          </div>
        </section>

        {/* Global Reach */}
        <section className="mb-16">
          <div className="bg-card rounded-3xl p-8 md:p-12 border border-border shadow-card">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 bg-gradient-primary rounded-2xl flex items-center justify-center">
                <Globe className="w-7 h-7 text-primary-foreground" />
              </div>
              <h2 className="text-3xl font-bold text-foreground">Global Reach</h2>
            </div>
            <p className="text-lg text-muted-foreground leading-relaxed">
              WallPixel is proud to serve users from every corner of the globe. Our diverse collection features artwork and photography that represents cultures, landscapes, and artistic styles from around the world. Whether you're looking for serene nature scenes from Nordic countries, vibrant abstract art inspired by Latin American culture, or minimalist designs popular in Japanese aesthetics, WallPixel has something for everyone. We believe in the universal language of visual beauty and strive to make our platform accessible and enjoyable for all.
            </p>
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center">
          <div className="bg-gradient-primary rounded-3xl p-8 md:p-12">
            <h2 className="text-3xl font-bold text-primary-foreground mb-4">
              Ready to Transform Your Device?
            </h2>
            <p className="text-primary-foreground/80 mb-6 max-w-xl mx-auto">
              Browse our collection of stunning wallpapers or create your own with our AI generator.
            </p>
            <Link to="/">
              <Button size="lg" variant="secondary" className="font-semibold">
                Explore Wallpapers
              </Button>
            </Link>
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

export default AboutUs;
