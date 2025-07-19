import Logo from '@/components/navbar/Logo'
import Link from 'next/link'

export default function NotFound() {
    return (
        <div className="h-screen flex flex-col items-center justify-center text-center px-4">
            <h1 className="text-4xl font-bold mb-4">404 - Page non trouvée</h1>
            <Logo />
            <p className="text-lg text-gray-600 mt-8">Oops! cette page n&apos;existe pas.</p>
            <Link
                href="/"
                className="mt-6 inline-block text-blue-600 hover:underline"
            >
                Revenir à l’accueil
            </Link>
        </div>
    )
}
