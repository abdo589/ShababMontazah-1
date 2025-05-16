
import { Button } from "@/components/ui/button";

const Hero = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section 
      id="home" 
      className="relative min-h-screen pt-24 pb-16 flex flex-col justify-center overflow-hidden"
    >
      {/* Background with overlay */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-party-blue-dark via-party-blue to-party-blue-light opacity-90"></div>
        {/* Pattern overlay */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNCI+PHBhdGggZD0iTTM2IDM0aDR2MWgtNHYtMXptMC0yaDF2NWgtMXYtNXptNi0xM2gxdjloLTF2LTl6TTMzIDRoMXYxNmgtMVY0em0wIDhoMXYxaC0xdi0xem0tOCAwaDF2MWgtMXYtMXptOCAxNGgxdjFoLTF2LTF6bTggNmgxdjJoLTF2LTJ6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-30"></div>
      </div>
      
      <div className="container mx-auto px-4 z-10">
        <div className="flex flex-col md:flex-row items-center">
          {/* Hero content */}
          <div className="md:w-1/2 text-white mb-10 md:mb-0">
            <h1 className="text-4xl md:text-6xl font-cairo font-bold mb-4 leading-tight animate-fade-in">
              حزب مستقبل وطن
            </h1>
            <p className="text-2xl md:text-3xl font-cairo mb-6 opacity-90">
              أمانة الشباب - قسم منتزة أول
            </p>
            <p className="text-xl mb-8 max-w-lg leading-relaxed">
              كلنا نعمل من أجل مصر
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                className="floating-btn hover-float text-party-blue-dark py-6 px-8 text-lg"
                onClick={() => scrollToSection("registration")}
              >
                انضم إلينا
              </Button>
              <Button 
                className="bg-transparent hover:bg-white/10 border-2 border-white text-white py-6 px-8 text-lg"
                onClick={() => scrollToSection("about")}
              >
                تعرف علينا
              </Button>
            </div>
          </div>
          
          {/* Party Logo */}
          <div className="md:w-1/2 flex justify-center items-center">
            <div className="relative w-64 h-64 md:w-80 md:h-80">
              <img 
                src="/lovable-uploads/4360289e-76c2-450e-a6fe-46e70be12fa0.png"
                alt="شعار حزب مستقبل وطن"
                className="w-full h-full object-contain animate-float drop-shadow-2xl"
              />
              <div className="absolute inset-0 rounded-full bg-white/20 blur-xl -z-10 animate-pulse"></div>
            </div>
          </div>
        </div>
        
        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center">
          <span className="text-white/70 text-sm mb-2">اكتشف المزيد</span>
          <div className="w-6 h-10 rounded-full border-2 border-white/30 flex justify-center items-start p-1">
            <div className="w-1.5 h-3 bg-white rounded-full animate-bounce"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
