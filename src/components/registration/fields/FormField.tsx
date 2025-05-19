
import {
  FormControl,
  FormDescription,
  FormField as UIFormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Control } from "react-hook-form";
import { FormValues } from "../schema";

type FormFieldProps = {
  control: Control<FormValues>;
  name: keyof FormValues;
  label: string;
  placeholder: string;
  description?: string;
  type?: string;
};

const FormField = ({ 
  control, 
  name, 
  label, 
  placeholder, 
  description,
  type = "text" 
}: FormFieldProps) => {
  return (
    <UIFormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="text-gray-700">{label}</FormLabel>
          <FormControl>
            <Input 
              placeholder={placeholder} 
              type={type}
              className="focus:ring-2 focus:ring-blue-500 transition-all" 
              {...field} 
            />
          </FormControl>
          {description && (
            <FormDescription className="text-xs">{description}</FormDescription>
          )}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default FormField;
