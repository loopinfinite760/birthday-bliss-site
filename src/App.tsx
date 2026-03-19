import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import BackgroundMusic from "@/components/BackgroundMusic";
import Index from "./pages/Index.tsx";
import SurprisePage from "./pages/SurprisePage.tsx";
import BirthdayPage from "./pages/BirthdayPage.tsx";
import NotFound from "./pages/NotFound.tsx";

const queryClient = new QueryClient();

const MusicWrapper = () => {
  const location = useLocation();
  const showMusic = ["/surprise", "/birthday"].includes(location.pathname);
  return showMusic ? <BackgroundMusic src="/birthday-song.mp3" /> : null;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <MusicWrapper />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/surprise" element={<SurprisePage />} />
          <Route path="/birthday" element={<BirthdayPage />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

