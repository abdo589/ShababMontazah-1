
import React from "react";
import { Button } from "@/components/ui/button";
import { LogOut, User } from "lucide-react";

interface DashboardHeaderProps {
  currentUser: any;
  handleLogout: () => void;
}

const DashboardHeader = ({ currentUser, handleLogout }: DashboardHeaderProps) => {
  return (
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
  );
};

export default DashboardHeader;
