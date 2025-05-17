
import { z } from "zod";

// Form validation schema
export const formSchema = z.object({
  name: z.string().min(3, { message: "الاسم يجب أن يحتوي على 3 أحرف على الأقل" }),
  email: z.string().email({ message: "يرجى إدخال بريد إلكتروني صالح" }),
  phone: z.string().min(11, { message: "رقم الهاتف يجب أن يحتوي على 11 رقم على الأقل" }),
  nationalId: z.string().min(14, { message: "الرقم القومي يجب أن يحتوي على 14 رقم" }),
  address: z.string().min(5, { message: "العنوان يجب أن يحتوي على 5 أحرف على الأقل" }),
  area: z.string().min(1, { message: "يرجى اختيار المنطقة" }),
  gender: z.string().min(1, { message: "يرجى اختيار النوع" }),
  motivation: z.string().optional(),
});

export type FormValues = z.infer<typeof formSchema>;
