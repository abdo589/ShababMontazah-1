
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ActivitiesTab from "./activities/ActivitiesTab";
import VideosTab from "./activities/VideosTab";
import ActivityDetailsDialog from "./activities/ActivityDetailsDialog";
import ImagePreviewDialog from "./activities/ImagePreviewDialog";
import { activityImages, activities, videos } from "./activities/constants";

const ActivitiesSection = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState<any>(null);
  const [selectedImage, setSelectedImage] = useState("");
  const [activeTab, setActiveTab] = useState("activities");

  // Handle activity click
  const handleActivityClick = (activity: any) => {
    setSelectedActivity(activity);
    setOpenDialog(true);
  };
  
  // Open image preview
  const handleImageClick = (imageSrc: string) => {
    setSelectedImage(imageSrc);
  };

  // Handle registration click
  const handleRegisterClick = () => {
    window.location.href = "/login";
  };

  return (
    <section id="activities" className="py-20 bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto px-4">
        {/* Section Title */}
        <h2 className="section-title mb-8 text-center">الفعاليات والمرئيات</h2>
        
        {/* Tabs for Activities and Videos */}
        <Tabs 
          defaultValue="activities" 
          className="mb-10"
          onValueChange={(value) => setActiveTab(value)}
        >
          <div className="flex justify-center mb-8">
            <TabsList className="bg-blue-100">
              <TabsTrigger value="activities" className="px-8 py-2 text-lg font-cairo">الفعاليات</TabsTrigger>
              <TabsTrigger value="videos" className="px-8 py-2 text-lg font-cairo">الفيديوهات</TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="activities">
            <ActivitiesTab 
              activities={activities} 
              activityImages={activityImages} 
              onActivityClick={handleActivityClick} 
            />
          </TabsContent>
          
          <TabsContent value="videos">
            <VideosTab videos={videos} />
          </TabsContent>
        </Tabs>
      </div>
      
      {/* Activity Details Dialog */}
      <ActivityDetailsDialog 
        open={openDialog}
        onOpenChange={setOpenDialog}
        activity={selectedActivity}
        activityImages={activityImages}
        onImageClick={handleImageClick}
        onRegisterClick={handleRegisterClick}
      />
      
      {/* Full Image Preview */}
      <ImagePreviewDialog 
        selectedImage={selectedImage} 
        onOpenChange={() => setSelectedImage("")} 
      />
    </section>
  );
};

export default ActivitiesSection;
