import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Search, Camera, Phone, Eye, AlertTriangle, CheckCircle, Users, Zap, Lock, Globe, Mail } from "lucide-react";
import SearchInterface from "@/components/SearchInterface";
import Dashboard from "@/components/Dashboard";
import { toast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const [activeTab, setActiveTab] = useState("home");
  const [isSearching, setIsSearching] = useState(false);
  const [profilesScanned, setProfilesScanned] = useState(0);
  const [searchResults, setSearchResults] = useState<any>(null);
  const [searchType, setSearchType] = useState<'photo' | 'phone'>('photo');
  const [searchProgress, setSearchProgress] = useState<string>('');
  const navigate = useNavigate();

  const handleSearch = async (type: "photo" | "phone", data: any) => {
    setIsSearching(true);
    setSearchType(type);
    setSearchProgress('Initializing search...');
    
    toast({
      title: "Search Initiated",
      description: `Starting ${type === 'photo' ? 'image analysis' : 'phone lookup'}...`,
    });
    
    // Simulate processing time with progress updates
    const progressSteps = [
      'Analyzing image content...',
      'Detecting human faces...',
      'Searching dating platforms...',
      'Finding matching profiles...',
      'Compiling results...'
    ];
    
    let stepIndex = 0;
    const progressInterval = setInterval(() => {
      if (stepIndex < progressSteps.length) {
        setSearchProgress(progressSteps[stepIndex]);
        stepIndex++;
      }
    }, 400);
    
    setTimeout(() => {
      clearInterval(progressInterval);
      setIsSearching(false);
      setSearchProgress('');
      setSearchResults(data);
      setActiveTab("results");
      
      if (data?.success) {
        // Check for human validation in photo searches
        if (type === 'photo' && data.data?.humanValidation) {
          const { isHuman, validationMessage } = data.data.humanValidation;
          
          if (!isHuman) {
            toast({
              title: "Human Detection Failed",
              description: validationMessage,
              variant: "destructive",
            });
            return;
          }
        }
        
        // Count actual dating profiles found
        const resultCount = data?.data?.searchResults?.length || 0;
        
        if (resultCount > 0) {
          // Update the profiles scanned count with actual results
          setProfilesScanned(prev => prev + resultCount);
          
          toast({
            title: "Search Complete",
            description: `Found ${resultCount} dating profile${resultCount > 1 ? 's' : ''} - Total: ${(profilesScanned + resultCount).toLocaleString()}`,
          });
        } else {
          toast({
            title: "Search Complete",
            description: "No dating profiles found for your search",
          });
        }
      } else {
        toast({
          title: "Search Failed",
          description: data?.error || "Unable to complete search",
          variant: "destructive",
        });
      }
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Navigation */}
      <nav className="bg-black/20 backdrop-blur-sm border-b border-white/10 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2 cursor-pointer" onClick={() => navigate('/')}>
              <Shield className="h-8 w-8 text-purple-400" />
              <span className="text-xl md:text-2xl font-bold text-white">PersonaTrace</span>
            </div>
            <div className="hidden md:flex items-center space-x-4">
              <Button 
                variant="ghost" 
                className="text-white hover:text-purple-300 hover:bg-white/10"
                onClick={() => navigate('/about')}
              >
                About
              </Button>
              <Button 
                variant="ghost" 
                className="text-white hover:text-purple-300 hover:bg-white/10"
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
            {/* Mobile menu button */}
            <div className="md:hidden">
              <Button 
                variant="ghost" 
                className="text-white"
                onClick={() => setActiveTab("search")}
              >
                Search
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
          <section className="relative py-12 md:py-20 px-4">
            <div className="max-w-6xl mx-auto text-center">
              <div className="mb-8">
                <Badge className="bg-purple-500/20 text-purple-300 border-purple-500/30 mb-4">
                  PersonaTrace - Advanced Dating Profile Search
                </Badge>
                <h1 className="text-3xl md:text-5xl lg:text-7xl font-bold text-white mb-6 leading-tight">
                  Find Dating Profiles
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                    {" "}Across Africa
                  </span>
                </h1>
                <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-3xl mx-auto px-4">
                  Search for dating profiles across Kenya, Nigeria, South Africa, and other African countries. 
                  Find matches on Tinder, Bumble, Hinge, and other popular dating platforms.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12 px-4">
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-6 md:px-8 py-4 md:py-6 text-base md:text-lg"
                  onClick={() => setActiveTab("search")}
                >
                  <Search className="mr-2 h-4 w-4 md:h-5 md:w-5" />
                  Start Investigation
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-white/20 text-white hover:bg-white/10 px-6 md:px-8 py-4 md:py-6 text-base md:text-lg"
                  onClick={() => setActiveTab("search")}
                >
                  <Eye className="mr-2 h-4 w-4 md:h-5 md:w-5" />
                  Try Demo
                </Button>
              </div>

              {/* Live Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-16 px-4">
                <div className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-purple-400 mb-2">
                    {profilesScanned.toLocaleString()}
                    {isSearching && (
                      <span className="text-sm text-yellow-400 ml-2 animate-pulse">
                        🔍
                      </span>
                    )}
                  </div>
                  <div className="text-gray-300 text-sm md:text-base">Dating Profiles Found</div>
                  {profilesScanned > 0 && (
                    <div className="text-xs text-green-400 mt-1">
                      ✓ Updated in real-time
                    </div>
                  )}
                  {isSearching && (
                    <div className="text-xs text-yellow-400 mt-1 animate-pulse">
                      Searching...
                    </div>
                  )}
                </div>
                <div className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-pink-400 mb-2">15+</div>
                  <div className="text-gray-300 text-sm md:text-base">Dating Platforms</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-blue-400 mb-2">20+</div>
                  <div className="text-gray-300 text-sm md:text-base">African Countries</div>
                </div>
              </div>
            </div>
          </section>

          {/* Features Section */}
          <section className="py-12 md:py-20 px-4 bg-black/20">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-8 md:mb-12">
                Dating Profile Search Tools
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                <Card className="bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition-colors">
                  <CardHeader className="text-center">
                    <Camera className="h-10 w-10 md:h-12 md:w-12 text-purple-400 mx-auto mb-4" />
                    <CardTitle className="text-white text-lg md:text-xl">Photo Search</CardTitle>
                    <CardDescription className="text-gray-300 text-sm md:text-base">
                      Upload a photo to find matching dating profiles across African dating platforms
                    </CardDescription>
                  </CardHeader>
                </Card>

                <Card className="bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition-colors">
                  <CardHeader className="text-center">
                    <Phone className="h-10 w-10 md:h-12 md:w-12 text-pink-400 mx-auto mb-4" />
                    <CardTitle className="text-white text-lg md:text-xl">Phone Lookup</CardTitle>
                    <CardDescription className="text-gray-300 text-sm md:text-base">
                      Search for dating profiles associated with phone numbers in Africa
                    </CardDescription>
                  </CardHeader>
                </Card>

                <Card className="bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition-colors">
                  <CardHeader className="text-center">
                    <Users className="h-10 w-10 md:h-12 md:w-12 text-blue-400 mx-auto mb-4" />
                    <CardTitle className="text-white text-lg md:text-xl">Profile Matching</CardTitle>
                    <CardDescription className="text-gray-300 text-sm md:text-base">
                      Find dating profiles across Tinder, Bumble, Hinge, and other platforms
                    </CardDescription>
                  </CardHeader>
                </Card>

                <Card className="bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition-colors">
                  <CardHeader className="text-center">
                    <AlertTriangle className="h-10 w-10 md:h-12 md:w-12 text-yellow-400 mx-auto mb-4" />
                    <CardTitle className="text-white text-lg md:text-xl">African Focus</CardTitle>
                    <CardDescription className="text-gray-300 text-sm md:text-base">
                      Specialized search across 20+ African countries including Kenya, Nigeria, and South Africa
                    </CardDescription>
                  </CardHeader>
                </Card>

                <Card className="bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition-colors">
                  <CardHeader className="text-center">
                    <Shield className="h-10 w-10 md:h-12 md:w-12 text-green-400 mx-auto mb-4" />
                    <CardTitle className="text-white text-lg md:text-xl">Private & Secure</CardTitle>
                    <CardDescription className="text-gray-300 text-sm md:text-base">
                      All searches are conducted privately with no data stored permanently
                    </CardDescription>
                  </CardHeader>
                </Card>

                <Card className="bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition-colors">
                  <CardHeader className="text-center">
                    <Zap className="h-10 w-10 md:h-12 md:w-12 text-orange-400 mx-auto mb-4" />
                    <CardTitle className="text-white text-lg md:text-xl">Fast Results</CardTitle>
                    <CardDescription className="text-gray-300 text-sm md:text-base">
                      Get instant results from major dating platforms across Africa
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
          <SearchInterface 
            onSearch={handleSearch} 
            isSearching={isSearching}
            searchProgress={searchProgress}
          />
        </TabsContent>

        <TabsContent value="results" className="mt-0">
          <Dashboard searchResults={searchResults} searchType={searchType} />
        </TabsContent>
      </Tabs>

      {/* Footer */}
      <footer className="bg-black/20 backdrop-blur-sm border-t border-white/10 mt-20">
        <div className="max-w-6xl mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Shield className="h-8 w-8 text-purple-400" />
                <span className="text-2xl font-bold text-white">PersonaTrace</span>
              </div>
              <p className="text-gray-300 mb-4">
                Advanced dating profile search across African countries. Find profiles on Tinder, Bumble, Hinge and more.
              </p>
              <div className="flex items-center space-x-2 text-sm text-gray-400">
                <Mail className="h-4 w-4" />
                <span>jleo5621@gmail.com</span>
              </div>
            </div>
            
            <div>
              <h3 className="text-white font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <Button 
                    variant="ghost" 
                    className="text-gray-300 hover:text-white p-0 h-auto"
                    onClick={() => setActiveTab("search")}
                  >
                    Start Search
                  </Button>
                </li>
                <li>
                  <Button 
                    variant="ghost" 
                    className="text-gray-300 hover:text-white p-0 h-auto"
                    onClick={() => navigate('/about')}
                  >
                    About Us
                  </Button>
                </li>
                <li>
                  <Button 
                    variant="ghost" 
                    className="text-gray-300 hover:text-white p-0 h-auto"
                    onClick={() => navigate('/contact')}
                  >
                    Contact Support
                  </Button>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-white font-semibold mb-4">Features</h3>
              <ul className="space-y-2 text-gray-300 text-sm">
                <li>• Human Photo Validation</li>
                <li>• Background Removal</li>
                <li>• African Dating Focus</li>
                <li>• 15+ Dating Platforms</li>
                <li>• Real-time Results</li>
                <li>• Privacy Protected</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-white/10 mt-8 pt-8 text-center">
            <p className="text-gray-400 text-sm">
              © 2024 PersonaTrace. All rights reserved. | Email Support: jleo5621@gmail.com
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
