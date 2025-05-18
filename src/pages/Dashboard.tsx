
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { supabase } from "@/integrations/supabase/client";

// Import refactored components
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import DashboardNav from "@/components/dashboard/DashboardNav";
import StatCards from "@/components/dashboard/StatCards";
import ChartsSection from "@/components/dashboard/ChartsSection";
import ActivitiesTable from "@/components/dashboard/ActivitiesTable";
import UsersTable from "@/components/dashboard/UsersTable";
import ProfileCard from "@/components/dashboard/ProfileCard";

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
      <DashboardHeader currentUser={currentUser} handleLogout={handleLogout} />

      {/* Main Content */}
      <main className="container mx-auto py-8 px-4 animate-fade-in">
        <DashboardNav currentUser={currentUser} exportUsers={exportUsers} />
        <StatCards users={users} activities={activities} />
        <ChartsSection users={users} />

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
                <ActivitiesTable activities={activities} />
              </CardContent>
            </Card>
          </TabsContent>
          
          {currentUser.role === 'admin' && (
            <TabsContent value="users" className="space-y-4">
              <Card className="hover:shadow-lg transition-all duration-300 border-green-200">
                <CardHeader className="bg-gradient-to-r from-green-50 to-green-100 border-b border-green-200">
                  <CardTitle className="text-green-800">المستخدمين المسجلين</CardTitle>
                </CardHeader>
                <CardContent className="p-4">
                  <UsersTable 
                    registrations={registrations}
                    filteredRegistrations={filteredRegistrations} 
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                    exportUsers={exportUsers}
                    isLoading={isLoading}
                  />
                </CardContent>
              </Card>
            </TabsContent>
          )}
          
          <TabsContent value="profile" className="space-y-4">
            <Card className="hover:shadow-lg transition-all duration-300 border-amber-200">
              <CardHeader className="bg-gradient-to-r from-amber-50 to-amber-100 border-b border-amber-200">
                <CardTitle className="text-amber-800">معلومات المستخدم</CardTitle>
              </CardHeader>
              <CardContent>
                <ProfileCard currentUser={currentUser} />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Dashboard;
