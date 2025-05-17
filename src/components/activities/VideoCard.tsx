
import React from "react";
import { Card, CardContent } from "@/components/ui/card";

interface VideoCardProps {
  id: number;
  title: string;
  description: string;
  thumbnail: string;
  url: string;
}

const VideoCard: React.FC<VideoCardProps> = ({
  title,
  description,
  thumbnail,
  url,
}) => {
  return (
    <Card
      className="overflow-hidden hover:shadow-xl transition-all duration-300 card-hover border-none animate-fade-in"
    >
      <a href={url} target="_blank" rel="noopener noreferrer" className="block">
        <div className="aspect-video overflow-hidden relative">
          <img 
            src={thumbnail} 
            alt={title}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
            <div className="w-16 h-16 rounded-full bg-white bg-opacity-80 flex items-center justify-center">
              <div className="w-0 h-0 border-t-8 border-t-transparent border-b-8 border-b-transparent border-l-16 border-l-blue-600 ml-2"></div>
            </div>
          </div>
        </div>
        <CardContent className="p-6 bg-gradient-to-br from-blue-50 to-white">
          <h3 className="text-xl font-bold mb-2">{title}</h3>
          <p className="text-gray-600">{description}</p>
        </CardContent>
      </a>
    </Card>
  );
};

export default VideoCard;
