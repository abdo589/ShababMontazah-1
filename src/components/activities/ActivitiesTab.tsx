
import React from "react";
import { Button } from "@/components/ui/button";
import ActivityCard from "./ActivityCard";

interface ActivitiesTabProps {
  activities: {
    id: number;
    title: string;
    description: string;
    date: string;
    category: string;
    images: number[];
    registrationRequired?: boolean;
  }[];
  activityImages: string[];
  onActivityClick: (activity: any) => void;
}

const ActivitiesTab: React.FC<ActivitiesTabProps> = ({
  activities,
  activityImages,
  onActivityClick,
}) => {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {activities.map((activity) => (
          <ActivityCard
            key={activity.id}
            id={activity.id}
            title={activity.title}
            description={activity.description}
            date={activity.date}
            images={activity.images}
            activityImages={activityImages}
            onClick={onActivityClick}
          />
        ))}
      </div>
      
      <div className="text-center mt-12">
        <Button className="btn-primary px-8 py-6 text-lg font-cairo bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 transition-all duration-300 transform hover:scale-105 shadow-lg">
          عرض جميع الفعاليات
        </Button>
      </div>
    </>
  );
};

export default ActivitiesTab;
