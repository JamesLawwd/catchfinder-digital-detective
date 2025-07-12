import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Heart, 
  Users, 
  Camera, 
  AlertTriangle, 
  CheckCircle, 
  ExternalLink, 
  Filter,
  Download,
  Eye,
  Calendar,
  MapPin,
  Phone,
  Mail
} from "lucide-react";

interface DashboardProps {
  searchResults?: any;
  searchType?: 'photo' | 'phone';
}

const Dashboard = ({ searchResults, searchType }: DashboardProps) => {
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [displayResults, setDisplayResults] = useState<any[]>([]);

  useEffect(() => {
    if (searchResults?.success && searchResults.data?.searchResults) {
      setDisplayResults(searchResults.data.searchResults);
    } else {
      setDisplayResults([]);
    }
  }, [searchResults]);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "dating":
        return <Heart className="h-4 w-4" />;
      case "social":
        return <Users className="h-4 w-4" />;
      case "professional":
        return <Camera className="h-4 w-4" />;
      case "adult":
        return <Camera className="h-4 w-4" />;
      default:
        return <Users className="h-4 w-4" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "dating":
        return "bg-pink-500/20 text-pink-300 border-pink-500/30";
      case "social":
        return "bg-blue-500/20 text-blue-300 border-blue-500/30";
      case "professional":
        return "bg-green-500/20 text-green-300 border-green-500/30";
      case "adult":
        return "bg-red-500/20 text-red-300 border-red-500/30";
      default:
        return "bg-gray-500/20 text-gray-300 border-gray-500/30";
    }
  };

  const filteredResults = displayResults.filter(result => {
    const matchesFilter = selectedFilter === "all" || result.type === selectedFilter;
    const matchesSearch = result.platform.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         result.profileName.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const getSearchTypeStats = () => {
    if (!searchResults?.success) return { dating: 0, social: 0, professional: 0, adult: 0 };
    
    const stats = { dating: 0, social: 0, professional: 0, adult: 0 };
    displayResults.forEach(result => {
      if (stats.hasOwnProperty(result.type)) {
        (stats as any)[result.type]++;
      }
    });
    return stats;
  };

  const stats = getSearchTypeStats();
  const avgMatchScore = displayResults.length > 0 
    ? Math.round(displayResults.reduce((sum, result) => sum + result.matchScore, 0) / displayResults.length)
    : 0;

  const renderSearchInfo = () => {
    if (!searchResults?.success) return null;

    if (searchType === 'photo' && searchResults.data) {
      const { imageType, detectedObjects, confidence } = searchResults.data;
      return (
        <div className="mb-6 p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
          <h3 className="text-white font-semibold mb-2">Image Analysis Results</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-blue-200">
            <div>
              <span className="font-medium">Image Type:</span> {imageType}
            </div>
            <div>
              <span className="font-medium">Confidence:</span> {Math.round(confidence * 100)}%
            </div>
            <div>
              <span className="font-medium">Detected:</span> {detectedObjects.join(', ')}
            </div>
          </div>
        </div>
      );
    }

    if (searchType === 'phone' && searchResults.data) {
      const { phoneNumber, carrier, region } = searchResults.data;
      return (
        <div className="mb-6 p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
          <h3 className="text-white font-semibold mb-2">Phone Analysis Results</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-green-200">
            <div>
              <span className="font-medium">Number:</span> {phoneNumber}
            </div>
            <div>
              <span className="font-medium">Carrier:</span> {carrier}
            </div>
            <div>
              <span className="font-medium">Region:</span> {region}
            </div>
          </div>
        </div>
      );
    }

    return null;
  };

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">Investigation Results</h1>
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center space-x-6">
              {displayResults.length > 0 ? (
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-green-400" />
                  <span className="text-green-400 font-medium">Search Complete</span>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <AlertTriangle className="h-5 w-5 text-yellow-400" />
                  <span className="text-yellow-400 font-medium">No Results Found</span>
                </div>
              )}
              <div className="text-gray-300">
                Found <span className="text-white font-semibold">{displayResults.length}</span> matches
              </div>
            </div>
            {displayResults.length > 0 && (
              <Button className="bg-purple-600 hover:bg-purple-700">
                <Download className="mr-2 h-4 w-4" />
                Export Report
              </Button>
            )}
          </div>
        </div>

        {renderSearchInfo()}

        {/* Stats Cards */}
        {displayResults.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card className="bg-gradient-to-r from-pink-500/10 to-red-500/10 border-pink-500/20">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-pink-300 text-sm font-medium">Dating Platforms</p>
                    <p className="text-2xl font-bold text-white">{stats.dating}</p>
                  </div>
                  <Heart className="h-8 w-8 text-pink-400" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border-blue-500/20">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-blue-300 text-sm font-medium">Social Media</p>
                    <p className="text-2xl font-bold text-white">{stats.social}</p>
                  </div>
                  <Users className="h-8 w-8 text-blue-400" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 border-green-500/20">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-green-300 text-sm font-medium">Professional</p>
                    <p className="text-2xl font-bold text-white">{stats.professional}</p>
                  </div>
                  <Camera className="h-8 w-8 text-green-400" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-purple-500/10 to-violet-500/10 border-purple-500/20">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-purple-300 text-sm font-medium">Avg Match Score</p>
                    <p className="text-2xl font-bold text-white">{avgMatchScore}%</p>
                  </div>
                  <CheckCircle className="h-8 w-8 text-purple-400" />
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Filters and Search */}
        {displayResults.length > 0 && (
          <Card className="bg-white/5 border-white/10 backdrop-blur-sm mb-8">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                <div className="flex items-center space-x-4 flex-1">
                  <Filter className="h-5 w-5 text-gray-400" />
                  <Select value={selectedFilter} onValueChange={setSelectedFilter}>
                    <SelectTrigger className="w-48 bg-white/10 border-white/20 text-white">
                      <SelectValue placeholder="Filter by type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Platforms</SelectItem>
                      <SelectItem value="dating">Dating Apps</SelectItem>
                      <SelectItem value="social">Social Media</SelectItem>
                      <SelectItem value="professional">Professional</SelectItem>
                    </SelectContent>
                  </Select>
                  <Input
                    placeholder="Search results..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="max-w-sm bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Results */}
        <div className="space-y-6">
          {filteredResults.map((result) => (
            <Card key={result.id} className="bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition-colors">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4 flex-1">
                    <div className="relative">
                      <img
                        src={result.imageUrl}
                        alt={result.profileName}
                        className="w-16 h-16 rounded-full object-cover"
                      />
                      {result.verified && (
                        <CheckCircle className="absolute -bottom-1 -right-1 h-5 w-5 text-green-400 bg-slate-900 rounded-full" />
                      )}
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-lg font-semibold text-white">{result.profileName}</h3>
                        <Badge className={getTypeColor(result.type)}>
                          {getTypeIcon(result.type)}
                          <span className="ml-1 capitalize">{result.type}</span>
                        </Badge>
                        <Badge variant="outline" className="text-purple-300 border-purple-400">
                          {result.matchScore}% Match
                        </Badge>
                      </div>
                      
                      <div className="flex items-center space-x-4 text-sm text-gray-300 mb-3">
                        <div className="flex items-center space-x-1">
                          <span className="font-semibold text-purple-400">{result.platform}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <MapPin className="h-4 w-4" />
                          <span>{result.location}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Calendar className="h-4 w-4" />
                          <span>Active {result.lastActive}</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                          <Eye className="mr-2 h-4 w-4" />
                          View Profile
                        </Button>
                        <Button size="sm" variant="outline" className="border-white/20 text-white hover:bg-white/10">
                          <ExternalLink className="mr-2 h-4 w-4" />
                          Open Platform
                        </Button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                      result.status === 'active' ? 'bg-green-500/20 text-green-300' :
                      result.status === 'premium' ? 'bg-purple-500/20 text-purple-300' :
                      result.status === 'private' ? 'bg-yellow-500/20 text-yellow-300' :
                      'bg-gray-500/20 text-gray-300'
                    }`}>
                      {result.status.toUpperCase()}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredResults.length === 0 && displayResults.length === 0 && (
          <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
            <CardContent className="p-12 text-center">
              <AlertTriangle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">No Results Found</h3>
              <p className="text-gray-300">
                {searchType === 'photo' 
                  ? "No human faces detected in the uploaded image, or no matching profiles found."
                  : "No profiles found associated with this phone number."
                }
              </p>
            </CardContent>
          </Card>
        )}

        {filteredResults.length === 0 && displayResults.length > 0 && (
          <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
            <CardContent className="p-12 text-center">
              <AlertTriangle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">No Matching Results</h3>
              <p className="text-gray-300">
                No matches found for your current search criteria. Try adjusting your filters.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
