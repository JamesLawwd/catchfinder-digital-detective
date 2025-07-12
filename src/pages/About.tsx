
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, Users, Target, Heart, Award, Clock, Database, Lock } from "lucide-react";
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
              <span className="text-2xl font-bold text-white">CatchFinder</span>
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
            About CatchFinder
          </Badge>
          <h1 className="text-5xl font-bold text-white mb-6">
            Empowering Truth Through
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
              {" "}Technology
            </span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            CatchFinder was born from a simple belief: everyone deserves to know the truth about the people in their lives. 
            We've built the most advanced digital investigation platform to help you uncover hidden online activities.
          </p>
        </div>

        {/* Mission Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
            <CardHeader>
              <Target className="h-12 w-12 text-purple-400 mb-4" />
              <CardTitle className="text-white text-2xl">Our Mission</CardTitle>
              <CardDescription className="text-gray-300 text-lg">
                To provide individuals with the tools and information they need to make informed decisions about their relationships and personal safety. We believe in transparency, trust, and the right to know.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
            <CardHeader>
              <Heart className="h-12 w-12 text-pink-400 mb-4" />
              <CardTitle className="text-white text-2xl">Why We Care</CardTitle>
              <CardDescription className="text-gray-300 text-lg">
                Behind every search is a real person seeking peace of mind. We understand the emotional weight of uncertainty and have dedicated ourselves to providing reliable, discreet investigation services.
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
              <h3 className="text-xl font-semibold text-white mb-2">Comprehensive Database</h3>
              <p className="text-gray-300">Access to over 50 platforms including dating sites, social media, and adult content platforms</p>
            </div>
            <div className="text-center">
              <Award className="h-16 w-16 text-yellow-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">98% Accuracy</h3>
              <p className="text-gray-300">Industry-leading facial recognition and image matching technology</p>
            </div>
            <div className="text-center">
              <Clock className="h-16 w-16 text-green-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">Instant Results</h3>
              <p className="text-gray-300">Get comprehensive reports in under 60 seconds</p>
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
            How CatchFinder Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="bg-white/5 border-white/10 backdrop-blur-sm text-center">
              <CardHeader>
                <div className="bg-purple-600 text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 text-xl font-bold">1</div>
                <CardTitle className="text-white">Upload or Enter</CardTitle>
                <CardDescription className="text-gray-300">
                  Upload a photo or enter a phone number of the person you want to investigate
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-white/5 border-white/10 backdrop-blur-sm text-center">
              <CardHeader>
                <div className="bg-pink-600 text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 text-xl font-bold">2</div>
                <CardTitle className="text-white">AI Analysis</CardTitle>
                <CardDescription className="text-gray-300">
                  Our advanced AI scans across 50+ platforms using facial recognition and data matching
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-white/5 border-white/10 backdrop-blur-sm text-center">
              <CardHeader>
                <div className="bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 text-xl font-bold">3</div>
                <CardTitle className="text-white">Get Results</CardTitle>
                <CardDescription className="text-gray-300">
                  Receive a detailed report with all matches, profiles, and relevant information found
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
            Ready to Discover the Truth?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Join thousands of users who have found peace of mind through CatchFinder's investigation services.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
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
        </section>
      </div>
    </div>
  );
};

export default About;
