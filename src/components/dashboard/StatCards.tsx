
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Calendar, Activity } from "lucide-react";

interface StatCardsProps {
  users: any[];
  activities: any[];
}

const StatCards = ({ users, activities }: StatCardsProps) => {
  return (
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
  );
};

export default StatCards;
