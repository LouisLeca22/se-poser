import Link from "next/link"
import { Button } from "../ui/button"

function EmptyList({
    heading = "Aucun item dans la liste",
    message = 'Continuer d&apos;explorer les hébérgements',
    btnText = 'Retour à la page d&apos;accueil'
}: { heading?: string, message?: string, btnText?: string }) {
    return (
        <div className="mt-4">
            <h2 className="text-xl font-bold">{heading}</h2>
            <p className="text-lg">{message}</p>
            <Button asChild className="mt-4 capitalize" size="lg">
                <Link href="/">
                    {btnText}
                </Link>
            </Button>
        </div>
    )
}
export default EmptyList