
import React from "react";
import VideoCard from "./VideoCard";

interface VideosTabProps {
  videos: {
    id: number;
    title: string;
    description: string;
    thumbnail: string;
    url: string;
  }[];
}

const VideosTab: React.FC<VideosTabProps> = ({ videos }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
      {videos.map((video) => (
        <VideoCard
          key={video.id}
          id={video.id}
          title={video.title}
          description={video.description}
          thumbnail={video.thumbnail}
          url={video.url}
        />
      ))}
    </div>
  );
};

export default VideosTab;
