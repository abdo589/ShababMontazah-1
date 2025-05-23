
import { Facebook, Mail, Phone, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

const Footer = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleFacebookClick = () => {
    window.open("https://www.facebook.com/share/14EVvuCiPNU/?mibextid=wwXIfr", "_blank");
  };
  
  return (
    <footer id="contact" className="bg-gradient-to-b from-party-blue-dark to-blue-900 text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Logo and slogan */}
          <div className="text-center md:text-right">
            <div className="flex justify-center md:justify-end mb-4">
              <img 
                src="/lovable-uploads/4360289e-76c2-450e-a6fe-46e70be12fa0.png" 
                alt="حزب مستقبل وطن" 
                className="h-24 animate-pulse"
              />
            </div>
            <h3 className="text-xl font-bold mb-2">حزب مستقبل وطن</h3>
            <p className="text-sm text-gray-300 mb-4">أمانة الشباب - قسم منتزة أول</p>
            <div className="bg-gradient-to-r from-party-red via-white to-black h-1 w-24 mx-auto md:mr-0 md:ml-auto mb-4"></div>
            <p className="text-lg font-cairo font-bold">كلنا نعمل من أجل مصر</p>
          </div>
          
          {/* Quick Links */}
          <div className="text-center md:text-right">
            <h3 className="text-lg font-bold mb-4">روابط سريعة</h3>
            <ul className="space-y-2">
              <li>
                <button 
                  onClick={() => scrollToSection("home")} 
                  className="hover:text-party-gold transition-colors transform hover:scale-105"
                >
                  الرئيسية
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection("about")} 
                  className="hover:text-party-gold transition-colors transform hover:scale-105"
                >
                  من نحن
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection("activities")} 
                  className="hover:text-party-gold transition-colors transform hover:scale-105"
                >
                  الفعاليات
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection("registration")} 
                  className="hover:text-party-gold transition-colors transform hover:scale-105"
                >
                  انضم إلينا
                </button>
              </li>
              <li>
                <button 
                  onClick={handleFacebookClick}
                  className="hover:text-party-gold transition-colors transform hover:scale-105"
                >
                  الأخبار
                </button>
              </li>
            </ul>
          </div>
          
          {/* Contact info */}
          <div className="text-center md:text-right" id="contactUs">
            <h3 className="text-lg font-bold mb-4">تواصل معنا</h3>
            <ul className="space-y-4">
              <li className="flex items-center justify-center md:justify-start">
                <MapPin className="h-5 w-5 ml-2" />
                <span>شارع 56 البكباشي العيسوي، الإسكندرية، مصر</span>
              </li>
              <li className="flex items-center justify-center md:justify-start">
                <Phone className="h-5 w-5 ml-2" />
                <span>01142258314</span>
              </li>
              <li className="flex items-center justify-center md:justify-start">
                <Mail className="h-5 w-5 ml-2" />
                <span>info@mustaqbalwatan.eg</span>
              </li>
            </ul>
            
            <div className="mt-6">
              <h4 className="text-sm mb-3">تابعنا على الفيس بوك</h4>
              <div className="flex justify-center md:justify-start">
                <a 
                  href="https://www.facebook.com/share/14EVvuCiPNU/?mibextid=wwXIfr" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-white text-party-blue-dark p-2 rounded-full hover:bg-party-gold transition-colors transform hover:scale-110"
                >
                  <Facebook className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>
        </div>
        
        {/* Copyright with supervisor credit */}
        <div className="mt-16 pt-8 border-t border-white/10 text-center text-sm text-gray-400">
          <p>جميع الحقوق محفوظة &copy; حزب مستقبل وطن {new Date().getFullYear()}</p>
          <div className="mt-2 flex items-center justify-center">
            <img 
              src="/lovable-uploads/4360289e-76c2-450e-a6fe-46e70be12fa0.png" 
              alt="حزب مستقبل وطن" 
              className="h-6 mr-2"
            />
            <span>أمانة شباب المنتزة أول</span>
          </div>
          <p className="mt-2">تم بإشراف معالي الأمين محمد سلام أمين الشباب قسم منتزة</p>
          <p className="mt-2">تم التصميم بواسطة م/ عبدالرحمن مصطفى • رقم التواصل: 01142258314</p>
        </div>
      </div>
      
      {/* Back to top button */}
      <Button
        className="fixed bottom-6 left-6 bg-white text-party-blue-dark rounded-full p-3 shadow-lg hover:bg-party-gold transition-colors transform hover:scale-110"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        size="icon"
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          className="h-6 w-6" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
        </svg>
      </Button>
    </footer>
  );
};

export default Footer;
