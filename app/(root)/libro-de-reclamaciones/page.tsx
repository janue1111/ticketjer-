'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";

// Definiendo el tipo para el dataLayer para mayor seguridad de tipos
declare global {
  interface Window {
    dataLayer: any[];
  }
}

export const dynamic = 'force-dynamic';

const LibroDeReclamacionesPage = () => {
  const [formData, setFormData] = useState({
    nombres: '',
    apellidos: '',
    documento: '',
    numero_documento: '',
    direccion: '',
    distrito: '',
    telefono_casa: '',
    telefono_celular: '',
    email: '',
    menor_edad: 'no',
    monto_reclamo: '',
    tipo_servicio: '',
    descripcion_servicio: '',
    tipo_reclamo: '',
    detalle_reclamo: '',
    pedido_cliente: '',
    acepta_terminos: false,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleSelectChange = (id: string, value: string) => {
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleCheckboxChange = (id: string, checked: boolean) => {
    setFormData(prev => ({ ...prev, [id]: checked }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Asegurarse de que dataLayer exista
    window.dataLayer = window.dataLayer || [];

    // Enviar los datos al dataLayer
    window.dataLayer.push({
      event: 'reclamaciones',
      formData: formData
    });

    // Recargar la página
    window.location.reload();
  };

  return (
    <div className="wrapper bg-white rounded-lg shadow-md p-8 my-8">
      <h1 className="h1-bold text-center mb-6">LIBRO DE RECLAMACIONES</h1>

      <div className="text-center mb-8">
        <p className="p-bold-20">NEGOCIACIONES GENERALES EL CONDOR PASA SAC - RUC. 20536251937</p>
        <p className="text-gray-600">Av. Panamericana Norte Km. 30, Puente Piedra, Lima</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* SECCIÓN: DATOS PERSONALES */}
        <div className="border p-6 rounded-lg">
          <h2 className="h3-bold mb-6">Identificación del Consumidor Reclamante</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="nombres">Nombres: *</Label>
              <Input id="nombres" placeholder="Nombre" className="input-field-pink" value={formData.nombres} onChange={handleInputChange} />
            </div>
            <div>
              <Label htmlFor="apellidos">Apellidos: *</Label>
              <Input id="apellidos" placeholder="Apellidos" className="input-field-pink" value={formData.apellidos} onChange={handleInputChange} />
            </div>
            <div>
              <Label htmlFor="documento">Documento: *</Label>
              <Select name="documento" onValueChange={(value) => handleSelectChange('documento', value)} value={formData.documento}>
                <SelectTrigger className="select-field-pink">
                  <SelectValue placeholder="--- Seleccione ---" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="dni">DNI</SelectItem>
                  <SelectItem value="ce">Carnet de Extranjería</SelectItem>
                  <SelectItem value="ruc">RUC</SelectItem>
                  <SelectItem value="pasaporte">Pasaporte</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="numero_documento">Número de Documento: *</Label>
              <Input id="numero_documento" placeholder="Número" className="input-field-pink" value={formData.numero_documento} onChange={handleInputChange} />
            </div>
            <div className="md:col-span-2">
              <Label htmlFor="direccion">Dirección: *</Label>
              <Input id="direccion" placeholder="Dirección" className="input-field-pink" value={formData.direccion} onChange={handleInputChange} />
            </div>
            <div>
              <Label htmlFor="distrito">Departamento / Provincia / Distrito</Label>
              <Input id="distrito" placeholder="Escriba aquí" className="input-field-pink" value={formData.distrito} onChange={handleInputChange} />
            </div>
            <div>
              <Label htmlFor="telefono_casa">Teléfono Casa:</Label>
              <Input id="telefono_casa" placeholder="Teléfono Casa" className="input-field-pink" value={formData.telefono_casa} onChange={handleInputChange} />
            </div>
            <div>
              <Label htmlFor="telefono_celular">Teléfono Celular: *</Label>
              <Input id="telefono_celular" placeholder="Teléfono Celular" className="input-field-pink" value={formData.telefono_celular} onChange={handleInputChange} />
            </div>
            <div>
              <Label htmlFor="email">Correo Electrónico: *</Label>
              <Input type="email" id="email" placeholder="Correo Electrónico" className="input-field-pink" value={formData.email} onChange={handleInputChange} />
            </div>
            <div className="flex items-center space-x-2">
              <Label htmlFor="menor_edad">Es menor de edad</Label>
              <Select name="menor_edad" onValueChange={(value) => handleSelectChange('menor_edad', value)} value={formData.menor_edad}>
                <SelectTrigger className="select-field-pink w-[100px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="no">No</SelectItem>
                  <SelectItem value="si">Sí</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* SECCIÓN: DETALLES DEL RECLAMO */}
        <div className="border p-6 rounded-lg">
          <h2 className="h3-bold mb-6">Detalle de la Reclamación y Pedido del Consumidor</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="monto_reclamo">Monto del Reclamo:</Label>
              <Input id="monto_reclamo" placeholder="Monto del Reclamo" className="input-field-pink" value={formData.monto_reclamo} onChange={handleInputChange} />
            </div>
            <div>
              <Label htmlFor="tipo_servicio">Tipo de servicio: *</Label>
              <Select name="tipo_servicio" onValueChange={(value) => handleSelectChange('tipo_servicio', value)} value={formData.tipo_servicio}>
                <SelectTrigger className="select-field-pink">
                  <SelectValue placeholder="--- Seleccione ---" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="producto">Producto</SelectItem>
                  <SelectItem value="servicio">Servicio</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="md:col-span-2">
              <Label htmlFor="descripcion_servicio">Descripción del Producto/Servicio: *</Label>
              <Textarea id="descripcion_servicio" className="textarea-pink rounded-2xl" value={formData.descripcion_servicio} onChange={handleInputChange} />
            </div>
            <div>
              <Label htmlFor="tipo_reclamo">Tipo de reclamo: *</Label>
              <Select name="tipo_reclamo" onValueChange={(value) => handleSelectChange('tipo_reclamo', value)} value={formData.tipo_reclamo}>
                <SelectTrigger className="select-field-pink">
                  <SelectValue placeholder="--- Seleccione ---" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="reclamo">Reclamo</SelectItem>
                  <SelectItem value="queja">Queja</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="md:col-span-2 bg-gray-50 p-4 rounded-lg text-sm">
              <p><span className="font-bold">Reclamo:</span> Disconformidad relacionada a los productos o servicios</p>
              <p><span className="font-bold">Queja:</span> Disconformidad no relacionada a los productos o servicios; o malestar o descontento respecto a la atención al público.</p>
            </div>
            <div className="md:col-span-2">
              <Label htmlFor="detalle_reclamo">Detalle del Reclamo/Queja: *</Label>
              <Textarea id="detalle_reclamo" className="textarea-pink rounded-2xl" value={formData.detalle_reclamo} onChange={handleInputChange} />
            </div>
          </div>
        </div>

        {/* SECCIÓN: FINAL */}
        <div className="border p-6 rounded-lg">
          <div className="space-y-6">
            <div>
              <Label htmlFor="pedido_cliente">Pedido del cliente: *</Label>
              <Textarea id="pedido_cliente" className="textarea-pink rounded-2xl" value={formData.pedido_cliente} onChange={handleInputChange} />
            </div>

            <div className="items-top flex space-x-2">
              <Checkbox id="acepta_terminos" onCheckedChange={(checked) => handleCheckboxChange('acepta_terminos', checked as boolean)} checked={formData.acepta_terminos} />
              <div className="grid gap-1.5 leading-none">
                <label
                  htmlFor="acepta_terminos"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Debido que los datos personales que usted nos proporcione son necesarios para la atención de las reclamaciones de los servicios prestados por nuestra institución, NEGOCIACIONES GENERALES EL CONDOR PASA SAC realizará el tratamiento de sus datos personales estricta y únicamente para dicha finalidad. Usted podrá ejercer sus derechos de información, acceso, rectificación, cancelación y oposición de sus datos personales, en cualquier momento, enviándonos un correo electrónico a ticketsasoo@gmail.com de acuerdo a la Política de Privacidad. La formulación del reclamo no impide acudir a otras vías de controversias ni es requisito previo para interponer una denuncia ante INDECOPI.
                </label>
              </div>
            </div>
            <Button type="submit" size="lg" className="button w-full md:w-auto">
              Registrar libro
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default LibroDeReclamacionesPage;
