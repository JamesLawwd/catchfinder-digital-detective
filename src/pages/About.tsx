
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, Users, Target, Heart, Award, Clock, Database, Lock, Mail } from "lucide-react";
import { useNavigate } from "react-router-dom";

const About = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Navigation */}
      <nav className="bg-black/20 backdrop-blur-sm border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2 cursor-pointer" onClick={() => navigate('/')}>
              <Shield className="h-8 w-8 text-purple-400" />
              <span className="text-2xl font-bold text-white">PersonaTrace</span>
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
                onClick={() => navigate('/contact')}
              >
                Contact
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
            About PersonaTrace
          </Badge>
          <h1 className="text-5xl font-bold text-white mb-6">
            Find Dating Profiles
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
              {" "}Across Africa
            </span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            PersonaTrace specializes in finding dating profiles across Kenya, Nigeria, South Africa, and other African countries. 
            We help you discover if someone is active on Tinder, Bumble, Hinge, and other popular dating platforms.
          </p>
        </div>

        {/* Mission Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
            <CardHeader>
              <Target className="h-12 w-12 text-purple-400 mb-4" />
              <CardTitle className="text-white text-2xl">Our Mission</CardTitle>
              <CardDescription className="text-gray-300 text-lg">
                To help people discover dating profiles across African countries, providing transparency in relationships and helping users make informed decisions about their dating life.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
            <CardHeader>
              <Heart className="h-12 w-12 text-pink-400 mb-4" />
              <CardTitle className="text-white text-2xl">Why We Care</CardTitle>
              <CardDescription className="text-gray-300 text-lg">
                We understand the importance of trust in relationships. Our platform helps you discover if someone is active on dating apps, providing peace of mind and transparency.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>

        {/* What Makes Us Different */}
        <section className="mb-20">
          <h2 className="text-4xl font-bold text-white text-center mb-12">
            What Makes Us Different
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <Database className="h-16 w-16 text-blue-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">15+ Dating Platforms</h3>
              <p className="text-gray-300">Search across Tinder, Bumble, Hinge, OkCupid, and other major dating sites</p>
            </div>
            <div className="text-center">
              <Award className="h-16 w-16 text-yellow-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">African Focus</h3>
              <p className="text-gray-300">Specialized search across 20+ African countries including Kenya, Nigeria, and South Africa</p>
            </div>
            <div className="text-center">
              <Clock className="h-16 w-16 text-green-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">Instant Results</h3>
              <p className="text-gray-300">Get dating profile matches in under 60 seconds</p>
            </div>
            <div className="text-center">
              <Lock className="h-16 w-16 text-purple-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">Complete Privacy</h3>
              <p className="text-gray-300">All searches are anonymous and data is never stored</p>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="mb-20">
          <h2 className="text-4xl font-bold text-white text-center mb-12">
            How PersonaTrace Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="bg-white/5 border-white/10 backdrop-blur-sm text-center">
              <CardHeader>
                <div className="bg-purple-600 text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 text-xl font-bold">1</div>
                <CardTitle className="text-white">Upload Photo or Phone</CardTitle>
                <CardDescription className="text-gray-300">
                  Upload a photo or enter a phone number of the person you want to search for
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-white/5 border-white/10 backdrop-blur-sm text-center">
              <CardHeader>
                <div className="bg-pink-600 text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 text-xl font-bold">2</div>
                <CardTitle className="text-white">AI Analysis</CardTitle>
                <CardDescription className="text-gray-300">
                  Our AI scans across 15+ dating platforms using facial recognition and data matching
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-white/5 border-white/10 backdrop-blur-sm text-center">
              <CardHeader>
                <div className="bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 text-xl font-bold">3</div>
                <CardTitle className="text-white">Get Dating Profiles</CardTitle>
                <CardDescription className="text-gray-300">
                  Receive a detailed report with all dating profiles found across African platforms
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </section>

        {/* Trust & Legal */}
        <section className="mb-20">
          <Card className="bg-gradient-to-r from-purple-900/50 to-pink-900/50 border-white/10 backdrop-blur-sm">
            <CardHeader className="text-center">
              <Shield className="h-16 w-16 text-green-400 mx-auto mb-4" />
              <CardTitle className="text-white text-3xl mb-4">100% Legal & Ethical</CardTitle>
              <CardDescription className="text-gray-300 text-lg max-w-4xl mx-auto">
                CatchFinder operates within all legal boundaries and privacy regulations. We only access publicly available information 
                and comply with data protection laws worldwide. Our service is designed to help protect individuals from deception, 
                not to violate anyone's privacy rights.
              </CardDescription>
            </CardHeader>
          </Card>
        </section>

        {/* CTA Section */}
        <section className="text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Discover Dating Profiles?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Join thousands of users who have found dating profiles through PersonaTrace's advanced search technology.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Button 
              size="lg"
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-6 text-lg"
              onClick={() => navigate('/')}
            >
              Start Investigation
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-white/20 text-white hover:bg-white/10 px-8 py-6 text-lg"
              onClick={() => navigate('/contact')}
            >
              Contact Us
            </Button>
          </div>
          
          {/* Email Support */}
          <div className="bg-white/5 border border-white/10 rounded-lg p-6 max-w-md mx-auto">
            <div className="flex items-center justify-center space-x-3 mb-3">
              <Mail className="h-6 w-6 text-blue-400" />
              <h3 className="text-white font-semibold">Email Support</h3>
            </div>
            <p className="text-purple-400 font-semibold text-lg">jleo5621@gmail.com</p>
            <p className="text-gray-300 text-sm mt-2">Get help with technical issues or general inquiries</p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;
