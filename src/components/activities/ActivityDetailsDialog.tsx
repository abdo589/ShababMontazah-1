
import React from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface ActivityDetailsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  activity: {
    id: number;
    title: string;
    description: string;
    date: string;
    images: number[];
    registrationRequired?: boolean;
  } | null;
  activityImages: string[];
  onImageClick: (imageSrc: string) => void;
  onRegisterClick: () => void;
}

const ActivityDetailsDialog: React.FC<ActivityDetailsDialogProps> = ({
  open,
  onOpenChange,
  activity,
  activityImages,
  onImageClick,
  onRegisterClick,
}) => {
  if (!activity) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-cairo mb-2">{activity.title}</DialogTitle>
          <DialogDescription className="text-base text-gray-700">
            {activity.description}
          </DialogDescription>
        </DialogHeader>
        <div className="mt-4">
          <h4 className="font-semibold mb-3">الصور</h4>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
            {activity.images.map((imageIndex: number, idx: number) => (
              <div 
                key={idx} 
                className="aspect-square rounded-md overflow-hidden cursor-pointer hover:opacity-90 hover:scale-105 transition-transform"
                onClick={() => onImageClick(activityImages[imageIndex])}
              >
                <img 
                  src={activityImages[imageIndex]} 
                  alt=""
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>
        
        {activity.registrationRequired && (
          <div className="mt-6">
            <Button 
              className="w-full py-5 text-lg bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 transition-all duration-300 transform hover:scale-105"
              onClick={onRegisterClick}
            >
              التسجيل للمشاركة في هذه الفعالية
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ActivityDetailsDialog;
