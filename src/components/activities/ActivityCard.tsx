
import React from "react";
import { Card, CardContent } from "@/components/ui/card";

interface ActivityCardProps {
  id: number;
  title: string;
  description: string;
  date: string;
  images: number[];
  activityImages: string[];
  onClick: (activity: any) => void;
}

const ActivityCard: React.FC<ActivityCardProps> = ({
  id,
  title,
  description,
  date,
  images,
  activityImages,
  onClick,
}) => {
  const activity = { id, title, description, date, images };

  return (
    <Card
      className="overflow-hidden hover:shadow-xl transition-all duration-300 card-hover border-none animate-fade-in"
      onClick={() => onClick(activity)}
    >
      <div className="aspect-video overflow-hidden">
        <img 
          src={activityImages[images[0]]} 
          alt={title}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
        />
      </div>
      <CardContent className="p-6 bg-gradient-to-br from-blue-50 to-white">
        <div className="mb-2 text-sm text-party-blue-dark font-semibold">{date}</div>
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-gray-600 mb-4 line-clamp-2">{description}</p>
        <div className="flex gap-2">
          {images.slice(0, 3).map((imageIndex: number, idx: number) => (
            <div key={idx} className="w-12 h-12 rounded-md overflow-hidden hover:scale-110 transition-transform">
              <img 
                src={activityImages[imageIndex]} 
                alt=""
                className="w-full h-full object-cover"
              />
            </div>
          ))}
          {images.length > 3 && (
            <div className="w-12 h-12 rounded-md bg-party-blue-light flex items-center justify-center text-white text-xs">
              +{images.length - 3}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ActivityCard;
