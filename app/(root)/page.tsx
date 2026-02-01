import HeroCarousel from '@/components/shared/HeroCarousel';
import Collection from '@/components/shared/Collection';
import { getAllEvents } from '@/lib/actions/event.actions';
import { SearchParamProps } from '@/types';

export const dynamic = 'force-dynamic';

export default async function Home({ searchParams }: SearchParamProps) {
  const resolvedSearchParams = (await searchParams) ?? {};
  const page = Number(resolvedSearchParams?.page) || 1;
  const searchText = (resolvedSearchParams?.query as string) || '';
  const category = (resolvedSearchParams?.category as string) || '';

  const events = await getAllEvents({
    query: searchText,
    category,
    page,
    limit: 6,
  });

  return (
    <>
      <HeroCarousel />

      <section id="events" className="wrapper my-8 flex flex-col gap-8 md:gap-12">
        <h2 className="h2-bold">Eventos</h2>

        <Collection
          data={events?.data}
          emptyTitle="No hay eventos disponibles"
          emptyStateSubtext="¡Vuelve pronto para ver más eventos increíbles!"
          collectionType="All_Events"
          limit={6}
          page={page}
          totalPages={events?.totalPages}
        />
      </section>
    </>
  );
}