
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
  Calendar,
  Users,
  Activity,
  Search,
  FileText
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
  const [searchTerm, setSearchTerm] = useState("");
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
    
    // Set up realtime subscription for new registrations
    const channel = supabase
      .channel('public:member_registrations')
      .on('postgres_changes', { 
        event: 'INSERT', 
        schema: 'public', 
        table: 'member_registrations' 
      }, (payload) => {
        // Update the registrations array with the new registration
        setRegistrations(prev => [payload.new as any, ...prev]);
        // Update the users array for charts
        setUsers(prev => [{
          id: prev.length + 1,
          name: (payload.new as any).name,
          phone: (payload.new as any).phone,
          registeredAt: (payload.new as any).created_at,
          gender: (payload.new as any).gender
        }, ...prev]);
        
        // Show a toast notification
        toast({
          title: "تسجيل جديد",
          description: `تم تسجيل ${(payload.new as any).name} بنجاح`,
          variant: "success",
        });
      })
      .subscribe();
    
    // Load activities - updated with 2025 dates
    const mockActivities = [
      { id: 1, name: "افطار صائم", date: "2025", participants: 45 },
      { id: 2, name: "توزيع مواد غذائية", date: "2025", participants: 32 },
      { id: 3, name: "اجتماع مع قيادات الشباب", date: "2025", participants: 15 },
      { id: 4, name: "فعالية التوعية المجتمعية", date: "2025", participants: 40 },
    ];
    setActivities(mockActivities);
    
    return () => {
      supabase.removeChannel(channel);
    };
  }, [navigate, toast]);

  // Filter registrations based on search term
  const filteredRegistrations = registrations.filter(user => 
    user.name.includes(searchTerm) || 
    user.phone.includes(searchTerm) || 
    user.national_id.includes(searchTerm) ||
    user.position.includes(searchTerm)
  );

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
    
    toast({
      title: "تم تصدير البيانات بنجاح",
      description: "تم حفظ ملف CSV بنجاح",
      variant: "success",
    });
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
          <Card className="hover:shadow-lg transition-all duration-300 bg-gradient-to-br from-white to-blue-50 border-blue-200">
            <CardHeader className="pb-2 border-b border-blue-100">
              <CardTitle className="text-sm font-medium text-blue-600 flex items-center gap-2">
                <Users className="h-5 w-5" />
                إجمالي المستخدمين
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold mt-2 text-blue-800">{users.length}</div>
              <div className="text-xs text-gray-500 mt-1">تم التحديث: {new Date().toLocaleTimeString('ar-EG')}</div>
            </CardContent>
          </Card>
          
          <Card className="hover:shadow-lg transition-all duration-300 bg-gradient-to-br from-white to-green-50 border-green-200">
            <CardHeader className="pb-2 border-b border-green-100">
              <CardTitle className="text-sm font-medium text-green-600 flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                إجمالي الفعاليات
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold mt-2 text-green-800">{activities.length}</div>
              <div className="text-xs text-gray-500 mt-1">تم التحديث: {new Date().toLocaleTimeString('ar-EG')}</div>
            </CardContent>
          </Card>
          
          <Card className="hover:shadow-lg transition-all duration-300 bg-gradient-to-br from-white to-amber-50 border-amber-200">
            <CardHeader className="pb-2 border-b border-amber-100">
              <CardTitle className="text-sm font-medium text-amber-600 flex items-center gap-2">
                <Activity className="h-5 w-5" />
                إجمالي المشاركين
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold mt-2 text-amber-800">
                {activities.reduce((sum, act) => sum + act.participants, 0)}
              </div>
              <div className="text-xs text-gray-500 mt-1">تم التحديث: {new Date().toLocaleTimeString('ar-EG')}</div>
            </CardContent>
          </Card>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card className="hover:shadow-lg transition-all duration-300 border-blue-200">
            <CardHeader>
              <CardTitle className="text-blue-800">توزيع المسجلين حسب النوع</CardTitle>
            </CardHeader>
            <CardContent>
              <GenderChart users={users} />
            </CardContent>
          </Card>
          
          <Card className="hover:shadow-lg transition-all duration-300 border-green-200">
            <CardHeader>
              <CardTitle className="text-green-800">التسجيلات الشهرية</CardTitle>
            </CardHeader>
            <CardContent>
              <MonthlyRegistrationChart users={users} />
            </CardContent>
          </Card>
          
          <Card className="md:col-span-2 hover:shadow-lg transition-all duration-300 border-amber-200">
            <CardHeader>
              <CardTitle className="text-amber-800">حضور الفعاليات</CardTitle>
            </CardHeader>
            <CardContent>
              <ActivityAttendanceChart />
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="activities" className="space-y-4">
          <TabsList className="bg-blue-100 p-1 rounded-xl">
            <TabsTrigger value="activities" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white rounded-lg px-6 py-2">الفعاليات</TabsTrigger>
            {currentUser.role === 'admin' && (
              <TabsTrigger value="users" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white rounded-lg px-6 py-2">المستخدمين</TabsTrigger>
            )}
            <TabsTrigger value="profile" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white rounded-lg px-6 py-2">الملف الشخصي</TabsTrigger>
          </TabsList>
          
          <TabsContent value="activities" className="space-y-4">
            <Card className="hover:shadow-lg transition-all duration-300 border-blue-200">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-blue-100 border-b border-blue-200">
                <CardTitle className="text-blue-800">الفعاليات القادمة</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <Table>
                  <TableHeader className="bg-blue-50">
                    <TableRow>
                      <TableHead className="font-bold text-blue-700">اسم الفعالية</TableHead>
                      <TableHead className="font-bold text-blue-700">التاريخ</TableHead>
                      <TableHead className="font-bold text-blue-700">عدد المشاركين</TableHead>
                      <TableHead className="font-bold text-blue-700 w-[100px]">الإجراءات</TableHead>
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
              <Card className="hover:shadow-lg transition-all duration-300 border-green-200">
                <CardHeader className="bg-gradient-to-r from-green-50 to-green-100 border-b border-green-200 flex flex-row items-center justify-between">
                  <CardTitle className="text-green-800">المستخدمين المسجلين</CardTitle>
                  <div className="flex items-center gap-2">
                    <div className="relative">
                      <Search className="h-4 w-4 absolute top-3 right-3 text-gray-400" />
                      <input
                        type="text"
                        placeholder="بحث..."
                        className="pl-4 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>
                    <Button 
                      size="sm" 
                      onClick={exportUsers} 
                      className="flex items-center gap-2 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 transition-all duration-300"
                    >
                      <FileText className="h-4 w-4" />
                      تصدير للإكسيل
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="p-0">
                  {isLoading ? (
                    <div className="text-center py-4">جاري تحميل البيانات...</div>
                  ) : (
                    <Table>
                      <TableHeader className="bg-green-50">
                        <TableRow>
                          <TableHead className="font-bold text-green-700">الاسم</TableHead>
                          <TableHead className="font-bold text-green-700">النوع</TableHead>
                          <TableHead className="font-bold text-green-700">رقم الهاتف</TableHead>
                          <TableHead className="font-bold text-green-700">الرقم القومي</TableHead>
                          <TableHead className="font-bold text-green-700">المنطقة</TableHead>
                          <TableHead className="font-bold text-green-700">تاريخ التسجيل</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredRegistrations.length === 0 ? (
                          <TableRow>
                            <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                              {searchTerm ? "لا توجد نتائج للبحث" : "لا توجد بيانات للعرض"}
                            </TableCell>
                          </TableRow>
                        ) : (
                          filteredRegistrations.map((user) => (
                            <TableRow key={user.id} className="hover:bg-green-50 transition-colors">
                              <TableCell className="font-medium">{user.name}</TableCell>
                              <TableCell>{user.gender}</TableCell>
                              <TableCell>{user.phone}</TableCell>
                              <TableCell>{user.national_id}</TableCell>
                              <TableCell>{user.position}</TableCell>
                              <TableCell>
                                {new Date(user.created_at).toLocaleDateString('ar-EG')}
                              </TableCell>
                            </TableRow>
                          ))
                        )}
                      </TableBody>
                    </Table>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          )}
          
          <TabsContent value="profile" className="space-y-4">
            <Card className="hover:shadow-lg transition-all duration-300 border-amber-200">
              <CardHeader className="bg-gradient-to-r from-amber-50 to-amber-100 border-b border-amber-200">
                <CardTitle className="text-amber-800">معلومات المستخدم</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 p-6">
                <div className="flex justify-center mb-6">
                  <div className="w-24 h-24 rounded-full bg-blue-100 flex items-center justify-center border-4 border-white shadow-lg">
                    <User className="h-12 w-12 text-blue-600" />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-amber-50 p-4 rounded-lg border border-amber-200">
                    <h3 className="text-sm font-medium text-amber-700">الاسم</h3>
                    <p className="text-lg font-bold">{currentUser.name}</p>
                  </div>
                  <div className="bg-amber-50 p-4 rounded-lg border border-amber-200">
                    <h3 className="text-sm font-medium text-amber-700">اسم المستخدم</h3>
                    <p className="text-lg font-bold">{currentUser.username}</p>
                  </div>
                  <div className="bg-amber-50 p-4 rounded-lg border border-amber-200">
                    <h3 className="text-sm font-medium text-amber-700">الدور</h3>
                    <p className="text-lg font-bold">{currentUser.role === 'admin' ? 'مدير النظام' : 'مستخدم'}</p>
                  </div>
                  <div className="bg-amber-50 p-4 rounded-lg border border-amber-200">
                    <h3 className="text-sm font-medium text-amber-700">تاريخ آخر تسجيل دخول</h3>
                    <p className="text-lg font-bold">{new Date().toLocaleDateString('ar-EG')}</p>
                  </div>
                </div>
                
                <div className="mt-6 text-center">
                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 inline-block">
                    <p className="text-blue-800 font-bold">تم بإشراف معالي الأمين محمد سلام أمين الشباب قسم منتزة</p>
                    <p className="text-blue-600 mt-2">مشرف النظام ب/ عبدالرحمن مصطفى</p>
                  </div>
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
