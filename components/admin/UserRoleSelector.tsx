'use client'

import { useState } from 'react'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import { updateUserRole } from '@/lib/actions/user.actions'
import { ROLE_LABELS } from '@/constants'
import type { UserRole } from '@/types'

interface UserRoleSelectorProps {
    userId: string
    currentRole: UserRole
    userName: string
}

export default function UserRoleSelector({ userId, currentRole, userName }: UserRoleSelectorProps) {
    const [selectedRole, setSelectedRole] = useState<UserRole>(currentRole)
    const [isUpdating, setIsUpdating] = useState(false)

    const handleRoleChange = async (newRole: UserRole) => {
        if (newRole === currentRole) return

        const confirmed = confirm(
            `¿Estás seguro de cambiar el rol de ${userName} a ${ROLE_LABELS[newRole]}?`
        )

        if (!confirmed) return

        setIsUpdating(true)
        try {
            await updateUserRole(userId, newRole)
            setSelectedRole(newRole)
            alert(`✓ Rol actualizado: ${userName} ahora es ${ROLE_LABELS[newRole]}`)
            window.location.reload()
        } catch (error) {
            alert('✗ Error al actualizar el rol. Intenta nuevamente.')
            setSelectedRole(currentRole)
        } finally {
            setIsUpdating(false)
        }
    }

    return (
        <Select
            value={selectedRole}
            onValueChange={(value) => handleRoleChange(value as UserRole)}
            disabled={isUpdating}
        >
            <SelectTrigger className="w-[160px]">
                <SelectValue />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="user">{ROLE_LABELS.user}</SelectItem>
                <SelectItem value="organizer">{ROLE_LABELS.organizer}</SelectItem>
                <SelectItem value="admin">{ROLE_LABELS.admin}</SelectItem>
            </SelectContent>
        </Select>
    )
}
