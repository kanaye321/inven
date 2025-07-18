import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// IT Equipment form schema with validation
const itEquipmentFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  category: z.string().min(2, "Category is required"),
  totalQuantity: z.string().min(1, "Total quantity is required"),
  model: z.string().min(1, "Model is required"),
  location: z.string().min(1, "Location is required"),
  dateAcquired: z.string().min(1, "Date acquired is required"),
});

type ITEquipmentFormValues = z.infer<typeof itEquipmentFormSchema>;

interface ITEquipmentFormProps {
  onSubmit: (values: ITEquipmentFormValues) => void;
  isLoading: boolean;
  defaultValues?: Partial<ITEquipmentFormValues>;
}

export default function ITEquipmentForm({ 
  onSubmit, 
  isLoading,
  defaultValues = {
    name: "",
    category: "",
    totalQuantity: "",
    model: "",
    location: "",
    dateAcquired: "",
  }
}: ITEquipmentFormProps) {
  const form = useForm<ITEquipmentFormValues>({
    resolver: zodResolver(itEquipmentFormSchema),
    defaultValues,
  });

  const handleSubmit = (values: ITEquipmentFormValues) => {
    onSubmit(values);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name*</FormLabel>
                <FormControl>
                  <Input placeholder="e.g. Dell Laptop, HP Printer" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category*</FormLabel>
                <FormControl>
                  <Input placeholder="e.g. Laptop, Desktop, Printer" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="totalQuantity"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Total Quantity*</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="e.g. 5" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="model"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Model*</FormLabel>
                <FormControl>
                  <Input placeholder="e.g. Dell Latitude 5520" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Location*</FormLabel>
                <FormControl>
                  <Input placeholder="e.g. Office A, IT Room" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="dateAcquired"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Date Acquired*</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex justify-end">
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Creating..." : "Create Equipment"}
          </Button>
        </div>
      </form>
    </Form>
  );
}