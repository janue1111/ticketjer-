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
    <div className="w-full bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden flex flex-col">
      {/* Imagen superior cuadrada con cover */}
      <Link href={`/events/${event._id}`} className="block">
        <div className="relative w-full aspect-square bg-gray-100 overflow-hidden rounded-t-2xl">
          <Image
            src={event.imageUrl}
            alt={event.title}
            fill
            sizes="(max-width: 768px) 50vw, 25vw"
            className="object-cover"
          />
          {orderQuantity && orderQuantity > 1 && (
            <div
              className="absolute right-2 top-2 flex items-center justify-center rounded-full bg-primary-500 p-1 text-white shadow-lg"
              style={{ width: '30px', height: '30px' }}
            >
              <span className="text-xs font-bold">x{orderQuantity}</span>
            </div>
          )}
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

      {/* Contenido */}
      <div className="p-3 sm:p-4 flex flex-col">
        <div className="mb-2 flex items-center justify-between gap-2">
          <div className="flex items-center gap-1 text-gray-600 text-[11px] sm:text-xs min-w-0">
            <Image src="/assets/icons/calendar.svg" alt="calendar" width={12} height={12} />
            <span className="truncate">{formatDateTime(event.startDateTime).dateTime}</span>
          </div>
          <div className="shrink-0 rounded-full border border-pink-400 text-pink-600 text-[10px] sm:text-xs px-2 py-0.5">
            {event.category.name}
          </div>
        </div>

        <Link href={`/events/${event._id}`} className="mb-1">
          <h3 className="text-sm sm:text-base font-semibold truncate">{event.title}</h3>
        </Link>

        <p className="text-gray-600 text-xs sm:text-[13px] truncate mb-1">
          {event.location || 'Ubicación no especificada'}
        </p>

        {!hidePrice && (
          <p className="mt-auto text-sm sm:text-base font-semibold">
            {event.isFree ? 'GRATIS' : `Desde S/${event.price}`}
          </p>
        )}

        {hasOrderLink && (
          <Link href={`orders?eventId=${event._id}`} className="flex items-center text-primary-500 text-xs mt-1 md:text-sm">
            Detalles del pedido
            <Image src="/assets/icons/arrow.svg" alt="search" width={8} height={8} className="ml-1" />
          </Link>
        )}
      </div>
    </div>
  );
};

export default Card;