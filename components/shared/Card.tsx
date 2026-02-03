"use client";
import Link from "next/link";
import { IEvent } from "@/lib/database/models/event.model";
import React, { useCallback } from "react";
import { formatDateTime, pushToDataLayer } from "@/lib/utils";
import Image from "next/image";
import { useAuth } from "@clerk/nextjs";
import { DeleteConfirmation } from "./DeleteConfirmation";

type CardProps = {
  event: IEvent;
  hasOrderLink?: boolean;
  hidePrice?: boolean;
  orderQuantity?: number;
  orderId?: string;
};

const Card = ({ event, hasOrderLink, hidePrice, orderQuantity, orderId }: CardProps) => {
  const { userId } = useAuth();

  // Check if user is event creator by comparing Clerk userId with organizer's clerkId
  // Defensive check: organizer might be null for old events
  const isEventCreator = userId && event.organizer
    ? event.organizer.clerkId === userId
    : false;

  // Precio más bajo de la fase activa
  const activePhase = event.pricingPhases?.find((phase) => phase.active);
  const prices = activePhase?.tiers?.map((tier) => Number(tier.price)).filter((p) => !Number.isNaN(p)) || [];
  const lowestPrice: number | null = prices.length > 0 ? Math.min(...prices) : null;

  const handleViewItemClick = useCallback(() => {
    const unitPrice = lowestPrice ?? 0;
    pushToDataLayer("view_item", {
      currency: "PEN",
      value: unitPrice,
      items: [
        {
          item_id: event._id,
          item_name: event.title,
          item_category: event.category?.name,
          price: unitPrice,
          quantity: 1,
        },
      ],
    });
  }, [event, lowestPrice]);

  // Función auxiliar para formatear fecha estilo Vaope: "13/02/2026 • 6:00 PM"
  const formatDateVaope = (dateString: Date) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    let hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // la hora '0' debe ser '12'
    return `${day}/${month}/${year} • ${hours}:${minutes} ${ampm}`;
  };

  const linkHref = orderId
    ? `/tickets/${orderId}`
    : event.layoutType === 'immersive' && event.slug
      ? `/eventos-especiales/${event.slug}`
      : `/events/${event._id}`;

  return (
    <article className="w-full overflow-hidden bg-white border-2 border-neutral-300 relative h-full rounded-md hover:shadow-lg transition-all duration-300 flex flex-col group">
      <div className="relative p-2">
        <Link
          href={linkHref}
          className="relative block z-1 w-full aspect-square overflow-hidden rounded bg-gray-100"
          onClick={handleViewItemClick}
        >
          {/* Imagen (adaptada a Next.js Image) */}
          <div className="relative w-full h-full">
            <Image
              src={event.imageUrl}
              alt={event.title}
              fill
              sizes="(max-width: 768px) 50vw, 25vw"
              className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
            />

            {/* Overlay con Hover Effect */}
            <div className="absolute inset-0 flex items-center justify-center bg-primary-500/20 backdrop-blur-[2px] opacity-0 transition-opacity duration-200 group-hover:opacity-100">
              <div className="flex flex-col items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                <div className="bg-white p-3 rounded-full shadow-lg text-primary-500">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="tabler-icon tabler-icon-ticket size-6">
                    <path d="M15 5l5 5"></path>
                    <path d="M15 11l5 5"></path>
                    <path d="M15 17l5 5"></path>
                    <path d="M5 5h14a2 2 0 0 1 2 2v3a2 2 0 0 0 0 4v3a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-3a2 2 0 0 0 0 -4v-3a2 2 0 0 1 2 -2"></path>
                  </svg>
                </div>
                <div role="button" className="px-4 py-1.5 bg-primary-500 text-white text-sm font-bold rounded-full shadow-md">
                  Comprar
                </div>
              </div>
            </div>
          </div>

          {/* Quantity Badge */}
          {orderQuantity && orderQuantity > 1 && (
            <div className="absolute right-2 top-2 flex items-center justify-center rounded-full bg-primary-500 w-7 h-7 text-white shadow-md z-10">
              <span className="text-[10px] font-bold">x{orderQuantity}</span>
            </div>
          )}

          {/* Edit/Delete Actions */}
          {isEventCreator && !hidePrice && (
            <div className="absolute top-2 right-2 flex flex-col gap-2 rounded-lg bg-white/90 backdrop-blur-md p-2 shadow-sm z-20 group-hover:opacity-100 opacity-0 transition-opacity duration-200">
              <Link href={`/events/${event._id}/update`} className="p-1 hover:bg-gray-100 rounded-md transition-colors">
                <Image src="/assets/icons/edit.svg" width={16} height={16} alt="edit" />
              </Link>
              <DeleteConfirmation eventId={event._id.toString()} />
            </div>
          )}
        </Link>
      </div>

      <div className="flex flex-col flex-grow px-3 pb-3 pt-1 space-y-2.5">
        {/* Metadatos: Fecha y Categoría */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="inline-flex items-center gap-x-1 whitespace-nowrap tabular-nums font-medium px-2 py-1 text-primary-500 bg-primary-50 rounded-full text-[11px] leading-none">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="tabler-icon tabler-icon-calendar">
              <path d="M4 7a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path>
              <path d="M16 3v4"></path>
              <path d="M8 3v4"></path>
              <path d="M4 11h16"></path>
              <path d="M11 15h1"></path>
              <path d="M12 15v3"></path>
            </svg>
            <span className="mt-[1px]">{formatDateVaope(event.startDateTime)}</span>
          </div>

          <div className="inline-flex items-center gap-x-1 whitespace-nowrap ring-1 ring-neutral-200 font-medium px-2 py-1 text-neutral-400 bg-transparent rounded-full text-[11px] leading-none capitalize tracking-wide">
            {event.category.name}
          </div>
        </div>

        <header className="flex flex-col gap-1">
          <Link
            href={linkHref}
            onClick={handleViewItemClick}
            className="group/title"
          >
            <h2 className="text-gray-800 text-[15px] font-bold line-clamp-1 leading-snug group-hover/title:text-primary-500 transition-colors">
              {event.title}
            </h2>
          </Link>

          <div className="flex items-start gap-1">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400 mt-0.5 shrink-0">
              <path d="M9 11a3 3 0 1 0 6 0a3 3 0 0 0 -6 0"></path>
              <path d="M17.657 16.657l-4.243 4.243a2 2 0 0 1 -2.827 0l-4.244 -4.243a8 8 0 1 1 11.314 0z"></path>
            </svg>
            <p className="text-gray-400 text-xs font-medium line-clamp-1 leading-snug">
              {event.location || 'Ubicación no especificada'}
            </p>
          </div>
        </header>

        {/* Precio - Bottom */}
        {!hidePrice && (
          <div className="mt-auto pt-3 border-t border-dashed border-gray-100 flex items-end justify-between">
            <p className="text-xs text-gray-400 font-medium pb-0.5">Desde</p>
            <p className="text-lg font-bold text-gray-900 leading-none">
              {lowestPrice === 0 ? 'GRATIS' : lowestPrice !== null ? `S/ ${lowestPrice.toFixed(2)}` : 'Consultar'}
            </p>
          </div>
        )}

        {hasOrderLink && (
          <Link href={`orders?eventId=${event._id}`} className="flex items-center justify-center w-full mt-2 py-1.5 text-primary-600 bg-primary-50/50 hover:bg-primary-50 rounded text-xs font-medium transition-colors">
            Ver mi pedido
          </Link>
        )}
      </div>
    </article>
  );
};

export default Card;