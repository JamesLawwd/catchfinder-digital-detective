
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Upload, Phone, Camera, Search, Loader2, Shield, AlertCircle } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface SearchInterfaceProps {
  onSearch: (type: "photo" | "phone", data: string) => void;
  isSearching: boolean;
}

const SearchInterface = ({ onSearch, isSearching }: SearchInterfaceProps) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: "Please upload an image smaller than 10MB",
          variant: "destructive",
        });
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePhoneSearch = () => {
    if (!phoneNumber.trim()) {
      toast({
        title: "Phone number required",
        description: "Please enter a valid phone number",
        variant: "destructive",
      });
      return;
    }
    onSearch("phone", phoneNumber);
  };

  const handleImageSearch = () => {
    if (!uploadedImage) {
      toast({
        title: "Image required",
        description: "Please upload an image to search",
        variant: "destructive",
      });
      return;
    }
    onSearch("photo", uploadedImage);
  };

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">Start Your Investigation</h1>
          <p className="text-xl text-gray-300">
            Upload a photo or enter a phone number to begin your search
          </p>
        </div>

        <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Shield className="mr-2 h-6 w-6 text-purple-400" />
              Secure Investigation Portal
            </CardTitle>
            <CardDescription className="text-gray-300">
              All searches are encrypted and completely confidential
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="photo" className="w-full">
              <TabsList className="grid w-full grid-cols-2 bg-white/10">
                <TabsTrigger value="photo" className="text-white data-[state=active]:bg-purple-600">
                  <Camera className="mr-2 h-4 w-4" />
                  Photo Search
                </TabsTrigger>
                <TabsTrigger value="phone" className="text-white data-[state=active]:bg-purple-600">
                  <Phone className="mr-2 h-4 w-4" />
                  Phone Lookup
                </TabsTrigger>
              </TabsList>

              <TabsContent value="photo" className="space-y-6 mt-6">
                <div className="space-y-4">
                  <Label className="text-white text-lg">Upload Photo</Label>
                  <div className="space-y-4">
                    <div 
                      className="border-2 border-dashed border-white/20 rounded-lg p-12 text-center hover:border-purple-400 transition-colors cursor-pointer"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      {uploadedImage ? (
                        <div className="space-y-4">
                          <img
                            src={uploadedImage}
                            alt="Uploaded"
                            className="max-w-xs max-h-48 mx-auto rounded-lg object-cover"
                          />
                          <p className="text-green-400">Image uploaded successfully</p>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          <Upload className="h-12 w-12 text-purple-400 mx-auto" />
                          <div>
                            <p className="text-white text-lg">Drop your image here or click to browse</p>
                            <p className="text-gray-400 text-sm">Supports JPG, PNG, GIF up to 10MB</p>
                          </div>
                        </div>
                      )}
                    </div>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </div>
                  
                  <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4">
                    <div className="flex items-start space-x-3">
                      <AlertCircle className="h-5 w-5 text-yellow-400 mt-0.5" />
                      <div className="text-sm text-yellow-200">
                        <p className="font-medium">Privacy Notice</p>
                        <p>Your uploaded image is processed securely and deleted after the search is complete.</p>
                      </div>
                    </div>
                  </div>

                  <Button 
                    onClick={handleImageSearch}
                    disabled={isSearching || !uploadedImage}
                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-6 text-lg"
                  >
                    {isSearching ? (
                      <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        Scanning Platforms...
                      </>
                    ) : (
                      <>
                        <Search className="mr-2 h-5 w-5" />
                        Search by Image
                      </>
                    )}
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="phone" className="space-y-6 mt-6">
                <div className="space-y-4">
                  <Label className="text-white text-lg">Phone Number</Label>
                  <Input
                    type="tel"
                    placeholder="+1 (555) 123-4567"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 h-12 text-lg"
                  />
                  
                  <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
                    <div className="flex items-start space-x-3">
                      <AlertCircle className="h-5 w-5 text-blue-400 mt-0.5" />
                      <div className="text-sm text-blue-200">
                        <p className="font-medium">Search Scope</p>
                        <p>We'll search across dating apps, social media, and public records linked to this number.</p>
                      </div>
                    </div>
                  </div>

                  <Button 
                    onClick={handlePhoneSearch}
                    disabled={isSearching || !phoneNumber.trim()}
                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-6 text-lg"
                  >
                    {isSearching ? (
                      <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        Searching Databases...
                      </>
                    ) : (
                      <>
                        <Search className="mr-2 h-5 w-5" />
                        Search by Phone
                      </>
                    )}
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
            <CardContent className="p-6 text-center">
              <Shield className="h-10 w-10 text-green-400 mx-auto mb-4" />
              <h3 className="text-white font-semibold mb-2">100% Secure</h3>
              <p className="text-gray-300 text-sm">End-to-end encryption for all searches</p>
            </CardContent>
          </Card>
          
          <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
            <CardContent className="p-6 text-center">
              <Search className="h-10 w-10 text-purple-400 mx-auto mb-4" />
              <h3 className="text-white font-semibold mb-2">Deep Search</h3>
              <p className="text-gray-300 text-sm">50+ platforms and databases</p>
            </CardContent>
          </Card>
          
          <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
            <CardContent className="p-6 text-center">
              <AlertCircle className="h-10 w-10 text-yellow-400 mx-auto mb-4" />
              <h3 className="text-white font-semibold mb-2">Instant Results</h3>
              <p className="text-gray-300 text-sm">Results in under 60 seconds</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SearchInterface;
