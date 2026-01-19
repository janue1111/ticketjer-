import Link from "next/link"
import Image from "next/image"

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white border-t border-gray-700">
      <div className="wrapper py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo y descripción */}
          <div className="md:col-span-1">
            <Link href='/' className="inline-block mb-4">
              <Image
                src="https://i.imgur.com/UOglsq5.png"
                alt="TicketiHub Logo"
                width={128}
                height={38}
                className="brightness-110"
              />
            </Link>
            <p className="text-gray-300 text-sm leading-relaxed">
              Tu plataforma de confianza para descubrir y adquirir entradas a los mejores eventos.
            </p>
          </div>

          {/* Enlaces rápidos */}
          <div className="md:col-span-1">
            <h3 className="text-lg font-semibold mb-4 text-blue-400">Enlaces Rápidos</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-300 hover:text-blue-400 transition-colors duration-200">
                  Inicio
                </Link>
              </li>
              <li>
                <Link href="/profile" className="text-gray-300 hover:text-blue-400 transition-colors duration-200">
                  Mi Perfil
                </Link>
              </li>
            </ul>
          </div>

          {/* Soporte */}
          <div className="md:col-span-1">
            <h3 className="text-lg font-semibold mb-4 text-blue-400">Soporte</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/contactanos" className="text-gray-300 hover:text-blue-400 transition-colors duration-200">
                  Contáctanos
                </Link>
              </li>
              <li>
                <Link href="/libro-de-reclamaciones" className="block hover:scale-105 transition-transform duration-200">
                  <Image
                    src="https://i.imgur.com/JAzOr2q.jpeg"
                    alt="Libro de Reclamaciones"
                    width={120}
                    height={40}
                    className="brightness-90 hover:brightness-110 transition-all duration-200"
                  />
                </Link>
              </li>
              <li>
                <Link href="/terminos-y-condiciones" className="text-gray-300 hover:text-blue-400 transition-colors duration-200">
                  Términos y Condiciones
                </Link>
              </li>
            </ul>
          </div>

          {/* Redes sociales */}
          <div className="md:col-span-1">
            <h3 className="text-lg font-semibold mb-4 text-blue-400">Síguenos</h3>
            <div className="flex flex-col space-y-2">
              <Link
                href="https://www.facebook.com/profile.php?id=61573004905232"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-blue-400 transition-colors duration-200 flex items-center gap-2"
              >
                <span>📘</span> Facebook
              </Link>
              <Link
                href="https://www.instagram.com/ticketsasoo/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-pink-400 transition-colors duration-200 flex items-center gap-2"
              >
                <span>📷</span> Instagram
              </Link>
              <Link
                href="https://www.youtube.com/@TICKETSASO"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-red-400 transition-colors duration-200 flex items-center gap-2"
              >
                <span>📺</span> YouTube
              </Link>
            </div>
          </div>
        </div>

        {/* Línea divisoria */}
        <div className="border-t border-gray-700 mt-8 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2025 TICKETSASO. Todos los derechos reservados.
            </p>
            <p className="text-gray-400 text-sm mt-2 md:mt-0">
              Hecho con ❤️ para los amantes de eventos
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer