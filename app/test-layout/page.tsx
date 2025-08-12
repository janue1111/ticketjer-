
import Image from 'next/image';

const TestLayoutPage = () => {
  const backgroundImageUrl = 'https://static.vaope.com/public/products/2471/3328-LANDING-FONDO-JOELMA-TOUR-MISTER-PARDO-IQUITOS.jpg';

  return (
    <main
      className="bg-cover bg-center bg-fixed min-h-screen"
      style={{ backgroundImage: `url(${backgroundImageUrl})` }}
    >
      <div className="flex flex-col items-center py-10 space-y-8">
        <Image
          src="https://static.vaope.com/public/products/2471/8612-LANDING-ARTISTAS-JOELMA-TOUR-MISTER-PARDO-IQUITOS.png"
          alt="Artistas del evento"
          width={900}
          height={500}
          className="mx-auto"
        />
        <Image
          src="https://static.vaope.com/public/products/2471/8957-LANDING-FECHA-UBIC-JOELMA-TOUR-MISTER-PARDO-IQUITOS.png"
          alt="Fecha y ubicación del evento"
          width={900}
          height={300}
          className="mx-auto"
        />
        <Image
          src="https://static.vaope.com/public/products/2471/9211-CROQUIS-JOELMA-IQUITOS.png"
          alt="Croquis del evento"
          width={900}
          height={900}
          className="mx-auto"
        />

        {/* Card de Entradas */}
        <div className="w-full max-w-2xl p-8 mx-auto rounded-2xl bg-neutral-700/80 backdrop-blur-md">
          <h2 className="text-2xl font-bold text-white">ENTRADAS</h2>
          <p className="text-neutral-300">Disfruta más que nunca.</p>
          <button className="w-full py-3 mt-6 font-bold text-white bg-pink-500 rounded-full">
            COMPRAR AHORA
          </button>
        </div>
      </div>
    </main>
  );
};

export default TestLayoutPage;
