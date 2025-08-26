
import { getEventById } from "@/lib/actions/event.actions";
import { auth } from "@clerk/nextjs/server";
import { IEvent } from "@/lib/database/models/event.model";
import CheckoutClient from "./CheckoutClient";



const CheckoutPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const { sessionClaims } = await auth();
  const userId = sessionClaims?.userId as string;
  const event: IEvent = await getEventById(id);

  return (
    <>
      <section className="bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
        <h3 className="wrapper h3-bold text-center sm:text-left">
          Finalizar Compra
        </h3>
      </section>

      <div className="wrapper my-8">
        {/* Placeholder for the checkout form and payment options */}
        <CheckoutClient event={event} userId={userId} />
      </div>
    </>
  );
};

export default CheckoutPage;
