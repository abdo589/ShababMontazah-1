
import React from "react";
import { Button } from "@/components/ui/button";
import { Search, FileText } from "lucide-react";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";

interface UsersTableProps {
  registrations: any[];
  filteredRegistrations: any[];
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  exportUsers: () => void;
  isLoading: boolean;
}

const UsersTable = ({ 
  registrations,
  filteredRegistrations, 
  searchTerm, 
  setSearchTerm, 
  exportUsers,
  isLoading
}: UsersTableProps) => {
  return (
    <>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="h-4 w-4 absolute top-3 right-3 text-gray-400" />
            <input
              type="text"
              placeholder="بحث..."
              className="pl-4 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        <Button 
          size="sm" 
          onClick={exportUsers} 
          className="flex items-center gap-2 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 transition-all duration-300"
        >
          <FileText className="h-4 w-4" />
          تصدير للإكسيل
        </Button>
      </div>

      {isLoading ? (
        <div className="text-center py-4">جاري تحميل البيانات...</div>
      ) : (
        <Table>
          <TableHeader className="bg-green-50">
            <TableRow>
              <TableHead className="font-bold text-green-700">الاسم</TableHead>
              <TableHead className="font-bold text-green-700">النوع</TableHead>
              <TableHead className="font-bold text-green-700">رقم الهاتف</TableHead>
              <TableHead className="font-bold text-green-700">الرقم القومي</TableHead>
              <TableHead className="font-bold text-green-700">المنطقة</TableHead>
              <TableHead className="font-bold text-green-700">تاريخ التسجيل</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredRegistrations.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                  {searchTerm ? "لا توجد نتائج للبحث" : "لا توجد بيانات للعرض"}
                </TableCell>
              </TableRow>
            ) : (
              filteredRegistrations.map((user) => (
                <TableRow key={user.id} className="hover:bg-green-50 transition-colors">
                  <TableCell className="font-medium">{user.name}</TableCell>
                  <TableCell>{user.gender}</TableCell>
                  <TableCell>{user.phone}</TableCell>
                  <TableCell>{user.national_id}</TableCell>
                  <TableCell>{user.position}</TableCell>
                  <TableCell>
                    {new Date(user.created_at).toLocaleDateString('ar-EG')}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      )}
    </>
  );
};

export default UsersTable;
