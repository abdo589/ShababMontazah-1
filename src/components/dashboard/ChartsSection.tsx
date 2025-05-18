
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import GenderChart from "@/components/GenderChart";
import MonthlyRegistrationChart from "@/components/MonthlyRegistrationChart";
import ActivityAttendanceChart from "@/components/ActivityAttendanceChart";

interface ChartsSectionProps {
  users: any[];
}

const ChartsSection = ({ users }: ChartsSectionProps) => {
  return (
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
  );
};

export default ChartsSection;
