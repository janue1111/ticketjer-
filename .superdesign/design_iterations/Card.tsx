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
<div className="bg-white rounded-xl shadow-md overflow-hidden w-full max-w-[400px] h-[480px] flex flex-col">
 {/* Contenedor de imagen -65% del espacio */}
<Link href={`/events/${event._id}`} className="block h-[65%] bg-gray-100 flex items-center justify-center">
<div className="relative w-full h-full flex items-center justify-center">
<Image src={event.imageUrl}
 alt={event.title}
 width={400}
 height={260}
 className="max-h-full max-w-full object-contain"
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

 {/* Contenido textual -35% del espacio */}
<div className="p-4 h-[35%] flex flex-col">
 {/* Grupo de badges (fecha y categoría) */}
<div className="flex gap-2 mb-2">
 {/* Badge de fecha */}
<div className="flex items-center bg-gray-100 px-2 py-1 rounded-full text-gray-600 text-xs">
<Image src="/assets/icons/calendar.svg" alt="calendar" width={12} height={12} className="mr-1"
 />
<span className="text-xs">{formatDateTime(event.startDateTime).dateTime}</span>
</div>
 {/* Badge de categoría */}
<div className="bg-gray-100 px-2 py-1 rounded-full text-xs text-gray-600">
 {event.category.name}
</div>
</div>

 {/* Título del evento */}
<Link href={`/events/${event._id}`} className="mb-1">
<h3 className="text-base font-bold line-clamp-2 md:text-lg lg:text-xl">
 {event.title}
</h3>
</Link>

 {/* Ubicación */}
<p className="text-gray-600 mb-1 flex items-center text-xs md:text-sm">
<svg xmlns="http://www.w3.org/2000/svg"
 className="h-3 w-3 mr-1"
 viewBox="002020"
 fill="currentColor"
 >
<path fillRule="evenodd"
 d="M5.054.05a770119.99.9L1018.9l-4.95-4.95a770010-9.9zM1011a220100-42200004z"
 clipRule="evenodd"
 />
</svg>
 Ubicación del evento</p>

 {/* Precio */}
 {!hidePrice && (
<p className="text-sm font-semibold mt-auto md:text-base">
 {event.isFree ? 'GRATIS' : `Desde $${event.price}`}
</p>
 )}

 {/* Enlace de pedido */}
 {hasOrderLink && (
<Link href={`orders?eventId=${event._id}`}
 className="flex items-center text-primary-500 text-xs mt-1 md:text-sm"
 >
 Detalles del pedido<Image src="/assets/icons/arrow.svg"
 alt="search"
 width={8}
 height={8}
 className="ml-1"
 />
</Link>
 )}
</div>
</div>
 );
};

export default Card;