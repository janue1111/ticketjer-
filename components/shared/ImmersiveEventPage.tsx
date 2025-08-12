import Image from 'next/image';
import { IEvent } from '@/lib/database/models/event.model';
import TicketSelection from './TicketSelection';

type ImmersiveEventPageProps = {
  event: IEvent;
};

const ImmersiveEventPage = async ({ event }: ImmersiveEventPageProps) => {
  const bgUrl = event.immersiveImages?.backgroundUrl || '';
  const artistUrl = event.immersiveImages?.artistUrl || '';
  const dateUrl = event.immersiveImages?.dateUrl || '';
  const zoneMapUrl = event.immersiveImages?.zoneMapUrl || '';

  return (
    <main
      className="bg-cover bg-center bg-fixed min-h-screen"
      style={bgUrl ? { backgroundImage: `url(${bgUrl})` } : undefined}
    >
      <div className="flex flex-col items-center py-10 space-y-8">
        {artistUrl ? (
          <Image
            src={artistUrl}
            alt="Artistas del evento"
            width={900}
            height={500}
            className="mx-auto"
          />
        ) : null}
        {dateUrl ? (
          <Image
            src={dateUrl}
            alt="Fecha y ubicación del evento"
            width={900}
            height={300}
            className="mx-auto"
          />
        ) : null}
        {zoneMapUrl ? (
          <Image
            src={zoneMapUrl}
            alt="Croquis del evento"
            width={900}
            height={900}
            className="mx-auto"
          />
        ) : null}
        <div className="w-full max-w-4xl py-10">
          <TicketSelection event={event} />
        </div>
      </div>
    </main>
  );
};

export default ImmersiveEventPage;
