
import React, { useState } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { DollarSign, Percent } from 'lucide-react';
import { programs } from '@/data/mockData';
import { AffiliateFormData } from '@/types';

const formSchema = z.object({
  programId: z.string().min(1, { message: 'Please select a program' }),
  itemParams: z.string().optional(),
  discountType: z.enum(['percentage', 'fixed']),
  discountValue: z.string().refine(
    (val) => {
      const num = parseFloat(val);
      return !isNaN(num) && num >= 0;
    },
    { message: 'Please enter a valid discount value' }
  ),
});

interface AffiliateFormProps {
  onSubmit: (data: AffiliateFormData) => void;
  onCancel: () => void;
}

const AffiliateForm: React.FC<AffiliateFormProps> = ({ onSubmit, onCancel }) => {
  const [discountType, setDiscountType] = useState<'percentage' | 'fixed'>('percentage');
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      programId: '',
      itemParams: '',
      discountType: 'percentage',
      discountValue: '',
    },
  });
  
  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    const formData: AffiliateFormData = {
      programId: values.programId,
      itemParams: values.itemParams || '',
      discount: {
        type: values.discountType,
        value: parseFloat(values.discountValue) || 0,
      },
    };
    onSubmit(formData);
  };

  return (
    <DialogContent className="sm:max-w-[500px] animate-in-menu">
      <DialogHeader>
        <DialogTitle className="text-xl">Configure Affiliate Links</DialogTitle>
      </DialogHeader>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="programId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Select Program</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a program" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {programs.map((program) => (
                      <SelectItem key={program.id} value={program.id}>{program.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="itemParams"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Item Parameters (Optional)</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="E.g., item=1234&category=shoes"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="discountType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Discount Type</FormLabel>
                  <Select
                    onValueChange={(value: 'percentage' | 'fixed') => {
                      field.onChange(value);
                      setDiscountType(value);
                    }}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="percentage">Percentage (%)</SelectItem>
                      <SelectItem value="fixed">Fixed ($)</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="discountValue"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Discount Value</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        placeholder={discountType === 'percentage' ? "10" : "5.99"}
                        {...field}
                        type="number"
                        step={discountType === 'percentage' ? "1" : "0.01"}
                        className="pl-8"
                      />
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        {discountType === 'percentage' ? (
                          <Percent className="h-4 w-4 text-muted-foreground" />
                        ) : (
                          <DollarSign className="h-4 w-4 text-muted-foreground" />
                        )}
                      </div>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onCancel} className="mr-2">
              Cancel
            </Button>
            <Button type="submit">Generate Links</Button>
          </DialogFooter>
        </form>
      </Form>
    </DialogContent>
  );
};

export default AffiliateForm;
