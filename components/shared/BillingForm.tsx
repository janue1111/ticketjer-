'use client';

import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useUser } from '@clerk/nextjs';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"

// Definimos el schema de validación con Zod
const formSchema = z.object({
  firstName: z.string().min(2, 'El nombre debe tener al menos 2 caracteres.'),
  lastName: z.string().min(2, 'El apellido debe tener al menos 2 caracteres.'),
  email: z.string().email('Email inválido.'),
  phoneNumber: z.string().min(9, 'El número de teléfono debe tener 9 dígitos.').max(9, 'El número de teléfono debe tener 9 dígitos.'),
  street: z.string().min(5, 'La dirección debe tener al menos 5 caracteres.'),
  city: z.string().min(2, 'La ciudad debe tener al menos 2 caracteres.'),
  state: z.string().min(2, 'El estado/provincia debe tener al menos 2 caracteres.'),
  country: z.string(),
  postalCode: z.string().min(5, 'El código postal debe tener 5 caracteres.').max(5, 'El código postal debe tener 5 caracteres.'),
  document: z.string().min(8, 'El documento debe tener al menos 8 caracteres.'),
  documentType: z.enum(['DNI', 'CE', 'RUC', 'PAS']),
});

export type BillingDetails = z.infer<typeof formSchema>;

interface BillingFormProps {
  onSubmit: (data: BillingDetails) => void;
  isProcessing: boolean;
}

const BillingForm: React.FC<BillingFormProps> = ({ onSubmit, isProcessing }) => {
  const { user } = useUser();

  const form = useForm<BillingDetails>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: '',
      street: '',
      city: 'Lima',
      state: 'Lima',
      country: 'PE',
      postalCode: '00001',
      document: '',
      documentType: 'DNI',
    },
  });

  // Precargar datos del usuario de Clerk cuando esté disponible
  useEffect(() => {
    if (user) {
      form.reset({
        ...form.getValues(), // Mantiene los valores actuales que no se sobreescriben
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        email: user.emailAddresses[0]?.emailAddress || '',
      });
    }
  }, [user, form]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Nombre</FormLabel>
                    <FormControl>
                        <Input placeholder="Juan" {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Apellido</FormLabel>
                    <FormControl>
                        <Input placeholder="Perez" {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
            />
        </div>

        <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                    <Input placeholder="juan.perez@example.com" {...field} />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
                control={form.control}
                name="documentType"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Tipo de Documento</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                            <SelectTrigger>
                                <SelectValue placeholder="Selecciona un tipo de documento" />
                            </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                            <SelectItem value="DNI">DNI</SelectItem>
                            <SelectItem value="CE">Carné de Extranjería</SelectItem>
                            <SelectItem value="RUC">RUC</SelectItem>
                            <SelectItem value="PAS">Pasaporte</SelectItem>
                            </SelectContent>
                        </Select>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="document"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Número de Documento</FormLabel>
                    <FormControl>
                        <Input placeholder="12345678" {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
            />
        </div>

        <FormField
            control={form.control}
            name="phoneNumber"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Número de Celular</FormLabel>
                <FormControl>
                    <Input placeholder="987654321" {...field} />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
        />

        <FormField
            control={form.control}
            name="street"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Dirección</FormLabel>
                <FormControl>
                    <Input placeholder="Av. Principal 123" {...field} />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Ciudad</FormLabel>
                    <FormControl>
                        <Input placeholder="Lima" {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="postalCode"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Código Postal</FormLabel>
                    <FormControl>
                        <Input placeholder="15001" {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
            />
        </div>
        
        <Button 
            type="submit"
            disabled={isProcessing}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition duration-300 ease-in-out"
        >
          {isProcessing ? 'Procesando...' : 'Continuar al Pago'}
        </Button>
      </form>
    </Form>
  );
};

export default BillingForm;