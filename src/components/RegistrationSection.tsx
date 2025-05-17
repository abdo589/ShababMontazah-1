
import { useRef } from "react";
import RegistrationForm from "./registration/RegistrationForm";
import RegistrationHeader from "./registration/RegistrationHeader";
import PrivacyNote from "./registration/PrivacyNote";
import FormContainer from "./registration/FormContainer";

const RegistrationSection = () => {
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
