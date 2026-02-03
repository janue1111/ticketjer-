'use server'

import { connectToDatabase } from '@/lib/database'
import User from '@/lib/database/models/user.model'
import type { UserRole } from '@/types'

/**
 * Check if a user has one of the required roles
 * @param clerkId - Clerk user ID
 * @param requiredRoles - Array of allowed roles
 * @returns boolean indicating if user has permission
 */
export async function checkUserRole(
    clerkId: string,
    requiredRoles: UserRole[]
): Promise<boolean> {
    try {
        await connectToDatabase()

        const user = await User.findOne({ clerkId }).select('role')

        if (!user) return false

        return requiredRoles.includes(user.role)
    } catch (error) {
        console.error('Error checking user role:', error)
        return false
    }
}

/**
 * Check if user can create events (organizer or admin)
 * @param clerkId - Clerk user ID
 * @returns boolean indicating if user can create events
 */
export async function canCreateEvent(clerkId: string): Promise<boolean> {
    return checkUserRole(clerkId, ['organizer', 'admin'])
}

/**
 * Check if user is admin
 * @param clerkId - Clerk user ID
 * @returns boolean indicating if user is admin
 */
export async function isAdmin(clerkId: string): Promise<boolean> {
    return checkUserRole(clerkId, ['admin'])
}

/**
 * Get user with role information
 * @param clerkId - Clerk user ID
 * @returns User object with role or null
 */
export async function getUserRole(clerkId: string): Promise<UserRole | null> {
    try {
        await connectToDatabase()

        const user = await User.findOne({ clerkId }).select('role')

        return user ? user.role : null
    } catch (error) {
        console.error('Error getting user role:', error)
        return null
    }
}
