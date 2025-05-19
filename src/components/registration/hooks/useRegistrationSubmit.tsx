
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { FormValues } from "../schema";

export const useRegistrationSubmit = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  
  const handleSubmit = async (data: FormValues, onSuccess: () => void) => {
    setIsSubmitting(true);
    
    try {
      // إضافة تحقق أمان إضافي
      if (data.nationalId && data.nationalId.length !== 14) {
        throw new Error("الرقم القومي يجب أن يكون 14 رقم");
      }
      
      if (data.phone && !/^01[0125][0-9]{8}$/.test(data.phone)) {
        throw new Error("رقم الهاتف غير صالح، يجب أن يبدأ بـ 01");
      }

      // تجهيز البيانات للإرسال مع ضمان تطابق أسماء الأعمدة
      const submissionData = {
        name: data.name,
        phone: data.phone,
        national_id: data.nationalId,
        gender: data.gender,
        position: data.area, // Using area as position
        email: data.email,
        address: data.address,
      };
      
      console.log("Submitting data:", submissionData);
      
      // إرسال البيانات بشكل آمن
      const { data: insertedData, error } = await supabase
        .from('member_registrations')
        .insert([submissionData])
        .select();
      
      if (error) {
        console.error("Supabase error:", error);
        throw error;
      }
      
      console.log("Successfully submitted data:", insertedData);
      
      // Show success toast with enhanced message
      toast({
        title: "تم إرسال طلب الانضمام بنجاح",
        description: "سيتم مراجعة طلبك والتواصل معك قريبًا. شكرًا لانضمامك لحزب مستقبل وطن.",
        variant: "success", 
      });
      
      // Call the success callback (e.g., to reset form)
      onSuccess();
    } catch (error: any) {
      // Show error toast
      toast({
        title: "خطأ في إرسال الطلب",
        description: error.message || "حدث خطأ أثناء معالجة طلبك، يرجى المحاولة مرة أخرى",
        variant: "destructive",
      });
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return { handleSubmit, isSubmitting };
};
