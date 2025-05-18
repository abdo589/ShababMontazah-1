
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronLeft, Download } from "lucide-react";

interface DashboardNavProps {
  currentUser: any;
  exportUsers: () => void;
}

const DashboardNav = ({ currentUser, exportUsers }: DashboardNavProps) => {
  const navigate = useNavigate();
  
  return (
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
  );
};

export default DashboardNav;
