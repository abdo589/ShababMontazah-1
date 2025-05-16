
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

// Form schema for registration
const registerSchema = z.object({
  username: z.string().min(3, {
    message: "اسم المستخدم يجب أن يكون 3 أحرف على الأقل.",
  }),
  password: z.string().min(6, {
    message: "كلمة المرور يجب أن تكون 6 أحرف على الأقل.",
  }),
  name: z.string().min(3, {
    message: "الاسم يجب أن يكون 3 أحرف على الأقل.",
  }),
  phone: z.string().min(11, {
    message: "رقم الهاتف يجب أن يكون 11 رقم.",
  }),
  email: z.string().email({
    message: "البريد الإلكتروني غير صالح.",
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

  // Register form
  const registerForm = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: "",
      password: "",
      name: "",
      phone: "",
      email: "",
    },
  });

  // Handle login submission
  const onLoginSubmit = (values: z.infer<typeof loginSchema>) => {
    // Check if user exists in localStorage
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const user = users.find((u: any) => u.username === values.username);
    
    if (user && user.password === values.password) {
      // Set current user in localStorage
      localStorage.setItem("currentUser", JSON.stringify(user));
      
      toast({
        title: "تم تسجيل الدخول بنجاح",
        description: `مرحباً بك ${user.name || user.username}`,
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

  // Handle register submission
  const onRegisterSubmit = (values: z.infer<typeof registerSchema>) => {
    // Get existing users
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    
    // Check if username already exists
    if (users.some((user: any) => user.username === values.username)) {
      toast({
        title: "خطأ في التسجيل",
        description: "اسم المستخدم موجود بالفعل",
        variant: "destructive",
      });
      return;
    }
    
    // Add new user
    const newUser = {
      ...values,
      id: Date.now(),
      registeredAt: new Date().toISOString(),
      role: "user"
    };
    
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));
    
    // Set current user
    localStorage.setItem("currentUser", JSON.stringify(newUser));
    
    toast({
      title: "تم التسجيل بنجاح",
      description: `مرحباً بك ${newUser.name}`,
    });
    
    // Navigate to dashboard
    navigate("/dashboard");
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
              {activeTab === "login" ? "تسجيل الدخول" : "التسجيل الجديد"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs
              defaultValue="login"
              className="w-full"
              value={activeTab}
              onValueChange={setActiveTab}
            >
              <TabsList className="grid grid-cols-2 mb-6">
                <TabsTrigger value="login">تسجيل الدخول</TabsTrigger>
                <TabsTrigger value="register">مستخدم جديد</TabsTrigger>
              </TabsList>
              
              {/* Login Form */}
              <TabsContent value="login">
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
              </TabsContent>
              
              {/* Register Form */}
              <TabsContent value="register">
                <Form {...registerForm}>
                  <form onSubmit={registerForm.handleSubmit(onRegisterSubmit)} className="space-y-4">
                    <FormField
                      control={registerForm.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>الاسم الكامل</FormLabel>
                          <FormControl>
                            <Input placeholder="أدخل الاسم الكامل" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={registerForm.control}
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
                      control={registerForm.control}
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
                    <FormField
                      control={registerForm.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>البريد الإلكتروني</FormLabel>
                          <FormControl>
                            <Input type="email" placeholder="أدخل البريد الإلكتروني" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={registerForm.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>رقم الهاتف</FormLabel>
                          <FormControl>
                            <Input type="tel" placeholder="أدخل رقم الهاتف" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button type="submit" className="w-full py-6 mt-4">التسجيل</Button>
                  </form>
                </Form>
              </TabsContent>
            </Tabs>
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
