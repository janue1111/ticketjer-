"use client"
import { headerLinks } from "@/constants"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useUser } from "@clerk/nextjs"
import { useEffect, useState } from "react"
import { getUserRole } from "@/lib/utils/auth.utils"
import type { UserRole } from "@/types"

const NavItems = () => {
  const pathname = usePathname();
  const { user } = useUser();
  const [userRole, setUserRole] = useState<UserRole | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRole = async () => {
      if (user?.id) {
        const role = await getUserRole(user.id);
        setUserRole(role);
      }
      setLoading(false);
    };
    fetchRole();
  }, [user]);

  // Filter links based on user role
  const filteredLinks = headerLinks.filter(link => {
    // Show "Crear Evento" only to organizers and admins
    if (link.route === '/events/create') {
      return userRole === 'organizer' || userRole === 'admin';
    }
    return true;
  });

  if (loading) {
    return null;
  }

  return (
    <ul className="md:flex-between flex w-full flex-col items-start gap-5 md:flex-row">
      {filteredLinks.map((link) => {
        const isActive = pathname === link.route;

        return (
          <li
            key={link.route}
            className={`${isActive && 'text-primary-500'
              }flex-center p-medium-16 whitespace-nowrap `} >
            <Link href={link.route}>{link.label}</Link>
          </li>
        )
      })}
    </ul>
  )
}

export default NavItems