
import { Button } from "@/components/ui/button";

interface FormActionsProps {
  onContactClick: () => void;
  isSubmitting: boolean;
}

const FormActions = ({ onContactClick, isSubmitting }: FormActionsProps) => {
  return (
    <div className="flex flex-col md:flex-row justify-center gap-4 pt-4">
      <Button 
        type="submit" 
        className="bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white px-10 py-6 text-lg font-cairo transform hover:scale-105 transition-all duration-300"
        disabled={isSubmitting}
      >
        {isSubmitting ? "جاري الإرسال..." : "إرسال طلب الانضمام"}
      </Button>
      
      <Button 
        type="button"
        variant="outline" 
        className="px-10 py-6 text-lg font-cairo border-blue-500 text-blue-600 hover:bg-blue-50 transform hover:scale-105 transition-all duration-300"
        onClick={onContactClick}
      >
        تواصل معنا
      </Button>
    </div>
  );
};

export default FormActions;
