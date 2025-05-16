
import { useState, useEffect } from "react";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Handle smooth scrolling to sections
  const scrollToSection = (sectionId: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav
      className={`fixed top-0 right-0 left-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white shadow-md py-2"
          : "bg-transparent py-4"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center">
            <img 
              src="/lovable-uploads/4360289e-76c2-450e-a6fe-46e70be12fa0.png" 
              alt="حزب مستقبل وطن" 
              className="h-16"
            />
            <div className="hidden md:block mr-2">
              <h1 className="text-party-blue-dark font-bold text-lg">حزب مستقبل وطن</h1>
              <p className="text-sm text-gray-600">أمانة الشباب - قسم منتزة أول</p>
            </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-1 space-x-reverse">
            <Button 
              variant="ghost" 
              className="text-party-blue-dark font-cairo"
              onClick={() => scrollToSection("home")}
            >
              الرئيسية
            </Button>
            <Button 
              variant="ghost" 
              className="text-party-blue-dark font-cairo"
              onClick={() => scrollToSection("about")}
            >
              من نحن
            </Button>
            <Button 
              variant="ghost" 
              className="text-party-blue-dark font-cairo"
              onClick={() => scrollToSection("activities")}
            >
              الفعاليات
            </Button>
            <Button 
              variant="ghost" 
              className="text-party-blue-dark font-cairo"
              onClick={() => scrollToSection("registration")}
            >
              التسجيل
            </Button>
            <Button 
              className="bg-party-blue hover:bg-party-blue-dark text-white font-cairo mr-4"
              onClick={() => scrollToSection("contact")}
            >
              تواصل معنا
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <Menu className="h-6 w-6" />
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 py-2 border-t border-gray-200">
            <div className="flex flex-col">
              <Button 
                variant="ghost" 
                className="justify-start text-party-blue-dark font-cairo text-right py-2"
                onClick={() => scrollToSection("home")}
              >
                الرئيسية
              </Button>
              <Button 
                variant="ghost" 
                className="justify-start text-party-blue-dark font-cairo text-right py-2"
                onClick={() => scrollToSection("about")}
              >
                من نحن
              </Button>
              <Button 
                variant="ghost" 
                className="justify-start text-party-blue-dark font-cairo text-right py-2"
                onClick={() => scrollToSection("activities")}
              >
                الفعاليات
              </Button>
              <Button 
                variant="ghost" 
                className="justify-start text-party-blue-dark font-cairo text-right py-2"
                onClick={() => scrollToSection("registration")}
              >
                التسجيل
              </Button>
              <Button 
                className="bg-party-blue hover:bg-party-blue-dark text-white font-cairo mt-2"
                onClick={() => scrollToSection("contact")}
              >
                تواصل معنا
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
