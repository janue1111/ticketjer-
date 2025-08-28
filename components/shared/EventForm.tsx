'use client';

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFieldArray, Control } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { eventFormSchema } from "@/lib/validator";
import { eventDefaultValues } from "@/constants";
import Dropdown from "./Dropdown";
import { Textarea } from "@/components/ui/textarea";
import { FileUploader } from "./FileUploader";
import { useState } from "react";
import Image from "next/image";
import DatePicker from "react-datepicker";
import { Checkbox } from "@/components/ui/checkbox";
import { useUploadThing } from "@/lib/uploadthing";
import { createEvent, updateEvent } from "@/lib/actions/event.actions";
import "react-datepicker/dist/react-datepicker.css";
import { useRouter } from "next/navigation";
import { IEvent } from "@/lib/database/models/event.model";

type EventFormProps = {
  userId: string;
  type: "Create" | "Update";
  event?: IEvent;
  eventId?: string;
};

const TierFields = ({ nestIndex, control }: { nestIndex: number; control: Control<z.infer<typeof eventFormSchema>> }) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: `pricingPhases.${nestIndex}.tiers`,
  });

  return (
    <div className="w-full">
      <h4 className="p-bold-18 text-left">Tiers de Entrada para esta Fase</h4>
      {fields.map((item, k) => (
        <div key={item.id} className="flex flex-col md:flex-row gap-4 border rounded-lg p-4 my-2 relative">
          <Button type="button" onClick={() => remove(k)} className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 text-xs">Eliminar Tier</Button>
          <FormField
            control={control}
            name={`pricingPhases.${nestIndex}.tiers.${k}.name`}
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Nombre del Tier</FormLabel>
                <FormControl>
                  <Input placeholder="ZONA VIP" {...field} className="input-field" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name={`pricingPhases.${nestIndex}.tiers.${k}.price`}
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Precio</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="100.00" {...field} value={field.value || '0'} className="input-field" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
           <FormField
            control={control}
            name={`pricingPhases.${nestIndex}.tiers.${k}.originalPrice`}
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Precio Original</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="120.00" {...field} className="input-field" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
           <FormField
            control={control}
            name={`pricingPhases.${nestIndex}.tiers.${k}.description`}
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Descripción</FormLabel>
                <FormControl>
                  <Input placeholder="Por Persona" {...field} className="input-field" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
           <FormField
            control={control}
            name={`pricingPhases.${nestIndex}.tiers.${k}.color`}
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Color</FormLabel>
                <FormControl>
                  <Input placeholder="bg-purple-500" {...field} className="input-field" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      ))}
      <Button type="button" onClick={() => append({ name: 'Nuevo Tier', price: '0', originalPrice: '', description: '', color: '' })} size="sm" className="mt-2">Añadir Tier</Button>
    </div>
  );
};

const EventForm = ({ userId, type, event, eventId }: EventFormProps) => {
  const [files, setFiles] = useState<File[]>([]);
  const initialValues: z.infer<typeof eventFormSchema> =
    type === "Update" && event
      ? {
          ...eventDefaultValues,
          title: event.title ?? eventDefaultValues.title,
          slug: event.slug ?? eventDefaultValues.slug,
          description: event.description ?? eventDefaultValues.description,
          location: event.location ?? eventDefaultValues.location,
          imageUrl: event.imageUrl ?? eventDefaultValues.imageUrl,
          immersiveImages: event.immersiveImages ?? eventDefaultValues.immersiveImages,
          standardDescription: event.standardDescription ?? eventDefaultValues.standardDescription,
          scenarioImageUrl: event.scenarioImageUrl ?? eventDefaultValues.scenarioImageUrl,
          startDateTime: new Date(event.startDateTime ?? eventDefaultValues.startDateTime),
          endDateTime: new Date(event.endDateTime ?? eventDefaultValues.endDateTime),
          categoryId: event.category?._id ?? eventDefaultValues.categoryId,
          url: event.url ?? eventDefaultValues.url,
          layoutType: event.layoutType ?? eventDefaultValues.layoutType,
          pricingPhases: event.pricingPhases ?? eventDefaultValues.pricingPhases,
        }
      : eventDefaultValues;
  const router = useRouter();

  const { startUpload } = useUploadThing("imageUploader");
  const form = useForm<z.infer<typeof eventFormSchema>>({
    resolver: zodResolver(eventFormSchema),
    defaultValues: initialValues,
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "pricingPhases",
  });

  async function onSubmit(values: z.infer<typeof eventFormSchema>) {
    let uploadedImageUrl = values.imageUrl;

    if (files.length > 0) {
      const uploadedImages = await startUpload(files);
      if (!uploadedImages) return;
      uploadedImageUrl = uploadedImages[0].url;
    }

    if (type === "Create") {
      try {
        const newEvent = await createEvent({
          event: { ...values, imageUrl: uploadedImageUrl },
          userId,
          path: "/profile",
        });
        if (newEvent) {
          form.reset();
          router.push(`/events/${newEvent._id}`);
        }
      } catch (error) {
        console.log(error);
      }
    }

    if (type === "Update") {
      if (!eventId) {
        router.back();
        return;
      }
      try {
        const updatedEvent = await updateEvent({
          userId,
          event: { ...values, imageUrl: uploadedImageUrl, _id: eventId },
          path: `/events/${eventId}`,
        });
        if (updatedEvent) {
          form.reset();
          router.push(`/events/${updatedEvent._id}`);
        }
      } catch (error) {
        console.log(error);
      }
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-5"
      >
        <div className="flex flex-col gap-5 md:flex-row">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Input
                    placeholder="Event title"
                    {...field}
                    className="input-field"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="slug"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Input
                    placeholder="URL amigable del evento (ej: mi-concierto-2025)"
                    value={field.value || ''}
                    onChange={(e) => {
                      const raw = e.target.value
                      const normalized = raw
                        .toLowerCase()
                        .trim()
                        .replace(/\s+/g, '-')
                        .replace(/[^a-z0-9-]/g, '')
                        .replace(/-+/g, '-')
                        .replace(/^-+|-+$/g, '')
                      field.onChange(normalized)
                    }}
                    className="input-field"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="categoryId"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Dropdown
                    onChangeHandler={field.onChange}
                    value={field.value}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        {form.watch('layoutType') === 'immersive' && (
          <div className="flex flex-col gap-5">
            <h4 className="p-bold-18">Imágenes del Layout Inmersivo</h4>
            <div className="flex flex-col gap-5 md:flex-row">
              <FormField
                control={form.control}
                name="immersiveImages.backgroundUrl"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>URL Imagen de Fondo</FormLabel>
                    <FormControl>
                      <Input placeholder="https://..." {...field} value={field.value || ''} className="input-field" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="immersiveImages.artistUrl"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>URL Imagen de Artistas</FormLabel>
                    <FormControl>
                      <Input placeholder="https://..." {...field} value={field.value || ''} className="input-field" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex flex-col gap-5 md:flex-row">
              <FormField
                control={form.control}
                name="immersiveImages.dateUrl"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>URL Imagen de Fecha</FormLabel>
                    <FormControl>
                      <Input placeholder="https://..." {...field} value={field.value || ''} className="input-field" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="immersiveImages.zoneMapUrl"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>URL Imagen del Mapa de Zonas</FormLabel>
                    <FormControl>
                      <Input placeholder="https://..." {...field} value={field.value || ''} className="input-field" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        )}
        {form.watch('layoutType') === 'standard' && (
          <div className="flex flex-col gap-5">
            <h4 className="p-bold-18">Información Adicional para Evento Standard</h4>
            <div className="flex flex-col gap-5 md:flex-row">
              <FormField
                control={form.control}
                name="standardDescription"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Descripción del Evento (máx. 100 palabras)</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Describe los detalles específicos de tu evento..." 
                        {...field} 
                        className="textarea rounded-2xl h-32"
                        onChange={(e) => {
                          const value = e.target.value;
                          const wordCount = value.trim().split(/\s+/).filter(word => word.length > 0).length;
                          if (wordCount <= 100 || value === '') {
                            field.onChange(value);
                          }
                        }}
                      />
                    </FormControl>
                    <div className="text-sm text-gray-500">
                      Palabras: {field.value ? field.value.trim().split(/\s+/).filter(word => word.length > 0).length : 0}/100
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex flex-col gap-5 md:flex-row">
              <FormField
                control={form.control}
                name="scenarioImageUrl"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>URL de Imagen del Escenario</FormLabel>
                    <FormControl>
                      <Input placeholder="https://i.imgur.com/..." {...field} value={field.value || ''} className="input-field" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        )}
        <div className="flex flex-col gap-5 md:flex-row">
          <FormField
            control={form.control}
            name="layoutType"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value}
                  >
                    <SelectTrigger className="select-field">
                      <SelectValue placeholder="Layout" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="standard" className="select-item">
                        Layout Estándar
                      </SelectItem>
                      <SelectItem value="immersive" className="select-item">
                        Layout Inmersivo
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex flex-col gap-5 md:flex-row">
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl className="h-72">
                  <Textarea
                    placeholder="Description"
                    {...field}
                    className="textarea rounded-2xl"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="imageUrl"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl className="h-72">
                  <FileUploader
                    onFieldChange={field.onChange}
                    imageUrl={field.value}
                    setFiles={setFiles}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex flex-col gap-5 md:flex-row">
          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <div className="flex-center h-[55px] w-full overflow-hidden rounded-full bg-grey-50 px-4 py-2">
                    <Image
                      src="/assets/icons/location-grey.svg"
                      alt="calendar"
                      height={24}
                      width={24}
                    />
                    <Input
                      placeholder="Event location or Online"
                      {...field}
                      className="input-field"
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex flex-col gap-5 md:flex-row">
          <FormField
            control={form.control}
            name="startDateTime"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <div className="flex-center h-[55px] w-full overflow-hidden rounded-full bg-grey-50 px-4 py-2">
                    <Image
                      src="/assets/icons/calendar.svg"
                      alt="calendar"
                      height={24}
                      width={24}
                      className="filter-grey"
                    />
                    <p className="ml-3 whitespace-nowrap text-grey-600">
                      Start Date:
                    </p>
                    <DatePicker
                      selected={field.value}
                      onChange={(date: Date) => field.onChange(date)}
                      showTimeSelect
                      timeInputLabel="Time:"
                      dateFormat="MM/dd/yyyy h:mm aa"
                      wrapperClassName="datePicker"
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="endDateTime"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <div className="flex-center h-[55px] w-full overflow-hidden rounded-full bg-grey-50 px-4 py-2">
                    <Image
                      src="/assets/icons/calendar.svg"
                      alt="calendar"
                      height={24}
                      width={24}
                      className="filter-grey"
                    />
                    <p className="ml-3 whitespace-nowrap text-grey-600">
                      End Date:
                    </p>
                    <DatePicker
                      selected={field.value}
                      onChange={(date: Date) => field.onChange(date)}
                      showTimeSelect
                      timeInputLabel="Time:"
                      dateFormat="MM/dd/yyyy h:mm aa"
                      wrapperClassName="datePicker"
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div>
          <h3 className="h3-bold text-center sm:text-left">Fases de Venta</h3>
          {fields.map((field, index) => (
            <div key={field.id} className="flex flex-col gap-5 border p-5 rounded-lg my-4 relative">
              <Button type="button" onClick={() => remove(index)} className="absolute top-2 right-2 bg-red-500">Eliminar Fase</Button>
              <div className="flex flex-col gap-5 md:flex-row">
                <FormField
                  control={form.control}
                  name={`pricingPhases.${index}.name`}
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Nombre de la Fase</FormLabel>
                      <FormControl>
                        <Input placeholder="PREVENTA 1" {...field} className="input-field" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`pricingPhases.${index}.description`}
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Descripción</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Descripción de la fase" {...field} className="textarea rounded-2xl" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`pricingPhases.${index}.active`}
                  render={({ field }) => (
                    <FormItem className="flex items-center">
                      <FormControl>
                        <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>
                      <FormLabel className="ml-2">Activa</FormLabel>
                    </FormItem>
                  )}
                />
              </div>
              <TierFields nestIndex={index} control={form.control} />
            </div>
          ))}
          <Button type="button" onClick={() => append({ name: 'NUEVA FASE', active: false, description: '', tiers: [] })} size="lg" className="button col-span-2 w-full">Añadir Fase de Venta</Button>
        </div>

        <div className="flex flex-col gap-5 md:flex-row">
          <FormField
            control={form.control}
            name="url"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <div className="flex-center h-[54px] w-full overflow-hidden rounded-full bg-grey-50 px-4 py-2">
                    <Image
                      src="/assets/icons/link.svg"
                      alt="link"
                      width={24}
                      height={24}
                    />

                    <Input
                      placeholder="URL"
                      {...field}
                      className="input-field"
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button
          type="submit"
          size="lg"
          className="button col-span-2 w-full"
          disabled={form.formState.isSubmitting}
        >
          {form.formState.isSubmitting ? "Submitting..." : `${type} Event `}
        </Button>
      </form>
    </Form>
  );
};

export default EventForm;