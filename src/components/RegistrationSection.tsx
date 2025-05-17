
import { useRef, useEffect } from "react";
import RegistrationForm from "./registration/RegistrationForm";
import RegistrationHeader from "./registration/RegistrationHeader";
import PrivacyNote from "./registration/PrivacyNote";
import FormContainer from "./registration/FormContainer";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const RegistrationSection = () => {
  const { toast } = useToast();
  
  // Check if database connection is working
  useEffect(() => {
    const checkConnection = async () => {
      try {
        const { error } = await supabase.from('member_registrations').select('count', { count: 'exact', head: true });
        
        if (error) {
          console.error("Error connecting to database:", error.message);
        } else {
          console.log("Database connection successful");
        }
      } catch (err) {
        console.error("Failed to check database connection:", err);
      }
    };
    
    checkConnection();
  }, []);

  // Scroll to the contact section
  const scrollToContact = () => {
    const element = document.getElementById("contactUs");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="registration" className="py-20 bg-gradient-to-t from-blue-50 to-white relative">
      <div className="container mx-auto px-4">
        {/* Section Title */}
        <h2 className="section-title mb-12 text-center">انضم إلينا</h2>
        
        <div className="max-w-4xl mx-auto">
          <FormContainer>
            <RegistrationHeader />
            <RegistrationForm onContactClick={scrollToContact} />
            <PrivacyNote />
          </FormContainer>
        </div>
      </div>
    </section>
  );
};

export default RegistrationSection;
