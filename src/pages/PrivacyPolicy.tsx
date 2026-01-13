import { ImageIcon, Shield, Eye, Lock, FileText, Bell, Users, Database } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const PrivacyPolicy = () => {
  const lastUpdated = "January 13, 2026";

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
              <Link to="/contact">
                <Button variant="ghost">Contact</Button>
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12 max-w-4xl">
        {/* Hero Section */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-glow">
            <Shield className="w-8 h-8 text-primary-foreground" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
            Privacy Policy
          </h1>
          <p className="text-muted-foreground">
            Last updated: {lastUpdated}
          </p>
        </div>

        {/* Introduction */}
        <section className="mb-10">
          <div className="bg-card rounded-2xl p-6 border border-border shadow-card">
            <p className="text-muted-foreground leading-relaxed">
              At WallPixel ("we," "our," or "us"), we are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our wallpaper application and website (collectively, the "Service"). Please read this privacy policy carefully. By using our Service, you agree to the collection and use of information in accordance with this policy.
            </p>
          </div>
        </section>

        {/* Information We Collect */}
        <section className="mb-10">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
              <Database className="w-5 h-5 text-primary" />
            </div>
            <h2 className="text-2xl font-bold text-foreground">Information We Collect</h2>
          </div>
          
          <div className="space-y-4">
            <div className="bg-card rounded-xl p-5 border border-border">
              <h3 className="font-semibold text-foreground mb-2">Automatically Collected Information</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                When you access our Service, we may automatically collect certain information about your device and usage patterns. This includes your device type, operating system, browser type, IP address, unique device identifiers, and information about how you interact with our Service (such as pages viewed, time spent, and navigation patterns). This information helps us improve our Service and provide a better user experience.
              </p>
            </div>
            
            <div className="bg-card rounded-xl p-5 border border-border">
              <h3 className="font-semibold text-foreground mb-2">Usage Data</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                We collect information about your interactions with our Service, including which wallpapers you view, download, and share. This data helps us understand user preferences and improve our content curation. We also collect data about AI wallpaper generation requests to improve our AI model and provide better results.
              </p>
            </div>
            
            <div className="bg-card rounded-xl p-5 border border-border">
              <h3 className="font-semibold text-foreground mb-2">Contact Information</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                If you contact us directly, we may receive additional information about you such as your name, email address, phone number, the contents of your message, and any attachments you may send us. This information is used solely to respond to your inquiries and provide customer support.
              </p>
            </div>
          </div>
        </section>

        {/* How We Use Your Information */}
        <section className="mb-10">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
              <Eye className="w-5 h-5 text-primary" />
            </div>
            <h2 className="text-2xl font-bold text-foreground">How We Use Your Information</h2>
          </div>
          
          <div className="bg-card rounded-xl p-6 border border-border">
            <ul className="space-y-3 text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                <span>To provide, maintain, and improve our Service and user experience</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                <span>To personalize content and recommendations based on your preferences</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                <span>To analyze usage patterns and optimize our wallpaper collection</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                <span>To respond to your comments, questions, and customer service requests</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                <span>To display advertisements that may be relevant to your interests</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                <span>To detect, prevent, and address technical issues and security threats</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                <span>To comply with legal obligations and protect our rights</span>
              </li>
            </ul>
          </div>
        </section>

        {/* Advertising */}
        <section className="mb-10">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
              <Bell className="w-5 h-5 text-primary" />
            </div>
            <h2 className="text-2xl font-bold text-foreground">Advertising</h2>
          </div>
          
          <div className="bg-card rounded-xl p-6 border border-border">
            <p className="text-muted-foreground leading-relaxed mb-4">
              WallPixel is a free service supported by advertisements. We work with third-party advertising partners, including Google AdSense, to display ads on our Service. These advertising partners may use cookies, web beacons, and similar technologies to collect information about your activities on our Service and other websites to provide you with targeted advertising based on your browsing activities and interests.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              You can opt out of personalized advertising by visiting your device's settings or by using the opt-out tools provided by advertising networks. Please note that opting out does not mean you will stop seeing ads; rather, the ads you see may be less relevant to your interests.
            </p>
          </div>
        </section>

        {/* Data Sharing */}
        <section className="mb-10">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
              <Users className="w-5 h-5 text-primary" />
            </div>
            <h2 className="text-2xl font-bold text-foreground">Data Sharing and Disclosure</h2>
          </div>
          
          <div className="bg-card rounded-xl p-6 border border-border">
            <p className="text-muted-foreground leading-relaxed mb-4">
              We do not sell, trade, or rent your personal information to third parties. However, we may share your information in the following circumstances:
            </p>
            <ul className="space-y-3 text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                <span><strong className="text-foreground">Service Providers:</strong> We may share information with trusted third-party service providers who assist us in operating our Service, conducting our business, or serving our users.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                <span><strong className="text-foreground">Advertising Partners:</strong> We share anonymized data with advertising partners to enable targeted advertising and measure ad performance.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                <span><strong className="text-foreground">Legal Requirements:</strong> We may disclose information if required to do so by law or in response to valid requests by public authorities.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                <span><strong className="text-foreground">Business Transfers:</strong> In the event of a merger, acquisition, or sale of assets, your information may be transferred to the acquiring entity.</span>
              </li>
            </ul>
          </div>
        </section>

        {/* Data Security */}
        <section className="mb-10">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
              <Lock className="w-5 h-5 text-primary" />
            </div>
            <h2 className="text-2xl font-bold text-foreground">Data Security</h2>
          </div>
          
          <div className="bg-card rounded-xl p-6 border border-border">
            <p className="text-muted-foreground leading-relaxed">
              We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. These measures include encryption, secure servers, and regular security assessments. However, please be aware that no method of transmission over the Internet or electronic storage is 100% secure, and we cannot guarantee absolute security of your data.
            </p>
          </div>
        </section>

        {/* Your Rights */}
        <section className="mb-10">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
              <FileText className="w-5 h-5 text-primary" />
            </div>
            <h2 className="text-2xl font-bold text-foreground">Your Rights and Choices</h2>
          </div>
          
          <div className="bg-card rounded-xl p-6 border border-border">
            <p className="text-muted-foreground leading-relaxed mb-4">
              Depending on your location, you may have certain rights regarding your personal information:
            </p>
            <ul className="space-y-3 text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                <span>The right to access and obtain a copy of your personal data</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                <span>The right to rectify inaccurate personal data</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                <span>The right to request deletion of your personal data</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                <span>The right to restrict or object to processing of your personal data</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                <span>The right to data portability</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                <span>The right to withdraw consent at any time</span>
              </li>
            </ul>
            <p className="text-muted-foreground leading-relaxed mt-4">
              To exercise any of these rights, please contact us using the information provided in our Contact Us section.
            </p>
          </div>
        </section>

        {/* Cookies */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-foreground mb-6">Cookies and Tracking Technologies</h2>
          <div className="bg-card rounded-xl p-6 border border-border">
            <p className="text-muted-foreground leading-relaxed mb-4">
              We use cookies and similar tracking technologies to collect and track information and to improve and analyze our Service. Cookies are small data files stored on your device. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our Service.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Types of cookies we use include: essential cookies (necessary for the Service to function), analytics cookies (help us understand how users interact with our Service), and advertising cookies (used to deliver relevant advertisements).
            </p>
          </div>
        </section>

        {/* Children's Privacy */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-foreground mb-6">Children's Privacy</h2>
          <div className="bg-card rounded-xl p-6 border border-border">
            <p className="text-muted-foreground leading-relaxed">
              Our Service is not intended for children under the age of 13. We do not knowingly collect personal information from children under 13. If you are a parent or guardian and you are aware that your child has provided us with personal information, please contact us so that we can take necessary actions to remove that information from our servers.
            </p>
          </div>
        </section>

        {/* Changes to Privacy Policy */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-foreground mb-6">Changes to This Privacy Policy</h2>
          <div className="bg-card rounded-xl p-6 border border-border">
            <p className="text-muted-foreground leading-relaxed">
              We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date at the top of this policy. We encourage you to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page.
            </p>
          </div>
        </section>

        {/* Contact */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-foreground mb-6">Contact Us</h2>
          <div className="bg-gradient-primary rounded-2xl p-6 text-center">
            <p className="text-primary-foreground mb-4">
              If you have any questions about this Privacy Policy, please contact us.
            </p>
            <Link to="/contact">
              <Button variant="secondary" size="lg" className="font-semibold">
                Contact Us
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

export default PrivacyPolicy;
