
import React from "react";
import { Button } from "@/components/ui/button";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";

interface ActivitiesTableProps {
  activities: any[];
}

const ActivitiesTable = ({ activities }: ActivitiesTableProps) => {
  return (
    <Table>
      <TableHeader className="bg-blue-50">
        <TableRow>
          <TableHead className="font-bold text-blue-700">اسم الفعالية</TableHead>
          <TableHead className="font-bold text-blue-700">التاريخ</TableHead>
          <TableHead className="font-bold text-blue-700">عدد المشاركين</TableHead>
          <TableHead className="font-bold text-blue-700 w-[100px]">الإجراءات</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {activities.map((activity) => (
          <TableRow key={activity.id} className="hover:bg-blue-50 transition-colors">
            <TableCell className="font-medium">{activity.name}</TableCell>
            <TableCell>{activity.date}</TableCell>
            <TableCell>{activity.participants}</TableCell>
            <TableCell>
              <Button size="sm" variant="outline" className="hover:bg-blue-500 hover:text-white transition-colors">المزيد</Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default ActivitiesTable;
