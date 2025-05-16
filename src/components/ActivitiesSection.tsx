
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

// Activity images from the uploaded content
const activityImages = [
  "/lovable-uploads/3be61202-134c-40ba-9c43-c30c7e7e4895.png",
  "/lovable-uploads/ae2f7021-e9fa-49fb-abe0-4522392cdf89.png",
  "/lovable-uploads/e73ad17e-8d94-40ff-8a48-720be57ab6d7.png",
  "/lovable-uploads/9dbf6224-11a6-467e-8d8a-a2c86db2c3f2.png",
  "/lovable-uploads/4b52d8d0-4a15-4bfa-ada9-6def708a1c92.png",
  "/lovable-uploads/069ca759-fdca-485f-879d-e08e9f5642bb.png",
  "/lovable-uploads/c1fc3ed4-52f9-47d3-b7ad-c6782037f293.png",
  "/lovable-uploads/e309460b-29bc-4b1c-bc36-f4760f73ba8b.png",
  "/lovable-uploads/f3db1ccf-c3c5-40c6-b1d3-66138860177a.png",
  "/lovable-uploads/8027bd05-dc91-42ec-b09d-72c155abd153.png",
  "/lovable-uploads/0094ba79-149c-4140-8a6e-cc27d3140d13.png",
  "/lovable-uploads/6069b162-64bb-4cfc-b35c-858ccd3c60ae.png",
  "/lovable-uploads/c13a4430-a01f-4182-b89f-4b6268912187.png",
  "/lovable-uploads/d4b251f5-19f9-44aa-8de3-4fa4b075370c.png",
  "/lovable-uploads/a35fc10c-bd93-445f-9a86-213244f8f92a.png",
];

// Updated activity data with 2025 dates and new names
const activities = [
  {
    id: 0,
    title: "افطار صائم",
    description: "قام حزب مستقبل وطن قسم المنتزة أول بتنظيم إفطار صائم بمشاركة شباب وفتيات من أمانة الشباب، حيث أقيمت الفعالية بحضور عدد كبير من أبناء المنطقة.",
    date: "2025",
    category: "all",
    images: [0, 1, 2],
    registrationRequired: true
  },
  {
    id: 1,
    title: "توزيع مواد غذائية",
    description: "قام فريق من شباب الحزب بتوزيع مواد غذائية على الأسر المحتاجة في منطقة قسم المنتزة أول كجزء من مبادرات دعم الأسر.",
    date: "2025",
    category: "all",
    images: [1, 2, 3, 5],
  },
  {
    id: 2,
    title: "اجتماع مع قيادات الشباب",
    description: "عقد اجتماع مع قيادات شباب الحزب لمناقشة خطط العمل المستقبلية والمبادرات الجديدة التي تستهدف تنمية المجتمع.",
    date: "2025",
    category: "all",
    images: [13, 10, 11],
  },
  {
    id: 3,
    title: "فعالية التوعية المجتمعية",
    description: "نظم الحزب حملة توعية مجتمعية حول أهمية المشاركة المجتمعية وكيفية التأثير الإيجابي في المجتمع.",
    date: "2025",
    category: "all",
    images: [14, 7, 8],
  },
];

const ActivitiesSection = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState<any>(null);
  const [selectedImage, setSelectedImage] = useState("");

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
        <h2 className="section-title mb-12 text-center">الفعاليات</h2>
        
        {/* Activities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {activities.map((activity) => (
            <Card
              key={activity.id}
              className="overflow-hidden hover:shadow-xl transition-all duration-300 card-hover border-none animate-fade-in"
              onClick={() => handleActivityClick(activity)}
            >
              <div className="aspect-video overflow-hidden">
                <img 
                  src={activityImages[activity.images[0]]} 
                  alt={activity.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
              <CardContent className="p-6 bg-gradient-to-br from-blue-50 to-white">
                <div className="mb-2 text-sm text-party-blue-dark font-semibold">{activity.date}</div>
                <h3 className="text-xl font-bold mb-2">{activity.title}</h3>
                <p className="text-gray-600 mb-4 line-clamp-2">{activity.description}</p>
                <div className="flex gap-2">
                  {activity.images.slice(0, 3).map((imageIndex: number, idx: number) => (
                    <div key={idx} className="w-12 h-12 rounded-md overflow-hidden hover:scale-110 transition-transform">
                      <img 
                        src={activityImages[imageIndex]} 
                        alt=""
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                  {activity.images.length > 3 && (
                    <div className="w-12 h-12 rounded-md bg-party-blue-light flex items-center justify-center text-white text-xs">
                      +{activity.images.length - 3}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {/* View All Button */}
        <div className="text-center mt-12">
          <Button className="btn-primary px-8 py-6 text-lg font-cairo bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 transition-all duration-300 transform hover:scale-105 shadow-lg">
            عرض جميع الفعاليات
          </Button>
        </div>
      </div>
      
      {/* Activity Details Dialog */}
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        {selectedActivity && (
          <DialogContent className="max-w-4xl">
            <DialogHeader>
              <DialogTitle className="text-2xl font-cairo mb-2">{selectedActivity.title}</DialogTitle>
              <DialogDescription className="text-base text-gray-700">
                {selectedActivity.description}
              </DialogDescription>
            </DialogHeader>
            <div className="mt-4">
              <h4 className="font-semibold mb-3">الصور</h4>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                {selectedActivity.images.map((imageIndex: number, idx: number) => (
                  <div 
                    key={idx} 
                    className="aspect-square rounded-md overflow-hidden cursor-pointer hover:opacity-90 hover:scale-105 transition-transform"
                    onClick={() => handleImageClick(activityImages[imageIndex])}
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
            
            {/* Registration Button for activities that require registration */}
            {selectedActivity.registrationRequired && (
              <div className="mt-6">
                <Button 
                  className="w-full py-5 text-lg bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 transition-all duration-300 transform hover:scale-105"
                  onClick={handleRegisterClick}
                >
                  التسجيل للمشاركة في هذه الفعالية
                </Button>
              </div>
            )}
          </DialogContent>
        )}
      </Dialog>
      
      {/* Full Image Preview */}
      {selectedImage && (
        <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage("")}>
          <DialogContent className="max-w-5xl max-h-screen p-0 bg-transparent border-none">
            <img 
              src={selectedImage} 
              alt="صورة الفعالية" 
              className="w-full h-auto max-h-[85vh] object-contain"
            />
          </DialogContent>
        </Dialog>
      )}
    </section>
  );
};

export default ActivitiesSection;
