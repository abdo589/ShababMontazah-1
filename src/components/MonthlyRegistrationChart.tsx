
import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart";

// Sample data for monthly registrations in 2025
const data = [
  { month: "يناير", عضو_جديد: 12 },
  { month: "فبراير", عضو_جديد: 19 },
  { month: "مارس", عضو_جديد: 8 },
  { month: "أبريل", عضو_جديد: 15 },
  { month: "مايو", عضو_جديد: 25 },
  { month: "يونيو", عضو_جديد: 14 },
  { month: "يوليو", عضو_جديد: 18 },
  { month: "أغسطس", عضو_جديد: 22 },
  { month: "سبتمبر", عضو_جديد: 17 },
  { month: "أكتوبر", عضو_جديد: 13 },
  { month: "نوفمبر", عضو_جديد: 20 },
  { month: "ديسمبر", عضو_جديد: 28 },
];

// Chart configuration
const config = {
  عضو_جديد: {
    label: "عضو جديد",
    theme: {
      light: "#10b981",
      dark: "#34d399",
    },
  },
};

const MonthlyRegistrationChart: React.FC = () => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-xl font-cairo">تسجيل الأعضاء الجدد شهرياً لعام 2025</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-80 w-full">
          <ChartContainer config={config}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={data}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip content={<ChartTooltipContent />} />
                <Legend />
                <Bar dataKey="عضو_جديد" fill="#10b981" name="عضو جديد" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default MonthlyRegistrationChart;
