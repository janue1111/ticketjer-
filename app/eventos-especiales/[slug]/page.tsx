import ImmersiveEventPage from '@/components/shared/ImmersiveEventPage';
import { getEventBySlug } from '@/lib/actions/event.actions';

type EventDetailsProps = {
    params: Promise<{ slug: string }>
};

const EventDetails = async ({ params }: EventDetailsProps) => {
    const resolvedParams = (await params) ?? { slug: '' };
    const event = await getEventBySlug(resolvedParams.slug);

    return (
        <ImmersiveEventPage event={event} />
    );
};

export default EventDetails;
