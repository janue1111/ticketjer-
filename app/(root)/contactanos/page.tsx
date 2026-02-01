import Link from "next/link";

// Forzar rendering dinámico para evitar errores de build con componentes que usan useSearchParams
export const dynamic = 'force-dynamic';

const ContactanosPage = () => {
  return (
    <section className="py-8 wrapper flex flex-col gap-8 md:gap-12">
      <h2 className="h2-bold">Contáctanos</h2>

      <div className="flex flex-col gap-4">
        <p>Puedes encontrarnos en las siguientes redes sociales:</p>
        <div className="flex flex-col gap-2">
          <Link href="https://www.facebook.com/profile.php?id=61573004905232" target="_blank" rel="noopener noreferrer">
            <p className="text-blue-600 hover:underline">Facebook</p>
          </Link>
          <Link href="https://www.instagram.com/ticketsasoo/" target="_blank" rel="noopener noreferrer">
            <p className="text-pink-600 hover:underline">Instagram</p>
          </Link>
          <Link href="https://www.youtube.com/@TICKETSASO" target="_blank" rel="noopener noreferrer">
            <p className="text-red-600 hover:underline">YouTube</p>
          </Link>
          <Link href="https://wa.me/51992748352" target="_blank" rel="noopener noreferrer">
            <p className="text-green-600 hover:underline">WhatsApp: +51 992 748 352</p>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ContactanosPage;