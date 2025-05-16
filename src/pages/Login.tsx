
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Form schema for login
const loginSchema = z.object({
  username: z.string().min(3, {
    message: "اسم المستخدم يجب أن يكون 3 أحرف على الأقل.",
  }),
  password: z.string().min(6, {
    message: "كلمة المرور يجب أن تكون 6 أحرف على الأقل.",
  }),
});

const Login = () => {
  const [activeTab, setActiveTab] = useState("login");
  const { toast } = useToast();
  const navigate = useNavigate();

  // Login form
  const loginForm = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  // Handle login submission - only allows admin user
  const onLoginSubmit = (values: z.infer<typeof loginSchema>) => {
    // Check if credentials match the admin user
    if (values.username === "admin" && values.password === "watan2025") {
      // Set admin user data in localStorage
      const adminUser = {
        id: 1,
        username: "admin",
        name: "مشرف النظام",
        email: "admin@future-nation.eg",
        phone: "01000000000",
        registeredAt: new Date().toISOString(),
        role: "admin"
      };
      
      localStorage.setItem("currentUser", JSON.stringify(adminUser));
      
      // Also store in users array if empty
      const users = JSON.parse(localStorage.getItem("users") || "[]");
      if (users.length === 0) {
        localStorage.setItem("users", JSON.stringify([adminUser]));
      }
      
      toast({
        title: "تم تسجيل الدخول بنجاح",
        description: "مرحباً بك في لوحة التحكم",
      });
      
      // Navigate to dashboard
      navigate("/dashboard");
    } else {
      toast({
        title: "خطأ في تسجيل الدخول",
        description: "اسم المستخدم أو كلمة المرور غير صحيحة",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-party-blue-dark via-party-blue to-party-blue-light p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <img 
            src="/lovable-uploads/4360289e-76c2-450e-a6fe-46e70be12fa0.png" 
            alt="شعار الحزب" 
            className="w-24 h-24 mx-auto mb-4"
          />
          <h1 className="text-2xl font-bold text-white">حزب مستقبل وطن - أمانة الشباب</h1>
          <p className="text-white/80">قسم منتزة أول</p>
        </div>
        
        <Card className="border-none shadow-lg">
          <CardHeader>
            <CardTitle className="text-center text-xl font-cairo">
              تسجيل الدخول للمشرفين
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...loginForm}>
              <form onSubmit={loginForm.handleSubmit(onLoginSubmit)} className="space-y-4">
                <FormField
                  control={loginForm.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>اسم المستخدم</FormLabel>
                      <FormControl>
                        <Input placeholder="أدخل اسم المستخدم" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={loginForm.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>كلمة المرور</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="أدخل كلمة المرور" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full py-6 mt-4">تسجيل الدخول</Button>
              </form>
            </Form>
          </CardContent>
        </Card>
        
        <div className="text-center mt-4">
          <Button 
            variant="link" 
            className="text-white hover:text-white/80"
            onClick={() => navigate("/")}
          >
            العودة للصفحة الرئيسية
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Login;
