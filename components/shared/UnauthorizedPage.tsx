import Link from 'next/link'
import { Button } from '../ui/button'

interface UnauthorizedPageProps {
    title?: string
    message?: string
}

const UnauthorizedPage = ({
    title = "Acceso No Autorizado",
    message = "No tienes permisos para acceder a esta página. Si crees que esto es un error, contacta al administrador."
}: UnauthorizedPageProps) => {
    return (
        <div className="flex-center wrapper min-h-[80vh] flex-col gap-6">
            <div className="flex-center flex-col gap-4 text-center">
                {/* Icon */}
                <div className="rounded-full bg-red-100 p-6">
                    <svg
                        className="h-16 w-16 text-red-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                        />
                    </svg>
                </div>

                {/* Title */}
                <h1 className="h2-bold">{title}</h1>

                {/* Message */}
                <p className="p-regular-18 text-grey-600 max-w-md">
                    {message}
                </p>

                {/* Actions */}
                <div className="flex gap-4 mt-4">
                    <Button asChild size="lg" className="bg-primary-500 hover:bg-primary-600">
                        <Link href="/">
                            Volver al Inicio
                        </Link>
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default UnauthorizedPage
