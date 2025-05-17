
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
const formSchema = z.object({
  name: z.string().min(3, { message: "الاسم يجب أن يحتوي على 3 أحرف على الأقل" }),
  email: z.string().email({ message: "يرجى إدخال بريد إلكتروني صالح" }),
  phone: z.string().min(11, { message: "رقم الهاتف يجب أن يحتوي على 11 رقم على الأقل" }),
  nationalId: z.string().min(14, { message: "الرقم القومي يجب أن يحتوي على 14 رقم" }),
  address: z.string().min(5, { message: "العنوان يجب أن يحتوي على 5 أحرف على الأقل" }),
  area: z.string().min(1, { message: "يرجى اختيار المنطقة" }),
  gender: z.string().min(1, { message: "يرجى اختيار النوع" }),
  motivation: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

// Areas in Alexandria for the select input
const alexandriaAreas = [
  "المنتزه أول",
  "المنتزه ثان",
  "شرق",
  "وسط",
  "العامرية أول",
  "العامرية ثان",
  "الجمرك",
  "العجمي",
  "الدخيلة",
  "برج العرب"
];

const RegistrationSection = () => {
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
      // Insert data into the member_registrations table
      const { error } = await supabase
        .from('member_registrations')
        .insert([
          { 
            name: data.name,
            phone: data.phone,
            national_id: data.nationalId,
            gender: data.gender,
            position: data.area, // Using area as position
          }
        ]);
      
      if (error) throw error;
      
      // Show success toast - changing the variant to "default" and using a more descriptive title
      toast({
        title: "تم إرسال طلب الانضمام بنجاح",
        description: "سنتواصل معك قريبًا للمتابعة",
        variant: "success", // This matches the new variant we added
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
          <div className="bg-white rounded-xl shadow-lg p-6 md:p-10 relative overflow-hidden">
            {/* Egyptian flag colors - top decoration */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-party-red via-white to-black"></div>
            
            {/* Form introduction */}
            <div className="mb-8 text-center">
              <h3 className="text-2xl font-bold text-party-blue-dark mb-3 animate-fade-in">انضم إلينا</h3>
              <p className="text-gray-600 max-w-2xl mx-auto">
                نرحب بانضمامك إلى حزب مستقبل وطن. املأ النموذج التالي وسنتواصل معك في أقرب وقت ممكن.
              </p>
            </div>
            
            {/* Registration Form */}
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
                    onClick={scrollToContact}
                  >
                    تواصل معنا
                  </Button>
                </div>
              </form>
            </Form>
            
            {/* Privacy note */}
            <div className="mt-8 text-center text-sm text-gray-500">
              <p>بيانات التسجيل آمنة ومحمية وسيتم استخدامها فقط للأغراض المتعلقة بالحزب.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RegistrationSection;
