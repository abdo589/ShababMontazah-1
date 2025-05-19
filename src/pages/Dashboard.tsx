
import React from "react";
import { useDashboardData } from "@/hooks/useDashboardData";

// Import refactored components
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import DashboardNav from "@/components/dashboard/DashboardNav";
import StatCards from "@/components/dashboard/StatCards";
import ChartsSection from "@/components/dashboard/ChartsSection";
import TabsSection from "@/components/dashboard/TabsSection";

const Dashboard = () => {
  const {
    currentUser,
    users,
    registrations,
    activities,
    isLoading,
    searchTerm,
    setSearchTerm,
    handleLogout,
    exportUsers,
    filteredRegistrations
  } = useDashboardData();

  // If no current user, show loading or redirect
  if (!currentUser) {
    return <div className="min-h-screen flex items-center justify-center">جاري التحميل...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      {/* Header */}
      <DashboardHeader currentUser={currentUser} handleLogout={handleLogout} />

      {/* Main Content */}
      <main className="container mx-auto py-8 px-4 animate-fade-in">
        <DashboardNav currentUser={currentUser} exportUsers={exportUsers} />
        <StatCards users={users} activities={activities} />
        <ChartsSection users={users} />

        <TabsSection
          currentUser={currentUser}
          activities={activities}
          registrations={registrations}
          filteredRegistrations={filteredRegistrations}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          exportUsers={exportUsers}
          isLoading={isLoading}
        />
      </main>
    </div>
  );
};

export default Dashboard;
