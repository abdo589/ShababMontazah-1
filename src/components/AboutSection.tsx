
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const AboutSection = () => {
  return (
    <section id="about" className="py-20 bg-white relative">
      <div className="container mx-auto px-4">
        {/* Section Title */}
        <h2 className="section-title mb-12 text-center">من نحن</h2>
        
        <div className="flex flex-col lg:flex-row gap-10">
          {/* Content Side */}
          <div className="lg:w-1/2">
            <Card className="p-8 shadow-lg border-none">
              <h3 className="text-2xl font-bold text-party-blue mb-4">حزب مستقبل وطن</h3>
              <p className="mb-4 text-gray-700 leading-relaxed">
                حزب مستقبل وطن هو حزب سياسي مصري يهدف إلى بناء مستقبل أفضل لمصر من خلال مجموعة من المبادئ والقيم التي تعكس روح الشعب المصري وتطلعاته.
              </p>
              <p className="mb-4 text-gray-700 leading-relaxed">
                نسعى إلى تعزيز المشاركة السياسية للشباب وتمكينهم من المساهمة في صنع القرار وبناء مستقبل مصر. نؤمن بأن الشباب هم عماد المستقبل وأن تنمية قدراتهم وإشراكهم في العملية السياسية هو أساس التقدم والازدهار.
              </p>
              
              <h4 className="text-xl font-semibold text-party-blue mt-6 mb-3">مبادئنا الأساسية</h4>
              <ul className="list-disc list-inside space-y-2 text-gray-700 mr-4 mb-6">
                <li>العمل من أجل مصلحة مصر والمصريين</li>
                <li>تعزيز قيم المواطنة والانتماء</li>
                <li>دعم مشاركة الشباب في الحياة السياسية</li>
                <li>تحقيق التنمية المستدامة والعدالة الاجتماعية</li>
                <li>الحفاظ على الهوية المصرية والقيم الأصيلة</li>
              </ul>
              
              <div className="mt-6">
                <Button className="btn-primary">اقرأ المزيد عن الحزب</Button>
              </div>
            </Card>
            
            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-6">
              <div className="bg-party-blue text-white p-4 rounded-lg text-center">
                <div className="text-3xl font-bold">27+</div>
                <div className="text-sm">محافظة</div>
              </div>
              <div className="bg-party-blue text-white p-4 rounded-lg text-center">
                <div className="text-3xl font-bold">1000+</div>
                <div className="text-sm">متطوع شاب</div>
              </div>
              <div className="bg-party-blue text-white p-4 rounded-lg text-center">
                <div className="text-3xl font-bold">50+</div>
                <div className="text-sm">مبادرة مجتمعية</div>
              </div>
            </div>
          </div>
          
          {/* Image Side */}
          <div className="lg:w-1/2 flex justify-center items-center">
            <div className="relative">
              {/* Main image */}
              <img 
                src="/lovable-uploads/a99618ba-f740-4b91-a1a8-50d1997ab284.png" 
                alt="قيادات الحزب" 
                className="w-full rounded-lg shadow-xl img-hover-zoom"
              />
              
              {/* Decorative elements */}
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-party-gold opacity-10 rounded-full blur-2xl"></div>
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-party-blue-light opacity-20 rounded-full blur-md"></div>
              
              {/* Egyptian flag colors stripe */}
              <div className="absolute top-0 right-0 bottom-0 w-2 bg-party-red"></div>
              <div className="absolute top-0 right-2 bottom-0 w-2 bg-white"></div>
              <div className="absolute top-0 right-4 bottom-0 w-2 bg-black"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
