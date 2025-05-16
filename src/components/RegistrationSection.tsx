
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
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
  motivation: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

// Egyptian governorates for the select input
const governorates = [
  "الإسكندرية",
  "القاهرة",
  "الجيزة",
  "الإسماعيلية",
  "أسوان",
  "أسيوط",
  "الأقصر",
  "البحر الأحمر",
  "البحيرة",
  "بني سويف",
  "بورسعيد",
  "جنوب سيناء",
  "الدقهلية",
  "دمياط",
  "سوهاج",
  "السويس",
  "الشرقية",
  "شمال سيناء",
  "الغربية",
  "الفيوم",
  "القليوبية",
  "قنا",
  "كفر الشيخ",
  "مطروح",
  "المنوفية",
  "المنيا",
  "الوادي الجديد"
];

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
      motivation: "",
    }
  });

  // Handle form submission
  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log("Form data submitted:", data);
      
      // Show success toast
      toast({
        title: "تم إرسال طلب الانضمام بنجاح",
        description: "سنتواصل معك قريبًا للمتابعة",
        variant: "default",
      });
      
      // Reset form
      form.reset();
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <section id="registration" className="py-20 bg-white relative">
      <div className="container mx-auto px-4">
        {/* Section Title */}
        <h2 className="section-title mb-12 text-center">التسجيل</h2>
        
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg p-6 md:p-10 relative overflow-hidden">
            {/* Egyptian flag colors - top decoration */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-party-red via-white to-black"></div>
            
            {/* Form introduction */}
            <div className="mb-8 text-center">
              <h3 className="text-2xl font-bold text-party-blue-dark mb-3">انضم إلينا</h3>
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
                          <Input placeholder="أدخل الاسم بالكامل" {...field} />
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
                          <Input placeholder="example@domain.com" type="email" {...field} />
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
                          <Input placeholder="01xxxxxxxxx" {...field} />
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
                          <Input placeholder="الرقم القومي المكون من 14 رقم" {...field} />
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
                          <Input placeholder="العنوان التفصيلي" {...field} />
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
                            <SelectTrigger>
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
                </div>
                
                {/* Motivation Field */}
                <FormField
                  control={form.control}
                  name="motivation"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700">لماذا ترغب في الانضمام للحزب؟ (اختياري)</FormLabel>
                      <FormControl>
                        <Textarea placeholder="اكتب هنا..." rows={4} {...field} />
                      </FormControl>
                      <FormDescription className="text-xs">
                        شارك معنا سبب رغبتك في الانضمام إلى الحزب وكيف يمكنك المساهمة.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="flex justify-center pt-4">
                  <Button 
                    type="submit" 
                    className="bg-party-blue hover:bg-party-blue-dark text-white px-10 py-6 text-lg font-cairo"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "جاري الإرسال..." : "إرسال طلب الانضمام"}
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
