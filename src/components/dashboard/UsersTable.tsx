
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Search, FileText, Download, FileExcel } from "lucide-react";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";

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
  const [isExporting, setIsExporting] = useState(false);
  const { toast } = useToast();
  
  // تحسين وظيفة التصدير مع تقدم العملية
  const handleExport = async () => {
    try {
      setIsExporting(true);
      toast({
        title: "جاري تصدير البيانات...",
        description: "يرجى الانتظار حتى اكتمال عملية التصدير",
      });
      
      // تأخير مصطنع لإظهار تجربة مستخدم أفضل (في الإنتاج قد لا تحتاج لهذا)
      setTimeout(() => {
        exportUsers();
        setIsExporting(false);
      }, 800);
    } catch (error) {
      toast({
        title: "خطأ في التصدير",
        description: "حدث خطأ أثناء تصدير البيانات، يرجى المحاولة مرة أخرى",
        variant: "destructive",
      });
      setIsExporting(false);
    }
  };

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
              value={searchTerm}
            />
          </div>
        </div>
        <div className="flex gap-2">
          <Button 
            size="sm" 
            onClick={handleExport} 
            disabled={isExporting || registrations.length === 0}
            className="flex items-center gap-2 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 transition-all duration-300"
          >
            {isExporting ? (
              <>
                <div className="animate-spin mr-1 h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
                جاري التصدير...
              </>
            ) : (
              <>
                <FileExcel className="h-4 w-4" />
                تصدير للإكسيل
              </>
            )}
          </Button>
          
          <Button 
            size="sm" 
            onClick={handleExport} 
            disabled={isExporting || registrations.length === 0}
            className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 transition-all duration-300"
          >
            <Download className="h-4 w-4" />
            تصدير PDF
          </Button>
        </div>
      </div>

      {isLoading ? (
        <div className="text-center py-12 bg-white rounded-md shadow-sm border border-gray-100">
          <div className="animate-spin mx-auto mb-4 h-8 w-8 border-4 border-blue-500 border-t-transparent rounded-full"></div>
          <p className="text-gray-600">جاري تحميل البيانات...</p>
        </div>
      ) : (
        <div className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-200">
          <Table>
            <TableHeader className="bg-gradient-to-r from-green-50 to-blue-50">
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
                  <TableCell colSpan={6} className="text-center py-12 text-gray-500">
                    {searchTerm ? (
                      <>
                        <div className="mx-auto mb-2 h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center">
                          <Search className="h-6 w-6 text-gray-400" />
                        </div>
                        <p>لا توجد نتائج للبحث عن "{searchTerm}"</p>
                        <p className="text-sm text-gray-400 mt-1">يرجى تغيير كلمات البحث والمحاولة مرة أخرى</p>
                      </>
                    ) : (
                      <>
                        <div className="mx-auto mb-2 h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center">
                          <FileText className="h-6 w-6 text-gray-400" />
                        </div>
                        <p>لا توجد بيانات للعرض</p>
                        <p className="text-sm text-gray-400 mt-1">سيتم عرض التسجيلات الجديدة هنا</p>
                      </>
                    )}
                  </TableCell>
                </TableRow>
              ) : (
                filteredRegistrations.map((user) => (
                  <TableRow key={user.id} className="hover:bg-green-50 transition-colors">
                    <TableCell className="font-medium">{user.name}</TableCell>
                    <TableCell>{user.gender}</TableCell>
                    <TableCell>{user.phone}</TableCell>
                    <TableCell>
                      {/* إخفاء جزء من الرقم القومي لأغراض الأمان */}
                      {user.national_id?.slice(0, 3)}******{user.national_id?.slice(-4)}
                    </TableCell>
                    <TableCell>{user.position}</TableCell>
                    <TableCell>
                      {new Date(user.created_at).toLocaleDateString('ar-EG')}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      )}
    </>
  );
};

export default UsersTable;
