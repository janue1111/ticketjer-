import Link from "next/link"
import Image from "next/image"

const Footer = () => {
  return (
    <footer className="border-t">
     <div className="flex-center wrapper flex-between flex flex-col gap-4 p-5 text-center sm:flex-row">
      <Link href='/'>
        <Image
        src="/assets/images/logoelbueno.jpg"
        alt="logo"
        width={128}
        height={38}
        />
      </Link>
      <div className="flex flex-col sm:flex-row gap-4 items-center">
        <p>2025 TICKETJER. Todos los derechos reservados</p>
        <div className="flex gap-4">
            <Link href="/libro-de-reclamaciones">
              <p className="hover:underline cursor-pointer">Libro de Reclamaciones</p>
            </Link>
            <Link href="/terminos-y-condiciones">
              <p className="hover:underline cursor-pointer">Términos y Condiciones</p>
            </Link>
            <Link href="/contactanos">
              <p className="hover:underline cursor-pointer">Contáctanos</p>
            </Link>
        </div>
        <div className="flex gap-4">
            <Link href="https://www.facebook.com/profile.php?id=61573004905232" target="_blank" rel="noopener noreferrer">
              <p className="hover:underline cursor-pointer">Facebook</p>
            </Link>
            <Link href="https://www.instagram.com/ticketsasoo/" target="_blank" rel="noopener noreferrer">
              <p className="hover:underline cursor-pointer">Instagram</p>
            </Link>
            <Link href="https://www.youtube.com/@TICKETSASO" target="_blank" rel="noopener noreferrer">
              <p className="hover:underline cursor-pointer">YouTube</p>
            </Link>
        </div>
      </div>
     </div>

    </footer>
  )
}

export default Footer