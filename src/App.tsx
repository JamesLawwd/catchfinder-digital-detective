
import { useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import About from "./pages/About";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import { initializeTensorFlow, cleanupTensorFlow } from "@/lib/tensorflow-init";

const queryClient = new QueryClient();

const App = () => {
  useEffect(() => {
    // Initialize TensorFlow.js when app starts
    initializeTensorFlow().then((success) => {
      if (success) {
        console.log('AI models ready for image analysis');
      } else {
        console.warn('TensorFlow.js initialization failed - some features may not work');
      }
    });

    // Cleanup on unmount
    return () => {
      cleanupTensorFlow();
    };
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
