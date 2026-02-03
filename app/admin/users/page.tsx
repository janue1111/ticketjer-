import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import { isAdmin } from '@/lib/utils/auth.utils'
import { getAllUsers } from '@/lib/actions/user.actions'
import UnauthorizedPage from '@/components/shared/UnauthorizedPage'
import UsersTable from '@/components/admin/UsersTable'
import Search from '@/components/shared/Search'
import { Suspense } from 'react'

export const dynamic = 'force-dynamic'

type SearchParamProps = {
    searchParams?: Promise<{ query?: string; page?: string }>
}

export default async function AdminUsersPage({ searchParams }: SearchParamProps) {
    const { userId } = await auth()

    if (!userId) redirect('/sign-in')

    // Check if user is admin
    const hasAdminAccess = await isAdmin(userId)

    if (!hasAdminAccess) {
        return (
            <UnauthorizedPage
                title="Acceso Restringido"
                message="Solo los administradores pueden acceder al panel de gestión de usuarios."
            />
        )
    }

    const params = await searchParams
    const query = params?.query || ''
    const currentPage = Number(params?.page) || 1
    const limit = 10

    const usersData = await getAllUsers({
        page: currentPage,
        limit,
        searchString: query,
    })

    const users = usersData?.data || []
    const totalPages = usersData?.totalPages || 0

    return (
        <>
            <section className="bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
                <div className="wrapper">
                    <h3 className="h3-bold text-center sm:text-left">
                        Gestión de Usuarios
                    </h3>
                    <p className="mt-2 text-grey-600">
                        Administra los roles de los usuarios de TicketiHub
                    </p>
                </div>
            </section>

            <section className="wrapper my-8">
                {/* Search */}
                <div className="mb-6">
                    <Suspense fallback={<div className="h-10 bg-gray-100 rounded-full animate-pulse" />}>
                        <Search placeholder="Buscar usuarios por nombre, email o username..." />
                    </Suspense>
                </div>

                {/* Stats */}
                <div className="mb-6 grid gap-4 sm:grid-cols-3">
                    <div className="rounded-lg bg-white p-4 shadow">
                        <p className="text-sm text-grey-600">Total Usuarios</p>
                        <p className="text-2xl font-bold">{users.length}</p>
                    </div>
                    <div className="rounded-lg bg-blue-50 p-4 shadow">
                        <p className="text-sm text-grey-600">Organizadores</p>
                        <p className="text-2xl font-bold">
                            {users.filter((u: any) => u.role === 'organizer').length}
                        </p>
                    </div>
                    <div className="rounded-lg bg-purple-50 p-4 shadow">
                        <p className="text-sm text-grey-600">Administradores</p>
                        <p className="text-2xl font-bold">
                            {users.filter((u: any) => u.role === 'admin').length}
                        </p>
                    </div>
                </div>

                {/* Users Table */}
                <div className="rounded-lg bg-white shadow">
                    <UsersTable users={users} />
                </div>

                {/* TODO: Add pagination if needed */}
                {totalPages > 1 && (
                    <div className="mt-6 flex-center">
                        <p className="text-sm text-grey-600">
                            Página {currentPage} de {totalPages}
                        </p>
                    </div>
                )}
            </section>
        </>
    )
}
