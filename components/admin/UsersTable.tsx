'use client'

import Image from 'next/image'
import { ROLE_LABELS } from '@/constants'
import UserRoleSelector from './UserRoleSelector'
import type { UserRole } from '@/types'

interface User {
    _id: string
    firstName: string
    lastName: string
    email: string
    username: string
    photo: string
    role: UserRole
    createdAt: Date
}

interface UsersTableProps {
    users: User[]
}

export default function UsersTable({ users }: UsersTableProps) {
    if (users.length === 0) {
        return (
            <div className="flex-center min-h-[400px] w-full flex-col gap-3 rounded-lg bg-grey-50 py-28 text-center">
                <p className="p-bold-20">No se encontraron usuarios</p>
            </div>
        )
    }

    return (
        <div className="overflow-x-auto">
            <table className="w-full border-collapse">
                <thead>
                    <tr className="border-b bg-grey-50">
                        <th className="p-4 text-left">Usuario</th>
                        <th className="p-4 text-left">Email</th>
                        <th className="p-4 text-left">Username</th>
                        <th className="p-4 text-left">Rol Actual</th>
                        <th className="p-4 text-left">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user._id} className="border-b hover:bg-gray-50">
                            <td className="p-4">
                                <div className="flex items-center gap-3">
                                    <Image
                                        src={user.photo}
                                        alt={user.firstName}
                                        width={40}
                                        height={40}
                                        className="rounded-full"
                                    />
                                    <div>
                                        <p className="font-medium">
                                            {user.firstName} {user.lastName}
                                        </p>
                                    </div>
                                </div>
                            </td>
                            <td className="p-4">
                                <p className="text-sm text-gray-600">{user.email}</p>
                            </td>
                            <td className="p-4">
                                <p className="text-sm text-gray-600">{user.username}</p>
                            </td>
                            <td className="p-4">
                                <span className={`inline-flex rounded-full px-3 py-1 text-sm font-medium ${user.role === 'admin'
                                        ? 'bg-purple-100 text-purple-800'
                                        : user.role === 'organizer'
                                            ? 'bg-blue-100 text-blue-800'
                                            : 'bg-gray-100 text-gray-800'
                                    }`}>
                                    {ROLE_LABELS[user.role]}
                                </span>
                            </td>
                            <td className="p-4">
                                <UserRoleSelector
                                    userId={user._id}
                                    currentRole={user.role}
                                    userName={`${user.firstName} ${user.lastName}`}
                                />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
