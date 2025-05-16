
import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart";

// Updated activity data with proper names
const data = [
  { name: "افطار صائم", value: 80 },
  { name: "توزيع مواد غذائية", value: 70 },
  { name: "اجتماع مع قيادات الشباب", value: 40 },
  { name: "فعالية التوعية المجتمعية", value: 60 },
];

const COLORS = ["#2563eb", "#10b981", "#8b5cf6", "#ec4899"];

// Chart configuration
const config = {
  attendance: {
    label: "نسبة الحضور",
    theme: {
      light: "#6366f1",
      dark: "#818cf8",
    },
  },
};

const ActivityAttendanceChart: React.FC = () => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-xl font-cairo">نسب الحضور في الفعاليات</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-80 w-full">
          <ChartContainer config={config}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  labelLine={true}
                  outerRadius={120}
                  fill="#8884d8"
                  dataKey="value"
                  nameKey="name"
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  className="animate-fade-in"
                >
                  {data.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={COLORS[index % COLORS.length]}
                      className="hover-scale" 
                    />
                  ))}
                </Pie>
                <Tooltip content={<ChartTooltipContent />} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default ActivityAttendanceChart;
