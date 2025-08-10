import { Button } from '@/components/ui/button'
import Link from 'next/link'
import Image from 'next/image'
import Collection from '@/components/shared/Collection'
import { getAllEvents } from '@/lib/actions/event.actions';
import Search from '@/components/shared/Search';
import { SearchParamProps } from '@/types';
import CategoryFilter from '@/components/shared/CategoryFilter';

export default async function Home({searchParams}: SearchParamProps) {
  const resolvedSearchParams = (await searchParams) ?? {};
  const page = Number(resolvedSearchParams?.page) || 1;
  const searchText = (resolvedSearchParams?.query as string) || '';
  const category = (resolvedSearchParams?.category as string) || '';

  const events= await getAllEvents({
    query:searchText,
    category,
    page,
    limit:6
  })

  // console.log(events)
  return (
  <>
<section className='bg-primary-50 bg-dotted-pattern bg-container py-5 md:py-10'>
  <div className='wrapper grid grid-cols-1 gap-5 md:grid-cols-2 2xl:gap-0'>
    <div className='flex flex-col justify-center gap-8'>
      <h1 className='h1-bold'>
        Descubre, conecta y celebra con TICKETJER
      </h1>
      <p className='p-regular-20 md:p-regular-24'>
        Encuentra eventos de cumbia buenos,bonitos y al mejor precio de el mercado.
      </p>
      <Button size="lg" asChild className="button w-full sm:w-fit bg-red-600 hover:bg-red-700 text-white">
        <Link href="#events">
          Buscar Eventos
        </Link>
      </Button>
    </div>
    <Image
      src="/assets/images/heroelbueno.jpeg"
      alt="Discover exciting events"
      width={1000}
      height={1000}
      className='max-h-[70vh] object-contain object-center 2xl:max-h-[50vh]'
    />
  </div>
</section>
<section id='events' className='wrapper my-8 flex flex-col gap-8 md:gap-12'>
  <h2 className='h3-bold'>
    Eventos
  </h2>
  <div className='flex w-full flex-col gap-5 md:flex-row'>
    <Search/>
    <CategoryFilter/>
  </div>
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
  )
}
