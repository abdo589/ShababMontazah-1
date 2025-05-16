
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart";
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  Legend, 
  CartesianGrid 
} from "recharts";
import React, { useEffect, useState } from 'react';

// Function to prepare data for the chart
const prepareMonthlyData = (users: any[]) => {
  const months = [
    "يناير", "فبراير", "مارس", "إبريل", "مايو", "يونيو",
    "يوليو", "أغسطس", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر"
  ];
  
  // Initialize data array with all months
  const initialData = months.map((month, index) => ({
    name: month,
    // Month index in Date is 0-based
    month: index,
    registrations: 0
  }));
  
  // Count registrations by month
  users.forEach(user => {
    if (user.registeredAt) {
      const date = new Date(user.registeredAt);
      const monthIndex = date.getMonth();
      initialData[monthIndex].registrations += 1;
    }
  });
  
  return initialData;
};

// Chart configuration
const config = {
  registrations: {
    label: "عدد التسجيلات",
    theme: {
      light: "#2563eb",
      dark: "#3b82f6",
    },
  },
};

interface MonthlyRegistrationChartProps {
  users: any[];
}

const MonthlyRegistrationChart = ({ users }: MonthlyRegistrationChartProps) => {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    if (users && users.length > 0) {
      const monthlyData = prepareMonthlyData(users);
      setData(monthlyData);
    } else {
      // Set default data if no users
      setData(prepareMonthlyData([]));
    }
  }, [users]);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-xl font-cairo">التسجيلات الشهرية</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-80 w-full">
          <ChartContainer config={config}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tickMargin={10}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tickMargin={10}
                />
                <Tooltip content={<ChartTooltipContent />} />
                <Legend verticalAlign="top" height={36} />
                <Bar 
                  dataKey="registrations" 
                  name="عدد التسجيلات" 
                  fill="#3b82f6" 
                  radius={[4, 4, 0, 0]} 
                  className="animate-fade-in"
                />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default MonthlyRegistrationChart;
