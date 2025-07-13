'use server'

import { profileSchema } from "./schemas"

export const createProfileAction = async (prevState: any, formData: FormData) => {
    try {
        const rawData = Object.fromEntries(formData)
        const validatedFields = profileSchema.parse(rawData)
        console.log(validatedFields)
        return { message: "Profil créé !" }
    } catch (error) { 
        console.log(error)
        return { message: "Une erreur s'est produite" }
    }
}