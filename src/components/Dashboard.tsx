
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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

const Dashboard = () => {
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  // Mock data for demonstration
  const searchResults = [
    {
      id: 1,
      platform: "Tinder",
      type: "dating",
      profileName: "Sarah M.",
      location: "New York, NY",
      lastActive: "2 days ago",
      matchScore: 98,
      imageUrl: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      verified: true,
      status: "active"
    },
    {
      id: 2,
      platform: "OnlyFans",
      type: "adult",
      profileName: "Sarah_NYC",
      location: "New York, NY",
      lastActive: "1 day ago",
      matchScore: 95,
      imageUrl: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      verified: false,
      status: "premium"
    },
    {
      id: 3,
      platform: "Instagram",
      type: "social",
      profileName: "@sarah.m.nyc",
      location: "New York, NY",
      lastActive: "3 hours ago",
      matchScore: 92,
      imageUrl: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      verified: true,
      status: "public"
    },
    {
      id: 4,
      platform: "Bumble",
      type: "dating",
      profileName: "Sarah",
      location: "Manhattan, NY",
      lastActive: "5 days ago",
      matchScore: 89,
      imageUrl: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      verified: true,
      status: "active"
    },
    {
      id: 5,
      platform: "Facebook",
      type: "social",
      profileName: "Sarah Martinez",
      location: "New York, NY",
      lastActive: "1 week ago",
      matchScore: 87,
      imageUrl: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      verified: true,
      status: "private"
    }
  ];

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "dating":
        return <Heart className="h-4 w-4" />;
      case "social":
        return <Users className="h-4 w-4" />;
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
      case "adult":
        return "bg-red-500/20 text-red-300 border-red-500/30";
      default:
        return "bg-gray-500/20 text-gray-300 border-gray-500/30";
    }
  };

  const filteredResults = searchResults.filter(result => {
    const matchesFilter = selectedFilter === "all" || result.type === selectedFilter;
    const matchesSearch = result.platform.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         result.profileName.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">Investigation Results</h1>
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5 text-green-400" />
                <span className="text-green-400 font-medium">Search Complete</span>
              </div>
              <div className="text-gray-300">
                Found <span className="text-white font-semibold">{searchResults.length}</span> matches across <span className="text-white font-semibold">8</span> platforms
              </div>
            </div>
            <Button className="bg-purple-600 hover:bg-purple-700">
              <Download className="mr-2 h-4 w-4" />
              Export Report
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-r from-pink-500/10 to-red-500/10 border-pink-500/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-pink-300 text-sm font-medium">Dating Platforms</p>
                  <p className="text-2xl font-bold text-white">2</p>
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
                  <p className="text-2xl font-bold text-white">2</p>
                </div>
                <Users className="h-8 w-8 text-blue-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-red-500/10 to-orange-500/10 border-red-500/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-red-300 text-sm font-medium">Adult Content</p>
                  <p className="text-2xl font-bold text-white">1</p>
                </div>
                <AlertTriangle className="h-8 w-8 text-red-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 border-green-500/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-300 text-sm font-medium">Match Score</p>
                  <p className="text-2xl font-bold text-white">94%</p>
                </div>
                <CheckCircle className="h-8 w-8 text-green-400" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Search */}
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
                    <SelectItem value="adult">Adult Content</SelectItem>
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

        {filteredResults.length === 0 && (
          <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
            <CardContent className="p-12 text-center">
              <AlertTriangle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">No Results Found</h3>
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
