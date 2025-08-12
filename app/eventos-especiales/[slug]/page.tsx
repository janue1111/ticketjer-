import ImmersiveEventPage from '@/components/shared/ImmersiveEventPage';
import { getEventBySlug } from '@/lib/actions/event.actions';

type EventDetailsProps = {
    params: {
        slug: string;
    };
};

const EventDetails = async ({ params }: EventDetailsProps) => {
    // We will create getEventBySlug in the next step
    const event = await getEventBySlug(params.slug);

    return (
        <ImmersiveEventPage event={event} />
    );
};

export default EventDetails;
