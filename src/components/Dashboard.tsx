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
  Mail,
  Globe
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
      const { imageType, detectedObjects, confidence, humanValidation, backgroundRemoved } = searchResults.data;
      const resultCount = searchResults.data.searchResults?.length || 0;
      
      return (
        <div className="mb-6 space-y-4">
          <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
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
            <div className="mt-3 p-3 bg-green-500/10 border border-green-500/20 rounded">
              <div className="text-green-300 font-medium">
                🎯 Found {resultCount} dating profile{resultCount !== 1 ? 's' : ''} across African platforms
              </div>
            </div>
          </div>

          {humanValidation && (
            <div className={`p-4 rounded-lg border ${
              humanValidation.isHuman 
                ? 'bg-green-500/10 border-green-500/20' 
                : 'bg-red-500/10 border-red-500/20'
            }`}>
              <h3 className="text-white font-semibold mb-2">Human Validation</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-medium">Status:</span> 
                  <span className={humanValidation.isHuman ? 'text-green-300' : 'text-red-300'}>
                    {humanValidation.isHuman ? ' Human Detected' : ' No Human Detected'}
                  </span>
                </div>
                <div>
                  <span className="font-medium">Faces:</span> {humanValidation.faceCount}
                </div>
                <div>
                  <span className="font-medium">Confidence:</span> {Math.round(humanValidation.faceConfidence * 100)}%
                </div>
                <div>
                  <span className="font-medium">Body:</span> {humanValidation.bodyDetected ? 'Detected' : 'Not Detected'}
                </div>
              </div>
              <p className="text-sm mt-2 text-gray-300">{humanValidation.validationMessage}</p>
            </div>
          )}

          {backgroundRemoved && (
            <div className="p-4 bg-purple-500/10 border border-purple-500/20 rounded-lg">
              <h3 className="text-white font-semibold mb-2">Background Processing</h3>
              <p className="text-purple-200 text-sm mb-3">Background removed for enhanced analysis</p>
              <div className="flex space-x-4">
                <div className="text-center">
                  <p className="text-xs text-purple-300 mb-1">Original</p>
                  <img
                    src={searchResults.data.uploadedImage || ''}
                    alt="Original"
                    className="w-20 h-20 rounded object-cover border border-purple-500/30"
                  />
                </div>
                <div className="text-center">
                  <p className="text-xs text-purple-300 mb-1">Processed</p>
                  <img
                    src={backgroundRemoved}
                    alt="Background removed"
                    className="w-20 h-20 rounded object-cover border border-purple-500/30"
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      );
    }

    if (searchType === 'phone' && searchResults.data) {
      const { phoneNumber, carrier, region } = searchResults.data;
      const resultCount = searchResults.data.searchResults?.length || 0;
      
      return (
        <div className="mb-6 p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
          <h3 className="text-white font-semibold mb-2">Phone Analysis Results</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-blue-200">
            <div>
              <span className="font-medium">Phone:</span> {phoneNumber}
            </div>
            <div>
              <span className="font-medium">Carrier:</span> {carrier}
            </div>
            <div>
              <span className="font-medium">Region:</span> {region}
            </div>
          </div>
          <div className="mt-3 p-3 bg-green-500/10 border border-green-500/20 rounded">
            <div className="text-green-300 font-medium">
              🎯 Found {resultCount} dating profile{resultCount !== 1 ? 's' : ''} associated with this phone
            </div>
          </div>
        </div>
      );
    }

    return null;
  };

  return (
    <div className="min-h-screen py-8 md:py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8 md:mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">Search Results</h1>
          <p className="text-lg md:text-xl text-gray-300">
            {searchType === 'photo' ? 'Dating profiles found from image search' : 'Dating profiles found from phone search'}
          </p>
        </div>

        {/* Search Info */}
        {renderSearchInfo()}

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
          <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
            <CardContent className="p-4 md:p-6">
              <div className="flex items-center space-x-3">
                <Heart className="h-8 w-8 text-pink-400" />
                <div>
                  <p className="text-2xl md:text-3xl font-bold text-white">{stats.dating}</p>
                  <p className="text-sm md:text-base text-gray-300">Dating Profiles</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
            <CardContent className="p-4 md:p-6">
              <div className="flex items-center space-x-3">
                <Users className="h-8 w-8 text-blue-400" />
                <div>
                  <p className="text-2xl md:text-3xl font-bold text-white">{stats.social}</p>
                  <p className="text-sm md:text-base text-gray-300">Social Profiles</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
            <CardContent className="p-4 md:p-6">
              <div className="flex items-center space-x-3">
                <Camera className="h-8 w-8 text-green-400" />
                <div>
                  <p className="text-2xl md:text-3xl font-bold text-white">{stats.professional}</p>
                  <p className="text-sm md:text-base text-gray-300">Professional</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
            <CardContent className="p-4 md:p-6">
              <div className="flex items-center space-x-3">
                <AlertTriangle className="h-8 w-8 text-orange-400" />
                <div>
                  <p className="text-2xl md:text-3xl font-bold text-white">{avgMatchScore}%</p>
                  <p className="text-sm md:text-base text-gray-300">Avg Match</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1">
            <Input
              placeholder="Search profiles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
            />
          </div>
          <Select value={selectedFilter} onValueChange={setSelectedFilter}>
            <SelectTrigger className="w-full md:w-48 bg-white/10 border-white/20 text-white">
              <SelectValue placeholder="Filter by type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="dating">Dating</SelectItem>
              <SelectItem value="social">Social</SelectItem>
              <SelectItem value="professional">Professional</SelectItem>
              <SelectItem value="adult">Adult</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Results */}
        <div className="space-y-4 md:space-y-6">
          {filteredResults.map((result) => (
            <Card key={result.id} className="bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition-colors">
              <CardContent className="p-4 md:p-6">
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                  <div className="flex items-start space-x-4 flex-1">
                    <div className="relative">
                      <img
                        src={result.imageUrl}
                        alt={result.profileName}
                        className="w-16 h-16 md:w-20 md:h-20 rounded-full object-cover"
                      />
                      {result.verified && (
                        <CheckCircle className="absolute -bottom-1 -right-1 h-5 w-5 text-green-400 bg-slate-900 rounded-full" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col md:flex-row md:items-center gap-2 mb-2">
                        <h3 className="text-lg md:text-xl font-semibold text-white truncate">{result.profileName}</h3>
                        <Badge className={`w-fit ${getTypeColor(result.type)}`}>
                          {getTypeIcon(result.type)}
                          <span className="ml-1">{result.type}</span>
                        </Badge>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 md:gap-4 text-sm">
                        <div className="flex items-center space-x-2">
                          <Globe className="h-4 w-4 text-gray-400" />
                          <span className="text-gray-300">{result.platform}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <MapPin className="h-4 w-4 text-gray-400" />
                          <span className="text-gray-300">{result.location}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Calendar className="h-4 w-4 text-gray-400" />
                          <span className="text-gray-300">{result.lastActive}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Heart className="h-4 w-4 text-gray-400" />
                          <span className="text-gray-300">{result.matchScore}% match</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col md:flex-row gap-2">
                    <Button size="sm" variant="outline" className="border-white/20 text-white hover:bg-white/10">
                      <Eye className="h-4 w-4 mr-2" />
                      View
                    </Button>
                    <Button size="sm" variant="outline" className="border-white/20 text-white hover:bg-white/10">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Open
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}

          {filteredResults.length === 0 && displayResults.length === 0 && (
            <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
              <CardContent className="p-8 md:p-12 text-center">
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
              <CardContent className="p-8 md:p-12 text-center">
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
    </div>
  );
};

export default Dashboard;
