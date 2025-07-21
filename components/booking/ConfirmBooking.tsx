"use client"

import { useProperty } from "@/utils/store"
import { SignInButton, useAuth } from "@clerk/nextjs"
import { Button } from "../ui/button"
import { SubmitButton } from "../form/Buttons"
import { createBookingAction } from "@/utils/actions"
import FormContainer from "../form/FormContainer"

function ConfirmBooking() {
    const { userId } = useAuth()
    const { propertyId, range } = useProperty((state) => state)
    const checkIn = range?.from as Date
    const checkOut = range?.to as Date
    if (!userId) {
        return <SignInButton mode="modal">
            <Button type="button" className="w-full">
                Connectez-vous pour finaliser la réservation
            </Button>
        </SignInButton>
    }

    const createBooking = createBookingAction.bind(null, { propertyId, checkIn, checkOut })
    return (
        <section>
            <FormContainer action={createBooking}>
                <SubmitButton text="Réserver" className="w-full" />
            </FormContainer>
        </section>
    )
}
export default ConfirmBooking