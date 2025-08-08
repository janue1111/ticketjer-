import { IEvent } from "@/lib/database/models/event.model";
import React from "react";
import Card from "./Card";
import Pagination from "./Pagination";

type CollectionProps = {
 data: IEvent[];
 emptyTitle: string;
 emptyStateSubtext: string;
 page: number | string;
 totalPages?: number;
 urlParamName?: string;
 collectionType?: "Events_Organized" | "My_Tickets" | "All_Events";
 limit?: number; // Propiedad agregada};

const Collection = ({
 data,
 emptyTitle,
 emptyStateSubtext,
 page,
 totalPages =0,
 collectionType,
 urlParamName,
 limit // Propiedad agregada}: CollectionProps) => {
 return (
 <>
 {data.length >0 ? (
<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
<div className="flex flex-col items-center gap-10">
<ul className="grid w-full grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4">
 {data.map((event) => {
 const hasOrderLink = collectionType === "Events_Organized";
 const hidePrice = collectionType === "My_Tickets";
 const orderQuantity = (event as any).orderQuantity;

 return (
<li key={event._id} className="flex justify-center">
<Card event={event}
 hasOrderLink={hasOrderLink}
 hidePrice={hidePrice}
 orderQuantity={orderQuantity}
 />
</li>
 );
 })}
</ul>
 {totalPages >1 && (
<Pagination totalPages={totalPages}
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