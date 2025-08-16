import { IEvent } from "@/lib/database/models/event.model";
import React from "react";
import Card from "./Card";
import Pagination from "./Pagination";
import { IOrder } from "@/lib/database/models/order.model";

type CollectionProps = {
  data: (IEvent | IOrder)[];
  emptyTitle: string;
  emptyStateSubtext: string;
  page: number | string;
  totalPages?: number;
  urlParamName?: string;
  collectionType?: "Events_Organized" | "My_Tickets" | "All_Events";
  limit?: number;
};

const Collection = ({
  data,
  emptyTitle,
  emptyStateSubtext,
  page,
  totalPages = 0,
  collectionType,
  urlParamName,
  limit,
}: CollectionProps) => {
  return (
    <>
      {data.length > 0 ? (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex flex-col items-center gap-10">
            <ul className="grid w-full grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 md:gap-6 lg:grid-cols-4">
              {data.map((item) => {
                const isMyTickets = collectionType === "My_Tickets";
                const event = isMyTickets ? (item as IOrder).event : (item as IEvent);
                const key = item._id.toString();
                const hasOrderLink = collectionType === "Events_Organized";
                const hidePrice = collectionType === "My_Tickets";
                const orderQuantity = isMyTickets ? (item as IOrder).quantity : undefined;

                return (
                  <li key={key} className="w-full">
                    <Card
                      event={event}
                      hasOrderLink={hasOrderLink}
                      hidePrice={hidePrice}
                      orderQuantity={orderQuantity}
                    />
                  </li>
                );
              })}
            </ul>
            {totalPages > 1 && (
              <Pagination
                totalPages={totalPages}
                page={page}
                urlParamName={urlParamName}
              />
            )}
          </div>
        </div>
      ) : (
        <div className="flex-center wrapper min-h-[200px] w-full flex-col gap-3 rounded-[14px] bg-grey-50 py-28 text-center">
          <h3 className="p-bold-20 md:h5-bold">{emptyTitle}</h3>
          <p className="p-regular-14">{emptyStateSubtext}</p>
        </div>
      )}
    </>
  );
};

export default Collection;