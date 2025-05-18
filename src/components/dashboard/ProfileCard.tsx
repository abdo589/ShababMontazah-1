
import React from "react";
import { User } from "lucide-react";

interface ProfileCardProps {
  currentUser: any;
}

const ProfileCard = ({ currentUser }: ProfileCardProps) => {
  return (
    <div className="space-y-4 p-6">
      <div className="flex justify-center mb-6">
        <div className="w-24 h-24 rounded-full bg-blue-100 flex items-center justify-center border-4 border-white shadow-lg">
          <User className="h-12 w-12 text-blue-600" />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-amber-50 p-4 rounded-lg border border-amber-200">
          <h3 className="text-sm font-medium text-amber-700">الاسم</h3>
          <p className="text-lg font-bold">{currentUser.name}</p>
        </div>
        <div className="bg-amber-50 p-4 rounded-lg border border-amber-200">
          <h3 className="text-sm font-medium text-amber-700">اسم المستخدم</h3>
          <p className="text-lg font-bold">{currentUser.username}</p>
        </div>
        <div className="bg-amber-50 p-4 rounded-lg border border-amber-200">
          <h3 className="text-sm font-medium text-amber-700">الدور</h3>
          <p className="text-lg font-bold">{currentUser.role === 'admin' ? 'مدير النظام' : 'مستخدم'}</p>
        </div>
        <div className="bg-amber-50 p-4 rounded-lg border border-amber-200">
          <h3 className="text-sm font-medium text-amber-700">تاريخ آخر تسجيل دخول</h3>
          <p className="text-lg font-bold">{new Date().toLocaleDateString('ar-EG')}</p>
        </div>
      </div>
      
      <div className="mt-6 text-center">
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 inline-block">
          <p className="text-blue-800 font-bold">تم بإشراف معالي الأمين محمد سلام أمين الشباب قسم منتزة</p>
          <p className="text-blue-600 mt-2">مشرف النظام ب/ عبدالرحمن مصطفى</p>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
