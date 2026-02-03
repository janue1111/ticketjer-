import EventForm from "@/components/shared/EventForm";
import UnauthorizedPage from "@/components/shared/UnauthorizedPage";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { canCreateEvent } from "@/lib/utils/auth.utils";

export const dynamic = 'force-dynamic';

const CreateEvent = async () => {
  const { userId } = await auth();

  if (!userId) redirect("/sign-in");

  // Check if user has permission to create events
  const hasPermission = await canCreateEvent(userId);

  if (!hasPermission) {
    return (
      <UnauthorizedPage
        title="No puedes crear eventos"
        message="Tu cuenta actual no tiene permisos para crear eventos. Si deseas convertirte en organizador, contacta al administrador de TicketiHub."
      />
    );
  }

  return (
    <>
      <section className="bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
        <h3 className="wrapper h3-bold text-center sm:text-left">
          Create Event
        </h3>
      </section>
      <div className="wrapper my-8">
        <EventForm userId={userId} type="Create" />
      </div>
    </>
  );
};

export default CreateEvent;