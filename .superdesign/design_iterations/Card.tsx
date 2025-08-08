"use client";
import Link from "next/link";
import { IEvent } from "@/lib/database/models/event.model";
import React from "react";
import { formatDateTime } from "@/lib/utils";
import Image from "next/image";
import { useAuth } from "@clerk/nextjs";
import { DeleteConfirmation } from "./DeleteConfirmation";

type CardProps = {
 event: IEvent;
 hasOrderLink?: boolean;
 hidePrice?: boolean;
 orderQuantity?: number;
};

const Card = ({ event, hasOrderLink, hidePrice, orderQuantity }: CardProps) => {
 const { userId } = useAuth();
 const isEventCreator = event.organizer._id.toString() === userId;

 return (
<div className="bg-white rounded-xl shadow-md overflow-hidden w-full max-w-[400px]">
 {/* Imagen principal con esquinas superiores redondeadas */}
<Link href={`/events/${event._id}`} className="block">
<div className="relative h-48 w-full">
<Image src={event.imageUrl}
 alt={event.title}
 layout="fill"
 objectFit="cover"
 className="rounded-t-xl"
 />
 {/* Badge de cantidad de pedidos */}
 {orderQuantity && orderQuantity >1 && (
<div className="absolute right-2 top-2 flex items-center justify-center rounded-full bg-primary-500 p-1 text-white shadow-lg"
 style={{ width: '30px', height: '30px' }}
 >
<span className="text-xs font-bold">x{orderQuantity}</span>
</div>
 )}
 {/* Acciones del creador del evento */}
 {isEventCreator && !hidePrice && (
<div className="absolute top-2 right-2 flex flex-col gap-4 rounded-xl bg-white p-3 shadow-sm transition-all">
<Link href={`/events/${event._id}/update`}>
<Image src="/assets/icons/edit.svg" width={20} height={20} alt="edit" />
</Link>
<DeleteConfirmation eventId={event._id} />
</div>
 )}
</div>
</Link>

 {/* Contenedor de contenido con fondo blanco y padding */}
<div className="p-5">
 {/* Etiquetas unificadas con íconos */}
<div className="flex flex-wrap gap-2 mb-3">
 {/* Etiqueta de Fecha y Hora */}
<div className="flex items-center bg-gray-50 px-3 py-1 rounded-lg text-gray-600 text-xs">
<Image src="/assets/icons/calendar.svg" alt="calendar" width={14} height={14} className="mr-1"
 />
<span>{formatDateTime(event.startDateTime).dateTime}</span>
</div>
 {/* Etiqueta de Categoría */}
<div className="flex items-center bg-gray-50 px-3 py-1 rounded-lg text-gray-600 text-xs">
<Image src="/assets/icons/link.svg" alt="category" width={14} height={14} className="mr-1"
 />
<span>{event.category.name}</span>
</div>
 {/* Etiqueta de Precio */}
 {!hidePrice && (
<div className="flex items-center bg-gray-50 px-3 py-1 rounded-lg text-gray-600 text-xs">
<Image src="/assets/icons/dollar.svg" alt="price" width={14} height={14} className="mr-1"
 />
<span>{event.isFree ? 'GRATIS' : `$${event.price}`}</span>
</div>
 )}
</div>

 {/* Título del evento */}
<Link href={`/events/${event._id}`}>
<h3 className="text-lg font-bold mb-2 line-clamp-2">{event.title}</h3>
</Link>

 {/* Ubicación - usando un placeholder ya que no está en el modelo actual */}
<p className="text-gray-600 mb-2 flex items-center">
<svg xmlns="http://www.w3.org/2000/svg"
 className="h-4 w-4 mr-1"
 viewBox="002020"
 fill="currentColor"
 >
<path fillRule="evenodd"
 d="M5.054.05a770119.99.9L1018.9l-4.95-4.95a770010-9.9zM1011a220100-42200004z"
 clipRule="evenodd"
 />
</svg>
 Ubicación del evento</p>

 {/* Organizador y enlace de pedido */}
<div className="flex justify-between items-center mt-4">
<p className="text-sm text-gray-500">
 Organizado por: {event.organizer.firstName} {event.organizer.lastName}
</p>
 {hasOrderLink && (
<Link href={`orders?eventId=${event._id}`}
 className="flex items-center text-primary-500 text-sm"
 >
 Detalles del pedido<Image src="/assets/icons/arrow.svg"
 alt="search"
 width={10}
 height={10}
 className="ml-1"
 />
</Link>
 )}
</div>
</div>
</div>
 );
};

export default Card;