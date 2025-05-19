
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ActivitiesTable from "./ActivitiesTable";
import UsersTable from "./UsersTable";
import ProfileCard from "./ProfileCard";

interface TabsSectionProps {
  currentUser: any;
  activities: any[];
  registrations: any[];
  filteredRegistrations: any[];
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  exportUsers: () => void;
  isLoading: boolean;
}

const TabsSection = ({
  currentUser,
  activities,
  registrations,
  filteredRegistrations,
  searchTerm,
  setSearchTerm,
  exportUsers,
  isLoading
}: TabsSectionProps) => {
  return (
    <Tabs defaultValue="activities" className="space-y-4">
      <TabsList className="bg-blue-100 p-1 rounded-xl">
        <TabsTrigger value="activities" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white rounded-lg px-6 py-2">الفعاليات</TabsTrigger>
        {currentUser.role === 'admin' && (
          <TabsTrigger value="users" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white rounded-lg px-6 py-2">المستخدمين</TabsTrigger>
        )}
        <TabsTrigger value="profile" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white rounded-lg px-6 py-2">الملف الشخصي</TabsTrigger>
      </TabsList>
      
      <TabsContent value="activities" className="space-y-4">
        <Card className="hover:shadow-lg transition-all duration-300 border-blue-200">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-blue-100 border-b border-blue-200">
            <CardTitle className="text-blue-800">الفعاليات القادمة</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <ActivitiesTable activities={activities} />
          </CardContent>
        </Card>
      </TabsContent>
      
      {currentUser.role === 'admin' && (
        <TabsContent value="users" className="space-y-4">
          <Card className="hover:shadow-lg transition-all duration-300 border-green-200">
            <CardHeader className="bg-gradient-to-r from-green-50 to-green-100 border-b border-green-200">
              <CardTitle className="text-green-800">المستخدمين المسجلين</CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <UsersTable 
                registrations={registrations}
                filteredRegistrations={filteredRegistrations} 
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                exportUsers={exportUsers}
                isLoading={isLoading}
              />
            </CardContent>
          </Card>
        </TabsContent>
      )}
      
      <TabsContent value="profile" className="space-y-4">
        <Card className="hover:shadow-lg transition-all duration-300 border-amber-200">
          <CardHeader className="bg-gradient-to-r from-amber-50 to-amber-100 border-b border-amber-200">
            <CardTitle className="text-amber-800">معلومات المستخدم</CardTitle>
          </CardHeader>
          <CardContent>
            <ProfileCard currentUser={currentUser} />
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
};

export default TabsSection;
