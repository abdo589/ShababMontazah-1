
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Control } from "react-hook-form";
import { FormValues } from "../schema";

type TextareaFieldProps = {
  control: Control<FormValues>;
  name: keyof FormValues;
  label: string;
  placeholder: string;
  description?: string;
  rows?: number;
};

const TextareaField = ({ 
  control, 
  name, 
  label, 
  placeholder, 
  description,
  rows = 4
}: TextareaFieldProps) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="text-gray-700">{label}</FormLabel>
          <FormControl>
            <Textarea 
              placeholder={placeholder} 
              rows={rows}
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

export default TextareaField;
