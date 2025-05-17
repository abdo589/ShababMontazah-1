
import React from "react";
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";

interface ImagePreviewDialogProps {
  selectedImage: string;
  onOpenChange: (open: boolean) => void;
}

const ImagePreviewDialog: React.FC<ImagePreviewDialogProps> = ({
  selectedImage,
  onOpenChange,
}) => {
  return (
    <Dialog open={!!selectedImage} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl max-h-screen p-0 bg-transparent border-none">
        <img 
          src={selectedImage} 
          alt="صورة الفعالية" 
          className="w-full h-auto max-h-[85vh] object-contain"
        />
      </DialogContent>
    </Dialog>
  );
};

export default ImagePreviewDialog;
