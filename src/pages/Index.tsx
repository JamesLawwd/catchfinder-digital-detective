
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Shield, Search, Camera, Phone, Eye, AlertTriangle, CheckCircle, Users, Zap, Lock, Globe } from "lucide-react";
import SearchInterface from "@/components/SearchInterface";
import Dashboard from "@/components/Dashboard";
import { toast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const [activeTab, setActiveTab] = useState("home");
  const [isSearching, setIsSearching] = useState(false);
  const navigate = useNavigate();

  const handleSearch = async (type: "photo" | "phone", data: string) => {
    setIsSearching(true);
    // Simulate search process
    toast({
      title: "Search Initiated",
      description: "Scanning across multiple platforms and databases...",
    });
    
    setTimeout(() => {
      setIsSearching(false);
      setActiveTab("results");
      toast({
        title: "Search Complete",
        description: "Found 12 potential matches across 8 platforms",
      });
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Navigation */}
      <nav className="bg-black/20 backdrop-blur-sm border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Shield className="h-8 w-8 text-purple-400" />
              <span className="text-2xl font-bold text-white">CatchFinder</span>
            </div>
            <div className="flex items-center space-x-4">
              <Button 
                variant="ghost" 
                className="text-white hover:text-purple-300"
                onClick={() => navigate('/about')}
              >
                About
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

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="hidden">
          <TabsTrigger value="home">Home</TabsTrigger>
          <TabsTrigger value="search">Search</TabsTrigger>
          <TabsTrigger value="results">Results</TabsTrigger>
        </TabsList>

        <TabsContent value="home" className="mt-0">
          {/* Hero Section */}
          <section className="relative py-20 px-4">
            <div className="max-w-6xl mx-auto text-center">
              <div className="mb-8">
                <Badge className="bg-purple-500/20 text-purple-300 border-purple-500/30 mb-4">
                  Advanced Digital Investigation Platform - 100% Free
                </Badge>
                <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
                  Uncover Hidden
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                    {" "}Digital Footprints
                  </span>
                </h1>
                <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
                  Discover if someone appears on dating platforms, adult content sites, or social media using advanced reverse image search and facial recognition technology.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-6 text-lg"
                  onClick={() => setActiveTab("search")}
                >
                  <Search className="mr-2 h-5 w-5" />
                  Start Investigation
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-white/20 text-white hover:bg-white/10 px-8 py-6 text-lg"
                >
                  <Eye className="mr-2 h-5 w-5" />
                  View Demo
                </Button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                <div className="text-center">
                  <div className="text-4xl font-bold text-purple-400 mb-2">2M+</div>
                  <div className="text-gray-300">Profiles Scanned</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-pink-400 mb-2">50+</div>
                  <div className="text-gray-300">Platforms Monitored</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-blue-400 mb-2">98%</div>
                  <div className="text-gray-300">Accuracy Rate</div>
                </div>
              </div>
            </div>
          </section>

          {/* Features Section */}
          <section className="py-20 px-4 bg-black/20">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-4xl font-bold text-white text-center mb-12">
                Advanced Investigation Tools
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
                  <CardHeader>
                    <Camera className="h-12 w-12 text-purple-400 mb-4" />
                    <CardTitle className="text-white">Reverse Image Search</CardTitle>
                    <CardDescription className="text-gray-300">
                      Upload a photo and find exact or similar matches across the entire internet
                    </CardDescription>
                  </CardHeader>
                </Card>

                <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
                  <CardHeader>
                    <Phone className="h-12 w-12 text-pink-400 mb-4" />
                    <CardTitle className="text-white">Phone Number Lookup</CardTitle>
                    <CardDescription className="text-gray-300">
                      Discover social media profiles and dating accounts linked to phone numbers
                    </CardDescription>
                  </CardHeader>
                </Card>

                <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
                  <CardHeader>
                    <Users className="h-12 w-12 text-blue-400 mb-4" />
                    <CardTitle className="text-white">Facial Recognition</CardTitle>
                    <CardDescription className="text-gray-300">
                      AI-powered facial matching across dating platforms and adult sites
                    </CardDescription>
                  </CardHeader>
                </Card>

                <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
                  <CardHeader>
                    <AlertTriangle className="h-12 w-12 text-yellow-400 mb-4" />
                    <CardTitle className="text-white">Real-time Alerts</CardTitle>
                    <CardDescription className="text-gray-300">
                      Get notified when new profiles or content appear online
                    </CardDescription>
                  </CardHeader>
                </Card>

                <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
                  <CardHeader>
                    <Shield className="h-12 w-12 text-green-400 mb-4" />
                    <CardTitle className="text-white">Secure & Discreet</CardTitle>
                    <CardDescription className="text-gray-300">
                      All searches are completely private and encrypted
                    </CardDescription>
                  </CardHeader>
                </Card>

                <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
                  <CardHeader>
                    <Zap className="h-12 w-12 text-orange-400 mb-4" />
                    <CardTitle className="text-white">Instant Results</CardTitle>
                    <CardDescription className="text-gray-300">
                      Get comprehensive reports in under 60 seconds
                    </CardDescription>
                  </CardHeader>
                </Card>
              </div>
            </div>
          </section>

          {/* Trust & Security Section */}
          <section className="py-20 px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-4xl font-bold text-white text-center mb-12">
                Your Privacy is Our Priority
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                <div className="text-center">
                  <Lock className="h-16 w-16 text-green-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-white mb-2">End-to-End Encryption</h3>
                  <p className="text-gray-300">All data is encrypted and never stored on our servers</p>
                </div>
                <div className="text-center">
                  <Globe className="h-16 w-16 text-blue-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-white mb-2">Global Coverage</h3>
                  <p className="text-gray-300">Search across international platforms and databases</p>
                </div>
                <div className="text-center">
                  <CheckCircle className="h-16 w-16 text-purple-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-white mb-2">100% Legal</h3>
                  <p className="text-gray-300">All searches comply with privacy laws and regulations</p>
                </div>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-20 px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-4xl font-bold text-white mb-6">
                Protect Your Peace of Mind
              </h2>
              <p className="text-xl text-gray-300 mb-8">
                Don't let uncertainty control your life. Get the truth with CatchFinder's advanced investigation tools - completely free.
              </p>
              <Button 
                size="lg"
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-12 py-6 text-xl"
                onClick={() => setActiveTab("search")}
              >
                Start Your Investigation Now
              </Button>
            </div>
          </section>
        </TabsContent>

        <TabsContent value="search" className="mt-0">
          <SearchInterface onSearch={handleSearch} isSearching={isSearching} />
        </TabsContent>

        <TabsContent value="results" className="mt-0">
          <Dashboard />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Index;
