
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { formSchema, type FormValues } from "./schema";
import { alexandriaAreas } from "./constants";
import FormField from "./fields/FormField";
import SelectField from "./fields/SelectField";
import TextareaField from "./fields/TextareaField";
import FormActions from "./FormActions";
import { useRegistrationSubmit } from "./hooks/useRegistrationSubmit";

const RegistrationForm = ({ onContactClick }: { onContactClick: () => void }) => {
  // Initialize the form
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      nationalId: "",
      address: "",
      area: "",
      gender: "",
      motivation: "",
    }
  });

  const { handleSubmit, isSubmitting } = useRegistrationSubmit();
  
  // Handle form submission
  const onSubmit = async (data: FormValues) => {
    handleSubmit(data, () => form.reset());
  };

  // Create gender options
  const genderOptions = [
    { value: "ذكر", label: "ذكر" },
    { value: "أنثى", label: "أنثى" }
  ];
  
  // Create area options from alexandriaAreas constant
  const areaOptions = alexandriaAreas.map(area => ({
    value: area,
    label: area
  }));

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Name Field */}
          <FormField
            control={form.control}
            name="name"
            label="الاسم بالكامل"
            placeholder="أدخل الاسم بالكامل"
          />
          
          {/* Email Field */}
          <FormField
            control={form.control}
            name="email"
            label="البريد الإلكتروني"
            placeholder="example@domain.com"
            type="email"
          />
          
          {/* Phone Field */}
          <FormField
            control={form.control}
            name="phone"
            label="رقم الهاتف"
            placeholder="01xxxxxxxxx"
          />
          
          {/* National ID Field */}
          <FormField
            control={form.control}
            name="nationalId"
            label="الرقم القومي"
            placeholder="الرقم القومي المكون من 14 رقم"
          />
          
          {/* Address Field */}
          <FormField
            control={form.control}
            name="address"
            label="العنوان"
            placeholder="العنوان التفصيلي"
          />
          
          {/* Area Field */}
          <SelectField
            control={form.control}
            name="area"
            label="المنطقة"
            placeholder="اختر المنطقة"
            options={areaOptions}
          />
          
          {/* Gender Field */}
          <SelectField
            control={form.control}
            name="gender"
            label="النوع"
            placeholder="اختر النوع"
            options={genderOptions}
          />
        </div>
        
        {/* Motivation Field */}
        <TextareaField
          control={form.control}
          name="motivation"
          label="لماذا ترغب في الانضمام للحزب؟ (اختياري)"
          placeholder="اكتب هنا..."
          description="شارك معنا سبب رغبتك في الانضمام إلى الحزب وكيف يمكنك المساهمة."
        />
        
        <FormActions onContactClick={onContactClick} isSubmitting={isSubmitting} />
      </form>
    </Form>
  );
};

export default RegistrationForm;
