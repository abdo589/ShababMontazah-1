
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronLeft, Download, FileExcel, FilePdf } from "lucide-react";

interface DashboardNavProps {
  currentUser: any;
  exportUsers: () => void;
}

const DashboardNav = ({ currentUser, exportUsers }: DashboardNavProps) => {
  const navigate = useNavigate();
  
  return (
    <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
      <Button 
        variant="ghost" 
        onClick={() => navigate("/")}
        className="hover:bg-blue-100 transition-all duration-300 w-full sm:w-auto"
      >
        <ChevronLeft className="h-4 w-4 ml-2" />
        العودة للصفحة الرئيسية
      </Button>
      
      <div className="flex gap-2 w-full sm:w-auto justify-center sm:justify-end">
        {currentUser.role === 'admin' && (
          <>
            <Button 
              onClick={exportUsers} 
              className="flex items-center gap-2 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 transition-all duration-300"
            >
              <FileExcel className="h-4 w-4" />
              <span className="hidden md:inline">تصدير Excel</span>
              <span className="inline md:hidden">Excel</span>
            </Button>
            
            <Button 
              onClick={exportUsers} 
              className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 transition-all duration-300"
            >
              <FilePdf className="h-4 w-4" />
              <span className="hidden md:inline">تصدير PDF</span>
              <span className="inline md:hidden">PDF</span>
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default DashboardNav;
