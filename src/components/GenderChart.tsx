
import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  Legend,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart";

// Sample data for gender distribution
const data = [
  {
    name: "توزيع الشباب حسب الجنس",
    ذكور: 65,
    إناث: 35,
  },
];

// Chart configuration
const config = {
  ذكور: {
    label: "ذكور",
    theme: {
      light: "#2563eb",
      dark: "#3b82f6",
    },
  },
  إناث: {
    label: "إناث",
    theme: {
      light: "#db2777",
      dark: "#ec4899",
    },
  },
};

const COLORS = ["#2563eb", "#db2777"];

const GenderChart: React.FC = () => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-xl font-cairo">توزيع الأعضاء حسب الجنس</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-80 w-full">
          <ChartContainer config={config}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={data}
                layout="vertical"
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" domain={[0, 100]} tickFormatter={(value) => `${value}%`} />
                <YAxis dataKey="name" type="category" hide />
                <Tooltip content={<ChartTooltipContent />} formatter={(value) => `${value}%`} />
                <Legend />
                <Bar dataKey="ذكور" fill="#2563eb" name="ذكور" stackId="a" radius={[0, 4, 4, 0]}>
                  <Cell fill={COLORS[0]} />
                </Bar>
                <Bar dataKey="إناث" fill="#db2777" name="إناث" stackId="a" radius={[0, 4, 4, 0]}>
                  <Cell fill={COLORS[1]} />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default GenderChart;
