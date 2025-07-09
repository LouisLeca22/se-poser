"use client"

import { SignOutButton } from "@clerk/nextjs"
import { useToast } from "../ui/use-toast"

function SignOutLink() {
    const {toast} = useToast()
    const handleLogout = () => {
        toast({description: 'Vous avez été déconnecté.'})
    }
    return (
        <SignOutButton redirectUrl="/">
            <button className="w-full text-left" onClick={handleLogout}>
                Déconnexion
            </button>
        </SignOutButton>
    )
}
export default SignOutLink