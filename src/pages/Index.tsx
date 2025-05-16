
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import AboutSection from "@/components/AboutSection";
import ActivitiesSection from "@/components/ActivitiesSection";
import RegistrationSection from "@/components/RegistrationSection";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { User } from "lucide-react";

const Index = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const navigate = useNavigate();

  // Check if user is logged in
  useEffect(() => {
    const storedUser = localStorage.getItem("currentUser");
    if (storedUser) {
      setIsLoggedIn(true);
      setCurrentUser(JSON.parse(storedUser));
    }
  }, []);

  // Handle dashboard navigation
  const handleDashboardClick = () => {
    navigate("/dashboard");
  };

  // Handle login navigation
  const handleLoginClick = () => {
    navigate("/login");
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* User status floating button */}
      <div className="fixed top-20 left-4 z-50">
        {isLoggedIn ? (
          <Button 
            onClick={handleDashboardClick}
            className="bg-white text-party-blue hover:bg-white/90 rounded-full shadow-lg flex items-center"
          >
            <User className="mr-2 h-5 w-5" />
            <span>{currentUser?.name || "حسابي"}</span>
          </Button>
        ) : (
          <Button 
            onClick={handleLoginClick}
            className="bg-white text-party-blue hover:bg-white/90 rounded-full shadow-lg flex items-center"
          >
            <User className="mr-2 h-5 w-5" />
            <span>تسجيل الدخول</span>
          </Button>
        )}
      </div>
      
      <Hero />
      <AboutSection />
      <ActivitiesSection />
      <RegistrationSection />
      <Footer />
    </div>
  );
};

export default Index;
