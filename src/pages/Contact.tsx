
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, Mail, MessageSquare, Phone, Clock, Globe } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";

const Contact = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  // Replace the form handler with Formspree
  // Get your Formspree endpoint: https://formspree.io/f/{yourFormId}
  // For first-time use, use the default endpoint and confirm via email
  const FORMSPREE_ENDPOINT = "https://formspree.io/f/mnqewqzv"; // Replace with your Formspree form ID if you want a custom one

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // toast({
    //   title: "Message Sent!",
    //   description: "Thank you for contacting us. We'll get back to you within 24 hours.",
    // });
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Navigation */}
      <nav className="bg-black/20 backdrop-blur-sm border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2 cursor-pointer" onClick={() => navigate('/')}>
              <Shield className="h-8 w-8 text-purple-400" />
              <span className="text-xl md:text-2xl font-bold text-white">PersonaTrace</span>
            </div>
            <div className="flex items-center space-x-4">
              <Button 
                variant="ghost" 
                className="text-white hover:text-purple-300"
                onClick={() => navigate('/')}
              >
                Home
              </Button>
              <Button 
                variant="ghost" 
                className="text-white hover:text-purple-300"
                onClick={() => navigate('/about')}
              >
                About
              </Button>
              <Button className="bg-purple-600 hover:bg-purple-700 text-white">
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-4 py-20">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <Badge className="bg-purple-500/20 text-purple-300 border-purple-500/30 mb-4">
            Get In Touch
          </Badge>
          <h1 className="text-5xl font-bold text-white mb-6">
            Contact
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
              {" "}PersonaTrace
            </span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Have questions about our dating profile search services? Need technical support? Want to report an issue? 
            We're here to help you through our online support channels.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
            <CardHeader>
              <MessageSquare className="h-8 w-8 text-purple-400 mb-2" />
              <CardTitle className="text-white text-2xl">Send us a Message</CardTitle>
              <CardDescription className="text-gray-300">
                Fill out the form below and we'll get back to you within 24 hours
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form 
                action={FORMSPREE_ENDPOINT}
                method="POST"
                className="space-y-6"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-white mb-2">Name</label>
                    <Input
                      name="name"
                      value={formData.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                      className="bg-white/10 border-white/20 text-white placeholder-gray-400"
                      placeholder="Your full name"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-white mb-2">Email</label>
                    <Input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      className="bg-white/10 border-white/20 text-white placeholder-gray-400"
                      placeholder="your@email.com"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-white mb-2">Subject</label>
                  <Input
                    name="subject"
                    value={formData.subject}
                    onChange={(e) => handleInputChange("subject", e.target.value)}
                    className="bg-white/10 border-white/20 text-white placeholder-gray-400"
                    placeholder="What's this about?"
                    required
                  />
                </div>
                <div>
                  <label className="block text-white mb-2">Message</label>
                  <Textarea
                    name="message"
                    value={formData.message}
                    onChange={(e) => handleInputChange("message", e.target.value)}
                    className="bg-white/10 border-white/20 text-white placeholder-gray-400 min-h-32"
                    placeholder="Tell us how we can help you..."
                    required
                  />
                </div>
                {/* Formspree success message */}
                <input type="hidden" name="_subject" value="PersonaTrace Contact Form" />
                <input type="hidden" name="_replyto" value={formData.email} />
                <input type="hidden" name="_next" value="/contact?success=1" />
                <Button 
                  type="submit"
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
                >
                  Send Message
                </Button>
              </form>
              {/* Show a success message if redirected with ?success=1 */}
              {typeof window !== 'undefined' && window.location.search.includes('success=1') && (
                <div className="mt-4 p-4 bg-green-500/10 border border-green-500/20 rounded text-green-300 text-center">
                  Message sent! Thank you for contacting us. We'll get back to you within 24 hours.
                </div>
              )}
            </CardContent>
          </Card>

          {/* Contact Information */}
          <div className="space-y-8">
            <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
              <CardHeader>
                <Mail className="h-8 w-8 text-blue-400 mb-2" />
                <CardTitle className="text-white">Email Support</CardTitle>
                <CardDescription className="text-gray-300">
                  Get help with technical issues or general inquiries
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-purple-400 font-semibold">jleo5621@gmail.com</p>
                <p className="text-gray-300 text-sm mt-2">Response time: Within 24 hours</p>
              </CardContent>
            </Card>

            <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
              <CardHeader>
                <Clock className="h-8 w-8 text-yellow-400 mb-2" />
                <CardTitle className="text-white">Support Hours</CardTitle>
                <CardDescription className="text-gray-300">
                  When our support team is available
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-purple-400 font-semibold">Monday - Friday</p>
                <p className="text-gray-300 text-sm mt-1">9:00 AM - 6:00 PM EST</p>
                <p className="text-gray-300 text-sm mt-3">Email support available 24/7</p>
              </CardContent>
            </Card>

            <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
              <CardHeader>
                <Globe className="h-8 w-8 text-green-400 mb-2" />
                <CardTitle className="text-white">Online Service</CardTitle>
                <CardDescription className="text-gray-300">
                  Fully digital platform accessible worldwide
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-purple-400 font-semibold">100% Online Platform</p>
                <p className="text-gray-300 text-sm mt-2">Available globally through secure web access</p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* FAQ Section */}
        <section className="mt-20">
          <h2 className="text-3xl font-bold text-white text-center mb-12">
            Frequently Asked Questions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white">Is PersonaTrace really free?</CardTitle>
                <CardDescription className="text-gray-300">
                  Yes! Our dating profile search services are completely free to use. No hidden fees or premium tiers.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white">How accurate are your results?</CardTitle>
                <CardDescription className="text-gray-300">
                  Results depend on available public data. We search multiple dating platforms but cannot guarantee 100% accuracy or completeness.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white">Is my search private?</CardTitle>
                <CardDescription className="text-gray-300">
                  Yes. All searches are conducted privately and we don't store your search data or uploaded images permanently.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white">What dating platforms do you search?</CardTitle>
                <CardDescription className="text-gray-300">
                  We search across major dating platforms including Tinder, Bumble, Hinge, OkCupid, Match.com, and many others across African countries.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Contact;
