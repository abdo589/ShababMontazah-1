
import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";

// Colors for the chart
const COLORS = ["#0088FE", "#FF8042"];

// Chart configuration
const config = {
  gender: {
    label: "توزيع النوع",
    theme: {
      light: "#6366f1",
      dark: "#818cf8",
    },
  },
};

interface GenderChartProps {
  users: any[];
}

const GenderChart = ({ users }: GenderChartProps) => {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    if (users && users.length > 0) {
      // Count male and female users
      const maleCount = users.filter(user => user.gender === "ذكر").length;
      const femaleCount = users.filter(user => user.gender === "أنثى").length;
      
      setData([
        { name: "ذكور", value: maleCount || 0 },
        { name: "إناث", value: femaleCount || 0 },
      ]);
      
      console.log('Gender data updated:', maleCount, femaleCount);
    } else {
      // Default data if no users
      setData([
        { name: "ذكور", value: 0 },
        { name: "إناث", value: 0 },
      ]);
    }
  }, [users]);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-xl font-cairo">نسبة الشباب والبنات</CardTitle>
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

export default GenderChart;
