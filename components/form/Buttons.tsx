"use client"

import { ReloadIcon } from "@radix-ui/react-icons"
import { useFormStatus } from "react-dom"
import { Button } from "../ui/button"
import { SignInButton } from "@clerk/nextjs"
import { LuTrash2, LuPenSquare } from "react-icons/lu"
import { FaRegHeart, FaHeart } from "react-icons/fa"

type btnSize = "default" | 'lg' | 'sm'

type SubmitButtonProps = {
    className?: string
    text?: string
    size?: btnSize
}

export function SubmitButton({ className = "", text = "Envoyer", size = "lg" }: SubmitButtonProps) {
    const { pending } = useFormStatus()
    return <Button type="submit" disabled={pending} className={`capitalize ${className}`} size={size}>
        {pending ? <><ReloadIcon className="mr-2 h-4 w-4 animate-spin" /> Patientez... </> : text}
    </Button>
}

export const CardSignInButton = () => {
    return (
        <SignInButton mode="modal">
            <Button type="button" size="icon" variant="outline" className="p-2 cursor-pointer" asChild>
                <FaHeart />
            </Button>
        </SignInButton>
    )
}

export const CardSubmitButton = ({ isFavorite }: { isFavorite: boolean }) => {
    const { pending } = useFormStatus()
    return <Button type="submit" size="icon" variant="outline" className="p-2 cursor-pointer">
        {pending ? (
            <ReloadIcon className="animate-spin" />
        ) : isFavorite ? (
            <FaHeart />
        ) : (
            <FaRegHeart />
        )}
    </Button>
}

type ActionType = "edit" | "delete"

export const IconButton = ({ actionType }: { actionType: ActionType }) => {
    const { pending } = useFormStatus()
    const renderIcon = () => {
        switch (actionType) {
            case "edit":
                return <LuPenSquare />
            case "delete":
                return <LuTrash2 />
            default:
                const never: never = actionType
                throw new Error(`Action invalide ${never}`)
        }
    }
    return <Button type="submit" size="icon" variant="link" className="p-2 cursor-pointer">
        {pending ? <ReloadIcon className="animate-spin" /> : renderIcon()}
    </Button>
}