'use client';

import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useUser } from '@clerk/nextjs';
import { User, FileText, Mail, Phone, MapPin, ChevronRight } from 'lucide-react';

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
        <div className="w-full max-w-2xl mx-auto">
            {/* Card Container */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
                {/* Header */}
                <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-5">
                    <div className="flex items-center gap-3">
                        <div className="bg-white/20 p-2 rounded-lg">
                            <FileText className="h-6 w-6 text-white" />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-white">Paso 2: Tus Datos</h2>
                            <p className="text-blue-100 text-sm">Ingresa tus datos de facturación</p>
                        </div>
                    </div>
                </div>

                {/* Form Content */}
                <div className="p-6 md:p-8">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

                            {/* Sección: Datos Personales */}
                            <div className="space-y-4">
                                <div className="flex items-center gap-2 mb-3">
                                    <User className="h-4 w-4 text-gray-500" />
                                    <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">Datos Personales</h3>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <FormField
                                        control={form.control}
                                        name="firstName"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="text-gray-700">Nombre</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Juan" className="h-11" {...field} />
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
                                                <FormLabel className="text-gray-700">Apellido</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Perez" className="h-11" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </div>

                            {/* Sección: Documento */}
                            <div className="space-y-4">
                                <div className="flex items-center gap-2 mb-3">
                                    <FileText className="h-4 w-4 text-gray-500" />
                                    <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">Documento de Identidad</h3>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <FormField
                                        control={form.control}
                                        name="documentType"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="text-gray-700">Tipo de Documento</FormLabel>
                                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                    <FormControl>
                                                        <SelectTrigger className="h-11">
                                                            <SelectValue placeholder="Selecciona un tipo" />
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
                                                <FormLabel className="text-gray-700">Número de Documento</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="12345678" className="h-11" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </div>

                            {/* Sección: Contacto */}
                            <div className="space-y-4">
                                <div className="flex items-center gap-2 mb-3">
                                    <Mail className="h-4 w-4 text-gray-500" />
                                    <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">Información de Contacto</h3>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <FormField
                                        control={form.control}
                                        name="email"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="text-gray-700 flex items-center gap-1.5">
                                                    <Mail className="h-3.5 w-3.5" />
                                                    Email
                                                </FormLabel>
                                                <FormControl>
                                                    <Input placeholder="juan.perez@example.com" className="h-11" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="phoneNumber"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="text-gray-700 flex items-center gap-1.5">
                                                    <Phone className="h-3.5 w-3.5" />
                                                    Número de Celular
                                                </FormLabel>
                                                <FormControl>
                                                    <Input placeholder="987654321" className="h-11" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </div>

                            {/* Sección: Dirección */}
                            <div className="space-y-4">
                                <div className="flex items-center gap-2 mb-3">
                                    <MapPin className="h-4 w-4 text-gray-500" />
                                    <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">Dirección</h3>
                                </div>
                                <FormField
                                    control={form.control}
                                    name="street"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-gray-700">Calle / Avenida</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Av. Principal 123" className="h-11" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <FormField
                                        control={form.control}
                                        name="city"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="text-gray-700">Ciudad</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Lima" className="h-11" {...field} />
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
                                                <FormLabel className="text-gray-700">Código Postal</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="15001" className="h-11" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </div>

                            {/* Submit Button */}
                            <div className="pt-4">
                                <Button
                                    type="submit"
                                    disabled={isProcessing}
                                    className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 ease-in-out transform hover:scale-[1.02] hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none text-lg h-auto"
                                >
                                    {isProcessing ? (
                                        <span className="flex items-center justify-center">
                                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Procesando...
                                        </span>
                                    ) : (
                                        <span className="flex items-center justify-center gap-2">
                                            Continuar al Pago
                                            <ChevronRight className="h-5 w-5" />
                                        </span>
                                    )}
                                </Button>
                            </div>

                            {/* Security Note */}
                            <p className="text-center text-xs text-gray-500 mt-4">
                                🔒 Tus datos están protegidos y solo se usan para procesar tu compra
                            </p>
                        </form>
                    </Form>
                </div>
            </div>
        </div>
    );
};

export default BillingForm;