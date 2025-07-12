
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Upload, Phone, Camera, Search, Loader2, Shield, AlertCircle, CheckCircle, XCircle, User, Image as ImageIcon } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { ImageAnalysisService } from "@/services/ImageAnalysisService";
import { PhoneSearchService } from "@/services/PhoneSearchService";

interface SearchInterfaceProps {
  onSearch: (type: "photo" | "phone", data: any) => void;
  isSearching: boolean;
  searchProgress?: string;
}

const SearchInterface = ({ onSearch, isSearching, searchProgress }: SearchInterfaceProps) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [localSearchProgress, setLocalSearchProgress] = useState("");
  const [validationResult, setValidationResult] = useState<{
    isHuman: boolean;
    faceCount: number;
    faceConfidence: number;
    bodyDetected: boolean;
    validationMessage: string;
  } | null>(null);
  const [backgroundRemoved, setBackgroundRemoved] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Use the searchProgress prop if provided, otherwise use local state
  const currentProgress = searchProgress || localSearchProgress;

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
        setValidationResult(null);
        setBackgroundRemoved(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePhoneSearch = async () => {
    if (!phoneNumber.trim()) {
      toast({
        title: "Phone number required",
        description: "Please enter a valid phone number",
        variant: "destructive",
      });
      return;
    }

    setLocalSearchProgress("Analyzing phone number...");
    
    try {
      const result = await PhoneSearchService.performPhoneSearch(phoneNumber);
      onSearch("phone", result);
    } catch (error) {
      console.error('Phone search error:', error);
      toast({
        title: "Search failed",
        description: "Unable to complete phone search. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleImageSearch = async () => {
    if (!uploadedImage) {
      toast({
        title: "Image required",
        description: "Please upload an image to search",
        variant: "destructive",
      });
      return;
    }

    setLocalSearchProgress("Analyzing image content...");
    
    try {
      const result = await ImageAnalysisService.performImageSearch(uploadedImage);
      
      if (result.success && result.data) {
        setValidationResult(result.data.humanValidation);
        setBackgroundRemoved(result.data.backgroundRemoved || null);
        
        // Check if human validation failed
        if (!result.data.humanValidation.isHuman) {
          toast({
            title: "Human Detection Failed",
            description: result.data.humanValidation.validationMessage,
            variant: "destructive",
          });
          setLocalSearchProgress("");
          return;
        }
        
        onSearch("photo", result);
      } else {
        toast({
          title: "Analysis Failed",
          description: result.error || "Unable to analyze image",
          variant: "destructive",
        });
        setLocalSearchProgress("");
      }
    } catch (error) {
      console.error('Image search error:', error);
      toast({
        title: "Search failed",
        description: "Unable to analyze image. Please try again.",
        variant: "destructive",
      });
      setLocalSearchProgress("");
    }
  };

  const renderValidationStatus = () => {
    if (!validationResult) return null;

    const { isHuman, faceCount, faceConfidence, bodyDetected, validationMessage } = validationResult;

    return (
      <div className={`p-4 rounded-lg border ${
        isHuman 
          ? 'bg-green-500/10 border-green-500/20' 
          : 'bg-red-500/10 border-red-500/20'
      }`}>
        <div className="flex items-start space-x-3">
          {isHuman ? (
            <CheckCircle className="h-5 w-5 text-green-400 mt-0.5" />
          ) : (
            <XCircle className="h-5 w-5 text-red-400 mt-0.5" />
          )}
          <div className="text-sm">
            <p className={`font-medium ${isHuman ? 'text-green-200' : 'text-red-200'}`}>
              {isHuman ? 'Human Detected' : 'No Human Detected'}
            </p>
            <p className={isHuman ? 'text-green-300' : 'text-red-300'}>
              {validationMessage}
            </p>
            {isHuman && (
              <div className="mt-2 space-y-1 text-xs text-green-300">
                <p>• Faces detected: {faceCount}</p>
                <p>• Confidence: {Math.round(faceConfidence * 100)}%</p>
                <p>• Body detected: {bodyDetected ? 'Yes' : 'No'}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  const renderBackgroundRemoval = () => {
    if (!backgroundRemoved) return null;

    return (
      <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
        <div className="flex items-start space-x-3">
          <ImageIcon className="h-5 w-5 text-blue-400 mt-0.5" />
          <div className="text-sm">
            <p className="font-medium text-blue-200">Background Removed</p>
            <p className="text-blue-300">Image processed for better analysis</p>
            <div className="mt-3">
              <img
                src={backgroundRemoved}
                alt="Background removed"
                className="max-w-xs max-h-32 rounded-lg object-cover border border-blue-500/30"
              />
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen py-8 md:py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8 md:mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">Start Your Investigation</h1>
          <p className="text-lg md:text-xl text-gray-300">
            Upload a photo or enter a phone number to begin your search
          </p>
        </div>

        <Tabs defaultValue="photo" className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-white/10 backdrop-blur-sm mb-6">
            <TabsTrigger value="photo" className="text-white data-[state=active]:bg-purple-600 text-sm md:text-base">
              <Camera className="h-4 w-4 mr-2" />
              Photo Search
            </TabsTrigger>
            <TabsTrigger value="phone" className="text-white data-[state=active]:bg-pink-600 text-sm md:text-base">
              <Phone className="h-4 w-4 mr-2" />
              Phone Search
            </TabsTrigger>
          </TabsList>

          <TabsContent value="phone" className="space-y-6">
            <div className="space-y-4">
              <Label className="text-white text-base md:text-lg">Enter Phone Number</Label>
              <Input
                type="tel"
                placeholder="+1 (555) 123-4567"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 h-12 md:h-14 text-base md:text-lg"
              />
              
              <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <Shield className="h-5 w-5 text-blue-400 mt-0.5 flex-shrink-0" />
                  <div className="text-sm text-blue-200">
                    <p className="font-medium">Privacy Protected</p>
                    <p>Your phone number is processed securely and not stored.</p>
                  </div>
                </div>
              </div>

              <Button 
                onClick={handlePhoneSearch}
                disabled={isSearching || !phoneNumber.trim()}
                className="w-full bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white py-4 md:py-6 text-base md:text-lg"
              >
                {isSearching ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 md:h-5 md:w-5 animate-spin" />
                    {currentProgress || "Searching..."}
                  </>
                ) : (
                  <>
                    <Search className="mr-2 h-4 w-4 md:h-5 md:w-5" />
                    Search by Phone
                  </>
                )}
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="photo" className="space-y-6">
            <div className="space-y-4">
              <Label className="text-white text-base md:text-lg">Upload Photo</Label>
              <div className="space-y-4">
                <div 
                  className="border-2 border-dashed border-white/20 rounded-lg p-8 md:p-12 text-center hover:border-purple-400 transition-colors cursor-pointer"
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
                        <p className="text-white text-lg md:text-xl">Drop your image here or click to browse</p>
                        <p className="text-gray-400 text-sm md:text-base">Supports JPG, PNG, GIF up to 10MB</p>
                        <p className="text-yellow-400 text-sm md:text-base mt-2">⚠️ Only human photos are accepted</p>
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
              
              {renderValidationStatus()}
              {renderBackgroundRemoval()}
              
              <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <AlertCircle className="h-5 w-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                  <div className="text-sm text-yellow-200">
                    <p className="font-medium">Privacy Notice</p>
                    <p>Your uploaded image is processed securely and deleted after the search is complete.</p>
                  </div>
                </div>
              </div>

              <Button 
                onClick={handleImageSearch}
                disabled={isSearching || !uploadedImage || (validationResult && !validationResult.isHuman)}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-4 md:py-6 text-base md:text-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSearching ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 md:h-5 md:w-5 animate-spin" />
                    {currentProgress || "Analyzing Image..."}
                  </>
                ) : (
                  <>
                    <Search className="mr-2 h-4 w-4 md:h-5 md:w-5" />
                    Search by Image
                  </>
                )}
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default SearchInterface;
