
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
import {
  ChevronLeft,
  Download,
  LogOut,
  User,
} from "lucide-react";
import GenderChart from "@/components/GenderChart";

const Dashboard = () => {
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [users, setUsers] = useState<any[]>([]);
  const [activities, setActivities] = useState<any[]>([]);
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
    
    // Load users and activities
    const storedUsers = localStorage.getItem("users");
    if (storedUsers) {
      setUsers(JSON.parse(storedUsers));
    }
    
    // Load activities - updated with 2025 dates
    const mockActivities = [
      { id: 1, name: "صلاة عيد الفطر المبارك", date: "2025", participants: 45 },
      { id: 2, name: "توزيع كراتين رمضان", date: "2025", participants: 32 },
      { id: 3, name: "حملة مساعدات غذائية", date: "2025", participants: 28 },
      { id: 4, name: "اجتماع مع قيادات الشباب", date: "2025", participants: 15 },
      { id: 5, name: "فعالية التوعية المجتمعية", date: "2025", participants: 40 },
    ];
    setActivities(mockActivities);
  }, [navigate]);

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
    const data = users.map(user => ({
      الاسم: user.name,
      البريد_الإلكتروني: user.email,
      رقم_الهاتف: user.phone,
      تاريخ_التسجيل: new Date(user.registeredAt).toLocaleDateString('ar-EG')
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
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-party-blue text-white p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <img 
              src="/lovable-uploads/4360289e-76c2-450e-a6fe-46e70be12fa0.png" 
              alt="شعار الحزب" 
              className="w-10 h-10"
            />
            <h1 className="text-xl font-bold">لوحة التحكم</h1>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-2">
              <User className="h-5 w-5" />
              <span>{currentUser.name}</span>
            </div>
            <Button variant="outline" size="sm" onClick={handleLogout}>
              <LogOut className="h-4 w-4 ml-2" />
              تسجيل الخروج
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto py-8 px-4">
        <div className="flex justify-between items-center mb-6">
          <Button variant="ghost" onClick={() => navigate("/")}>
            <ChevronLeft className="h-4 w-4 ml-2" />
            العودة للصفحة الرئيسية
          </Button>
          
          {currentUser.role === 'admin' && (
            <Button onClick={exportUsers} className="flex items-center gap-2">
              <Download className="h-4 w-4" />
              تصدير بيانات المستخدمين
            </Button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                إجمالي المستخدمين
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{users.length}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                إجمالي الفعاليات
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{activities.length}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
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

        {/* Gender Distribution Chart */}
        <div className="mb-8">
          <GenderChart />
        </div>

        <Tabs defaultValue="activities" className="space-y-4">
          <TabsList>
            <TabsTrigger value="activities">الفعاليات</TabsTrigger>
            {currentUser.role === 'admin' && (
              <TabsTrigger value="users">المستخدمين</TabsTrigger>
            )}
            <TabsTrigger value="profile">الملف الشخصي</TabsTrigger>
          </TabsList>
          
          <TabsContent value="activities" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>الفعاليات القادمة</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>اسم الفعالية</TableHead>
                      <TableHead>التاريخ</TableHead>
                      <TableHead>عدد المشاركين</TableHead>
                      <TableHead className="w-[100px]">الإجراءات</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {activities.map((activity) => (
                      <TableRow key={activity.id}>
                        <TableCell className="font-medium">{activity.name}</TableCell>
                        <TableCell>{activity.date}</TableCell>
                        <TableCell>{activity.participants}</TableCell>
                        <TableCell>
                          <Button size="sm" variant="outline">المزيد</Button>
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
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle>المستخدمين المسجلين</CardTitle>
                  <Button size="sm" onClick={exportUsers} className="flex items-center gap-2">
                    <Download className="h-4 w-4" />
                    تصدير للإكسيل
                  </Button>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>الاسم</TableHead>
                        <TableHead>البريد الإلكتروني</TableHead>
                        <TableHead>رقم الهاتف</TableHead>
                        <TableHead>تاريخ التسجيل</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {users.map((user) => (
                        <TableRow key={user.id}>
                          <TableCell className="font-medium">{user.name}</TableCell>
                          <TableCell>{user.email}</TableCell>
                          <TableCell>{user.phone}</TableCell>
                          <TableCell>
                            {new Date(user.registeredAt).toLocaleDateString('ar-EG')}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
          )}
          
          <TabsContent value="profile" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>معلومات المستخدم</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">الاسم</h3>
                    <p className="text-lg">{currentUser.name}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">اسم المستخدم</h3>
                    <p className="text-lg">{currentUser.username}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">البريد الإلكتروني</h3>
                    <p className="text-lg">{currentUser.email}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">رقم الهاتف</h3>
                    <p className="text-lg">{currentUser.phone}</p>
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
