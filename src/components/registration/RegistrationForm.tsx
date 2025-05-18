
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";

// Form validation schema
import { formSchema, type FormValues } from "./schema";

// Areas in Alexandria for the select input
import { alexandriaAreas } from "./constants";

const RegistrationForm = ({ onContactClick }: { onContactClick: () => void }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  
  // Initialize the form
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      nationalId: "",
      address: "",
      area: "",
      gender: "",
      motivation: "",
    }
  });

  // Handle form submission
  const onSubmit = async (data: FormValues) => {
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
      const { error } = await supabase
        .from('member_registrations')
        .insert([submissionData]);
      
      if (error) {
        console.error("Supabase error:", error);
        throw error;
      }
      
      // Show success toast with enhanced message
      toast({
        title: "تم إرسال طلب الانضمام بنجاح",
        description: "سيتم مراجعة طلبك والتواصل معك قريبًا. شكرًا لانضمامك لحزب مستقبل وطن.",
        variant: "success", 
      });
      
      // Reset form
      form.reset();
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

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Name Field */}
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-700">الاسم بالكامل</FormLabel>
                <FormControl>
                  <Input placeholder="أدخل الاسم بالكامل" className="focus:ring-2 focus:ring-blue-500 transition-all" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          {/* Email Field */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-700">البريد الإلكتروني</FormLabel>
                <FormControl>
                  <Input placeholder="example@domain.com" type="email" className="focus:ring-2 focus:ring-blue-500 transition-all" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          {/* Phone Field */}
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-700">رقم الهاتف</FormLabel>
                <FormControl>
                  <Input placeholder="01xxxxxxxxx" className="focus:ring-2 focus:ring-blue-500 transition-all" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          {/* National ID Field */}
          <FormField
            control={form.control}
            name="nationalId"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-700">الرقم القومي</FormLabel>
                <FormControl>
                  <Input placeholder="الرقم القومي المكون من 14 رقم" className="focus:ring-2 focus:ring-blue-500 transition-all" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          {/* Address Field */}
          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-700">العنوان</FormLabel>
                <FormControl>
                  <Input placeholder="العنوان التفصيلي" className="focus:ring-2 focus:ring-blue-500 transition-all" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          {/* Area Field */}
          <FormField
            control={form.control}
            name="area"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-700">المنطقة</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="focus:ring-2 focus:ring-blue-500 transition-all">
                      <SelectValue placeholder="اختر المنطقة" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {alexandriaAreas.map((area) => (
                      <SelectItem key={area} value={area}>
                        {area}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          
          {/* Gender Field */}
          <FormField
            control={form.control}
            name="gender"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-700">النوع</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="focus:ring-2 focus:ring-blue-500 transition-all">
                      <SelectValue placeholder="اختر النوع" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="ذكر">ذكر</SelectItem>
                    <SelectItem value="أنثى">أنثى</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
        {/* Motivation Field */}
        <FormField
          control={form.control}
          name="motivation"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-700">لماذا ترغب في الانضمام للحزب؟ (اختياري)</FormLabel>
              <FormControl>
                <Textarea placeholder="اكتب هنا..." rows={4} className="focus:ring-2 focus:ring-blue-500 transition-all" {...field} />
              </FormControl>
              <FormDescription className="text-xs">
                شارك معنا سبب رغبتك في الانضمام إلى الحزب وكيف يمكنك المساهمة.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <div className="flex flex-col md:flex-row justify-center gap-4 pt-4">
          <Button 
            type="submit" 
            className="bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white px-10 py-6 text-lg font-cairo transform hover:scale-105 transition-all duration-300"
            disabled={isSubmitting}
          >
            {isSubmitting ? "جاري الإرسال..." : "إرسال طلب الانضمام"}
          </Button>
          
          <Button 
            type="button"
            variant="outline" 
            className="px-10 py-6 text-lg font-cairo border-blue-500 text-blue-600 hover:bg-blue-50 transform hover:scale-105 transition-all duration-300"
            onClick={onContactClick}
          >
            تواصل معنا
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default RegistrationForm;
