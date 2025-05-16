
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { supabase } from "@/integrations/supabase/client";
import {
  ChevronLeft,
  Download,
  LogOut,
  User,
} from "lucide-react";
import GenderChart from "@/components/GenderChart";
import MonthlyRegistrationChart from "@/components/MonthlyRegistrationChart";
import ActivityAttendanceChart from "@/components/ActivityAttendanceChart";

const Dashboard = () => {
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [users, setUsers] = useState<any[]>([]);
  const [registrations, setRegistrations] = useState<any[]>([]);
  const [activities, setActivities] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  const navigate = useNavigate();

  // On mount, check if user is logged in
  useEffect(() => {
    const storedUser = localStorage.getItem("currentUser");
    if (!storedUser) {
      navigate("/login");
      return;
    }
    
    setCurrentUser(JSON.parse(storedUser));

    // Function to fetch registrations from Supabase
    const fetchRegistrations = async () => {
      try {
        setIsLoading(true);
        const { data, error } = await supabase
          .from('member_registrations')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) {
          throw error;
        }

        if (data) {
          setRegistrations(data);
          setUsers(data.map((reg, index) => ({
            id: index + 1,
            name: reg.name,
            phone: reg.phone,
            registeredAt: reg.created_at,
            gender: reg.gender
          })));
        }
      } catch (error: any) {
        console.error('Error fetching registrations:', error.message);
        toast({
          title: "خطأ في جلب البيانات",
          description: "حدث خطأ أثناء جلب بيانات التسجيل",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchRegistrations();
    
    // Load activities - updated with 2025 dates
    const mockActivities = [
      { id: 1, name: "افطار صائم", date: "2025", participants: 45 },
      { id: 2, name: "توزيع مواد غذائية", date: "2025", participants: 32 },
      { id: 3, name: "اجتماع مع قيادات الشباب", date: "2025", participants: 15 },
      { id: 4, name: "فعالية التوعية المجتمعية", date: "2025", participants: 40 },
    ];
    setActivities(mockActivities);
  }, [navigate, toast]);

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    toast({
      title: "تم تسجيل الخروج بنجاح",
    });
    navigate("/");
  };

  // Export users data as Excel (CSV)
  const exportUsers = () => {
    // Filter out sensitive information
    const data = registrations.map(user => ({
      الاسم: user.name,
      النوع: user.gender,
      رقم_الهاتف: user.phone,
      الرقم_القومي: user.national_id,
      المنطقة: user.position,
      تاريخ_التسجيل: new Date(user.created_at).toLocaleDateString('ar-EG')
    }));
    
    // Convert to CSV
    const csvContent = [
      Object.keys(data[0]).join(','), // Header
      ...data.map(row => Object.values(row).join(',')) // Rows
    ].join('\n');
    
    // Create a blob and download
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', 'مستخدمين_حزب_مستقبل_وطن.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // If no current user, show loading or redirect
  if (!currentUser) {
    return <div className="min-h-screen flex items-center justify-center">جاري التحميل...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      {/* Header */}
      <header className="bg-gradient-to-r from-party-blue to-blue-700 text-white p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <img 
              src="/lovable-uploads/4360289e-76c2-450e-a6fe-46e70be12fa0.png" 
              alt="شعار الحزب" 
              className="w-10 h-10 animate-pulse"
            />
            <h1 className="text-xl font-bold">لوحة التحكم</h1>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-2">
              <User className="h-5 w-5" />
              <span>{currentUser.name}</span>
            </div>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleLogout}
              className="hover:bg-red-500 hover:text-white border-white text-white transition-all duration-300"
            >
              <LogOut className="h-4 w-4 ml-2" />
              تسجيل الخروج
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto py-8 px-4 animate-fade-in">
        <div className="flex justify-between items-center mb-6">
          <Button 
            variant="ghost" 
            onClick={() => navigate("/")}
            className="hover:bg-blue-100 transition-all duration-300"
          >
            <ChevronLeft className="h-4 w-4 ml-2" />
            العودة للصفحة الرئيسية
          </Button>
          
          <div className="flex gap-2">
            {currentUser.role === 'admin' && (
              <Button 
                onClick={exportUsers} 
                className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 transition-all duration-300"
              >
                <Download className="h-4 w-4" />
                تصدير بيانات المستخدمين
              </Button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="hover:shadow-lg transition-all duration-300 bg-gradient-to-br from-white to-blue-50">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-blue-600">
                إجمالي المستخدمين
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{users.length}</div>
            </CardContent>
          </Card>
          
          <Card className="hover:shadow-lg transition-all duration-300 bg-gradient-to-br from-white to-blue-50">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-blue-600">
                إجمالي الفعاليات
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{activities.length}</div>
            </CardContent>
          </Card>
          
          <Card className="hover:shadow-lg transition-all duration-300 bg-gradient-to-br from-white to-blue-50">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-blue-600">
                إجمالي المشاركين
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {activities.reduce((sum, act) => sum + act.participants, 0)}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <GenderChart users={users} />
          <MonthlyRegistrationChart users={users} />
          <div className="md:col-span-2">
            <ActivityAttendanceChart />
          </div>
        </div>

        <Tabs defaultValue="activities" className="space-y-4">
          <TabsList className="bg-blue-100">
            <TabsTrigger value="activities" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">الفعاليات</TabsTrigger>
            {currentUser.role === 'admin' && (
              <TabsTrigger value="users" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">المستخدمين</TabsTrigger>
            )}
            <TabsTrigger value="profile" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">الملف الشخصي</TabsTrigger>
          </TabsList>
          
          <TabsContent value="activities" className="space-y-4">
            <Card className="hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <CardTitle>الفعاليات القادمة</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="font-bold">اسم الفعالية</TableHead>
                      <TableHead className="font-bold">التاريخ</TableHead>
                      <TableHead className="font-bold">عدد المشاركين</TableHead>
                      <TableHead className="font-bold w-[100px]">الإجراءات</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {activities.map((activity) => (
                      <TableRow key={activity.id} className="hover:bg-blue-50 transition-colors">
                        <TableCell className="font-medium">{activity.name}</TableCell>
                        <TableCell>{activity.date}</TableCell>
                        <TableCell>{activity.participants}</TableCell>
                        <TableCell>
                          <Button size="sm" variant="outline" className="hover:bg-blue-500 hover:text-white transition-colors">المزيد</Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
          
          {currentUser.role === 'admin' && (
            <TabsContent value="users" className="space-y-4">
              <Card className="hover:shadow-lg transition-all duration-300">
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle>المستخدمين المسجلين</CardTitle>
                  <Button 
                    size="sm" 
                    onClick={exportUsers} 
                    className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 transition-all duration-300"
                  >
                    <Download className="h-4 w-4" />
                    تصدير للإكسيل
                  </Button>
                </CardHeader>
                <CardContent>
                  {isLoading ? (
                    <div className="text-center py-4">جاري تحميل البيانات...</div>
                  ) : (
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="font-bold">الاسم</TableHead>
                          <TableHead className="font-bold">النوع</TableHead>
                          <TableHead className="font-bold">رقم الهاتف</TableHead>
                          <TableHead className="font-bold">الرقم القومي</TableHead>
                          <TableHead className="font-bold">المنطقة</TableHead>
                          <TableHead className="font-bold">تاريخ التسجيل</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {registrations.map((user) => (
                          <TableRow key={user.id} className="hover:bg-blue-50 transition-colors">
                            <TableCell className="font-medium">{user.name}</TableCell>
                            <TableCell>{user.gender}</TableCell>
                            <TableCell>{user.phone}</TableCell>
                            <TableCell>{user.national_id}</TableCell>
                            <TableCell>{user.position}</TableCell>
                            <TableCell>
                              {new Date(user.created_at).toLocaleDateString('ar-EG')}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          )}
          
          <TabsContent value="profile" className="space-y-4">
            <Card className="hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <CardTitle>معلومات المستخدم</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-sm font-medium text-blue-600">الاسم</h3>
                    <p className="text-lg">{currentUser.name}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-blue-600">اسم المستخدم</h3>
                    <p className="text-lg">{currentUser.username}</p>
                  </div>
                </div>
                <div className="mt-6 text-center text-sm text-gray-500">
                  <p>تم بإشراف معالي الأمين محمد سلام أمين الشباب قسم منتزة</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Dashboard;
