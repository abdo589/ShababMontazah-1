
import React, { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart";

// Chart configuration
const config = {
  registrations: {
    label: "التسجيلات الشهرية",
    theme: {
      light: "#22c55e",
      dark: "#16a34a",
    },
  },
};

interface MonthlyRegistrationChartProps {
  users: any[];
}

const MonthlyRegistrationChart = ({ users }: MonthlyRegistrationChartProps) => {
  const [monthlyData, setMonthlyData] = useState<any[]>([]);

  // كود جديد لحساب عدد المسجلين كل شهر بناءً على البيانات الفعلية
  useEffect(() => {
    if (users && users.length > 0) {
      // تجهيز مصفوفة للشهور باللغة العربية
      const arabicMonths = [
        "يناير", "فبراير", "مارس", "أبريل", "مايو", "يونيو",
        "يوليو", "أغسطس", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر"
      ];
      
      // إنشاء كائن لتخزين بيانات كل شهر
      const monthCounts: {[key: string]: number} = {};
      arabicMonths.forEach(month => {
        monthCounts[month] = 0;
      });
      
      // حساب عدد المسجلين لكل شهر
      users.forEach(user => {
        if (user.registeredAt) {
          const date = new Date(user.registeredAt);
          const monthIndex = date.getMonth();
          const monthName = arabicMonths[monthIndex];
          monthCounts[monthName] = (monthCounts[monthName] || 0) + 1;
        }
      });
      
      // تحويل البيانات إلى تنسيق مناسب للرسم البياني
      const formattedData = arabicMonths.map(month => ({
        name: month,
        count: monthCounts[month] || 0
      }));
      
      setMonthlyData(formattedData);
      console.log('Monthly registration data updated:', formattedData);
    } else {
      // إذا لم تكن هناك بيانات، نقدم بيانات افتراضية
      setMonthlyData([
        { name: "يناير", count: 0 },
        { name: "فبراير", count: 0 },
        { name: "مارس", count: 0 },
        { name: "أبريل", count: 0 },
        { name: "مايو", count: 0 },
        { name: "يونيو", count: 0 },
        { name: "يوليو", count: 0 },
        { name: "أغسطس", count: 0 },
        { name: "سبتمبر", count: 0 },
        { name: "أكتوبر", count: 0 },
        { name: "نوفمبر", count: 0 },
        { name: "ديسمبر", count: 0 },
      ]);
    }
  }, [users]);

  return (
    <div className="h-[300px] w-full">
      <ChartContainer config={config}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={monthlyData}
            margin={{
              top: 20,
              right: 20,
              left: 20,
              bottom: 60,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="name"
              angle={-45}
              textAnchor="end" 
              tick={{ fill: '#888', fontSize: 12 }}
              height={60}
            />
            <YAxis 
              allowDecimals={false}
              tick={{ fill: '#888', fontSize: 12 }}
            />
            <Tooltip content={<ChartTooltipContent />} />
            <Bar 
              dataKey="count" 
              name="التسجيلات" 
              fill="var(--color-registrations)"
              className="animate-fade-in"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </ChartContainer>
    </div>
  );
};

export default MonthlyRegistrationChart;
