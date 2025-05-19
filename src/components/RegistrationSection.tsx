
import { useRef, useEffect } from "react";
import RegistrationForm from "./registration/RegistrationForm";
import RegistrationHeader from "./registration/RegistrationHeader";
import PrivacyNote from "./registration/PrivacyNote";
import FormContainer from "./registration/FormContainer";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const RegistrationSection = () => {
  const { toast } = useToast();
  
  // التحقق من وجود اتصال بقاعدة البيانات
  useEffect(() => {
    const checkConnection = async () => {
      try {
        const { error } = await supabase.from('member_registrations').select('count', { count: 'exact', head: true });
        
        if (error) {
          console.error("Error connecting to database:", error.message);
          // إظهار رسالة خطأ للمستخدم بطريقة لطيفة
          toast({
            title: "تنبيه",
            description: "قد يكون هناك مشكلة في الاتصال بالخادم. سنحاول مجدداً.",
            variant: "default",
          });
        } else {
          console.log("Database connection successful");
          // يمكننا إظهار رسالة نجاح هنا إذا أردنا
          toast({
            title: "انضم إلينا",
            description: "تم الاتصال بقاعدة البيانات بنجاح",
            variant: "success",
          });
        }
      } catch (err) {
        console.error("Failed to check database connection:", err);
      }
    };
    
    checkConnection();
    
    // استماع إلى تحديثات التسجيلات الجديدة
    const channel = supabase
      .channel('public:member_registrations')
      .on('postgres_changes', { 
        event: 'INSERT', 
        schema: 'public', 
        table: 'member_registrations' 
      }, (payload) => {
        console.log('New registration:', payload);
        
        // يمكن إظهار إشعار إذا كنت تريد (تعليق في الوقت الحالي لتجنب إظهار معلومات حساسة)
        toast({
          title: "انضم إلينا",
          description: "تم استلام طلب انضمام جديد",
          variant: "success",
        });
      })
      .subscribe();
      
    return () => {
      supabase.removeChannel(channel);
    };
  }, [toast]);

  // التمرير إلى قسم الاتصال
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
