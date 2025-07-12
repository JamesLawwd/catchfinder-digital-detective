
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
  const [profilesScanned, setProfilesScanned] = useState(0);
  const navigate = useNavigate();

  const handleSearch = async (type: "photo" | "phone", data: string) => {
    setIsSearching(true);
    
    toast({
      title: "Search Initiated",
      description: "Starting comprehensive background check across platforms...",
    });
    
    // Simulate real search process - this would be replaced with actual API calls
    setTimeout(() => {
      setIsSearching(false);
      setActiveTab("results");
      // Increment profile count only after actual search
      setProfilesScanned(prev => prev + 1);
      toast({
        title: "Search Complete",
        description: "Background check completed. Results available in dashboard.",
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
              <Button 
                className="bg-purple-600 hover:bg-purple-700 text-white"
                onClick={() => setActiveTab("search")}
              >
                Start Search
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
                  Digital Investigation Platform - 100% Free
                </Badge>
                <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
                  Uncover Hidden
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                    {" "}Digital Footprints
                  </span>
                </h1>
                <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
                  Search for online profiles and digital presence using reverse image search and phone number lookup. 
                  Get insights into social media profiles, dating platforms, and public records.
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
                  onClick={() => setActiveTab("search")}
                >
                  <Eye className="mr-2 h-5 w-5" />
                  Try Demo
                </Button>
              </div>

              {/* Live Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                <div className="text-center">
                  <div className="text-4xl font-bold text-purple-400 mb-2">{profilesScanned}</div>
                  <div className="text-gray-300">Profiles Searched Today</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-pink-400 mb-2">15+</div>
                  <div className="text-gray-300">Platforms Monitored</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-blue-400 mb-2">Free</div>
                  <div className="text-gray-300">Always Free Service</div>
                </div>
              </div>
            </div>
          </section>

          {/* Features Section */}
          <section className="py-20 px-4 bg-black/20">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-4xl font-bold text-white text-center mb-12">
                Investigation Tools
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
                  <CardHeader>
                    <Camera className="h-12 w-12 text-purple-400 mb-4" />
                    <CardTitle className="text-white">Reverse Image Search</CardTitle>
                    <CardDescription className="text-gray-300">
                      Upload a photo to find matching or similar images across social media and dating platforms
                    </CardDescription>
                  </CardHeader>
                </Card>

                <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
                  <CardHeader>
                    <Phone className="h-12 w-12 text-pink-400 mb-4" />
                    <CardTitle className="text-white">Phone Number Lookup</CardTitle>
                    <CardDescription className="text-gray-300">
                      Search for social media profiles and public records associated with phone numbers
                    </CardDescription>
                  </CardHeader>
                </Card>

                <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
                  <CardHeader>
                    <Users className="h-12 w-12 text-blue-400 mb-4" />
                    <CardTitle className="text-white">Profile Matching</CardTitle>
                    <CardDescription className="text-gray-300">
                      Compare images and data to identify potential matches across multiple platforms
                    </CardDescription>
                  </CardHeader>
                </Card>

                <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
                  <CardHeader>
                    <AlertTriangle className="h-12 w-12 text-yellow-400 mb-4" />
                    <CardTitle className="text-white">Comprehensive Reports</CardTitle>
                    <CardDescription className="text-gray-300">
                      Get detailed reports with all discovered information and potential matches
                    </CardDescription>
                  </CardHeader>
                </Card>

                <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
                  <CardHeader>
                    <Shield className="h-12 w-12 text-green-400 mb-4" />
                    <CardTitle className="text-white">Private & Secure</CardTitle>
                    <CardDescription className="text-gray-300">
                      All searches are conducted privately with no data stored permanently
                    </CardDescription>
                  </CardHeader>
                </Card>

                <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
                  <CardHeader>
                    <Zap className="h-12 w-12 text-orange-400 mb-4" />
                    <CardTitle className="text-white">Fast Results</CardTitle>
                    <CardDescription className="text-gray-300">
                      Get search results quickly with our optimized search algorithms
                    </CardDescription>
                  </CardHeader>
                </Card>
              </div>
            </div>
          </section>

          {/* Privacy & Security Section */}
          <section className="py-20 px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-4xl font-bold text-white text-center mb-12">
                Privacy & Security First
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                <div className="text-center">
                  <Lock className="h-16 w-16 text-green-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-white mb-2">Encrypted Searches</h3>
                  <p className="text-gray-300">All search data is encrypted and processed securely</p>
                </div>
                <div className="text-center">
                  <Globe className="h-16 w-16 text-blue-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-white mb-2">Online Service</h3>
                  <p className="text-gray-300">Fully online platform accessible from anywhere securely</p>
                </div>
                <div className="text-center">
                  <CheckCircle className="h-16 w-16 text-purple-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-white mb-2">Legal & Ethical</h3>
                  <p className="text-gray-300">All searches use publicly available information only</p>
                </div>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-20 px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-4xl font-bold text-white mb-6">
                Start Your Search Today
              </h2>
              <p className="text-xl text-gray-300 mb-8">
                Get the information you need with CatchFinder's comprehensive digital investigation tools - completely free to use.
              </p>
              <Button 
                size="lg"
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-12 py-6 text-xl"
                onClick={() => setActiveTab("search")}
              >
                Begin Investigation
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
