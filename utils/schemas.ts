import * as z from "zod"
import { ZodSchema } from "zod"

export const profileSchema = z.object({
    firstName: z.string().min(2, { message: "Le prénom doit contenir au moins 2 caractères" }),
    lastName: z.string().min(2, { message: "Le nom doit contenir au moins 2 caractères" }),
    username: z.string().min(2, { message: "Le nom d'utilisateur doit contenir au moins 2 caractères" })
})

export function validateWithZodSchema<T>(schema: ZodSchema<T>, data: unknown): T {
    const result = schema.safeParse(data)
    if (!result.success) {
        const errors = result.error.errors.map((error) => error.message)
        throw new Error(errors.join(","))
    }

    return result.data
}

export const imageSchema = z.object({
    image: validateFile()
})

function validateFile(){
    const maxUploadSize = 1024 * 1024 
    const acceptedFileTypes = ["image/"]
    return z.instanceof(File)
            .refine((file) => {
        return !file || file.size <= maxUploadSize
    }, "La taille du fichier doit être inférieure à 1 Mo")
            .refine((file) => {
                return !file || acceptedFileTypes.some((type) => file.type.startsWith(type))
            }, "Le fichier doit être une image")
}