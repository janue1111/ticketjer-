import Link from "next/link"
import Image from "next/image"
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs"
import { Suspense } from "react"
import { Button } from "../ui/button"
import NavItems from "./NavItems"
import MobileNav from "./MobileNav"
import Search from "./Search"

const Header = () => {
  return (
    <header className="w-full border-b">
      <div className="wrapper py-3">
        {/* Primera fila: Logo, Nav, User buttons */}
        <div className="flex items-center justify-between gap-4 mb-3 md:mb-0">
          <Link href="/" className="w-28 md:w-36 shrink-0">
            <Image src="https://i.imgur.com/UOglsq5.png"
              alt="TicketiHub Logo"
              width={128}
              height={38} />
          </Link>

          {/* Barra de búsqueda - visible solo en desktop */}
          <div className="hidden md:flex flex-1 max-w-2xl">
            <Suspense fallback={<div className="w-full h-10 bg-gray-100 rounded-full animate-pulse" />}>
              <Search placeholder="Busca por artista, evento o lugar" />
            </Suspense>
          </div>

          <div className="flex items-center justify-end gap-3 shrink-0">
            <SignedIn>
              <nav className="hidden lg:flex">
                <NavItems />
              </nav>
              <UserButton afterSignOutUrl="/" />
              <MobileNav />
            </SignedIn>
            <SignedOut>
              <Button asChild className='rounded-full bg-red-600 hover:bg-red-700 text-white' size='lg' >
                <Link href="/sign-in">
                  Login
                </Link>
              </Button>
            </SignedOut>
          </div>
        </div>

        {/* Segunda fila: Búsqueda en móvil */}
        <div className="md:hidden w-full">
          <Suspense fallback={<div className="w-full h-10 bg-gray-100 rounded-full animate-pulse" />}>
            <Search placeholder="Busca por artista, evento o lugar" />
          </Suspense>
        </div>
      </div>
    </header>
  )
}

export default Header