
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

export const useDashboardData = () => {
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
          console.log("Fetched registrations:", data);
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
    
    // Set up enhanced realtime subscription for new registrations
    const channel = supabase
      .channel('real-time-registrations')
      .on('postgres_changes', { 
        event: 'INSERT', 
        schema: 'public', 
        table: 'member_registrations' 
      }, (payload) => {
        console.log('Dashboard: New registration received:', payload.new);
        
        // Update the registrations array with the new registration at the top
        const newRegistration = payload.new as any;
        
        setRegistrations(prev => {
          // Check if this registration is already in the list
          const exists = prev.some(reg => reg.id === newRegistration.id);
          if (exists) return prev;
          return [newRegistration, ...prev];
        });
        
        // Update the users array for charts
        setUsers(prev => {
          const newUser = {
            id: prev.length + 1,
            name: newRegistration.name,
            phone: newRegistration.phone,
            registeredAt: newRegistration.created_at,
            gender: newRegistration.gender
          };
          return [newUser, ...prev];
        });
        
        // Show a toast notification
        toast({
          title: "انضم إلينا",
          description: `تم تسجيل ${newRegistration.name} بنجاح`,
          variant: "success",
        });
      })
      .subscribe((status) => {
        console.log("Subscription status:", status);
      });
    
    // Load activities - updated with 2025 dates
    const mockActivities = [
      { id: 1, name: "افطار صائم", date: "2025", participants: 45 },
      { id: 2, name: "توزيع مواد غذائية", date: "2025", participants: 32 },
      { id: 3, name: "اجتماع مع قيادات الشباب", date: "2025", participants: 15 },
      { id: 4, name: "فعالية التوعية المجتمعية", date: "2025", participants: 40 },
    ];
    setActivities(mockActivities);
    
    return () => {
      console.log("Removing Supabase channel");
      supabase.removeChannel(channel);
    };
  }, [navigate, toast]);

  // Filter registrations based on search term
  const filteredRegistrations = registrations.filter(user => 
    user.name?.includes(searchTerm) || 
    user.phone?.includes(searchTerm) || 
    user.national_id?.includes(searchTerm) ||
    user.position?.includes(searchTerm)
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

  return {
    currentUser,
    users,
    registrations,
    activities,
    isLoading,
    searchTerm,
    setSearchTerm,
    handleLogout,
    exportUsers,
    filteredRegistrations
  };
};
